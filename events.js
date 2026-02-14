/* events.js - Satellite Feed Anomalies */
export const events = [
    { 
        id: "void_leak", 
        danger: true,
        text: "CRITICAL: SIGNAL DEGRADATION. Core sync required!", 
        impact: { pop: -50 },
        style: "color: #ff4757; border-left: 4px solid #ff4757; padding-left: 10px;" 
    },
    { 
        id: "solar_wind", 
        text: "SOLAR WIND: Satellite arrays overcharged. Faith +100.", 
        impact: { faith: 100 },
        style: "color: #f1c40f; border-left: 4px solid #f1c40f; padding-left: 10px;" 
    },
    { 
        id: "meteor_strike", 
        text: "METEOR IMPACT: New isotope veins exposed.", 
        impact: { isotopes: 5 },
        style: "color: #a55eea; border-left: 4px solid #a55eea; padding-left: 10px;" 
    },
    { 
        id: "biological_bloom", 
        text: "BIOLOGICAL BLOOM: Population growth accelerated.", 
        impact: { pop: 150 },
        style: "color: #2ecc71; border-left: 4px solid #2ecc71; padding-left: 10px;" 
    },
    { 
        id: "deep_scan", 
        text: "DEEP SCAN: Found remnants of a previous cycle.", 
        impact: { isotopes: 2, faith: 20 },
        style: "color: #00d2d3; border-left: 4px solid #00d2d3; padding-left: 10px;" 
    }
];
