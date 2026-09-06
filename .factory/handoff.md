# Puzzle Late handoff

## Release

- Implementation commit: `cd2ed9aa0f223040c1cfb5d05502fa4772b2966a`
- Product: a zero-account browser anthology for daily-puzzle fans who want another short original deduction after the daily.
- Stack: Vite + vanilla TypeScript, static output in `dist/`.

## What was built

- A 40-puzzle anthology: 15 timing, 13 shadow, and 12 route deductions. Each entry has a valid selectable answer, two non-spoiler nudges, an accessible text-equivalent diagram, and a unique ending.
- The first five puzzles are playable free. The full 35-puzzle addition is preserved as a one-time-purchase deliverable but is visibly unavailable until the separate billing operator registers checkout and license validation.
- Direct active play on the first screen. A run has two marks; two wrong answers show a loss card with restart; a correct answer keeps the solved puzzle card on screen for its own ending and then offers the next free puzzle.
- `/demo` starts a populated sample run with Puzzles 1 and 2 complete and Puzzle 3 open. It uses `demo:puzzle-late:progress:v1`; real progress uses `puzzle-late:progress:v1`. Reset and Start for real are both implemented.
- Local progress, local settings, keyboard operation, touch targets, dark preference colors, reduced motion, native dialog focus, legal pages, sitemap, robots, static headers, and a designed 404 page.
- A paper-diorama-at-dusk visual system with local Fraunces and Atkinson Hyperlegible fonts. The social image is original factory-generated art with its prompt/provenance sidecar; gameplay art is hand-authored CSS/SVG.

## Verification

From a clean dependency install (`npm ci`):

- `npm test` — passed: 4 unit tests and 22 Playwright checks across desktop and phone emulation.
- `npm run test:claims` — passed: the authored-content unit claim plus 16 desktop/phone outcome checks.
- `npm run build` — passed; output is `dist/`. The initial bundle is 12.31 KB gzip JavaScript and 4.21 KB gzip CSS.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4174/ …` against the built preview — passed: title, `lang`, one h1, main landmark, alt/button checks, and no console errors. Preview load recorded at 577 ms.
- Playwright axe integration — passed in both desktop and phone runs with no serious or critical violations.
- Lighthouse mobile preview — 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO. FCP/LCP 1.2 s, TBT 30 ms, CLS 0, total transfer 53 KiB.
- Frame sampling on the built 390 px preview recorded 120 `requestAnimationFrame` intervals with a 16.67 ms mean and median (about 60 fps). This is a local headless measurement, not a public performance claim; Puzzle Late has no continuous simulation loop.

Browser run evidence: from `/demo`, selected the correct answer for “Blue kettle” and reached the ending “Steam turns into a small blue paper moon.” Submitted two wrong answers to reach “This page folded away,” then restarted and restored two marks. The browser suite also tested keyboard answer submission, a locked anthology-card explanation, settings persistence, route titles, unknown-route recovery, and demo isolation.

## Public offer metadata

`/work/.evidence/billing-offer.json` and `.factory/billing-offer.json` record the actual state: the brief calls for a one-time anthology, but no public price, currency, checkout, or license validation path has been registered. These values are intentionally null rather than guessed. Purchase and activation must not be claimed until the billing-registration operator completes that dependency.

## Known gap and next step

The sole product dependency is billing registration for the planned one-time full anthology. Register a price/currency, checkout return, and license-validation path with the separate operator, then replace the unavailable button with a real verified flow. The free five-puzzle game is complete and independent of that work.
