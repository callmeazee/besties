import type { FC } from "react";
import "remixicon/fonts/remixicon.css";

// Tailwind v4 Optimized Model for Pure Squares
// Using fixed w-10 h-10 (40px) or w-11 h-11 (44px) ensures a consistent geometric shape
const IconButtonModel = {
  primary:
    "inline-flex items-center justify-center w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  secondary:
    "inline-flex items-center justify-center w-9 h-9 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  tertiary:
    "inline-flex items-center justify-center w-9 h-9 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  success:
    "inline-flex items-center justify-center w-9 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  info: "inline-flex items-center justify-center w-9 h-9 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  warning:
    "inline-flex items-center justify-center w-9 h-9 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
  danger:
    "inline-flex items-center justify-center w-9 h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shrink-0",
};

interface IconButtonInterface {
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "info"
    | "success";
  onClick?: () => void;
  icon: string; // Enforced as a required property since an icon button requires an icon
  className?: string; // Allows parents to pass things like 'rounded-full' or custom sizes
  title?: string; // High-priority UX: Always provide a fallback accessibility tooltip for screen readers

}

// Capitalized component name for proper React node recognition
const IconButton: FC<IconButtonInterface> = ({
  type = "primary",
  onClick,
  icon,
  className = "",
     title,

}) => {
  return (
    <button
      title={title}
      className={`${IconButtonModel[type]} ${className}`}
      onClick={onClick}>
      {/* REMOVED mr-2 to prevent center displacement alignment errors */}
     <i className={`ri-${icon} text-xl flex items-center justify-center`}></i>
      
    </button>
  );
};

export default IconButton;
