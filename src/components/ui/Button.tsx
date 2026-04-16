import React from "react";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      loading = false,
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "font-bold transition-colors duration-200 rounded-xl flex items-center gap-2 cursor-pointer";

    const variants = {
      primary:
        "bg-gray-900 text-white hover:bg-purple-600 disabled:bg-gray-400",
      secondary:
        "bg-white text-purple-600 hover:bg-purple-50 border border-gray-200 disabled:opacity-50",
      link: "text-purple-600 hover:underline disabled:opacity-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const widthClass = fullWidth ? "w-full justify-center" : "";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            {children}
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
