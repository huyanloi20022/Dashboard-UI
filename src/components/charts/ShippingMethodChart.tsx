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
    color: "#8B5CF6", // Violet
  },
  {
    name: "Express Delivery",
    count: 320,
    avgTime: "1-2 Days",
    icon: "bolt",
    color: "#06B6D4", // Cyan
  },
  {
    name: "Next Day Air",
    count: 150,
    avgTime: "24 Hours",
    icon: "flight_takeoff",
    color: "#EC4899", // Pink
  },
  {
    name: "Store Pick-up",
    count: 80,
    avgTime: "Instant",
    icon: "storefront",
    color: "#10B981", // Emerald
  },
];

const ShippingMethodChart: React.FC = () => {
  const maxCount = shippingMethods[0].count;

  return (
    <Card className="col-span-12 lg:col-span-4 p-0 bg-white border-2 border-gray-100 font-['Inter'] shadow-sm overflow-hidden flex flex-col">
      <ChartHeader
        title="Shipping Mix"
        subtitle="Distribution by tier"
        className="p-6 border-b border-gray-50 bg-gray-50/30"
        mb="mb-0"
        actions={<Icon name="local_shipping" className="text-purple-500" />}
      />

      <div className="flex-1 divide-y divide-gray-50">
        {shippingMethods.map((method, _) => (
          <div key={method.name} className="p-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: method.color }}
                >
                  <Icon name={method.icon} size="sm" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">{method.name}</h5>
                  <span className="text-[10px] font-medium text-gray-400">{method.avgTime}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-gray-900">{method.count}</span>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Orders</span>
              </div>
            </div>
            <ProgressBar
              value={(method.count / maxCount) * 100}
              color="purple"
              className="h-1.5 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-50 mt-auto">
        <button className="w-full py-2 text-[11px] font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center justify-center gap-2">
          Manage Carriers
          <Icon name="settings" size="xs" />
        </button>
      </div>
    </Card>
  );
};

export default ShippingMethodChart;
