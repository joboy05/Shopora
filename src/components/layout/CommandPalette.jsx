import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, X, ArrowRight, Home, ShoppingCart, Package, Users,
    Tag, Globe, CreditCard, BarChart2, Monitor, Palette, Settings, Zap
} from 'lucide-react';

const commands = [
    { id: 'home', name: 'Tableau de bord', icon: Home, href: '/', group: 'Navigation' },
    { id: 'orders', name: 'Commandes', icon: ShoppingCart, href: '/orders', group: 'Navigation' },
    { id: 'products', name: 'Produits', icon: Package, href: '/products', group: 'Navigation' },
    { id: 'customers', name: 'Clients', icon: Users, href: '/customers', group: 'Navigation' },
    { id: 'discounts', name: 'Réductions', icon: Tag, href: '/discounts', group: 'Navigation' },
    { id: 'markets', name: 'Markets', icon: Globe, href: '/markets', group: 'Configuration' },
    { id: 'finances', name: 'Finances', icon: CreditCard, href: '/finances', group: 'Configuration' },
    { id: 'analytics', name: 'Analyses', icon: BarChart2, href: '/analytics', group: 'Insights' },
    { id: 'themes', name: 'Thèmes', icon: Palette, href: '/online-store/themes', group: 'Boutique' },
    { id: 'pages', name: 'Pages', icon: Monitor, href: '/online-store/pages', group: 'Boutique' },
    { id: 'settings', name: 'Paramètres', icon: Settings, href: '/settings', group: 'Configuration' },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const handleOpen = useCallback(() => { setOpen(true); setQuery(''); setSelectedIndex(0); }, []);
    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const handler = (e) => {
            if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || e.key === '/') {
                if (e.key === 'k') e.preventDefault();
                handleOpen();
            }
            if (e.key === 'Escape') handleClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [handleOpen, handleClose]);

    const filtered = commands.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => { setSelectedIndex(0); }, [query]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
        if (e.key === 'Enter' && filtered[selectedIndex]) {
            navigate(filtered[selectedIndex].href);
            handleClose();
        }
    };

    const groups = [...new Set(filtered.map((c) => c.group))];

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'rgba(10,14,23,0.95)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(30px)',
                        }}
                        onKeyDown={handleKeyDown}
                    >
                        {/* Search Input */}
                        <div className="flex items-center px-6 py-5 border-b border-black/5 dark:border-white/5">
                            <Search className="h-5 w-5 text-brand-400 shrink-0 mr-4" />
                            <input
                                autoFocus
                                className="flex-1 bg-transparent text-slate-900 dark:text-white text-lg placeholder:text-slate-500 outline-none font-medium"
                                placeholder="Où voulez-vous aller ?"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            />
                            <button onClick={handleClose} className="p-1 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-white transition-colors ml-3">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] overflow-y-auto p-3">
                            {filtered.length === 0 ? (
                                <div className="py-16 text-center text-slate-500 text-sm font-medium">
                                    Aucun résultat pour « {query} »
                                </div>
                            ) : (
                                groups.map((group) => (
                                    <div key={group} className="mb-2">
                                        <p className="px-4 py-1 text-[10px] font-black text-slate-600 uppercase tracking-[0.15em]">{group}</p>
                                        {filtered.filter((c) => c.group === group).map((cmd) => {
                                            const globalIndex = filtered.indexOf(cmd);
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-100 group ${globalIndex === selectedIndex ? 'bg-brand-500/10 text-brand-400' : 'text-slate-700 dark:text-slate-300 hover:bg-white/5 hover:text-slate-900 dark:text-white'}`}
                                                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                    onClick={() => { navigate(cmd.href); handleClose(); }}
                                                >
                                                    <div className={`p-2 rounded-xl border ${globalIndex === selectedIndex ? 'bg-brand-500/20 border-brand-500/30' : 'bg-white/5 border-black/5 dark:border-white/5'}`}>
                                                        <cmd.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-semibold text-sm">{cmd.name}</span>
                                                    <ArrowRight className={`h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${globalIndex === selectedIndex ? 'opacity-100' : ''}`} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-6 py-3 bg-white/[0.02] border-t border-black/5 dark:border-white/5">
                            <div className="flex items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400">↑↓</kbd> Naviguer</span>
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400">↵</kbd> Ouvrir</span>
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400">Esc</kbd> Fermer</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-brand-500" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shopora Pro</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
