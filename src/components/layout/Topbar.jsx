import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Topbar() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex flex-1 items-center">
                <div className="relative w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        placeholder="Rechercher... (Ctrl+K)"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-slate-600">
                    <Bell className="h-5 w-5" />
                </button>
                <div className="h-8 w-px bg-slate-200" />
                <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 uppercase text-slate-600 border border-slate-200">
                        JD
                    </div>
                    <span className="hidden md:block">Jolidon</span>
                </button>
            </div>
        </header>
    );
}
