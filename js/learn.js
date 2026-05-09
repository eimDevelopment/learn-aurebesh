let learnIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let learnChars = [];
let currentHintIndex = 0;
let currentHints = [];
let currentProgress = null;

function initLearn() {
  learnChars = [...ALL_CHARS].sort((a, b) => a.letter.localeCompare(b.letter));

  const screen = document.getElementById('screen-learn');
  screen.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  screen.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) learnNext();
      else learnPrev();
    }
  }, { passive: true });

  const hintArea = document.getElementById('learn-hint-area');
  hintArea.addEventListener('click', (e) => {
    if (e.target.closest('.learn-pin-btn')) return;
    if (currentHints.length <= 1) return;
    const rect = hintArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      cycleHint(-1);
    } else {
      cycleHint(1);
    }
  });
}

function showLearn() {
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
  resetCustomArea();
}

function renderHint() {
  document.getElementById('learn-hint').textContent = currentHints[currentHintIndex].text;

  const dotsContainer = document.getElementById('learn-hint-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < currentHints.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === currentHintIndex ? ' active' : '');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentHintIndex = i;
      renderHint();
    });
    dotsContainer.appendChild(dot);
  }

  const pinBtn = document.getElementById('learn-pin-btn');
  const isPinned = isCurrentHintPinned();
  pinBtn.innerHTML = isPinned ? '&#9733;' : '&#9734;';
  pinBtn.classList.toggle('pinned', isPinned);

  const link = document.getElementById('learn-add-hint-link');
  if (currentProgress && currentProgress.customHint) {
    link.textContent = 'Edit your hint';
  } else {
    link.textContent = '+ Add your hint';
  }
}

function isCurrentHintPinned() {
  if (!currentProgress || !currentProgress.pinnedHint) return false;
  const pin = currentProgress.pinnedHint;
  if (currentHints[currentHintIndex].type === 'custom') {
    return pin.source === 'custom';
  }
  return pin.source === 'curated' && pin.index === currentHintIndex;
}

function cycleHint(delta) {
  currentHintIndex = (currentHintIndex + delta + currentHints.length) % currentHints.length;
  renderHint();
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

function resetCustomArea() {
  document.getElementById('learn-add-hint-link').style.display = '';
  document.getElementById('learn-custom-input-row').classList.add('hidden');
  document.getElementById('learn-custom-input').value = '';
}

function showCustomHintInput() {
  document.getElementById('learn-add-hint-link').style.display = 'none';
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
  resetCustomArea();
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
