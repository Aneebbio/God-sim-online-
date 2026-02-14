export const events = [
    // --- EARLY GAME ---
    {
        text: "A monolith appears. It hums with energy.",
        reqYear: 0,
        a: { txt: "Touch it", faith: 10, pop: 5, msg: "Your people feel energized." },
        b: { txt: "Destroy it", isotopes: 1, pop: 0, msg: "You found a raw Isotope inside!" }
    },
    {
        text: "The Red Swarm is seen on the horizon.",
        reqYear: 10,
        a: { txt: "Prepare Defenses", faith: -20, pop: 0, msg: "The people are ready." },
        b: { txt: "Ignore", faith: 0, pop: -10, msg: "They picked off the stragglers." }
    },

    // --- MID GAME ---
    {
        text: "A prophet claims to know the future.",
        reqYear: 40,
        a: { txt: "Bless Him", faith: 50, pop: 10, msg: "A golden age of belief." },
        b: { txt: "Smite Him", faith: 10, pop: -5, msg: "There is only one God." }
    },
    {
        text: "Your civilization discovers nuclear power.",
        reqYear: 70,
        a: { txt: "Build Bombs", pop: -20, isotopes: 5, msg: "Dangerous, but the Isotopes are valuable." },
        b: { txt: "Build Plants", pop: 50, faith: -20, msg: "Unlimited energy!" }
    }
];
