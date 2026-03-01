import React from 'react';
import { Building2, Users, TrendingUp, Globe, ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Eye, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CompanyDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = user.storeName || user.username || user.email?.split('@')[0];

  const stats = [
    { 
      icon: DollarSign, 
      label: 'Global Revenue', 
      value: '$1,235,450', 
      trend: '+18.5%', 
      isUp: true,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: Users, 
      label: 'Team Members', 
      value: '24', 
      trend: '+12.0%', 
      isUp: true,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: ShoppingCart, 
      label: 'Total Orders', 
      value: '8,456', 
      trend: '+5.2%', 
      isUp: true,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      icon: Globe, 
      label: 'Active Markets', 
      value: '47', 
      trend: '+8.7%', 
      isUp: true,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      title: 'New international order',
      description: 'Order #12345 from Tokyo, Japan',
      time: '2 minutes ago',
      amount: '$2,450',
      flag: '🇯🇵'
    },
    {
      id: 2,
      type: 'team',
      title: 'New team member joined',
      description: 'Sarah Chen joined as Marketing Manager',
      time: '1 hour ago',
      flag: '🇨🇳'
    },
    {
      id: 3,
      type: 'revenue',
      title: 'Revenue milestone reached',
      description: 'Surpassed $1M in global revenue',
      time: '3 hours ago',
      amount: '$1,000,000+',
      flag: '🌍'
    },
    {
      id: 4,
      type: 'market',
      title: 'New market launched',
      description: 'Started selling in Brazil',
      time: '1 day ago',
      flag: '🇧🇷'
    }
  ];

  const topMarkets = [
    { country: 'United States', revenue: '$456,000', orders: 2100, growth: '+15.2%', flag: '🇺🇸' },
    { country: 'China', revenue: '$312,000', orders: 1800, growth: '+28.5%', flag: '🇨🇳' },
    { country: 'United Kingdom', revenue: '$234,000', orders: 980, growth: '+8.7%', flag: '🇬🇧' },
    { country: 'Germany', revenue: '$189,000', orders: 750, growth: '+12.3%', flag: '🇩🇪' },
    { country: 'France', revenue: '$156,000', orders: 620, growth: '+6.8%', flag: '🇫🇷' }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Company Dashboard</h1>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] uppercase tracking-widest">
            Business Account
          </div>
        </div>
        <p className="text-slate-500 font-medium">Welcome back, <span className="text-blue-600 font-bold">{displayName}</span>. Here's your global business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg ${
                stat.isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">Recent Activity</h2>
            <Link to="/company/analytics" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: activity.id * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{activity.flag}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">{activity.title}</h3>
                    {activity.amount && (
                      <span className="text-sm font-bold text-green-600">{activity.amount}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{activity.description}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Markets */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-black text-slate-900 mb-6">Top Markets</h2>
          
          <div className="space-y-4">
            {topMarkets.map((market, index) => (
              <motion.div
                key={market.country}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{market.flag}</span>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{market.country}</p>
                    <p className="text-xs text-slate-500">{market.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">{market.revenue}</p>
                  <p className="text-xs font-medium text-green-600">{market.growth}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black mb-2">Ready to expand globally?</h2>
            <p className="text-blue-100 mb-6">Launch your products in new markets and reach millions of customers worldwide.</p>
            <div className="flex gap-4">
              <Link 
                to="/company/profile"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Update Profile
              </Link>
              <Link 
                to="/company/analytics"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors border border-blue-400"
              >
                View Analytics
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <Globe className="h-24 w-24 text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
