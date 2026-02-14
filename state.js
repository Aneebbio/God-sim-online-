export let meta = JSON.parse(localStorage.getItem('god_sim_v9')) || {
    isotopes: 0,
    levels: { fishing: 0, mining: 0, agri: 0, max_year: 0 },
    addons: [],
    addonCount: 0
};

export const saveMeta = () => localStorage.setItem('god_sim_v9', JSON.stringify(meta));

export const ERAS = [
    { name: "Pangea", url: "https://images.unsplash.com/photo-1581084324492-c8076f130f86?auto=format&fit=crop&w=500" },
    { name: "Ice Age", url: "https://images.unsplash.com/photo-1516934023933-90d2e5f564f8?auto=format&fit=crop&w=500" },
    { name: "Modernity", url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=500" },
    { name: "Solar Flare", url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=500" },
    { name: "Dead Earth", url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=500" }
];
