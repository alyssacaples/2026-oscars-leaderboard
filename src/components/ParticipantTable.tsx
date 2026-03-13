"use client";

import { PlayerScore } from "@/lib/leaderboard";
import { ChevronDown, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function ParticipantTable({ scores }: { scores: PlayerScore[] }) {
    const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

    const toggleExpand = (playerName: string) => {
        setExpandedPlayer(expandedPlayer === playerName ? null : playerName);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-0 flex flex-col gap-6 mt-8 pb-20">
            <div className="flex items-center gap-4 px-2">
                <h3 className="text-xl font-serif text-gold-300 font-medium">All Participants</h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-gold-900/50 to-transparent" />
            </div>

            <div className="flex flex-col gap-3">
                {scores.map((player) => {
                    const isExpanded = expandedPlayer === player.name;
                    return (
                        <div key={`all-${player.name}`} className="glass-panel rounded-xl overflow-hidden border-gold-900/30">
                            <div
                                className="p-3 md:p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => toggleExpand(player.name)}
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <span className="text-gold-500/70 font-mono text-xs w-4 md:w-6 text-right">{player.rank}</span>
                                    <span className="font-medium text-gold-100">{player.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gold-300 font-serif whitespace-nowrap">{player.score} pts</span>
                                    <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform ${isExpanded ? '-rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Expandable Breakdown with Thin Rows */}
                            <div className={`
                                grid transition-[grid-template-rows] duration-300 ease-in-out
                                ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                            `}>
                                <div className="overflow-hidden bg-black/40">
                                    {/* Summary Stats Row */}
                                    <div className="flex gap-6 px-4 md:px-6 py-3 text-sm text-gold-200/70 border-t border-b border-white/5">
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

                                    <div className="flex flex-col py-2 px-2 md:px-4">
                                        {[
                                            ...player.correctPicks.map(p => ({ ...p, status: 'correct' as const })),
                                            ...player.incorrectPicks.map(p => ({ ...p, status: 'incorrect' as const })),
                                            ...player.pendingPicks.map(p => ({ ...p, status: 'pending' as const }))
                                        ].map((pick, i) => {
                                            let Icon = Clock;
                                            let iconClass = "text-gold-200/50";
                                            let statusColor = "text-gold-100/70";
                                            let bgClass = "hover:bg-white/5";

                                            if (pick.status === 'correct') {
                                                Icon = CheckCircle2;
                                                iconClass = "text-emerald-400";
                                                statusColor = "text-emerald-100";
                                                bgClass = "hover:bg-emerald-900/20";
                                            } else if (pick.status === 'incorrect') {
                                                Icon = XCircle;
                                                iconClass = "text-oscar-red-400";
                                                statusColor = "text-oscar-red-200";
                                                bgClass = "hover:bg-oscar-red-900/20";
                                            }

                                            return (
                                                <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between py-2 px-3 rounded-md transition-colors gap-1 sm:gap-4 ${bgClass}`}>
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <Icon className={`w-4 h-4 shrink-0 ${iconClass}`} />
                                                        <span className="text-xs md:text-sm uppercase tracking-wider font-semibold text-gold-400">
                                                            {pick.category}
                                                        </span>
                                                    </div>
                                                    <div className={`text-sm sm:text-right ${pick.status === 'correct' ? 'font-medium' : ''} ${statusColor}`}>
                                                        {pick.pick}
                                                        {pick.status === 'incorrect' && 'actualWinner' in pick && pick.actualWinner && (
                                                            <span className="text-xs text-oscar-red-400/80 ml-2 whitespace-nowrap">
                                                                (Actual: {pick.actualWinner})
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
