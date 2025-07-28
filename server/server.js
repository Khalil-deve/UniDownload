const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const ytdlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let socketClients = [];

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  socketClients.push(ws);

  // Heartbeat
  const heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clearInterval(heartbeatInterval);
    socketClients = socketClients.filter((client) => client !== ws);
  });
});

// Health check endpoint
app.get("/ws-health", (req, res) => {
  res.json({
    wsActive: true,
    clients: socketClients.length,
  });
});

const PORT = 5000;

const cleanUp = (filePath) => {
  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }, 10000);
};

app.post("/download", async (req, res) => {
  const { url, quality } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const timestamp = Date.now();
    const fileName = `video-${timestamp}.mp4`;
    const outputDir = path.join(__dirname, "temp");
    const outputPath = path.join(outputDir, fileName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    let formatCode = "best";
    if (quality === "1080")
      formatCode = "bestvideo[height<=1080]+bestaudio/best";
    else if (quality === "720")
      formatCode = "bestvideo[height<=720]+bestaudio/best";
    else if (quality === "480")
      formatCode = "bestvideo[height<=480]+bestaudio/best";
    else if (quality === "audio") formatCode = "bestaudio";

    // Start yt-dlp process
    const subprocess = ytdlp.raw(url, {
      format: formatCode,
      output: outputPath,
    });

    // Listen for progress from stdout
    subprocess.stdout.on("data", (data) => {
      const line = data.toString();
      const match = line.match(/\[download\]\s+(\d{1,3}\.\d+)%/);

      if (match) {
        const progress = parseFloat(match[1]);

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ progress }));
          }
        });
      }
    });

    subprocess.stderr.on("data", (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });

    subprocess.on("error", (err) => {
      console.error("Failed to start yt-dlp:", err);
      return res.status(500).json({ error: "yt-dlp failed to start" });
    });

    subprocess.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "yt-dlp exited with error" });
      }

      // Download completed — send file to frontend
      res.download(outputPath, fileName, (err) => {
        if (err) {
          console.error("Send error:", err);
          if (!res.headersSent) {
            return res.status(500).send("Could not send file");
          }
        }
        cleanUp(outputPath);
      });
    });
  } catch (err) {
    console.error("yt-dlp failed:", err);
    res.status(500).json({ error: "yt-dlp failed to download video" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
