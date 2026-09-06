import '@fontsource/fraunces/latin-600.css';
import '@fontsource/atkinson-hyperlegible/latin-400.css';
import './styles.css';
import { featuredPuzzle, puzzles, type Puzzle } from './data/puzzles';
import { abandonDemo, complete, isUnlocked, loadProgress, nextPuzzle, resetProgress, saveProgress, type PlayMode, type Progress } from './game';

type RoundState = {
  attempts: number;
  hintsShown: number;
  phase: 'playing' | 'won' | 'lost';
  note: string;
};

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('App root is missing.');
const app: HTMLDivElement = root;

let mode: PlayMode = location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1' ? 'demo' : 'real';
let loaded = loadProgress(mode);
let progress: Progress = loaded.progress;
let round: RoundState = { attempts: 2, hintsShown: 0, phase: 'playing', note: loaded.recovered ? 'Saved progress could not be read. A fresh local game is ready.' : '' };
let settingsOpen = false;
let resetConfirmOpen = false;

function activePuzzle(): Puzzle {
  return puzzles.find((puzzle) => puzzle.id === progress.selectedPuzzle) ?? puzzles[0];
}

function escape(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] ?? character));
}

function setTitle(title: string, description: string): void {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://puzzle-late.sociobot.in${location.pathname}`);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://puzzle-late.sociobot.in${location.pathname}`);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
}

function routeHref(path: string): string {
  if (mode !== 'demo' || path === '/demo') return path;
  const url = new URL(path, location.origin);
  url.searchParams.set('demo', '1');
  return `${url.pathname}${url.search}${url.hash}`;
}

function routeLink(path: string, label: string): string {
  const current = location.pathname === path;
  return `<a href="${routeHref(path)}" data-route ${current ? 'aria-current="page"' : ''}>${label}</a>`;
}

function header(): string {
  return `
    <a class="skip-link" href="#main">Skip to puzzle</a>
    <header class="site-header">
      <a class="wordmark" href="${mode === 'demo' ? '/demo' : '/'}" data-route aria-label="Puzzle Late home"><span aria-hidden="true">◇</span> Puzzle Late</a>
      <nav aria-label="Main navigation">
        ${routeLink('/demo', 'Demo')}
        <a href="${mode === 'demo' ? '/demo#shelf' : '/#shelf'}" data-route>Puzzles</a>
        ${routeLink('/privacy', 'Privacy')}
        <button class="text-button" type="button" data-action="settings" aria-haspopup="dialog">Settings</button>
      </nav>
    </header>`;
}

function footer(): string {
  return `<footer class="site-footer">
    <p>Play timing, shadow, and route puzzles after the daily.</p>
    <nav aria-label="Footer navigation">${routeLink('/privacy', 'Privacy')} ${routeLink('/terms', 'Terms')} <span>Built by Param Factory</span></nav>
    <p class="build-id">v1.1.0</p>
  </footer>`;
}

function demoBanner(): string {
  if (mode !== 'demo') return '';
  return `<aside class="demo-banner" aria-label="Demo status"><strong>Demo — sample data, nothing is saved.</strong><span>Two sample puzzles are complete.</span><button type="button" data-action="reset-demo">Reset demo</button><button type="button" data-action="start-real">Start for real</button></aside>`;
}

function diagram(puzzle: Puzzle): string {
  const classes = `diagram diagram--${puzzle.kind}`;
  const symbols: Record<string, string> = { timing: '◐', shadow: '◒', route: '⟐' };
  return `<div class="${classes}" aria-label="Puzzle diagram: ${escape(puzzle.diagram.join('. '))}" role="img">
    <div class="diagram-sun" aria-hidden="true">${symbols[puzzle.kind]}</div>
    ${puzzle.diagram.map((line, index) => `<div class="diagram-line diagram-line-${index}">${escape(line)}</div>`).join('')}
  </div>`;
}

