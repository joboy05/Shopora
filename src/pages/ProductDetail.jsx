import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, Loader2, ArrowRight } from 'lucide-react';
import { productService } from '../lib/api';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'draft',
        vendor: '',
        productType: '',
        tags: [],
        variants: []
    });

    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (!isNew) {
            const fetchProduct = async () => {
                try {
                    const res = await productService.getOne(id);
                    setFormData(res.data.data);
                } catch (error) {
                    console.error('Failed to load product', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isNew]);

    const handleSave = async () => {
        setSaving(true);
        try {
            if (isNew) {
                await productService.create(formData);
            } else {
                await productService.update(id, formData);
            }
            navigate('/products');
        } catch (error) {
            console.error('Failed to save product', error);
        } finally {
            setSaving(false);
        }
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { title: '', price: 0, inventory: 0, sku: '' }]
        });
    };

    const updateVariant = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index][field] = value;
        setFormData({ ...formData, variants: newVariants });
    };

    const removeVariant = (index) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-full py-20">
            <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
        </div>
    );

    return (
        <div className="space-y-10 pb-20 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => navigate('/products')}
                        className="p-3 glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </motion.button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{isNew ? 'Nouveau produit' : formData.title || 'Produit sans titre'}</h1>
                        <p className="text-slate-500 font-medium text-[10px] tracking-widest uppercase mt-1 font-black">Gestion du catalogue matériel</p>
                    </div>
                </div>
                <button onClick={handleSave} disabled={saving} className="btn-premium py-3 group">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                    Enregistrer les modifications
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <PremiumCard delay={0.1}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Informations principales</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-black">Titre du produit</label>
                                <input
                                    className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold placeholder:text-slate-700"
                                    placeholder="ex: Veste en lin Premium"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-black">Description détaillée</label>
                                <textarea
                                    className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full min-h-[180px] resize-y transition-all font-medium placeholder:text-slate-700"
                                    placeholder="Décrivez votre produit avec des détails captivants..."
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </PremiumCard>

                    <PremiumCard delay={0.2}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Variantes et logistique</h2>
                            <button onClick={addVariant} className="flex items-center gap-2 text-brand-400 hover:text-brand-300 text-[10px] font-black uppercase tracking-widest transition-colors">
                                <Plus className="h-4 w-4" /> Ajouter variant
                            </button>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {formData.variants.length === 0 ? (
                                    <div className="text-center py-12 bg-white/[0.02] rounded-3xl border border-black/5 dark:border-white/5 border-dashed">
                                        <Package className="h-10 w-10 text-slate-800 mx-auto mb-3" />
                                        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Aucune variante configurée</p>
                                    </div>
                                ) : (
                                    formData.variants.map((v, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white/[0.03] rounded-3xl p-6 border border-black/5 dark:border-white/5 flex flex-wrap gap-6 items-end relative group hover:bg-white/[0.05] transition-all"
                                        >
                                            <div className="flex-1 min-w-[200px]">
                                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Options (ex: XL / Bleu)</label>
                                                <input className="bg-transparent border-b border-black/10 dark:border-white/10 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500/50 w-full font-bold" value={v.title} onChange={e => updateVariant(i, 'title', e.target.value)} />
                                            </div>
                                            <div className="w-24">
                                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Prix (€)</label>
                                                <input type="number" className="bg-transparent border-b border-black/10 dark:border-white/10 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500/50 w-full font-bold" value={v.price} onChange={e => updateVariant(i, 'price', parseFloat(e.target.value))} />
                                            </div>
                                            <div className="w-24">
                                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Stock</label>
                                                <input type="number" className="bg-transparent border-b border-black/10 dark:border-white/10 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500/50 w-full font-bold" value={v.inventory} onChange={e => updateVariant(i, 'inventory', parseInt(e.target.value))} />
                                            </div>
                                            <div className="w-32">
                                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">SKU</label>
                                                <input className="bg-transparent border-b border-black/10 dark:border-white/10 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500/50 w-full font-mono" value={v.sku || ''} onChange={e => updateVariant(i, 'sku', e.target.value)} />
                                            </div>
                                            <button onClick={() => removeVariant(i)} className="p-2 text-slate-600 hover:text-red-400 transition-colors absolute top-4 right-4 opacity-0 group-hover:opacity-100">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </PremiumCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <PremiumCard delay={0.3}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Statut et Visibilité</h2>

                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Statut catalogue</label>
                                <select
                                    className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-4 py-3 text-sm font-black text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full cursor-pointer uppercase tracking-widest"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="active">Actif</option>
                                    <option value="draft">Brouillon</option>
                                    <option value="archived">Archivé</option>
                                </select>
                                <ArrowRight className="absolute right-4 bottom-4 h-4 w-4 text-slate-600 rotate-90 pointer-events-none group-hover:text-brand-400 transition-colors" />
                            </div>

                            <div className="pt-4 border-t border-black/5 dark:border-white/5">
                                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Catégorie</label>
                                <input
                                    className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold"
                                    placeholder="ex: Vêtements"
                                    value={formData.productType || ''}
                                    onChange={e => setFormData({ ...formData, productType: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Marque / Vendor</label>
                                <input
                                    className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-2.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold"
                                    placeholder="Nom du fournisseur"
                                    value={formData.vendor || ''}
                                    onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                />
                            </div>
                        </div>
                    </PremiumCard>

                    <PremiumCard delay={0.4}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 text-glow">Organisation par Tags</h2>
                        <input
                            className="bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-2.5 px-4 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold placeholder:text-slate-700 mb-4"
                            placeholder="Nouveau tag + Entrée"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        <div className="flex flex-wrap gap-2">
                            {formData.tags?.map(tag => (
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 transparent-glass-card rounded-xl text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest border border-black/5 dark:border-white/5"
                                >
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors"><Trash2 className="h-3 w-3" /></button>
                                </motion.span>
                            ))}
                        </div>
                    </PremiumCard>

                    <PremiumCard delay={0.5} className="group cursor-pointer hover:border-brand-500/20">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Galerie Médias</h2>
                        <div className="border-2 border-dashed border-black/10 dark:border-white/10 bg-white/[0.01] rounded-3xl p-10 flex flex-col items-center justify-center text-center group-hover:bg-brand-500/5 group-hover:border-brand-400/50 transition-all duration-500">
                            <ImageIcon className="h-10 w-10 text-slate-800 mb-3 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-500" />
                            <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-400 transition-colors">Uploader des visuels HQ</p>
                            <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-2">Dépôt par lot bientôt disponible</p>
                        </div>
                    </PremiumCard>
                </div>
            </div>
        </div>
    );
}
