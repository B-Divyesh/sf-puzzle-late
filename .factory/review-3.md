# Review 3 — Solve visual deduction puzzles

## Verdict: FAIL

- Finding count: **1**
- Untested claim count: **0**
- Candidate implementation reviewed: `08cf7a9907c135bfc0a490f8c5ff97a813494478`
- Documentation baseline reviewed: `efbbccf1d87f34b6fff7d0fa90cc5db2fa46c1ed`
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

**FAIL — 1 minor finding and 0 untested claims.** The game and all declared behavior pass, but the public site does not disclose its generated social image as required by the supplied image-generation contract.

## Finding

### F-01 — Minor — Generated imagery is not disclosed on the public site

`public/sf-puzzle-late-og.png` is a generated 1200×630 social image. Its prompt, date, model deployment, review, and derivatives are recorded in `.factory/design.md` and `public/sf-puzzle-late-og.png.json`. The image is original, contains no text, brand, person, or visible artifact, and is used by the Open Graph and Twitter metadata.

The supplied image-generation contract also requires generated imagery to be disclosed on a public About page or in the footer. The live site has no About page, and its footer says only **Built by Param Factory**. Internal provenance does not provide the required visitor-facing disclosure.

Required repair: add a short, plain disclosure to the shared footer, such as **Social preview artwork was generated for Puzzle Late**, while retaining the detailed provenance already recorded in `.factory/design.md`.

## First screen and deterministic run

Fresh desktop (1280×720) and phone (390×664) browser contexts opened the live home page before scrolling.

- Job: **Solve visual deduction puzzles**.
- Audience: **For daily-puzzle fans who want another short challenge now.**
- First action: **Try it with sample data**; the adjacent text says **Opens Puzzle 3 with two completed.**

The active game is on the first screen. The game begins at y=117.44 and the first answer ends at y=579.33 on desktop. On phone, the game begins at y=295.81 and the first answer ends at y=646.69 inside the 664 px viewport.

Each fresh context completed the same live run:

1. Completed Puzzle 1 in isolated real storage and recorded the value.
2. Entered `/demo` in one click and saw **Demo — sample data, nothing is saved.**, Puzzle 3, two completed samples, two marks, two nudges, and three answers.
3. Revealed both nudges by keyboard and confirmed focus followed the second nudge.
4. Selected **Cup** and reached the focused **Puzzle complete** end screen with “Steam turns into a small blue paper moon.”
5. Reloaded and confirmed three demo completions and byte-identical demo storage.
6. Reset the demo and confirmed two completions while the seeded real record remained byte-identical.
7. Selected **Spoon** and **Kettle**, reached the focused **Puzzle lost** screen, and restarted Puzzle 3 with two marks.
8. Selected **Start for real** and confirmed the demo key was deleted while the real record remained unchanged.

Both runs requested only the product origin and produced no console or page errors. Screenshots, videos, and the structured record are in `/work/.evidence/puzzle-late-review-3/`.

## Clean-checkout verification and claims

A detached checkout at documentation baseline `efbbccf` was used. Only `.factory/handoff.md` and `.factory/verification-3.md` differ from implementation commit `08cf7a9`, so the latter is the reviewed product candidate.

- `npm ci` passed with 63 packages and 0 reported vulnerabilities.
- `npm run build` passed and produced `dist/`.
- `npm test` passed: 7 unit checks and 40 browser checks.
- Built JavaScript is 40,663 bytes / 13.12 KB gzip; CSS is 16,480 bytes / 4.54 KB gzip. Loaded WOFF2 files total 35,304 bytes.

Every command in `.factory/claims.json` was then run separately from that checkout:

| Claim | Result |
| --- | --- |
| authored-content | Pass — all 120 answer outcomes were exercised on desktop and phone; each rejected pair reaches loss, restart restores play, and the independently audited choice reaches the distinct ending. |
| spoiler-free-nudges | Pass — all 80 nudges are distinct and avoid answer-only words and named answer positions. |
| anthology-count | Pass — 15 timing, 13 shadow, and 12 route puzzles. |
| free-five | Pass — each of the five free puzzles opens with answer and nudge controls. |
| two-marks-two-nudges | Pass — two marks, two optional nudges, and correct keyboard focus. |
| demo-isolated | Pass — demo play, reset, and exit do not alter real progress. |
| demo-persists | Pass — sample completion persists only in demo storage after reload. |
| local-only | Pass — progress persists locally and observed play requests are static same-origin resources only. |
| puzzle-ending | Pass — the audited answer reaches the completion card and ending. |
| restart-reset | Pass — two wrong answers lose; restart restores the puzzle and two marks. |
| settings-persist | Pass — still-motion remains set after reload. |
| real-reset | Pass — Settings clears local completions and retains the motion choice. |
| billing-unavailable | Pass — purchase stays disabled and no checkout or billing request occurs. |

There are 13 claim records and exactly one matching tagged test for each. The live copy, metadata, legal pages, README, and catalog description were cross-checked against the register. No false, incomplete, unlisted, or untested public claim was found.

