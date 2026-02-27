import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import Catalogues from './pages/Catalogues';
import Finances from './pages/Finances';
import Analytics from './pages/Analytics';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Settings from './pages/Settings';
import Themes from './pages/Themes';
import ThemeEditor from './pages/ThemeEditor';
import Pages from './pages/Pages';
import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="markets" element={<Markets />} />
            <Route path="catalogues" element={<Catalogues />} />
            <Route path="finances" element={<Finances />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="online-store/themes" element={<Themes />} />
            <Route path="online-store/themes/:id" element={<ThemeEditor />} />
            <Route path="online-store/pages" element={<Pages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
