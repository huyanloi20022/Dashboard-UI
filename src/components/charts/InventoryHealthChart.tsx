import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Card, ChartHeader } from "../ui";

const InventoryHealthChart = () => {
  const inventoryData = {
    labels: ["Electronics", "Fashion", "Grocery", "Home & Garden", "Beauty"],
    datasets: [
      {
        label: "Low Stock",
        data: [12, 45, 8, 22, 18],
        backgroundColor: "rgba(239, 68, 68, 0.6)", // Red
        borderRadius: 6,
      },
      {
        label: "Out of Stock",
        data: [3, 12, 1, 5, 4],
        backgroundColor: "rgba(31, 41, 55, 0.6)", // Dark Gray
        borderRadius: 6,
      },
    ],
  };

  return (
    <Card className="col-span-8 p-8 bg-white border-2 border-gray-100 font-['Inter']" hoverable={false}>
      <ChartHeader
        title="Inventory Status"
        subtitle="Stock alerts by category"
        mb="mb-6"
        actions={
          <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">
            12 Critical SKUs
          </span>
        }
      />
      <div className="h-[300px]">
        <Bar
          data={inventoryData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { stacked: true, grid: { display: false } },
              y: { stacked: true, grid: { color: "#f3f4f6" } }
            }
          }}
        />
      </div>
    </Card>
  );
};

export default InventoryHealthChart;
