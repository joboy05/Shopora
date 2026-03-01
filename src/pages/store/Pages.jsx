import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Eye, EyeOff } from 'lucide-react';

export default function Pages() {
    const [pages] = useState([
        { id: 1, title: 'Accueil', slug: '/', status: 'Visible', updatedAt: 'Il y a 2 jours' },
        { id: 2, title: 'Politique de confidentialité', slug: '/privacy', status: 'Masqué', updatedAt: 'Il y a 1 semaine' },
        { id: 3, title: 'Conditions générales', slug: '/tos', status: 'Visible', updatedAt: 'Il y a 1 mois' },
    ]);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pages</h1>
                    <p className="text-slate-500">Gérez le contenu informatif de votre boutique.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Ajouter une page
                </button>
            </header>

            <div className="bg-white dark:bg-slate-900/40 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div className="relative max-w-sm w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border border-slate-300 py-1.5 pl-10 pr-3 text-sm placeholder:text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            placeholder="Filtrer les pages..."
                        />
                    </div>
                </div>

                <table className="min-w-full divide-y divide-slate-200 text-left">
                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3 w-12">
                                <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                            </th>
                            <th className="px-6 py-3">Titre</th>
                            <th className="px-6 py-3">Statut</th>
                            <th className="px-6 py-3">Dernière mise à jour</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-transparent divide-y divide-slate-200 dark:divide-white/5">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{page.title}</div>
                                    <div className="text-xs text-slate-500">{page.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${page.status === 'Visible' ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-100 text-slate-800'
                                        }`}>
                                        {page.status === 'Visible' ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                        {page.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    {page.updatedAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-600 dark:text-slate-400 hover:text-slate-600 p-1">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {pages.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">Aucune page trouvée.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
