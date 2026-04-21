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
    color: "#8B5CF6", // Violet-500
  },
  {
    name: "MacBook Air M2",
    category: "Computers",
    sales: 8920,
    revenue: "$11.8M",
    growth: "+8.4%",
    isPositive: true,
    color: "#06B6D4", // Cyan-500
  },
  {
    name: "Sony WH-1000XM5",
    category: "Accessories",
    sales: 7650,
    revenue: "$2.4M",
    growth: "+12.1%",
    isPositive: true,
    color: "#EC4899", // Pink-500
  },
  {
    name: "iPad Pro",
    category: "Electronics",
    sales: 5890,
    revenue: "$4.6M",
    growth: "-2.4%",
    isPositive: false,
    color: "#F59E0B", // Amber-500
  },
  {
    name: "Apple Watch S9",
    category: "Wearables",
    sales: 4210,
    revenue: "$1.8M",
    growth: "+5.7%",
    isPositive: true,
    color: "#10B981", // Emerald-500
  },
];

const TopProductsChart: React.FC = () => {
  const maxSales = products[0].sales;

  return (
    <Card className="col-span-12 lg:col-span-4 row-span-2 border-2 border-gray-100 shadow-sm overflow-hidden flex flex-col" hoverable={false}>
      <ChartHeader
        title="Product Ranking"
        subtitle="Top performers by sales volume"
        className="p-6 border-b border-gray-50 bg-gray-50/30"
        mb="mb-0"
        actions={
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
            <Icon name="more_vert" size="md" />
          </button>
        }
      />

      <div className="flex-1 p-0">
        <div className="divide-y divide-gray-50">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group flex flex-col p-5 hover:bg-gray-50/80 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-110`}
                      style={{ backgroundColor: product.color }}
                    >
                      {product.name.charAt(0)}
                    </div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-[10px] font-black text-gray-900">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h5>
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                      <Icon name="category" size="xs" />
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-gray-900">{product.revenue}</div>
                  <Badge
                    variant={product.isPositive ? "success" : "danger"}
                    className="mt-1 px-2 py-0.5 !text-[10px]"
                    icon={<Icon name={product.isPositive ? "trending_up" : "trending_down"} size="xs" />}
                  >
                    {product.growth}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Sales Volume</span>
                  <span className="text-gray-900">{product.sales.toLocaleString()}</span>
                </div>
                <ProgressBar
                  value={(product.sales / maxSales) * 100}
                  color={product.isPositive ? "purple" : "pink"}
                  className="h-1.5 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-50 mt-auto">
        <button className="w-full py-2 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
          View Full Analytics
          <Icon name="arrow_forward" size="sm" />
        </button>
      </div>
    </Card>
  );
};

export default TopProductsChart;
