import { Search, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Topbar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-20 glass-card rounded-none border-x-0 border-t-0 border-b-white/5 dark:border-b-white/5 border-b-slate-200 premium-blur flex items-center justify-between px-8 sticky top-0 z-10"
        >
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 transition-colors group-hover:text-brand-400" />
                    <input
                        type="text"
                        placeholder="Rechercher partout... (⌘K)"
                        className="w-full bg-white/5 border border-black/5 dark:border-white/5 dark:border-white/5 border-slate-200 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white/10 transition-all duration-300"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 dark:border-white/5 border-slate-200 text-slate-500 hover:text-brand-500 transition-all duration-300"
                >
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button className="relative p-2.5 rounded-2xl bg-white/5 border border-black/5 dark:border-white/5 dark:border-white/5 border-slate-200 text-slate-500 hover:text-brand-500 transition-all duration-300 group">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-brand-500 rounded-full ring-2 ring-background group-hover:animate-ping"></span>
                </button>

                <div className="h-8 w-[1px] bg-white/5"></div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-none">Mon Espace</p>
                        <p className="text-[10px] font-bold text-brand-500 tracking-wider uppercase mt-1">Administrateur</p>
                    </div>
                    <div className="flex items-center gap-2 group/user cursor-pointer">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-brand-400/20 to-brand-500/20 border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                            <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-black text-white">
                                AD
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300"
                            title="Se déconnecter"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
