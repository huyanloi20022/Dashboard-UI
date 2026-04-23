import React from "react";

interface StatBoxProps {
  label: string;
  value: string | number;
  description?: string;
  highlighted?: boolean;
  icon?: React.ReactNode;
}

const StatBox: React.FC<StatBoxProps> = ({
  label,
  value,
  description,
  highlighted = false,
  icon,
}) => {
  return (
    <div
      className={`p-4 bg-gray-50/50 rounded-xl transition-all duration-300 ${
        highlighted ? "border-2 border-indigo-100 shadow-sm" : "border-2 border-transparent"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">
            {label}
          </p>
          <p className="text-lg font-extrabold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
};

StatBox.displayName = "StatBox";

export default StatBox;
