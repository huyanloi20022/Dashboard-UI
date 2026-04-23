import { Bar } from "react-chartjs-2";
import { Card, ChartHeader } from "../ui";
import type { ChartOptions, ChartData } from "chart.js";

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
          "#6366f1", // Indigo-500
          "#818cf8", // Indigo-400
          "#a5b4fc", // Indigo-300
          "#c7d2fe", // Indigo-200
          "#e0e7ff", // Indigo-100
        ],
        borderRadius: 12,
        barThickness: 40,
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
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Conversion Funnel"
        subtitle="Visit to purchase journey analysis"
        actions={
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100/50 p-1 rounded-lg">
              {['All', 'Desktop', 'Mobile'].map((device) => (
                <button
                  key={device}
                  className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${
                    device === 'All' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {device}
                </button>
              ))}
            </div>
            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
              {((funnelData[4] / funnelData[0]) * 100).toFixed(1)}% Conv. Rate
            </div>
          </div>
        }
      />

      <div className="h-[400px] w-full relative">
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

      <div className="border-t border-gray-50 grid grid-cols-2 gap-4">
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
