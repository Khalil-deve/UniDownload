import React from "react";
import { useEffect, useState, useRef } from "react";
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
  const [socketId, setSocketId] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    let shouldReconnect = true;

    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      console.log("Attempting to connect to WebSocket...");
      const ws = new WebSocket(import.meta.env.VITE_WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected successfully");
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle initialization message to get unique socket ID
          if (data.type === "init") {
            console.log("Joined with Socket ID:", data.socketId);
            setSocketId(data.socketId);
            return;
          }

          if (data.progress !== undefined) {
            setDownloadProgress(data.progress);
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
        if (shouldReconnect) {
          console.log("Attempting to reconnect in 2 seconds...");
          setTimeout(connectWebSocket, 2000);
        }
      };
    };

    connectWebSocket();
    return () => {
      shouldReconnect = false;
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleDownload = async () => {
    if (!videoUrl) {
      toast.error("Please paste a video URL first");
      return;
    }

    setIsLoading(true);
    setDownloadProgress(0);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: videoUrl, 
          platform: selectedPlatform, 
          quality,
          socketId // Send the unique socket ID so the server knows who to update
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      if (downloadProgress >= 100) {
        toast.success("Download completed successfully!");
      }

      // Reset the UI
      setVideoUrl("");
      setSelectedPlatform("auto");
    } catch (err) {
      toast.error(err.message || "Download failed");
      console.error("Download error:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setDownloadProgress(0), 3000);
    }
  };

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

  const platformIcons = [
    { id: "youtube", icon: <FaYoutube />, hover: "hover:text-red-500   hover:bg-red-50" },
    { id: "instagram", icon: <FaInstagram />, hover: "hover:text-pink-500  hover:bg-pink-50" },
    { id: "facebook", icon: <FaFacebook />, hover: "hover:text-blue-600  hover:bg-blue-50" },
    { id: "tiktok", icon: <FaTiktok />, hover: "hover:text-gray-900  hover:bg-gray-100" },
    { id: "twitter", icon: <FaTwitter />, hover: "hover:text-sky-500   hover:bg-sky-50" },
  ];

  const selectClass =
    "flex-1 px-4 py-3 rounded-full border-0 bg-white/95 text-gray-700 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all appearance-none shadow-sm";

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-400 text-white">
      {/* Inner content — two columns on large screens */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 pb-28 flex flex-col lg:flex-row lg:items-center lg:gap-16">

        {/* ── LEFT: Branding & taglines ── */}
        <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
          {/* Badge */}
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
            Free · No Sign-up · No Watermark
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 drop-shadow-sm">
            Download Videos<br />
            <span className="text-blue-200">in Seconds</span>
          </h1>

          <p className="text-base md:text-lg opacity-90 mb-6 max-w-lg lg:max-w-none">
            Save videos from YouTube, Instagram, Facebook, TikTok, Twitter and more — in HD quality, instantly.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {["HD & 4K Quality", "MP3 Audio", "No Watermark", "Lightning Fast"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                <span className="text-emerald-300">✓</span> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Download card ── */}
        <div className="w-full lg:w-[480px] shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
          {/* Connection status badge */}
          <div className="flex justify-center mb-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md transition-all duration-500 bg-white/5`}>
              <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? "bg-emerald-400" : "bg-red-400"}`} />
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isConnected ? "text-emerald-300/90" : "text-red-300/90"}`}>
                {isConnected ? "Secure Connection Live" : "Server Connection Offline"}
              </span>
            </div>
          </div>
          {/* URL input */}
          <div className="mb-4">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => detectPlatform(e.target.value)}
              placeholder="Paste your video link here..."
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-full border-2 border-transparent bg-white/95 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-indigo-300 focus:shadow-lg transition-all shadow-md disabled:opacity-70"
            />
          </div>

          {/* Options row */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              disabled={isLoading}
              className={selectClass}
            >
              <option value="auto">Auto-detect platform</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
            </select>

            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={isLoading}
              className={selectClass}
            >
              <option value="best">Best Quality</option>
              <option value="1080">1080p</option>
              <option value="720">720p</option>
              <option value="480">480p</option>
              <option value="audio">Audio Only</option>
            </select>

            <button
              onClick={handleDownload}
              disabled={isLoading || !isConnected}
              className="w-full mt-1 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-full shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Download Now</span>
                  <span>↓</span>
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          {isLoading && (
            <div className="mb-4 text-center">
              <div className="w-3/4 mx-auto h-2 bg-white/20 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <p className="text-xs font-semibold text-white/80">{downloadProgress.toFixed(1)}%</p>
              {downloadProgress >= 100 && (
                <p className="text-xs text-white/60 mt-1">Processing download...</p>
              )}
            </div>
          )}

          {/* Platform icons */}
          <div className="flex justify-center gap-3 mt-3 flex-wrap">
            {platformIcons.map(({ id, icon, hover }) => (
              <span
                key={id}
                className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer text-white/70 bg-black/15 transition-all duration-200 hover:-translate-y-1 ${hover} ${selectedPlatform === id ? "text-white bg-indigo-600 scale-110 shadow-md" : ""
                  }`}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23f8fafc' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </header>
  );
}
