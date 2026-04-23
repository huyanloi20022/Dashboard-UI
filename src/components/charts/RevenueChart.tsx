import { Card, ChartHeader } from "../ui";

const RevenueChart = () => {
  return (
    <Card className="col-span-12 lg:col-span-8 border-2 border-gray-100 shadow-xl overflow-hidden" hoverable={false}>
      <ChartHeader
        title="Revenue Performance"
        subtitle="Gross revenue trend over last 30 days"
        actions={
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100/50 p-1 rounded-lg">
              {['7D', '30D', '12M'].map((range) => (
                <button
                  key={range}
                  className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${
                    range === '30D' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current</span>
              </div>
            </div>
          </div>
        }
      />
      <div className="h-64 w-full relative px-6 mt-4">
        <div className="absolute inset-0 px-6 py-2 flex flex-col justify-between pointer-events-none">
          {[10000, 7500, 5000, 2500, 0].map((val) => (
            <div key={val} className="border-t border-gray-100/60 w-full h-0 flex items-center justify-between text-[9px] font-bold text-gray-300">
              <span className="bg-white pr-2 tracking-tighter">${val.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-48 px-6"
          preserveAspectRatio="none"
          viewBox="0 0 1000 300"
        >
          <defs>
            <linearGradient id="revGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15"></stop>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path
            d="M0,250 Q125,180 250,210 Q375,240 500,100 Q625,30 750,150 Q875,270 1000,180 L1000,300 L0,300 Z"
            fill="url(#revGradient)"
          ></path>
          <path
            d="M0,250 Q125,180 250,210 Q375,240 500,100 Q625,30 750,150 Q875,270 1000,180"
            fill="none"
            stroke="#6366f1"
            strokeWidth="4"
            strokeLinecap="round"
          ></path>
        </svg>
        <div className="absolute bottom-0 inset-x-0 flex justify-between px-6 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
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
