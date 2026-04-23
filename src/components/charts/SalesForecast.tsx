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
        borderColor: "#6366f1", // Indigo-500
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        borderWidth: 3,
        pointRadius: (ctx) => (ctx.dataIndex === currentMonthIndex ? 8 : 0),
        pointHoverRadius: 6,
        pointBackgroundColor: (ctx) => (ctx.dataIndex === currentMonthIndex ? "#6366f1" : "#fff"),
        pointBorderColor: "#6366f1",
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
        displayColors: true,
        usePointStyle: true,
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
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 600,
          },
          color: "#9ca3af",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.03)",
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: 600,
          },
          color: "#9ca3af",
          maxTicksLimit: 5,
          padding: 8,
          callback: (value) => "$" + (Number(value) / 1000) + "k",
        },
      },
    },
  };

  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Sales Forecast"
        subtitle="Predicting growth trends for the next quarter"
        actions={
          <div className="flex items-center gap-4">
            <select className="bg-gray-50 border border-gray-100 text-[10px] font-black text-slate-600 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-100 transition-all uppercase tracking-tighter">
              <option>AI Projection Model</option>
              <option>Linear Regression</option>
              <option>Historical Avg</option>
            </select>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-indigo-500"></span>
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-indigo-500"></span>
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-tighter">Forecast</span>
              </div>
            </div>
          </div>
        }
      />

      <div className="h-[320px] w-full p-6 pt-0">
        <Line data={data} options={options} />
      </div>

      <div className="p-6 bg-gray-50/10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Projected Growth</span>
          <span className="text-lg font-black text-emerald-600 leading-none">+15.8%</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Estimated Q1</span>
          <span className="text-lg font-black text-slate-900 leading-none">$24,800</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Model Accuracy</span>
          <span className="text-lg font-black text-indigo-600 leading-none">94.2%</span>
        </div>
      </div>
    </Card>
  );

};

export default SalesForecast;
