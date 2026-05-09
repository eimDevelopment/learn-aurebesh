let currentGroupIndex = 0;
let currentCharIndex = 0;
let touchStartX = 0;
let touchStartY = 0;

function initLearn() {
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
}

function showLearn() {
  renderLearnCard();
}

function renderLearnCard() {
  const group = LEARN_GROUPS[currentGroupIndex];
  const id = group[currentCharIndex];
  const ch = getCharById(id);

  document.getElementById('learn-glyph').textContent = ch.render;
  document.getElementById('learn-letter').textContent = ch.letter.toUpperCase();
  document.getElementById('learn-hint').textContent = ch.hint;

  document.getElementById('learn-group-label').textContent =
    `Group ${currentGroupIndex + 1} of ${LEARN_GROUPS.length}`;
  document.getElementById('learn-position').textContent =
    `${currentCharIndex + 1} / ${group.length}`;

  document.getElementById('learn-prev').disabled =
    (currentGroupIndex === 0 && currentCharIndex === 0);

  const atLast = currentGroupIndex === LEARN_GROUPS.length - 1;
  const atLastChar = currentCharIndex === group.length - 1;
  document.getElementById('learn-next').disabled = (atLast && atLastChar);
}

function learnPrev() {
  if (currentCharIndex > 0) {
    currentCharIndex--;
  } else if (currentGroupIndex > 0) {
    currentGroupIndex--;
    currentCharIndex = LEARN_GROUPS[currentGroupIndex].length - 1;
  }
  renderLearnCard();
}

function learnNext() {
  const group = LEARN_GROUPS[currentGroupIndex];
  if (currentCharIndex < group.length - 1) {
    currentCharIndex++;
  } else if (currentGroupIndex < LEARN_GROUPS.length - 1) {
    currentGroupIndex++;
    currentCharIndex = 0;
  }
  renderLearnCard();
}
