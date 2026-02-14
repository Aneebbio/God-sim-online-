/* events.js - Random Encounters */
export const events = [
    { 
        id: "void_leak", 
        danger: true,
        text: "CRITICAL: Void Leak! Stabilize the core!", 
        impact: { pop: -60, tilesToEmpty: 3 },
        style: "border-left: 4px solid #a55eea" 
    },
    { 
        id: "harvest_moon", 
        text: "HARVEST MOON: Global growth accelerated.", 
        impact: { moon: "harvest", pop: 25 },
        style: "border-left: 4px solid #f1c40f" 
    },
    { 
        id: "blue_moon", 
        text: "BLUE MOON: Rare isotopes surfaced.", 
        impact: { moon: "blue", isotopes: 2 },
        style: "border-left: 4px solid #341f97" 
    }
];
