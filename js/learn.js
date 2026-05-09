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
}

function startLearnLevel(level) {
  learnLevel = level;
  learnIndex = 0;

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

const TYPE_LABELS = { shape: 'Shape', sound: 'Sound', story: 'Story', name: 'Name', custom: 'Yours' };

function renderHint() {
  document.getElementById('learn-hint').textContent = currentHints[currentHintIndex].text;

  const tabsContainer = document.getElementById('learn-hint-tabs');
  tabsContainer.innerHTML = '';

  for (let i = 0; i < currentHints.length; i++) {
    const tab = document.createElement('button');
    const type = currentHints[i].type;
    tab.className = 'learn-hint-tab' + (i === currentHintIndex ? ' active' : '') + (type === 'custom' ? ' custom' : '');
    tab.textContent = TYPE_LABELS[type] || type;
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
