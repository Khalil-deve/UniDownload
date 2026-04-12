import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { FaShieldAlt, FaEye, FaDatabase, FaEnvelope } from 'react-icons/fa';
import privacy from '../assets/privacy.jpg'; 

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | UniDownload - Your Privacy Matters";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navigation />
      
      {/* SEO Meta Tags (Conceptual - in production use react-helmet) */}
      <meta name="description" content="Read UniDownload's Privacy Policy. We are committed to protecting your data and privacy while you use our video downloader service." />

      <main className="max-w-4xl mx-auto px-6 py-20">
       
        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-20 border border-slate-100">
          <img 
            src={privacy} 
            alt="Data Protection and Privacy" 
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </div>

        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed">
          <p className="text-lg">
            Welcome to Unidownload (“we”, “our”, “us”). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our video downloading service (“Service”).
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaDatabase className="text-indigo-500" /> 1. Information We Collect
            </h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4">
                <span className="font-bold text-slate-900 min-w-[120px]">Personal Data</span>
                <span>We do <strong>not</strong> require you to create an account. However, we may collect your email address if you contact us for support.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-slate-900 min-w-[120px]">Usage Data</span>
                <span>We automatically collect certain information when you use our Service, such as the URL you submit for downloading, your IP address, browser type, device information, and timestamps.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-slate-900 min-w-[120px]">Temp Files</span>
                <span>Videos you download are processed in real‑time and are <strong>not</strong> stored on our servers after the download is complete. Any cached files are deleted automatically.</span>
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaShieldAlt className="text-indigo-500" /> 2. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and improve the video downloader functionality.</li>
              <li>Analyse usage trends and prevent abuse (e.g., excessive requests).</li>
              <li>Respond to your inquiries or support requests.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaEye className="text-indigo-500" /> 3. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar technologies to enhance user experience, analyse site traffic, and remember your preferences (e.g., quality settings). For more details, please see our <a href="/cookies" className="text-indigo-600 font-bold hover:underline">Cookie Policy</a>.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">4. Third‑Party Services</h2>
            <p>
              Our Service may allow you to download videos from third‑party platforms (e.g., YouTube, Vimeo). We do <strong>not</strong> control those platforms, and their privacy policies apply when you visit them. We are not responsible for their content or data practices.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Data Retention</h2>
            <p>
              Usage logs are retained for a limited period (e.g., 30 days) for security and analytical purposes. Temporary video files are deleted immediately after your download is completed.
            </p>
          </section>

          <section className="mt-12 bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">6. Your Rights (GDPR / CCPA)</h2>
            <p className="mb-4">Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at the email provided below.</p>
            <div className="flex items-center gap-3 text-indigo-700 font-bold">
              <FaEnvelope /> muhammadkhalil.web@gmail.com
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