function puzzleControls(puzzle: Puzzle): string {
  if (round.phase === 'won') {
    const isLastFree = progress.completed.filter((id) => id <= 5).length === 5;
    return `<div class="round-ending" aria-labelledby="ending-heading">
      <span class="ending-stamp" aria-hidden="true">✦</span>
      <h3 id="ending-heading" tabindex="-1">Puzzle complete</h3>
      <p>${escape(puzzle.ending)}</p>
      ${isLastFree ? `<p class="paid-note"><strong>You finished the free five.</strong> The remaining 35 puzzles are written and ready, but one-time purchase registration is not available yet.</p>` : ''}
      ${isLastFree
        ? '<button class="primary-button" type="button" data-action="choose-free">Choose another free puzzle</button>'
        : '<button class="primary-button" type="button" data-action="next-puzzle">Play the next free puzzle</button>'}
      <button class="secondary-button" type="button" data-action="restart">Play this puzzle again</button>
    </div>`;
  }
  if (round.phase === 'lost') {
    return `<div class="round-ending" aria-labelledby="lost-heading">
      <span class="ending-stamp ending-stamp--muted" aria-hidden="true">×</span>
      <h3 id="lost-heading" tabindex="-1">Puzzle lost</h3>
      <p>You used both marks. The puzzle is unchanged; restart and try a different deduction.</p>
      <button class="primary-button" type="button" data-action="restart">Restart this puzzle</button>
      <button class="secondary-button" type="button" data-action="choose-free">Choose a free puzzle</button>
    </div>`;
  }
  return `<div class="answer-area">
    <p class="attempts" tabindex="-1" aria-live="polite"><span aria-hidden="true">${'●'.repeat(round.attempts)}${'○'.repeat(2 - round.attempts)}</span> ${round.attempts} mark${round.attempts === 1 ? '' : 's'} left</p>
    <fieldset>
      <legend>Choose one answer</legend>
      <div class="choice-grid">
        ${puzzle.choices.map((choice, index) => `<button class="choice" type="button" data-answer="${escape(choice)}"><span aria-hidden="true">${String.fromCharCode(65 + index)}</span>${escape(choice)}</button>`).join('')}
      </div>
    </fieldset>
    <div class="nudge-row" aria-label="Optional nudges">
      <button type="button" data-action="hint" data-hint="1" ${round.hintsShown >= 1 ? 'disabled' : ''}>Show first nudge</button>
      <button type="button" data-action="hint" data-hint="2" ${round.hintsShown >= 2 ? 'disabled' : ''}>Show second nudge</button>
    </div>
    ${round.hintsShown > 0 ? `<ol class="nudges">${puzzle.hints.slice(0, round.hintsShown).map((hint, index) => `<li ${index === round.hintsShown - 1 ? 'tabindex="-1" data-latest-nudge' : ''}>${escape(hint)}</li>`).join('')}</ol>` : ''}
  </div>`;
}

function gameCard(puzzle: Puzzle): string {
  return `<section class="game-card" aria-labelledby="puzzle-heading" data-phase="${round.phase}">
    <div class="card-topline"><span class="kind-label">${puzzle.kind} deduction</span><span>Puzzle ${puzzle.id} of 40</span></div>
    <h2 id="puzzle-heading" tabindex="-1">${escape(puzzle.title)}</h2>
    <p class="scene">${escape(puzzle.scene)}</p>
    ${diagram(puzzle)}
    <p class="prompt">${escape(puzzle.prompt)}</p>
    ${puzzleControls(puzzle)}
  </section>`;
}

function shelf(): string {
  const featured = featuredPuzzle();
  return `<section id="shelf" class="shelf" aria-labelledby="shelf-heading">
    <div class="section-heading">
      <div><p class="eyebrow">Today’s featured puzzle</p><h2 id="shelf-heading" tabindex="-1">Choose a puzzle</h2></div>
      <p>Today: <strong>${escape(featured.title)}</strong>${featured.free ? '' : ' · part of the full anthology'}</p>
    </div>
    <ol class="puzzle-list">
      ${puzzles.map((puzzle) => {
        const unlocked = isUnlocked(puzzle, progress);
        const completed = progress.completed.includes(puzzle.id);
        const state = completed ? 'Complete' : puzzle.free ? 'Free' : 'Full anthology';
        return `<li><button type="button" class="puzzle-chip ${progress.selectedPuzzle === puzzle.id ? 'is-selected' : ''}" data-puzzle="${puzzle.id}" ${unlocked ? '' : 'data-locked="true"'}>
          <span class="puzzle-number">${String(puzzle.id).padStart(2, '0')}</span><span class="chip-copy"><strong>${escape(puzzle.title)}</strong><small>${puzzle.kind} · ${state}</small></span>${completed ? '<span class="complete-mark" aria-label="Complete">✓</span>' : unlocked ? '' : '<span aria-hidden="true">▧</span>'}
        </button></li>`;
      }).join('')}
    </ol>
  </section>`;
}

