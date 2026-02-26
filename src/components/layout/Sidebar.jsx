import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    ShoppingCart,
    Package,
    Users,
    Tag,
    Globe,
    CreditCard,
    BarChart2,
    Monitor,
    Palette,
    Settings,
    Layout
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Commandes', href: '/orders', icon: ShoppingCart },
    { name: 'Produits', href: '/products', icon: Package },
    { name: 'Clients', href: '/customers', icon: Users },
    { name: 'Réductions', href: '/discounts', icon: Tag },
    { name: 'Markets', href: '/markets', icon: Globe },
    { name: 'Catalogues', href: '/catalogues', icon: Layout },
    { name: 'Finances', href: '/finances', icon: CreditCard },
    { name: 'Analyses', href: '/analytics', icon: BarChart2 },
    { name: 'Themes', href: '/online-store/themes', icon: Palette },
    { name: 'Pages', href: '/online-store/pages', icon: Monitor },
    { name: 'Paramètres', href: '/settings', icon: Settings, bottom: true },
];

export function Sidebar() {
    return (
        <div className="flex h-full flex-col bg-slate-900 text-slate-300 w-64">
            <div className="flex h-16 shrink-0 items-center px-6 gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white font-bold">
                    S
                </div>
                <span className="text-lg font-semibold text-white">Shopora</span>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="flex-1 space-y-1 px-3">
                    {navigation.filter(item => !item.bottom).map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white',
                                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                                )
                            }
                        >
                            <item.icon
                                className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-white"
                                aria-hidden="true"
                            />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="flex flex-shrink-0 border-t border-slate-700 p-4">
                {navigation.filter(item => item.bottom).map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white',
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full'
                            )
                        }
                    >
                        <item.icon
                            className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-white"
                            aria-hidden="true"
                        />
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
