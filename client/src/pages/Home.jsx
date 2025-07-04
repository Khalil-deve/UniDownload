import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StepsSection from '../components/StepsSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import '../App.css';

function Home() {

  return (
    <div className='app dark-mode'>
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