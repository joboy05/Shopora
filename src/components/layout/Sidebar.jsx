import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home, ShoppingCart, Package, Users, Tag,
    Map, LayoutGrid, DollarSign, BarChart3,
    Palette, FileCode, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: ShoppingCart, label: 'Commandes', path: '/orders' },
    { icon: Package, label: 'Produits', path: '/products' },
    { icon: Users, label: 'Clients', path: '/customers' },
    { icon: Tag, label: 'Réductions', path: '/discounts' },
    { type: 'divider', label: 'Configuration' },
    { icon: Map, label: 'Markets', path: '/markets' },
    { icon: LayoutGrid, label: 'Catalogues', path: '/catalogues' },
    { icon: DollarSign, label: 'Finances', path: '/finances' },
    { icon: BarChart3, label: 'Analyses', path: '/analytics' },
    { type: 'divider', label: 'Boutique en ligne' },
    { icon: Palette, label: 'Thèmes', path: '/online-store/themes' },
    { icon: FileCode, label: 'Pages', path: '/online-store/pages' },
];

export default function Sidebar() {
    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col w-72 h-screen glass-card rounded-none border-y-0 border-l-0 dark:border-r-white/5 border-r-slate-200 premium-blur z-20"
        >
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                        <Package className="h-6 w-6 text-black" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">SHOPORA</span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
                <ul className="space-y-1.5">
                    {menuItems.map((item, index) => {
                        if (item.type === 'divider') {
                            return (
                                <li key={`divider-${index}`} className="pt-6 pb-2 px-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                                        {item.label}
                                    </span>
                                </li>
                            );
                        }

                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `
                    group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300
                    ${isActive
                                            ? 'text-brand-400 bg-brand-500/10'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-white/5'}
                  `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                                            <span className="font-bold text-sm tracking-tight">{item.label}</span>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="sidebar-indicator"
                                                    className="absolute left-0 w-1 h-6 bg-brand-500 rounded-r-full shadow-[0_0_15px_rgba(167,139,250,0.6)]"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}

                                            <ChevronRight className={`ml-auto h-4 w-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-6 border-t border-black/5 dark:border-white/5">
                <div className="glass-card bg-brand-500/5 p-4 rounded-3xl border-brand-500/10">
                    <p className="text-xs font-bold text-brand-400 mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                        Shopora Pro
                    </p>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                        Plan premium activé.<br />Support 24/7 disponible.
                    </p>
                </div>
            </div>
        </motion.aside>
    );
}
