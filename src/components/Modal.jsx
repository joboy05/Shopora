import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all duration-300">
            <div className={cn("bg-white rounded-xl shadow-2xl w-full animate-in fade-in zoom-in duration-200", maxWidth)}>
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="text-slate-600 dark:text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
