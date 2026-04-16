import React from "react";

type BadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "danger"
  | "notifications"
  | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  value?: number;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", icon, value, className = "", children, ...props },
    ref,
  ) => {
    const variants = {
      success: "bg-green-50 text-green-700",
      warning: "bg-yellow-50 text-yellow-700",
      error: "bg-red-50 text-red-700",
      info: "bg-cyan-50 text-cyan-700",
      default: "bg-gray-50 text-gray-700",
      notifications: "bg-red-500 text-white",
      danger: "bg-red-50 text-red-700",
    };

    return (
      <span
        ref={ref}
        className={`text-xs font-bold rounded-full flex items-center justify-center gap-1 ${variants[variant]} ${className}`}
        {...props}
      >
        {icon}
        {children}
        {value}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
