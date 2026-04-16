import DoubleLineChart from "./DoubleLineChart";
import { Card } from "../ui";

const RevenueOrderChart = () => {
  const labels = ["Oct 15", "Oct 22", "Oct 29", "Nov 05", "Nov 12", "Nov 16"];
  const revenueData = [5000, 4200, 4800, 7500, 9200, 8100];
  const orderData = [4500, 5800, 4200, 6800, 8500, 7200];

  return (
    <Card className="col-span-12 lg:col-span-6 border-2 border-gray-200 shadow-xl" hoverable={false}>
      <div className="flex justify-between items-center mb-8 ">
        <div>
          <h4 className="text-lg font-bold text-gray-900">Revenue vs Orders</h4>
          <p className="text-xs text-gray-400 mt-1">Daily performance comparison</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-[3px] border-purple-800 rounded-full bg-white"></span>
            <span className="text-xs font-bold text-gray-500">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-[3px] border-orange-500 rounded-full bg-white"></span>
            <span className="text-xs font-bold text-gray-500">Orders</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <DoubleLineChart
          labels={labels}
          data1={revenueData}
          data2={orderData}
          label1="Revenue"
          label2="Orders"
          unit="$"
          color1="purple"
          color2="orange"
        />
      </div>
    </Card>
  );
};

export default RevenueOrderChart;
