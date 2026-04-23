import DoubleLineChart from "./DoubleLineChart";
import { Card, ChartHeader } from "../ui";

const CustomerAOVChart = () => {
  const labels = ["Oct 15", "Oct 22", "Oct 29", "Nov 05", "Nov 12", "Nov 16"];
  const customerData = [10, 50, 80, 90, 100, 120];
  const aovData = [45, 52, 48, 60, 108, 98]; // Average Order Value

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-100 shadow-xl" hoverable={false}>
      <ChartHeader
        title="Customers vs AOV"
        subtitle="Growth analysis"
        actions={null}
      />
      <div className="h-[300px] w-full p-4">
        <DoubleLineChart
          labels={labels}
          data1={customerData}
          data2={aovData}
          label1="Customers"
          label2="Avg Order Value"
          color1="#6366f1"
          color2="#10b981"
          unit=""
        />
      </div>
    </Card>
  );
};

export default CustomerAOVChart;
