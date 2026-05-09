let drillQueue = [];
let drillCurrent = null;
let drillMode = 'choice';
let drillLevel = 'letters';
let drillSessionCorrect = 0;
let drillSessionTotal = 0;
let drillSessionStart = 0;
let drillCurrentHintText = '';

const CHOICE_THRESHOLD = 3;

function isWordDrill() {
  return drillLevel !== 'letters' && drillLevel !== 'similar';
}

function getWordFromId(id) {
  return id.split(':')[1];
}

function getWordLenFromLevel() {
  return parseInt(drillLevel.replace('words', ''));
}

function initDrill() {
  document.getElementById('drill-type-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') drillSubmitTyped();
  });
}

async function showDrill() {
  document.getElementById('drill-level-select').classList.remove('hidden');
  document.getElementById('drill-card').classList.add('hidden');
  document.getElementById('drill-feedback').classList.add('hidden');
  document.getElementById('drill-choice-btns').classList.add('hidden');
  document.getElementById('drill-type-area').classList.add('hidden');
  document.getElementById('drill-complete').classList.add('hidden');
  document.getElementById('drill-count').textContent = '';
}

async function startDrillLevel(level) {
  drillLevel = level;
  drillSessionCorrect = 0;
  drillSessionTotal = 0;
  drillSessionStart = Date.now();
  document.getElementById('drill-level-select').classList.add('hidden');
  await buildDrillQueue();
  drillNextCard();
}

