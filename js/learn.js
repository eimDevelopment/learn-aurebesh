let learnIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let swiping = false;
let learnChars = [];
let learnLevel = 'all';
let currentHintIndex = 0;
let currentHints = [];
let currentProgress = null;

function initLearn() {
  const screen = document.getElementById('screen-learn');
  screen.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swiping = false;
  }, { passive: true });

  screen.addEventListener('touchmove', (e) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > 10 && dx > dy) {
      swiping = true;
      e.preventDefault();
    }
  }, { passive: false });

  screen.addEventListener('touchend', (e) => {
    if (!swiping) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) learnNext();
      else learnPrev();
    }
    swiping = false;
  }, { passive: true });
}

function showLearn() {
  document.getElementById('learn-level-select').classList.remove('hidden');
  document.getElementById('learn-card').classList.add('hidden');
  document.getElementById('learn-position').textContent = '';
  document.querySelector('.learn-nav').classList.add('hidden');
  document.getElementById('learn-compare').classList.add('hidden');
  document.getElementById('learn-transforms').classList.add('hidden');
}

function startLearnLevel(level) {
  learnLevel = level;
  learnIndex = 0;

  if (level === 'transforms') {
    document.getElementById('learn-level-select').classList.add('hidden');
    document.getElementById('learn-transforms').classList.remove('hidden');
    initTransforms();
    return;
  }

  if (level === 'similar') {
    const ids = [...new Set(CONFUSABLE_PAIRS.flatMap(p => p.ids))];
    learnChars = ids.map(id => getCharById(id));
  } else {
    learnChars = [...ALL_CHARS].sort((a, b) => a.letter.localeCompare(b.letter));
  }

  document.getElementById('learn-level-select').classList.add('hidden');
  document.getElementById('learn-card').classList.remove('hidden');
  document.querySelector('.learn-nav').classList.remove('hidden');
  renderLearnCard();
}

function renderLearnCard(direction) {
  const ch = learnChars[learnIndex];
  const card = document.getElementById('learn-card');

  if (direction) {
    card.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    setTimeout(async () => {
      await updateLearnContent(ch);
      card.classList.remove('slide-out-left', 'slide-out-right');
      card.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');

      setTimeout(() => {
        card.classList.remove('slide-in-right', 'slide-in-left');
      }, 200);
    }, 150);
  } else {
    updateLearnContent(ch);
  }
}

async function updateLearnContent(ch) {
  document.getElementById('learn-glyph').textContent = ch.render;
  document.getElementById('learn-letter').textContent = ch.letter.toUpperCase();
  document.getElementById('learn-position').textContent =
    `${learnIndex + 1} / ${learnChars.length}`;

  document.getElementById('learn-prev').disabled = (learnIndex === 0);
  document.getElementById('learn-next').disabled = (learnIndex === learnChars.length - 1);

  currentProgress = await getProgress(ch.id);
  currentHints = getHintsForChar(ch, currentProgress);

  if (currentProgress && currentProgress.pinnedHint) {
    if (currentProgress.pinnedHint.source === 'custom') {
      currentHintIndex = currentHints.length - 1;
    } else if (currentProgress.pinnedHint.source === 'curated') {
      currentHintIndex = currentProgress.pinnedHint.index;
    } else {
      currentHintIndex = 0;
    }
  } else {
    currentHintIndex = 0;
  }

  if (currentHintIndex >= currentHints.length) currentHintIndex = 0;

  renderHint();
  hideCustomInput();
  renderCompare(ch);
}

const TYPE_LABELS = { shape: 'Hint', sound: 'Sound', story: 'Hint', name: 'Name', transform: 'See it', custom: 'Yours' };

function renderHint() {
  const hintEl = document.getElementById('learn-hint');
  const current = currentHints[currentHintIndex];
  const glyphEl = document.getElementById('learn-glyph');
  const ch = learnChars[learnIndex];

  hintEl.textContent = current.text;

  if (current.type === 'transform' && GLYPH_TRANSFORMS[ch.id]) {
    glyphEl.textContent = '';
    glyphEl.classList.remove('aurebesh');
    setupGlyphTransform(ch, glyphEl);
  } else {
    glyphEl.classList.add('aurebesh');
    glyphEl.textContent = ch.render;
    const oldSvg = glyphEl.querySelector('svg');
    if (oldSvg) oldSvg.remove();
  }

  const tabsContainer = document.getElementById('learn-hint-tabs');
  tabsContainer.innerHTML = '';

  for (let i = 0; i < currentHints.length; i++) {
    const tab = document.createElement('button');
    const type = currentHints[i].type;
    tab.className = 'learn-hint-tab' + (i === currentHintIndex ? ' active' : '') + (type === 'custom' ? ' custom' : '');
    const label = TYPE_LABELS[type] || type;
    const hintCount = currentHints.filter(h => TYPE_LABELS[h.type] === 'Hint').length;
    if (label === 'Hint' && hintCount > 1) {
      const hintNum = currentHints.slice(0, i + 1).filter(h => TYPE_LABELS[h.type] === 'Hint').length;
      tab.textContent = 'Hint ' + hintNum;
    } else {
      tab.textContent = label;
    }
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      if (type === 'custom' && currentHintIndex === i) {
        showCustomHintInput();
        return;
      }
      currentHintIndex = i;
      renderHint();
      hideCustomInput();
    });
    tabsContainer.appendChild(tab);
  }

  const hasCustom = currentProgress && currentProgress.customHint;
  if (!hasCustom) {
    const addTab = document.createElement('button');
    addTab.className = 'learn-hint-tab custom';
    addTab.textContent = '+ Yours';
    addTab.addEventListener('click', (e) => {
      e.stopPropagation();
      showCustomHintInput();
    });
    tabsContainer.appendChild(addTab);
  }

  const pinBtn = document.getElementById('learn-pin-btn');
  const isPinned = isCurrentHintPinned();
  pinBtn.innerHTML = isPinned ? '&#9733;' : '&#9734;';
  pinBtn.classList.toggle('pinned', isPinned);
}

