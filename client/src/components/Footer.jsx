import React from "react";
import { FaGithub, FaTwitter, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-indigo-400 font-semibold text-lg mb-4 pb-2 border-b border-indigo-400/20">
              UniDownload
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              The fastest way to download videos from popular platforms without watermarks.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
                { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
                { href: "mailto:support@unidownload.com", icon: <FaEnvelope />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-indigo-400 font-semibold text-lg mb-4 pb-2 border-b border-indigo-400/20">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[["Home", "/"], ["Features", "/#features"], ["How It Works", "/#how-it-works"], ["About", "/#about"]].map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("/") && !href.includes("#") ? (
                    <Link to={href} className="text-slate-400 text-sm hover:text-indigo-400 transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="text-slate-400 text-sm hover:text-indigo-400 transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-indigo-400 font-semibold text-lg mb-4 pb-2 border-b border-indigo-400/20">
              Legal
            </h3>
            <ul className="space-y-2">
              {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-slate-400 text-sm hover:text-indigo-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-indigo-400 font-semibold text-lg mb-4 pb-2 border-b border-indigo-400/20">
              Security
            </h3>
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <FaShieldAlt />
              <span className="text-sm font-medium">256-bit SSL Encryption</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              This tool is for personal use only. We do not store or host any videos.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-5 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {year} VideoDownloader Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;