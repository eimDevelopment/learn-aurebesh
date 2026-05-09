function gradeCard(record, quality) {
  record.totalAttempts++;

  if (quality === 0) {
    record.totalCorrect += 0;
    record.consecutiveCorrect = 0;
    record.repetitions = 0;
    record.interval = 0;
    record.easeFactor = Math.max(1.3, record.easeFactor - 0.2);
    record.status = 'learning';
  } else {
    record.totalCorrect++;
    record.consecutiveCorrect++;
    record.repetitions++;

    if (quality === 2) {
      record.easeFactor = Math.min(3.0, record.easeFactor + 0.15);
    }

    if (record.repetitions === 1) {
      record.interval = 1;
    } else if (record.repetitions === 2) {
      record.interval = 3;
    } else {
      record.interval = Math.round(record.interval * record.easeFactor);
    }

    if (record.consecutiveCorrect >= 5) {
      record.status = 'mastered';
    } else {
      record.status = 'learning';
    }
  }

  const now = Date.now();
  record.nextReview = now + record.interval * 24 * 60 * 60 * 1000;

  return record;
}

function isDueForReview(record) {
  if (record.status === 'new') return false;
  return Date.now() >= record.nextReview;
}