function offer(): string {
  return `<section class="offer" aria-labelledby="offer-heading">
    <div class="paper-stack" aria-hidden="true"><span></span><span></span><span></span></div>
    <div><p class="eyebrow">Full anthology</p><h2 id="offer-heading">Get all 40 puzzles</h2><p>Five puzzles are free. The complete anthology adds 35 timing, shadow, and route deductions with local progress.</p><p><strong>One-time purchase.</strong> Checkout and activation are not registered yet, so buying is not available on this release.</p><button class="secondary-button" type="button" disabled aria-describedby="offer-status">Purchase registration pending</button><p id="offer-status" class="muted">This button is unavailable until the separate billing operator registers the offer.</p></div>
  </section>`;
}

function home(): string {
  const puzzle = activePuzzle();
  setTitle(mode === 'demo' ? 'Demo — Puzzle Late' : 'Puzzle Late — Solve visual deduction puzzles', 'Solve timing, shadow, and route puzzles in your browser.');
  return `<main id="main" tabindex="-1">
    <section class="first-screen" aria-labelledby="page-heading">
      <div class="intro-copy">
        <p class="eyebrow">40 visual deductions</p>
        <h1 id="page-heading" tabindex="-1">Solve visual deduction puzzles</h1>
        <p class="lede">For daily-puzzle fans who want another short challenge now.</p>
        <div class="intro-actions"><a class="primary-button" href="/demo" data-route>Try it with sample data</a><span>Opens Puzzle 3 with two completed.</span></div>
        <ul class="plain-facts"><li>Five free.</li><li>No tracking.</li><li>Local progress.</li></ul>
        <div class="diorama" aria-hidden="true"><div class="diorama-moon"></div><div class="diorama-house"></div><div class="diorama-hill"></div><div class="diorama-path"></div></div>
      </div>
      <div class="hero-game"><p class="eyebrow">${mode === 'demo' ? 'Sample puzzle in progress' : 'Play now'}</p>${gameCard(puzzle)}</div>
    </section>
    <section class="how-it-works" aria-labelledby="how-heading"><h2 id="how-heading">How to play</h2><ol><li><strong>Read the paper scene.</strong><span>Each puzzle gives the timing, shadow, or route clues you need.</span></li><li><strong>Choose one answer.</strong><span>You have two marks and two optional spoiler-free nudges.</span></li><li><strong>Finish a puzzle.</strong><span>Each solution shows an ending and saves local progress.</span></li></ol></section>
    ${shelf()}
    <section class="privacy-summary" aria-labelledby="privacy-heading"><h2 id="privacy-heading">Your progress and privacy</h2><p>Your puzzle progress is stored only in this browser. There are no accounts, ads, analytics, or puzzle submissions.</p><a href="${routeHref('/privacy')}" data-route>Read the privacy details</a></section>
    ${offer()}
  </main>`;
}

function legalPage(kind: 'privacy' | 'terms'): string {
  const privacy = kind === 'privacy';
  setTitle(privacy ? 'Privacy — Puzzle Late' : 'Terms — Puzzle Late', privacy ? 'How Puzzle Late stores local puzzle progress.' : 'Terms for the Puzzle Late browser puzzle anthology.');
  return `<main id="main" tabindex="-1" class="legal-page"><article><p class="eyebrow">Puzzle Late</p><h1 tabindex="-1">${privacy ? 'Privacy and local progress' : 'Terms for the puzzle anthology'}</h1>
    ${privacy ? `<h2>What stays on your device</h2><p>Puzzle progress and the optional still-motion setting are saved in your browser’s local storage. Demo progress uses a separate local storage key and is deleted when you choose “Start for real”.</p><h2>What we do not collect</h2><p>This release has no account, analytics, advertising, payment form, or third-party scripts. Play does not send puzzle progress over the network.</p><h2>Clear your data</h2><p>Open Settings and choose “Reset local progress”. Reset demo changes only the isolated sample progress.</p>` : `<h2>Using the free sample</h2><p>The first five puzzles are free to play in this browser. Your progress is local to this browser and can be reset in Settings.</p><h2>The full anthology</h2><p>The complete 40-puzzle anthology is planned as a one-time purchase. This release does not have a registered checkout or license activation path. Do not rely on a purchase button until one is available.</p><h2>Included content</h2><p>Puzzle text, diagrams, and paper artwork ship with Puzzle Late. The game does not connect to a publisher archive.</p>`}
    <p><a href="${mode === 'demo' ? '/demo' : '/'}" data-route>Return to the puzzles</a></p></article></main>`;
}

