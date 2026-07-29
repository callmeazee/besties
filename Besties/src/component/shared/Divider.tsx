import type { FC } from "react";

interface DividerInterface {
  orientation?: "horizontal" | "vertical";
  className?: string; // Allows parents to pass custom margins, colors, or responsive visibility
}

const Divider: FC<DividerInterface> = ({
  orientation = "horizontal",
  className = "",
}) => {
  // Pure structural styles based on orientation rules
  const baseStyle =
    orientation === "horizontal"
      ? "w-full border-b border-gray-100 my-4" // Your exact default fallback configuration
      : "h-full min-h-4 border-l border-gray-100 mx-4 self-stretch shrink-0"; // Perfect vertical alignment settings

  return (
    <div
      className={`${baseStyle} ${className}`}
      role="separator" // High-priority accessibility (A11y) property for screen readers
    />
  );
};

export default Divider;
