import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        borderColor: color1,
        backgroundColor: "transparent",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 6,
        tension: 0,
        fill: true,
      },
      {
        label: label2,
        data: data2,
        borderColor: color2,
        backgroundColor: "transparent",
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 6,
        tension: 0,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        align: "center" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
          font: {
            size: 11,
            weight: 600,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1f2937",
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
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
          color: "#e0e0e0",
        },
        ticks: {
          font: {
            size: 10,
            weight: 600,
          },
          color: "#000000",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e0e0e0",
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 600,
          },
          color: "#000000",
          maxTicksLimit: 5,
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

  return <Line data={data} options={options} />;
};

export default DoubleLineChart;
