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
      success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      warning: "bg-amber-50 text-amber-700 border border-amber-100",
      error: "bg-rose-50 text-rose-700 border border-rose-100",
      info: "bg-indigo-50 text-indigo-700 border border-indigo-100",
      default: "bg-slate-50 text-slate-600 border border-slate-100",
      notifications: "bg-rose-500 text-white shadow-sm",
      danger: "bg-rose-50 text-rose-700 border border-rose-100",
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
