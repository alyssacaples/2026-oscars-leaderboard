import { fetchPicks, fetchWinners } from './src/lib/google-sheets';
import { calculateLeaderboard } from './src/lib/leaderboard';

const SHEET_ID = '1laUmrg0B40zXrNriqToHZ91cQx44UvMn4bU78VjLSqo';

async function verify() {
    console.log('Fetching picks...');
    const picks = await fetchPicks(SHEET_ID);

    console.log('Fetching winners...');
    const winners = await fetchWinners(SHEET_ID);

    console.log('\nPicks found:', picks.length);
    console.log('Winners found:', winners.length);

    if (picks.length > 0) {
        console.log('Injecting mock winners to test scoring...');
        const player1 = picks[0];

        // Set Best Picture to their 1st choice (100 pts)
        const bpRow = winners.find(w => w.category === 'Best Picture');
        if (bpRow) bpRow.winner = player1['Best Picture [1st Choice (100 pts)]'];

        // Set Directing to their 2nd choice (50 pts)
        const dirRow = winners.find(w => w.category === 'Directing');
        if (dirRow) dirRow.winner = player1['Directing [2nd Choice (50 pts)]'];

        // Set Actor in a Leading Role to an INCORRECT choice (0 pts)
        const actorRow = winners.find(w => w.category === 'Actor in a Leading Role');
        if (actorRow) actorRow.winner = 'Someone Else Entirely';
    }

    console.log('\nCalculating leaderboard...');
    const scores = calculateLeaderboard(picks, winners);

    console.log(JSON.stringify(scores, null, 2));
}

verify().catch(console.error);
