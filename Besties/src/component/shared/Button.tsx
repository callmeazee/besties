import type { FC } from "react";
import "remixicon/fonts/remixicon.css";

// FIX: Added 'inline-flex items-center justify-center' to every layout template variant string.
// This guarantees text + icon alignments stay locked dead-center regardless of screen dimension widths.
const ButtenModel = {
  primary:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  secondary:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  tertiary:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  success:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  info: "inline-flex items-center justify-center px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  warning:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  danger:
    "inline-flex items-center justify-center px-4 md:px-6 py-2.5 bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
};

interface ButtonInterface {
  children?: string;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "info"
    | "success";
  onClick?: () => void;
  icon?: string;
  className?: string; // NEW: Supports external Tailwind style extensions natively
  key?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonInterface> = ({
  children = "Submit",
  type = "primary",
  onClick,
  icon,
  className = "", // Defaults to empty string to prevent undefined additions
  key = 0,
  loading = false,
  disabled = false,
}) => {
  if (loading)
    return (
      <button disabled className=" text-gray-400 text-[13px] font-semibold  ">
        <i className="fa fa-spinner fa-spin mr-2 "></i>
        Loading....
      </button>
    );
  return (
    // FIX: String interpolation joins your design variant styles with the parent's contextual alignments
    <button
      key={key}
      className={`${ButtenModel[type]} ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {icon && (
        <i className={`ri-${icon} mr-2 flex items-center justify-center`}></i>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
