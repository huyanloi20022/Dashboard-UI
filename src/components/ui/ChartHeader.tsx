import React from "react";

interface ChartHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  mb?: string;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
  mb = "mb-8",
}) => {
  return (
    <div className={`flex justify-between items-start ${mb} ${className}`}>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-gray-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};

export default ChartHeader;
