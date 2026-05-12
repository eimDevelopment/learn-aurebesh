let drillQueue = [];
let drillCurrent = null;
let drillMode = 'choice';
let drillLevel = 'letters';
let drillSessionCorrect = 0;
let drillSessionTotal = 0;
let drillSessionStart = 0;
let drillCurrentHintText = '';

const CHOICE_THRESHOLD = 3;
const WORD_BASE_FONT = 72;
const WORD_MAX_CHARS = 4;

function scaleWordFont(glyphEl) {
  const len = glyphEl.textContent.length;
  if (len <= WORD_MAX_CHARS) {
    glyphEl.style.fontSize = WORD_BASE_FONT + 'px';
    glyphEl.style.letterSpacing = '4px';
    return;
  }
  const scale = WORD_MAX_CHARS / len;
  const size = Math.max(Math.round(WORD_BASE_FONT * scale), 28);
  const spacing = Math.max(Math.round(4 * scale), 1);
  glyphEl.style.fontSize = size + 'px';
  glyphEl.style.letterSpacing = spacing + 'px';
}
let selectedLevel = null;
let selectedWordLen = null;
let selectedWordTier = null;
let selectedDrillMode = 'choice';

function isWordDrill() {
  return drillLevel !== 'letters' && drillLevel !== 'similar';
}

function getWordFromId(id) {
  return id.split(':')[1];
}

function getWordLenFromLevel() {
  const parts = drillLevel.replace('words', '').split('-');
  return parseInt(parts[0]);
}

function getWordTierFromLevel() {
  const parts = drillLevel.replace('words', '').split('-');
  return parseInt(parts[1]) || 3;
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
  clearDrillSelection();
}

function clearDrillSelection() {
  selectedLevel = null;
  selectedWordLen = null;
  selectedWordTier = null;
  selectedDrillMode = 'choice';
  document.querySelectorAll('#drill-level-select .btn-level').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('#drill-word-options .btn-pick').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('#drill-mode-row .btn-pick').forEach((el, i) => {
    el.classList.toggle('selected', i === 0);
  });
  document.getElementById('drill-word-options').classList.add('hidden');
  document.getElementById('drill-mode-picker').classList.add('hidden');
  document.getElementById('drill-start-row').classList.add('hidden');
}

function selectDrillLevel(level) {
  selectedLevel = level;
  selectedWordLen = null;
  selectedWordTier = null;
  document.querySelectorAll('#drill-level-select .btn-level').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('#drill-word-options .btn-pick').forEach(el => el.classList.remove('selected'));
  event.target.classList.add('selected');

  if (level === 'words') {
    document.getElementById('drill-word-options').classList.remove('hidden');
    document.getElementById('drill-mode-picker').classList.remove('hidden');
    document.getElementById('drill-start-row').classList.add('hidden');
  } else {
    document.getElementById('drill-word-options').classList.add('hidden');
    document.getElementById('drill-mode-picker').classList.remove('hidden');
    updateStartRow();
  }
}

function selectWordLen(len) {
  selectedWordLen = len;
  document.querySelectorAll('#drill-len-row .btn-pick').forEach(el => el.classList.remove('selected'));
  event.target.classList.add('selected');
  updateStartRow();
}

function selectWordTier(tier) {
  selectedWordTier = tier;
  document.querySelectorAll('#drill-tier-row .btn-pick').forEach(el => el.classList.remove('selected'));
  event.target.classList.add('selected');
  updateStartRow();
}

function selectDrillMode(mode) {
  selectedDrillMode = mode;
  document.querySelectorAll('#drill-mode-row .btn-pick').forEach(el => el.classList.remove('selected'));
  event.target.classList.add('selected');
}

function updateStartRow() {
  const startRow = document.getElementById('drill-start-row');
  const info = document.getElementById('drill-start-info');

  if (selectedLevel === 'letters') {
    info.textContent = '26 letters';
    startRow.classList.remove('hidden');
  } else if (selectedLevel === 'similar') {
    info.textContent = 'Confused pairs';
    startRow.classList.remove('hidden');
  } else if (selectedLevel === 'words' && selectedWordLen && selectedWordTier) {
    info.textContent = SESSION_SIZES[selectedWordTier] + ' cards';
    startRow.classList.remove('hidden');
  } else {
    startRow.classList.add('hidden');
  }
}

async function startSelectedDrill() {
  let level;
  if (selectedLevel === 'letters' || selectedLevel === 'similar') {
    level = selectedLevel;
  } else if (selectedLevel === 'words' && selectedWordLen && selectedWordTier) {
    level = 'words' + selectedWordLen + '-' + selectedWordTier;
  } else {
    return;
  }
  drillLevel = level;
  drillSessionCorrect = 0;
  drillSessionTotal = 0;
  drillSessionStart = Date.now();
  document.getElementById('drill-level-select').classList.add('hidden');
  await buildDrillQueue();
  drillNextCard();
}

async function buildDrillQueue() {
  if (isWordDrill()) {
    const wordLen = getWordLenFromLevel();
    drillQueue = getWordList(wordLen).map(w => 'w' + wordLen + ':' + w);
    shuffleArray(drillQueue);
  } else {
    const allProgress = await getAllProgress();
    const progressMap = {};
    for (const p of allProgress) {
      progressMap[p.charId] = p;
    }

    const due = [];
    const learning = [];
    const fresh = [];

    const charIds = drillLevel === 'similar'
      ? [...new Set(CONFUSABLE_PAIRS.flatMap(p => p.ids))]
      : ALL_CHARS.map(c => c.id);
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

    shuffleArray(due);
    shuffleArray(learning);
    shuffleArray(fresh);

    drillQueue = [...due, ...learning, ...fresh];

    if (drillQueue.length === 0) {
      if (drillLevel === 'similar') {
        drillQueue = [...new Set(CONFUSABLE_PAIRS.flatMap(p => p.ids))];
      } else {
        drillQueue = ALL_CHARS.map(c => c.id);
      }
      shuffleArray(drillQueue);
    }
  }

  const tier = isWordDrill() ? getWordTierFromLevel() : 1;
  const sessionLimit = SESSION_SIZES[tier] || 10;
  if (drillQueue.length > sessionLimit) {
    drillQueue = drillQueue.slice(0, sessionLimit);
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
  if (selectedDrillMode === 'auto') {
    drillMode = (record && record.consecutiveCorrect >= CHOICE_THRESHOLD) ? 'type' : 'choice';
  } else {
    drillMode = selectedDrillMode;
  }

  const glyphEl = document.getElementById('drill-glyph');

  if (isWordDrill()) {
    const word = getWordFromId(drillCurrent);
    glyphEl.textContent = toAurebeshText(word);
    glyphEl.classList.add('word-glyph');
    scaleWordFont(glyphEl);
    drillCurrentHintText = '';
  } else {
    const ch = getCharById(drillCurrent);
    glyphEl.textContent = ch.render;
    glyphEl.classList.remove('word-glyph');
    glyphEl.style.fontSize = '';
    glyphEl.style.letterSpacing = '';
    drillCurrentHintText = getPinnedHintText(ch, record);
  }

  document.getElementById('drill-card').classList.remove('hidden');
  document.getElementById('drill-count').textContent = `${drillQueue.length + 1} remaining`;

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
