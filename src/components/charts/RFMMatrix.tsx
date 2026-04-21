import { Bubble } from "react-chartjs-2";
import "chart.js/auto";
import { Card, Icon, ChartHeader } from "../ui";

const RFMMatrix = () => {
  const rfmData = {
    datasets: [
      {
        label: "Champions",
        data: [{ x: 90, y: 90, r: 25 }],
        backgroundColor: "rgba(147, 51, 234, 0.6)",
      },
      {
        label: "Loyal Customers",
        data: [{ x: 70, y: 80, r: 20 }, { x: 80, y: 70, r: 18 }],
        backgroundColor: "rgba(6, 182, 212, 0.6)",
      },
      {
        label: "At Risk",
        data: [{ x: 20, y: 30, r: 15 }, { x: 30, y: 20, r: 12 }],
        backgroundColor: "rgba(239, 68, 68, 0.6)",
      },
      {
        label: "New Customers",
        data: [{ x: 95, y: 10, r: 10 }, { x: 85, y: 15, r: 8 }],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
    ],
  };

  return (
    <Card className="col-span-12 lg:col-span-6 p-8 bg-white border-2 border-gray-100 font-['Inter']" hoverable={false}>
      <ChartHeader
        title="RFM Analysis"
        mb="mb-6"
        actions={
          <div className="group relative">
            <Icon name="info" size="xs" className="text-gray-300 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Recency vs Frequency analysis. Bubble size represents Monetary value.
            </div>
          </div>
        }
      />
      <div className="h-[300px]">
        <Bubble
          data={rfmData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: "Recency Score", font: { size: 10 } }, min: 0, max: 100 },
              y: { title: { display: true, text: "Frequency Score", font: { size: 10 } }, min: 0, max: 100 }
            },
            plugins: {
              legend: { position: "bottom", labels: { boxWidth: 8, font: { size: 9 } } }
            }
          }}
        />
      </div>
    </Card>
  );
};

export default RFMMatrix;
