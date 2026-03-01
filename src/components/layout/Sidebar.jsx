import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home, ShoppingCart, Package, Users, Tag,
    LayoutGrid, Palette, ChevronRight, Settings,
    Database, Globe, CreditCard, BarChart2, Monitor,
    ShieldAlert, UserCog
} from 'lucide-react';
import { motion } from 'framer-motion';

const allMenuItems = [
    // Available to everyone
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: ShoppingCart, label: 'Commandes', path: '/orders' },
    { icon: Package, label: 'Produits', path: '/products' },

    // Company + Admin only
    { icon: Users, label: 'Clients', path: '/customers', minLevel: 'COMPANY' },
    { icon: Tag, label: 'Réductions', path: '/discounts', minLevel: 'COMPANY' },
    { icon: Database, label: 'Metaobjects', path: '/metaobjects', minLevel: 'COMPANY' },

    { type: 'divider', label: 'Configuration', minLevel: 'COMPANY' },
    { icon: Globe, label: 'Markets', path: '/markets', minLevel: 'COMPANY' },
    { icon: LayoutGrid, label: 'Catalogues', path: '/catalogues', minLevel: 'COMPANY' },
    { icon: CreditCard, label: 'Finances', path: '/finances', minLevel: 'COMPANY' },
    { icon: BarChart2, label: 'Analyses', path: '/analytics', minLevel: 'COMPANY' },

    // Admin only
    { type: 'divider', label: 'Administration', minLevel: 'ADMIN' },
    { icon: UserCog, label: 'Utilisateurs', path: '/admin/users', minLevel: 'ADMIN' },
    { icon: ShieldAlert, label: 'Supervision', path: '/admin/overview', minLevel: 'ADMIN' },

    // Everyone
    { type: 'divider', label: 'Boutique en ligne' },
    { icon: Palette, label: 'Thèmes', path: '/online-store/themes' },
    { icon: Monitor, label: 'Pages', path: '/online-store/pages' },

    { type: 'divider', label: 'Système' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
];

/**
 * Returns true if the user's role/type meets the required minimum level.
 * Hierarchy: ADMIN > COMPANY > INDIVIDUAL
 */
function hasAccess(user, minLevel) {
    if (!minLevel) return true;
    if (user.role === 'ADMIN') return true;         // Admin sees everything
    if (minLevel === 'ADMIN') return false;          // Admin-only block
    if (minLevel === 'COMPANY') {
        // Both SELLER role and COMPANY accountType unlock Pro features
        return user.role === 'SELLER' || user.accountType === 'COMPANY';
    }
    return true;
}

export default function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';
    const isSeller = user.role === 'SELLER';

    const filteredItems = allMenuItems.filter(item => hasAccess(user, item.minLevel));

    const badgeLabel = isAdmin ? 'Super Admin' : isSeller ? 'Compte Pro' : 'Compte Standard';
    const badgeColor = isAdmin
        ? 'bg-red-500/10 text-red-400 border-red-500/10'
        : isSeller
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/10'
            : 'bg-brand-500/5 text-brand-400 border-brand-500/10';

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
                    {filteredItems.map((item, index) => {
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
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/5'}
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
                <div className={`glass-card p-4 rounded-3xl ${badgeColor}`}>
                    <p className="text-xs font-bold mb-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-current animate-pulse"></span>
                        {badgeLabel}
                    </p>
                    <p className="text-[10px] opacity-70 leading-relaxed font-medium">
                        {isAdmin
                            ? 'Accès complet à toutes les fonctionnalités.'
                            : isSeller
                                ? 'Plan professionnel activé. Support 24/7.'
                                : 'Espace vendeur standard.'}
                    </p>
                </div>
            </div>
        </motion.aside>
    );
}
