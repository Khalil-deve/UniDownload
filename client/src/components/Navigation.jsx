import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <FaDownload className="text-sm" />
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">UniDownload</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Downloader</Link>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">How it works</a>
          <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About</Link>
        </div>

        <Link 
          to="/" 
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-all shadow-md shadow-indigo-100 hover:shadow-lg active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
