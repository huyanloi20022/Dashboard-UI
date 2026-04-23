import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Card, ChartHeader, Icon } from "../ui";
import { Chart as ChartJS } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

const InventoryHealthChart: React.FC = () => {
  const chartRef = React.useRef<ChartJS<"bar">>(null);
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  const inventoryData: ChartData<"bar"> = {
    labels: ["Electronics", "Fashion", "Grocery", "Home & Garden", "Beauty"],
    datasets: [
      {
        label: "Low Stock",
        data: [12, 45, 8, 22, 18],
        backgroundColor: "rgba(245, 158, 11, 0.8)", // Amber-500
        borderRadius: 12,
        borderWidth: 0,
        barThickness: 16,
      },
      {
        label: "Out of Stock",
        data: [3, 12, 1, 5, 4],
        backgroundColor: "rgba(31, 41, 55, 0.9)",  // Gray-800
        borderRadius: 12,
        borderWidth: 0,
        barThickness: 16,
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
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.03)",
        },
        border: {
          display: false,
        },
        ticks: {
          font: { size: 10, weight: 600 },
          color: "#9ca3af",
          maxTicksLimit: 8,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: { size: 11, weight: 700 },
          color: "#4b5563",
        },
      },
    },
  };

  const toggleDataset = (index: number) => {
    const chart = chartRef.current;
    if (chart) {
      const isVisible = chart.isDatasetVisible(index);
      if (isVisible) {
        chart.hide(index);
        setHiddenIndices((prev) => [...prev, index]);
      } else {
        chart.show(index);
        setHiddenIndices((prev) => prev.filter((i) => i !== index));
      }
    }
  };

  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <div className="p-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ChartHeader
          title="Inventory Pulse"
          subtitle="Stock health distribution by category"
          mb="mb-0"
        />
        <div className="flex flex-wrap items-center gap-3">
          {inventoryData.datasets.map((ds, i) => {
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
          <div className="h-4 w-px bg-gray-200 mx-1 hidden md:block"></div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Filter View">
              <Icon name="filter_list" size="sm" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Export CSV">
              <Icon name="download" size="sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[260px] p-6 pt-6">
        <Bar ref={chartRef} data={inventoryData} options={options} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-gray-100 bg-gray-50/10">
        {[
          { label: "Low Stock", val: "105", sub: "+12% vs LW", color: "text-amber-600", icon: "warning" },
          { label: "Out of Stock", val: "25", sub: "-2 this week", color: "text-slate-900", icon: "cancel" },
          { label: "Health Index", val: "92%", sub: "Stable", color: "text-emerald-600", icon: "favorite" },
          { label: "Value at Risk", val: "$12.4k", sub: "Potential Loss", color: "text-rose-500", icon: "payments" },
        ].map((item, i) => (
          <div key={item.label} className={`p-5 flex flex-col items-center justify-center ${i < 3 ? "md:border-r border-gray-100" : ""} group hover:bg-white transition-colors`}>
            <div className="flex items-center gap-2 mb-1">
              <Icon name={item.icon} size="xs" className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
            </div>
            <span className={`text-lg font-black ${item.color} leading-none mb-1`}>{item.val}</span>
            <span className="text-[9px] font-medium text-gray-400">{item.sub}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InventoryHealthChart;
