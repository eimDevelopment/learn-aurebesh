# Aurebesh Learning PWA -- Implementation Plan

## Context
The existing Aurebesh Translator is an ML-based image recognition app (YOLO + CNN) that translates photos of Aurebesh text. The real-world accuracy gap makes it impractical, and the user's actual goal is learning to read Aurebesh fluently. Pivoting to a PWA-based learning tool: simpler to build, more useful, no ongoing costs.

## Step 1: Archive old code
Move all ML/Flask files into `archive/` at the project root. Nothing deleted.

**Move to `archive/`:**
- All 15 .py files, requirements.txt, setup.bat, start.bat
- templates/, static/, data/, models/, runs/, eval_output/, tests/, __pycache__/
- Root-level screenshot .png/.jpg files
- yolov8n.pt (if present)

**Keep in place:**
- `fonts/` (shared asset, used by the new PWA)
- `.claude/` (project config)

## Step 2: PWA file structure

```
index.html              # App shell, all screens
manifest.json           # PWA installability
sw.js                   # Service worker (offline)
css/
  style.css             # Dark theme, layout, components
  fonts.css             # @font-face declarations
js/
  app.js                # Router, screen switching, init
  data.js               # Character map, built-in word lists, toAurebeshText()
  db.js                 # IndexedDB wrapper
  srs.js                # Spaced repetition (SM-2)
  learn.js              # Learn mode
  drill.js              # Drill/flashcard mode
  read.js               # Read mode
  speak.js              # Web Speech API (optional)
  lists.js              # Custom word list CRUD
  progress.js           # Progress dashboard
icons/
  icon-192.png          # PWA icons
  icon-512.png
fonts/                  # Existing, stays in place
```

## Step 3: Data model (IndexedDB)

Database: `aurebesh-learner`

**progress store** (keyPath: charId) -- one record per character
- charId, letter, status (new/learning/mastered), easeFactor, interval, repetitions, nextReview, totalCorrect, totalAttempts

**wordlists store** (autoIncrement id) -- built-in + custom
- id, name, words[], isBuiltIn, createdAt

**sessions store** (autoIncrement id) -- activity log
- id, date, mode, duration, correctCount, totalCount

Simple settings in localStorage (font choice, speak toggle, streak).

## Step 4: Core features

### Learn mode
- Characters introduced in groups of 3, ordered by English frequency
- Groups: (e,t,a) > (o,i,n) > (s,h,r) > (d,l,u) > (c,m,f) > (p,g,w) > (y,b,v) > (k,j,x) > (q,z) > digraphs
- Card shows: large Aurebesh glyph, English letter, character name
- Swipe between characters in a group
- Next group unlocks when current group chars all have 1+ correct drill answer

### Drill mode
- Spaced repetition flashcards (simplified SM-2)
- Show Aurebesh glyph, user self-grades: Again / Good / Easy
- Wrong answers re-enter queue 3-5 cards later
- Mastery after 5 consecutive correct with increasing intervals
- Optional speak mode: say character name aloud instead of tapping

### Read mode (future)
- Displays words/phrases in Aurebesh font, tap to reveal English
- Sources: built-in word lists or custom lists
- Difficulty progresses from short words to phrases
- Optional speak mode: say the word aloud

### Custom lists (future)
- User creates named word lists (ship names, planet names, quotes, anything)
- Built-in lists: common English words, Star Wars planets, characters, ships
- Custom lists appear as sources in Read mode

### Progress dashboard (future)
- Mastered / learning / new breakdown (34 total characters)
- Character grid color-coded by status, tappable for details
- Daily streak counter
- Session history

## Step 5: Technical details

### Font rendering
- Aurebesh .otf fonts replace ASCII glyphs visually. "a" in the font renders as the Aurek glyph.
- Digraphs use Unicode substitution: th=thorn, sh=oslash, ch=ccedilla, ng=ntilde, ae=ae-ligature, eo=edieresis, kh=germandbls, oo=odieresis
- `toAurebeshText(str)` converts English text, replacing digraph pairs with their Unicode render chars before display

### Spaced repetition (SM-2 simplified)
- Correct: interval grows (1d > 3d > interval * easeFactor)
- Wrong: reset to 0, re-queue in current session
- easeFactor adjusts based on quality (min 1.3)
- Mastered = 5 consecutive correct

### Web Speech API (speak mode, future)
- Optional toggle, degrades gracefully if unsupported
- Single characters: user says character NAME (e.g., "aurek") not letter
- Words/phrases: standard speech recognition
- Supported in Chrome + Safari (covers most phones)

### Theme
- Dark background (#0a0a1a), card surface (#1a1a2e)
- Star Wars yellow accent (#FFE81F)
- Green/red for correct/incorrect
- Phone-first: large tap targets, swipe gestures

### Font license
- Pixel Sagas fonts: free for personal use, web embedding explicitly allowed
- Commercial use requires modest fee via pixelsagas.com
- Other font families (AF, Hand, Rodian, Typewriter): licenses unverified, check before distributing

## Build order

| Phase | What | Testable result |
|-------|------|-----------------|
| 1 | Archive old code | Clean project root |
| 2 | App shell + font rendering + router | Characters render on screen |
| 3 | Learn mode + IndexedDB | Browse character groups, mark learned |
| 4 | Drill mode + SRS | Flashcard session with progress saving |
| 5 | Read mode + built-in word lists | (future) |
| 6 | Custom lists | (future) |
| 7 | Progress dashboard | (future) |
| 8 | Speak mode | (future) |
| 9 | PWA infra (manifest, SW, icons) | (future) |
| 10 | Polish (onboarding, swipe, haptics) | (future) |

## Verification
- After Phase 2: open index.html in browser, confirm all 34 chars render correctly in Aurebesh font
- After Phase 4: complete a full drill session, close browser, reopen, verify progress persisted
- After Phase 8: test speak mode on Android Chrome and iOS Safari
- After Phase 9: run Lighthouse PWA audit, install on phone, toggle airplane mode, confirm offline works
- Throughout: test on phone browser via local network (python -m http.server or similar)

## Key files to reuse
- `char_map.py` -- port character data to JS (js/data.js)
- `fonts/Aurebesh.otf` -- primary display font
- `static/css/style.css` -- reference for color palette and dark theme values
- `generate_data.py` lines 43-53 -- validates how font renders digraph Unicode chars
