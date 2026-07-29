import { Link } from "react-router-dom";
import Button from "../shared/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate__animated animate__fadeIn w-full min-w-0">
      {/* 1. GEOMETRIC ILLUSTRATION WRAPPER */}
      <div className="relative mb-6">
        {/* Soft Background Blur Glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl scale-150"></div>

        {/* Core Big Icon Display */}
        <div className="relative w-24 h-24 rounded-2xl bg-linear-to-tr from-slate-50 to-slate-100 border border-gray-100 shadow-sm flex items-center justify-center text-slate-400">
          <i className="ri-compass-discover-line text-5xl text-indigo-500 animate-spin-slow"></i>

          {/* Tiny Red Alert Badge Pin */}
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shadow-md shadow-rose-200">
            404
          </span>
        </div>
      </div>

      {/* 2. ERROR TYPOGRAPHY MESSAGING */}
      <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">
        Lost in the Network Grid?
      </h1>

      <p className="text-xs md:text-sm font-medium text-slate-400 max-w-64 md:max-w-80 leading-relaxed wrap-break-words mb-6">
        The destination track or view profile node you are looking for has been
        shifted, deleted, or never existed in the database registry.
      </p>

      {/* 3. DESIGN SYSTEM LINK BUTTON */}
      {/* Wrapped in a Link tag to send users safely back to the central hub route */}
      <Link to="/app/dashboard" className="w-full sm:w-auto shrink-0">
        <Button
          type="secondary"
          icon="home-5-fill"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-100">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
