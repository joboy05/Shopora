import React, { useState, useEffect } from 'react';
import { Plus, Tag, HelpCircle, Save, Loader2, CheckCircle2, XCircle, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/Modal';
import { catalogService, marketService } from '../lib/api';

export default function Catalogues() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [catalogs, setCatalogs] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', marketIds: [], status: 'inactive' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [catalogsRes, marketsRes] = await Promise.all([
                catalogService.getAll(),
                marketService.getAll()
            ]);
            setCatalogs(catalogsRes.data);
            setMarkets(marketsRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await catalogService.create(formData);
            setIsModalOpen(false);
            fetchData();
            setFormData({ name: '', marketIds: [], status: 'inactive' });
        } catch (error) {
            console.error('Failed to create catalog:', error);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Catalogues</h1>
                    <p className="text-slate-500">Gérez des ensembles de produits et des prix spécifiques pour vos marchés.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Créer un catalogue
                </button>
            </header>

            {catalogs.length === 0 && !loading ? (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
                    <div className="mx-auto h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                        <Tag className="h-10 w-10 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h2 className="text-xl font-semibold">Proposez des prix différents selon vos clients</h2>
                    <p className="mt-2 text-slate-500 max-w-md mx-auto">
                        Les catalogues vous permettent de personnaliser les prix et la disponibilité des produits pour des marchés spécifiques ou des segments de clients (B2B, VIP).
                    </p>
                    <div className="mt-8 flex justify-center gap-3">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-brand-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
                        >
                            Créer votre premier catalogue
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="h-8 w-8 text-slate-600 dark:text-slate-400 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Catalogue</th>
                                    <th className="px-6 py-4">Statut</th>
                                    <th className="px-6 py-4">Marchés</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {catalogs.map((catalog) => (
                                    <tr key={catalog.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {catalog.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${catalog.status === 'active' ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-100 text-slate-800'
                                                }`}>
                                                {catalog.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                                {catalog.status === 'active' ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {catalog.marketIds.length} marché(s)
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-100/50 rounded-lg p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Tarification par marché</h3>
                    <p className="text-sm text-slate-500">
                        Ajustez automatiquement ou manuellement les prix pour chaque pays dans la section Marchés.
                    </p>
                </div>
                <div className="bg-slate-100/50 rounded-lg p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Vente en gros (B2B)</h3>
                    <p className="text-sm text-slate-500">
                        Créez des catalogues réservés à vos clients professionnels avec des tarifs dégressifs.
                    </p>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Créer un catalogue"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Nom du catalogue</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Tarifs B2B France"
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Marchés associés</label>
                        <select
                            multiple
                            value={formData.marketIds}
                            onChange={(e) => setFormData({ ...formData, marketIds: Array.from(e.target.selectedOptions, option => option.value) })}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm border p-2 bg-white"
                        >
                            {markets.map(market => (
                                <option key={market.id} value={market.id}>{market.name}</option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-slate-500">Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs marchés.</p>
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
                            className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700"
                        >
                            <Save className="h-4 w-4" />
                            Créer le catalogue
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
