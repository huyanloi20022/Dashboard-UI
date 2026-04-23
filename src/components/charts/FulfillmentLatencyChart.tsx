import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Card, Icon, ChartHeader } from "../ui";

const FulfillmentLatencyChart = () => {
  const fulfillmentData = {
    labels: ["Order Prep", "Packaging", "Carrier Pickup", "Transit Time"],
    datasets: [
      {
        label: "Avg. Hours",
        data: [4, 2, 8, 42],
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 400, 0);
          gradient.addColorStop(0, "rgba(6, 182, 212, 0.8)"); // Cyan-500
          gradient.addColorStop(1, "rgba(6, 182, 212, 0.2)"); // Cyan-500 light
          return gradient;
        },
        borderRadius: 12,
        barThickness: 24,
      },
    ],
  };

  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl" hoverable={false}>
      <ChartHeader
        title="Fulfillment Latency"
        subtitle="Average time in each stage (Hours)"
        actions={
          <div className="flex items-center gap-1 px-2 py-1 bg-cyan-50 text-cyan-600 rounded-lg text-[10px] font-bold">
            <Icon name="timer" size="xs" />
            <span>56h TOTAL</span>
          </div>
        }
      />
      <div className="h-[280px] p-6 pt-2">
        <Bar
          data={fulfillmentData}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#1f2937",
                padding: 12,
                cornerRadius: 8,
              }
            },
            scales: {
              x: {
                grid: { color: "rgba(0, 0, 0, 0.03)" },
                border: { display: false },
                ticks: { font: { size: 10, weight: 600 }, color: "#9ca3af" }
              },
              y: {
                grid: { display: false },
                border: { display: false },
                ticks: { font: { size: 11, weight: 700 }, color: "#4b5563" }
              }
            }
          }}
        />
      </div>
    </Card>
  );
};

export default FulfillmentLatencyChart;
