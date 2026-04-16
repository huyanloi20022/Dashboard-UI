import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

interface DatePickerProps {
  selected?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selected = new Date(),
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(selected));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear();
  };

  const isSelected = (day: number) => {
    return selected.getDate() === day &&
      selected.getMonth() === viewDate.getMonth() &&
      selected.getFullYear() === viewDate.getFullYear();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const selected_style = isSelected(d) ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "text-gray-700 hover:bg-purple-50 hover:text-purple-600";
      const today_style = isToday(d) && !isSelected(d) ? "border-2 border-purple-200" : "";

      days.push(
        <button
          key={d}
          onClick={() => handleDateSelect(d)}
          className={`h-9 w-9 rounded-full text-sm font-medium transition-all ${selected_style} ${today_style} flex items-center justify-center`}
        >
          {d}
        </button>
      );
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full hover:border-purple-200 transition-all shadow-sm group"
      >
        <Icon
          name="calendar_month"
          size="sm"
          className="text-gray-400 group-hover:text-purple-500"
        />
        <span className="text-sm font-semibold text-gray-700">{formatDate(selected)}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 w-72 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Icon name="chevron_left" size="sm" />
            </button>
            <h3 className="text-sm font-bold text-gray-900">
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Icon name="chevron_right" size="sm" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <div key={day} className="h-9 w-9 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <button
              onClick={() => {
                const today = new Date();
                onChange?.(today);
                setViewDate(today);
                setIsOpen(false);
              }}
              className="text-[11px] font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest"
            >
              Today
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
