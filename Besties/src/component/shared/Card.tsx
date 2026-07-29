import type { FC, ReactNode } from "react";

interface CardInterface {
  title?: ReactNode;
  children?: ReactNode; // FIX: Changed from ReactElement to ReactNode to support fragments, text nodes, and list maps smoothly
  footer?: ReactNode;
  divider?: boolean;
  noPadding?: boolean; // NEW: Flag to control internal body layout bleed
  className?: string;
  // key?: string | number;
}

const Card: FC<CardInterface> = ({
  title,
  children,
  footer,
  divider = false,
  noPadding = false, // Defaults to standard padding behavior
  className = "",
  // key = 0,
}) => {
  return (
    // FIX: Combined styles into a dynamic flex column that prevents horizontal box bleeding (min-w-0 overflow-hidden)
    <div
      // key={key}
      className={`shadow-lg rounded-xl border border-gray-100 flex flex-col 0bg-white w-full min-w-0 overflow-hidden ${className}`}>
      {/* HEADER SECTION */}
      {title && (
        <div className="px-5 py-4 shrink-0">
          <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">
            {title}
          </h1>
        </div>
      )}

      {/* DIVIDER ACCORDANCE BOUNDS */}
      {divider && <div className="border-b border-gray-100 -mt-2" />}

      {/* BODY CONTENT AREA */}
      {children && (
        <div
          className={`flex-1 min-w-0 text-gray-500 w-full ${
            noPadding ? "p-0" : "px-5 py-4"
          }`}>
          {children}
        </div>
      )}

      {/* FOOTER SECTION */}
      {footer && (
        <div className="mt-auto px-5 py-4 border-t border-gray-50 shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
