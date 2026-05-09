const screens = {};
let currentScreen = null;

function registerScreen(name, { init, show, hide }) {
  screens[name] = { init, show, hide, initialized: false };
}

function navigateTo(name) {
  if (currentScreen && screens[currentScreen]) {
    const el = document.getElementById('screen-' + currentScreen);
    if (el) el.classList.add('hidden');
    if (screens[currentScreen].hide) screens[currentScreen].hide();
  }

  const screen = screens[name];
  if (!screen) return;

  if (!screen.initialized) {
    if (screen.init) screen.init();
    screen.initialized = true;
  }

  const el = document.getElementById('screen-' + name);
  if (el) el.classList.remove('hidden');
  if (screen.show) screen.show();

  currentScreen = name;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === name);
  });
}

function initApp() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.screen));
  });

  registerScreen('learn', { init: initLearn, show: showLearn });
  registerScreen('drill', { init: initDrill, show: showDrill });
  registerScreen('reference', { init: initReference, show: null });

  navigateTo('learn');
}

function initReference() {
  const grid = document.getElementById('ref-grid');
  grid.innerHTML = '';

  const sorted = [...ALL_CHARS].sort((a, b) => a.letter.localeCompare(b.letter));

  for (const ch of sorted) {

      const card = document.createElement('div');
      card.className = 'ref-card';

      const glyph = document.createElement('div');
      glyph.className = 'ref-glyph aurebesh';
      glyph.textContent = ch.render;

      const letter = document.createElement('div');
      letter.className = 'ref-letter';
      letter.textContent = ch.letter.toUpperCase();

      const name = document.createElement('div');
      name.className = 'ref-name';
      name.textContent = ch.name;

      card.appendChild(glyph);
      card.appendChild(letter);
      card.appendChild(name);
      grid.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
