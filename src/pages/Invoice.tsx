import React from "react";
import { Section, Icon } from "../components/ui";

const Invoice: React.FC = () => {
  return (
    <main className="pb-8 px-8 min-h-screen">
      <Section title="Billing & Invoices" accentColor="purple">
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
            <Icon name="receipt_long" size="xl" filled />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Invoice Page</h3>
          <p className="text-gray-500 text-center max-w-md">
            Generate, send, and track professional invoices for your customers. Manage your billing history in one place.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default Invoice;
