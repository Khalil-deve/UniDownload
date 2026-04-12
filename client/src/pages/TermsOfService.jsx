import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { FaGavel, FaCheckCircle, FaExclamationTriangle, FaExternalLinkAlt } from 'react-icons/fa';

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | UniDownload - Usage Guidelines";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-4">Legal Agreement</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-slate-500 font-medium italic">Last updated: April 12, 2026</p>
        </div>

        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed">
          <p className="text-lg">
            By accessing or using Unidownload (“we”, “our”, “us”), you agree to be bound by these Terms of Service (“Terms”). If you do not agree, please do not use our video downloader Service.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaCheckCircle className="text-emerald-500" /> 1. Eligibility
            </h2>
            <p>
              You must be at least 13 years old (or the age of digital consent in your country) to use this Service. By using Unidownload, you represent that you meet this requirement.
            </p>
          </section>

          <section className="mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaExternalLinkAlt className="text-indigo-500 text-xl" /> 2. Description of Service
            </h2>
            <p>
              Unidownload provides a tool that allows you to download videos from supported third‑party websites for <strong>personal, lawful use</strong>. We do not host, upload, or distribute any video content. The Service merely facilitates downloading from publicly accessible URLs.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaGavel className="text-indigo-500" /> 3. Copyright Compliance
            </h2>
            <p className="mb-4">You agree <strong>not</strong> to use Unidownload:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To download videos that you do not have permission to download (e.g., copyrighted material without a license).</li>
              <li>For any illegal activity, including piracy or violation of third‑party terms of service.</li>
              <li>To distribute, sell, or commercially exploit downloaded videos without the rights holder’s consent.</li>
              <li>To overload our infrastructure with automated scripts or bulk requests.</li>
            </ul>
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-400 text-amber-800 font-medium">
              You are solely responsible for ensuring that your use of downloaded videos complies with all applicable copyright laws.
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaExclamationTriangle className="text-red-400" /> 4. Disclaimer & Liability
            </h2>
            <p className="mb-4">
              Unidownload is provided “as is” without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error‑free, or compatible with all websites.
            </p>
            <p>
              We are <strong>not responsible</strong> for how you use downloaded videos or for any legal consequences arising from your misuse.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">5. Governing Law</h2>
            <p>
              These Terms shall be governed by the local laws of your jurisdiction. For any questions, contact us via our official support channels.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
