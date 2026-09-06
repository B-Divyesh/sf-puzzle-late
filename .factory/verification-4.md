# Verification 4 — Solve visual deduction puzzles

## Verdict: PASS

- Finding count: **0**
- Untested claim count: **0**
- Candidate implementation reviewed: `9ba4ada51159d6de6304154f45affc55ba3bacf4` (`fix: disclose generated social artwork`)
- Documentation baseline reviewed: `1a3c90b351702ba0e113da210c6f9024d5ec1f2b` (`docs: pin repair revisions`)
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

**PASS — 0 findings and 0 untested claims.** The live static product byte-matches the fresh build of the implementation candidate. The later documentation commit changes only `.factory/handoff.md`.

## First screen and sample run

Fresh desktop (1280×720) and phone (390×664) browser contexts opened the live home page before scrolling.

- Job: **Solve visual deduction puzzles**.
- Audience: **For daily-puzzle fans who want another short challenge now.**
- First action: **Try it with sample data**. The adjacent text says **Opens Puzzle 3 with two completed.**

The game itself is usable on the first screen. On desktop its card starts at y=117.44 and the first answer ends at y=579.33. On phone it starts at y=295.81 and the first answer ends at y=646.69 inside the 664 px viewport.

In each fresh context, one click entered `/demo`, showed the persistent **Demo — sample data, nothing is saved.** label, loaded Puzzle 3 with two completed samples, revealed both nudges, and selected **Cup**. The focused **Puzzle complete** card appeared. Reload kept three sample completions; **Reset demo** restored exactly two. Browser console and page-error lists were empty.

The full live suite also completed the loss path with the two rejected answers, restarted the same puzzle with two marks, checked real/demo storage isolation and exit, settings persistence and reset, locked-puzzle feedback, keyboard focus, reduced motion, legal routes, and the free-five boundary. It passed all 42 desktop and phone checks.

## Clean checkout and claims

A detached clean worktree at documentation baseline `1a3c90b` used the documented Node 22 and npm setup. `npm ci` installed 63 packages with 0 reported vulnerabilities. `npm run build` passed and produced `dist/`; production JavaScript is 40,761 bytes (13,138 bytes gzip), CSS is 16,525 bytes (4,565 bytes gzip), and the browser-loaded WOFF2 fonts total 35,304 bytes.

`npm test` passed: 7 Vitest checks and 42 Playwright checks. Every command declared in `.factory/claims.json` was also run separately from the clean checkout.

| Claim | Result |
| --- | --- |
| `authored-content` | Pass — both rejected choices, restart, the audited answer, and the unique ending were exercised for all 40 puzzles in desktop and phone projects. |
| `spoiler-free-nudges` | Pass — all 80 nudges are distinct and avoid answer-only words and named answer positions. |
| `anthology-count` | Pass — 15 timing, 13 shadow, and 12 route puzzles. |
| `free-five` | Pass — all five free puzzles expose answers and nudges. |
| `two-marks-two-nudges` | Pass — two marks, two optional nudges, and keyboard focus after the second nudge. |
| `demo-isolated` | Pass — demo play, reset, and exit do not alter real progress. |
| `demo-persists` | Pass — sample completion persists after reload only in demo storage. |
| `local-only` | Pass — progress survives reload and observed gameplay requests remain same-origin. |
| `puzzle-ending` | Pass — a correct deduction reaches its named completion card and ending. |
| `restart-reset` | Pass — two wrong answers lose and restart restores two marks. |
| `settings-persist` | Pass — still-motion remains set after reload. |
| `real-reset` | Pass — Settings clears local completions while retaining the motion setting. |
| `billing-unavailable` | Pass — purchase remains disabled; there is no checkout or billing request. |

There are 13 claim records and exactly one matching tagged test for each. Landing copy, metadata, README, demo documentation, legal pages, and footer were cross-checked against the register. No public claim was false, incomplete, unlisted, or untested.

## Live routes, accessibility, privacy, and performance

- `/`, `/demo`, `/privacy`, `/terms`, and `/404.html` returned 200. `/not-a-puzzle` deliberately returned 404 with the designed recovery page; this expected HTTP status is not a defect.
- The product URL checker passed in 636 ms with no console errors, a descriptive title, `lang="en"`, one h1, a main landmark, no missing image alt attributes, and no unlabeled buttons.
- Live axe checks passed in desktop and phone projects for home, demo, privacy, terms, standalone 404, and in-app missing pages, with no serious or critical violations.
- The full live browser suite passed its keyboard, focus trap, Escape, focus return, end-state focus, route-change focus, history, touch-target, 200% text-size, and reduced-motion checks. The static product does not promise offline reload/update, installation, a backend, rate limits, multiplayer, AI, or a public frame-rate target.
- The sample run made same-origin requests only. It has no account, analytics, ads, publisher archive, payment request, or third-party runtime. Real and demo progress use separate local-storage keys; the tested reset and exit paths preserve real data.
- Security headers include CSP with response-header `frame-ancestors`, HSTS, `nosniff`, referrer policy, and permissions policy. Hashed JavaScript and CSS use `Cache-Control: public, max-age=31536000, immutable`.
- Fresh-build and live SHA-256 values match: JavaScript `bed513389482772b8e490e9796895eb47235c429d491172f955126d564329ebe`; CSS `6e6ec58e62635618fb3cf3bcc13c59810b4e3a252cf57f07b75c78401e036ea0`.
- Fresh mobile Lighthouse scored Performance 100, Accessibility 100, Best Practices 100, and SEO 100. FCP and LCP were 1.2 s, TBT 30 ms, CLS 0.036, and total transfer 54 KiB.
- The generated-social-art disclosure, **Social preview artwork was generated for Puzzle Late.**, is present on every application footer and the standalone public 404 footer.

## Earlier finding disposition

All earlier findings, including minor findings, were read and rechecked.

| Earlier finding | Current disposition |
| --- | --- |
| Verification 1 F-01 through F-12 | Resolved and covered again by first-screen, focus, target, navigation, 404, boundary, nudge, claim, cache, and loss-state checks. |
| Review 2 F-01 — Puzzles 26, 35, and 40 had invalid deductions | Resolved — the independent 40-puzzle browser outcome audit passed on both profiles. |
| Review 2 — authored-content claim was incomplete | Resolved — every rejected and valid answer outcome is now exercised in the declared claim test. |
| Review 3 F-01 — public generated-art disclosure missing | Resolved — the disclosure is visible on home, demo, privacy, terms, SPA missing page, and standalone 404; desktop and phone regression coverage passes. |

Billing registration remains an external operator task, not a product defect: the release plainly says buying is unavailable, keeps the 35 paid puzzles locked, exposes no price or checkout, and tests that no billing request occurs.

## Evidence

Live URL-check screenshots and JSON, plus the Lighthouse JSON, are in `/work/.evidence/puzzle-late-verify-4/`. The required copied report is `/work/.evidence/qa-report.md`.
