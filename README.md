# Puzzle Late

Puzzle Late is a one-player browser game for daily-puzzle fans who want another short deduction. Play the visible puzzle or choose **Try it with sample data**.

Live site: https://puzzle-late.sociobot.in

## What you play

- 40 visual deductions: 15 timing, 13 shadow, and 12 route puzzles.
- The first five puzzles are free. Every puzzle has one answer, two spoiler-free nudges, and an ending.
- A round ends after one correct answer or two wrong answers. Restart restores both marks.
- Progress can be reset in Settings. The optional still-motion setting stays set after reload.
- No account or tracking is needed. Play and progress stay in this browser.

`/demo` opens Puzzle 3 with two completed sample puzzles. Demo completion stays after reload, uses its own storage key, and never changes real progress. **Reset demo** restores the sample. **Start for real** deletes it.

The complete anthology is designed as a one-time purchase. Checkout and license activation are not registered in this release, so buying is intentionally unavailable. The 35 remaining authored puzzles stay listed as part of the complete anthology; they have not been made free to hide that dependency.

## Run locally

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open the URL shown by Vite. Use `/demo` for the isolated sample run.

## Verify

```sh
npm test
npm run build
```

`npm test` runs puzzle validation and browser checks in desktop and phone contexts. It covers demo isolation, reset, local progress, privacy requests, completion, routes, keyboard focus, touch targets, and accessibility.

To run all public-claim checks only:

```sh
npm run test:claims
```

## Deploy

This is a static Vite product. The deployment command is:

```sh
npm ci && npm run build
```

Deploy the resulting `dist/` directory. `staticwebapp.config.json` rewrites only the known app routes, returns the designed 404 for unknown URLs, and gives hashed assets immutable caching.

## Privacy and terms

The public pages are `/privacy` and `/terms`. The demo is documented in `.factory/demo.md`; visual and asset provenance is in `.factory/design.md`.
