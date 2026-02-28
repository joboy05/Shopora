import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Store, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { authService } from '../lib/api';

export default function Register() {
    const [formData, setFormData] = useState({ email: '', password: '', storeName: '', accountType: 'INDIVIDUAL', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await authService.register(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || "Une erreur est survenue lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white font-black italic text-2xl shadow-xl -rotate-3">S</div>
                    <h1 className="mt-6 text-3xl font-black text-black tracking-tighter uppercase italic">REJOINDRE SHOPORA</h1>
                    <p className="mt-2 text-sm text-slate-500 font-medium">Créez votre espace de vente en quelques secondes.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 ring-1 ring-slate-200">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold uppercase tracking-tight border border-red-100">
                                {error}
                            </div>
                        )}
                        
                        <div className="bg-slate-100 p-1 rounded-xl flex mb-6">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, accountType: 'INDIVIDUAL' })}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${formData.accountType === 'INDIVIDUAL' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Particulier
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, accountType: 'COMPANY' })}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${formData.accountType === 'COMPANY' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Entreprise
                            </button>
                        </div>

                        {formData.accountType === 'COMPANY' ? (
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Nom de votre boutique</label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium text-sm"
                                        placeholder="Le Coin de Marie"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Nom d'utilisateur</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium text-sm"
                                        placeholder="marie.d"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium text-sm"
                                    placeholder="marie@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Mot de passe de sécurité</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium text-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Accès complet au dashboard
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Hébergement Storefront inclus
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 group mt-4"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                <>
                                    {formData.accountType === 'COMPANY' ? 'CRÉER MA BOUTIQUE' : 'CRÉER MON COMPTE'}
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                            Déjà membre ?{' '}
                            <Link to="/login" className="text-black underline decoration-slate-200 underline-offset-4 hover:decoration-black transition-all">Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
