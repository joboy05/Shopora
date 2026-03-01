import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, CreditCard, Users, Database, Mail, Smartphone, Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanySettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const settingsSections = [
    {
      title: 'General',
      icon: Settings,
      items: [
        { label: 'Company Name', value: 'Shopora Inc.', type: 'text' },
        { label: 'Default Language', value: 'English', type: 'select' },
        { label: 'Timezone', value: 'UTC+00:00 (London)', type: 'select' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: notifications.email, type: 'toggle', onChange: () => setNotifications(prev => ({ ...prev, email: !prev.email })) },
        { label: 'Push Notifications', value: notifications.push, type: 'toggle', onChange: () => setNotifications(prev => ({ ...prev, push: !prev.push })) },
        { label: 'SMS Notifications', value: notifications.sms, type: 'toggle', onChange: () => setNotifications(prev => ({ ...prev, sms: !prev.sms })) }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', value: false, type: 'toggle' },
        { label: 'Session Timeout', value: '30 minutes', type: 'select' },
        { label: 'IP Whitelist', value: 'Enabled', type: 'select' }
      ]
    },
    {
      title: 'Payment',
      icon: CreditCard,
      items: [
        { label: 'Default Currency', value: 'USD', type: 'select' },
        { label: 'Payment Method', value: 'Credit Card', type: 'select' },
        { label: 'Auto-billing', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Appearance',
      icon: Monitor,
      items: [
        { label: 'Dark Mode', value: darkMode, type: 'toggle', onChange: () => setDarkMode(!darkMode) },
        { label: 'Compact View', value: false, type: 'toggle' },
        { label: 'Show Sidebar', value: true, type: 'toggle' }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Settings</h1>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] uppercase tracking-widest">
            Configuration
          </div>
        </div>
        <p className="text-slate-500 font-medium">Manage your company settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <label className="text-sm font-bold text-slate-900">{item.label}</label>
                        {item.type !== 'toggle' && (
                          <p className="text-xs text-slate-500 mt-1">Current: {item.value}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.type === 'toggle' ? (
                          <button
                            onClick={item.onChange}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        ) : item.type === 'select' ? (
                          <select className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white">
                            <option>{item.value}</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            defaultValue={item.value}
                            className="px-3 py-1 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left">
                <Database className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Export Data</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left">
                <Users className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Manage Team</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors text-left">
                <CreditCard className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Billing</span>
              </button>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-black mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Used</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-1/4"></div>
                </div>
              </div>
              <p className="text-xs opacity-80">24% of storage used</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-sm font-black text-amber-800 mb-2">💡 Pro Tip</h3>
            <p className="text-xs text-amber-700 leading-relaxed">
              Enable two-factor authentication to add an extra layer of security to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
