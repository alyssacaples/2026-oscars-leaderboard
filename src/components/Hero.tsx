"use client";

import { Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative overflow-hidden w-full py-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center">

            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold-400/10 rounded-full blur-[2px] opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-300/20 rounded-full blur-[1px] opacity-40" />

            {/* Live Status Pill */}
            {mounted && (
                <div className="absolute top-8 right-8 glass-panel rounded-full px-4 py-1.5 flex items-center justify-center gap-2 border-oscar-red-500/30">
                    <div className="w-2.5 h-2.5 bg-oscar-red-400 rounded-full live-indicator" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-gold-200">
                        Live Updates
                    </span>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="p-4 bg-gold-400/10 rounded-full backdrop-blur-sm border border-gold-400/20 shadow-[0_0_30px_rgba(214,176,84,0.15)]">
                    <Award className="w-12 h-12 text-gold-300" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-gold-200 tracking-[0.2em] text-sm md:text-base uppercase font-medium">
                        The 98th Annual
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-glow mb-4 text-balance">
                        Academy Awards
                    </h1>
                    <p className="text-oscar-red-100/70 max-w-lg mx-auto text-lg md:text-xl font-light">
                        Live Oscar Pool Leaderboard
                    </p>
                    <p className="text-oscar-red-100/70 max-w-lg mx-auto text-lg md:text-xl font-light">
                        The Oscars start at 4 pm PDT / 7 pm EDT.
                    </p>
                </div>

                {/* Star Separator */}
                <div className="flex items-center gap-3 mt-8 opacity-60">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
                    <span className="text-gold-400 text-sm">✦</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
                </div>
            </div>
        </div>
    );
}
