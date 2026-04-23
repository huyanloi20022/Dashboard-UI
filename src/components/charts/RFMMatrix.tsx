import { Bubble } from "react-chartjs-2";
import "chart.js/auto";
import { Card, Icon, ChartHeader } from "../ui";

const RFMMatrix = () => {
  const rfmData = {
    datasets: [
      {
        label: "Champions",
        data: [{ x: 90, y: 90, r: 25 }],
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo
        borderColor: "#6366f1",
        borderWidth: 2,
      },
      {
        label: "Loyal Customers",
        data: [{ x: 70, y: 80, r: 20 }, { x: 80, y: 70, r: 18 }],
        backgroundColor: "rgba(16, 185, 129, 0.7)", // Emerald
        borderColor: "#10b981",
        borderWidth: 2,
      },
      {
        label: "At Risk",
        data: [{ x: 20, y: 30, r: 15 }, { x: 30, y: 20, r: 12 }],
        backgroundColor: "rgba(244, 63, 94, 0.7)", // Rose
        borderColor: "#f43f5e",
        borderWidth: 2,
      },
      {
        label: "New Customers",
        data: [{ x: 95, y: 10, r: 10 }, { x: 85, y: 15, r: 8 }],
        backgroundColor: "rgba(14, 165, 233, 0.7)", // Sky
        borderColor: "#0ea5e9",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Customer RFM Matrix"
        subtitle="Recency vs Frequency mapping"
        actions={
          <div className="group relative">
            <Icon name="info" size="xs" className="text-gray-300 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Recency vs Frequency analysis. Bubble size represents Monetary value.
            </div>
          </div>
        }
      />
      <div className="h-[320px] p-6 pt-0">
        <Bubble
          data={rfmData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: { display: true, text: "RECENCY", font: { size: 9, weight: "bold" }, color: "#9ca3af" },
                min: 0,
                max: 110,
                grid: { color: "rgba(0, 0, 0, 0.03)" },
                ticks: { font: { size: 10, weight: 600 }, color: "#9ca3af" }
              },
              y: {
                title: { display: true, text: "FREQUENCY", font: { size: 9, weight: "bold" }, color: "#9ca3af" },
                min: 0,
                max: 110,
                grid: { color: "rgba(0, 0, 0, 0.03)" },
                ticks: { font: { size: 10, weight: 600 }, color: "#9ca3af" }
              }
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  padding: 20,
                  font: { size: 10, weight: 600 },
                  color: "#4b5563"
                }
              },
              tooltip: {
                backgroundColor: "#1f2937",
                padding: 12,
                cornerRadius: 8,
              }
            }
          }}
        />
      </div>
    </Card>
  );
};

export default RFMMatrix;
