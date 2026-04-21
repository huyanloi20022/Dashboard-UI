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
        backgroundColor: "rgba(6, 182, 212, 0.6)",
        borderRadius: 4,
      },
    ],
  };

  return (
    <Card className="col-span-12 lg:col-span-8 p-8 bg-white font-['Inter'] rounded-2xl shadow-sm border border-gray-100">
      <ChartHeader
        title="Fulfillment Latency"
        subtitle="Average time in each stage (Hours)"
        mb="mb-6"
        actions={<Icon name="timer" className="text-cyan-500" />}
      />
      <div className="h-[250px]">
        <Bar
          data={fulfillmentData}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: "#f3f4f6" }, border: { display: false } },
              y: { grid: { display: false }, border: { display: false } }
            }
          }}
        />
      </div>
    </Card>
  );
};

export default FulfillmentLatencyChart;
