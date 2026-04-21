import DoubleLineChart from "./DoubleLineChart";
import { Card, ChartHeader } from "../ui";

const CustomerAOVChart = () => {
  const labels = ["Oct 15", "Oct 22", "Oct 29", "Nov 05", "Nov 12", "Nov 16"];
  const customerData = [10, 50, 80, 90, 100, 120];
  const aovData = [45, 52, 48, 60, 108, 98]; // Average Order Value

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-200 shadow-xl" hoverable={false}>
      <ChartHeader
        title="Customers vs AOV"
        subtitle="Growth analysis"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-800"></span>
              <span className="text-xs font-semibold text-gray-600">Customer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-700"></span>
              <span className="text-xs font-semibold text-gray-400">AOV</span>
            </div>
          </div>
        }
      />
      <div className="h-[300px] w-full">
        <DoubleLineChart
          labels={labels}
          data1={customerData}
          data2={aovData}
          label1="Customers"
          label2="Avg Order Value"
          color1="blue"
          color2="green"
          unit=""
        />
      </div>
    </Card>
  );
};

export default CustomerAOVChart;
