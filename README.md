# Puzzle Late

Puzzle Late is a browser game for daily-puzzle fans who want another original short puzzle now. Start by opening the featured puzzle, or choose **Try it with sample data** for a resettable sample run.

Live site: https://puzzle-late.sociobot.in

## What you play

- 40 original visual deductions: 15 timing, 13 shadow, and 12 route puzzles.
- The first five puzzles are free. Each puzzle has two marks, two optional nudges, and a completion card.
- Progress and the optional still-motion setting are stored locally in the browser.
- No account, analytics, advertising, or third-party runtime requests are used.

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

`npm test` runs authored-puzzle validation and browser checks in desktop and phone contexts. It also runs the tagged outcome checks in `.factory/claims.json`, including demo isolation, reset, local progress, privacy requests, completion, and accessibility.

To run all public-claim checks only:

```sh
npm run test:claims
```

## Deploy

This is a static Vite product. The deployment command is:

```sh
npm ci && npm run build
```

Deploy the resulting `dist/` directory. `staticwebapp.config.json` carries the static-hosting headers, SPA fallback, and designed 404 response.

## Privacy and terms

The public pages are `/privacy` and `/terms`. The demo is documented in `.factory/demo.md`; visual and asset provenance is in `.factory/design.md`.