The 40 puzzle records were also read against the separate solution fixture. Each prompt and diagram supports one listed answer, each rejected choice contradicts a stated condition, both nudges remain non-spoiler guidance, and each puzzle has a distinct ending. In particular, Puzzle 26 now uses a higher near-midday sun, and the alternate routes in Puzzles 35 and 40 contain two named crossings.

## Accessibility, routes, recovery, privacy, and performance

- The worker URL verifier passed in 613 ms with no console errors, `lang="en"`, one h1, one main landmark, complete image alt coverage, and no unlabeled button.
- Playwright axe returned 0 violations on desktop and phone for `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, and the deliberate unknown route.
- Keyboard answer play, nudge focus, dialog focus containment, Escape, opener restoration, route focus, back/forward titles, win/loss focus, and restart focus pass live.
- Every checked visible link and button meets 44×44 CSS px. Focus uses a visible 3 px `#0b5d6d` outline. A 200% text-size audit found no clipped text, hidden controls, or lost functionality.
- Reduced motion uses `scroll-behavior: auto` and 0.01 ms animation and transition durations.
- `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, `robots.txt`, and `sitemap.xml` return 200. `/not-a-puzzle` deliberately returns 404 with the designed recovery page; that expected status is not a defect.
- All discovered product links resolve. Demo state remains labeled on legal routes, and route titles are specific to Home, Demo, Privacy, Terms, and the missing page.
- Invalid saved JSON recovers to Puzzle 1 with the announced message **Saved progress could not be read. A fresh local game is ready.** The locked-puzzle, fifth-free boundary, reset-confirmation, loss, and restart paths pass.
- The observed sample flow requested only the document, hashed JavaScript, hashed CSS, and two local font files from `puzzle-late.sociobot.in`. There is no account, analytics, ad, AI, publisher, payment, or third-party runtime request.
- CSP, HSTS, `nosniff`, referrer, and permissions headers are present. Hashed JavaScript and CSS use one-year immutable caching.
- Live and clean-build artifacts byte-match. JavaScript SHA-256 is `ffcf5970c2d6715300657f4de4aa83c032e20b3a2e6662d02f973ae316b68b2a`; CSS SHA-256 is `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`.
- Fresh mobile Lighthouse scores are 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO. FCP and LCP are 1.2 s, TBT is 0 ms, CLS is 0.036, and transfer is 54 KiB.
- A fresh phone requestAnimationFrame sample recorded 119 intervals at 16.67 ms mean and about 60.0 fps. The product makes no public frame-rate claim and has no timing-dependent simulation.

The static single-player game does not promise offline reload or update behavior, installation, a backend, tenant isolation, health endpoints, rate limits, multiplayer, CLI/library/desktop use, AI, or a public frame-rate target. Those checks are not applicable. The authored puzzle loop does not imply a useful AI, import/export, or sync feature.

## Earlier finding disposition

| Earlier finding | Current disposition |
| --- | --- |
| Verification 1 F-01 — game below the first screen | Resolved — active play and the first answer fit both fresh viewports. |
| Verification 1 F-02 — keyboard focus | Resolved — keyboard, dialog, nudge, route, win/loss, restart, and history focus checks pass live. |
| Verification 1 F-03 — touch targets | Resolved — all checked visible targets meet 44 px. |
| Verification 1 F-04 — dead Puzzles link | Resolved — legal routes reach and focus the shelf. |
| Verification 1 F-05 — unknown URL returned 200 | Resolved — the unknown URL returns a designed HTTP 404. |
| Verification 1 F-06 — false fifth-free next action | Resolved — **Choose another free puzzle** is shown. |
| Verification 1 F-07 — spoiler-free nudges | Resolved — the complete nudge audit passes. |
| Verification 1 F-08 — untested duration copy | Resolved — no public duration promise remains. |
| Verification 1 F-09 — unsupported originality copy | Resolved — public wording is narrowed and internal asset provenance is recorded. |
| Verification 1 F-10 — undeclared demo persistence | Resolved — persistence is separately declared and tested through reload. |
| Verification 1 F-11 — short hash-asset cache | Resolved — live hashed assets use one-year immutable caching. |
| Verification 1 F-12 — metaphorical loss heading | Resolved — the heading is **Puzzle lost**. |
| Review 2 F-01 — invalid Puzzles 26, 35, and 40 | Resolved — repaired premises and all 120 browser outcomes pass. |
| Review 2 — untested authored-content claim | Resolved — the declared browser test now exercises every answer outcome on both viewports. |

Billing registration remains a separate operator dependency. The release accurately disables buying, exposes no price or checkout, keeps the 35 anthology puzzles locked, and tests that no billing request occurs. This is not a product defect.

## Input note

The full repository QA report `.factory/verification-3.md` was read before testing. The separately referenced `factory-evidence/puzzle-late-verify-3/qa-report.md` was not present anywhere in the supplied workspace, so this review independently reproduced its claimed checks instead of relying on that unavailable file.

## Final result

**FAIL — 1 minor finding and 0 untested claims.**
