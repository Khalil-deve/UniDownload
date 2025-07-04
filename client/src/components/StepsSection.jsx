import { FaLink, FaPaste, FaDownload } from 'react-icons/fa';
import './StepsSection.css';

const StepsSection = () => {
  const steps = [
    {
      number: 1,
      icon: <FaLink className="step-icon" />,
      title: "Copy Link",
      description: "Copy the video URL from your favorite platform"
    },
    {
      number: 2,
      icon: <FaPaste className="step-icon" />,
      title: "Paste URL",
      description: "Paste the link in the box above"
    },
    {
      number: 3,
      icon: <FaDownload className="step-icon" />,
      title: "Download",
      description: "Choose format and click the download button"
    }
  ];

  return (
    <section className="steps">
      <div className="container">
        <h2>How To Download Videos</h2>
        
        <div className="steps-container">
          {steps.map((step) => (
            <div className="step" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon-container">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
          
          {/* Animated connector line between steps */}
          <div className="step-connector"></div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;