import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Pages from './pages/Pages';
import Markets from './pages/Markets';
import Catalogues from './pages/Catalogues';
import Finances from './pages/Finances';
import Analytics from './pages/Analytics';
import Themes from './pages/Themes';
import ThemeEditor from './pages/ThemeEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
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
          {/* We'll add other routes as we implement modules */}
          <Route path="*" element={<div className="text-slate-500">Module en cours de développement...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
