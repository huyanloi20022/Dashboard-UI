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
          "#22C55E", // Green-500
          "#3B82F6", // Blue-500
          "#EAB308", // Yellow-500
          "#EF4444", // Red-500
          "#8B5CF6", // Purple-500
        ],
        hoverBackgroundColor: [
          "#16A34A",
          "#2563EB",
          "#CA8A04",
          "#DC2626",
          "#7C3AED",
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
    <Card className="col-span-12 lg:col-span-4 border-2 border-gray-100 shadow-sm" hoverable={false}>
      <ChartHeader
        title="Order Cycle"
        subtitle="Status breakdown"
        actions={
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">
            Updated Now
          </span>
        }
      />

      <div className="relative h-40 w-full mb-10 mt-6 flex items-center justify-center">
        <Doughnut ref={chartRef} data={data} options={options} />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">1.2k</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Total Orders
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center">
        {data.labels?.map((label, i) => {
          const isHidden = hiddenIndices.includes(i);
          const color = (data.datasets[0].backgroundColor as string[])[i];

          return (
            <button
              key={label as string}
              onClick={() => toggleDataset(i)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-300 group ${isHidden
                ? "grayscale opacity-50"
                : "hover:bg-gray-50"
                }`}
            >
              <div
                className="w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: color }}
              ></div>
              <span className={`text-[12px] font-bold transition-colors ${isHidden ? "line-through text-gray-400" : "text-gray-700"
                }`}>
                {label as string}
              </span>

            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default OrderStatusChart;
