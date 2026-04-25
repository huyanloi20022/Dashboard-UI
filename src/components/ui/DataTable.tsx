import React, { useState } from "react";
import { Button, Icon, Pagination } from "./index";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onExport?: () => void;
  entriesOptions?: number[];
  selectedEntries?: number;
  onEntriesChange?: (entries: number) => void;
  showCheckbox?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  className?: string;

  // Pagination props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

const DataTable = <T extends { id?: string | number }>({
  columns,
  data,
  onExport,
  entriesOptions = [10, 25, 50, 100],
  selectedEntries = 100,
  onEntriesChange,
  showCheckbox = true,
  onSelectionChange,
  className = "",
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: DataTableProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;

  const handleSelectAll = () => {
    let nextSelected: Set<string | number>;
    if (isAllSelected) {
      nextSelected = new Set();
    } else {
      nextSelected = new Set(data.map((row, idx) => row.id || idx));
    }
    setSelectedIds(nextSelected);
    onSelectionChange?.(Array.from(nextSelected));
  };

  const handleSelectRow = (id: string | number) => {
    const nextSelected = new Set(selectedIds);
    if (nextSelected.has(id)) {
      nextSelected.delete(id);
    } else {
      nextSelected.add(id);
    }
    setSelectedIds(nextSelected);
    onSelectionChange?.(Array.from(nextSelected));
  };
  return (
    <div className={`bg-white rounded-[32px] border border-gray-100/50 shadow-sm overflow-hidden ${className}`}>
      {/* Table Header / Toolbar */}
      <div className="px-7 py-3 flex items-center justify-between border-b border-gray-100/30">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <span className="text-gray-900">Show up to</span>
          <div className="relative group rounded-xl ">
            <select
              value={selectedEntries}
              onChange={(e) => onEntriesChange?.(Number(e.target.value))}
              className="appearance-none rounded-full bg-gray-50 border-2 border-purple-600 px-4 py-1.5 pr-10 focus:outline-none focus:border-purple-600 transition-all cursor-pointer font-bold text-purple-600"
            >
              {entriesOptions.map((opt) => (
                <option key={opt} value={opt} className="text-gray-900">
                  {opt}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              size="md"
              className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-purple-500 transition-colors"
            />
          </div>
          <span>Entries</span>
        </div>

        {onExport && (
          <Button
            onClick={onExport}
            variant="secondary"
            icon={<Icon name="south" size="sm" />}
            className="bg-purple-600! text-white border-purple-600 border-2 hover:bg-gray-100"
          >
            Export
          </Button>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100/30">
              {showCheckbox && (
                <th className="py-6 px-6 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-5 h-5 rounded-md border-gray-200 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col, idx) => {
                const isSlHeader = col.header === "Sl" || col.header === "SI";
                return (
                  <th
                    key={idx}
                    onClick={isSlHeader ? handleSelectAll : undefined}
                    className={`py-6 px-6 text-[13px] font-bold text-gray-400 whitespace-nowrap ${isSlHeader ? "cursor-pointer hover:text-purple-600" : ""} ${col.headerClassName || ""}`}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/30">
            {data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
              >
                {showCheckbox && (
                  <td className="py-6 px-6">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id || rowIdx)}
                      onChange={() => handleSelectRow(row.id || rowIdx)}
                      className="w-5 h-5 rounded-md border-gray-200 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`py-6 px-6 text-[13px] font-semibold text-gray-900 ${col.className || ""}`}
                  >
                    {typeof col.accessor === "function"
                      ? col.accessor(row, rowIdx)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentPage !== undefined && totalPages !== undefined && (
        <div className="border-t border-gray-100/30">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
            totalItems={totalItems || 0}
            itemsPerPage={itemsPerPage || 10}
            className="!border-none !shadow-none !rounded-none py-6 px-7"
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
