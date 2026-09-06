# Verification 3 — Solve visual deduction puzzles

## Verdict: PASS

- Finding count: **0**
- Untested claim count: **0**
- Candidate implementation reviewed: `08cf7a9907c135bfc0a490f8c5ff97a813494478`
- Documentation baseline reviewed: `3c91994fd4ef9d771dda9a45ed8ecc116e9e7adf`
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

**PASS — 0 findings and 0 untested claims.** The documentation commit is report-only; production JavaScript and CSS byte-match a fresh build of implementation `08cf7a9`.

## First screen and game run

Fresh desktop (1280×720) and phone (390×664) contexts opened the live home page before scrolling.

- Job: **Solve visual deduction puzzles**.
- Audience: **For daily-puzzle fans who want another short challenge now.**
- First action: **Try it with sample data**; it says **Opens Puzzle 3 with two completed.**

The active game is on the first screen. The game card began at y=117.44 and the first answer ended at y=579.33 on desktop; on phone they were y=295.81 and y=646.69, within the 664 px viewport.

For each fresh desktop and phone context, the deterministic live run entered `/demo` in one click, showed the persistent **Demo — sample data, nothing is saved.** label, started Puzzle 3 with two sample completions, solved **Cup** to the focused **Puzzle complete** end screen and its ending, reset the demo, lost with **Spoon** then **Kettle**, and restarted with two marks. The sampled run made requests only to the product origin and had no console errors. Screenshots and the run record are in `/work/.evidence/puzzle-late-verify-3/`.

The full live Playwright suite passed all 40 desktop/phone checks. It includes keyboard play, end-state focus, dialog focus trapping and Escape, recovery from invalid storage, reset, legal navigation, designed 404, reduced motion, touch targets, and the deterministic 40-puzzle outcome audit.

## Clean-checkout verification

A detached worktree at documentation baseline `3c91994` was used. `npm ci` installed the documented prerequisites with 0 reported vulnerabilities. `npm run build` passed and produced `dist/`; the fresh build contains 40,663-byte JavaScript (13.12 KB gzip), 16,480-byte CSS (4.54 KB gzip), and 35,304 bytes of loaded WOFF2 font files. `npm test` passed: 7 unit checks and 40 browser checks.

Every command declared in `.factory/claims.json` was run separately from that clean checkout and passed:

| Claim | Result |
| --- | --- |
| authored-content | Pass — 40 independently audited answer paths: both rejected answers reach loss, restart restores play, and the audited answer reaches the unique ending. |
| spoiler-free-nudges | Pass — all 80 nudges are distinct and do not name an answer-only word or position. |
| anthology-count | Pass — 15 timing, 13 shadow, 12 route. |
| free-five | Pass — all five sample puzzles are playable. |
| two-marks-two-nudges | Pass — two marks, two optional nudges, and keyboard focus transition. |
| demo-isolated | Pass — demo completion/reset never changes real progress. |
| demo-persists | Pass — sample completion persists only in demo storage after reload. |
| local-only | Pass — progress persists locally and observed requests are same-origin only. |
| puzzle-ending | Pass — a correct deduction reaches the completion card and ending. |
| restart-reset | Pass — two wrong answers lose; restart restores two marks. |
| settings-persist | Pass — still-motion persists after reload. |
| real-reset | Pass — Settings clears local progress while retaining the motion choice. |
| billing-unavailable | Pass — purchase is disabled and makes no checkout or billing request. |

There are 13 registered public claims and exactly one matching tagged test for each. The landing page, legal pages, and README were cross-checked against the claim register. No unlisted, false, incomplete, or untested public claim was found.

## Live routes, accessibility, privacy, and performance

- `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, `robots.txt`, and `sitemap.xml` return 200. `/not-a-puzzle` deliberately returns 404 and renders the designed recovery page; this expected HTTP status is not a defect.
- The worker URL check passed in 612 ms with no console errors, `lang="en"`, one h1, a main landmark, no image missing alt text, and no unlabeled buttons.
- Independent live axe runs found **0 violations** across desktop and phone for home, demo, privacy, terms, standalone 404, and in-app missing page.
- All discovered internal product links from these routes returned 200. Browser route changes set the proper live titles (including `Demo — Puzzle Late`, `Privacy — Puzzle Late`, and `Terms — Puzzle Late`) and the suite verifies back/forward focus behavior.
- Reduced-motion live behavior has `scroll-behavior: auto` and 0.01 ms animation/transition durations. A keyboard run reaches the second nudge and focuses its newly revealed text. A 119-interval phone requestAnimationFrame sample averaged 16.67 ms (about 60.0 fps); the product makes no public frame-rate claim.
- The run observed only `https://puzzle-late.sociobot.in`; there is no account, analytics, ad, AI, publisher, payment, or third-party runtime request. Demo and real state use separate local-storage keys; reset and exit preserve real state.
- CSP, HSTS, `nosniff`, referrer, and permissions headers are present. The production hashed JavaScript has `Cache-Control: public, max-age=31536000, immutable`.
- Fresh local and live artifact SHA-256 values match: JavaScript `ffcf5970c2d6715300657f4de4aa83c032e20b3a2e6662d02f973ae316b68b2a`; CSS `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`.

The static single-player game does not promise offline reload/update, installation, backend persistence, tenant isolation, health endpoints, rate limits, multiplayer, CLI/library/desktop use, AI, or a public frame-rate target. Those checks are not applicable.

## Earlier finding disposition

| Earlier finding | Current disposition |
| --- | --- |
| Verification 1 F-01 — game below the first screen | Resolved — active game and first answer fit both fresh viewports. |
| Verification 1 F-02 — keyboard focus | Resolved — keyboard, dialog, nudge, route, win/loss, restart, and history focus checks pass live. |
| Verification 1 F-03 — touch targets | Resolved — live suite passes the 44 px checks on all checked routes. |
| Verification 1 F-04 — dead Puzzles link | Resolved — legal-page navigation reaches and focuses the shelf. |
| Verification 1 F-05 — unknown URL returned 200 | Resolved — unknown URL returns designed HTTP 404. |
| Verification 1 F-06 — false fifth-free next action | Resolved — **Choose another free puzzle** is shown. |
| Verification 1 F-07 — spoiler-free nudges | Resolved — complete nudge claim check passes. |
| Verification 1 F-08 — untested duration copy | Resolved — no public duration promise remains. |
| Verification 1 F-09 — unsupported originality copy | Resolved — public wording is narrowed; provenance remains in the design record. |
| Verification 1 F-10 — undeclared demo persistence | Resolved — separately declared and tested through reload. |
| Verification 1 F-11 — short hash-asset cache | Resolved — current live hash asset is one-year immutable. |
| Verification 1 F-12 — metaphorical loss heading | Resolved — live heading is **Puzzle lost**. |
| Review 2 F-01 — Puzzles 26, 35, and 40 invalid | Resolved — source and independent audit now show a near-midday high sun for 26 and exact 1/2/0 named-crossing choices for 35 and 40; all 120 answer outcomes pass live. |
| Review 2 untested authored-content claim | Resolved — the browser claim test exercises both invalid choices and the audited valid choice for every puzzle on desktop and phone. |

Billing registration remains an external operator dependency. The release accurately disables purchasing, does not expose a price or checkout, retains the locked 35 puzzles, and declares/tests that buying is unavailable. It is not a product defect in this candidate.
