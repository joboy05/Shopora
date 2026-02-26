import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { themeService } from '../lib/api';

export default function ThemeEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [theme, setTheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [jsonError, setJsonError] = useState(null);
    const [settingsText, setSettingsText] = useState('');

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const response = await themeService.getAll();
                const found = response.data.find(t => t.id === id);
                if (found) {
                    setTheme(found);
                    setSettingsText(JSON.stringify(found.settings || {}, null, 4));
                }
            } catch (error) {
                console.error('Failed to fetch theme:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTheme();
    }, [id]);

    const handleSave = async () => {
        try {
            setSaving(true);
            const parsed = JSON.parse(settingsText);
            setJsonError(null);
            await themeService.update(id, { settings: parsed });
            setSaving(false);
            // Show success toast or just stay
        } catch (error) {
            setJsonError(error.message);
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 text-slate-400 animate-spin" /></div>;
    if (!theme) return <div className="p-12 text-center text-red-500">Thème non trouvé.</div>;

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/online-store/themes')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Éditeur : {theme.name}</h1>
                        <p className="text-slate-500 text-sm">Modifiez directement la configuration JSON de votre thème.</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-slate-800 disabled:opacity-50 transition-colors"
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Enregistrer les modifications
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">settings.json</span>
                            {jsonError && (
                                <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                                    <AlertCircle className="h-3 w-3" />
                                    Erreur JSON
                                </span>
                            )}
                        </div>
                        <textarea
                            value={settingsText}
                            onChange={(e) => setSettingsText(e.target.value)}
                            className="flex-1 w-full p-4 font-mono text-sm bg-slate-900 text-green-400 focus:outline-none resize-none leading-relaxed"
                            spellCheck="false"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            Aide à la configuration
                        </h3>
                        <div className="space-y-4 text-sm text-slate-600">
                            <p>Utilisez des variables JSON pour configurer :</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><strong>colors</strong>: Couleurs principales et secondaires.</li>
                                <li><strong>typography</strong>: Polices et tailles de texte.</li>
                                <li><strong>layout</strong>: Espacements et largeurs max.</li>
                            </ul>
                        </div>
                    </div>

                    {jsonError && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <h4 className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
                                <AlertCircle className="h-4 w-4" />
                                Erreur de syntaxe
                            </h4>
                            <p className="text-red-600 text-xs overflow-hidden text-ellipsis">{jsonError}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
