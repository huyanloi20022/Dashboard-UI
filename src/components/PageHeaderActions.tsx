import React from "react";
import { Button, Toggle, Icon, IconButton } from "./ui";
import DateRangePicker from "./ui/DateRangePicker";

interface DateRange {
  start: Date;
  end: Date;
}

interface PageHeaderActionsProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  compareEnabled: boolean;
  onCompareToggle: (enabled: boolean) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  onFilterClick?: () => void;
}

const PageHeaderActions: React.FC<PageHeaderActionsProps> = ({
  dateRange,
  onDateRangeChange,
  compareEnabled,
  onCompareToggle,
  onExport,
  onRefresh,
  onFilterClick,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 mt-[-1rem] bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
      {/* Left side: Date Range */}
      <div className="flex items-center gap-2">
        <DateRangePicker
          range={dateRange}
          onChange={onDateRangeChange}
        />

      </div>

      {/* Right side: Secondary Actions */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 px-3">
          <Toggle
            label="Mode"
            checked={compareEnabled}
            onChange={(e) => onCompareToggle(e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-1 px-1 mr-2 border-r border-gray-100">
          <IconButton
            icon={<Icon name="refresh" size="sm" />}
            onClick={onRefresh}
            className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
            title="Refresh Data"
          />
          <IconButton
            icon={<Icon name="filter_list" size="sm" />}
            onClick={onFilterClick}
            className="text-gray-400 hover:text-purple-600 hover:bg-purple-50"
            title="Advanced Filters"
          />
        </div>

        <Button
          variant="primary"
          className="text-[11px] h-9 px-6 rounded-xl shadow-lg shadow-purple-200"
          icon={<Icon name="download" size="sm" />}
          onClick={onExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default PageHeaderActions;
