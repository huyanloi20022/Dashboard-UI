import React from "react";
import { Section, Icon } from "../components/ui";

const Messages: React.FC = () => {
  return (
    <main className="pb-8 px-8 min-h-screen">
      <Section title="Communication Center" accentColor="purple">
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-4">
            <Icon name="chat" size="xl" filled />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Messages Page</h3>
          <p className="text-gray-500 text-center max-w-md">
            Connect with your customers and team members. This central hub will house all your chats and notifications.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default Messages;
