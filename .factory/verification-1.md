# Verification 1 — Play original visual puzzles

## Verdict: FAIL

- Finding count: **12**
- Untested claim count: **4**
- Candidate implementation: `cd2ed9aa0f223040c1cfb5d05502fa4772b2966a`
- Documentation baseline: `2ca46eb026a06ff68ac5821c301702db494e6f4e`
- Live URL: `https://puzzle-late.sociobot.in`
- Checked: 2026-09-06 UTC

The live build matches the candidate JavaScript and CSS byte for byte. Passing tests do not override the findings below.

## First screen

- Job: solve original visual timing, shadow, and route puzzles.
- Audience: daily-puzzle fans who want another short challenge.
- First action: **Try it with sample data**.

These words are clear before scrolling. The playable puzzle itself is not available in the initial viewport; see F-01.

## Findings

### F-01 — Major — The game is below the first screen

The browser-game contract requires active play in the first screen. At 1280×720, the game card begins at y=714, leaving only six pixels visible. At the 390×664 phone viewport, it begins at y=917 and is entirely below the fold. The phone first screen is mostly navigation, decorative art, and introduction copy. Evidence: [desktop landing](/work/.evidence/live-desktop-landing.png) and [phone landing](/work/.evidence/live-phone-landing.png).

### F-02 — Major — The settings dialog does not manage keyboard focus

The open `<dialog>` is non-modal (`:modal` is false). Tab leaves the three dialog controls and enters the page behind it. Escape does not close it. Completing a puzzle by keyboard also replaces the focused control and leaves focus on `<body>` instead of the end heading or restart action. This fails the required dialog and keyboard focus behavior.

### F-03 — Moderate — Ten phone targets are smaller than 44×44 CSS pixels

Measured at 390 px: the wordmark is 33.6 px high; header links are 22.9 px high; Settings is 28.9 px high; Reset demo and Start for real are 38 px high; the privacy-detail and footer links are 22.9–25.8 px high. This fails the touch-target baseline.

### F-04 — Moderate — “Puzzles” is a dead link off the home route

The shared header always points to `#shelf`, but `/privacy`, `/terms`, and the in-app missing-page route have no element with that ID. Activating the link on those pages does not navigate to the puzzle shelf.

### F-05 — Moderate — Unknown URLs return HTTP 200

`GET /not-a-puzzle` returns the SPA shell with status 200. JavaScript renders a designed missing-page view, and `/404.html` exists, but the public unknown URL never produces the deliberate HTTP 404 required by the site contract.

### F-06 — Moderate — The last free puzzle offers a next puzzle that does not exist

After solving all five free puzzles, the end card still says **Play the next free puzzle**. Activating it restarts Puzzle 5 with two marks. The adjacent **Play this puzzle again** action does the same job. The boundary state needs an honest next action.

### F-07 — Moderate — The “non-spoiler nudges” claim is false and undeclared

The landing page promises two non-spoiler nudges, but the demo’s second nudge says, “The cup is the only item neither first nor last,” directly naming the correct answer. The `two-marks-two-nudges` claim only counts buttons and revealed list items; it does not declare or test the non-spoiler promise.

### F-08 — Minor — The five-minute duration claim is untested

The page description and social metadata call these “five-minute” puzzles. No `.factory/claims.json` entry measures completion time or supports that quantitative statement.

### F-09 — Minor — The originality claim test is incomplete

Public copy repeatedly claims the puzzles are original. The declared tests count categories and check unique titles/endings and selectable answers. They do not test provenance or the claim that content was not copied from a publisher.

### F-10 — Minor — Saved demo persistence is an unlisted claim

The first-screen action says it “Starts a saved sample run.” Demo isolation is tested, but no declared claim reloads the demo and verifies that its sample progress persists.

### F-11 — Minor — Hashed assets are served with a 30-second cache

The live hashed JavaScript response has `Cache-Control: public, must-revalidate, max-age=30`. The performance contract calls for long-lived immutable caching for hashed assets. Runtime performance is currently excellent, but repeat visits do not receive the required cache policy.

### F-12 — Minor — The loss heading is a metaphor

