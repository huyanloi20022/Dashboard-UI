import { useState } from "react";
import MetricCard from "./MetricCard";
import RevenueOrderChart from "./charts/RevenueOrderChart";
import CustomerAOVChart from "./charts/CustomerAOVChart";
import TrafficSources from "./TrafficSources";
import SalesByCategory from "./SalesByCategory";
import TopProducts from "./TopProducts";
import { Button, Toggle, Breadcrumb, Icon, DatePicker } from "./ui";

interface DashboardProps {
  isSidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isSidebarCollapsed }) => {
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main
      className={`pt-24 pb-12 px-8 min-h-screen transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "ml-20" : "ml-64"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Analytics", active: true },
            ]}
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Analytics
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border-r border-gray-100 pr-4"
          />
          <div className="flex items-center gap-3 px-3 py-2">
            <Toggle
              label="Compare"
              checked={compareEnabled}
              onChange={(e) => setCompareEnabled(e.target.checked)}
            />
          </div>
          <Button
            variant="primary"
            className="text-[12px]"
            icon={<Icon name="download" size="md" />}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value="$45,890"
          trend="12%"
          icon="payments"
          iconBgClass="bg-purple-200"
          iconTextClass="text-purple-600"
          groupHoverBgClass="group-hover:bg-purple-600"
          isHoverable={false}
        />
        <MetricCard
          title="Orders"
          value="856"
          trend="8%"
          icon="shopping_bag"
          iconBgClass="bg-cyan-100"
          iconTextClass="text-cyan-600"
          groupHoverBgClass="group-hover:bg-cyan-600"
          isHoverable={false}
        />
        <MetricCard
          title="Avg Order Value"
          value="$53.60"
          trend="-2%"
          icon="receipt"
          iconBgClass="bg-pink-200"
          iconTextClass="text-pink-600"
          groupHoverBgClass="group-hover:bg-pink-600"
          isHoverable={false}
        />
        <MetricCard
          title="LTV"
          value="$1,240"
          trend="15%"
          icon="person_pin_circle"
          iconBgClass="bg-gray-200"
          iconTextClass="text-gray-600"
          groupHoverBgClass="group-hover:bg-gray-900"
          isHoverable={false}
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <RevenueOrderChart />
        <CustomerAOVChart />
        <TrafficSources />
        <SalesByCategory />
        <TopProducts />
      </div>
    </main>
  );
};

export default Dashboard;
