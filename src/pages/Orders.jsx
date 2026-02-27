import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Loader2, ChevronDown, TrendingUp, Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { orderService } from '../lib/api';

const STATUS_CONFIG = {
    pending: { label: 'En attente', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    confirmed: { label: 'Confirmée', style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    processing: { label: 'En cours', style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    shipped: { label: 'Expédiée', style: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    delivered: { label: 'Livrée', style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    cancelled: { label: 'Annulée', style: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    refunded: { label: 'Remboursée', style: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
};

const PAYMENT_CONFIG = {
    pending: { label: 'En attente', style: 'text-amber-400' },
    paid: { label: 'Payé', style: 'text-brand-400' },
    refunded: { label: 'Remboursé', style: 'text-orange-400' },
    failed: { label: 'Échoué', style: 'text-rose-400' },
};

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ordersRes, statsRes] = await Promise.all([
                orderService.getAll({ search, status: statusFilter }),
                orderService.getStats(),
            ]);
            setOrders(ordersRes.data.data);
            setStats(statsRes.data.data);
        } catch (e) {
            console.error('Failed to load orders:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [search, statusFilter]);

    const statCards = stats ? [
        { icon: ShoppingCart, label: 'Total commandes', value: stats.total, color: 'text-slate-900 dark:text-white', bg: 'bg-white/5' },
        { icon: Clock, label: 'En attente', value: stats.pending, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { icon: TrendingUp, label: 'En cours', value: stats.processing, color: 'text-brand-400', bg: 'bg-brand-500/10' },
        { icon: CheckCircle, label: 'Expédiées', value: stats.shipped, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    ] : [];

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h1 className="page-title">Commandes</h1>
                <p className="page-subtitle">Gérez vos commandes et leur expédition.</p>
            </div>

            {/* Stats */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map(({ icon: Icon, label, value, color, bg }) => (
                        <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${bg}`}>
                                <Icon className={`h-5 w-5 ${color}`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{label}</p>
                                <p className={`text-xl font-black ${color}`}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Revenue Banner */}
            {stats && (
                <div className="glass rounded-3xl p-6 flex items-center justify-between border border-brand-500/10"
                    style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.05) 0%, transparent 100%)' }}>
                    <div>
                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest">Chiffre d'affaires encaissé</p>
                        <p className="text-4xl font-black text-brand-400 mt-1">
                            {stats.revenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </p>
                    </div>
                    <TrendingUp className="h-16 w-16 text-brand-500/20" />
                </div>
            )}

            {/* Table */}
            <div className="section-card">
                <div className="section-card-header gap-4 flex-wrap">
                    <div className="relative flex-1 min-w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            placeholder="Rechercher par client ou n° commande..."
                            className="input-field pl-9 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="input-field w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">Tous les statuts</option>
                        {Object.entries(STATUS_CONFIG).map(([v, { label }]) => (
                            <option key={v} value={v}>{label}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="py-20 flex flex-col items-center">
                        <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center mb-4">
                            <ShoppingCart className="h-8 w-8 text-slate-600" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-bold text-lg">Aucune commande trouvée</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-black/5 dark:border-white/5">
                                    {['N° Commande', 'Client', 'Statut', 'Paiement', 'Articles', 'Total', 'Date', ''].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-[10px] font-black text-slate-600 uppercase tracking-[0.15em]">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    const sc = STATUS_CONFIG[order.status] || { label: order.status, style: '' };
                                    const pc = PAYMENT_CONFIG[order.paymentStatus] || { label: order.paymentStatus, style: '' };
                                    return (
                                        <tr key={order.id} className="table-row-hover border-b border-white/[0.03]">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-black text-brand-400">#{order.orderNumber}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {order.customer ? (
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customer.firstName} {order.customer.lastName}</p>
                                                        <p className="text-xs text-slate-500">{order.customer.email}</p>
                                                    </div>
                                                ) : <span className="text-sm text-slate-500">Client invité</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`status-badge border ${sc.style}`}>{sc.label}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold ${pc.style}`}>{pc.label}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{order.items?.length || 0}</td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                                                {order.total?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency || 'EUR' })}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">
                                                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-white transition-all">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
