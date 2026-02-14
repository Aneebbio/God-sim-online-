export let meta = JSON.parse(localStorage.getItem('god_core_v1_9')) || {
    isotopes: 0,
    levels: { life: 0, tech: 0, core: 0, time: 0 },
    addons: [],
    addonCount: 0
};
export const saveMeta = () => localStorage.setItem('god_core_v1_9', JSON.stringify(meta));

export const ERAS = [
    { name: "Archean Earth", url: "https://images.unsplash.com/photo-1464802686167-b939a67e0621?w=600" },
    { name: "Pangea Breakup", url: "https://images.unsplash.com/photo-1581084324492-c8076f130f86?w=600" },
    { name: "Ice Age Peak", url: "https://images.unsplash.com/photo-1516934023933-90d2e5f564f8?w=600" },
    { name: "The Anthropocene", url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600" }
];

export const SKILL_TREE = {
    Biological: { id: 'life', name: 'Rapid Mitosis', cost: 10, icon: '🧬' },
    Mechanical: { id: 'tech', name: 'AI Uplink', cost: 15, icon: '📡' },
    Geological: { id: 'core', name: 'Thermal Tap', cost: 20, icon: '🌋' },
    Temporal: { id: 'time', name: 'Chrono Loop', cost: 25, icon: '⌛' }
};

export const ADDONS = [
    { id: 'auto_smite', name: 'Orbital Laser', desc: 'Auto-purges fungus every 4s.' },
    { id: 'luck_core', name: 'Resource Probe', desc: 'Double Isotopes from events.' },
    { id: 'faith_well', name: 'Faith Well', desc: 'Start runs with 120 Faith.' }
];
