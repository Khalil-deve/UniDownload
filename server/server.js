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

    const ytDlpPath = path.join(__dirname, "yt-dlp");
    let formatCode = "best";

    if (quality === "1080")
      formatCode = "bestvideo[height<=1080]+bestaudio/best";
    else if (quality === "720")
      formatCode = "bestvideo[height<=720]+bestaudio/best";
    else if (quality === "480")
      formatCode = "bestvideo[height<=480]+bestaudio/best";
    else if (quality === "audio") formatCode = "bestaudio";

    const downloader = spawn("python", [
      ytDlpPath,
      "-f",
      formatCode,
      "-o",
      outputPath,
      url,
    ]);

    downloader.on("error", (err) => {
      console.error("Failed to start yt-dlp process:", err);
      return res.status(500).json({ error: "yt-dlp process failed to start" });
    });

    downloader.stderr.on("data", (data) => {
      console.log(`[yt-dlp stdout]: ${data}`);
    });

    // Progress reporting
    downloader.stdout.on("data", (data) => {
      const output = data.toString();
      const match = output.match(/\[download\]\s+(\d{1,3}\.\d+)%/);

      if (match) {
        const progress = parseFloat(match[1]);
        console.log(`Progress: ${progress}%`);

        // Send to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ progress }));
          }
        });
      }
    });

    downloader.on("close", (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}`);
        return res.status(500).json({ error: "Download failed" });
      }

      res.on("close", () => {
        if (!res.writableEnded) {
          console.warn("Client disconnected before file was sent.");
        }
      });

      res.download(outputPath, fileName, (err) => {
        if (err) {
          if (!res.headersSent) {
            console.error("Send error:", err);
            return res.status(500).send("Could not send file");
          }
        }
        cleanUp(outputPath);
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
