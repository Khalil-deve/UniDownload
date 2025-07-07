const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let socketClients = [];

// When a client connects
wss.on('connection', (ws) => {
  socketClients.push(ws);
  console.log('WebSocket client connected');

  ws.on('close', () => {
    socketClients = socketClients.filter(client => client !== ws);
    console.log('WebSocket client disconnected');
  });
});

const PORT = 5000;

const cleanUp = (filePath) => {
  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
  }, 10000);
};

app.post('/download', async (req, res) => {
  const { url, quality } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const timestamp = Date.now();
    const fileName = `video-${timestamp}.mp4`;
    const outputDir = path.join(__dirname, 'temp');
    const outputPath = path.join(outputDir, fileName);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const ytDlpPath = path.join(__dirname, 'yt-dlp');
    let formatCode = 'best';

    if (quality === '1080') formatCode = 'bestvideo[height<=1080]+bestaudio/best';
    else if (quality === '720') formatCode = 'bestvideo[height<=720]+bestaudio/best';
    else if (quality === '480') formatCode = 'bestvideo[height<=480]+bestaudio/best';
    else if (quality === 'audio') formatCode = 'bestaudio';

    const downloader = spawn(ytDlpPath, ['-f', formatCode, '-o', outputPath, url]);

    downloader.stdout.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/(\d{1,3}\.\d)%/); // Match progress like 44.2%

      if (match) {
        const progress = parseFloat(match[1]);
        socketClients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ progress }));
          }
        });
      }

      console.log(`[yt-dlp]: ${output}`);
    });

    downloader.stderr.on('data', (data) => {
      console.error(`[yt-dlp error]: ${data}`);
    });

    downloader.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}`);
        return res.status(500).json({ error: 'Download failed' });
      }

      res.download(outputPath, fileName, (err) => {
        if (err) {
          console.error('Send error:', err);
          return res.status(500).send('Could not send file');
        }
        cleanUp(outputPath);
      });
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
