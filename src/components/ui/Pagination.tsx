import React from "react";
import { Icon } from "./index";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  showingLabel?: string;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showingLabel = "transactions",
  className = "",
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`h-9 w-9 flex items-center justify-center rounded-xl font-bold text-xs shadow-sm transition-all border
            ${isActive
              ? "border-transparent bg-purple-600 text-white shadow-purple-200 shadow-lg"
              : "border-gray-100 bg-white text-gray-700 hover:text-purple-600 hover:border-purple-200"
            }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={`p-8 bg-white rounded-[32px] border border-gray-100 flex items-center justify-between shadow-sm ${className}`}>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Showing {startItem}-{endItem} of {totalItems} {showingLabel}
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="chevron_left" size="md" />
        </button>

        <div className="flex items-center gap-2">
          {renderPageButtons()}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="chevron_right" size="md" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
