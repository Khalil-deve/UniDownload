import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { FaCookieBite, FaInfoCircle, FaCog, FaChartLine } from 'react-icons/fa';

export default function CookiePolicy() {
  useEffect(() => {
    document.title = "Cookie Policy | UniDownload - How We Use Cookies";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">Cookie Usage</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Cookie Policy</h1>
          <p className="text-slate-500 font-medium italic">Last updated: April 12, 2026</p>
        </div>

        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 leading-relaxed">
          <p className="text-lg">
            This Cookie Policy explains how Unidownload (“we”, “our”, “us”) uses cookies and similar tracking technologies. By continuing to use our website, you consent to our use of cookies as described below.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <FaCookieBite className="text-amber-500" /> What are cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help the website recognise your device, remember your preferences, and improve your experience.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-8">
              <FaInfoCircle className="text-indigo-500" /> How We Use Cookies
            </h2>
            
            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700">Type</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-5 font-bold text-slate-800 flex items-center gap-2">
                      <FaCog className="text-slate-400" /> Strictly Necessary
                    </td>
                    <td className="px-6 py-5">Essential for the website to function – e.g., to process your download request or maintain security. These cannot be disabled.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-5 font-bold text-slate-800 flex items-center gap-2">
                      <FaChartLine className="text-slate-400" /> Analytics
                    </td>
                    <td className="px-6 py-5">Collect anonymous information about how visitors use our site to help us improve the Service.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-5 font-bold text-slate-800">Functional</td>
                    <td className="px-6 py-5">Remember your settings, such as preferred video quality, so you don’t have to set them every time.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12 p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Choices</h2>
            <ul className="list-none pl-0 space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                <p><strong>Browser Controls:</strong> Most browsers allow you to block or delete cookies via their settings.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                <p><strong>Opt‑out of Analytics:</strong> You can opt out of Google Analytics via standard browser add-ons.</p>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
