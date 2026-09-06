# Review 1 — Solve visual deduction puzzles

## Verdict: PASS

- Finding count: **0**
- Untested claim count: **0**
- Candidate implementation reviewed: `fb43ad6020bfb715056d473ddc568ca0d93a15ad`
- Documentation baseline reviewed: `a9d576068c5d613970d32117cd2443a2025257f9`
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

Commits after the implementation candidate change reports only. A fresh build of the candidate matches the live JavaScript and CSS byte for byte.

## First screen

- Job: solve visual timing, shadow, and route deductions.
- Audience: daily-puzzle fans who want another short challenge now.
- First action: **Try it with sample data**. The adjacent note says it opens Puzzle 3 with two completed samples.

The game is visible without scrolling. At 1280×720, its card begins at y=117 and the first answer ends at y=579. At 390×664, its card begins at y=296 and the first answer ends at y=647. The headline, audience, sample action, three facts, puzzle scene, goal, challenge, and first answer are therefore present on the initial screen.

Evidence: [desktop first screen](/work/.evidence/puzzle-late-review-1/live-desktop-first-screen.png) and [phone first screen](/work/.evidence/puzzle-late-review-1/live-phone-first-screen.png).

## Clean-checkout verification

A fresh clone at documentation baseline `a9d5760` was used. The documented prerequisites were installed with `npm ci` using Node 22.23.2 and npm 10.9.8. Installation completed with 0 reported vulnerabilities. Every command in `.factory/claims.json` was then run separately.

| Claim | Result |
| --- | --- |
| authored-content | Pass — one tagged unit test |
| spoiler-free-nudges | Pass — one tagged unit test |
| anthology-count | Pass — desktop and phone |
| free-five | Pass — desktop and phone |
| two-marks-two-nudges | Pass — desktop and phone |
| demo-isolated | Pass — desktop and phone |
| demo-persists | Pass — desktop and phone |
| local-only | Pass — desktop and phone |
| puzzle-ending | Pass — desktop and phone |
| restart-reset | Pass — desktop and phone |
| settings-persist | Pass — desktop and phone |
| real-reset | Pass — desktop and phone |
| billing-unavailable | Pass — desktop and phone |

There are 13 declared claims and exactly 13 matching `@claim:<id>` test tags. Public copy and README claims were cross-checked against the register; no unlisted or untested public claim was found.

`npm test` passed with 5 unit checks and 38 Playwright checks. `npm run build` passed and produced `dist/`. Built JavaScript is 40,587 bytes / 13,088 bytes gzip; CSS is 16,480 bytes / 4,551 bytes gzip. Loaded font files total 35,304 bytes. The initial transfer remains below the product budgets.

## Authored puzzle audit

All 40 puzzle records were inspected, not only the five playable without purchase. The collection has 15 timing, 13 shadow, and 12 route deductions. For every record:

- the prompt and diagram support the designated answer;
- that answer appears exactly once among the three controls;
- both nudges describe a deduction step without naming an answer-only word or answer position;
- the two nudges differ; and
- the record has its own ending.

The full-collection validation and both authored-content claim tests passed. The five free puzzles were each opened on desktop and phone. The remaining 35 are honestly listed and locked while purchase registration is unavailable.

## Live game runs

Fresh desktop and phone contexts independently completed this deterministic path:

1. Opened the live home page and selected **Try it with sample data**.
2. Confirmed the persistent **Demo — sample data, nothing is saved.** label, Puzzle 3 “Blue kettle,” two completed samples, two marks, two nudges, and three answers.
3. Revealed both nudges and selected **Cup**. The focused **Puzzle complete** ending showed “Steam turns into a small blue paper moon.”
4. Reloaded and confirmed three demo completions, then selected **Reset demo** and confirmed Puzzle 3 with exactly two sample completions.
5. Selected **Spoon** and **Kettle**. The focused **Puzzle lost** screen appeared.
6. Selected **Restart this puzzle** and confirmed the same puzzle, two marks, and restored heading focus.
7. Selected **Start for real** and confirmed that the demo key was deleted and the real progress value remained unchanged.

Only `https://puzzle-late.sociobot.in` was requested in either run. There were no console errors. The complete live Playwright suite also passed all 38 desktop/phone checks.

