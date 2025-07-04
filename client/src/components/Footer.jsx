import { FaGithub, FaTwitter, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-heading">VideoDownloader Pro</h3>
            <p className="footer-text">
              The fastest way to download videos from popular platforms without watermarks.
            </p>
            <div className="footer-social">
              <a href="https://github.com" aria-label="GitHub">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <FaTwitter className="social-icon" />
              </a>
              <a href="mailto:support@videodownloader.com" aria-label="Email">
                <FaEnvelope className="social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/dmca">DMCA</a></li>
            </ul>
          </div>

          {/* Security Badge */}
          <div className="footer-section">
            <div className="security-badge">
              <FaShieldAlt className="security-icon" />
              <span>Secure 256-bit SSL Encryption</span>
            </div>
            <p className="footer-disclaimer">
              This tool is for personal use only. We do not store or host any videos.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} VideoDownloader Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;