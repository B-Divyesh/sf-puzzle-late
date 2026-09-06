# Review 2 — Solve visual deduction puzzles

## Verdict: FAIL

- Finding count: **1**
- Untested claim count: **1**
- Candidate implementation reviewed: `fb43ad6020bfb715056d473ddc568ca0d93a15ad`
- Documentation baseline reviewed: `03a14c00c07172c939e209f23110a3ad31240adc`
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

Commits after the implementation candidate change reports only. A fresh production build matches the live JavaScript and CSS byte for byte.

## Finding

### F-01 — Major — The 40-puzzle anthology contains invalid deductions

The product claims that each of its 40 puzzles has one answer. Three authored puzzles do not meet that contract:

- Puzzle 35, **Indigo bridge**, asks for a route that uses the indigo bridge exactly once and reaches the island. Both **Dock → Indigo bridge → Island** and **Dock → Indigo bridge → Dock → Island** name the bridge once and end at the island. The second choice costs a mark. Its first nudge says the bridge must appear once, and its second tells the player to count the crossing name; those instructions also accept both choices.
- Puzzle 40, **Fold line**, asks for a route that crosses the fold line once and then stops at the studio. Both **Town → Fold line → Studio** and **Town → Fold line → Town → Studio** name the fold line once and end at the studio. The second choice costs a mark. Its nudges again tell the player to count the named crossing and accept a count of one.
- Puzzle 26, **Rose roof**, says the shortest roof shadow occurs at dusk and grades **The sun is higher** as correct. At dusk the sun is low or below the horizon, so this conflicts with the same puzzle's diagram, which correctly says a high sun makes a short shadow.

The `@claim:authored-content` command passes because it checks only that the configured `answer` string occurs once in the choices. It does not solve the clues, rule out other valid choices, or check the physical premise. The claim is therefore false and its test is incomplete. This accounts for the one untested claim.

Live evidence: [Puzzle 35 rejects another matching route](/work/.evidence/puzzle-late-review-2/live-puzzle-35-alternate-rejected.png), [Puzzle 40 rejects another matching route](/work/.evidence/puzzle-late-review-2/live-puzzle-40-alternate-rejected.png), and [all 40 designated ending runs](/work/.evidence/puzzle-late-review-2/all-puzzles-live.json).

## First screen

- Job: solve visual timing, shadow, and route deductions.
- Audience: daily-puzzle fans who want another short challenge now.
- First action: **Try it with sample data**. The adjacent text says it opens Puzzle 3 with two completed samples.

The game is visible before scrolling. At 1280×720, its card starts at y=117 and the first answer ends at y=579. At 390×664, its card starts at y=296 and the first answer ends at y=647.

Evidence: [desktop first screen](/work/.evidence/puzzle-late-review-2/live-desktop-first-screen.png) and [phone first screen](/work/.evidence/puzzle-late-review-2/live-phone-first-screen.png).

## Clean-checkout verification

A fresh clone at documentation baseline `03a14c0` was used with Node 22.23.2 and npm 10.9.8. `npm ci` installed 63 packages and reported no vulnerabilities. Every command in `.factory/claims.json` was run separately.

| Claim | Command result | Review result |
| --- | --- | --- |
| authored-content | 1 tagged unit test passed | **Fail** — structural test does not detect the invalid deductions in F-01 |
| spoiler-free-nudges | 1 tagged unit test passed | Pass |
| anthology-count | Desktop and phone passed | Pass |
| free-five | Desktop and phone passed | Pass |
| two-marks-two-nudges | Desktop and phone passed | Pass |
| demo-isolated | Desktop and phone passed | Pass |
| demo-persists | Desktop and phone passed | Pass |
| local-only | Desktop and phone passed | Pass |
| puzzle-ending | Desktop and phone passed | Pass |
| restart-reset | Desktop and phone passed | Pass |
| settings-persist | Desktop and phone passed | Pass |
| real-reset | Desktop and phone passed | Pass |
| billing-unavailable | Desktop and phone passed | Pass |

`npm test` passed with 5 unit checks and 38 Playwright checks. `npm run test:claims` passed with 2 unit outcomes and 22 browser outcomes. `npm run build` passed and produced `dist/`. The built JavaScript is 40,587 bytes, 13.12 KB gzip; CSS is 16,480 bytes, 4.54 KB gzip. Passing automated checks do not override F-01.

## Live game runs

Fresh desktop and phone contexts each completed this deterministic run:

1. Loaded the home page, recorded the first screen, and completed Puzzle 1 to seed an isolated real-progress value.
2. Selected **Try it with sample data** and confirmed `/demo`, the persistent **Demo — sample data, nothing is saved.** label, Puzzle 3, and two completed samples.
3. Revealed both nudges by keyboard and selected **Cup**. The focused **Puzzle complete** ending read “Steam turns into a small blue paper moon.”
4. Reloaded and confirmed three demo completions and byte-for-byte demo persistence.
5. Reset the demo and confirmed two completions while the seeded real-progress value stayed unchanged.
6. Selected **Spoon** and **Kettle**, reached the focused **Puzzle lost** screen, and restarted with two marks.
7. Selected **Start for real** and confirmed the demo key was deleted while real progress stayed unchanged.