function notFound(): string {
  setTitle('Page not found — Puzzle Late', 'The requested Puzzle Late page was not found.');
  return `<main id="main" tabindex="-1" class="not-found"><section><p class="eyebrow">404</p><h1 tabindex="-1">This puzzle page is missing</h1><p>The page may have moved, or the address may be incomplete.</p><a class="primary-button" href="${mode === 'demo' ? '/demo' : '/'}" data-route>Play a puzzle</a></section><div class="lost-card" aria-hidden="true">◇<span>?</span></div></main>`;
}

function settingsDialog(): string {
  if (!settingsOpen) return '';
  const resetName = mode === 'demo' ? 'sample progress' : 'local progress';
  return `<dialog class="settings-dialog" aria-labelledby="settings-heading"><div class="dialog-panel">
    <div class="dialog-heading"><h2 id="settings-heading" tabindex="-1">${resetConfirmOpen ? `Reset ${resetName}?` : 'Game settings'}</h2><button type="button" class="icon-button" data-action="close-settings" aria-label="Close settings">×</button></div>
    ${resetConfirmOpen
      ? `<p>${mode === 'demo' ? 'This restores the two completed sample puzzles and opens Puzzle 3.' : 'This removes every completion and opens Puzzle 1. Your motion setting stays set.'}</p>
        <div class="dialog-actions"><button type="button" class="secondary-button" data-action="cancel-reset">Keep progress</button><button type="button" class="danger-button" data-action="confirm-reset">Reset ${resetName}</button></div>`
      : `<p>These settings are saved only in this browser.</p>
        <label class="check-row"><input type="checkbox" data-setting="still" ${progress.settings.still ? 'checked' : ''} /> Keep page motion still</label>
        <div class="dialog-actions"><button type="button" class="primary-button" data-action="close-settings">Save settings</button><button type="button" class="secondary-button" data-action="request-reset">Reset ${resetName}</button></div>`}
  </div></dialog>`;
}

function render(focusSelector?: string): void {
  const path = location.pathname;
  const page = path === '/' || path === '/demo' ? home() : path === '/privacy' || path === '/terms' ? legalPage(path.slice(1) as 'privacy' | 'terms') : notFound();
  document.documentElement.dataset.motion = progress.settings.still ? 'still' : 'allowed';
  app.innerHTML = `${header()}${demoBanner()}${page}${footer()}<div class="sr-status" aria-live="polite" aria-atomic="true">${escape(round.note)}</div>${settingsDialog()}`;
  attachEvents();
  if (settingsOpen) {
    const dialog = app.querySelector<HTMLDialogElement>('.settings-dialog');
    dialog?.showModal();
    app.querySelector<HTMLElement>(focusSelector ?? '[data-action="close-settings"]')?.focus();
  } else if (focusSelector) {
    requestAnimationFrame(() => app.querySelector<HTMLElement>(focusSelector)?.focus());
  }
}

function persist(): void {
  saveProgress(mode, progress);
}

function freshRound(note = ''): void {
  round = { attempts: 2, hintsShown: 0, phase: 'playing', note };
}

function choosePuzzle(id: number): void {
  const puzzle = puzzles.find((item) => item.id === id);
  if (!puzzle) return;
  if (!isUnlocked(puzzle, progress)) {
    round.note = 'That anthology puzzle needs a registered one-time purchase. The five free puzzles are ready now.';
    const status = app.querySelector<HTMLElement>('.sr-status');
    if (status) {
      status.textContent = '';
      requestAnimationFrame(() => { status.textContent = round.note; });
    }
    return;
  }
  progress = { ...progress, selectedPuzzle: id };
  persist();
  freshRound(`Loaded ${puzzle.title}.`);
  render('#puzzle-heading');
}

function answer(choice: string): void {
  const puzzle = activePuzzle();
  if (round.phase !== 'playing') return;
  if (choice === puzzle.answer) {
    progress = complete(progress, puzzle.id);
    persist();
    round = { ...round, phase: 'won', note: 'Correct. Puzzle complete.' };
  } else {
    const attempts = round.attempts - 1;
    round = { ...round, attempts, phase: attempts === 0 ? 'lost' : 'playing', note: attempts === 0 ? 'No marks left. Restart this puzzle to try again.' : 'Not this one. One mark was used.' };
  }
  render(round.phase === 'won' ? '#ending-heading' : round.phase === 'lost' ? '#lost-heading' : '.attempts');
}

