import { Card, ChartHeader } from "../ui";

const CohortMatrix = () => {
  const cohorts = [
    { cohort: "Jan 2024", size: 1250, data: [100, 42, 38, 35, 32, 28] },
    { cohort: "Feb 2024", size: 980, data: [100, 38, 32, 30, 25] },
    { cohort: "Mar 2024", size: 1100, data: [100, 45, 40, 38] },
    { cohort: "Apr 2024", size: 850, data: [100, 40, 35] },
    { cohort: "May 2024", size: 1320, data: [100, 48] },
    { cohort: "Jun 2024", size: 950, data: [100] },
  ];

  const getColorClass = (value: number) => {
    if (value === 100) return "bg-indigo-600 text-white shadow-sm";
    if (value >= 40) return "bg-indigo-500/80 text-white shadow-sm";
    if (value >= 35) return "bg-indigo-400/60 text-white";
    if (value >= 30) return "bg-indigo-300/40 text-indigo-900";
    if (value >= 25) return "bg-indigo-200/30 text-indigo-800";
    return "bg-indigo-50/50 text-indigo-700";
  };

  return (
    <Card className="col-span-12 p-8 bg-white border-2 border-gray-100 font-['Inter'] shadow-sm overflow-x-auto" hoverable={false}>
      <ChartHeader
        title="Retention Cohorts"
        subtitle="User retention by acquisition month"
        actions={
          <div className="flex items-center gap-3">
            <select className="bg-gray-50 border border-gray-100 text-[10px] font-black text-slate-600 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-100 transition-all uppercase tracking-tighter">
              <option>Retention %</option>
              <option>Revenue $</option>
              <option>Order Frequency</option>
            </select>
            <div className="h-4 w-px bg-gray-200"></div>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <span className="material-symbols-rounded text-lg">settings</span>
            </button>
          </div>
        }
      />

      <table className="w-full text-left border-separate border-spacing-1">
        <thead>
          <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            <th className="pb-4 text-left pl-2">Cohort</th>
            <th className="pb-4">Users</th>
            <th className="pb-4">Month 0</th>
            <th className="pb-4">Month 1</th>
            <th className="pb-4">Month 2</th>
            <th className="pb-4">Month 3</th>
            <th className="pb-4">Month 4</th>
            <th className="pb-4">Month 5</th>
          </tr>
        </thead>
        <tbody className="text-[11px] font-bold">
          {cohorts.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 pl-2 text-gray-700 bg-gray-50/50 rounded-l-lg border-l border-y border-gray-100">
                {row.cohort}
              </td>
              <td className="py-3 text-center text-gray-400 bg-gray-50/50 border-y border-gray-100">
                {row.size.toLocaleString()}
              </td>
              {Array.from({ length: 6 }).map((_, mIdx) => {
                const value = row.data[mIdx];
                return (
                  <td
                    key={mIdx}
                    className={`py-3 text-center rounded-md border border-white transition-all transform hover:scale-105 cursor-help ${value !== undefined ? getColorClass(value) : "bg-transparent text-transparent"
                      }`}
                  >
                    {value !== undefined ? `${value}%` : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default CohortMatrix;
