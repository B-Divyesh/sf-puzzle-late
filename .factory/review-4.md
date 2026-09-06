# Review 4 — Solve visual deduction puzzles

## Verdict: PASS

- Finding count: **0**
- Untested claim count: **0**
- Candidate implementation reviewed: `9ba4ada51159d6de6304154f45affc55ba3bacf4` (`fix: disclose generated social artwork`)
- Documentation baseline reviewed: `9dc12ebb437b0c7a2fe1053f68e65e06378bc98a` (`docs: record verification 4 pass`)
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

**PASS — 0 findings and 0 untested claims.** The current documentation commits change reports only. The live JavaScript and CSS byte-match a fresh production build of the implementation candidate.

## First screen and game run

Fresh desktop (1280×720) and phone (390×664) browser contexts opened the live home page before scrolling.

- Job: **Solve visual deduction puzzles**.
- Audience: **For daily-puzzle fans who want another short challenge now.**
- First action: **Try it with sample data**. Its adjacent text says **Opens Puzzle 3 with two completed.**

The game is already playable in the first screen. The game card begins at y=117.44 and its first answer ends at y=579.33 on desktop; on phone they are y=295.81 and y=646.69, inside the 664 px viewport.

One click opened `/demo`, showed the persistent **Demo — sample data, nothing is saved.** label, loaded Puzzle 3 with two completed samples, revealed both nudges, and selected **Cup**. The result was the focused **Puzzle complete** card with the ending “Steam turns into a small blue paper moon.” Reload retained three sample completions; **Reset demo** restored exactly two. The fresh sessions had no page errors or console errors and requested only `https://puzzle-late.sociobot.in`.

The complete live suite also exercised two rejected answers and the **Puzzle lost** screen, restart with two marks, real/demo storage isolation and exit, settings persistence and reset, locked-puzzle feedback, keyboard/focus behavior, reduced motion, legal pages, the five-free boundary, and the designed unknown-route recovery page. All 42 desktop and phone checks passed.

## Clean checkout and public claims

A detached clean checkout at `9ba4ada` used the documented Node 22 and npm setup. `npm ci` installed 63 packages with 0 reported vulnerabilities. `npm run build` passed and produced `dist/`; initial JavaScript is 40,761 bytes (13,133 bytes gzip), CSS is 16,525 bytes (4,552 bytes gzip), and the browser-loaded WOFF2 fonts total 35,304 bytes. `npm test` passed: 7 Vitest checks and 42 Playwright checks.

Every command declared in `.factory/claims.json` was run separately from that checkout and passed.

| Claim | Result |
| --- | --- |
| `authored-content` | Pass — both rejected choices, restart, the audited answer, and the ending were exercised for every puzzle in desktop and phone. |
| `spoiler-free-nudges` | Pass — all 80 nudges are distinct and do not name answer-only words or positions. |
| `anthology-count` | Pass — 15 timing, 13 shadow, and 12 route puzzles. |
| `free-five` | Pass — each of the five free puzzles exposes answers and nudges. |
| `two-marks-two-nudges` | Pass — active play starts with two marks, exposes two nudges, and moves keyboard focus after the second. |
| `demo-isolated` | Pass — demo play, reset, and exit do not change real progress. |
| `demo-persists` | Pass — sample completion persists only in demo storage after reload. |
| `local-only` | Pass — progress survives reload and gameplay requests stay same-origin. |
| `puzzle-ending` | Pass — a correct deduction reaches its named completion card and ending. |
| `restart-reset` | Pass — two wrong answers lose and restart restores two marks. |
| `settings-persist` | Pass — still motion remains set after reload. |
| `real-reset` | Pass — Settings clears local completions while retaining still motion. |
| `billing-unavailable` | Pass — purchasing is disabled and makes no checkout or billing request. |

No visitor-facing claim was missing from the register, false, incomplete, or untested.

## Routes, accessibility, privacy, and delivery

- `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, `robots.txt`, and `sitemap.xml` return 200. `/not-a-puzzle` deliberately returns 404 and renders the styled recovery page; that expected status is not a finding.
- The live URL check passed in 633 ms: descriptive title, `lang="en"`, one h1, a main landmark, no missing image alt attributes, no unlabeled buttons, and no console errors.
- The live browser axe checks passed on home, demo, legal routes, standalone 404, in-app missing page, and dark preference in both profiles, with no serious or critical violations.
- Keyboard play, modal focus containment and Escape, focus return, end-state and route focus, browser history, 44 px visible targets, 200% text-size behavior, and reduced-motion behavior all passed in the live suite.
- The product has no account, analytics, ads, publisher archive, payment request, AI runtime, third-party runtime, backend, multiplayer, offline/update, installation, CLI/library, or public frame-rate promise. Those checks are not applicable.
- Live hashed JavaScript SHA-256 is `bed513389482772b8e490e9796895eb47235c429d491172f955126d564329ebe`; CSS is `6e6ec58e62635618fb3cf3bcc13c59810b4e3a252cf57f07b75c78401e036ea0`, matching the fresh build. Hashed assets have immutable one-year caching. CSP with response-header `frame-ancestors`, HSTS, `nosniff`, referrer policy, and permissions policy are present.
- The generated-social-art disclosure, **Social preview artwork was generated for Puzzle Late.**, appears in every shared application footer and the standalone public 404 footer.

## Earlier finding disposition

| Earlier finding | Current disposition |
| --- | --- |
| Verification 1 F-01 through F-12 | Resolved and rechecked through the first-screen, focus, target, route, 404, free-boundary, nudge, claim, cache, and loss-state checks. |
| Review 2 F-01 — Puzzles 26, 35, and 40 had invalid deductions | Resolved — the independent 40-puzzle audit exercised each invalid and valid outcome in both profiles. Puzzle 26 uses the higher near-midday sun; Puzzles 35 and 40 now have one/two/zero named crossing choices. |
| Review 2 — `authored-content` claim was incomplete | Resolved — its declared browser test submits both rejected answers, restarts, and verifies the valid ending for all 40 puzzles. |
| Review 3 F-01 — public generated-art disclosure missing | Resolved — the disclosure was present on home, demo, privacy, terms, SPA missing page, and standalone 404 in both profiles. |

Billing registration remains an external operator task, not a product defect. The release plainly says buying is unavailable, keeps the remaining 35 anthology puzzles locked, exposes no price or checkout, and tests that no billing request occurs.

## Evidence

The live URL-check output and screenshots are in `/work/.evidence/puzzle-late-review-4/`. The required factory copies are `/work/.evidence/qa-report.md` and `/work/.evidence/qa-result.json`.
