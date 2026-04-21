import { useState } from "react";
import MetricCard from "./MetricCard";
import RevenueOrderChart from "./charts/RevenueOrderChart";
import CustomerAOVChart from "./charts/CustomerAOVChart";
import TrafficSources from "./charts/TrafficSources";
import SalesForecast from "./charts/SalesForecast";
import SalesByCategory from "./charts/SalesByCategory";
import InventoryHealthChart from "./charts/InventoryHealthChart";
import RetentionChart from "./charts/RetentionChart";
import RFMMatrix from "./charts/RFMMatrix";
import CohortMatrix from "./charts/CohortMatrix";

import { Button, Toggle, Breadcrumb, Icon, DatePicker, Section } from "./ui";
import TopProductsChart from "./charts/TopProductsChart";
import OrderStatusChart from "./charts/OrderStatusChart";
import FulfillmentLatencyChart from "./charts/FulfillmentLatencyChart";
import ConversionFunnel from "./charts/ConversionFunnel";
import PaymentMethodChart from "./charts/PaymentMethodChart";
import TransactionStatusChart from "./charts/TransactionStatusChart";
import ShippingMethodChart from "./charts/ShippingMethodChart";
import PaymentHealthChart from "./charts/PaymentHealthChart";

interface DashboardProps {
  isSidebarCollapsed: boolean;
  currentView: string;
}

const Dashboard: React.FC<DashboardProps> = ({ isSidebarCollapsed, currentView }) => {
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderContent = () => {
    return (
      <div className="space-y-12">
        {/* Overview Section */}
        <Section title="Overview" accentColor="purple">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              title="Customer"
              value="303"
              trend="10%"
              icon="person"
              iconBgClass="bg-gray-200"
              iconTextClass="text-gray-600"
              groupHoverBgClass="group-hover:bg-gray-900"
              isHoverable={false}
            />
          </div>

          <div className="grid grid-cols-12 gap-8">
            <RevenueOrderChart />
            <CustomerAOVChart />
          </div>
        </Section>
        {/* Product Section */}
        <Section title="Product" accentColor="purple">
          <div className="grid grid-cols-12 grid-rows-2 gap-6">
            <TopProductsChart />
            <SalesByCategory />
            <InventoryHealthChart />
          </div>
        </Section>
        {/* Customer Section */}
        <Section title="Customer" accentColor="purple">
          <div className="grid grid-cols-12 gap-6">
            <RetentionChart />
            <RFMMatrix />
            <CohortMatrix />
          </div>
        </Section>
        {/* Order Section */}
        <Section title="Order" accentColor="purple">
          <div className="grid grid-cols-12 gap-8">
            <OrderStatusChart />
            <FulfillmentLatencyChart />
            <ConversionFunnel />
            <ShippingMethodChart />
          </div>
        </Section>
        {/* Payment Section */}
        <Section title="Payment" accentColor="purple">
          <div className="grid grid-cols-12 gap-6">
            <PaymentHealthChart />
            <PaymentMethodChart />
            <TransactionStatusChart />
          </div>
        </Section>
        {/* Other Section */}
        <Section title="Other" accentColor="purple">
          <div className="grid grid-cols-12 gap-8">
            <TrafficSources />
            <SalesForecast />
          </div>
        </Section>
      </div>
    )
  };

  return (
    <main
      className={`pt-24 pb-12 px-8 min-h-screen transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: currentView.charAt(0).toUpperCase() + currentView.slice(1), active: true },
            ]}
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 capitalize">
            {currentView}
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

      {renderContent()}
    </main>
  );
};

export default Dashboard;
