import { PlayerPick, WinnerData } from './google-sheets';

export interface PlayerScore {
    name: string;
    score: number;
    totalCategories: number;
    correctPicks: { category: string; pick: string }[];
    incorrectPicks: { category: string; pick: string; actualWinner: string }[];
    pendingPicks: { category: string; pick: string }[];
    rank?: number;
}

export function calculateLeaderboard(picks: PlayerPick[], winners: WinnerData[]): PlayerScore[] {
    // Convert winners array to a map for easy lookup
    const winnersMap = new Map<string, string>();
    winners.forEach(w => {
        if (w.category && w.winner) {
            // Normalize keys
            winnersMap.set(w.category.trim().toLowerCase(), w.winner.trim().toLowerCase());
        }
    });

    const announcedCategories = Array.from(winnersMap.keys());

    const scores: PlayerScore[] = picks.map(playerRow => {
        let score = 0;
        const correctPicks: { category: string; pick: string }[] = [];
        const incorrectPicks: { category: string; pick: string; actualWinner: string }[] = [];
        const pendingPicks: { category: string; pick: string }[] = [];

        // Assuming the "name" column might be labeled differently in the form
        const playerName = playerRow['Name?'] || playerRow['Name'] || playerRow['Email Address'] || "Unknown Player";

        // Regex to extract the base category name and the points
        // Example: "Best Picture [1st Choice (100 pts)]" -> Match 1: "Best Picture", Match 2: "100"
        const categoryRegex = /^(.*)\s*\[.*\((\d+)\s*pts\).*\]$/i;

        // Iterate through all columns in their response
        Object.keys(playerRow).forEach(columnName => {
            // Skip metadata columns
            if (['Timestamp', 'Name?', 'Name', 'Email Address', 'Score', 'Tie-Breaker: How many minutes will the Oscar\'s be?'].includes(columnName)) return;

            const pick = playerRow[columnName];
            if (!pick) return; // Skip empty picks

            const match = columnName.match(categoryRegex);

            if (!match) {
                // Fallback for categories without points in the name
                const cleanCategory = columnName.trim();
                const actualWinner = winnersMap.get(cleanCategory.toLowerCase());

                if (actualWinner) {
                    if (pick.trim().toLowerCase() === actualWinner) {
                        score += 1; // Default 1 point
                        correctPicks.push({ category: cleanCategory, pick: pick.trim() });
                    } else {
                        incorrectPicks.push({ category: cleanCategory, pick: pick.trim(), actualWinner: winners.find(w => w.category.trim().toLowerCase() === cleanCategory.toLowerCase())?.winner || "Unknown" });
                    }
                } else {
                    pendingPicks.push({ category: cleanCategory, pick: pick.trim() });
                }
                return;
            }

            const baseCategory = match[1].trim();
            const points = parseInt(match[2], 10);
            const cleanPick = pick.trim();

            const actualWinnerKey = Array.from(winnersMap.keys()).find(k => baseCategory.toLowerCase().includes(k) || k.includes(baseCategory.toLowerCase()));
            let actualWinnerName = actualWinnerKey ? winnersMap.get(actualWinnerKey) : null;

            // --- Tie logic for Live Action Short Film ---
            const isTieCategory = baseCategory.toLowerCase().includes('live action short film');
            const isTieWinnerPick = cleanPick.toLowerCase() === 'two people exchanging saliva' || cleanPick.toLowerCase() === 'the singers';
            const isFirstOrSecondChoice = columnName.includes('1st Choice') || columnName.includes('2nd Choice');

            if (isTieCategory && isTieWinnerPick) {
                if (isFirstOrSecondChoice) {
                    score += 100;
                    correctPicks.push({ category: `${baseCategory} (100pts - Tie Bonus)`, pick: cleanPick });
                } else {
                    score += points;
                    correctPicks.push({ category: `${baseCategory} (${points}pts)`, pick: cleanPick });
                }
                return; // Pick graded, move to next column
            }

            if (isTieCategory && !actualWinnerName) {
                // If the Winners sheet isn't updated yet, still count the category as announced
                actualWinnerName = "Two People Exchanging Saliva & The Singers";
            }
            // ---------------------------------------------

            if (actualWinnerName) {
                // Category has been announced
                // We need to check if ANY of their choices for this base category matched.
                // The way the data is structured, each row has a column for 1st, 2nd, and 3rd choice.
                if (cleanPick.toLowerCase() === actualWinnerName.toLowerCase()) {
                    score += points;
                    correctPicks.push({ category: `${baseCategory} (${points}pts)`, pick: cleanPick });
                } else {
                    // Only add to incorrect if it's the 1st choice to avoid cluttering the UI with 3 incorrects per category
                    if (columnName.includes('1st Choice')) {
                        const originalWinnerCase = winners.find(w => w.category.trim().toLowerCase() === actualWinnerKey)?.winner || actualWinnerName;
                        incorrectPicks.push({ category: baseCategory, pick: cleanPick, actualWinner: originalWinnerCase });
                    }
                }
            } else {
                // Category not yet announced
                // Only add 1st choice to pending to avoid cluttering
                if (columnName.includes('1st Choice')) {
                    pendingPicks.push({ category: baseCategory, pick: cleanPick });
                }
            }
        });

        return {
            name: playerName,
            score,
            totalCategories: announcedCategories.length,
            correctPicks,
            incorrectPicks,
            pendingPicks
        };
    });

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // Assign ranks (handling ties)
    let currentRank = 1;
    let previousScore = -1;
    let rankSkip = 0;

    scores.forEach((player, index) => {
        if (player.score !== previousScore) {
            currentRank = index + 1;
            rankSkip = 0;
        } else {
            rankSkip++;
        }
        player.rank = currentRank;
        previousScore = player.score;
    });

    return scores;
}
