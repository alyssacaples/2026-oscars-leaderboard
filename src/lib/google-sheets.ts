import Papa from 'papaparse';

// We'll read from a publicly shared Google Sheet CSV export link
// Format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}

export interface PlayerPick {
    timestamp: string;
    name: string;
    [category: string]: string; // E.g., "Best Picture": "Oppenheimer"
}

export interface WinnerData {
    category: string;
    winner: string;
}

export async function fetchSheetData(sheetId: string, sheetName: string): Promise<any[]> {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 60 } // Revalidate every 60 seconds (1 minute polling)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.statusText}`);
        }

        const csvText = await response.text();

        // Parse CSV to JSON
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        return [];
    }
}

// Specific fetchers
export async function fetchPicks(sheetId: string): Promise<PlayerPick[]> {
    // Assuming the form responses go to "Form Responses 1"
    const rawPicks = await fetchSheetData(sheetId, "Form Responses 1");
    return rawPicks as PlayerPick[];
}

export async function fetchWinners(sheetId: string): Promise<WinnerData[]> {
    // Assuming a separate tab called "Winners" with columns "Category" and "Winner"
    const rawWinners = await fetchSheetData(sheetId, "Winners");
    return rawWinners.map(row => ({
        category: row['Category'] || row['category'],
        winner: row['Winner'] || row['winner']
    }));
}