function isCurrentHintPinned() {
  if (!currentProgress || !currentProgress.pinnedHint) return false;
  const pin = currentProgress.pinnedHint;
  if (currentHints[currentHintIndex].type === 'custom') {
    return pin.source === 'custom';
  }
  return pin.source === 'curated' && pin.index === currentHintIndex;
}

async function togglePinHint() {
  const ch = learnChars[learnIndex];
  if (!currentProgress) {
    currentProgress = makeDefaultProgress(ch.id);
  }

  if (isCurrentHintPinned()) {
    currentProgress.pinnedHint = null;
  } else if (currentHints[currentHintIndex].type === 'custom') {
    currentProgress.pinnedHint = { source: 'custom' };
  } else {
    currentProgress.pinnedHint = { source: 'curated', index: currentHintIndex };
  }

  await saveProgress(currentProgress);
  renderHint();
}

function hideCustomInput() {
  document.getElementById('learn-custom-input-row').classList.add('hidden');
  document.getElementById('learn-custom-input').value = '';
}

function showCustomHintInput() {
  const row = document.getElementById('learn-custom-input-row');
  row.classList.remove('hidden');
  const input = document.getElementById('learn-custom-input');
  if (currentProgress && currentProgress.customHint) {
    input.value = currentProgress.customHint;
  }
  input.focus();
}

async function saveCustomHint() {
  const ch = learnChars[learnIndex];
  const input = document.getElementById('learn-custom-input');
  const value = input.value.trim();

  if (!currentProgress) {
    currentProgress = makeDefaultProgress(ch.id);
  }

  if (value) {
    currentProgress.customHint = value;
    currentProgress.pinnedHint = { source: 'custom' };
  } else {
    currentProgress.customHint = null;
    if (currentProgress.pinnedHint && currentProgress.pinnedHint.source === 'custom') {
      currentProgress.pinnedHint = null;
    }
  }

  await saveProgress(currentProgress);
  currentHints = getHintsForChar(ch, currentProgress);

  if (value) {
    currentHintIndex = currentHints.length - 1;
  } else {
    currentHintIndex = 0;
  }

  renderHint();
  hideCustomInput();
}

function learnPrev() {
  if (learnIndex > 0) {
    learnIndex--;
    renderLearnCard('prev');
  }
}

function learnNext() {
  if (learnIndex < learnChars.length - 1) {
    learnIndex++;
    renderLearnCard('next');
  }
}

function renderCompare(ch) {
  const container = document.getElementById('learn-compare');
  container.innerHTML = '';

  const pair = CONFUSABLE_PAIRS.find(p => p.ids.includes(ch.id));
  if (!pair || learnLevel !== 'similar') {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');

  const label = document.createElement('div');
  label.className = 'compare-label';
  label.textContent = 'Similar to:';
  container.appendChild(label);

  const glyphs = document.createElement('div');
  glyphs.className = 'compare-glyphs';

  for (const id of pair.ids) {
    if (id === ch.id) continue;
    const other = getCharById(id);
    const item = document.createElement('div');
    item.className = 'compare-item';

    const g = document.createElement('span');
    g.className = 'compare-glyph aurebesh';
    g.textContent = other.render;

    const lbl = document.createElement('span');
    lbl.className = 'compare-letter';
    lbl.textContent = other.letter.toUpperCase();

    item.appendChild(g);
    item.appendChild(lbl);
    glyphs.appendChild(item);
  }

  container.appendChild(glyphs);

  const tip = document.createElement('div');
  tip.className = 'compare-tip';
  tip.textContent = pair.tip;
  container.appendChild(tip);
}

const GLYPH_TRANSFORMS = {
  xesh: {
    render: 'x',
    desc: 'Remove the bottom line and cross the top two lines to form an X',
    lines: [
      { x1: 20, y1: 82, x2: 50, y2: 18 },
      { x1: 50, y1: 18, x2: 80, y2: 82 },
      { x1: 20, y1: 82, x2: 80, y2: 82 },
    ],
    strokeWidth: 13,
    phases: [
      { duration: 400, delay: 200, changes: { 2: { opacity: 0 } } },
      { duration: 600, delay: 300, changes: {
        0: { x1: 25, y1: 75, x2: 75, y2: 25 },
        1: { x1: 25, y1: 25, x2: 75, y2: 75 },
      }},
    ],
  },
};

let transformRunning = false;
let transformChars = [];
let transformIndex = 0;

function initTransforms() {
  transformChars = Object.keys(GLYPH_TRANSFORMS);
  transformIndex = 0;
  renderTransform();
}

function renderTransform() {
  const charId = transformChars[transformIndex];
  const anim = GLYPH_TRANSFORMS[charId];

  document.getElementById('transform-font-glyph').style.opacity = '0';
  transformRunning = false;

  let svg = document.querySelector('#transform-stage svg');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    document.getElementById('transform-stage').appendChild(svg);
  }
  svg.innerHTML = '';

  for (const def of anim.lines) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', def.x1);
    line.setAttribute('y1', def.y1);
    line.setAttribute('x2', def.x2);
    line.setAttribute('y2', def.y2);
    line.setAttribute('stroke', '#FFE81F');
    line.setAttribute('stroke-width', anim.strokeWidth);
    line.setAttribute('stroke-linecap', 'butt');
    svg.appendChild(line);
  }
}

