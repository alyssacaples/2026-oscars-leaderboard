function createOscarGridForm() {
    var form = FormApp.create('2026 Oscars Prediction Ballot');
    form.setDescription('Pick your 1st Choice (100 pts), 2nd Choice (50 pts), and 3rd Choice (25 pts) for each category. Do not pick the same nominee twice in one category!');

    var categories = [
        { title: "Best Picture", nominees: ["Bugonia", "F1", "Frankenstein", "Hamnet", "Marty Supreme", "One Battle after Another", "The Secret Agent", "Sentimental Value", "Sinners", "Train Dreams"] },
        { title: "Directing", nominees: ["Hamnet (Chloé Zhao)", "Marty Supreme (Josh Safdie)", "One Battle after Another (Paul Thomas Anderson)", "Sentimental Value (Joachim Trier)", "Sinners (Ryan Coogler)"] },
        { title: "Actor in a Leading Role", nominees: ["Timothée Chalamet", "Leonardo DiCaprio", "Ethan Hawke", "Michael B. Jordan", "Wagner Moura"] },
        { title: "Actress in a Leading Role", nominees: ["Jessie Buckley", "Rose Byrne", "Kate Hudson", "Renate Reinsve", "Emma Stone"] },
        { title: "Actor in a Supporting Role", nominees: ["Benicio Del Toro", "Jacob Elordi", "Delroy Lindo", "Sean Penn", "Stellan Skarsgård"] },
        { title: "Actress in a Supporting Role", nominees: ["Elle Fanning", "Inga Ibsdotter Lilleaas", "Amy Madigan", "Wunmi Mosaku", "Teyana Taylor"] },
        { title: "Writing (Original Screenplay)", nominees: ["Blue Moon", "It Was Just an Accident", "Marty Supreme", "Sentimental Value", "Sinners"] },
        { title: "Writing (Adapted Screenplay)", nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle after Another", "Train Dreams"] },
        { title: "Animated Feature Film", nominees: ["Arco", "Elio", "KPop Demon Hunters", "Little Amélie or the Character of Rain", "Zootopia 2"] },
        { title: "Animated Short Film", nominees: ["Butterfly", "Forevergreen", "The Girl Who Cried Pearls", "Retirement Plan", "The Three Sisters"] },
        { title: "Casting (NEW)", nominees: ["Hamnet", "Marty Supreme", "One Battle after Another", "The Secret Agent", "Sinners"] },
        { title: "Cinematography", nominees: ["Frankenstein", "Marty Supreme", "One Battle after Another", "Sinners", "Train Dreams"] },
        { title: "Costume Design", nominees: ["Avatar: Fire and Ash", "Frankenstein", "Hamnet", "Marty Supreme", "Sinners"] },
        { title: "Documentary Feature Film", nominees: ["The Alabama Solution", "Come See Me in the Good Light", "Cutting through Rocks", "Mr. Nobody against Putin", "The Perfect Neighbor"] },
        { title: "Documentary Short Film", nominees: ["All the Empty Rooms", "Armed Only with a Camera", "Children No More", "The Devil Is Busy", "Perfectly a Strangeness"] },
        { title: "Film Editing", nominees: ["F1", "Marty Supreme", "One Battle after Another", "Sentimental Value", "Sinners"] },
        { title: "International Feature Film", nominees: ["Brazil", "France", "Norway", "Spain", "Tunisia"] },
        { title: "Live Action Short Film", nominees: ["Butcher's Stain", "A Friend of Dorothy", "Jane Austen's Period Drama", "The Singers", "Two People Exchanging Saliva"] },
        { title: "Makeup and Hairstyling", nominees: ["Frankenstein", "Kokuho", "Sinners", "The Smashing Machine", "The Ugly Stepsister"] },
        { title: "Music (Original Score)", nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle after Another", "Sinners"] },
        { title: "Music (Original Song)", nominees: ["Dear Me", "Golden", "I Lied To You", "Sweet Dreams Of Joy", "Train Dreams"] },
        { title: "Production Design", nominees: ["Frankenstein", "Hamnet", "Marty Supreme", "One Battle after Another", "Sinners"] },
        { title: "Sound", nominees: ["F1", "Frankenstein", "One Battle after Another", "Sinners", "Sirāt"] },
        { title: "Visual Effects", nominees: ["Avatar: Fire and Ash", "F1", "Jurassic World Rebirth", "The Lost Bus", "Sinners"] }
    ];

    categories.forEach(function (cat) {
        var gridItem = form.addGridItem();
        gridItem.setTitle(cat.title)
            .setRows(["1st Choice (100 pts)", "2nd Choice (50 pts)", "3rd Choice (25 pts)"])
            .setColumns(cat.nominees)
            .setRequired(true); // This forces them to pick an answer for 1st, 2nd, and 3rd.
    });
}