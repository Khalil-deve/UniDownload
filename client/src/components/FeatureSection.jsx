import React from "react";
import { FaShieldAlt, FaBolt, FaStar, FaMobileAlt } from "react-icons/fa";

const features = [
    {
        icon: <FaShieldAlt />,
        title: "100% Secure",
        description: "Your data remains private. We don't store your downloads or history.",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
    {
        icon: <FaBolt />,
        title: "Lightning Fast",
        description: "Optimized servers deliver your downloads in seconds, even for HD videos.",
        color: "text-amber-500",
        bg: "bg-amber-50",
    },
    {
        icon: <FaStar />,
        title: "HD Quality",
        description: "Download in 4K, 1080p, 720p or audio-only MP3 format.",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
    {
        icon: <FaMobileAlt />,
        title: "Any Device",
        description: "Works perfectly on desktop, tablet and mobile browsers.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
];

const FeaturesSection = () => (
    <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                Why Choose Our Downloader
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="group bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300 cursor-default"
                    >
                        <div className={`w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full text-2xl ${f.bg} ${f.color}`}>
                            {f.icon}
                        </div>
                        <h3 className="text-base font-semibold text-slate-800 mb-2">{f.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default FeaturesSection;