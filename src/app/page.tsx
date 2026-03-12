import Hero from "@/components/Hero";
import LeaderboardTable from "@/components/LeaderboardTable";
import AutoRefresh from "@/components/AutoRefresh";
import { fetchPicks, fetchWinners } from "@/lib/google-sheets";
import { calculateLeaderboard } from "@/lib/leaderboard";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1laUmrg0B40zXrNriqToHZ91cQx44UvMn4bU78VjLSqo";

export default async function Home() {
    let scores: import('@/lib/leaderboard').PlayerScore[] = [];

    try {
        const [picks, winners] = await Promise.all([
            fetchPicks(SHEET_ID),
            fetchWinners(SHEET_ID)
        ]);
        scores = calculateLeaderboard(picks, winners);
    } catch (e) {
        console.error("Failed to load leaderboard data", e);
    }

    return (
        <main className="min-h-screen flex flex-col items-center">
            <AutoRefresh intervalMs={60000} />
            <Hero />
            <LeaderboardTable scores={scores} />

            {/* Footer */}
            <div className="w-full text-center py-12 text-gold-500/40 text-sm font-light mt-auto">
                <p>Live scoring updates every minute.</p>
            </div>
        </main>
    );
}
