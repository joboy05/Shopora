import React, { useState } from 'react';
import { Save, Store, Globe, Mail, Phone, CreditCard, ShieldCheck } from 'lucide-react';
import { PremiumCard } from '../components/ui/PremiumCard';
import { motion } from 'framer-motion';

export default function Settings() {
    const [formData, setFormData] = useState({
        storeName: 'Ma Boutique Shopora',
        email: 'admin@shopora.com',
        phone: '+33 6 00 00 00 00',
        currency: 'EUR',
        timezone: '(GMT+01:00) Paris',
        unitSystem: 'metric',
    });

    return (
        <div className="space-y-10 pb-20 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Paramètres</h1>
                    <p className="text-slate-500 font-medium">Configurez les informations fondamentales de votre boutique.</p>
                </div>

                <button className="btn-premium py-3 group">
                    <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Enregistrer tout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <PremiumCard delay={0.1}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Store className="h-3 w-3" /> INFORMATIONS GÉNÉRALES
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Nom de la boutique</label>
                                    <input
                                        className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold"
                                        value={formData.storeName}
                                        onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Devise principale</label>
                                    <select className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full cursor-pointer font-bold">
                                        <option value="EUR">Euro (€)</option>
                                        <option value="USD">Dollar ($)</option>
                                        <option value="GBP">Livre (£)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Email de contact</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                                        <input
                                            className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Téléphone</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                                        <input
                                            className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full transition-all font-bold"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PremiumCard>

                    <PremiumCard delay={0.2}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Globe className="h-3 w-3" /> STANDARDS ET FORMATS
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Fuseau horaire</label>
                                <select className="bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-full cursor-pointer font-bold">
                                    <option>{formData.timezone}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Système d'unités</label>
                                <div className="flex bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5">
                                    <button className="flex-1 py-2 text-xs font-black uppercase tracking-widest bg-brand-500 text-black rounded-xl transition-all">Métrique</button>
                                    <button className="flex-1 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:text-white transition-all">Impérial</button>
                                </div>
                            </div>
                        </div>
                    </PremiumCard>
                </div>

                <div className="space-y-8">
                    <PremiumCard delay={0.3} className="bg-brand-500/5 border-brand-500/10 overflow-hidden">
                        <div className="absolute top-[-20%] right-[-20%] h-32 w-32 bg-brand-500/10 blur-[40px] rounded-full"></div>
                        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-brand-400" />
                            Sécurité
                        </h2>
                        <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">Votre compte est protégé par une authentification à deux facteurs.</p>
                        <button className="w-full py-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-[10px] font-black text-brand-400 hover:bg-brand-500/20 transition-all uppercase tracking-widest">
                            Gérer la sécurité
                        </button>
                    </PremiumCard>

                    <PremiumCard delay={0.4}>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <CreditCard className="h-3 w-3" /> FACTURATION
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Plan Shopora Pro</p>
                                    <p className="text-[10px] text-slate-600 font-bold uppercase">29€ / mois</p>
                                </div>
                                <button className="text-[10px] font-black text-brand-500 hover:underline">MODIFIER</button>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium italic text-center">Prochaine facture le 01 Avr 2024</p>
                        </div>
                    </PremiumCard>
                </div>
            </div>
        </div>
    );
}
