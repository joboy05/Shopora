import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin
import Dashboard from './pages/admin/Dashboard';
import Analytics from './pages/admin/Analytics';
import Finances from './pages/admin/Finances';
import Markets from './pages/admin/Markets';
import Catalogues from './pages/admin/Catalogues';
import Metaobjects from './pages/admin/Metaobjects';
import Settings from './pages/admin/Settings';

// Products
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';

// Orders
import Orders from './pages/orders/Orders';
import OrderDetail from './pages/orders/OrderDetail';

// Customers
import Customers from './pages/customers/Customers';
import CustomerDetail from './pages/customers/CustomerDetail';

// Store (Boutique en ligne)
import Themes from './pages/store/Themes';
import ThemeEditor from './pages/store/ThemeEditor';
import Pages from './pages/store/Pages';
import Storefront from './pages/store/Storefront';

// Company
import CompanyProfile from './pages/admin/CompanyProfile';
import TeamManagement from './pages/admin/TeamManagement';
import GlobalAnalytics from './pages/admin/GlobalAnalytics';
import CompanyDashboard from './pages/admin/CompanyDashboard';
import CompanySettings from './pages/admin/CompanySettings';
import { CompanyLayout } from './components/layout/CompanyLayout';

// Layout & Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import SellerRoute from './components/auth/SellerRoute';
import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Storefront */}
          <Route path="/store" element={<Storefront />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Dashboard */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="metaobjects" element={<Metaobjects />} />
            <Route path="settings" element={<Settings />} />
            <Route path="markets" element={<Markets />} />
            <Route path="catalogues" element={<Catalogues />} />
            <Route path="finances" element={<Finances />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="online-store">
              <Route path="themes" element={<Themes />} />
              <Route path="themes/:id/edit" element={<ThemeEditor />} />
              <Route path="pages" element={<Pages />} />
            </Route>
          </Route>
          
          {/* Company Dashboard - Separate Layout */}
          <Route path="/company" element={
            <SellerRoute>
              <CompanyLayout />
            </SellerRoute>
          }>
            <Route index element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="settings" element={<CompanySettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
