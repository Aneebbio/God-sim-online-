/* state.js - Game Memory */
export let meta = JSON.parse(localStorage.getItem('god_sim_v8')) || {
    isotopes: 0,
    levels: { fishing: 0, mining: 0, agri: 0, max_year: 0 },
    addons: [],
    addonCount: 0
};

export const saveMeta = () => {
    localStorage.setItem('god_sim_v8', JSON.stringify(meta));
};

export const SKILLS = [
    { id: 'fishing', name: 'Fishing', base: 5 },
    { id: 'mining', name: 'Mining', base: 8 },
    { id: 'agri', name: 'Agriculture', base: 12 },
    { id: 'max_year', name: 'Chronos', base: 20 }
];

export const ADDONS = [
    { id: 'auto_smite', name: 'Auto-Smite', desc: 'Destroys rivals every 5s.' },
    { id: 'luck_core', name: 'Luck Core', desc: 'Double Isotope drop rate.' }
];
