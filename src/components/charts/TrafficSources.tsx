import React, { useRef } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Card, ChartHeader, Icon } from "../ui";
import { Chart as ChartJS } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

const TrafficSources: React.FC = () => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  const data: ChartData<"doughnut"> = {
    labels: ["Organic Search", "Direct", "Social Media", "Email"],
    datasets: [
      {
        data: [40, 35, 15, 10],
        backgroundColor: [
          "#6366f1", // Indigo-500
          "#06b6d4", // Cyan-500
          "#ec4899", // Pink-500
          "#10b981", // Emerald-500
        ],
        hoverBackgroundColor: [
          "#4f46e5",
          "#0891b2",
          "#db2777",
          "#059669",
        ],
        borderWidth: 0,
        borderRadius: 8,
        spacing: 4,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937",
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
    },
  };

  const toggleDataset = (index: number) => {
    const chart = chartRef.current;
    if (chart) {
      chart.toggleDataVisibility(index);
      chart.update();

      // Update local state to trigger React re-render for the legend text
      setHiddenIndices(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <Card className="col-span-12 lg:col-span-4 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Traffic Sources"
        subtitle="Visitor acquisition mix"
        actions={
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-wider">
              Live
            </span>
            <div className="h-4 w-px bg-gray-200"></div>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Export Report">
              <Icon name="ios_share" size="sm" />
            </button>
          </div>
        }
      />

      {/* Chart Display Area */}
      <div className="relative h-60 w-full mb-8 flex items-center justify-center">
        <Doughnut ref={chartRef} data={data} options={options} />

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-slate-900 tracking-tight">24k</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Total Visits
          </span>
        </div>
      </div>

      {/* Custom Interactive Legend */}
      <div className="px-6 pb-8 grid grid-cols-2 gap-3">
        {data.labels?.map((label, i) => {
          const isHidden = hiddenIndices.includes(i);
          const color = (data.datasets[0].backgroundColor as string[])[i];
          const value = data.datasets[0].data[i];

          return (
            <button
              key={label as string}
              onClick={() => toggleDataset(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 group ${
                isHidden
                  ? "bg-gray-50 border-gray-100 opacity-40 grayscale shadow-inner"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md active:scale-95"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                style={{ backgroundColor: color }}
              ></div>
              <div className="flex items-center gap-1 overflow-hidden">
                <span className={`text-[11px] font-black whitespace-nowrap transition-colors ${
                  isHidden ? "text-slate-400" : "text-slate-700"
                }`}>
                  {label as string}
                </span>
                <span className={`text-[11px] font-black ${
                  isHidden ? "text-slate-300" : "text-slate-900"
                }`}>
                  {value}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );

};

export default TrafficSources;
