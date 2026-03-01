import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Building2, Users, BarChart3, Settings, Home, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function CompanyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/company', icon: Home },
    { name: 'Company Profile', href: '/company/profile', icon: Building2 },
    { name: 'Team', href: '/company/team', icon: Users },
    { name: 'Analytics', href: '/company/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/company/settings', icon: Settings },
  ];

  const isActive = (href) => {
    if (href === '/company') {
      return location.pathname === '/company';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold italic text-xl">
                S
              </div>
              <span className="text-xl font-black text-slate-900">Company</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${active 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-bold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-200">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <p className="font-bold text-slate-900">Company User</p>
                  <p className="text-xs text-slate-500">company@shopora.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="h-5 w-5 text-slate-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold italic text-sm">
                S
              </div>
              <span className="text-lg font-black text-slate-900">Company</span>
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
