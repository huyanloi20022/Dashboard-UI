import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Card, ChartHeader, Icon } from "../ui";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";

const TransactionStatusChart: React.FC = () => {
  const statusData: ChartData<"bar"> = {
    labels: ["Success", "Pending", "Failed", "Refunded"],
    datasets: [
      {
        label: "Transactions",
        data: [1240, 120, 45, 12],
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 500, 0);

          switch (context.dataIndex) {
            case 0: // Success
              gradient.addColorStop(0, "rgba(16, 185, 129, 0.8)");
              gradient.addColorStop(1, "rgba(16, 185, 129, 0.2)");
              break;
            case 1: // Pending
              gradient.addColorStop(0, "rgba(245, 158, 11, 0.8)");
              gradient.addColorStop(1, "rgba(245, 158, 11, 0.2)");
              break;
            case 2: // Failed
              gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)");
              gradient.addColorStop(1, "rgba(239, 68, 68, 0.2)");
              break;
            case 3: // Refunded
              gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)");
              gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)");
              break;
          }
          return gradient;
        },
        borderRadius: 12,
        borderWidth: 0,
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
        titleFont: { size: 13, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
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
        },
      },
      y: {
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

  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <div className="p-6 pb-0">
        <ChartHeader
          title="Operational Health"
          subtitle="Real-time transaction status breakdown"
          actions={
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                <Icon name="check_circle" size="xs" />
                <span className="text-[10px] font-black uppercase tracking-widest">98.2% Reliable</span>
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Refresh Live Data">
                <Icon name="refresh" size="sm" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="View Error Logs">
                <Icon name="terminal" size="sm" />
              </button>
            </div>
          }
        />
      </div>

      <div className="h-[250px] p-6 pt-1">
        <Bar data={statusData} options={options} />
      </div>

      <div className="grid grid-cols-4 gap-0 border-t border-gray-100 bg-gray-50/20">
        {[
          { label: "Success", val: "1,240", color: "text-emerald-500" },
          { label: "Pending", val: "120", color: "text-amber-500" },
          { label: "Failed", val: "45", color: "text-rose-500" },
          { label: "Refund", val: "12", color: "text-indigo-500" },
        ].map((item, i) => (
          <div key={item.label} className={`p-4 flex flex-col items-center justify-center ${i < 3 ? "border-r border-gray-100" : ""}`}>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</span>
            <span className={`text-[15px] font-black ${item.color}`}>{item.val}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionStatusChart;
