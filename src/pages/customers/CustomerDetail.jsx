import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, User, Mail, Phone, ShoppingBag, MapPin, Tag } from 'lucide-react';
import { customerService } from '../../lib/api';

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await customerService.getOne(id);
                setCustomer(res.data.data);
            } catch (error) {
                console.error('Failed to load customer', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-full py-20">
            <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
        </div>
    );

    if (!customer) return <div className="text-center text-slate-900 dark:text-white pt-20">Client introuvable</div>;

    const initials = `${customer.firstName?.[0] || ''}${customer.lastName?.[0] || ''}`.toUpperCase();
    const totalSpent = customer.orders?.reduce((sum, order) => sum + order.total, 0) || 0;

    return (
        <div className="space-y-6 pb-20 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/customers')} className="p-2 glass rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col: Profile & Contact */}
                <div className="space-y-6">
                    <div className="section-card p-6 text-center">
                        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-brand-500/20 to-brand-500/20 border-2 border-black/5 dark:border-white/5 mx-auto mb-4 flex items-center justify-center text-2xl font-black text-brand-400">
                            {initials || <User className="h-10 w-10" />}
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{customer.firstName} {customer.lastName}</h1>
                        <p className="text-sm text-slate-500 mt-1">Client depuis le {new Date(customer.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>

                        {customer.tag && (
                            <div className="mt-4">
                                <span className="status-badge bg-brand-500/10 text-brand-400 border border-brand-500/20">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {customer.tag}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="section-card p-6 space-y-4">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4">Contact</h2>

                        <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                            </div>
                            <a href={`mailto:${customer.email}`} className="hover:text-brand-400 transition-colors break-all">{customer.email}</a>
                        </div>

                        {customer.phone && (
                            <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Phone className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                </div>
                                <a href={`tel:${customer.phone}`} className="hover:text-brand-400 transition-colors">{customer.phone}</a>
                            </div>
                        )}
                    </div>

                    <div className="section-card p-6 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Statistiques</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <p className="text-xs text-slate-500 mb-1">Commandes</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">{customer.orders?.length || 0}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <p className="text-xs text-slate-500 mb-1">Dépensé</p>
                                <p className="text-xl font-black text-brand-400">
                                    {totalSpent.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Orders History */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="section-card">
                        <div className="section-card-header font-bold text-slate-900 dark:text-white flex justify-between items-center">
                            Historique des commandes
                            <div className="p-2 rounded-xl bg-white/5 text-slate-600 dark:text-slate-400">
                                <ShoppingBag className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="p-0">
                            {customer.orders?.length === 0 ? (
                                <div className="py-16 text-center text-slate-500">
                                    Cet utilisateur n'a pas encore passé de commande.
                                </div>
                            ) : (
                                <table className="w-full">
                                    <tbody>
                                        {customer.orders?.map((order, i) => (
                                            <tr key={order.id} className={`table-row-hover ${i !== customer.orders.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""}`}>
                                                <td className="p-5">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-brand-400 cursor-pointer hover:underline" onClick={() => navigate(`/orders/${order.id}`)}>
                                                                #{order.orderNumber}
                                                            </span>
                                                            <span className="text-xs font-semibold text-slate-500">
                                                                {new Date(order.createdAt).toLocaleDateString('fr-FR')} • {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        <span className="font-black text-slate-900 dark:text-white">
                                                            {order.total.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-4 mt-3">
                                                        <span className={`status-badge border text-[10px] ${order.status === 'delivered' ? 'bg-brand-500/10 text-brand-400 border-brand-500/20' :
                                                                order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                                    'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                            {order.items?.length || 0} article(s)
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
