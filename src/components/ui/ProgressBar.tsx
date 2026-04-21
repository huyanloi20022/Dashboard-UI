import React from "react";

type ProgressColor = "purple" | "cyan" | "pink" | "green" | "gray";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  rightLabel?: string;
  color?: ProgressColor;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = false,
  rightLabel,
  color = "purple",
  size = "md",
  className = "",
}) => {
  const colorMap = {
    purple: "bg-purple-600",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
  };

  const sizeMap = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="space-y-1">
      {(label || showValue || rightLabel) && (
        <div className="flex justify-between text-sm font-bold text-gray-700">
          {label && <span>{label}</span>}
          <div className="flex items-center gap-2">
            {showValue && <span>{clampedValue}%</span>}
            {rightLabel && (
              <span className="text-gray-400 font-medium">{rightLabel}</span>
            )}
          </div>
        </div>
      )}
      <div
        className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeMap[size]} ${className}`}
      >
        <div
          className={`h-full ${colorMap[color]} rounded-full transition-all duration-300`}
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
