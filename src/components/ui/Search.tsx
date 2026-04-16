import React, { useState, useEffect, useRef } from "react";
import { Icon, Input, type InputProps } from "./index";

interface SearchProps extends InputProps {
  onClear?: () => void;
  showShortcut?: boolean;
}

const Search: React.FC<SearchProps> = ({
  onClear,
  className = "",
  ...props
}) => {
  const [value, setValue] = useState(props.value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);


  const handleClear = () => {
    setValue("");
    if (onClear) onClear();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={props.placeholder || "Search..."}
      wrapperClassName={className}
      containerClassName="border-gray-400 hover:border-purple-400"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      icon={<Icon name="search" size="md" />}
      suffix={
        value && (
          <button
            onClick={handleClear}
            className="transition-colors p-0.5 rounded-full flex items-center"
            type="button"
          >
            <Icon name="close" size="sm" className="text-red-500" />
          </button>
        )
      }
      {...props}
    />
  );
};

export default Search;
