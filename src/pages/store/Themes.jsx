import React, { useState, useEffect } from 'react';
import {
    Monitor, Palette, Eye, Play, Trash2, Plus,
    ChevronRight, Settings as SettingsIcon, Loader2, CheckCircle2
} from 'lucide-react';
import { themeService } from '../../lib/api';

export default function Themes() {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            setLoading(true);
            const response = await themeService.getAll();
            setThemes(response.data);
        } catch (error) {
            console.error('Failed to fetch themes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (id) => {
        try {
            await themeService.publish(id);
            fetchThemes();
        } catch (error) {
            console.error('Failed to publish theme:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce thème ?')) return;
        try {
            await themeService.delete(id);
            fetchThemes();
        } catch (error) {
            console.error('Failed to delete theme:', error);
        }
    };

    const currentTheme = themes.find(t => t.status === 'current');
    const otherThemes = themes.filter(t => t.status !== 'current');

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Thèmes</h1>
                    <p className="text-slate-500">Gérez l'apparence de votre boutique en ligne.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    Ajouter un thème
                </button>
            </header>

            {loading ? (
                <div className="p-12 flex justify-center">
                    <Loader2 className="h-8 w-8 text-slate-600 dark:text-slate-400 animate-spin" />
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Current Theme Card */}
                    {currentTheme ? (
                        <div className="bg-white rounded-lg border-2 border-brand-500 shadow-sm overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 aspect-[4/3] bg-slate-100 flex items-center justify-center border-r border-slate-200">
                                    <Monitor className="h-20 w-20 text-slate-700 dark:text-slate-300" />
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-slate-900">{currentTheme.name}</h3>
                                            <span className="bg-brand-500/10 text-brand-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Thème publié
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm">Version {currentTheme.version} • Mis à jour le {new Date(currentTheme.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-6">
                                        <button
                                            onClick={() => navigate(`/online-store/themes/${currentTheme.id}/edit`)}
                                            className="flex-1 bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-brand-700 transition-colors"
                                        >
                                            Personnaliser
                                        </button>
                                        <button className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                                            Actions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900/40 p-12 rounded-lg border border-dashed border-slate-300 dark:border-white/10 text-center">
                            <Palette className="h-12 w-12 text-slate-700 dark:text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">Aucun thème publié</h3>
                            <p className="text-slate-500 mt-1">Publiez un thème pour commencer à personnaliser votre boutique.</p>
                        </div>
                    )}

                    {/* Library Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">Bibliothèque de thèmes</h3>
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4">Nom</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {otherThemes.map((theme) => (
                                        <tr key={theme.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{theme.name}</div>
                                                <div className="text-xs text-slate-500">v{theme.version}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-slate-500 italic">Non publié</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handlePublish(theme.id)}
                                                        className="text-brand-600 hover:text-brand-700 text-sm font-bold flex items-center gap-1"
                                                    >
                                                        <Play className="h-3 w-3" />
                                                        Publier
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/online-store/themes/${theme.id}/edit`)}
                                                        className="text-slate-600 dark:text-slate-400 hover:text-slate-600"
                                                    >
                                                        <SettingsIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(theme.id)}
                                                        className="text-slate-600 dark:text-slate-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {otherThemes.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-8 text-center text-slate-500 text-sm italic">
                                                Votre bibliothèque de thèmes est vide.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
