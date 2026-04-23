import DoubleLineChart from "./DoubleLineChart";
import { Card, ChartHeader } from "../ui";

const RevenueOrderChart = () => {
  const labels = ["Oct 15", "Oct 22", "Oct 29", "Nov 05", "Nov 12", "Nov 16"];
  const revenueData = [5000, 4200, 4800, 7500, 9200, 8100];
  const orderData = [4500, 5800, 4200, 6800, 8500, 7200];

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Revenue vs Orders"
        subtitle="Daily performance comparison"
        actions={null}
      />
      <div className="h-[300px] w-full p-6 pt-2">
        <DoubleLineChart
          labels={labels}
          data1={revenueData}
          data2={orderData}
          label1="Revenue"
          label2="Orders"
          color1="#6366f1"
          color2="#f59e0b"
          unit="$"
        />
      </div>
    </Card>
  );
};

export default RevenueOrderChart;
