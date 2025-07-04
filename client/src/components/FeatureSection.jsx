import { FaShieldAlt, FaBolt, FaStar, FaMobileAlt } from 'react-icons/fa';
import './FeatureSection.css';

const FeaturesSection = () => {
    const features = [
        {
            icon: <FaShieldAlt className="feature-icon" />,
            title: "100% Secure",
            description: "Your data remains private. We don't store your downloads or history."
        },
        {
            icon: <FaBolt className="feature-icon" />,
            title: "Lightning Fast",
            description: "Optimized servers deliver your downloads in seconds, even for HD videos."
        },
        {
            icon: <FaStar className="feature-icon" />,
            description: "Download in 4K, 1080p, 720p or audio-only MP3 format."
        },
        {
            icon: <FaMobileAlt className="feature-icon" />,
            title: "Any Device",
            description: "Works perfectly on desktop, tablet and mobile browsers."
        }
    ];

    return (
        <section className="features">
            <div className="container">
                <h2>Why Choose Our Downloader</h2>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon-container">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;