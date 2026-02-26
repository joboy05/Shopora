import React from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
                    <p className="text-slate-500">Gérez les configurations globales de votre boutique.</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Save className="h-4 w-4" />
                    Enregistrer
                </button>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-900">Détails de la boutique</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Ces informations sont utilisées pour l'identité de votre boutique et les communications avec vos clients.
                    </p>
                </div>
                <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-700">Nom de la boutique</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2" defaultValue="Shopora Store" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">E-mail de contact</label>
                            <input type="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2" defaultValue="admin@shopora.fr" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Téléphone</label>
                            <input type="tel" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2" />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-slate-200" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-900">Devise et unités</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Paramètres utilisés pour le calcul des prix et des frais d'expédition.
                    </p>
                </div>
                <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Devise de la boutique</label>
                            <select className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white">
                                <option>Euro (EUR)</option>
                                <option>US Dollar (USD)</option>
                                <option>FCFA (XOF)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Système d'unités</label>
                            <select className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 bg-white">
                                <option>Métrique (kg, cm)</option>
                                <option>Impérial (lb, in)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Faux de taxe par défaut (%)</label>
                            <input type="number" step="0.1" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2" defaultValue="20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
