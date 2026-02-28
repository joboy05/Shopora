import React, { useState, useEffect } from 'react';
import { Plus, Database, Settings, FileText, Save, Loader2, ChevronRight, Hash } from 'lucide-react';
import { metaService } from '../lib/api';

export default function Metaobjects() {
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('definitions'); // definitions or entries
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        fieldDefinitions: [{ name: 'Description', type: 'single_line_text_field', key: 'description', required: true }]
    });

    useEffect(() => {
        fetchDefinitions();
    }, []);

    const fetchDefinitions = async () => {
        try {
            setLoading(true);
            const response = await metaService.getDefinitions();
            setDefinitions(response.data);
        } catch (error) {
            console.error('Failed to fetch definitions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDef = async (e) => {
        e.preventDefault();
        try {
            const storeId = "demonstration-store-id"; // Real app would use context
            await metaService.createDefinition({ ...formData, storeId });
            setIsModalOpen(false);
            fetchDefinitions();
            setFormData({ name: '', type: '', description: '', fieldDefinitions: [{ name: 'Description', type: 'single_line_text_field', key: 'description', required: true }] });
        } catch (error) {
            console.error('Failed to create definition:', error);
            alert('Erreur lors de la création de la définition.');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 italic uppercase tracking-tight">Meta-objets</h1>
                    <p className="text-slate-500">Étendez Shopora avec vos propres structures de données personnalisées.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                >
                    <Plus className="h-4 w-4" />
                    Nouvelle Définition
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Definitions List */}
                <div className="md:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                    <div className="p-4 border-b bg-slate-50 text-xs font-black text-slate-500 uppercase flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Structures Définies
                    </div>
                    <div className="divide-y">
                        {definitions.map(def => (
                            <button 
                                key={def.id}
                                className="w-full text-left p-4 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                            >
                                <div>
                                    <div className="font-bold text-black uppercase text-sm">{def.name}</div>
                                    <div className="text-xs text-slate-400 font-medium">type: {def.type}</div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-black transition-colors" />
                            </button>
                        ))}
                        {definitions.length === 0 && (
                            <div className="p-8 text-center text-slate-400 italic text-sm">Aucune structure définie.</div>
                        )}
                    </div>
                </div>

                {/* Right: Info / Preview */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                            <Settings className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black italic uppercase tracking-tighter">Personnalisation Avancée</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mt-2">
                                Les Meta-objets vous permettent de créer des types de données comme "Guides des tailles", "Créateurs" ou "Certifications" et de les lier à vos produits.
                            </p>
                        </div>
                        <button className="text-black font-bold text-sm underline hover:text-slate-600">En savoir plus sur l'extensibilité 2.0</button>
                    </div>
                </div>
            </div>

            {/* Creation Modal (Simplified for now) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b bg-black text-white flex items-center justify-between">
                            <h2 className="font-black italic text-xl uppercase tracking-tighter">Nouvelle Structure de Données</h2>
                            <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                                <Plus className="h-6 w-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleAddDef} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nom Public</label>
                                <input 
                                    required
                                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-black focus:outline-none transition-all font-medium"
                                    placeholder="Ex: Biographie du Designer"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Identifiant (Type)</label>
                                <input 
                                    required
                                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-black focus:outline-none transition-all font-mono text-sm"
                                    placeholder="designer_bio"
                                    value={formData.type}
                                    onChange={e => setFormData({...formData, type: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Description</label>
                                <textarea 
                                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:border-black focus:outline-none transition-all"
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 font-bold uppercase text-xs tracking-widest text-slate-500 hover:text-black transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-8 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all shadow-md"
                                >
                                    Créer la structure
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
