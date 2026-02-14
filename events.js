/* events.js - The Story Database */

export const events = [
    // --- EARLY ERA EVENTS ---
    {
        text: "A strange glowing monolith appears in the valley.",
        reqYear: 0,
        a: { txt: "Worship it", faith: 30, pop: 0, hp: -5, msg: "The object radiates power." },
        b: { txt: "Study it", faith: 0, pop: 5, hp: 0, msg: "Knowledge gained." }
    },
    {
        text: "A neighboring tribe asks for food.",
        reqYear: 0,
        a: { txt: "Share Food", faith: 10, pop: -5, hp: 5, msg: "They joined your tribe." },
        b: { txt: "Drive them away", faith: -5, pop: 0, hp: -5, msg: "Conflict breeds strength." }
    },
    {
        text: "A plague of locusts descends!",
        reqYear: 0,
        a: { txt: "Pray for wind", faith: -10, pop: 0, hp: 10, msg: " The wind cleared the sky." },
        b: { txt: "Eat the locusts", faith: 0, pop: 10, hp: -10, msg: "Gross, but nutritious." }
    },

    // --- MIDDLE ERA EVENTS (After Year 20) ---
    {
        text: "Your people want to build a Great Tower.",
        reqYear: 20,
        a: { txt: "Build it", faith: 50, pop: -10, hp: -5, msg: "A monument to your glory." },
        b: { txt: "Forbidden!", faith: -20, pop: 5, hp: 5, msg: "Resources saved." }
    },
    {
        text: "Gold is discovered in the river.",
        reqYear: 20,
        a: { txt: "Make Idols", faith: 40, pop: 0, hp: 0, msg: "Shiny statues everywhere." },
        b: { txt: "Trade Route", faith: 0, pop: 20, hp: -5, msg: "Wealth brings outsiders." }
    },

    // --- LATE ERA EVENTS (After Year 50) ---
    {
        text: "Philosophers question your existence.",
        reqYear: 50,
        a: { txt: "Smite them", faith: 20, pop: -20, hp: -10, msg: "Fear restores order." },
        b: { txt: "Perform Miracle", faith: -50, pop: 10, hp: 10, msg: "Belief is restored." }
    },
    {
        text: "Industrial Revolution begins.",
        reqYear: 50,
        a: { txt: "Embrace Machines", faith: -30, pop: 100, hp: -30, msg: "Pollution rises, but so does life." },
        b: { txt: "Stay Natural", faith: 50, pop: 10, hp: 10, msg: "Nature is preserved." }
    }
];
