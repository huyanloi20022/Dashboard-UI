import React from "react";
import { Card, Icon, ChartHeader, ProgressBar } from "../ui";

interface ShippingMethod {
  name: string;
  count: number;
  avgTime: string;
  icon: string;
  color: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    name: "Standard Shipping",
    count: 450,
    avgTime: "3-5 Days",
    icon: "local_shipping",
    color: "#6366f1", // Indigo
  },
  {
    name: "Express Delivery",
    count: 320,
    avgTime: "1-2 Days",
    icon: "bolt",
    color: "#06b6d4", // Cyan
  },
  {
    name: "Next Day Air",
    count: 150,
    avgTime: "24 Hours",
    icon: "flight_takeoff",
    color: "#f59e0b", // Amber
  },
  {
    name: "Store Pick-up",
    count: 80,
    avgTime: "Instant",
    icon: "storefront",
    color: "#10b981", // Emerald
  },
];

const ShippingMethodChart: React.FC = () => {
  const maxCount = shippingMethods[0].count;

  return (
    <Card className="col-span-12 lg:col-span-4 p-0 border-2 border-gray-100 shadow-xl overflow-hidden flex flex-col" hoverable={false}>
      <ChartHeader
        title="Shipping Mix"
        subtitle="Distribution by tier"
        className="p-6 border-b border-gray-100 bg-gray-50/10"
        mb="mb-0"
        actions={
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Icon name="local_shipping" size="sm" />
          </div>
        }
      />

      <div className="flex-1 divide-y divide-gray-50">
        {shippingMethods.map((method, _) => (
          <div key={method.name} className="p-5 hover:bg-gray-50/30 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: method.color }}
                >
                  <Icon name={method.icon} size="sm" />
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-slate-900 leading-tight">{method.name}</h5>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{method.avgTime}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">{method.count}</span>
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-tighter">Orders</span>
              </div>
            </div>
            <ProgressBar
              value={(method.count / maxCount) * 100}
              color="indigo"
              className="h-1.5 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50/10 border-t border-gray-100 mt-auto">
        <button className="w-full py-2 text-[10px] font-black text-indigo-600 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
          Manage Carriers
          <Icon name="settings" size="xs" />
        </button>
      </div>
    </Card>
  );
};

export default ShippingMethodChart;
