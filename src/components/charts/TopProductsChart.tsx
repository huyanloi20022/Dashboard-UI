import React from "react";
import { Card, Badge, ProgressBar, Icon, ChartHeader } from "../ui";

interface ProductRanking {
  name: string;
  category: string;
  sales: number;
  revenue: string;
  growth: string;
  isPositive: boolean;
  color: string;
}

const products: ProductRanking[] = [
  {
    name: "iPhone 15 Pro",
    category: "Electronics",
    sales: 12450,
    revenue: "$15.2M",
    growth: "+14.2%",
    isPositive: true,
    color: "#6366f1", // Indigo
  },
  {
    name: "MacBook Air M2",
    category: "Computers",
    sales: 8920,
    revenue: "$11.8M",
    growth: "+8.4%",
    isPositive: true,
    color: "#06b6d4", // Cyan
  },
  {
    name: "Sony WH-1000XM5",
    category: "Accessories",
    sales: 7650,
    revenue: "$2.4M",
    growth: "+12.1%",
    isPositive: true,
    color: "#ec4899", // Pink
  },
  {
    name: "iPad Pro",
    category: "Electronics",
    sales: 5890,
    revenue: "$4.6M",
    growth: "-2.4%",
    isPositive: false,
    color: "#f59e0b", // Amber
  },
  {
    name: "Apple Watch S9",
    category: "Wearables",
    sales: 4210,
    revenue: "$1.8M",
    growth: "+5.7%",
    isPositive: true,
    color: "#10b981", // Emerald
  },
];

const TopProductsChart: React.FC = () => {
  const maxSales = products[0].sales;

  return (
    <Card className="col-span-12 lg:col-span-4 row-span-2 border-2 border-gray-100 shadow-xl overflow-hidden flex flex-col" hoverable={false}>
      <ChartHeader
        title="Product Ranking"
        subtitle="Top performers by sales volume"
        className="p-6 border-b border-gray-100 bg-gray-50/10"
        mb="mb-0"
        actions={
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-slate-400">
            <Icon name="more_vert" size="sm" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-50">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group flex flex-col p-5 hover:bg-gray-50/30 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black shadow-lg transition-transform group-hover:scale-110`}
                      style={{ backgroundColor: product.color }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-white border-2 border-gray-50 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-[10px] font-black text-slate-900">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[13px] font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h5>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider mt-0.5">
                      <Icon name="category" size="xs" />
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-black text-slate-900 leading-none">{product.revenue}</div>
                  <Badge
                    variant={product.isPositive ? "success" : "danger"}
                    className="mt-1.5 px-2 py-0.5 !text-[9px] font-black uppercase tracking-tighter"
                    icon={<Icon name={product.isPositive ? "trending_up" : "trending_down"} size="xs" />}
                  >
                    {product.growth}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Sales Volume</span>
                  <span className="text-slate-900">{product.sales.toLocaleString()}</span>
                </div>
                <ProgressBar
                  value={(product.sales / maxSales) * 100}
                  color="indigo"
                  className="h-1.5 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50/10 border-t border-gray-100 mt-auto">
        <button className="w-full py-2.5 px-4 bg-white border border-gray-100 rounded-xl text-[11px] font-black text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-sm">
          Full Report
          <Icon name="arrow_forward" size="xs" />
        </button>
      </div>
    </Card>
  );
};

export default TopProductsChart;
