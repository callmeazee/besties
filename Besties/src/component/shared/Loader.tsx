import type { FC } from "react";

const Loader: FC = () => {
  // Modern soft glowing background pulse token string
  const pulseStyle = "bg-slate-200/80 animate-pulse rounded-lg";

  return (
    <div className="w-full h-screen bg-slate-50 overflow-hidden flex min-w-0">
      {/* 1. LEFT SIDEBAR PANEL SKELETON */}
      {/* Hidden on mobile, fixed wide bar layout mirroring your main side nav tracks */}
      <div className="hidden lg:flex flex-col w-64 h-full bg-white border-r border-slate-100 p-5 shrink-0 justify-between">
        <div className="space-y-6">
          {/* Logo Brand Bubble */}
          <div className={`w-32 h-7 ${pulseStyle}`} />

          {/* Nav Item Iteration Links */}
          <div className="space-y-4 pt-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md ${pulseStyle}`} />
                  <div className={`h-3 w-24 ${pulseStyle}`} />
                </div>
              ))}
          </div>
        </div>

        {/* User Account Lower Segment */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
          <div className={`w-9 h-9 rounded-full ${pulseStyle}`} />
          <div className="space-y-1.5 w-full">
            <div className={`h-3 w-20 ${pulseStyle}`} />
            <div className={`h-2.5 w-16 ${pulseStyle}`} />
          </div>
        </div>
      </div>

      {/* MAIN APPLICATION CORE PANEL FEED */}
      <div className="flex-1 h-full flex flex-col min-w-0">
        {/* 2. TOPBAR HEADER ACCORDANCE ROW */}
        <div className="w-full h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between shrink-0">
          <div className={`h-4 w-36 ${pulseStyle}`} />
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${pulseStyle}`} />
            <div className={`w-8 h-8 rounded-full ${pulseStyle}`} />
          </div>
        </div>

        {/* 3. DYNAMIC SCROLL FEED PANEL AREA */}
        <div className="flex-1 overflow-hidden p-4 md:p-6 space-y-6 max-w-4xl w-full mx-auto">
          {/* Top Stories Row Shelf Placeholder */}
          <div className="w-full bg-white border border-slate-100 rounded-xl p-4 flex gap-4 overflow-hidden shrink-0">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`w-12 h-12 rounded-full ${pulseStyle}`} />
                  <div className={`h-2 w-10 ${pulseStyle}`} />
                </div>
              ))}
          </div>

          {/* Composition Text Input Card Placement Holder */}
          <div className="w-full bg-white border border-slate-100 rounded-xl p-5 space-y-4">
            <div className="flex gap-3">
              <div
                className={`w-10 h-10 rounded-full ${pulseStyle} shrink-0`}
              />
              <div className={`h-12 w-full rounded-xl ${pulseStyle}`} />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className={`h-6 w-16 ${pulseStyle}`} />
              <div className={`h-8 w-24 rounded-xl ${pulseStyle}`} />
            </div>
          </div>

          {/* Multiple Cascading Dynamic Feed Post Skeletons */}
          <div className="space-y-4">
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="w-full border border-slate-100 bg-white rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${pulseStyle} shrink-0`}
                      />
                      <div className="space-y-1.5">
                        <div className={`h-3 w-28 ${pulseStyle}`} />
                        <div className={`h-2.5 w-20 ${pulseStyle}`} />
                      </div>
                    </div>
                    <div className={`h-5 w-16 ${pulseStyle}`} />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className={`h-3.5 w-full ${pulseStyle}`} />
                    <div className={`h-3.5 w-full ${pulseStyle}`} />
                    <div className={`h-3.5 w-3/4 ${pulseStyle}`} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 4. RIGHT CHAT MATRIX PANEL SKELETON */}
      {/* Hidden on mid displays and lower, anchors the incoming real-time text slots */}
      <div className="hidden xl:flex flex-col w-72 h-full bg-white border-l border-slate-100 p-4 shrink-0 space-y-4">
        <div className="px-2 pt-2 flex justify-between items-center">
          <div className={`h-4 w-20 ${pulseStyle}`} />
          <div className={`w-5 h-5 rounded-full ${pulseStyle}`} />
        </div>

        <div className="space-y-1 divide-y divide-slate-50 overflow-hidden">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-3 px-2">
                <div
                  className={`w-9 h-9 rounded-full ${pulseStyle} shrink-0`}
                />
                <div className="space-y-1.5 w-full">
                  <div className={`h-3 w-24 ${pulseStyle}`} />
                  <div className={`h-2.5 w-full ${pulseStyle}`} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
