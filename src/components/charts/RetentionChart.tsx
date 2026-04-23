import { useRef, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card, ChartHeader, Icon } from "../ui";
import { Chart as ChartJS } from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";

const RetentionChart = () => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "New",
        data: [450, 520, 480, 610, 590, 650],
        backgroundColor: "#6366f1", // Indigo-500
        borderRadius: 8,
        stack: "Stack 0",
        barThickness: 28,
      },
      {
        label: "Returning",
        data: [120, 150, 180, 210, 240, 290],
        backgroundColor: "#06b6d4", // Cyan-500
        borderRadius: 8,
        stack: "Stack 0",
        barThickness: 28,
      },
      {
        label: "Loyal",
        data: [40, 60, 90, 110, 130, 160],
        backgroundColor: "#10b981", // Emerald-500
        borderRadius: 8,
        stack: "Stack 0",
        barThickness: 28,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1f2937",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 10, weight: 600 }, color: "#9ca3af" },
        border: { display: false }
      },
      y: {
        stacked: true,
        grid: { color: "rgba(0, 0, 0, 0.03)" },
        border: { display: false },
        ticks: { font: { size: 10, weight: 600 }, color: "#9ca3af", maxTicksLimit: 5, padding: 8 },
      },
    },
  };

  const toggleDataset = (index: number) => {
    const chart = chartRef.current;
    if (chart) {
      if (chart.isDatasetVisible(index)) {
        chart.hide(index);
        setHiddenIndices((prev) => [...prev, index]);
      } else {
        chart.show(index);
        setHiddenIndices((prev) => prev.filter((i) => i !== index));
      }
    }
  };

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Retention Segments"
        subtitle="New vs Returning vs Loyal customer mix"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100/50 p-1 rounded-lg">
              {['6M', '12M', 'ALL'].map((range) => (
                <button
                  key={range}
                  className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${range === '6M' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200"></div>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Settings">
              <Icon name="settings" size="sm" />
            </button>
          </div>
        }
      />

      <div className="px-6 py-4 flex flex-wrap gap-2">
        {data.datasets.map((ds, i) => {
          const isHidden = hiddenIndices.includes(i);
          return (
            <button
              key={ds.label}
              onClick={() => toggleDataset(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${isHidden
                  ? "bg-gray-50 border-gray-100 opacity-40 grayscale shadow-inner"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: ds.backgroundColor as string }}
              ></div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${isHidden ? "text-slate-400" : "text-slate-700"
                }`}>
                {ds.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-[240px] w-full p-6 pt-0">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      <div className="p-6 bg-gray-50/10 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Retention Rate</span>
            <span className="text-lg font-black text-slate-900 leading-none">32.4%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Avg LTV</span>
            <span className="text-lg font-black text-slate-900 leading-none">$1,240</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-bold text-indigo-600 hover:bg-indigo-100 transition-all shadow-sm uppercase tracking-wider">
          Deep Dive
          <Icon name="analytics" size="xs" />
        </button>
      </div>
    </Card>
  );
};

export default RetentionChart;
