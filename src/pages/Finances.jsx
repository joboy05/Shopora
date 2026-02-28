import React from 'react';
import {
    DollarSign, ArrowUpRight, ArrowDownRight, CreditCard,
    History, Landmark, Briefcase, TrendingUp
} from 'lucide-react';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion } from 'framer-motion';

const payouts = [
    { id: 1, date: '2024-03-24', amount: '2,450.00 €', status: 'En cours', bank: 'BNP Paribas' },
    { id: 2, date: '2024-03-20', amount: '1,890.00 €', status: 'Versé', bank: 'BNP Paribas' },
    { id: 3, date: '2024-03-15', amount: '3,200.00 €', status: 'Versé', bank: 'BNP Paribas' },
];

export default function Finances() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Finances</h1>
                    <p className="text-slate-500 font-medium">Gérez vos revenus, taxes et virements bancaires.</p>
                </div>

                <button className="btn-premium group">
                    <Landmark className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Paramètres de paiement
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PremiumCard className="md:col-span-2 overflow-hidden group" delay={0.1}>
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                        <TrendingUp className="h-32 w-32" />
                    </div>
                    <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2 tracking-widest text-glow">Solde disponible</p>
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">8,432.50 €</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-400 text-xs font-black">
                            <ArrowUpRight className="h-4 w-4" />
                            +24% vs mois dernier
                        </div>
                        <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 dark:text-white transition-colors">Détails des transactions</button>
                    </div>
                </PremiumCard>

                <PremiumCard delay={0.2} className="bg-gradient-to-br from-brand-500/10 to-brand-500/10 border-black/10 dark:border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <Briefcase className="h-8 w-8 text-brand-400" />
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Compte Business</span>
                    </div>
                    <p className="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">Virement automatique</p>
                    <p className="text-xs text-slate-500 font-medium mb-6">Prochain virement prévu le 28 Mars</p>

                    <div className="p-4 bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500">Banque</span>
                            <span className="text-slate-900 dark:text-white">BNP PARIBAS •••• 4242</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500">Fréquence</span>
                            <span className="text-slate-900 dark:text-white">TOUS LES LUNDIS</span>
                        </div>
                    </div>
                </PremiumCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PremiumCard delay={0.3}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                            <History className="h-5 w-5 text-slate-500" />
                            Derniers virements
                        </h3>
                        <button className="text-[10px] font-black text-brand-500 hover:text-brand-400 uppercase tracking-widest transition-colors">Tout voir</button>
                    </div>

                    <div className="space-y-4">
                        {payouts.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-4 rounded-2xl bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center justify-between group hover:bg-white/[0.05] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-500/10 transition-colors">
                                        <DollarSign className="h-5 w-5 text-slate-500 group-hover:text-brand-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{p.amount}</p>
                                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{p.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${p.status === 'Versé' ? 'bg-brand-400/10 text-brand-400' : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'}`}>
                                        {p.status}
                                    </span>
                                    <p className="text-[9px] text-slate-700 font-bold uppercase tracking-tighter mt-1">{p.bank}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </PremiumCard>

                <PremiumCard delay={0.4}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                            <History className="h-5 w-5 text-slate-500" />
                            Taxes et TVA
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent border border-black/5 dark:border-white/5 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                <DollarSign className="h-24 w-24" />
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total collecté (TVA)</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">1,240.45 €</p>
                                </div>
                                <div className="px-3 py-1 rounded-lg bg-white/5 border border-black/5 dark:border-white/5 text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                                    T1 2024
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-black text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
                                Télécharger le rapport fiscal
                            </button>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-500/5 border border-brand-500/10">
                            <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                                <CreditCard className="h-5 w-5 text-brand-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Conformité TVA activée</p>
                                <p className="text-[10px] text-brand-600 font-bold uppercase">Tous vos calculs sont automatisés.</p>
                            </div>
                        </div>
                    </div>
                </PremiumCard>
            </div>
        </div>
    );
}
