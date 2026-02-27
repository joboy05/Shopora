import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { CommandPalette } from './CommandPalette';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumBackground } from './PremiumBackground';

export const Layout = () => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen bg-transparent text-foreground selection:bg-brand-500/30">
            <PremiumBackground />
            <CommandPalette />

            <div className="flex h-screen overflow-hidden">
                <Sidebar />

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Topbar />

                    <main className="flex-1 p-6 lg:p-10 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
                                    staggerChildren: 0.1
                                }}
                                className="w-full h-full"
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};
