let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }

    const req = indexedDB.open('aurebesh-learner', 1);

    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('progress')) {
        d.createObjectStore('progress', { keyPath: 'charId' });
      }
      if (!d.objectStoreNames.contains('sessions')) {
        d.createObjectStore('sessions', { autoIncrement: true });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    req.onerror = (e) => reject(e.target.error);
  });
}

function getProgress(charId) {
  return new Promise(async (resolve) => {
    const d = await openDB();
    const tx = d.transaction('progress', 'readonly');
    const req = tx.objectStore('progress').get(charId);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

function getAllProgress() {
  return new Promise(async (resolve) => {
    const d = await openDB();
    const tx = d.transaction('progress', 'readonly');
    const req = tx.objectStore('progress').getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => resolve([]);
  });
}

function saveProgress(record) {
  return new Promise(async (resolve, reject) => {
    const d = await openDB();
    const tx = d.transaction('progress', 'readwrite');
    tx.objectStore('progress').put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e.target.error);
  });
}

function saveSession(session) {
  return new Promise(async (resolve, reject) => {
    const d = await openDB();
    const tx = d.transaction('sessions', 'readwrite');
    tx.objectStore('sessions').add(session);
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e.target.error);
  });
}

function makeDefaultProgress(charId) {
  const letter = charId.includes(':') ? charId.split(':')[1] : (getCharById(charId)?.letter || '');
  return {
    charId: charId,
    letter: letter,
    status: 'new',
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    consecutiveCorrect: 0,
    nextReview: 0,
    totalCorrect: 0,
    totalAttempts: 0,
  };
}
