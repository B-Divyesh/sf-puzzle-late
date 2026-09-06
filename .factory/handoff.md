# Puzzle Late handoff

## Release

- Verdict: repaired and verified locally and live on 2026-09-06 UTC.
- Implementation commit: `fb43ad6020bfb715056d473ddc568ca0d93a15ad`.
- Documentation baseline: `b239b70c340d39c583998d054d95af6074d0c36c`.
- Live URL: `https://puzzle-late.sociobot.in`.
- Product: a one-player browser anthology for daily-puzzle fans who want another short timing, shadow, or route deduction.
- Stack: Vite and vanilla TypeScript. Static output is in `dist/`; there is no backend or shared database.

## What changed

- Put active play beside the job statement and sample action. At 1280×720 the game starts at y=117 and the first answer ends at y=579. At 390×664 it starts at y=296 and the first answer ends at y=647.
- Made Settings a modal dialog with a focus loop, Escape close, and focus restoration. Win and loss headings now receive focus.
- Raised every visible link and button target to at least 44×44 px, including the standalone 404 skip link.
- Made Puzzles navigate to the shelf from every route, with History API, scroll, title, and focus restoration.
- Limited static rewrites to `/demo`, `/privacy`, and `/terms`. Unknown public URLs now return HTTP 404 with the designed page.
- Replaced the final-free-puzzle duplicate action with **Choose another free puzzle**.
- Rewrote all 80 nudges so they teach a deduction step without naming an answer-only word or answer position. Unit validation covers all 40 puzzles.
- Removed unsupported five-minute and public originality claims. Internal authorship and asset provenance remain documented in `.factory/design.md`.
- Declared and tested demo persistence. The demo label remains visible across demo, privacy, and terms routes.
- Added a confirmed real-progress reset in Settings that preserves the motion setting.
- Added one-year immutable caching for hashed assets. The live JavaScript now returns `Cache-Control: public, max-age=31536000, immutable`.
- Replaced the metaphorical loss heading with **Puzzle lost**.

## Finding disposition

| Finding | Result |
| --- | --- |
| F-01 first-screen game | Fixed; active game and first answer fit in both required initial viewports. |
| F-02 focus failures | Fixed; modal trapping, Escape, opener restoration, and end-state focus are browser-tested. |
| F-03 small targets | Fixed; desktop and phone checks cover home, demo, legal, and standalone 404 pages. |
| F-04 dead Puzzles link | Fixed; legal-route navigation reaches and focuses the shelf. |
| F-05 unknown URL returns 200 | Fixed; live unknown URLs return 404 and the designed recovery page. |
| F-06 last free boundary | Fixed; no nonexistent next-puzzle action remains after Puzzle 5. |
| F-07 spoiler claim | Fixed; all nudges were rewritten and the claim now has a full-collection test. |
| F-08 five-minute claim | Fixed by removing the unsupported duration from public metadata and copy. |
| F-09 originality claim | Fixed by removing unprovable public wording; provenance remains an internal design record. |
| F-10 demo persistence claim | Fixed; claim declared and reload outcome tested. |
| F-11 short asset cache | Fixed; live hashed assets have a one-year immutable policy. |
| F-12 metaphorical loss heading | Fixed with the plain heading **Puzzle lost**. |

## Verification

From the documented clean setup:

- `npm ci` — passed; 63 packages installed and 0 vulnerabilities reported.
- Every one of the 13 commands in `.factory/claims.json` — passed separately. Each unit claim ran once; every browser claim passed on desktop and phone.
- `npm test` — passed on the final tree: 5 unit tests and 38 Playwright checks.
- `npm run test:claims` — passed: 2 tagged unit outcomes and 22 tagged browser outcomes.
- `npm run build` — passed; JavaScript is 40.59 KB raw / 13.12 KB gzip and CSS is 16.48 KB raw / 4.54 KB gzip.
- Playwright axe integration — no serious or critical issues on home, demo, privacy, terms, in-app missing, or standalone 404 pages; light and dark preferences checked.
- Worker URL verification on the final live deployment — HTTP 200, 617 ms load, no console errors, title, `lang`, one h1, main landmark, alt and button checks passed.
- Live Lighthouse mobile — 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP 1.1 s, LCP 1.2 s, TBT 40 ms, CLS 0.036, 54 KiB transfer.
- Live 390 px frame sample — 120 frames, 16.42 ms mean, 16.7 ms median, about 60.9 fps. This is verification evidence, not public copy.
- Full live Playwright suite — 38 desktop/phone checks passed on the unchanged main JS/CSS bundle. After the final 404-only adjustment, 6 additional live route, touch-target, and axe checks passed.
- Live headers — unknown URL 404; known routes 200; CSP, HSTS, nosniff, referrer, and permissions policies present; hashed JavaScript cache is immutable for one year.

The deterministic live run entered `/demo`, showed Puzzle 3 and two completed samples, revealed both nudges, selected **Cup**, and reached **Puzzle complete** with its ending. A replay selected **Spoon** and **Kettle**, reached **Puzzle lost**, then restarted with two marks. Reset restored two sample completions. Fresh desktop and 390 px phone contexts made only same-origin requests and logged no console errors. Screenshots and videos are under `/work/.evidence/puzzle-late-repair/`.

## Deployment

The first generic `swa deploy` attempt authenticated but stalled while retrieving app settings and was stopped. Its generated `.env` credential file was deleted without being read. The product-scoped factory deployment helper then reused only `sf-puzzle-late`, deployed successfully, preserved the existing custom domain, and confirmed managed HTTPS. The final deployed implementation is `fb43ad6020bfb715056d473ddc568ca0d93a15ad`; the live main assets are `index-DonU6JX1.js` and `index-BTlkkWvI.css`.

## Known dependency

Billing registration is still external and intentionally unavailable. The five free puzzles work. The 35 paid puzzles remain authored and locked. `.factory/billing-offer.json` records the one-time offer with null price and currency because no public price, checkout, or license-validation path has been registered. The billing operator must register those values before purchase or activation is enabled.

The external `/work/.evidence/qa-result.json` named by the work order was not present in this worker. The complete committed `.factory/verification-1.md` was used as the 12-finding source of truth, alongside all earlier handoff revisions in git history.

## Verification 2

- Independent verdict: **PASS** — zero findings and zero untested claims.
- Candidate implementation reviewed: `fb43ad6020bfb715056d473ddc568ca0d93a15ad`; documentation baseline: `b239b70c340d39c583998d054d95af6074d0c36c`.
- A fresh detached checkout completed `npm ci`, all 13 declared claim commands, `npm test` (5 unit and 38 browser checks), and `npm run build`.
- The full 38-check Playwright suite also passed directly against the live URL. Fresh desktop and 390 px phone runs completed the isolated demo, win, loss, restart, reset, keyboard-focus, privacy, route, reduced-motion, and designed-404 paths.
- Live main JavaScript and CSS match the fresh build byte for byte by SHA-256. The hashed JavaScript is immutable for one year.
- Full evidence and earlier-finding disposition: `.factory/verification-2.md`. External QA report: `/work/.evidence/qa-report.md`; result JSON: `/work/.evidence/qa-result.json`.
