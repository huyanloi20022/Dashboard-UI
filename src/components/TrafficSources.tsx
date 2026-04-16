import React, { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card } from "./ui";

ChartJS.register(ArcElement, Tooltip, Legend);

const TrafficSources: React.FC = () => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  const data: ChartData<"doughnut"> = {
    labels: ["Organic Search", "Direct", "Social Media", "Email"],
    datasets: [
      {
        data: [40, 35, 15, 10],
        backgroundColor: [
          "#7C3AED", // Purple-600
          "#06B6D4", // Cyan-500
          "#EC4899", // Pink-500
          "#10B981", // Green-500
        ],
        hoverBackgroundColor: [
          "#6D28D9",
          "#0891B2",
          "#DB2777",
          "#059669",
        ],
        borderWidth: 0,
        borderRadius: 4,
        spacing: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "82%",
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
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return ` ${label}: ${value}%`;
          },
        },
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
    <Card className="col-span-12 lg:col-span-4 border-2 border-gray-200 shadow-xl" hoverable={false}>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-lg font-bold text-gray-900">Traffic Sources</h4>
        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
          Live
        </span>
      </div>

      {/* Chart Display Area */}
      <div className="relative h-56 w-full mb-10 flex items-center justify-center">
        <Doughnut ref={chartRef} data={data} options={options} />

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">24k</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Total Visits
          </span>
        </div>
      </div>

      {/* Custom Interactive Legend */}
      <div className="grid grid-cols-1 gap-3">
        {data.labels?.map((label, i) => {
          const isHidden = hiddenIndices.includes(i);
          const color = (data.datasets[0].backgroundColor as string[])[i];
          const value = data.datasets[0].data[i];

          return (
            <button
              key={label as string}
              onClick={() => toggleDataset(i)}
              className={`flex items-center justify-between p-2 rounded-xl border border-transparent transition-all duration-300 group ${isHidden
                ? "grayscale"
                : "hover:bg-gray-50 hover:border-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-sm shadow-black/5"
                  style={{ backgroundColor: color }}
                ></div>
                <span className={`text-sm font-semibold transition-colors ${isHidden ? "line-through" : ""
                  }`}>
                  {label as string}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm font-bold ${isHidden ? "text-gray-500" : ""}`}>
                  {value}%
                </span>
                <div className={`w-1.5 h-1.5 rounded-full bg-gray-200 transition-transform group-hover:scale-125`}></div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default TrafficSources;
