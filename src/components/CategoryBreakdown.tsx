"use client";

import { PlayerScore } from "@/lib/leaderboard";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function CategoryBreakdown({ player }: { player: PlayerScore }) {

    // Sort helper assuming we might want to group or order them later
    const renderItem = (title: string, pick: string, status: 'correct' | 'incorrect' | 'pending', actualWinner?: string) => {

        let Icon = Clock;
        let iconClass = "text-gold-200/50";
        let bgClass = "bg-white/5";
        let borderClass = "border-transparent";

        if (status === 'correct') {
            Icon = CheckCircle2;
            iconClass = "text-emerald-400";
            bgClass = "bg-emerald-900/20";
            borderClass = "border-emerald-500/20";
        } else if (status === 'incorrect') {
            Icon = XCircle;
            iconClass = "text-oscar-red-400";
            bgClass = "bg-oscar-red-900/30";
            borderClass = "border-oscar-red-500/20";
        }

        return (
            <div key={title} className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass} ${borderClass}`}>
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconClass}`} />
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 mb-1">
                        {title}
                    </span>
                    <span className={`text-sm ${status === 'correct' ? 'text-emerald-100 font-medium' : 'text-gold-100'}`}>
                        {pick}
                    </span>
                    {status === 'incorrect' && actualWinner && (
                        <span className="text-xs text-oscar-red-300 flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 rounded-full bg-oscar-red-400/50" />
                            Actual: {actualWinner}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-black/20 p-4 md:p-6 w-full">

            {/* Summary Stats Row */}
            <div className="flex gap-6 mb-6 px-2 text-sm text-gold-200/70 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {player.correctPicks.length} Correct
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-oscar-red-400" />
                    {player.incorrectPicks.length} Incorrect
                </div>
                <div className="flex items-center gap-2 text-gold-200/40">
                    <Clock className="w-3.5 h-3.5" />
                    {player.pendingPicks.length} Pending
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {player.correctPicks.map(p => renderItem(p.category, p.pick, 'correct'))}
                {player.incorrectPicks.map(p => renderItem(p.category, p.pick, 'incorrect', p.actualWinner))}
                {player.pendingPicks.map(p => renderItem(p.category, p.pick, 'pending'))}
            </div>

        </div>
    );
}
