import React from "react";

interface ToggleProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, size = "md", className = "", ...props }, ref) => {
    const sizeMap = {
      sm: {
        container: "w-8 h-4",
        thumb: "h-3 w-3",
        translate: "peer-checked:translate-x-4",
      },
      md: {
        container: "w-10 h-5",
        thumb: "h-4 w-4",
        translate: "peer-checked:translate-x-5",
      },
      lg: {
        container: "w-12 h-6",
        thumb: "h-5 w-5",
        translate: "peer-checked:translate-x-6",
      },
    };

    const current = sizeMap[size];

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {label && (
          <span className="text-sm font-medium text-gray-500">{label}</span>
        )}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...props}
            type="checkbox"
            ref={ref}
            className="sr-only peer"
          />
          <div
            className={`${current.container} bg-gray-300 peer-checked:bg-purple-600 rounded-full transition-colors duration-200`}
          ></div>
          <span
            className={`absolute top-0.5 left-0.5 ${current.thumb} ${current.translate} bg-white rounded-full shadow transition-transform duration-200 translate-x-0`}
          ></span>
        </label>
      </div>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
