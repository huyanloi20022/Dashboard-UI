import React from 'react';

type IconButtonVariant = "ghost" | "primary" | "secondary";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  badge?: React.ReactNode;
  variant?: IconButtonVariant;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, badge, variant = "ghost", className = "", ...props }, ref) => {
    const variants = {
      ghost: "text-gray-500 hover:text-purple-600",
      primary: "bg-purple-600 text-whit",
      secondary: "bg-white text-purple-600 border border-gray-200",
    };

    return (
      <button
        ref={ref}
        className={`relative p-2 cursor-pointer rounded-lg transition-all active:scale-95 ${variants[variant]} ${className}`}
        {...props}
      >
        {icon}
        {badge}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