Evidence: [run record](/work/.evidence/puzzle-late-review-2/live-run.json), [desktop video](/work/.evidence/puzzle-late-review-2/live-desktop-run.webm), [phone video](/work/.evidence/puzzle-late-review-2/live-phone-run.webm), [desktop win](/work/.evidence/puzzle-late-review-2/live-desktop-win.png), [desktop loss](/work/.evidence/puzzle-late-review-2/live-desktop-loss.png), [phone win](/work/.evidence/puzzle-late-review-2/live-phone-win.png), and [phone loss](/work/.evidence/puzzle-late-review-2/live-phone-loss.png).

The full live Playwright suite passed all 38 desktop and phone checks. A separate isolated demo-state audit opened every puzzle, revealed both nudges, selected its configured answer, and confirmed all 40 distinct ending strings. That proves the configured paths render; it does not resolve the clue defects in F-01.

## Accessibility, routes, and recovery

- The worker URL verifier passed in 669 ms with no console errors: `lang="en"`, one h1, one main landmark, alt coverage, and labeled buttons.
- Playwright axe found no serious or critical violations on home, demo, privacy, terms, standalone 404, in-app missing page, or dark preference.
- Keyboard answer selection, nudge focus, modal focus containment, Escape close, opener restoration, route focus, back/forward titles, and skip-link focus passed.
- Visible links and buttons met the 44 px minimum. A 200% text-size audit found no clipped text or controls.
- Reduced motion produced automatic scrolling and 0.01 ms animation duration. The saved still-motion setting behaved the same way.
- `/`, `/demo`, `/privacy`, `/terms`, `/404.html`, `robots.txt`, and `sitemap.xml` returned 200. `/not-a-puzzle` deliberately returned 404 with the designed recovery page.
- Every navigational product link returned 200. The only crawled 404 was the same-page skip fragment on the deliberate 404 document.
- Invalid saved JSON recovered to Puzzle 1 with an announced status. The fifth-free-puzzle boundary showed **Choose another free puzzle**.

## Privacy, security, and performance

- The complete sample runs requested only `https://puzzle-late.sociobot.in`. There were no console errors, page errors, account calls, analytics, ads, AI, payment calls, or third-party requests.
- Real and demo progress used separate local-storage keys. Demo play, reload, reset, and exit did not change the seeded real value.
- CSP, HSTS, `nosniff`, referrer, and permissions headers were present. Hashed JavaScript used `public, max-age=31536000, immutable`.
- Lighthouse mobile scored 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO: FCP 1.1 s, LCP 1.1 s, TBT 30 ms, CLS 0.036, and 54 KiB transfer.
- A 120-frame sample measured 59.0 fps on the desktop context and 60.0 fps on the phone context. The product makes no public frame-rate claim and has no timing-dependent simulation.
- Live/local SHA-256 matched: JavaScript `2cf3d39b2897997fe716c510284de7c6814579bdc621a3e74c36752db2f66ed7`; CSS `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`.

The product makes no offline, install/update, backend, tenant, health, rate-limit, multiplayer, CLI, library, desktop-install, AI, or public frame-rate promise. Those checks are not applicable. The brief does not imply an AI, import/export, or sync feature.

## Earlier finding disposition

All 12 findings in `.factory/verification-1.md` were rechecked.

| Earlier finding | Current disposition |
| --- | --- |
| F-01 game below first screen | Resolved — active play and the first answer fit both tested viewports. |
| F-02 keyboard focus | Resolved — modal, route, nudge, win, loss, and restart focus passed. |
| F-03 small touch targets | Resolved — tested visible targets meet 44 px. |
| F-04 dead Puzzles link | Resolved — legal routes reach and focus the shelf. |
| F-05 unknown route returned 200 | Resolved — unknown public URLs return the designed HTTP 404. |
| F-06 final free-puzzle boundary | Resolved — **Choose another free puzzle** is shown. |
| F-07 spoiler-free nudges | Resolved for direct answer disclosure — all 80 nudges pass the token audit. F-01 is a separate validity problem. |
| F-08 untested duration claim | Resolved — no public duration claim remains. |
| F-09 unsupported originality claim | Resolved — public wording is narrowed and internal provenance is documented. |
| F-10 undeclared demo persistence | Resolved — declared and tested through reload. |
| F-11 short asset cache | Resolved — live hashed assets use one-year immutable caching. |
| F-12 metaphorical loss heading | Resolved — the heading is **Puzzle lost**. |

The earlier DNS blocker remains resolved. Billing registration remains an external operator dependency and is accurately disclosed; the purchase control is disabled and makes no request.

## Required next step

Rewrite Puzzles 35 and 40 so exactly one choice satisfies each stated rule. Correct Puzzle 26's time-of-day premise. Add a semantic content review or independent solution fixture to the authored-content claim test, then deploy and review the new implementation.

**Final result: FAIL — 1 finding and 1 untested claim.**
