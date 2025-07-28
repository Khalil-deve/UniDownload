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

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  socketClients.push(ws);

  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);

  ws.on("close", () => {
    console.log("WebSocket disconnected");
    clearInterval(heartbeat);
    socketClients = socketClients.filter((client) => client !== ws);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

const PORT = 5000;

const cleanUp = (filePath) => {
  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("File deletion error:", err);
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

    let formatArgs = [];
    if (quality === "1080")
      formatArgs = ["-f", "bestvideo[height<=1080]+bestaudio/best"];
    else if (quality === "720")
      formatArgs = ["-f", "bestvideo[height<=720]+bestaudio/best"];
    else if (quality === "480")
      formatArgs = ["-f", "bestvideo[height<=480]+bestaudio/best"];
    else if (quality === "audio") formatArgs = ["-f", "bestaudio"];

    const ytDlpPath = path.join(__dirname, "yt-dlp.py");

    const downloader = spawn("python3", [
      ytDlpPath,
      ...formatArgs,,
      "-o",
      outputPath,
      url,
    ]);

    downloader.stdout.on("data", (data) => {
      const output = data.toString();
      const match = output.match(/\[download\]\s+(\d{1,3}\.\d+)%/);
      if (match) {
        const progress = parseFloat(match[1]);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ progress }));
          }
        });
      }
    });

    downloader.stderr.on("data", (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });

    downloader.on("error", (err) => {
      console.error("Failed to start yt-dlp:", err);
      return res.status(500).json({ error: "yt-dlp failed to start" });
    });

    downloader.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "yt-dlp exited with error" });
      }

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
