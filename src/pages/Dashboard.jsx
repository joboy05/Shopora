import React from 'react';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
                <p className="text-slate-500">Aperçu de l'activité de votre boutique Shopora.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Ventes totales', value: '0,00 €', change: '+0%' },
                    { label: 'Sessions', value: '0', change: '+0%' },
                    { label: 'Commandes', value: '0', change: '+0%' },
                    { label: 'Taux de conversion', value: '0.00%', change: '+0%' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            <span className="text-xs font-medium text-green-600">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-12 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                    ?
                </div>
                <h3 className="text-lg font-medium text-slate-900">Aucune donnée pour cette période</h3>
                <p className="text-slate-500 mt-1 max-w-xs">Les statistiques apparaîtront ici une fois que vous aurez reçu vos premières visites et commandes.</p>
            </div>
        </div>
    );
}
