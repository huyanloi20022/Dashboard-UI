import React from "react";
import { Button, Input, Icon, DatePicker } from "./index";

interface TableToolbarProps {
  // Search Field
  searchLabel?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Date Fields
  startDate?: Date;
  onStartDateChange?: (date: Date) => void;

  endDate?: Date;
  onEndDateChange?: (date: Date) => void;

  // Actions
  onSearchSubmit?: () => void;
  onAddNew?: () => void;
  addNewLabel?: string;

  className?: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  searchLabel = "Search",
  searchPlaceholder = "Search everything...",
  searchValue,
  onSearchChange,
  startDate = new Date(),
  onStartDateChange,
  endDate = new Date(),
  onEndDateChange,
  onSearchSubmit,
  onAddNew,
  addNewLabel = "Add New",
  className = "",
}) => {
  const handleStartDateChange = (date: Date) => {
    if (endDate && date > endDate) {
      onEndDateChange?.(date);
    }
    onStartDateChange?.(date);
  };

  const handleEndDateChange = (date: Date) => {
    if (startDate && date < startDate) {
      onStartDateChange?.(date);
    }
    onEndDateChange?.(date);
  };

  return (
    <div className={`flex flex-wrap items-end gap-3 p-3 bg-white/50 backdrop-blur-md rounded-[24px] border border-gray-100 shadow-sm ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <Input
          label={searchLabel}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          containerClassName="!rounded-xl border-gray-100 bg-white"
          labelClassName="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3 ml-1 placeholder:text-gray-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-bold uppercase text-[10px] tracking-widest ml-1">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          triggerClassName="!rounded-xl border-2 border-gray-50 bg-white h-[46px] w-48 justify-between"
          iconPosition="right"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-bold uppercase text-[10px] tracking-widest ml-1">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          triggerClassName="!rounded-xl border-2 border-gray-50 bg-white h-[46px] w-48 justify-between"
          iconPosition="right"
        />
      </div>
      <button
        onClick={onSearchSubmit}
        className="h-[46px] w-[46px] bg-purple-600 text-white rounded-xl flex items-center justify-center hover:bg-purple-700 cursor-pointer transition-all shadow-lg shadow-emerald-100 active:scale-95"
      >
        <Icon name="search" size="sm" />
      </button>
      <div className="grow" />
      <Button
        onClick={onAddNew}
        icon={<Icon name="add" size="sm" />}
        className="h-[46px] px-4 border-2 hover:bg-purple-600 hover:text-white! bg-white text-purple-600! border-purple-600 rounded-xl shadow-lg shadow-indigo-100 font-bold text-[13px] duration-300"
      >
        {addNewLabel}
      </Button>
    </div>
  );
};

export default TableToolbar;
