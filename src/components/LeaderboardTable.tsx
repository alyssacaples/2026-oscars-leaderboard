"use client";

import { PlayerScore } from "@/lib/leaderboard";
import { ChevronDown, Trophy, Medal } from "lucide-react";
import { useState } from "react";
import CategoryBreakdown from "./CategoryBreakdown";

export default function LeaderboardTable({ scores }: { scores: PlayerScore[] }) {
    const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

    if (!scores || scores.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto p-12 text-center glass-panel rounded-2xl">
                <p className="text-gold-200/60 font-medium">No picks found yet.</p>
            </div>
        );
    }

    const toggleExpand = (playerName: string) => {
        setExpandedPlayer(expandedPlayer === playerName ? null : playerName);
    };

    const getRankIcon = (rank?: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]" />;
            case 3:
                return <Medal className="w-6 h-6 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]" />;
            default:
                return <span className="text-gold-500/50 font-serif text-lg font-bold">{rank}</span>;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-0 flex flex-col gap-12 pb-20">

            {/* Top Players Section */}
            <div className="flex flex-col gap-4">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-widest text-gold-500/70 pb-2 border-b border-gold-900/40">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-6">Player</div>
                    <div className="col-span-3 text-center">Score</div>
                    <div className="col-span-2"></div>
                </div>

                {/* Roster List (Top 5) */}
                <div className="flex flex-col gap-3">
                    {scores.slice(0, 5).map((player) => {
                        const isExpanded = expandedPlayer === player.name;
                        const isTop3 = (player.rank || 4) <= 3;

                        return (
                            <div
                                key={player.name}
                                className={`
                  group glass-panel rounded-xl overflow-hidden transition-all duration-300
                  ${isExpanded ? 'border-gold-400/40 shadow-[0_0_15px_rgba(214,176,84,0.1)]' : 'hover:border-gold-500/30'}
                  ${player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/20' : ''}
                `}
                            >
                                {/* Main Row */}
                                <div
                                    className="grid grid-cols-12 gap-4 p-4 md:px-6 items-center cursor-pointer select-none"
                                    onClick={() => toggleExpand(player.name)}
                                >

                                    {/* Rank */}
                                    <div className="col-span-2 md:col-span-1 flex justify-center items-center">
                                        <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full
                      ${isTop3 ? 'bg-oscar-red-950/50' : ''}
                    `}>
                                            {getRankIcon(player.rank)}
                                        </div>
                                    </div>

                                    {/* Name & Progress Bar */}
                                    <div className="col-span-7 md:col-span-6 flex flex-col gap-2">
                                        <span className={`text-lg font-medium tracking-wide ${player.rank === 1 ? 'text-gold-200 font-bold' : 'text-gold-100/90'}`}>
                                            {player.name}
                                        </span>

                                        {/* Miniature progress bar comparing correct to total announced */}
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 flex-grow bg-black/40 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gold-400 rounded-full"
                                                    style={{ width: player.totalCategories === 0 ? '0%' : `${(player.score / player.totalCategories) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="col-span-3 text-right md:text-center flex flex-col justify-center">
                                        <span className="text-2xl md:text-3xl font-serif text-glow font-bold text-gold-300">
                                            {player.score}
                                        </span>
                                        <span className="text-[10px] text-gold-500 uppercase tracking-widest mt-1">
                                            Correct
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <div className="hidden md:flex col-span-2 justify-end items-center text-gold-600">
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '-rotate-180 text-gold-400' : 'group-hover:text-gold-300'}`} />
                                    </div>
                                </div>

                                {/* Expandable Breakdown Drawer */}
                                <div className={`
                  grid transition-[grid-template-rows] duration-300 ease-in-out
                  ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}>
                                    <div className="overflow-hidden">
                                        <div className="p-0 border-t border-gold-900/30">
                                            <CategoryBreakdown player={player} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* All Participants Section */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-4 px-2">
                    <h3 className="text-xl font-serif text-gold-300 font-medium">All Participants</h3>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-gold-900/50 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scores.map((player) => (
                        <div key={`all-${player.name}`} className="glass-panel rounded-xl overflow-hidden border-gold-900/30">
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => toggleExpand(`all-${player.name}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-gold-500/70 font-mono text-xs w-4">{player.rank}</span>
                                    <span className="font-medium text-gold-100">{player.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gold-300 font-serif">{player.score} pts</span>
                                    <ChevronDown className={`w-4 h-4 text-gold-600 transition-transform ${expandedPlayer === `all-${player.name}` ? '-rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Expandable Breakdown */}
                            <div className={`
                        grid transition-[grid-template-rows] duration-300 ease-in-out
                        ${expandedPlayer === `all-${player.name}` ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                    `}>
                                <div className="overflow-hidden">
                                    <div className="border-t border-gold-900/30">
                                        <CategoryBreakdown player={player} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
