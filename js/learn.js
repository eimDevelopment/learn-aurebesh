let currentGroupIndex = 0;
let currentCharIndex = 0;
let unlockedGroups = 1;

function initLearn() {}

async function showLearn() {
  await updateUnlockedGroups();
  renderLearnCard();
}

async function updateUnlockedGroups() {
  const allProgress = await getAllProgress();
  const progressMap = {};
  for (const p of allProgress) {
    progressMap[p.charId] = p;
  }

  unlockedGroups = 1;
  for (let g = 0; g < LEARN_GROUPS.length - 1; g++) {
    const group = LEARN_GROUPS[g];
    const allHaveCorrect = group.every(id => {
      const p = progressMap[id];
      return p && p.totalCorrect >= 1;
    });
    if (allHaveCorrect) {
      unlockedGroups = Math.max(unlockedGroups, g + 2);
    } else {
      break;
    }
  }

  if (currentGroupIndex >= unlockedGroups) {
    currentGroupIndex = unlockedGroups - 1;
    currentCharIndex = 0;
  }
}

function renderLearnCard() {
  const group = LEARN_GROUPS[currentGroupIndex];
  const id = group[currentCharIndex];
  const ch = getCharById(id);

  document.getElementById('learn-glyph').textContent = ch.render;
  document.getElementById('learn-letter').textContent = ch.letter.toUpperCase();
  document.getElementById('learn-name').textContent = ch.name;

  document.getElementById('learn-group-label').textContent =
    `Group ${currentGroupIndex + 1} of ${unlockedGroups}`;
  document.getElementById('learn-position').textContent =
    `${currentCharIndex + 1} / ${group.length}`;

  const lockNotice = document.getElementById('learn-lock-notice');
  if (currentGroupIndex === unlockedGroups - 1 && unlockedGroups < LEARN_GROUPS.length) {
    lockNotice.textContent = 'Drill these characters to unlock the next group';
    lockNotice.classList.remove('hidden');
  } else {
    lockNotice.classList.add('hidden');
  }

  document.getElementById('learn-prev').disabled =
    (currentGroupIndex === 0 && currentCharIndex === 0);

  const atLastUnlocked = currentGroupIndex === unlockedGroups - 1;
  const atLastChar = currentCharIndex === group.length - 1;
  document.getElementById('learn-next').disabled = (atLastUnlocked && atLastChar);
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
  } else if (currentGroupIndex < unlockedGroups - 1) {
    currentGroupIndex++;
    currentCharIndex = 0;
  }
  renderLearnCard();
}
