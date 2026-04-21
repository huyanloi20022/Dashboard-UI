import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Card, ChartHeader, Icon } from "../ui";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";

const PaymentHealthChart: React.FC = () => {
  const labels = [
    "Apr 07", "Apr 08", "Apr 09", "Apr 10", "Apr 11", "Apr 12", "Apr 13",
    "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20", "Apr 21"
  ];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Success Volume",
        data: [65, 59, 80, 81, 56, 55, 40, 72, 88, 92, 105, 98, 85, 110, 124],
        borderColor: "#7C3AED", // Purple-600
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(124, 58, 237, 0.2)");
          gradient.addColorStop(1, "rgba(124, 58, 237, 0)");
          return gradient;
        },
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#7C3AED",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Refunds",
        data: [4, 6, 3, 5, 2, 7, 4, 3, 5, 8, 4, 2, 6, 3, 5],
        borderColor: "#F59E0B", // Amber-500
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(245, 158, 11, 0.15)");
          gradient.addColorStop(1, "rgba(245, 158, 11, 0)");
          return gradient;
        },
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return ` ${label}: ${value.toLocaleString()} units`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 10, weight: 600 },
          color: "#9ca3af",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.04)",
          // @ts-ignore - Chart.js 4 type issue
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: { size: 10, weight: 600 },
          color: "#9ca3af",
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <Card className="col-span-8 border-2 border-gray-200 shadow-lg overflow-hidden" hoverable={false}>
      <div className="p-6 pb-0 flex items-center justify-between">
        <ChartHeader
          title="Payment Health Trend"
          subtitle="Real-time transaction volume & refund rate"
          mb="mb-0"
        />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600 shadow-sm shadow-purple-200"></div>
            <span className="text-xs font-bold text-gray-600">Success</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-200 border-2 border-dashed border-white"></div>
            <span className="text-xs font-bold text-gray-600">Refunds</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full mt-4 p-6 pt-0">
        <Line data={data} options={options} />
      </div>

      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success Rate</span>
            <span className="text-lg font-black text-gray-900">98.4%</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg daily items</span>
            <span className="text-lg font-black text-gray-900">84</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-purple-600 hover:bg-purple-50 hover:border-purple-200 transition-all shadow-sm">
          Detailed Report
          <Icon name="arrow_forward" size="sm" />
        </button>
      </div>
    </Card>
  );
};

export default PaymentHealthChart;
