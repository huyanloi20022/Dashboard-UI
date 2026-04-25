import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon, IconButton } from "./index";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SlideOver: React.FC<SlideOverProps> = ({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-md bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Payment Details</p>
              </div>
              <IconButton
                icon={<Icon name="close" size="md" />}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
              />
            </div>

            {/* Content */}
            <div className="relative flex-1 p-6 animate-in fade-in slide-in-from-right-4 duration-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SlideOver;
