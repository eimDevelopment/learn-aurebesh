# Aurebesh Learner

Onboarded via /onboard-project on 2026-05-09

Phone-first PWA for learning to read the Aurebesh alphabet. Three modes: Learn (browse characters with mnemonic hints), Drill (spaced repetition flashcards), Reference (full character grid).

## Tech stack

- Vanilla HTML/CSS/JS, no framework or build tool
- Single index.html with screen switching via JS
- IndexedDB for user progress (spaced repetition state, custom hints, pinned hints)
- Custom Aurebesh .otf font from Pixel Sagas
- GitHub Pages hosting, custom domain via CNAME (learn-aurebesh.com)

## Folder map

- `css/` -- style.css (app styles), fonts.css (font-face declarations)
- `js/` -- app.js (router), data.js (character map, word lists, confusable pairs), db.js (IndexedDB), srs.js (spaced repetition), learn.js (learn mode + transform animations), drill.js (drill mode)
- `fonts/` -- Aurebesh .otf font files (only Aurebesh.otf is active, others gitignored)
- `icons/` -- PWA icons (not yet populated)
- `archive/` -- old ML/Flask translator code (gitignored)

## How to run

- `python -m http.server 8000` from the project root, open localhost:8000
- No build step, no dependencies to install
- Phone testing requires a tunnel (ngrok or similar) for a real URL; local IPs don't work

## Key conventions

- Font rendering: Aurebesh font replaces ASCII glyphs visually. Digraphs use Unicode substitution (th=thorn, sh=oslash, ch=ccedilla, etc.). See `toAurebeshText()` in data.js.
- Cache busting: index.html links CSS/JS with `?v=N` query params. Bump the version number when changing files.
- All screens defined in index.html, toggled via `.hidden` class. No routing library.
- Confusable pairs defined in data.js `CONFUSABLE_PAIRS` array with tips for distinguishing similar glyphs.

## Knowledge Retrieval

- If this project has a `wiki/` folder, read `wiki/index.md` at the start of any substantive project question.
- When Matt asks "what were we talking about" or "do you remember X", check `wiki/pages/current-priorities.md` and `wiki/log.md` first, then relevant pages.
- The wiki is the single source of truth for project knowledge. There is no separate memory folder.
- When Matt says "remember this" or "save this", offer to file it to the right wiki location (log entry for casual, new page for substantive, append to an existing page for related material).
