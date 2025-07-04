import { FaLock, FaShieldAlt, FaAd, FaSyncAlt, FaQuestionCircle } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const benefits = [
    { icon: <FaShieldAlt />, text: "No login or personal data required" },
    { icon: <FaAd />, text: "Ad-free experience" },
    { icon: <FaLock />, text: "Privacy focused - we don't track you" },
    { icon: <FaSyncAlt />, text: "Regular updates for new platforms" }
  ];

  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <h2>Simple, Private Video Downloads</h2>
          <p className="about-description">
            Our tool provides a hassle-free way to save videos for personal use without watermarks or quality loss. 
            No registration required - just paste and download.
          </p>
          
          <ul className="benefits-list">
            {benefits.map((benefit, index) => (
              <li key={index}>
                <span className="benefit-icon">{benefit.icon}</span>
                {benefit.text}
              </li>
            ))}
          </ul>
          
          <div className="support-link">
            <p>
              <FaQuestionCircle className="support-icon" />
              Need help or want to request a platform?
            </p>
            <a href="#contact" className="support-btn">
              Contact Support
            </a>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="ssl-badge">
            <FaLock className="lock-icon" />
          </div>
          <p>256-bit SSL Encryption</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;