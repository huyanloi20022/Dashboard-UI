import React from "react";
import { Section, Icon } from "../components/ui";

const Automation: React.FC = () => {
  return (
    <main className="pb-8 px-8 min-h-screen">
      <Section title="Workflow Automation" accentColor="purple">
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-4">
            <Icon name="robot_2" size="xl" filled />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Automation Page</h3>
          <p className="text-gray-500 text-center max-w-md">
            Streamline your operations with powerful automation rules. Set up triggers and actions to handle repetitive tasks automatically.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default Automation;
