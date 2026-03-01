import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, MoreHorizontal, Loader2, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { productService } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const STATUS_STYLES = {
    active: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    draft: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    archived: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const STATUS_LABELS = { active: 'Actif', draft: 'Brouillon', archived: 'Archivé' };

export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [meta, setMeta] = useState({ total: 0 });

    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '', description: '', price: '', status: 'draft', inventory: '0', category: ''
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productService.getAll({ search, status });
            const data = response.data?.data || [];
            setProducts(Array.isArray(data) ? data : []);
            setMeta(response.data?.meta || { total: Array.isArray(data) ? data.length : 0 });
        } catch (e) {
            console.error('Failed to load products:', e);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, [search, status]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await productService.create({
                ...newProduct,
                price: parseFloat(newProduct.price),
                inventory: parseInt(newProduct.inventory)
            });
            setShowModal(false);
            fetchProducts();
            setNewProduct({ name: '', description: '', price: '', status: 'draft', inventory: '0', category: '' });
        } catch (e) {
            alert('Échec de la création');
        }
    };

    const stats = [
        { label: 'Articles actifs', value: (products || []).filter(p => p?.status === 'active').length, icon: Package, color: 'text-brand-400', bg: 'bg-brand-500/10' },
        { label: 'En rupture', value: (products || []).filter(p => p?.inventory <= 0).length, icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { label: 'Brouillons', value: (products || []).filter(p => p?.status === 'draft').length, icon: CheckCircle2, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="page-title text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Produits</h1>
                    <p className="page-subtitle text-slate-500 font-medium">{meta.total} produit{meta.total !== 1 ? 's' : ''} dans votre catalogue.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="premium-button flex items-center gap-2 bg-slate-900 text-white dark:bg-brand-500 dark:text-black px-6 py-3 rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(167,139,250,0.3)] transition-all hover:scale-105"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter un produit
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4 border border-white/5 bg-white/5 backdrop-blur-md">
                        <div className={`p-3 rounded-xl ${bg}`}>
                            <Icon className={`h-5 w-5 ${color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                            <p className={`text-xl font-black ${color}`}>{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="section-card bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                <div className="section-card-header p-6 flex items-center gap-4 bg-white/5">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            placeholder="Rechercher un produit..."
                            className="bg-white/5 border border-white/10 rounded-2xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs font-bold text-slate-400 focus:outline-none"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Tous les statuts</option>
                        <option value="active">Actifs</option>
                        <option value="draft">Brouillons</option>
                        <option value="archived">Archivés</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-20 flex flex-col items-center">
                        <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                            <Package className="h-8 w-8 text-slate-600" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-bold text-lg">Aucun produit trouvé</p>
                        <button onClick={() => setShowModal(true)} className="text-brand-400 font-bold mt-2 hover:underline">
                            Créer votre premier article
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr className="border-b border-white/5">
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest w-12"></th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Produit</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Statut</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Inventaire</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Catégorie</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Prix</th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {(products || []).map((product, i) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            className="hover:bg-white/5 border-b border-white/5 cursor-pointer transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="h-10 w-10 glass rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0].url} alt="" className="h-full w-full object-cover" />
                                                    ) : <Package className="h-5 w-5 text-slate-500" />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{product.name}</p>
                                                    <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{product.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${STATUS_STYLES[product.status] || STATUS_STYLES.draft}`}>
                                                    {STATUS_LABELS[product.status] || product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    {product.inventory} en stock
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-slate-500">{product.category || 'Non classé'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                                                {product.price?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-slate-900 rounded-[2.5rem] border border-white/10 p-10 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600" />

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">NOUVEAU PRODUIT</h2>
                                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Édition du catalogue</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X className="h-6 w-6 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nom de l'article</label>
                                        <input
                                            required placeholder="Ex: Veste Premium en Cuir"
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                                            value={newProduct.name}
                                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            rows={3} placeholder="Détails du produit..."
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                                            value={newProduct.description}
                                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Prix (€)</label>
                                        <input
                                            type="number" step="0.01" required placeholder="0.00"
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-black"
                                            value={newProduct.price}
                                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stock</label>
                                        <input
                                            type="number" required placeholder="0"
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-black"
                                            value={newProduct.inventory}
                                            onChange={e => setNewProduct({ ...newProduct, inventory: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Catégorie</label>
                                        <input
                                            placeholder="Ex: Vêtements"
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                                            value={newProduct.category}
                                            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Statut</label>
                                        <select
                                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold appearance-none"
                                            value={newProduct.status}
                                            onChange={e => setNewProduct({ ...newProduct, status: e.target.value })}
                                        >
                                            <option value="draft" className="bg-slate-900">Brouillon</option>
                                            <option value="active" className="bg-slate-900">Actif</option>
                                            <option value="archived" className="bg-slate-900">Archivé</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 px-6 rounded-2xl border border-white/5 font-black text-xs text-slate-500 hover:bg-white/5 transition-all"
                                    >
                                        ANNULER
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] bg-brand-500 text-black py-4 px-6 rounded-2xl font-black text-xs shadow-[0_10px_30px_rgba(167,139,250,0.3)] hover:scale-[1.02] transition-all"
                                    >
                                        CRÉER L'ARTICLE
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
