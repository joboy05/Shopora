import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    TrendingUp, Users, ShoppingBag, Globe, ArrowUpRight, ArrowDownRight,
    Calendar, Filter, Download, Loader2
} from 'lucide-react';
import { analyticsService } from '../lib/api';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await analyticsService.getSummary();
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analyses</h1>
                    <p className="text-slate-500">Suivez les performances de votre boutique en temps réel.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <Calendar className="h-4 w-4" />
                        Dernier mois
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Download className="h-4 w-4" />
                        Exporter
                    </button>
                </div>
            </header>

            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Ventes totales"
                    value={`${data.totalRevenue}€`}
                    change="+12.5%"
                    isPositive={true}
                    icon={ShoppingBag}
                    color="text-green-600"
                    bgColor="bg-green-100"
                />
                <StatCard
                    title="Sessions"
                    value="12,480"
                    change="+5.2%"
                    isPositive={true}
                    icon={Users}
                    color="text-blue-600"
                    bgColor="bg-blue-100"
                />
                <StatCard
                    title="Taux de conversion"
                    value="3.42%"
                    change="-0.8%"
                    isPositive={false}
                    icon={TrendingUp}
                    color="text-orange-600"
                    bgColor="bg-orange-100"
                />
                <StatCard
                    title="Marchés actifs"
                    value={data.markets}
                    change="Stable"
                    isPositive={true}
                    icon={Globe}
                    color="text-purple-600"
                    bgColor="bg-purple-100"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 font-display">Évolution des ventes</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.salesTrend}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Market Distribution */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 font-display">Répartition par marché</h3>
                    <div className="h-[300px] w-full flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.marketDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.marketDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Detailed Table Placeholder or More Charts */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Top produits vendus</h3>
                    <button className="text-sm text-green-600 font-medium hover:underline">Voir tout</button>
                </div>
                <div className="p-12 text-center text-slate-500 italic">
                    Les données détaillées par produit seront disponibles une fois le module Produits implémenté.
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color, bgColor }) {
    return (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", bgColor, color)}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className={cn(
                    "flex items-center text-sm font-medium",
                    isPositive ? "text-green-600" : "text-red-500"
                )}>
                    {isPositive ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : <ArrowDownRight className="h-4 w-4 mr-0.5" />}
                    {change}
                </div>
            </div>
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h4>
            <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
        </div>
    );
}

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
