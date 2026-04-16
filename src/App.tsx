import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="antialiased text-gray-900 bg-gray-50 min-h-screen font-['Inter']">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Header isSidebarCollapsed={isSidebarCollapsed} />
      <Dashboard isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}

export default App;
