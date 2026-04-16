import React from "react";

type IconSize = "xxs" | "xs" | "sm" | "md" | "lg" | "semixl" | "xl";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: IconSize;
  filled?: boolean;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  filled = false,
  className = "",
  ...props
}) => {
  const sizeMap: Record<IconSize, number> = {
    xxs: 12,
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    semixl: 28,
    xl: 32,
  };

  const style = {
    fontSize: `${sizeMap[size]}px`,
    ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}),
  };

  return (
    <span
      className={`material-symbols-outlined shrink-0 transition-all ${className}`}
      style={style}
      {...props}
    >
      {name}
    </span>
  );
};

Icon.displayName = "Icon";

export default Icon;
