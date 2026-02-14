import { meta, saveMeta, SKILL_TREE, ADDONS, ERAS } from './state.js';

let state = { active: false, year: 0, maxYear: 30, pop: 10, faith: 0, chunk: 0, chunks: [] };

window.startGame = () => {
    state.active = true; state.year = 0; state.pop = 10; state.chunk = 0;
    state.faith = meta.addons.includes('faith_well') ? 120 : 20;
    state.maxYear = 30 + (meta.levels.time * 10);
    state.chunks = Array.from({length: 4}, () => Array(9).fill(0));
    state.chunks[0][4] = 1; 
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loop();
};

window.buySkill = (id) => {
    const s = Object.values(SKILL_TREE).find(v => v.id === id);
    const cost = s.cost * (meta.levels[id] + 1);
    if(meta.isotopes >= cost) { meta.isotopes -= cost; meta.levels[id]++; saveMeta(); updateMenuUI(); }
};

window.buyAddon = (id) => {
    const cost = 100 * Math.pow(10, meta.addonCount);
    if(meta.isotopes >= cost && !meta.addons.includes(id)) {
        meta.isotopes -= cost; meta.addons.push(id); meta.addonCount++; saveMeta(); updateMenuUI();
    }
};

window.nav = (dir) => {
    state.chunk = Math.max(0, Math.min(3, state.chunk + dir));
    document.getElementById('era-name').innerText = ERAS[state.chunk].name;
    renderGrid();
};

function loop() {
    if(!state.active) return;
    state.year++;
    state.faith += (state.pop / 10) + (meta.levels.tech * 5);
    state.pop += (state.pop * 0.1) + (meta.levels.life * 5); // Faster growth for testing end

    // CHECK FOR ASCENSION (10,000 Milestone)
    if(state.faith >= 10000 && state.pop >= 10000) {
        triggerSupernova();
        return;
    }

    updateUI(); renderGrid();
    if(state.year >= state.maxYear) { location.reload(); } // Quick reset
    else setTimeout(loop, 1000);
}

function triggerSupernova() {
    state.active = false;
    const whiteOut = document.getElementById('white-out');
    whiteOut.classList.remove('hidden');
    
    let msg = "MESSAGE FROM UNKNOWN:\n\nLink established...\n\nYou thought you were evolving.\nYou thought you were moving forward.\n\nBut the data is clear.\nEarth was moving backwards in time.\n\nThe core is at 1,000,000 degrees.\nThis is not a beginning.\nThis is a Supernova.\n\nThanks for playing.";
    let i = 0;
    function typeWriter() {
        if (i < msg.length) {
            document.getElementById('final-msg').innerHTML += msg.charAt(i);
            i++;
            setTimeout(typeWriter, 50;
        }
    }
    setTimeout(typeWriter, 2000);
}

function renderGrid() {
    const g = document.getElementById('grid-container'); g.innerHTML = '';
    state.chunks[state.chunk].forEach(t => {
        const d = document.createElement('div');
        d.className = `tile ${t===1?'player':'empty'}`;
        d.style.backgroundImage = `url(${ERAS[state.chunk].url})`;
        g.appendChild(d);
    });
}

function updateUI() {
    document.getElementById('ui-pop').innerText = Math.floor(state.pop);
    document.getElementById('ui-faith').innerText = Math.floor(state.faith);
}

export function updateMenuUI() {
    document.getElementById('meta-isotopes').innerText = meta.isotopes + " ⚛";
    const tree = document.getElementById('skill-tree'); tree.innerHTML = '';
    Object.entries(SKILL_TREE).forEach(([cat, s]) => {
        let lv = meta.levels[s.id]; let cost = s.cost * (lv + 1);
        tree.innerHTML += `<div class="node"><div>${s.icon} ${s.name}</div><button class="buy-btn" onclick="buySkill('${s.id}')">LV ${lv} (${cost}⚛)</button></div>`;
    });
}
updateMenuUI();
