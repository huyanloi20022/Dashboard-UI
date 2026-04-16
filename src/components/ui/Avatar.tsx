import React from "react";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  name?: string;
  initials?: string;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    { size = "md", name, initials, src, alt, className = "", ...props },
    ref,
  ) => {
    const sizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    // Generate initials from name if not provided
    const displayInitials =
      initials ||
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() ||
      "";

    if (!src) {
      return (
        <div
          className={`${sizes[size]} rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm ${className}`}
        >
          {displayInitials}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt || name || "User"}
        className={`${sizes[size]} rounded-full object-cover border-2 border-purple-100 ${className}`}
        {...props}
      />
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
