let drillQueue = [];
let drillCurrent = null;
let drillRevealed = false;
let drillSessionCorrect = 0;
let drillSessionTotal = 0;
let drillSessionStart = 0;

function initDrill() {}

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

function drillNextCard() {
  drillRevealed = false;

  if (drillQueue.length === 0) {
    drillShowComplete();
    return;
  }

  drillCurrent = drillQueue.shift();
  const ch = getCharById(drillCurrent);

  document.getElementById('drill-glyph').textContent = ch.render;
  document.getElementById('drill-answer').textContent = '';
  document.getElementById('drill-answer').classList.add('hidden');
  document.getElementById('drill-reveal-btn').classList.remove('hidden');
  document.getElementById('drill-grade-btns').classList.add('hidden');
  document.getElementById('drill-complete').classList.add('hidden');
  document.getElementById('drill-card').classList.remove('hidden');
  document.getElementById('drill-actions').classList.remove('hidden');
  document.getElementById('drill-count').textContent = `${drillQueue.length} remaining`;
}

function drillReveal() {
  drillRevealed = true;
  const ch = getCharById(drillCurrent);
  document.getElementById('drill-answer').textContent = `${ch.letter.toUpperCase()} - ${ch.name}`;
  document.getElementById('drill-answer').classList.remove('hidden');
  document.getElementById('drill-reveal-btn').classList.add('hidden');
  document.getElementById('drill-grade-btns').classList.remove('hidden');
}

async function drillGrade(quality) {
  drillSessionTotal++;
  if (quality > 0) drillSessionCorrect++;

  let record = await getProgress(drillCurrent);
  if (!record) {
    record = makeDefaultProgress(drillCurrent);
  }

  record = gradeCard(record, quality);
  await saveProgress(record);

  if (quality === 0) {
    const reinsert = Math.min(3 + Math.floor(Math.random() * 3), drillQueue.length);
    drillQueue.splice(reinsert, 0, drillCurrent);
  }

  drillNextCard();
}

async function drillShowComplete() {
  document.getElementById('drill-card').classList.add('hidden');
  document.getElementById('drill-actions').classList.add('hidden');
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
