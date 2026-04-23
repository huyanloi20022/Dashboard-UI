import { useState } from "react";
import MetricCard from "../components/MetricCard";
import RevenueOrderChart from "../components/charts/RevenueOrderChart";
import CustomerAOVChart from "../components/charts/CustomerAOVChart";
import TrafficSources from "../components/charts/TrafficSources";
import SalesForecast from "../components/charts/SalesForecast";
import SalesByCategory from "../components/charts/SalesByCategory";
import InventoryHealthChart from "../components/charts/InventoryHealthChart";
import RetentionChart from "../components/charts/RetentionChart";
import RFMMatrix from "../components/charts/RFMMatrix";
import CohortMatrix from "../components/charts/CohortMatrix";

import { Section } from "../components/ui";
import TopProductsChart from "../components/charts/TopProductsChart";
import OrderStatusChart from "../components/charts/OrderStatusChart";
import FulfillmentLatencyChart from "../components/charts/FulfillmentLatencyChart";
import ConversionFunnel from "../components/charts/ConversionFunnel";
import PaymentMethodChart from "../components/charts/PaymentMethodChart";
import TransactionStatusChart from "../components/charts/TransactionStatusChart";
import ShippingMethodChart from "../components/charts/ShippingMethodChart";
import PaymentHealthChart from "../components/charts/PaymentHealthChart";
import PageHeaderActions from "../components/PageHeaderActions";



const Dashboard: React.FC = () => {
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date()
  });

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
      className={`px-8 pb-3 pt-3 transition-all duration-300 ease-in-out`}
    >
      <PageHeaderActions
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        compareEnabled={compareEnabled}
        onCompareToggle={setCompareEnabled}
        onExport={() => console.log("Exporting data...")}
        onRefresh={() => console.log("Refreshing...")}
      />

      {renderContent()}
    </main>
  );
};

export default Dashboard;
