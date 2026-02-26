import React, { useState, useEffect } from 'react';
import { Plus, Search, Globe, MoreHorizontal, CheckCircle2, XCircle, Save, Loader2 } from 'lucide-react';
import { Modal } from '../components/Modal';
import { marketService } from '../lib/api';

export default function Markets() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', countries: [], currency: 'EUR', status: 'inactive' });

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = async () => {
        try {
            setLoading(true);
            const response = await marketService.getAll();
            setMarkets(response.data);
        } catch (error) {
            console.error('Failed to fetch markets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await marketService.create({
                ...formData,
                countries: typeof formData.countries === 'string'
                    ? formData.countries.split(',').map(c => c.trim()).filter(Boolean)
                    : formData.countries
            });
            setIsModalOpen(false);
            fetchMarkets();
            setFormData({ name: '', countries: [], currency: 'EUR', status: 'inactive' });
        } catch (error) {
            console.error('Failed to create market:', error);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Marchés</h1>
                    <p className="text-slate-500">Configurez vos zones de vente, devises et langues par région.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Créer un marché
                </button>
            </header>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un marché..."
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
                                    <th className="px-6 py-4">Marché</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Pays/Régions</th>
                                    <th className="px-6 py-4">Devise</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {markets.map((market) => (
                                    <tr key={market.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{market.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${market.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                                }`}>
                                                {market.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                                {market.status === 'active' ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {market.countries.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                            {market.currency}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {markets.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            Aucun marché trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Créer un nouveau marché"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nom du marché</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: États-Unis et Canada"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Pays / Régions (séparés par des virgules)</label>
                        <input
                            type="text"
                            value={formData.countries}
                            onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                            placeholder="FR, US, CA"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Devise</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white"
                            >
                                <option value="EUR">Euro (EUR)</option>
                                <option value="USD">US Dollar (USD)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Statut initial</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white"
                            >
                                <option value="inactive">Inactif</option>
                                <option value="active">Actif</option>
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
                            Créer le marché
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
