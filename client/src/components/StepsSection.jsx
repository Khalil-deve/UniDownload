import { FaLink, FaPaste, FaDownload } from "react-icons/fa";

const steps = [
  {
    number: 1,
    icon: <FaLink />,
    title: "Copy Link",
    description: "Copy the video URL from your favourite platform",
  },
  {
    number: 2,
    icon: <FaPaste />,
    title: "Paste URL",
    description: "Paste the link in the box above",
  },
  {
    number: 3,
    icon: <FaDownload />,
    title: "Download",
    description: "Choose format and click the download button",
  },
];

const StepsSection = () => (
  <section id="how-it-works" className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-14">
        How To Download Videos
      </h2>
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
        {/* Connector line */}
        <div className="hidden md:block absolute top-8 left-[21%] right-[21%] h-0.5 bg-indigo-100 z-0" />

        {steps.map((step) => (
          <div
            key={step.number}
            className="group relative z-10 bg-white rounded-3xl p-8 w-full md:w-72 text-center shadow-sm border border-slate-100 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-3 hover:scale-[1.02] transition-all duration-300"
          >
            {/* Step number badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 group-hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center shadow-lg transition-all">
              {step.number}
            </div>
            <div className="w-16 h-16 mx-auto mb-5 mt-2 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 text-2xl group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
              {step.icon}
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StepsSection;