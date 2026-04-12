const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Function to log project structure
const logProjectStructure = (dir, prefix = "", depth = 0) => {
  if (depth > 2) return; // Limit depth to keep logs clean
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file, index) => {
    if (file === "node_modules" || file === ".git" || file === "dist" || file === "temp") return;
    
    const isLast = index === files.length - 1;
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    console.log(`${prefix}${isLast ? "└── " : "├── "}${file}`);
    
    if (stats.isDirectory()) {
      logProjectStructure(filePath, `${prefix}${isLast ? "    " : "│   "}`, depth + 1);
    }
  });
};

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  // Assign a unique ID to this connection
  ws.socketId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  
  console.log(`[WebSocket] New client connected from ${ip} (ID: ${ws.socketId})`);

  // Tell the client their ID
  ws.send(JSON.stringify({ type: "init", socketId: ws.socketId }));

  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on("close", () => {
    console.log(`[WebSocket] Client ${ws.socketId} disconnected`);
    clearInterval(heartbeat);
  });

  ws.on("error", (err) => {
    console.error(`[WebSocket] Error from ${ws.socketId}:`, err);
  });
});

const PORT = 5000;

const cleanUp = (prefix) => {
  const outputDir = path.join(__dirname, "temp");
  if (!fs.existsSync(outputDir)) return;

  fs.readdir(outputDir, (err, files) => {
    if (err) return;
    
    // Find all files that start with the unique timestamp prefix
    const filesToDelete = files.filter(file => file.startsWith(prefix));
    
    filesToDelete.forEach(file => {
      const filePath = path.join(outputDir, file);
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error(`[Cleanup] Error deleting fragment ${file}:`, err);
        } else {
          console.log(`[Cleanup] Deleted fragment: ${file}`);
        }
      });
    });
  });
};

// Background task: Sweep stale files every 30 minutes
setInterval(() => {
  const outputDir = path.join(__dirname, "temp");
  if (!fs.existsSync(outputDir)) return;

  const now = Date.now();
  const maxAge = 15 * 60 * 1000;

  fs.readdir(outputDir, (err, files) => {
    if (err) return;
    files.forEach((file) => {
      const filePath = path.join(outputDir, file);
      fs.stat(filePath, (err, stats) => {
        if (!err && (now - stats.mtimeMs > maxAge)) {
          fs.unlink(filePath, () => { });
        }
      });
    });
  });
}, 30 * 60 * 1000);

app.post("/download", async (req, res) => {
  const { url, quality, socketId } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  console.log(`[Download] Starting request for socket ${socketId}: ${url}`);

  try {
    const timestamp = Date.now();
    const outputDir = path.join(__dirname, "temp");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    let formatArgs = [];
    if (quality === "1080")
      formatArgs = ["-f", "bestvideo[height<=1080]+bestaudio/best"];
    else if (quality === "720")
      formatArgs = ["-f", "bestvideo[height<=720]+bestaudio/best"];
    else if (quality === "480")
      formatArgs = ["-f", "bestvideo[height<=480]+bestaudio/best"];
    else if (quality === "audio") formatArgs = ["-f", "bestaudio"];

    const outputTemplate = path.join(outputDir, `video-${timestamp}.%(ext)s`);

    // Determine the yt-dlp command to use
    // In Docker, it's installed globally as 'yt-dlp'
    // Locally, we might use the 'yt-dlp.py' script
    const localYtDlp = path.join(__dirname, "yt-dlp.py");
    let cmd = "yt-dlp";
    let args = ["--no-playlist", "--no-check-certificate", ...formatArgs, "-o", outputTemplate, url];

    if (!fs.existsSync(localYtDlp)) {
      // If no local script, we MUST use global command
      console.log("[System] Using global yt-dlp command");
    } else {
      // If local script exists, we can use it with python
      console.log("[System] Local yt-dlp.py found, using python");
      cmd = process.platform === "win32" ? "python" : "python3";
      args = [localYtDlp, ...args];
    }

    const downloader = spawn(cmd, args);

    downloader.stdout.on("data", (data) => {
      const output = data.toString();
      const match = output.match(/\[download\]\s+(\d{1,3}\.\d+)%/);
      if (match) {
        const progress = parseFloat(match[1]);
        wss.clients.forEach((client) => {
          // Only send to the specific client that started this download
          if (client.socketId === socketId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ progress }));
          }
        });
      }
    });

    downloader.stderr.on("data", (data) => {
      const message = data.toString();
      if (!message.includes("Downloading")) {
        console.warn(`[yt-dlp Warning]: ${message}`);
      }
    });

    downloader.on("error", (err) => {
      console.error("[Download] Failed to start yt-dlp:", err);
      if (!res.headersSent) res.status(500).json({ error: "yt-dlp failed to start" });
    });

    downloader.on("close", (code) => {
      if (code !== 0) {
        console.error(`[Download] yt-dlp exited with code ${code}`);
        if (!res.headersSent) res.status(500).json({ error: "yt-dlp exited with error" });
        return;
      }

      // Find the actual file produced (since extension could be .mkv, .webm, .mp4, etc.)
      const files = fs.readdirSync(outputDir);
      const actualFile = files.find(f => f.startsWith(`video-${timestamp}.`));

      if (!actualFile) {
        console.error(`[Download] Error: No file found starting with video-${timestamp}.`);
        if (!res.headersSent) res.status(500).json({ error: "Download succeeded but file was not found" });
        return;
      }

      const actualPath = path.join(outputDir, actualFile);
      console.log(`[Download] Finished: ${actualFile}. Sending to client...`);

      res.download(actualPath, actualFile, (err) => {
        if (err) {
          console.error("Send error:", err);
          if (!res.headersSent) {
            return res.status(500).send("Could not send file");
          }
        }
        // Cleanup all files associated with this download (fragments + final file)
        cleanUp(`video-${timestamp}`);
      });
    });
  } catch (err) {
    console.error("[Download] Critical failure:", err);
    if (!res.headersSent) res.status(500).json({ error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log("\n" + "=".repeat(40));
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("=".repeat(40));
  console.log("\n Project Structure:");
  logProjectStructure(path.join(__dirname, ".."));
  console.log("=".repeat(40) + "\n");
});
