import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, MoreHorizontal, Loader2 } from 'lucide-react';
import { productService } from '../lib/api';
import { PremiumCard } from '../components/ui/PremiumCard';
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

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await productService.getAll({ search, status });
            setProducts(res.data.data);
            setMeta(res.data.meta);
        } catch {
            console.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, [search, status]);

    const totalInventory = products.reduce((acc, p) => acc + p.variants.reduce((s, v) => s + v.inventory, 0), 0);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Produits</h1>
                    <p className="text-slate-500 font-medium">{meta.total} produit{meta.total !== 1 ? 's' : ''} dans votre catalogue.</p>
                </div>
                <button onClick={() => navigate('/products/new')} className="btn-premium py-3">
                    <Plus className="h-4 w-4" />
                    Ajouter un produit
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total', value: meta.total, color: 'text-slate-900 dark:text-white' },
                    { label: 'Actifs', value: products.filter(p => p.status === 'active').length, color: 'text-brand-400' },
                    { label: 'Brouillons', value: products.filter(p => p.status === 'draft').length, color: 'text-slate-600 dark:text-slate-400' },
                    { label: 'Stock total', value: totalInventory, color: 'text-brand-400' },
                ].map((s, i) => (
                    <PremiumCard key={s.label} delay={i * 0.1}>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
                    </PremiumCard>
                ))}
            </div>

            {/* Table Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-card overflow-hidden"
            >
                {/* Toolbar */}
                <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-hover:text-brand-400 transition-colors" />
                        <input
                            placeholder="Rechercher un produit..."
                            className="bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-2 pl-12 pr-4 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full md:w-80 transition-all font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            className="bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Tous les statuts</option>
                            <option value="active">Actifs</option>
                            <option value="draft">Brouillons</option>
                            <option value="archived">Archivés</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-20 flex flex-col items-center text-center">
                        <div className="h-16 w-16 glass-card rounded-2xl flex items-center justify-center mb-4 text-slate-600">
                            <Package className="h-8 w-8" />
                        </div>
                        <p className="text-slate-900 dark:text-white font-black text-xl tracking-tight">Aucun produit</p>
                        <p className="text-slate-500 text-sm mt-1 max-w-xs">Votre catalogue est vide. Commencez par ajouter un produit.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-black/5 dark:border-white/5 bg-white/[0.01]">
                                    {['Produit', 'Statut', 'Variants', 'Inventaire', 'Fournisseur', ''].map(h => (
                                        <th key={h} className="px-8 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {products.map((product, i) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            className="group hover:bg-white/[0.03] border-b border-black/5 dark:border-white/5 cursor-pointer transition-colors"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-brand-500/10 group-hover:border-brand-500/20 transition-all duration-300 overflow-hidden">
                                                        <Package className="h-6 w-6 text-slate-500 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-300" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 dark:text-white text-sm group-hover:text-brand-400 transition-colors uppercase tracking-tight">{product.title}</p>
                                                        {product.tags?.length > 0 && (
                                                            <div className="flex gap-2 mt-1">
                                                                {product.tags.slice(0, 2).map(tag => (
                                                                    <span key={tag} className="text-[10px] text-slate-500 font-black uppercase tracking-widest">#{tag}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${STATUS_STYLES[product.status] || STATUS_STYLES.draft}`}>
                                                    {STATUS_LABELS[product.status] || product.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-black text-slate-700 dark:text-slate-300">{product.variants.length}</td>
                                            <td className="px-8 py-5 text-sm font-black text-slate-700 dark:text-slate-300">
                                                {product.variants.reduce((s, v) => s + v.inventory, 0)} <span className="text-[10px] text-slate-600 font-black ml-1">UNITS</span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-tight">{product.vendor || '—'}</td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 rounded-xl hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white transition-all">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
