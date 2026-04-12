import { useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StepsSection from '../components/StepsSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import '../App.css';

function Home() {
  useEffect(() => {
    document.title = "UniDownload - Fast, Free & HD Video Downloader";
  }, []);

  return (
    <div className='app dark-mode min-h-screen bg-slate-50'>
      <meta name="description" content="UniDownload is the fastest free tool to download videos from YouTube, Instagram, Facebook, TikTok, and more in HD quality without watermarks." />
      <Navigation />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <HeroSection />
      
      <FeatureSection />
      <StepsSection />
      <AboutSection />
      
      <Footer />
    </div>
  );
}

export default Home;