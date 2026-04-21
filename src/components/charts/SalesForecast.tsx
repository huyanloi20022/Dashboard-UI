import { Line } from "react-chartjs-2";
import { Card, ChartHeader } from "../ui";
import type { ChartOptions, ChartData } from "chart.js";

const SalesForecast = () => {
  const labels = ["Oct", "Nov", "Dec", "Jan (Now)", "Feb", "Mar"];
  const currentMonthIndex = 3; // Index of Jan (Now)

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Sales Revenue",
        data: [4200, 5800, 4900, 7200, 8500, 9100],
        borderColor: "#7C3AED", // Purple-600
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        borderWidth: 3,
        pointRadius: (ctx) => (ctx.dataIndex === currentMonthIndex ? 8 : 4),
        pointBackgroundColor: (ctx) => (ctx.dataIndex === currentMonthIndex ? "#7C3AED" : "#fff"),
        pointBorderColor: "#7C3AED",
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true,
        // Segment styling: use dashed line for points AFTER the current month
        segment: {
          borderDash: (ctx) => ctx.p1DataIndex > currentMonthIndex ? [6, 6] : undefined,
        },
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
            const isForecast = context.dataIndex > currentMonthIndex;
            return ` $${context.parsed.y.toLocaleString()} ${isForecast ? "(Forecasted)" : "(Actual)"}`;
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
          font: {
            size: 11,
            weight: 600,
          },
          color: "#9ca3af",
        },
      },
      y: {
        beginAtZero: true,
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
          callback: (value) => "$" + (Number(value) / 1000) + "k",
        },
      },
    },
  };

  return (
    <Card className="col-span-12 lg:col-span-8 bg-white border-2 border-gray-200 shadow-xl" hoverable={false}>
      <ChartHeader
        title="Sales Forecast"
        subtitle="Predicting growth trends for the next quarter"
        actions={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t-2 border-purple-600"></span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-purple-600"></span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Forecast</span>
            </div>
          </div>
        }
      />

      <div className="h-[320px] w-full">
        <Line data={data} options={options} />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Projected Growth</span>
          <span className="text-sm font-bold text-green-600">+15.8%</span>
        </div>
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estimated Q1 Rev</span>
          <span className="text-sm font-bold text-gray-900">$24,800</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Model Accuracy</span>
          <span className="text-sm font-bold text-purple-600">94.2%</span>
        </div>
      </div>
    </Card>
  );
};

export default SalesForecast;
