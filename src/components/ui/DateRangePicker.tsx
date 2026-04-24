import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  range,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(range.start));
  const [selecting, setSelecting] = useState<"start" | "end">("start");
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
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

    if (selecting === "start") {
      onChange({ ...range, start: selectedDate });
      setSelecting("end");
    } else {
      if (selectedDate < range.start) {
        onChange({ start: selectedDate, end: range.start });
      } else {
        onChange({ ...range, end: selectedDate });
      }
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const handlePresetClick = (preset: { days?: number; special?: string }) => {
    const end = new Date();
    let start = new Date();
    if (preset.special === "thisMonth") {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else if (preset.special === "lastMonth") {
      start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
      end.setDate(0);
    } else {
      start.setDate(end.getDate() - (preset.days || 0));
    }
    onChange({ start, end });
    setViewDate(start);
    setIsOpen(false);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear();
  };

  const isInRange = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return date >= range.start && date <= range.end;
  };

  const isStart = (day: number) => {
    return range.start.getDate() === day &&
      range.start.getMonth() === viewDate.getMonth() &&
      range.start.getFullYear() === viewDate.getFullYear();
  };

  const isEnd = (day: number) => {
    return range.end.getDate() === day &&
      range.end.getMonth() === viewDate.getMonth() &&
      range.end.getFullYear() === viewDate.getFullYear();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const active = isInRange(d);
      const start = isStart(d);
      const end = isEnd(d);
      const today = isToday(d);

      let style = "text-gray-700 hover:bg-purple-50 hover:text-purple-600";
      if (active) {
        style = "bg-purple-50 text-purple-700";
      }
      if (start || end) {
        style = "bg-purple-600 text-white";
      }

      days.push(
        <button
          key={d}
          onClick={() => handleDateSelect(d)}
          className={`h-9 w-9 rounded-full text-sm font-medium transition-all ${style} ${today && !start && !end ? "border-2 border-purple-200" : ""} flex items-center justify-center relative`}
        >
          {d}
          {active && !start && !end && (
            <div className="absolute inset-0 bg-purple-50 -z-10 rounded-full" />
          )}
        </button>
      );
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-purple-200 rounded-full hover:border-purple-200 transition-all shadow-sm group whitespace-nowrap"
      >
        <Icon
          name="calendar_month"
          size="sm"
          className="text-gray-900 group-hover:text-purple-500"
        />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-purple-600 font-bold">{formatDate(range.start)}</span>
          <span className="text-gray-600 font-bold">—</span>
          <span className="text-purple-600 font-bold">{formatDate(range.end)}</span>
        </div>
        <Icon name="expand_more" size="xs" className={`text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-100 flex bg-gray-200 rounded-2xl shadow-3xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="w-32 bg-purple-500/50 border-r border-gray-100 p-2 flex flex-col gap-1">
            {[
              { label: "Today", days: 0 },
              { label: "Yesterday", days: 1 },
              { label: "Last 7 Days", days: 7 },
              { label: "Last 30 Days", days: 30 },
              { label: "This Month", special: "thisMonth" },
              { label: "Last Month", special: "lastMonth" },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetClick(preset)}
                className="text-[10px] font-bold text-left px-3 py-2 rounded-lg text-gray-900 hover:bg-white hover:text-purple-600 hover:shadow-sm transition-all uppercase tracking-wider"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="p-4 w-72">
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

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                {selecting === "start" ? "Select start" : "Select end"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold text-purple-600 hover:text-purple-700 uppercase tracking-widest"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