The loss screen heading is “This page folded away.” The work order requires plain words and no metaphor headings. A direct heading such as “Puzzle lost” would name the state without relying on the explanation below it.

## Declared claim commands

All nine commands were run separately after `npm ci` from the clean checkout.

| Claim | Result | Evidence |
| --- | --- | --- |
| `authored-content` | Pass | 1 Vitest test passed |
| `anthology-count` | Pass | desktop + phone passed |
| `free-five` | Pass | desktop + phone passed |
| `two-marks-two-nudges` | Pass, incomplete claim | desktop + phone passed; see F-07 |
| `demo-isolated` | Pass | desktop + phone passed |
| `local-only` | Pass | desktop + phone passed |
| `puzzle-ending` | Pass | desktop + phone passed |
| `restart-reset` | Pass | desktop + phone passed |
| `settings-persist` | Pass | desktop + phone passed |

## End-to-end evidence

- Fresh desktop and phone contexts entered `/demo`, showed the persistent demo label, Puzzle 3, and two completed sample puzzles.
- The run revealed both nudges, selected **Cup**, and reached **Puzzle complete** with “Steam turns into a small blue paper moon.”
- A replay selected **Spoon** and **Kettle**, reached **This page folded away**, then restarted with two marks.
- Reset restored Puzzle 3 and two completed sample puzzles. A real progress record created before demo entry remained byte-for-byte unchanged.
- Evidence: [recorded phone run](/work/.evidence/live-phone-deterministic-run.webm), [desktop win](/work/.evidence/live-desktop-win.png), [desktop loss](/work/.evidence/live-desktop-loss.png), [phone win](/work/.evidence/live-phone-win.png), and [phone loss](/work/.evidence/live-phone-loss.png).

## Other checks

- `npm test`: pass, 4 unit tests and 22 browser tests.
- `npm run build`: pass; `dist/` produced. Initial JS is 12.29 KB gzip, CSS is 4.21 KB gzip, and loaded WOFF2 fonts total 35.3 KB.
- Live verifier: pass; title, `lang`, one h1, main landmark, labels, and console checks passed in 618 ms. Evidence: [verify.json](/work/.evidence/verify-live/verify.json).
- Live axe: no serious or critical violations on desktop, phone, light, or dark preference contexts. Manual keyboard findings remain F-02 and F-03.
- Reduced motion: computed scroll behavior is `auto`; animation and transition durations reduce to 0.01 ms.
- Live Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP/LCP 1.1 s, TBT 30 ms, CLS 0, transfer 53 KiB. Evidence: [Lighthouse JSON](/work/.evidence/lighthouse-live.json).
- HTTPS and headers: pass for CSP, HSTS, `nosniff`, referrer policy, and permissions policy.
- Privacy: no console errors and only `https://puzzle-late.sociobot.in` requests during the full sample run. No account, analytics, payment, AI, or third-party runtime was found.
- Routes: `/`, `/demo`, `/privacy`, and `/terms` load directly with the correct runtime title, one h1, and main landmark. `robots.txt`, `sitemap.xml`, legal pages, and referenced assets return 200. See F-04 and F-05 for exceptions.
- Invalid local storage recovers to Puzzle 1 with a recovery status. Back and forward navigation restore the route, title, and h1 focus.
- Offline/update: no offline or installable-update behavior is promised, so these are not applicable.
- Backend, health, rate limits, tenant isolation, restart persistence, multiplayer, CLI, library, and desktop installation checks are not applicable to this static single-player game.

## Earlier verification disposition

- The earlier DNS/live-verification blocker is resolved. The hostname resolves and the live JS/CSS SHA-256 values match the locally built candidate files.
- The earlier billing-registration gap remains open and accurately disclosed. No price, checkout, or activation is claimed. Commercial registration belongs to the separate operator and is not counted as a new product-code finding here.
- No earlier defect list, including minor findings, was present in repository history. The earlier handoff only recorded the two blockers above.

## Required next step

Repair all twelve findings, add or narrow the four unsupported claim statements, deploy a new implementation candidate, and run verification again.
