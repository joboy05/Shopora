import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../lib/api';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await authService.login(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de la connexion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-black rounded-lg flex items-center justify-center text-white font-black italic text-2xl shadow-xl rotate-3">S</div>
                    <h1 className="mt-6 text-3xl font-black text-black tracking-tighter uppercase italic">SHOPORA 2.0</h1>
                    <p className="mt-2 text-sm text-slate-500 font-medium">L'avenir du commerce commence ici.</p>
                    
                    {/* Admin Credentials Hint */}
                    <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl inline-flex flex-col items-center">
                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Espace Démo / Super Admin</p>
                        <div className="flex gap-4 text-[10px] font-bold text-slate-600 italic">
                            <span>Email: <span className="text-black not-italic">admin@gmail.com</span></span>
                            <span>Mdp: <span className="text-black not-italic">admin123</span></span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 ring-1 ring-slate-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold uppercase tracking-tight flex items-center gap-2 border border-red-100">
                                <ShieldCheck className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Votre adresse email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all font-medium text-sm"
                                    placeholder="jean@shopora.fr"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 tracking-widest">Mot de passe</label>
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-black focus:ring-black border-slate-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-slate-400 uppercase tracking-tighter">Se souvenir de moi</label>
                            </div>
                            <div className="text-xs">
                                <a href="#" className="font-bold text-slate-600 hover:text-black uppercase tracking-tighter decoration-slate-300 underline underline-offset-4">Oublié ?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 group"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                <>
                                    SE CONNECTER
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                            Pas encore de boutique ?{' '}
                            <Link to="/register" className="text-black underline decoration-slate-200 underline-offset-4 hover:decoration-black transition-all">Créer un compte</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
