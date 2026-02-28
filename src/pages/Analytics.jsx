import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, Download, Filter, TrendingUp, Users, ShoppingCart, Target } from 'lucide-react';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion } from 'framer-motion';

const salesData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
];

const sourceData = [
    { name: 'Direct', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Email', value: 200 },
    { name: 'Search', value: 100 },
];

const COLORS = ['#a78bfa', '#3b82f6', '#8b5cf6', '#f43f5e'];

export default function Analytics() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Analyses</h1>
                    <p className="text-slate-500 font-medium">Suivez les performances de votre boutique en temps réel.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-all text-xs font-bold">
                        <Calendar className="h-4 w-4" />
                        30 derniers jours
                    </button>
                    <button className="btn-premium py-2 text-xs">
                        <Download className="h-4 w-4" />
                        Exporter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PremiumCard className="md:col-span-2 min-h-[400px]" delay={0.1}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Chiffre d'Affaires</h2>
                            <p className="text-xs text-slate-500 font-bold mt-1 tracking-wider uppercase">Tendance mensuelle</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-brand-400">328,000 €</p>
                            <p className="text-[10px] text-brand-500/50 font-black">+14.2% VS MOIS DERNIER</p>
                        </div>
                    </div>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    className="text-brand-400"
                                    fill="currentColor"
                                    radius={[8, 8, 8, 8]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </PremiumCard>

                <PremiumCard delay={0.2} className="flex flex-col">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8">Sources de Trafic</h2>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">1,000</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visites</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {sourceData.map((item, i) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                                <span className="text-xs font-black text-slate-900 dark:text-white ml-auto">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </PremiumCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {[
                    { icon: Users, label: 'Visiteurs', value: '12.5k', color: 'text-brand-400' },
                    { icon: ShoppingCart, label: 'Commandes', value: '850', color: 'text-brand-400' },
                    { icon: Target, label: 'Conversion', value: '3.4%', color: 'text-brand-400' },
                    { icon: TrendingUp, label: 'Panier moyen', value: '42 €', color: 'text-rose-400' },
                ].map((kpi, i) => (
                    <PremiumCard key={kpi.label} delay={0.3 + (i * 0.1)}>
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center mb-4">
                            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{kpi.value}</p>
                    </PremiumCard>
                ))}
            </div>
        </div>
    );
}
