import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Loader2, Package, User } from 'lucide-react';
import { orderService } from '../lib/api';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderService.getAll();
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'fulfilled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Commandes</h1>
                <p className="text-slate-500">Suivez et gérez les ventes de votre boutique.</p>
            </header>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher une commande..."
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Commande</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Articles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            #{order.id.slice(0, 8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <User className="h-3 w-3" />
                                                </div>
                                                <span>{order.customer?.firstName} {order.customer?.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status === 'paid' ? 'Payée' : order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-900">
                                            {order.total} €
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {order.items?.length || 0} articles
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            Aucune commande trouvée.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