function playTransform() {
  if (transformRunning) return;
  transformRunning = true;

  const charId = transformChars[transformIndex];
  const anim = GLYPH_TRANSFORMS[charId];
  const lines = document.querySelectorAll('#transform-stage svg line');

  anim.lines.forEach((def, i) => {
    lines[i].setAttribute('x1', def.x1);
    lines[i].setAttribute('y1', def.y1);
    lines[i].setAttribute('x2', def.x2);
    lines[i].setAttribute('y2', def.y2);
    lines[i].style.opacity = 1;
  });

  setTimeout(() => {
    runTransformAnimation(anim, lines);
  }, 400);
}

function runTransformAnimation(anim, lines) {
  const timeline = [];
  let time = 0;
  const state = anim.lines.map(def => ({
    x1: def.x1, y1: def.y1, x2: def.x2, y2: def.y2, opacity: 1,
  }));

  for (const phase of anim.phases) {
    time += phase.delay || 0;
    for (const [idx, target] of Object.entries(phase.changes)) {
      for (const [prop, endVal] of Object.entries(target)) {
        timeline.push({
          startTime: time,
          endTime: time + phase.duration,
          lineIdx: parseInt(idx),
          prop,
          from: state[idx][prop],
          to: endVal,
        });
        state[idx][prop] = endVal;
      }
    }
    time += phase.duration;
  }

  const totalDuration = time;
  const animStart = performance.now();

  function tick() {
    const elapsed = performance.now() - animStart;

    for (const entry of timeline) {
      if (elapsed < entry.startTime) continue;
      const t = Math.min((elapsed - entry.startTime) / (entry.endTime - entry.startTime), 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const val = entry.from + (entry.to - entry.from) * ease;

      if (entry.prop === 'opacity') {
        lines[entry.lineIdx].style.opacity = val;
      } else {
        lines[entry.lineIdx].setAttribute(entry.prop, val);
      }
    }

    if (elapsed < totalDuration) {
      requestAnimationFrame(tick);
    } else {
      transformRunning = false;
    }
  }

  requestAnimationFrame(tick);
}

let inlineTransformRunning = false;

function setupGlyphTransform(ch, glyphEl) {
  const anim = GLYPH_TRANSFORMS[ch.id];
  inlineTransformRunning = false;

  const oldSvg = glyphEl.querySelector('svg');
  if (oldSvg) oldSvg.remove();

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.style.width = '120px';
  svg.style.height = '120px';
  glyphEl.appendChild(svg);

  for (const def of anim.lines) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', def.x1);
    line.setAttribute('y1', def.y1);
    line.setAttribute('x2', def.x2);
    line.setAttribute('y2', def.y2);
    line.setAttribute('stroke', '#FFE81F');
    line.setAttribute('stroke-width', anim.strokeWidth);
    line.setAttribute('stroke-linecap', 'butt');
    svg.appendChild(line);
  }

  svg.style.cursor = 'pointer';
  svg.addEventListener('click', () => {
    inlineTransformRunning = false;
    playGlyphTransform(anim, svg);
  });

  setTimeout(() => {
    playGlyphTransform(anim, svg);
  }, 500);
}

function playGlyphTransform(anim, svg) {
  if (inlineTransformRunning) return;
  inlineTransformRunning = true;

  const lines = svg.querySelectorAll('line');

  anim.lines.forEach((def, i) => {
    lines[i].setAttribute('x1', def.x1);
    lines[i].setAttribute('y1', def.y1);
    lines[i].setAttribute('x2', def.x2);
    lines[i].setAttribute('y2', def.y2);
    lines[i].style.opacity = 1;
  });

  setTimeout(() => {
    runTransformAnimation(anim, lines);
  }, 400);
}