async function buildDrillQueue() {
  const allProgress = await getAllProgress();
  const progressMap = {};
  for (const p of allProgress) {
    progressMap[p.charId] = p;
  }

  const due = [];
  const learning = [];
  const fresh = [];

  if (drillLevel === 'letters' || drillLevel === 'similar') {
    const charIds = drillLevel === 'similar'
      ? [...new Set(CONFUSABLE_PAIRS.flatMap(p => p.ids))]
      : LEARN_GROUPS.flat();
    for (const id of charIds) {
      const p = progressMap[id];
      if (!p || p.status === 'new') {
        fresh.push(id);
      } else if (isDueForReview(p)) {
        due.push(id);
      } else if (p.status === 'learning') {
        learning.push(id);
      }
    }
  } else {
    const wordLen = getWordLenFromLevel();
    const words = getWordList(wordLen);
    for (const word of words) {
      const id = 'w' + wordLen + ':' + word;
      const p = progressMap[id];
      if (!p || p.status === 'new') {
        fresh.push(id);
      } else if (isDueForReview(p)) {
        due.push(id);
      } else if (p.status === 'learning') {
        learning.push(id);
      }
    }
  }

  shuffleArray(due);
  shuffleArray(learning);
  shuffleArray(fresh);

  drillQueue = [...due, ...learning, ...fresh];

  if (drillQueue.length === 0) {
    if (drillLevel === 'similar') {
      drillQueue = [...new Set(CONFUSABLE_PAIRS.flatMap(p => p.ids))];
    } else if (drillLevel === 'letters') {
      drillQueue = ALL_CHARS.map(c => c.id);
    } else {
      const wordLen = getWordLenFromLevel();
      drillQueue = getWordList(wordLen).map(w => 'w' + wordLen + ':' + w);
    }
    shuffleArray(drillQueue);
  }

  const SESSION_LIMIT = 10;
  if (drillQueue.length > SESSION_LIMIT) {
    drillQueue = drillQueue.slice(0, SESSION_LIMIT);
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function drillNextCard() {
  if (drillQueue.length === 0) {
    drillShowComplete();
    return;
  }

  drillCurrent = drillQueue.shift();

  let record = await getProgress(drillCurrent);
  drillMode = (record && record.consecutiveCorrect >= CHOICE_THRESHOLD) ? 'type' : 'choice';

  const glyphEl = document.getElementById('drill-glyph');

  if (isWordDrill()) {
    const word = getWordFromId(drillCurrent);
    glyphEl.textContent = toAurebeshText(word);
    glyphEl.classList.add('word-glyph');
    drillCurrentHintText = '';
  } else {
    const ch = getCharById(drillCurrent);
    glyphEl.textContent = ch.render;
    glyphEl.classList.remove('word-glyph');
    drillCurrentHintText = getPinnedHintText(ch, record);
  }

  document.getElementById('drill-card').classList.remove('hidden');
  document.getElementById('drill-count').textContent = `${drillQueue.length} remaining`;

  document.getElementById('drill-feedback').classList.add('hidden');
  document.getElementById('drill-choice-btns').classList.add('hidden');
  document.getElementById('drill-type-area').classList.add('hidden');
  document.getElementById('drill-complete').classList.add('hidden');

  if (drillMode === 'choice') {
    if (isWordDrill()) {
      showWordChoiceMode(getWordFromId(drillCurrent));
    } else {
      showChoiceMode(getCharById(drillCurrent));
    }
  } else {
    showTypeMode();
  }
}

function getConfusableGroup(charId) {
  const pair = CONFUSABLE_PAIRS.find(p => p.ids.includes(charId));
  if (!pair) return [];
  return pair.ids.filter(id => id !== charId).map(id => getCharById(id));
}

function showChoiceMode(correct) {
  const options = [correct];
  let others;

  if (drillLevel === 'similar') {
    const group = getConfusableGroup(correct.id);
    const rest = ALL_CHARS.filter(c => c.id !== correct.id && !group.some(g => g.id === c.id));
    shuffleArray(rest);
    others = [...group, ...rest];
  } else {
    others = ALL_CHARS.filter(c => c.id !== correct.id);
    shuffleArray(others);
  }

  options.push(others[0], others[1], others[2]);
  shuffleArray(options);

  const container = document.getElementById('drill-choice-btns');
  container.innerHTML = '';
  container.classList.remove('hidden');

  for (const opt of options) {
    const btn = document.createElement('button');
    btn.className = 'btn-choice';
    btn.textContent = opt.letter.toUpperCase();
    btn.addEventListener('click', () => drillPickChoice(opt.id === correct.id, correct, btn, container));
    container.appendChild(btn);
  }
}

async function drillPickChoice(isCorrect, correct, btn, container) {
  const buttons = container.querySelectorAll('.btn-choice');
  buttons.forEach(b => { b.disabled = true; });

  if (isCorrect) {
    btn.classList.add('correct');
    showFeedback(true, correct);
    await recordDrillAnswer(1);
  } else {
    btn.classList.add('incorrect');
    buttons.forEach(b => {
      if (b.textContent === correct.letter.toUpperCase()) b.classList.add('correct');
    });
    showFeedback(false, correct);
    await recordDrillAnswer(0);
  }

  setTimeout(() => drillNextCard(), 1200);
}

function showWordChoiceMode(correctWord) {
  const wordLen = getWordLenFromLevel();
  const allWords = getWordList(wordLen);
  const others = allWords.filter(w => w !== correctWord);
  const sameTwo = others.filter(w => w.length >= 2 && w[0] === correctWord[0] && w[1] === correctWord[1]);
  shuffleArray(sameTwo);
  const sameOne = others.filter(w => w[0] === correctWord[0] && (w.length < 2 || w[1] !== correctWord[1]));
  shuffleArray(sameOne);
  const diffStart = others.filter(w => w[0] !== correctWord[0]);
  shuffleArray(diffStart);
  const distractors = [...sameTwo, ...sameOne, ...diffStart].slice(0, 3);
  const options = [correctWord, ...distractors];
  shuffleArray(options);

  const container = document.getElementById('drill-choice-btns');
  container.innerHTML = '';
  container.classList.remove('hidden');

  for (const word of options) {
    const btn = document.createElement('button');
    btn.className = 'btn-choice';
    btn.textContent = word.toUpperCase();
    btn.addEventListener('click', () => drillPickWordChoice(word === correctWord, correctWord, btn, container));
    container.appendChild(btn);
  }
}

async function drillPickWordChoice(isCorrect, correctWord, btn, container) {
  const buttons = container.querySelectorAll('.btn-choice');
  buttons.forEach(b => { b.disabled = true; });

  if (isCorrect) {
    btn.classList.add('correct');
    showWordFeedback(true, correctWord);
    await recordDrillAnswer(1);
  } else {
    btn.classList.add('incorrect');
    buttons.forEach(b => {
      if (b.textContent === correctWord.toUpperCase()) b.classList.add('correct');
    });
    showWordFeedback(false, correctWord);
    await recordDrillAnswer(0);
  }

  setTimeout(() => drillNextCard(), 1200);
}

function showTypeMode() {
  const area = document.getElementById('drill-type-area');
  area.classList.remove('hidden');
  const input = document.getElementById('drill-type-input');
  input.value = '';
  input.placeholder = isWordDrill() ? 'Type the word...' : 'Type the letter...';
  input.focus();
}

async function drillSubmitTyped() {
  const input = document.getElementById('drill-type-input');
  const answer = input.value.trim().toLowerCase();
  if (!answer) return;

  input.disabled = true;
  let isCorrect;

  if (isWordDrill()) {
    const correctWord = getWordFromId(drillCurrent);
    isCorrect = (answer === correctWord);
    if (isCorrect) {
      input.classList.add('correct');
      showWordFeedback(true, correctWord);
    } else {
      input.classList.add('incorrect');
      showWordFeedback(false, correctWord);
    }
  } else {
    const ch = getCharById(drillCurrent);
    isCorrect = (answer === ch.letter);
    if (isCorrect) {
      input.classList.add('correct');
      showFeedback(true, ch);
    } else {
      input.classList.add('incorrect');
      showFeedback(false, ch);
    }
  }

  await recordDrillAnswer(isCorrect ? 1 : 0);

  setTimeout(() => {
    input.disabled = false;
    input.classList.remove('correct', 'incorrect');
    drillNextCard();
  }, 1200);
}

function showFeedback(correct, ch) {
  const fb = document.getElementById('drill-feedback');
  fb.textContent = '';
  if (correct) {
    fb.textContent = 'Correct!';
    fb.className = 'drill-feedback feedback-correct';
  } else {
    fb.className = 'drill-feedback feedback-incorrect';
    const main = document.createElement('div');
    main.textContent = `${ch.letter.toUpperCase()} - ${ch.name}`;
    const hint = document.createElement('div');
    hint.className = 'drill-feedback-hint';
    hint.textContent = drillCurrentHintText;
    fb.appendChild(main);
    fb.appendChild(hint);
  }
}

function showWordFeedback(correct, word) {
  const fb = document.getElementById('drill-feedback');
  fb.textContent = '';
  if (correct) {
    fb.textContent = 'Correct!';
    fb.className = 'drill-feedback feedback-correct';
  } else {
    fb.className = 'drill-feedback feedback-incorrect';
    const main = document.createElement('div');
    main.textContent = word.toUpperCase();
    fb.appendChild(main);
  }
}

async function recordDrillAnswer(quality) {
  drillSessionTotal++;
  if (quality > 0) drillSessionCorrect++;

  let record = await getProgress(drillCurrent);
  if (!record) record = makeDefaultProgress(drillCurrent);

  record = gradeCard(record, quality);
  await saveProgress(record);

  if (quality === 0) {
    const reinsert = Math.min(3 + Math.floor(Math.random() * 3), drillQueue.length);
    drillQueue.splice(reinsert, 0, drillCurrent);
  }
}

async function drillShowComplete() {
  document.getElementById('drill-card').classList.add('hidden');
  document.getElementById('drill-choice-btns').classList.add('hidden');
  document.getElementById('drill-type-area').classList.add('hidden');
  document.getElementById('drill-count').textContent = '';

  const pct = drillSessionTotal > 0
    ? Math.round((drillSessionCorrect / drillSessionTotal) * 100)
    : 0;

  const elapsed = Math.round((Date.now() - drillSessionStart) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  document.getElementById('drill-complete-stats').textContent =
    `${drillSessionCorrect} / ${drillSessionTotal} correct (${pct}%) in ${mins}:${secs.toString().padStart(2, '0')}`;

  document.getElementById('drill-complete').classList.remove('hidden');

  await saveSession({
    date: new Date().toISOString(),
    mode: 'drill',
    level: drillLevel,
    duration: elapsed,
    correctCount: drillSessionCorrect,
    totalCount: drillSessionTotal,
  });
}

async function drillRestart() {
  drillSessionCorrect = 0;
  drillSessionTotal = 0;
  drillSessionStart = Date.now();
  await buildDrillQueue();
  drillNextCard();
}
