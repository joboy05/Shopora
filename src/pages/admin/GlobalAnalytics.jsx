import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, DollarSign, Users, ShoppingCart, Eye, Calendar, Download, Filter, BarChart3, PieChart, Activity, MapPin, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const regions = [
  { name: 'North America', code: 'NA', color: '#3B82F6' },
  { name: 'Europe', code: 'EU', color: '#10B981' },
  { name: 'Asia Pacific', code: 'APAC', color: '#F59E0B' },
  { name: 'Latin America', code: 'LATAM', color: '#EF4444' },
  { name: 'Middle East & Africa', code: 'MEA', color: '#8B5CF6' }
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'BRL', 'CAD', 'AUD'];

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' }
];

export default function GlobalAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from API
  const [revenueData, setRevenueData] = useState([
    { date: '2024-01-01', NA: 45000, EU: 38000, APAC: 52000, LATAM: 12000, MEA: 8000, total: 155000 },
    { date: '2024-01-02', NA: 48000, EU: 41000, APAC: 54000, LATAM: 13000, MEA: 8500, total: 164500 },
    { date: '2024-01-03', NA: 52000, EU: 44000, APAC: 58000, LATAM: 14000, MEA: 9000, total: 177000 },
    { date: '2024-01-04', NA: 49000, EU: 42000, APAC: 56000, LATAM: 13500, MEA: 8800, total: 169300 },
    { date: '2024-01-05', NA: 51000, EU: 45000, APAC: 60000, LATAM: 14500, MEA: 9200, total: 179700 },
    { date: '2024-01-06', NA: 55000, EU: 48000, APAC: 62000, LATAM: 15000, MEA: 9500, total: 189500 },
    { date: '2024-01-07', NA: 58000, EU: 51000, APAC: 65000, LATAM: 16000, MEA: 10000, total: 200000 }
  ]);

  const [regionData, setRegionData] = useState([
    { name: 'North America', value: 358000, growth: 12.5, customers: 12500, orders: 3200, avgOrderValue: 112 },
    { name: 'Europe', value: 309000, growth: 8.3, customers: 10200, orders: 2800, avgOrderValue: 110 },
    { name: 'Asia Pacific', value: 407000, growth: 18.7, customers: 15800, orders: 4100, avgOrderValue: 99 },
    { name: 'Latin America', value: 98000, growth: -2.1, customers: 3200, orders: 850, avgOrderValue: 115 },
    { name: 'Middle East & Africa', value: 63000, growth: 5.4, customers: 2100, orders: 520, avgOrderValue: 121 }
  ]);

  const [currencyData, setCurrencyData] = useState([
    { currency: 'USD', revenue: 285000, orders: 4500, growth: 15.2 },
    { currency: 'EUR', revenue: 198000, orders: 3100, growth: 8.7 },
    { currency: 'GBP', revenue: 87000, orders: 1400, growth: 5.3 },
    { currency: 'JPY', revenue: 76000, orders: 1200, growth: 12.1 },
    { currency: 'CNY', revenue: 125000, orders: 2000, growth: 22.4 },
    { currency: 'INR', revenue: 95000, orders: 1600, growth: 18.9 },
    { currency: 'BRL', revenue: 43000, orders: 700, growth: -3.2 },
    { currency: 'CAD', revenue: 68000, orders: 1100, growth: 7.8 },
    { currency: 'AUD', revenue: 54000, orders: 900, growth: 9.6 }
  ]);

  const [topCountries, setTopCountries] = useState([
    { country: 'United States', revenue: 245000, orders: 3800, customers: 9200, flag: '🇺🇸', growth: 14.2 },
    { country: 'China', revenue: 125000, orders: 2100, customers: 4800, flag: '🇨🇳', growth: 25.6 },
    { country: 'United Kingdom', revenue: 87000, orders: 1400, customers: 3100, flag: '🇬🇧', growth: 5.3 },
    { country: 'Germany', revenue: 76000, orders: 1200, customers: 2800, flag: '🇩🇪', growth: 7.1 },
    { country: 'France', revenue: 68000, orders: 1100, customers: 2500, flag: '🇫🇷', growth: 6.8 },
    { country: 'Japan', revenue: 76000, orders: 1200, customers: 2900, flag: '🇯🇵', growth: 12.1 },
    { country: 'Brazil', revenue: 43000, orders: 700, customers: 1600, flag: '🇧🇷', growth: -3.2 },
    { country: 'India', revenue: 95000, orders: 1600, customers: 3700, flag: '🇮🇳', growth: 18.9 }
  ]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  }, [timeRange, selectedRegion, selectedCurrency]);

  const totalRevenue = regionData.reduce((sum, region) => sum + region.value, 0);
  const totalOrders = regionData.reduce((sum, region) => sum + region.orders, 0);
  const totalCustomers = regionData.reduce((sum, region) => sum + region.customers, 0);
  const avgGrowth = regionData.reduce((sum, region) => sum + region.growth, 0) / regionData.length;

  const exportData = () => {
    // Simulate export functionality
    console.log('Exporting analytics data...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Global Analytics</h1>
          <p className="text-slate-500 mt-1">Track your worldwide business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 text-green-800">
              <ArrowUpRight className="h-3 w-3" />
              {avgGrowth.toFixed(1)}%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Revenue</p>
            <p className="text-2xl font-black text-slate-900">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 text-green-800">
              <ArrowUpRight className="h-3 w-3" />
              8.4%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Orders</p>
            <p className="text-2xl font-black text-slate-900">{totalOrders.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 text-green-800">
              <ArrowUpRight className="h-3 w-3" />
              12.7%
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Customers</p>
            <p className="text-2xl font-black text-slate-900">{totalCustomers.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 text-blue-800">
              <MapPin className="h-3 w-3" />
              47
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Countries</p>
            <p className="text-2xl font-black text-slate-900">Active Markets</p>
          </div>
        </div>
      </div>

      {/* Revenue by Region Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">Revenue by Region</h2>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region.code} value={region.code}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  {regions.map(region => (
                    <linearGradient key={region.code} id={`color${region.code}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={region.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={region.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                {regions.map(region => (
                  <Area
                    key={region.code}
                    type="monotone"
                    dataKey={region.code}
                    stackId="1"
                    stroke={region.color}
                    fillOpacity={1}
                    fill={`url(#color${region.code})`}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-black text-slate-900 mb-6">Regional Performance</h2>
          <div className="space-y-4">
            {regionData.map((region) => {
              const regionInfo = regions.find(r => r.name === region.name);
              const percentage = (region.value / totalRevenue) * 100;
              
              return (
                <div key={region.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: regionInfo.color }}
                      />
                      <span className="text-sm font-medium text-slate-900">{region.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg ${
                        region.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {region.growth > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(region.growth)}%
                      </span>
                      <span className="text-sm font-bold text-slate-900">${region.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: regionInfo.color
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{region.customers.toLocaleString()} customers</span>
                    <span>{region.orders.toLocaleString()} orders</span>
                    <span>Avg: ${region.avgOrderValue}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Currency Performance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">Revenue by Currency</h2>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
          >
            <option value="all">All Currencies</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-4">
          {currencyData.map((currency) => (
            <div key={currency.currency} className="text-center p-4 border border-slate-200 rounded-xl">
              <div className="text-2xl font-black text-slate-900 mb-1">{currency.currency}</div>
              <div className="text-lg font-bold text-slate-700">${currency.revenue.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{currency.orders} orders</div>
              <div className={`text-xs font-black mt-2 px-2 py-1 rounded-lg inline-block ${
                currency.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {currency.growth > 0 ? '+' : ''}{currency.growth}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Countries */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">Top Performing Countries</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">Country</th>
                <th className="text-right py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">Revenue</th>
                <th className="text-right py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">Orders</th>
                <th className="text-right py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">Customers</th>
                <th className="text-right py-3 px-4 text-xs font-black text-slate-500 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.map((country, index) => (
                <tr key={country.country} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-medium text-slate-900">{country.country}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">${country.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{country.orders.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{country.customers.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`text-xs font-black px-2 py-1 rounded-lg inline-block ${
                      country.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {country.growth > 0 ? '+' : ''}{country.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
