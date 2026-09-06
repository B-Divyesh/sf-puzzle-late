# Puzzle Late handoff

## Review 3

- Strict review verdict on 2026-09-06 UTC: **FAIL — 1 minor finding and 0 untested claims.**
- Reviewed implementation: `08cf7a9907c135bfc0a490f8c5ff97a813494478`; documentation baseline: `efbbccf1d87f34b6fff7d0fa90cc5db2fa46c1ed`.
- Product behavior is clean: all 13 claim commands passed separately, `npm test` passed with 7 unit and 40 browser checks, `npm run build` produced `dist/`, and all 40 live browser checks passed.
- Fresh desktop and phone contexts completed the sample win, loss, reload, reset, restart, and isolated exit. Live axe found 0 violations on 12 route/profile combinations. Lighthouse scored 100 in all four categories.
- The one remaining issue is documentation visible to visitors: the generated social preview image is fully recorded in `.factory/design.md`, but the supplied image-generation contract requires a disclosure in the public footer or an About page. No product code was changed during review.
- Required next step: add a short generated-social-art disclosure to the shared footer, deploy, and recheck the footer on home, demo, privacy, terms, and missing-page routes.
- Full report: `.factory/review-3.md`. Evidence: `/work/.evidence/puzzle-late-review-3/`.

## Verification 3

- Independent QA verdict on 2026-09-06 UTC: **PASS — 0 findings and 0 untested claims.**
- Reviewed implementation: `08cf7a9907c135bfc0a490f8c5ff97a813494478`; reviewed documentation baseline: `3c91994fd4ef9d771dda9a45ed8ecc116e9e7adf`.
- A clean detached checkout passed `npm ci`, every one of the 13 declared claim commands separately, `npm test` (7 unit and 40 browser checks), and `npm run build`.
- Fresh live desktop and phone contexts completed the demo win, loss, reset, restart, isolation, privacy, focus, route, and reduced-motion checks. The complete live suite passed all 40 checks. Live axe reported 0 violations; the worker URL verifier reported no console errors, one h1, `lang="en"`, a main landmark, and complete basic labels/alt coverage.
- Live JS/CSS byte-match the fresh candidate build: JS `ffcf5970c2d6715300657f4de4aa83c032e20b3a2e6662d02f973ae316b68b2a`, CSS `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`. Evidence is in `/work/.evidence/puzzle-late-verify-3/`; the full report is `.factory/verification-3.md`.
- All Verification 1 findings and Review 2’s semantic-deduction finding are now rechecked and resolved. Billing offer registration remains the only external follow-up; checkout stays disabled and is not a product-code gap.

## Release

- Verdict: repair 2 completed and verified locally and live on 2026-09-06 UTC.
- Implementation commit: `08cf7a9907c135bfc0a490f8c5ff97a813494478`.
- Live URL: `https://puzzle-late.sociobot.in`.
- Product: a one-player browser anthology for daily-puzzle fans who want another short timing, shadow, or route deduction.
- Stack: Vite and vanilla TypeScript. Static output is in `dist/`; there is no backend, shared database, or server-held product state.

## What changed

- Corrected Puzzle 26, **Rose roof**. It now compares a low morning sun with the higher near-midday sun, when a fixed roof casts a shorter shadow.
- Corrected Puzzle 35, **Indigo bridge**. Its alternate return route now names and crosses the indigo bridge twice, so only the direct route satisfies “exactly once”.
- Corrected Puzzle 40, **Fold line**. Its alternate return route now names and crosses the fold line twice, so only the direct route satisfies “once”.
- Added an independent 40-row solution fixture with a written deduction and a validity result for every choice.
- Replaced the structural authored-content claim check with a browser outcome test. It submits both rejected choices, reaches the loss state, restarts, submits the independently reviewed solution, and verifies the ending for all 40 puzzles on desktop and phone.
- Added direct regression checks for crossing counts and the roof-shadow calculation. Structural validation is now described as structural and no longer stands in for clue semantics.
- Updated the design record, claim contract, README, copy audit, version label, and package version to 1.1.1.

