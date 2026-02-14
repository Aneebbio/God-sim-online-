/* engine.js - Game Logic */
import { meta, saveMeta, SKILLS, ADDONS } from './state.js';
import { events } from './events.js';

let state = { active: false, year: 0, maxYear: 30, pop: 10, chunk: 0, chunks: [], stab: false };

// --- ATTACH TO WINDOW FOR HTML ACCESS ---
window.startGame = () => {
    state.active = true;
    state.year = 0;
    state.maxYear = 30 + (meta.levels.max_year * 10);
    state.chunks = Array.from({length:5}, () => Array(9).fill(0));
    state.chunks[0][4] = 1; // Starting tile
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    gameLoop();
};

window.buySkill = (id, cost) => {
    if(meta.isotopes >= cost) {
        meta.isotopes -= cost;
        meta.levels[id] = (meta.levels[id] || 0) + 1;
        saveMeta();
        updateMenuUI();
    }
};

window.buyAddon = (id, cost) => {
    if(meta.isotopes >= cost) {
        meta.isotopes -= cost;
        meta.addons.push(id);
        meta.addonCount++;
        saveMeta();
        updateMenuUI();
    }
};

window.nav = (dir) => {
    state.chunk = Math.max(0, Math.min(4, state.chunk + dir));
    renderGrid();
};

window.smite = () => {
    state.chunks[state.chunk] = state.chunks[state.chunk].map(t => t === 2 ? 0 : t);
    renderGrid();
};

window.stabilize = () => {
    state.stab = false;
    document.getElementById('stabilize-ui').classList.add('hidden');
};

// --- INTERNAL CORE ---
function gameLoop() {
    if(!state.active) return;
    state.year++;

    if(meta.addons.includes('auto_smite') && state.year % 5 === 0) window.smite();

    let growth = 0.02 + (meta.levels.fishing * 0.08) + (meta.levels.mining * 0.08) + (meta.levels.agri * 0.15);
    if(Math.random() < growth) expand(1); // Player
    if(Math.random() < 0.12) expand(2); // Rival
    if(Math.random() < 0.15) triggerEvent();

    updateGameplayUI();
    renderGrid();

    if(state.year >= state.maxYear) {
        let gain = Math.floor(state.pop / 50) + 1;
        meta.isotopes += gain;
        saveMeta();
        alert("Mission Over. Isotopes Gained: " + gain);
        location.reload();
    } else {
        setTimeout(gameLoop, 1000);
    }
}

function expand(type) {
    const empties = state.chunks[state.chunk].map((t,i) => t === 0 ? i : -1).filter(i => i !== -1);
    if(empties.length) {
        state.chunks[state.chunk][empties[0]] = type;
        if(type === 1) state.pop += 15;
    }
}

function triggerEvent() {
    const ev = events[Math.floor(Math.random() * events.length)];
    const log = document.getElementById('event-log');
    
    if(ev.danger) {
        state.stab = true;
        document.getElementById('stabilize-ui').classList.remove('hidden');
        setTimeout(() => {
            if(state.stab) { // Failed to click
                state.pop += ev.impact.pop;
                log.innerHTML = `<div style="color:red">FAILURE: Sector damaged!</div>` + log.innerHTML;
            }
        }, 2000);
    } else {
        if(ev.impact.isotopes) meta.isotopes += ev.impact.isotopes;
        if(ev.impact.pop) state.pop += ev.impact.pop;
    }
    log.innerHTML = `<div style="${ev.style}">${ev.text}</div>` + log.innerHTML;
}

function renderGrid() {
    const g = document.getElementById('grid-container');
    g.innerHTML = '';
    state.chunks[state.chunk].forEach(t => {
        const d = document.createElement('div');
        d.className = `tile ${t===1?'player':(t===2?'rival':'empty')}`;
        g.appendChild(d);
    });
}

function updateGameplayUI() {
    document.getElementById('ui-year').innerText = (state.maxYear - state.year) + "Y";
    document.getElementById('ui-pop').innerText = "Pop: " + Math.floor(state.pop);
}

export function updateMenuUI() {
    document.getElementById('meta-isotopes').innerText = meta.isotopes + " ⚛";
    const skillBox = document.getElementById('skill-tree-content');
    skillBox.innerHTML = "<h3>SURVIVAL SKILLS</h3>";
    
    SKILLS.forEach(s => {
        let lv = meta.levels[s.id] || 0;
        let cost = (lv + 1) * 10;
        skillBox.innerHTML += `
            <div class="card">
                <span>${s.name} (Lv ${lv})</span>
                <button class="buy-btn" ${meta.isotopes < cost ? 'disabled' : ''} onclick="buySkill('${s.id}', ${cost})">${cost} ⚛</button>
            </div>`;
    });

    const addonBox = document.getElementById('addon-list');
    let aCost = 100 * Math.pow(10, meta.addonCount);
    addonBox.innerHTML = `<p>Next Addon: ${aCost} ⚛</p>`;
    ADDONS.forEach(a => {
        let owned = meta.addons.includes(a.id);
        addonBox.innerHTML += `
            <div class="card" style="${owned?'opacity:0.5':''}">
                <span>${a.name}</span>
                <button class="buy-btn" ${owned || meta.isotopes < aCost ? 'disabled' : ''} onclick="buyAddon('${a.id}', ${aCost})">${owned?'OWNED':'BUY'}</button>
            </div>`;
    });
}

// Initial Boot
updateMenuUI();
