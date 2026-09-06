# Verification 2 — Solve visual deduction puzzles

## Verdict: PASS

- Finding count: **0**
- Untested claim count: **0**
- Candidate implementation reviewed: fb43ad6020bfb715056d473ddc568ca0d93a15ad
- Documentation baseline reviewed: b239b70c340d39c583998d054d95af6074d0c36c
- Live URL: https://puzzle-late.sociobot.in
- Checked: 2026-09-06 UTC

The documentation commit changes reports only; its product files are unchanged from the implementation candidate. The live JavaScript and CSS SHA-256 values exactly match a fresh production build of that candidate.

## First screen

- Job: solve visual timing, shadow, and route puzzles.
- Audience: daily-puzzle fans who want another short challenge now.
- First action: **Try it with sample data**. It opens Puzzle 3 with two completed sample puzzles.

Before scrolling, the live desktop game card starts at y=117 and its first answer ends at y=579 in a 1280×720 viewport. On a fresh 390×664 phone context, the game starts at y=296 and the first answer ends at y=647. The active game is therefore usable on the first screen in both checks.

## Clean-checkout verification

A detached clean worktree at documentation baseline b239b70 was used. Documented prerequisites were installed with npm ci (Node 22.23.2, npm 10.9.8), then every command declared in [.factory/claims.json](claims.json) was run separately.

| Claim | Result |
| --- | --- |
| authored-content | Pass — unit validation |
| spoiler-free-nudges | Pass — unit validation |
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

npm test passed: 5 unit checks and 38 Playwright desktop/phone checks. npm run build passed and produced dist/. The built main JavaScript is 40,587 bytes (13,088 bytes gzip) and CSS is 16,480 bytes (4,551 bytes gzip).

## Live browser runs

Fresh desktop and phone browser contexts loaded the live site with no console errors on normal routes.

- The one-click sample entered /demo, showed the persistent **Demo — sample data, nothing is saved.** label, Puzzle 3, and two completed samples.
- Selecting **Cup** reached **Puzzle complete**, focused that end heading, and showed “Steam turns into a small blue paper moon.”
- Reload retained the isolated demo completion (three complete samples). **Reset demo** restored exactly two completions, left the real local-progress key unset, and retained a separate demo record.
- Selecting **Spoon** and then **Kettle** reached **Puzzle lost** and focused that heading. **Restart this puzzle** restored two marks.
- Full live Playwright verification against the product URL passed all 38 checks; the generated run record reports status "passed".
- Normal play requested only https://puzzle-late.sociobot.in. No third-party request, account, analytics, checkout, or tracking request occurred.

Evidence screenshots: [phone first screen](/work/.evidence/puzzle-late-verify-2/live-phone-home.png), [desktop win](/work/.evidence/puzzle-late-verify-2/live-desktop-win.png), and [desktop loss](/work/.evidence/puzzle-late-verify-2/live-desktop-loss.png).

## Accessibility, routes, and recovery

- Live axe checks found no serious or critical violations on home, demo, privacy, terms, standalone 404, in-app missing-page route, and dark preference.
- Each checked route has lang="en", exactly one main landmark, exactly one h1, no image missing alt text, and no normal-route console errors.
- Keyboard play, end-state focus, modal focus trap, Escape close, opener restoration, and 44 px visible link/button targets passed on desktop and phone.
- With reduced motion, scroll behavior is auto; animation and transition durations are 0.01ms.
- /, /demo, /privacy, /terms, /404.html, robots.txt, and sitemap.xml return 200. /not-a-puzzle returns the deliberate HTTP 404 and its designed recovery page. Its browser console records the expected network message for that deliberate main-document 404; this is not a broken-page error.
- Every in-page product link on the six checked routes returned 200. Demo legal routes retained the demo label.
- The live main JS and CSS SHA-256 values match the fresh build: JS 2cf3d39b2897997fe716c510284de7c6814579bdc621a3e74c36752db2f66ed7; CSS 2aa4dc00bf8ab68337d781f493f15243cf4ca8299cd4bf10b1bf1ef8e4d7a41d.
- Hashed JavaScript has Cache-Control: public, max-age=31536000, immutable. CSP, HSTS, nosniff, referrer, and permissions headers are present.

No offline, install/update, backend, health, tenant, rate-limit, multiplayer, CLI, desktop-install, AI, or public frame-rate behavior is promised by this static one-player game, so those checks are not applicable.

## Earlier findings

All 12 findings in [verification-1.md](verification-1.md) are resolved and rechecked:

| Finding | Current disposition |
| --- | --- |
| F-01 first-screen game | Pass — active game and first answer fit both checked first screens. |
| F-02 focus | Pass — modal and end-state focus behavior works by keyboard. |
| F-03 touch targets | Pass — all visible tested targets are at least 44 px. |
| F-04 Puzzles link | Pass — legal pages navigate to and focus the shelf. |
| F-05 unknown route status | Pass — unknown URL returns designed HTTP 404. |
| F-06 fifth-free boundary | Pass — honest “Choose another free puzzle” action. |
| F-07 spoiler-free nudges | Pass — full anthology validation passed. |
| F-08 duration claim | Pass — unsupported duration claim is absent. |
| F-09 originality claim | Pass — unsupported public originality claim is absent; provenance remains documentation. |
| F-10 demo persistence | Pass — declared and tested after reload. |
| F-11 asset cache | Pass — live immutable one-year hashed-asset cache. |
| F-12 loss heading | Pass — direct “Puzzle lost” heading. |

Billing registration is still an external operator dependency, but the product accurately says checkout and activation are unavailable, disables the control, and makes no payment request. It is not a defect in this implementation.
