import { Card } from "./ui";

const RevenueChart = () => {
  return (
    <Card className="col-span-12 lg:col-span-8" hoverable={false}>
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-lg font-bold text-gray-900">Revenue Trend</h4>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <span className="w-3 h-3 rounded-full bg-purple-600"></span> Current
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
            <span className="w-3 h-3 rounded-full bg-gray-200"></span> Previous
          </span>
        </div>
      </div>
      <div className="h-75 w-full relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="border-t border-gray-100 w-full h-0 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-white pr-2">$10,000</span>
          </div>
          <div className="border-t border-gray-100 w-full h-0 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-white pr-2">$7,500</span>
          </div>
          <div className="border-t border-gray-100 w-full h-0 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-white pr-2">$5,000</span>
          </div>
          <div className="border-t border-gray-100 w-full h-0 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-white pr-2">$2,500</span>
          </div>
          <div className="border-t border-gray-100 w-full h-0 flex items-center justify-between text-[10px] text-gray-400">
            <span className="bg-white pr-2">$0</span>
          </div>
        </div>
        <svg
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 300"
        >
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0,250 Q125,180 250,210 Q375,240 500,100 Q625,30 750,150 Q875,270 1000,180 L1000,300 L0,300 Z"
            fill="url(#chartGradient)"
          ></path>
          <path
            d="M0,250 Q125,180 250,210 Q375,240 500,100 Q625,30 750,150 Q875,270 1000,180"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="4"
          ></path>
        </svg>
        <div className="absolute -bottom-6 w-full flex justify-between px-2 text-[10px] font-bold text-gray-400">
          <span>OCT 15</span>
          <span>OCT 22</span>
          <span>OCT 29</span>
          <span>NOV 05</span>
          <span>NOV 12</span>
          <span>NOV 16</span>
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