## Finding disposition

| Finding | Result |
| --- | --- |
| Review 2 F-01: invalid deductions in Puzzles 26, 35, and 40 | Fixed and verified in the live browser. The two alternate routes each use one mark; their direct routes complete. The corrected roof answer completes from a physically valid premise. |
| Review 2 untested authored-content claim | Fixed. The declared claim command now plays all 120 answer outcomes against the independent solution audit in both viewport projects. |
| Verification 1 F-01 through F-12 | Still resolved. The full live suite rechecked first-screen play, focus, targets, navigation, 404 status, free-five boundary, nudges, demo persistence, immutable caching, and plain loss copy. |
| Billing registration dependency | Unchanged and accurately disclosed. Five puzzles remain free; the 35 paid puzzles remain authored and locked. |

## Clean-checkout verification

A detached checkout of the implementation commit was used.

- `npm ci` — passed; 63 packages installed and 0 vulnerabilities reported.
- Every command in `.factory/claims.json` — passed separately. There are 13 declared claims and one matching test tag for each.
- `npm test` — passed: 7 unit checks and 40 Playwright desktop/phone checks.
- `npm run build` — passed and produced `dist/`.
- Production sizes: JavaScript 40,663 bytes / 13.12 KB gzip; CSS 16,480 bytes / 4.54 KB gzip. Loaded WOFF2 fonts total 35,304 bytes.

## Live verification

- The product-scoped static deployment reused `sf-puzzle-late` in its existing region and preserved the production custom domain. Managed HTTPS returned 200.
- The worker URL check passed in 845 ms with no console errors: descriptive title, `lang="en"`, one h1, one main landmark, complete image alt coverage, and labeled buttons.
- Standalone axe-core CLI found 0 violations. The Playwright axe checks also found no serious or critical issues on home, demo, privacy, terms, in-app missing, standalone 404, and dark-preference pages.
- Live Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO; FCP 1.2 s, LCP 1.2 s, TBT 0 ms, CLS 0.036, and 54 KiB transfer.
- The complete Playwright suite passed all 40 checks directly against the live origin.
- The live JavaScript and CSS match the local production build by SHA-256. JavaScript: `ffcf5970c2d6715300657f4de4aa83c032e20b3a2e6662d02f973ae316b68b2a`; CSS: `2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d`.
- Hashed JavaScript returns `Cache-Control: public, max-age=31536000, immutable`. The CSP, HSTS, nosniff, referrer, and permissions headers are present. An unknown path deliberately returns the designed HTTP 404.
- At 1280×720 the game begins at y=117 and the first answer ends at y=579. At 390×664 the game begins at y=296 and the first answer ends at y=647.
- Fresh desktop and phone runs entered the sample in one click, showed the persistent demo label, completed Puzzle 3, reloaded to three completions, reset to two, reached the loss screen, restarted with two marks, and left demo mode with real progress unchanged. Only the product origin was requested.
- A live 390 px frame sample recorded 119 intervals at 16.67 ms mean and 16.7 ms median, about 60.0 fps. This remains verification evidence, not public copy.

Evidence is under `/work/.evidence/puzzle-late-repair-2/`, including the sample run, repaired-puzzle run, first screens, win/loss screens, route-alternate screens, axe output, URL verification, and Lighthouse report.

## Known dependency and next step

There are no known product-code gaps. Billing registration is still external and intentionally unavailable. `.factory/billing-offer.json` records the one-time offer with null price and currency because no public price, checkout, or license-validation path exists. The separate billing operator must register those exact values before purchase or activation is enabled. The product must not guess a price or expose the 35 paid puzzles for free to hide this dependency.

No offline, install/update, backend, tenant, health, rate-limit, multiplayer, AI, or public frame-rate behavior is promised; those checks are not applicable to this static one-player anthology.
