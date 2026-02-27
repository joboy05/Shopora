import React from 'react';
import { Globe, MapPin, Plus, MoreHorizontal, TrendingUp, ShoppingBag, ArrowRight } from 'lucide-react';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion, AnimatePresence } from 'framer-motion';

const markets = [
    { id: 1, name: 'France (Principal)', type: 'Primaire', status: 'Actif', domains: 'shopora.fr', regions: 'France', sales: '8,450 €' },
    { id: 2, name: 'Union Européenne', type: 'Expansion', status: 'Actif', domains: 'shopora.com/eu', regions: '26 pays', sales: '3,200 €' },
    { id: 3, name: 'États-Unis', type: 'Expansion', status: 'Inactif', domains: 'shopora.us', regions: 'USA', sales: '0 €' },
];

export default function Markets() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Markets</h1>
                    <p className="text-slate-500 font-medium">Gérez vos stratégies de vente internationales et locales.</p>
                </div>

                <button className="btn-premium py-3 group">
                    <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Créer un nouveau marché
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Marchés Actifs', value: '2', color: 'text-brand-400' },
                    { label: 'Régions Total', value: '28', color: 'text-brand-400' },
                    { label: 'Ventes Globales', value: '11,650 €', color: 'text-slate-900 dark:text-white' },
                ].map((s, i) => (
                    <PremiumCard key={s.label} delay={i * 0.1}>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
                        <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
                    </PremiumCard>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-card overflow-hidden"
            >
                <div className="p-6 border-b border-black/5 dark:border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Marchés configurés</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Priorité automatique activée</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-black/5 dark:border-white/5 bg-white/[0.01]">
                                {['Marché', 'Type', 'Statut', 'Portée (Régions)', 'Revenus', ''].map(h => (
                                    <th key={h} className="px-8 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {markets.map((market, i) => (
                                    <motion.tr
                                        key={market.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-white/[0.03] border-b border-black/5 dark:border-white/5 cursor-pointer transition-colors"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-500 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all duration-300">
                                                    <Globe className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-brand-400 transition-colors uppercase tracking-tight">{market.name}</p>
                                                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-0.5">{market.domains}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-black/5 dark:border-white/5 ${market.type === 'Primaire' ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-500/10 text-brand-400'}`}>
                                                {market.type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${market.status === 'Actif' ? 'bg-brand-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-600'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${market.status === 'Actif' ? 'text-slate-900 dark:text-white' : 'text-slate-600'}`}>
                                                    {market.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-slate-600" />
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{market.regions}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-3 w-3 text-brand-500" />
                                                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter">{market.sales}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 rounded-xl hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white transition-all">
                                                <ArrowRight className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PremiumCard delay={0.6} className="bg-gradient-to-br from-brand-500/5 to-transparent border-brand-500/10 group cursor-pointer overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-brand-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-glow flex items-center gap-3">
                        <ShoppingBag className="h-4 w-4 text-brand-400" />
                        Vendre à l'international
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">Développez votre business en activant les marchés transfrontaliers avec conversion automatique de devises.</p>
                    <button className="btn-premium py-2 w-full text-[10px]">Activer Expansion Global</button>
                </PremiumCard>

                <PremiumCard delay={0.7}>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <Globe className="h-4 w-4" />
                        Domaines et Sous-répertoires
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-600">FRANCE</span>
                            <span className="text-slate-900 dark:text-white">shopora.fr</span>
                            <span className="text-brand-500/50">CONNECTÉ</span>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-600">INTERNATIONAL</span>
                            <span className="text-slate-900 dark:text-white">shopora.com/en</span>
                            <span className="text-brand-500/50">HÉBERGÉ</span>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        </div>
    );
}