function navigate(target: string): void {
  const url = new URL(target, location.origin);
  const wantedMode: PlayMode = url.pathname === '/demo' || url.searchParams.get('demo') === '1' ? 'demo' : 'real';
  if (wantedMode !== mode) {
    mode = wantedMode;
    progress = loadProgress(mode).progress;
    freshRound(mode === 'demo' ? 'Demo started. Sample progress is separate from your local game.' : 'Your local game is ready.');
  }
  history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  render(url.hash === '#shelf' ? '#shelf-heading' : 'h1');
  if (url.hash === '#shelf') requestAnimationFrame(() => document.querySelector('#shelf')?.scrollIntoView({ behavior: progress.settings.still ? 'auto' : 'smooth' }));
}

function closeSettings(): void {
  settingsOpen = false;
  resetConfirmOpen = false;
  persist();
  render('[data-action="settings"]');
}

function attachEvents(): void {
  app.querySelectorAll<HTMLAnchorElement>('[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      event.preventDefault();
      navigate(href);
    });
  });
  app.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach((button) => button.addEventListener('click', () => answer(button.dataset.answer ?? '')));
  app.querySelectorAll<HTMLButtonElement>('[data-puzzle]').forEach((button) => button.addEventListener('click', () => choosePuzzle(Number(button.dataset.puzzle))));
  app.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'hint') {
      const level = Number(button.dataset.hint);
      round = { ...round, hintsShown: Math.max(round.hintsShown, level), note: `Nudge ${level} shown.` };
      render(level === 1 ? '[data-hint="2"]' : '[data-latest-nudge]');
    }
    if (action === 'restart') { freshRound('Puzzle restarted.'); render('#puzzle-heading'); }
    if (action === 'next-puzzle') { choosePuzzle(nextPuzzle(activePuzzle().id, progress.completed).id); }
    if (action === 'choose-free') {
      freshRound('Choose any free puzzle.');
      render('#shelf-heading');
      requestAnimationFrame(() => document.querySelector('#shelf')?.scrollIntoView({ behavior: progress.settings.still ? 'auto' : 'smooth' }));
    }
    if (action === 'reset-demo') { progress = resetProgress('demo'); freshRound('Demo reset to its sample progress.'); render('[data-action="reset-demo"]'); }
    if (action === 'start-real') { abandonDemo(); mode = 'real'; progress = loadProgress('real').progress; freshRound('Demo discarded. Your local game is ready.'); history.pushState({}, '', '/'); render('h1'); }
    if (action === 'settings') { settingsOpen = true; resetConfirmOpen = false; render('[data-action="close-settings"]'); }
    if (action === 'close-settings') closeSettings();
    if (action === 'request-reset') { resetConfirmOpen = true; render('[data-action="cancel-reset"]'); }
    if (action === 'cancel-reset') { resetConfirmOpen = false; render('[data-action="request-reset"]'); }
    if (action === 'confirm-reset') {
      const setting = progress.settings;
      progress = resetProgress(mode, setting);
      freshRound(mode === 'demo' ? 'Sample progress reset.' : 'Local progress reset. Puzzle 1 is ready.');
      closeSettings();
    }
  }));
  app.querySelectorAll<HTMLInputElement>('[data-setting="still"]').forEach((input) => input.addEventListener('change', () => {
    progress = { ...progress, settings: { ...progress.settings, still: input.checked } };
    persist();
    document.documentElement.dataset.motion = input.checked ? 'still' : 'allowed';
  }));
  app.querySelector<HTMLDialogElement>('.settings-dialog')?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeSettings();
  });
  app.querySelector<HTMLDialogElement>('.settings-dialog')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const dialog = event.currentTarget as HTMLDialogElement | null;
    if (!dialog) return;
    const focusable = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

window.addEventListener('popstate', () => {
  mode = location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1' ? 'demo' : 'real';
  progress = loadProgress(mode).progress;
  freshRound();
  render(location.hash === '#shelf' ? '#shelf-heading' : 'h1');
  if (location.hash === '#shelf') requestAnimationFrame(() => document.querySelector('#shelf')?.scrollIntoView());
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) persist();
});

render();
