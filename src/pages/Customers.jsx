import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, MoreHorizontal, Loader2, ShoppingBag, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { customerService } from '../lib/api';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [meta, setMeta] = useState({ total: 0 });

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await customerService.getAll({ search });
            setCustomers(res.data.data);
            setMeta(res.data.meta);
        } catch {
            console.error('Failed to load customers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCustomers(); }, [search]);

    const totalOrders = customers.reduce((acc, c) => acc + (c._count?.orders || 0), 0);
    const activeCustomers = customers.filter(c => (c._count?.orders || 0) > 0).length;

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Clients</h1>
                    <p className="text-slate-500 font-medium">{meta.total} client{meta.total !== 1 ? 's' : ''} enregistrés dans votre base.</p>
                </div>
                <button className="btn-premium py-3 group">
                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Ajouter un client
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total clients', value: meta.total, color: 'text-slate-900 dark:text-white' },
                    { label: 'Source Active', value: activeCustomers, color: 'text-brand-400' },
                    { label: 'Total Commandes', value: totalOrders, color: 'text-brand-400' },
                    { label: 'Fréquence moy.', value: meta.total > 0 ? (totalOrders / meta.total).toFixed(1) : '0', color: 'text-brand-400' },
                ].map((s, i) => (
                    <PremiumCard key={s.label} delay={i * 0.1}>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
                    </PremiumCard>
                ))}
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-card overflow-hidden"
            >
                <div className="p-6 border-b border-black/5 dark:border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-hover:text-brand-400 transition-colors" />
                        <input
                            placeholder="Filtrer par nom, email ou tag..."
                            className="bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-2 pl-12 pr-4 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
                    </div>
                ) : customers.length === 0 ? (
                    <div className="py-20 flex flex-col items-center">
                        <div className="h-16 w-16 glass-card rounded-2xl flex items-center justify-center mb-4 text-slate-600">
                            <Users className="h-8 w-8" />
                        </div>
                        <p className="text-slate-900 dark:text-white font-black text-xl tracking-tight">Base client vide</p>
                        <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">Aucun client correspondant à vos critères n'a été trouvé.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-black/5 dark:border-white/5 bg-white/[0.01]">
                                    {['Identité Client', 'Coordonnées', 'Activités', 'Dernière Session', 'Tag Profil', ''].map(h => (
                                        <th key={h} className="px-8 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {customers.map((customer, i) => {
                                        const lastOrder = customer.orders?.[0];
                                        const initials = `${customer.firstName?.[0] || ''}${customer.lastName?.[0] || ''}`.toUpperCase();
                                        return (
                                            <motion.tr
                                                key={customer.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => navigate(`/customers/${customer.id}`)}
                                                className="group hover:bg-white/[0.03] border-b border-black/5 dark:border-white/5 cursor-pointer transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-400/10 to-brand-500/10 border border-black/5 dark:border-white/5 flex items-center justify-center text-sm font-black text-brand-400 group-hover:scale-110 transition-all duration-500">
                                                            {initials || <Users className="h-5 w-5" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-brand-400 transition-colors leading-tight">{customer.firstName} {customer.lastName}</p>
                                                            <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">ID: {customer.id.slice(0, 8)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-200 transition-colors">
                                                            <Mail className="h-3 w-3" />{customer.email}
                                                        </div>
                                                        {customer.phone && (
                                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                                <Phone className="h-3 w-3" />{customer.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="px-2 py-1 rounded bg-white/5 border border-black/5 dark:border-white/5 flex items-center gap-2">
                                                            <ShoppingBag className="h-3 w-3 text-slate-500" />
                                                            <span className="text-xs font-black text-slate-900 dark:text-white">{customer._count?.orders || 0}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                                        {lastOrder ? new Date(lastOrder.createdAt).toLocaleDateString('fr-FR') : 'JAMAIS'}
                                                    </p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    {customer.tag ? (
                                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-500/10 text-brand-400 border border-brand-500/20">
                                                            {customer.tag}
                                                        </span>
                                                    ) : <span className="text-slate-600 font-black text-[10px]">—</span>}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="p-2 rounded-xl hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white transition-all">
                                                        <ArrowUpRight className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
