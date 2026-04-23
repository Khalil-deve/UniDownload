import React from "react";
import { FaLock, FaShieldAlt, FaAd, FaSyncAlt, FaQuestionCircle } from "react-icons/fa";

const benefits = [
  { icon: <FaShieldAlt />, text: "No login or personal data required" },
  { icon: <FaAd />, text: "Ad-free experience" },
  { icon: <FaLock />, text: "Privacy focused — we don't track you" },
  { icon: <FaSyncAlt />, text: "Regular updates for new platforms" },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-slate-50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Simple, Private Video Downloads
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            Our tool provides a hassle-free way to save videos for personal use without
            watermarks or quality loss. No registration required — just paste and download.
          </p>

          <ul className="space-y-4 mb-10">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 text-sm shrink-0">
                  {b.icon}
                </span>
                {b.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 pt-8 border-t border-slate-200/60">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shadow-inner">
                <FaQuestionCircle />
              </span>
              <p className="text-slate-500 text-sm font-medium max-w-[200px] leading-snug">
                Need help or want to request a platform?
              </p>
            </div>
            <a
              href="mailto:support@videodownloader.com"
              className="w-full sm:w-auto text-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-all hover:shadow-lg active:scale-95 shadow-indigo-200"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* SSL badge */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-blue-400 flex items-center justify-center shadow-lg shadow-indigo-200">
            <FaLock className="text-white text-3xl" />
          </div>
          <p className="text-slate-500 text-sm font-medium text-center">
            256-bit SSL Encryption
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;