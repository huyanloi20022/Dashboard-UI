import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
  label?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      suffix,
      error,
      label,
      fullWidth = true,
      wrapperClassName = "",
      containerClassName = "",
      inputClassName = "",
      iconClassName = "",
      labelClassName = "",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${wrapperClassName}`}>
        {label && (
          <label className={`block text-sm font-semibold text-gray-900 transition-colors mb-2 ${labelClassName}`}>
            {label}
          </label>
        )}
        <div className={`group flex items-center border-2 rounded-full px-4 py-2 transition-all duration-200 
          bg-white border-gray-200 
          focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 focus-within:shadow-sm
          ${containerClassName}`}>
          {icon && (
            <span className={`mr-3 flex items-center transition-colors text-gray-500 group-focus-within:text-purple-500 ${iconClassName}`}>
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`bg-transparent border-none focus:ring-0 outline-none text-sm w-full text-gray-900 placeholder-gray-400 ${inputClassName} ${className}`}
            {...props}
          />
          {suffix && (
            <div className="ml-2 flex items-center">
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-1.5 ml-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
