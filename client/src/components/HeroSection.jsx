import { useEffect, useState } from 'react';
import './HeroSection.css';
import { FaYoutube, FaInstagram, FaFacebook, FaTiktok, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function HeroSection() {
    const [videoUrl, setVideoUrl] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('auto');
    const [isLoading, setIsLoading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [quality, setQuality] = useState('best');

    useEffect(() => {
        const ws = new WebSocket('https://uni-download.vercel.app');

        ws.onmessage = (event) => {
            const { progress } = JSON.parse(event.data);
            if (progress !== undefined) {
                setDownloadProgress(progress);
            }
        };

        ws.onerror = (err) => console.error('WebSocket error:', err);
        ws.onclose = () => console.log('WebSocket disconnected');

        return () => ws.close();
    }, []);

    const handleDownload = async () => {
        if (!videoUrl) {
            toast.error('Please paste a video URL first');
            return;
        }

        setIsLoading(true);
        setDownloadProgress(0);

        try {
            const res = await fetch('https://uni-download.vercel.app/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: videoUrl,
                    platform: selectedPlatform,
                    quality: quality
                })
            });

            if (!res.ok) {
                throw new Error('Download failed from server');
            }

            const blob = await res.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `video-${Date.now()}.mp4`;
            link.click();

            toast.success('Download completed!');
        } catch (err) {
            toast.error(err.message || 'Download failed');
        } finally {
            setIsLoading(false);
            setDownloadProgress(0);
        }
    };

    const detectPlatform = (url) => {
        setVideoUrl(url);

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            setSelectedPlatform('youtube');
            toast.info('YouTube link detected');
        } else if (url.includes('instagram.com')) {
            setSelectedPlatform('instagram');
            toast.info('Instagram link detected');
        } else if (url.includes('facebook.com')) {
            setSelectedPlatform('facebook');
            toast.info('Facebook link detected');
        } else if (url.includes('tiktok.com')) {
            setSelectedPlatform('tiktok');
            toast.info('TikTok link detected');
        } else if (url.includes('twitter.com') || url.includes('x.com')) {
            setSelectedPlatform('twitter');
            toast.info('Twitter link detected');
        } else if (url) {
            setSelectedPlatform('auto');
        }
    };

    return (
        <header className="hero">
            <div className="container">
                <h1>Download Videos in Seconds</h1>
                <div>
                    <p className="subtitle">Save videos from YouTube, Instagram, Facebook and more</p>
                    <p className="info-text">Supports HD, MP4, MP3 | No watermark | Free and Fast</p>
                </div>
            </div>

            <div className="download-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => detectPlatform(e.target.value)}
                        placeholder="Paste your video link here..."
                        className="url-input"
                    />
                </div>

                <div className="options-row">
                    <select
                        className="format-select"
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
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
                    >
                        <option value="best">Best</option>
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                        <option value="audio">Audio Only</option>
                    </select>

                    <button
                        className={`download-btn ${isLoading ? 'loading' : ''}`}
                        onClick={handleDownload}
                        disabled={isLoading}
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
                    <div className="progress-bar">
                        <div style={{ width: `${downloadProgress}%` }}></div>
                        <p>{downloadProgress.toFixed(1)}%</p>
                    </div>
                )}

                <div className="platform-icons">
                    <span className={`icon youtube ${selectedPlatform === 'youtube' ? 'active' : ''}`} title="YouTube">
                        <FaYoutube />
                    </span>
                    <span className={`icon instagram ${selectedPlatform === 'instagram' ? 'active' : ''}`} title="Instagram">
                        <FaInstagram />
                    </span>
                    <span className={`icon facebook ${selectedPlatform === 'facebook' ? 'active' : ''}`} title="Facebook">
                        <FaFacebook />
                    </span>
                    <span className="icon tiktok" title="TikTok">
                        <FaTiktok />
                    </span>
                    <span className="icon twitter" title="Twitter">
                        <FaTwitter />
                    </span>
                </div>
            </div>

            <div className="wave-bg"></div>
        </header>
    );
}
