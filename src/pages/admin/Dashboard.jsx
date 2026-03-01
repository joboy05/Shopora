import React from 'react';
import { TrendingUp, Users, ShoppingBag, BarChart2, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Lun', sales: 4000, orders: 24 },
    { name: 'Mar', sales: 3000, orders: 13 },
    { name: 'Mer', sales: 5000, orders: 35 },
    { name: 'Jeu', sales: 2780, orders: 20 },
    { name: 'Ven', sales: 1890, orders: 15 },
    { name: 'Sam', sales: 4390, orders: 30 },
    { name: 'Dim', sales: 3490, orders: 25 },
];

const stats = [
    { icon: TrendingUp, label: 'Ventes totales', value: '12,450.00 €', trend: '+12.5%', isUp: true },
    { icon: Users, label: 'Nouveaux clients', value: '48', trend: '+5.2%', isUp: true },
    { icon: ShoppingBag, label: 'Commandes', value: '156', trend: '-2.4%', isUp: false },
    { icon: BarChart2, label: 'Taux de conv.', value: '3.2%', trend: '+0.8%', isUp: true },
];

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isPro = user.accountType === 'COMPANY';
    const displayName = isPro ? user.storeName : user.username;

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black tracking-tighter">Tableau de bord</h1>
                    {isPro && (
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] uppercase tracking-widest">
                            Compte Pro
                        </div>
                    )}
                </div>
                <p className="text-slate-500 font-medium">Bienvenue, <span className="text-brand-400 font-bold">{displayName || 'Marchand'}</span>. Voici un aperçu de votre activité aujourd'hui.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <PremiumCard key={stat.label} delay={i * 0.1}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5">
                                <stat.icon className="h-6 w-6 text-brand-400" />
                            </div>
                            <span className={`text-xs font-black flex items-center gap-1 px-2 py-1 rounded-lg ${stat.isUp ? 'bg-brand-500/10 text-brand-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                        </div>
                    </PremiumCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PremiumCard className="lg:col-span-2 min-h-[400px]" delay={0.4}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Performance des ventes</h2>
                        <select className="bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                            <option>7 derniers jours</option>
                            <option>30 derniers jours</option>
                        </select>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1" className="text-brand-400">
                                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ border: 'none' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    className="text-brand-400"
                                    stroke="currentColor"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </PremiumCard>

                <PremiumCard delay={0.5}>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Activités récentes</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex gap-4 group cursor-pointer">
                                <div className="h-10 w-10 rounded-xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:border-brand-500/20 transition-all duration-300">
                                    <Package className="h-5 w-5 text-slate-500 group-hover:text-brand-400 rotate-[-10deg] group-hover:rotate-0 transition-all duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-400 transition-colors">Nouvelle commande #1234</p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Il y a 2 minutes par Jean Dupont</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-black/10 dark:border-white/10 text-xs font-black text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-white/10 transition-all">
                        Voir tous les journaux
                    </button>
                </PremiumCard>
            </div>

            {isPro && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <PremiumCard className="bg-brand-500/5 border-brand-500/10">
                        <div className="flex items-center gap-3 mb-4 text-brand-400">
                            <TrendingUp className="h-5 w-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Projection de croissance</h3>
                        </div>
                        <p className="text-2xl font-black mb-2">+18.4%</p>
                        <p className="text-xs text-slate-500 font-medium italic">Basé sur vos performances des 30 derniers jours.</p>
                    </PremiumCard>

                    <PremiumCard className="bg-brand-500/5 border-brand-500/10">
                        <div className="flex items-center gap-3 mb-4 text-brand-400">
                            <Users className="h-5 w-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Fidélité client</h3>
                        </div>
                        <p className="text-2xl font-black mb-2">64%</p>
                        <p className="text-xs text-slate-500 font-medium italic">De vos clients reviennent pour un second achat.</p>
                    </PremiumCard>

                    <PremiumCard className="bg-brand-500/5 border-brand-500/10">
                        <div className="flex items-center gap-3 mb-4 text-brand-400">
                            <Globe className="h-5 w-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Portée du marché</h3>
                        </div>
                        <p className="text-2xl font-black mb-2">4 Pays</p>
                        <p className="text-xs text-slate-500 font-medium italic">Votre boutique est active sur 4 marchés régionaux.</p>
                    </PremiumCard>
                </motion.div>
            )}
        </div>
    );
}
