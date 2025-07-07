import { useEffect, useState, useRef } from "react";
import "./HeroSection.css";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function HeroSection() {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [quality, setQuality] = useState("best");
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  useEffect(() => {
    if (!videoUrl) return; // don't connect unless URL exists

    let shouldReconnect = true;

    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

    // Create a new WebSocket connection
      const ws = new WebSocket("wss://unidownload-production.up.railway.app");
      wsRef.current = ws;

      // Handle WebSocket events
      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      // Listen for messages from the server
      ws.onmessage = (event) => {
        try {
          const { progress } = JSON.parse(event.data);
          if (progress !== undefined) {
            setDownloadProgress(progress);
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      // Handle errors and disconnections
      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
      };

      // Handle WebSocket close event
      ws.onclose = () => {
        console.warn("WebSocket disconnected");
        setIsConnected(false);
        if (shouldReconnect) {
          setTimeout(connectWebSocket, 1000);
        }
      };
    };

    connectWebSocket();
    // Cleanup function to close WebSocket connection
    return () => {
      shouldReconnect = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [videoUrl]);

// Function to handle download
  const handleDownload = async () => {
    if (!videoUrl) {
      toast.error("Please paste a video URL first");
      return;
    }

    setIsLoading(true);
    setDownloadProgress(0);
    
    try {
    
      const res = await fetch("https://unidownload-production.up.railway.app/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
          platform: selectedPlatform,
          quality: quality,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      // Handle the response as a Blob for download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      if(downloadProgress >= 100) {
        toast.success("Download completed successfully!");
      }

    } catch (err) {
      toast.error(err.message || "Download failed");
      console.error("Download error:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setDownloadProgress(0), 3000);
    }
  };

  // Function to detect platform based on URL
  const detectPlatform = (url) => {
    setVideoUrl(url);

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setSelectedPlatform("youtube");
      toast.info("YouTube link detected");
    } else if (url.includes("instagram.com")) {
      setSelectedPlatform("instagram");
      toast.info("Instagram link detected");
    } else if (url.includes("facebook.com")) {
      setSelectedPlatform("facebook");
      toast.info("Facebook link detected");
    } else if (url.includes("tiktok.com")) {
      setSelectedPlatform("tiktok");
      toast.info("TikTok link detected");
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      setSelectedPlatform("twitter");
      toast.info("Twitter link detected");
    } else if (url) {
      setSelectedPlatform("auto");
    }
  };

  return (
    <header className="hero">
      <div className="container">
        <h1>Download Videos in Seconds</h1>
        <div>
          <p className="subtitle">
            Save videos from YouTube, Instagram, Facebook and more
          </p>
          <p className="info-text">
            Supports HD, MP4, MP3 | No watermark | Free and Fast
          </p>
        </div>
      </div>

      <div className="download-form">
        <div className="connection-status">
          Server: {isConnected ? "Connected" : "Disconnected"}
        </div>

        <div className="input-group">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => detectPlatform(e.target.value)}
            placeholder="Paste your video link here..."
            className="url-input"
            disabled={isLoading}
          />
        </div>

        <div className="options-row">
          <select
            className="format-select"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            disabled={isLoading}
          >
            <option value="auto">Auto-detect platform</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter</option>
          </select>

          <select
            className="format-select best-selection"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            disabled={isLoading}
          >
            <option value="best">Best</option>
            <option value="1080">1080p</option>
            <option value="720">720p</option>
            <option value="480">480p</option>
            <option value="audio">Audio Only</option>
          </select>

          <button
            className={`download-btn ${isLoading ? "loading" : ""}`}
            onClick={handleDownload}
            disabled={isLoading || !isConnected}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span className="btn-text">Download</span>
                <span className="btn-icon">↓</span>
              </>
            )}
          </button>
        </div>

        {isLoading && (
          <div className="progress-container">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="progress-number">{downloadProgress.toFixed(1)}%</p>
            {downloadProgress >= 100 && (
              <p className="processing-text">Processing download...</p>
            )}
          </div>
        )}

        <div className="platform-icons">
          <span
            className={`icon youtube ${
              selectedPlatform === "youtube" ? "active" : ""
            }`}
          >
            <FaYoutube />
          </span>
          <span
            className={`icon instagram ${
              selectedPlatform === "instagram" ? "active" : ""
            }`}
          >
            <FaInstagram />
          </span>
          <span
            className={`icon facebook ${
              selectedPlatform === "facebook" ? "active" : ""
            }`}
          >
            <FaFacebook />
          </span>
          <span
            className={`icon tiktok ${
              selectedPlatform === "tiktok" ? "active" : ""
            }`}
          >
            <FaTiktok />
          </span>
          <span
            className={`icon twitter ${
              selectedPlatform === "twitter" ? "active" : ""
            }`}
          >
            <FaTwitter />
          </span>
        </div>
      </div>

      <div className="wave-bg"></div>
    </header>
  );
}
