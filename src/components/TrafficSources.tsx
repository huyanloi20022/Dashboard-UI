import { Card } from "./ui";

const TrafficSources = () => {
  return (
    <Card className="col-span-12 lg:col-span-4" hoverable={false}>
      <h4 className="text-lg font-bold text-gray-900 mb-8">Traffic Sources</h4>
      <div className="relative flex justify-center mb-10">
        <svg className="w-48 h-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            fill="transparent"
            r="80"
            stroke="#f3f4f6"
            strokeWidth="20"
          ></circle>
          <circle
            cx="96"
            cy="96"
            fill="transparent"
            r="80"
            stroke="#7C3AED"
            strokeDasharray="201 502"
            strokeDashoffset="0"
            strokeWidth="24"
          ></circle>
          <circle
            cx="96"
            cy="96"
            fill="transparent"
            r="80"
            stroke="#06B6D4"
            strokeDasharray="176 502"
            strokeDashoffset="-201"
            strokeWidth="24"
          ></circle>
          <circle
            cx="96"
            cy="96"
            fill="transparent"
            r="80"
            stroke="#EC4899"
            strokeDasharray="75 502"
            strokeDashoffset="-377"
            strokeWidth="24"
          ></circle>
          <circle
            cx="96"
            cy="96"
            fill="transparent"
            r="80"
            stroke="#10B981"
            strokeDasharray="50 502"
            strokeDashoffset="-452"
            strokeWidth="24"
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-gray-900">24k</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Total Visits
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600"></span>
            <span className="text-sm font-medium text-gray-700">
              Organic Search
            </span>
          </div>
          <span className="text-sm font-bold">40%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
            <span className="text-sm font-medium text-gray-700">Direct</span>
          </div>
          <span className="text-sm font-bold">35%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-500"></span>
            <span className="text-sm font-medium text-gray-700">
              Social Media
            </span>
          </div>
          <span className="text-sm font-bold">15%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-gray-700">Email</span>
          </div>
          <span className="text-sm font-bold">10%</span>
        </div>
      </div>
    </Card>
  );
};

export default TrafficSources;
