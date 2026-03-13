"use client";

import Hero from "@/components/Hero";
import LeaderboardTable from "@/components/LeaderboardTable";
import ParticipantTable from "@/components/ParticipantTable";
import { fetchPicks, fetchWinners } from "@/lib/google-sheets";
import { calculateLeaderboard, PlayerScore } from "@/lib/leaderboard";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [scores, setScores] = useState<PlayerScore[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fallback or environment variable depending on client exposure
        const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "1laUmrg0B40zXrNriqToHZ91cQx44UvMn4bU78VjLSqo";

        async function loadData() {
            try {
                const [picks, winners] = await Promise.all([
                    fetchPicks(SHEET_ID),
                    fetchWinners(SHEET_ID)
                ]);
                setScores(calculateLeaderboard(picks, winners));
            } catch (e) {
                console.error("Failed to load leaderboard data", e);
            } finally {
                setLoading(false);
            }
        }

        loadData();

        // Auto-refresh every 60 seconds
        const interval = setInterval(loadData, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
                <p className="mt-4 text-gold-200/50 uppercase tracking-widest text-sm font-semibold">Loading Live Board...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center">
            <Hero />
            <LeaderboardTable scores={scores} />
            <ParticipantTable scores={scores} />

            {/* Footer */}
            <div className="w-full text-center py-12 text-gold-500/40 text-sm font-light mt-auto">
                <p>Live scoring updates every minute.</p>
            </div>
        </main>
    );
}
