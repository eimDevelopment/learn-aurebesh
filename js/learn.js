let learnIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let learnChars = [];

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
}

function showLearn() {
  renderLearnCard();
}

function renderLearnCard(direction) {
  const ch = learnChars[learnIndex];
  const card = document.getElementById('learn-card');

  if (direction) {
    card.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');

    setTimeout(() => {
      updateLearnContent(ch);
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

function updateLearnContent(ch) {
  document.getElementById('learn-glyph').textContent = ch.render;
  document.getElementById('learn-letter').textContent = ch.letter.toUpperCase();
  document.getElementById('learn-hint').textContent = ch.hint;
  document.getElementById('learn-position').textContent =
    `${learnIndex + 1} / ${learnChars.length}`;

  document.getElementById('learn-prev').disabled = (learnIndex === 0);
  document.getElementById('learn-next').disabled = (learnIndex === learnChars.length - 1);
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
