#  UniDownload – Video Downloader

UniDownload is a simple and powerful video downloader built with modern web technologies. It allows users to download videos from various platforms like YouTube, Facebook, TikTok, and more. The interface is clean, responsive, and user-friendly — just paste the link, choose your format, and download with ease!

## 🚀 Features

*  Download videos from multiple platforms (YouTube, Facebook, etc.)
*  Auto-detect platform from URL
*  Choose format/quality before downloading
*  Real-time download progress feedback
*  Fully responsive UI
*  Built with `yt-dlp` and Node.js for backend processing

## 🛠️ Tech Stack

**Frontend:**

* React.js
* CSS (custom + responsive styling)
* React Icons
* Toast Notifications (`react-toastify`)

**Backend:**

* Node.js
* Express.js
* `yt-dlp` via `child_process.spawn()`
* CORS and body parsing

##  Project Structure

```
UniDownload/
├── client/              # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/              # Node.js backend
│   ├── server.js
│   └── yt-dlp.exe
└── README.md
```

## 🖥️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/khalil-deve/UniDownload.git
cd UniDownload
```

### 2. Backend Setup

```bash
cd server
npm install
node server.js
```

Make sure `yt-dlp` is installed and available in your system PATH.

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will typically run on `http://localhost:3000` and backend on `http://localhost:5000`.


##  Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the tool.

