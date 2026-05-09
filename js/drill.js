let drillQueue = [];
let drillCurrent = null;
let drillMode = 'choice';
let drillSessionCorrect = 0;
let drillSessionTotal = 0;
let drillSessionStart = 0;
let drillCurrentHintText = '';

const CHOICE_THRESHOLD = 3;

function initDrill() {
  document.getElementById('drill-type-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') drillSubmitTyped();
  });
}

async function showDrill() {
  drillSessionCorrect = 0;
  drillSessionTotal = 0;
  drillSessionStart = Date.now();
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

  for (const group of LEARN_GROUPS) {
    for (const id of group) {
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
    drillQueue = ALL_CHARS.map(c => c.id);
    shuffleArray(drillQueue);
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
  const ch = getCharById(drillCurrent);

  let record = await getProgress(drillCurrent);
  drillMode = (record && record.consecutiveCorrect >= CHOICE_THRESHOLD) ? 'type' : 'choice';
  drillCurrentHintText = getPinnedHintText(ch, record);

  document.getElementById('drill-glyph').textContent = ch.render;
  document.getElementById('drill-card').classList.remove('hidden');
  document.getElementById('drill-count').textContent = `${drillQueue.length} remaining`;

  document.getElementById('drill-feedback').classList.add('hidden');
  document.getElementById('drill-choice-btns').classList.add('hidden');
  document.getElementById('drill-type-area').classList.add('hidden');
  document.getElementById('drill-complete').classList.add('hidden');

  if (drillMode === 'choice') {
    showChoiceMode(ch);
  } else {
    showTypeMode();
  }
}

function showChoiceMode(correct) {
  const options = [correct];
  const others = ALL_CHARS.filter(c => c.id !== correct.id);
  shuffleArray(others);
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

function showTypeMode() {
  const area = document.getElementById('drill-type-area');
  area.classList.remove('hidden');
  const input = document.getElementById('drill-type-input');
  input.value = '';
  input.focus();
}

async function drillSubmitTyped() {
  const input = document.getElementById('drill-type-input');
  const answer = input.value.trim().toLowerCase();
  const ch = getCharById(drillCurrent);

  if (!answer) return;

  input.disabled = true;

  if (answer === ch.letter) {
    input.classList.add('correct');
    showFeedback(true, ch);
    await recordDrillAnswer(1);
  } else {
    input.classList.add('incorrect');
    showFeedback(false, ch);
    await recordDrillAnswer(0);
  }

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
