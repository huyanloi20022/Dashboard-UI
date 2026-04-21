import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { hoverable = false, bordered = true, className = "", children, ...props },
    ref,
  ) => {
    const hoverClass = hoverable
      ? "group hover:shadow-md hover:-translate-y-1"
      : "";
    const borderClass = bordered ? "border border-gray-100" : "";

    return (
      <div
        ref={ref}
        className={`bg-white p-6 rounded-2xl shadow-sm ${borderClass} ${hoverClass} transition-all ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
