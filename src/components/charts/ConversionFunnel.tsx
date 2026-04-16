import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "../ui";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConversionFunnel = () => {
  const labels = [
    "Website Visits",
    "Product Views",
    "Add to Cart",
    "Checkouts",
    "Purchases",
  ];

  const funnelData = [12450, 8200, 3100, 1500, 940];

  // Calculate percentages based on the first stage (Visits)
  const percentages = funnelData.map(
    (value) => ((value / funnelData[0]) * 100).toFixed(1) + "%"
  );

  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: "Users",
        data: funnelData,
        backgroundColor: [
          "#7C3AED", // Purple-600
          "#9333EA", // Purple-700
          "#C026D3", // Fuchsia-600
          "#DB2777", // Pink-600
          "#E11D48", // Rose-600
        ],
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const value = context.parsed.x;
            const pct = percentages[index];
            return ` ${value.toLocaleString()} users (${pct} of total)`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // Clean look, no axis
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 600,
          },
          color: "#4b5563",
        },
      },
    },
  };

  return (
    <Card className="col-span-12 lg:col-span-8 bg-white border-2 border-gray-200 shadow-xl" hoverable={false}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Conversion Funnel</h4>
          <p className="text-xs text-gray-400 mt-1">Visit to purchase journey</p>
        </div>
        <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {((funnelData[4] / funnelData[0]) * 100).toFixed(1)}% Conv. Rate
        </div>
      </div>

      <div className="h-[320px] w-full relative">
        <Bar data={data} options={options} />

        {/* Stage connection indicators (optional but nice) */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-around py-4 pr-2 pointer-events-none">
          {percentages.map((pct, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-300 text-right">
              {pct}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Overall Drop-off</span>
          <span className="text-sm font-bold text-red-500">
            {(100 - (funnelData[4] / funnelData[0]) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Cart to Checkout</span>
          <span className="text-sm font-bold text-gray-900">
            {((funnelData[3] / funnelData[2]) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ConversionFunnel;
