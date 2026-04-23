import React, { useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Card, ChartHeader } from "../ui";
import { Chart as ChartJS } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

const OrderStatusChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  const data: ChartData<"doughnut"> = {
    labels: ["Delivered", "In Transit", "Processing", "Cancelled", "Returned"],
    datasets: [
      {
        data: [65, 15, 10, 6, 4],
        backgroundColor: [
          "#10b981", // Emerald-500
          "#3b82f6", // Blue-500
          "#f59e0b", // Amber-500
          "#f43f5e", // Rose-500
          "#64748b", // Slate-500
        ],
        hoverBackgroundColor: [
          "#059669",
          "#2563eb",
          "#d97706",
          "#e11d48",
          "#475569",
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
        title="Order Cycle"
        subtitle="Status breakdown"
        actions={
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
            Real-time
          </span>
        }
      />

      <div className="relative h-48 w-full mb-8 mt-4 flex items-center justify-center">
        <Doughnut ref={chartRef} data={data} options={options} />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-slate-900 tracking-tight leading-none">1,248</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Total Orders
          </span>
        </div>
      </div>

      <div className="px-6 pb-8 grid grid-cols-2 gap-3">
        {data.labels?.map((label, i) => {
          const isHidden = hiddenIndices.includes(i);
          const color = (data.datasets[0].backgroundColor as string[])[i];
          const val = (data.datasets[0].data as number[])[i];

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
                  {val}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default OrderStatusChart;
