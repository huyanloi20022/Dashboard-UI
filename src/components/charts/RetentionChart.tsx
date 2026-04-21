import { Bar } from "react-chartjs-2";
import { Card, ChartHeader } from "../ui";
import type { ChartOptions, ChartData } from "chart.js";

const RetentionChart = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "New Customers",
        data: [450, 520, 480, 610, 590, 650],
        backgroundColor: "#7C3AED", // Purple-600
        borderRadius: 4,
        stack: "Stack 0",
      },
      {
        label: "Returning (2nd)",
        data: [120, 150, 180, 210, 240, 290],
        backgroundColor: "#06B6D4", // Cyan-500
        borderRadius: 4,
        stack: "Stack 0",
      },
      {
        label: "Loyal (3rd+)",
        data: [40, 60, 90, 110, 130, 160],
        backgroundColor: "#EC4899", // Pink-500
        borderRadius: 4,
        stack: "Stack 0",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: "circle",
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
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 600,
          },
          color: "#9ca3af",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#f3f4f6",
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 600,
          },
          color: "#9ca3af",
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <Card className="col-span-12 lg:col-span-6 bg-white border-2 border-gray-200" hoverable={false}>
      <ChartHeader
        title="Customer Retention"
        subtitle="New vs. Returning over 6 months"
        actions={
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
            +24% Growth
          </div>
        }
      />

      <div className="h-[300px] w-full">
        <Bar data={data} options={options} />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Avg Retention</span>
            <span className="text-sm font-bold text-gray-900">32.4%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">LTV Average</span>
            <span className="text-sm font-bold text-gray-900">$1,240</span>
          </div>
        </div>
        <button className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors">
          View full report
        </button>
      </div>
    </Card>
  );
};

export default RetentionChart;
