# Aurebesh Learner

A phone-first web app for learning to read the Aurebesh alphabet (Star Wars). Learn letters with mnemonic hints, drill with spaced repetition flashcards, and reference the full character set.

Live at [learn-aurebesh.com](https://learn-aurebesh.com)

## How to run locally

Static HTML/CSS/JS with no build step. Serve the root directory:

```
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Stack

- Vanilla HTML/CSS/JS (no framework, no build tool)
- IndexedDB for progress persistence
- Custom Aurebesh font (Pixel Sagas, free for personal use)
- Hosted on GitHub Pages with custom domain via CNAME
