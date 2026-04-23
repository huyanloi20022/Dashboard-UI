import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Payment from './pages/Payment.tsx';
import Customers from './pages/Customers.tsx';
import Products from './pages/Products.tsx';
import Invoice from './pages/Invoice.tsx';
import Messages from './pages/Messages.tsx';
import Automation from './pages/Automation.tsx';
import NotFound from './pages/NotFound.tsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
