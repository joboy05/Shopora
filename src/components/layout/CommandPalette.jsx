import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Home, ShoppingCart, Package, Users, Tag, Globe, BarChart2, Monitor, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Commandes', icon: ShoppingCart, href: '/orders' },
    { name: 'Produits', icon: Package, href: '/products' },
    { name: 'Clients', icon: Users, href: '/customers' },
    { name: 'Réductions', icon: Tag, href: '/discounts' },
    { name: 'Markets', icon: Globe, href: '/markets' },
    { name: 'Analyses', icon: BarChart2, href: '/analytics' },
    { name: 'Themes', icon: Monitor, href: '/online-store/themes' },
    { name: 'Pages', icon: Monitor, href: '/online-store/pages' },
    { name: 'Paramètres', icon: Settings, href: '/settings' },
];

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const filteredActions = actions.filter((action) =>
        action.name.toLowerCase().includes(query.toLowerCase())
    );

    const onAction = (href) => {
        navigate(href);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl glass-morphism rounded-3xl overflow-hidden shadow-2xl pointer-events-auto border border-white/10"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center gap-4">
                                <Search className="h-6 w-6 text-emerald-400" />
                                <input
                                    autoFocus
                                    placeholder="Où voulez-vous aller ?"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 bg-transparent border-none text-xl text-white outline-none placeholder:text-slate-500 font-display"
                                />
                                <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-xl">
                                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Esc</span>
                                </div>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                                {filteredActions.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-1">
                                        {filteredActions.map((action) => (
                                            <button
                                                key={action.name}
                                                onClick={() => onAction(action.href)}
                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-300 transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-emerald-500/20 transition-all">
                                                        <action.icon className="h-5 w-5" />
                                                    </div>
                                                    <span className="font-bold text-lg">{action.name}</span>
                                                </div>
                                                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center text-slate-500 italic">
                                        Aucun résultat pour "{query}"
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                                    <div className="flex items-center gap-1">
                                        <div className="bg-white/5 border border-white/10 px-1 py-0.5 rounded">↑↓</div>
                                        <span>Naviguer</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="bg-white/5 border border-white/10 px-1 py-0.5 rounded">↵</div>
                                        <span>Sélectionner</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-[10px]">S</div>
                                    <span className="text-[10px] font-bold text-slate-300 tracking-tighter">SHOPORA PRO</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
