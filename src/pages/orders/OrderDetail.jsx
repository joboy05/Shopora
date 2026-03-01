import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, User, MapPin, Truck, CreditCard, Clock, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { orderService } from '../../lib/api';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { motion } from 'framer-motion';

const STATUS_CONFIG = {
    pending: { label: 'En attente', icon: Clock, style: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    confirmed: { label: 'Confirmée', icon: CheckCircle, style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    processing: { label: 'En cours', icon: Package, style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    shipped: { label: 'Expédiée', icon: Truck, style: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    delivered: { label: 'Livrée', icon: CheckCircle, style: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
    cancelled: { label: 'Annulée', icon: null, style: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    refunded: { label: 'Remboursée', icon: null, style: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
};

const PAYMENT_CONFIG = {
    pending: { label: 'En attente', style: 'text-amber-400 bg-amber-500/10 ring-1 ring-amber-500/20' },
    paid: { label: 'Payé', style: 'text-brand-400 bg-brand-500/10 ring-1 ring-brand-500/20' },
    refunded: { label: 'Remboursé', style: 'text-orange-400 bg-orange-500/10 ring-1 ring-orange-500/20' },
    failed: { label: 'Échoué', style: 'text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20' },
};

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderService.getOne(id);
                setOrder(res.data.data);
            } catch (error) {
                console.error('Failed to load order', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setUpdatingStatus(true);
        try {
            await orderService.updateStatus(id, { status: newStatus });
            setOrder({ ...order, status: newStatus });
        } catch (error) {
            console.error('Failed to update status', error);
        } finally {
            setUpdatingStatus(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-full py-20">
            <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
        </div>
    );

    if (!order) return <div className="text-center text-slate-900 dark:text-white pt-20">Commande introuvable</div>;

    const StatusIcon = STATUS_CONFIG[order.status]?.icon || Clock;

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => navigate('/orders')}
                        className="p-3 glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </motion.button>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Commande #{order.orderNumber}</h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/5 dark:border-white/5 inline-flex items-center gap-2 ${STATUS_CONFIG[order.status]?.style}`}>
                                <StatusIcon className="h-3 w-3" />
                                {STATUS_CONFIG[order.status]?.label}
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest font-black">
                            Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        {updatingStatus && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-500 animate-spin z-10" />}
                        <select
                            className="bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-3 text-sm font-black text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 pr-12 cursor-pointer hover:bg-white/10 transition-all uppercase tracking-widest"
                            value={order.status}
                            onChange={handleStatusChange}
                            disabled={updatingStatus}
                        >
                            {Object.entries(STATUS_CONFIG).map(([v, { label }]) => (
                                <option key={v} value={v}>{label}</option>
                            ))}
                        </select>
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 rotate-90 pointer-events-none group-hover:text-brand-400 transition-colors" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <PremiumCard delay={0.1} className="p-0 overflow-hidden">
                        <div className="px-8 py-6 border-b border-black/5 dark:border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Articles de la commande</h2>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{order.items?.length || 0} ITEMS</span>
                        </div>
                        <div className="p-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-black text-slate-600 uppercase tracking-widest text-left">
                                        <th className="pb-4">PRODUIT / VARIANT</th>
                                        <th className="pb-4 text-center">QTÉ</th>
                                        <th className="pb-4 text-right">PRIX UNIT.</th>
                                        <th className="pb-4 text-right">MONTANT TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items?.map((item, i) => (
                                        <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-500/10 group-hover:border-brand-500/20 transition-all duration-300">
                                                        <Package className="h-7 w-7 text-slate-600 group-hover:text-brand-400 transition-colors" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-brand-400 transition-colors">{item.variant?.product?.title || 'Produit inconnu'}</p>
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{item.variant?.title || item.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 text-center text-sm font-black text-slate-900 dark:text-white">x{item.quantity}</td>
                                            <td className="py-6 text-right text-sm font-bold text-slate-600 dark:text-slate-400">{item.price?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}</td>
                                            <td className="py-6 text-right text-sm font-black text-slate-900 dark:text-white">{item.total?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5 space-y-4 max-w-sm ml-auto">
                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>Sous-total</span>
                                    <span className="text-slate-700 dark:text-slate-300">{order.subtotal?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>Livraison</span>
                                    <span className="text-slate-700 dark:text-slate-300">{order.shippingCost === 0 ? 'GRATUIT' : order.shippingCost?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>Taxes (VAT)</span>
                                    <span className="text-slate-700 dark:text-slate-300">{order.taxAmount?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-slate-900 dark:text-white pt-6 border-t border-black/5 dark:border-white/5">
                                    <span>TOTAL</span>
                                    <span className="text-brand-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                                        {order.total?.toLocaleString('fr-FR', { style: 'currency', currency: order.currency })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </PremiumCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <PremiumCard delay={0.2}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <User className="h-3 w-3" /> CLIENT CONCERNÉ
                        </h2>
                        {order.customer ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-400/20 to-brand-500/20 border border-black/10 dark:border-white/10 flex items-center justify-center text-brand-400 font-black text-lg">
                                        {order.customer.firstName[0]}{order.customer.lastName[0]}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.customer.firstName} {order.customer.lastName}</p>
                                        <button className="text-[10px] text-brand-500 font-black uppercase tracking-widest hover:text-brand-400 transition-colors mt-0.5">Voir le profil complet</button>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-4 w-4 text-slate-600" />
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${PAYMENT_CONFIG[order.paymentStatus]?.style}`}>
                                            {PAYMENT_CONFIG[order.paymentStatus]?.label}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 break-all">{order.customer.email}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic">Invité anonyme</p>
                        )}
                    </PremiumCard>

                    <PremiumCard delay={0.3}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MapPin className="h-3 w-3" /> ADRESSE DE LIVRAISON
                        </h2>
                        <div className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-5 font-mono text-xs text-slate-600 dark:text-slate-400 leading-relaxed group">
                            {order.shippingAddress ? (
                                <div className="space-y-1">
                                    <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{order.shippingAddress.name || `${order.customer?.firstName} ${order.customer?.lastName}`}</p>
                                    <p>{order.shippingAddress.address1}</p>
                                    {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                                    <p>{order.shippingAddress.zip} {order.shippingAddress.city}</p>
                                    <p className="font-black text-brand-500/50 uppercase tracking-widest mt-2">{order.shippingAddress.country}</p>
                                </div>
                            ) : (
                                <p className="italic">Aucune adresse fournie</p>
                            )}
                        </div>
                    </PremiumCard>

                    <PremiumCard delay={0.4} className="bg-brand-500/5 border-brand-500/10">
                        <h2 className="text-[10px] font-black text-brand-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Truck className="h-3 w-3" /> MÉTHODE D'EXPÉDITION
                        </h2>
                        <p className="text-sm font-black text-slate-900 dark:text-white">Livraison Express (DHL)</p>
                        <p className="text-[10px] text-brand-600 font-bold uppercase mt-1">Numéro de suivi : DHL-98234-FR</p>
                    </PremiumCard>
                </div>
            </div>
        </div>
    );
}
