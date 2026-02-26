import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, Clock, CheckCircle2, AlertCircle, Plus, Save, Loader2, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/Modal';
import { taxRuleService, payoutService, marketService } from '../lib/api';

export default function Finances() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taxRules, setTaxRules] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [summary, setSummary] = useState({ totalPaid: 0, pending: 0 });
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', rate: '', marketId: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [taxRes, payoutRes, summaryRes, marketRes] = await Promise.all([
                taxRuleService.getAll(),
                payoutService.getAll(),
                payoutService.getSummary(),
                marketService.getAll()
            ]);
            setTaxRules(taxRes.data);
            setPayouts(payoutRes.data);
            setSummary(summaryRes.data);
            setMarkets(marketRes.data);
        } catch (error) {
            console.error('Failed to fetch financial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await taxRuleService.create(formData);
            setIsModalOpen(false);
            fetchData();
            setFormData({ name: '', rate: '', marketId: '' });
        } catch (error) {
            console.error('Failed to create tax rule:', error);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Finances</h1>
                    <p className="text-slate-500">Gérez vos paiements, taxes et rapports financiers.</p>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Ventes totales</p>
                            <h3 className="text-2xl font-bold text-slate-900">{summary.totalPaid + summary.pending}€</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Déjà payé</p>
                            <h3 className="text-2xl font-bold text-slate-900">{summary.totalPaid}€</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">En attente</p>
                            <h3 className="text-2xl font-bold text-slate-900">{summary.pending}€</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tax Rules Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                <Percent className="h-4 w-4 text-slate-400" />
                                Règles fiscales
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                            >
                                <Plus className="h-3 w-3" />
                                Ajouter
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="p-12 flex justify-center">
                                    <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Nom</th>
                                            <th className="px-6 py-4">Marché</th>
                                            <th className="px-6 py-4">Taux</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {taxRules.map((rule) => (
                                            <tr key={rule.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{rule.name}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{rule.market?.name || 'N/A'}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900">{rule.rate}%</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-slate-600">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {taxRules.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                                                    Aucune règle fiscale définie.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Payout History */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-slate-400" />
                                Historique des versements
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Montant</th>
                                        <th className="px-6 py-4">Statut</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {payouts.map((payout) => (
                                        <tr key={payout.id}>
                                            <td className="px-6 py-4 text-xs font-mono text-slate-400">#{payout.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{payout.amount}{payout.currency}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${payout.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                                    }`}>
                                                    {payout.status === 'paid' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                                    {payout.status === 'paid' ? 'Payé' : 'En attente'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(payout.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {payouts.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-500 text-sm">
                                                Aucun versement enregistré.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Info / Sidebar sidebar */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-lg shadow-lg">
                        <TrendingUp className="h-8 w-8 text-green-400 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Prochain versement</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Votre prochain versement automatique est prévu pour le lundi 2 mars.
                        </p>
                        <div className="flex items-center justify-between font-bold border-t border-slate-700 pt-4">
                            <span>Montant estimé</span>
                            <span className="text-xl text-green-400">{summary.pending}€</span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Ajouter une règle fiscale"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nom de la règle</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: TVA France Standard"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Taux (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.rate}
                                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                placeholder="20"
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Marché</label>
                            <select
                                required
                                value={formData.marketId}
                                onChange={(e) => setFormData({ ...formData, marketId: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white"
                            >
                                <option value="">Sélectionnez un marché</option>
                                {markets.map(market => (
                                    <option key={market.id} value={market.id}>{market.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3 border-t">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                        >
                            <Save className="h-4 w-4" />
                            Enregistrer la règle
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