Evidence: [desktop win](/work/.evidence/puzzle-late-review-1/live-desktop-win.png), [desktop loss](/work/.evidence/puzzle-late-review-1/live-desktop-loss.png), [phone win](/work/.evidence/puzzle-late-review-1/live-phone-win.png), [phone loss](/work/.evidence/puzzle-late-review-1/live-phone-loss.png), and [recorded phone run](/work/.evidence/puzzle-late-review-1/live-phone-deterministic-run.webm).

## Accessibility, recovery, and routes

- The worker URL verifier passed in 665 ms: `lang="en"`, a descriptive title, one h1, one main landmark, alt coverage, labeled buttons, and no console errors.
- Live axe integration found no serious or critical violations on home, demo, privacy, terms, standalone 404, in-app missing page, or dark preference.
- Keyboard play, Space activation, modal focus containment, Escape close, opener restoration, end-state focus, route-change focus, and back/forward title restoration passed.
- Every visible link and button checked on desktop and phone is at least 44×44 CSS pixels. Focus rings are visible. A 200% text-size check found no clipped text or controls.
- Reduced motion produces automatic scrolling and 0.01 ms animation/transition durations. The saved still-motion setting provides the same behavior.
- `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, `robots.txt`, and `sitemap.xml` return 200. `/not-a-puzzle` deliberately returns 404 and renders the designed recovery page. This expected status is not an error.
- All recovery and product links on the checked routes resolve. Demo mode remains labeled on its privacy and terms routes.
- Invalid saved JSON recovers to a fresh game with an announced status. Settings can confirm and reset real progress without changing the motion choice.

## Privacy, security, and performance

- Gameplay, demo entry, reload, reset, and exit made same-origin requests only. No account, analytics, ad, AI, payment, publisher, or third-party runtime was present.
- Real and demo state use separate local-storage keys. The live isolation test compared real state before and after demo play and reset.
- CSP, HSTS, `nosniff`, referrer, and permissions headers are present. Hashed JavaScript is served with `public, max-age=31536000, immutable`.
- Fresh mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.1 s, LCP 1.1 s, TBT 0 ms, CLS 0.036, transfer 54 KiB.
- A fresh 390 px requestAnimationFrame sample measured 119 intervals at 16.67 ms mean / 16.7 ms median, about 60.0 fps. The game makes no public frame-rate claim and uses no timing-dependent simulation.
- Live/local SHA-256: JavaScript `2cf3d39b2897997fe716c510284de7c6814579bdc621a3e74c36752db2f66ed7`; CSS `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`.

The product makes no offline, install/update, backend, tenant, health, rate-limit, multiplayer, CLI, library, desktop-install, AI, or public frame-rate promise. Those checks are not applicable. The brief does not imply an AI, import/export, or sync step that would improve this authored single-player puzzle loop.

## Earlier finding disposition

All findings from `.factory/verification-1.md` were inspected and rechecked.

| Earlier finding | Current disposition |
| --- | --- |
| F-01 game below first screen | Resolved — game and first answer fit both tested viewports. |
| F-02 keyboard focus | Resolved — modal and end-state focus behavior passes live. |
| F-03 small touch targets | Resolved — all tested visible links and buttons meet 44 px. |
| F-04 dead Puzzles link | Resolved — legal routes reach and focus the shelf. |
| F-05 unknown route returned 200 | Resolved — unknown public URL returns the designed HTTP 404. |
| F-06 final free-puzzle boundary | Resolved — **Choose another free puzzle** replaces the false next action. |
| F-07 spoiler-free nudges | Resolved — all 80 nudges pass full-collection validation and inspection. |
| F-08 untested duration claim | Resolved — no public duration claim remains. |
| F-09 unsupported originality claim | Resolved — public wording is narrowed; internal provenance remains documented. |
| F-10 undeclared demo persistence | Resolved — declared and tested through reload. |
| F-11 short asset cache | Resolved — live hashed assets use one-year immutable caching. |
| F-12 metaphorical loss heading | Resolved — the heading is **Puzzle lost**. |

The earlier DNS/live blocker remains resolved. Billing registration remains an external operator dependency, but the product states that buying is unavailable, disables the purchase control, and makes no checkout request. It is not a defect in this candidate.

## Final result

**PASS — 0 findings and 0 untested claims.**
