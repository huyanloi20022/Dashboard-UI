import React, { useRef, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";

interface DoubleLineChartProps {
  data1: number[];
  data2: number[];
  labels: string[];
  label1: string;
  label2: string;
  color1?: string;
  color2?: string;
  unit?: string;
}


const DoubleLineChart: React.FC<DoubleLineChartProps> = ({
  data1,
  data2,
  labels,
  label1,
  label2,
  color1 = "#7C3AED",
  color2 = "#e9d526",
  unit = "",
}) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

  const toggleDataset = (index: number) => {
    const chart = chartRef.current;
    if (chart) {
      const isCurrentlyVisible = chart.isDatasetVisible(index);
      if (isCurrentlyVisible) {
        if (hiddenIndices.length < datasets.length - 1) {
          chart.hide(index);
          setHiddenIndices((prev) => [...prev, index]);
        }
      } else {
        chart.show(index);
        setHiddenIndices((prev) => prev.filter((i) => i !== index));
      }
    }
  };

  const datasets = [
    { label: label1, color: color1, data: data1 },
    { label: label2, color: color2, data: data2 }
  ];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        borderColor: color1,
        backgroundColor: "transparent",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: color1,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0,
        fill: false,
      },
      {
        label: label2,
        data: data2,
        borderColor: color2,
        backgroundColor: "transparent",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: color2,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    animation: false,
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
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += unit + context.parsed.y.toLocaleString();
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "#c9c9c9ff",
        },
        border: {
          display: true,
          color: "#a5a5a5",
          width: 2
        },
        ticks: {
          font: {
            size: 10,
            weight: 700,
          },
          color: "#1f2937",

        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#c9c9c9ff",
        },
        border: {
          display: true,
          color: "#a5a5a5",
          width: 2
        },
        ticks: {
          font: {
            size: 10,
            weight: 700,
          },
          color: "#1f2937",
          maxTicksLimit: 5,
          padding: 8,
          callback: (value) => {
            if (typeof value === "number") {
              if (value >= 1000) return unit + (value / 1000).toFixed(1) + "k";
              return unit + value;
            }
            return value;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        {datasets.map((ds, i) => {
          const isHidden = hiddenIndices.includes(i);
          return (
            <button
              key={ds.label}
              onClick={() => toggleDataset(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-100 ${isHidden
                ? "bg-gray-50 border-gray-100 opacity-40 grayscale shadow-inner"
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: ds.color }}
              ></div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${isHidden ? "text-slate-400" : "text-slate-700"
                }`}>
                {ds.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex-1 min-h-0">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default DoubleLineChart;

