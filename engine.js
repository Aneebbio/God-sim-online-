import { meta, saveMeta, SKILLS, ADDONS, ERAS } from './state.js';
import { events } from './events.js';

let state = { active: false, year: 0, maxYear: 30, pop: 10, faith: 0, chunk: 0, chunks: [], stab: false };

window.startGame = () => {
    state.active = true; state.year = 0; state.faith = 20;
    state.maxYear = 30 + (meta.levels.max_year * 10);
    state.chunks = Array.from({length: 5}, () => Array(9).fill(0));
    state.chunks[0][4] = 1;
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loop();
};

window.buySkill = (id, cost) => {
    if(meta.isotopes >= cost) { meta.isotopes -= cost; meta.levels[id]++; saveMeta(); updateMenuUI(); }
};

window.buyAddon = (id, cost) => {
    if(meta.isotopes >= cost) { meta.isotopes -= cost; meta.addons.push(id); meta.addonCount++; saveMeta(); updateMenuUI(); }
};

window.nav = (dir) => {
    state.chunk = Math.max(0, Math.min(4, state.chunk + dir));
    document.getElementById('era-name').innerText = "ERA: " + ERAS[state.chunk].name;
    renderGrid();
};

window.smite = () => {
    if(state.faith >= 50) {
        state.faith -= 50;
        state.chunks[state.chunk] = state.chunks[state.chunk].map(t => t === 2 ? 0 : t);
        renderGrid();
    }
};

window.stabilize = () => { state.stab = false; document.getElementById('stabilize-ui').classList.add('hidden'); };

function loop() {
    if(!state.active) return;
    state.year++;
    state.faith += (state.pop / 25); 

    let growth = 0.02 + (meta.levels.fishing * 0.08) + (meta.levels.mining * 0.08) + (meta.levels.agri * 0.15);
    if(Math.random() < growth) expand(1);
    if(Math.random() < 0.14) expand(2); // Fungal growth is slightly faster
    if(Math.random() < 0.15) triggerEvent();

    updateUI();
    renderGrid();

    if(state.year >= state.maxYear) {
        let gain = Math.floor(state.pop / 50) + 1;
        meta.isotopes += gain; saveMeta();
        alert(`ERA COMPLETED. Gained ${gain} Isotopes.`);
        location.reload();
    } else {
        setTimeout(loop, 1000);
    }
}

function expand(type) {
    const empties = state.chunks[state.chunk].map((t,i) => t === 0 ? i : -1).filter(i => i !== -1);
    if(empties.length) {
        state.chunks[state.chunk][empties[Math.floor(Math.random()*empties.length)]] = type;
        if(type === 1) state.pop += 15;
    }
}

function renderGrid() {
    const g = document.getElementById('grid-container');
    g.innerHTML = '';
    const currentEraImg = ERAS[state.chunk].url;
    
    state.chunks[state.chunk].forEach(t => {
        const d = document.createElement('div');
        d.className = `tile ${t===1?'player':(t===2?'rival':'empty')}`;
        d.style.backgroundImage = `url(${currentEraImg})`;
        g.appendChild(d);
    });
}

function triggerEvent() {
    const ev = events[Math.floor(Math.random() * events.length)];
    const log = document.getElementById('event-log');
    if(ev.danger) {
        state.stab = true;
        document.getElementById('stabilize-ui').classList.remove('hidden');
        setTimeout(() => { if(state.stab) { state.pop -= 50; log.innerHTML = `<div style="color:red">SATELLITE SYNC LOST: Population damage.</div>` + log.innerHTML; }}, 2500);
    }
    log.innerHTML = `<div style="${ev.style}">${ev.text}</div>` + log.innerHTML;
}

function updateUI() {
    document.getElementById('ui-year').innerText = (state.maxYear - state.year);
    document.getElementById('ui-pop').innerText = Math.floor(state.pop);
    document.getElementById('ui-faith').innerText = Math.floor(state.faith);
}

export function updateMenuUI() {
    document.getElementById('meta-isotopes').innerText = meta.isotopes + " ⚛";
    const skillBox = document.getElementById('skill-tree-content');
    skillBox.innerHTML = "<h3>ERA ADAPTATION</h3>";
    SKILLS.forEach(s => {
        let lv = meta.levels[s.id] || 0;
        let cost = (lv + 1) * 10;
        skillBox.innerHTML += `<div class="stat-card"><span>${s.name} (Lv ${lv})</span><button class="buy-btn" ${meta.isotopes<cost?'disabled':''} onclick="buySkill('${s.id}',${cost})">${cost} ⚛</button></div>`;
    });
    
    const addonBox = document.getElementById('addon-list');
    let aCost = 100 * Math.pow(10, meta.addonCount);
    addonBox.innerHTML = `<h3>ADDONS (${aCost} ⚛)</h3>`;
    ADDONS.forEach(a => {
        let owned = meta.addons.includes(a.id);
        addonBox.innerHTML += `<button class="buy-btn" ${owned||meta.isotopes<aCost?'disabled':''} onclick="buyAddon('${a.id}',${aCost})">${a.name} ${owned?'[OWNED]':''}</button>`;
    });
}

updateMenuUI();
