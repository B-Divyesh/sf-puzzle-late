import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { puzzles } from '../src/data/puzzles';

async function solveActive(page: Page, puzzleId: number): Promise<void> {
  const puzzle = puzzles.find((item) => item.id === puzzleId);
  if (!puzzle) throw new Error(`Missing puzzle ${puzzleId}`);
  await page.getByRole('button', { name: puzzle.answer, exact: true }).click();
}

async function openPuzzle(page: Page, puzzleId: number): Promise<void> {
  await page.locator(`[data-puzzle="${puzzleId}"]`).click();
  await expect(page.locator('.game-card')).toContainText(`Puzzle ${puzzleId} of 40`);
}

async function expectTouchTargets(page: Page): Promise<void> {
  const undersized = await page.locator('a, button').evaluateAll((elements) => elements.flatMap((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
    return rect.width < 44 || rect.height < 44
      ? [{ label: (element.textContent || element.getAttribute('aria-label') || '').trim(), width: rect.width, height: rect.height }]
      : [];
  }));
  expect(undersized).toEqual([]);
}

test('@claim:free-five Five puzzles are free to play', async ({ page }) => {
  await page.goto('/');
  const freePuzzles = page.locator('.puzzle-chip').filter({ hasText: 'Free' });
  await expect(freePuzzles).toHaveCount(5);
  for (let puzzleId = 1; puzzleId <= 5; puzzleId += 1) {
    await openPuzzle(page, puzzleId);
    await expect(page.getByRole('button', { name: 'Show first nudge' })).toBeEnabled();
    await expect(page.locator('[data-answer]')).toHaveCount(3);
  }
});

test('@claim:anthology-count The shelf presents 15 timing, 13 shadow, and 12 route puzzles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.puzzle-chip')).toHaveCount(40);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'timing' })).toHaveCount(15);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'shadow' })).toHaveCount(13);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'route' })).toHaveCount(12);
});

test('@claim:two-marks-two-nudges Active play starts with two marks and reveals two optional nudges', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('.attempts')).toContainText('2 marks left');
  await expect(page.getByRole('button', { name: /Show .*nudge/ })).toHaveCount(2);
  await page.getByRole('button', { name: 'Show first nudge' }).click();
  await expect(page.getByRole('button', { name: 'Show second nudge' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.nudges li')).toHaveCount(2);
  await expect(page.locator('[data-latest-nudge]')).toBeFocused();
});

test('@claim:demo-isolated Demo play and reset never change real progress', async ({ page }) => {
  await page.goto('/');
  await solveActive(page, 1);
  const realBeforeDemo = await page.evaluate(() => localStorage.getItem('puzzle-late:progress:v1'));
  await page.goto('/demo');
  await expect(page.getByLabel('Demo status')).toContainText('Demo — sample data, nothing is saved');
  await expect(page.locator('.game-card')).toContainText('Puzzle 3 of 40');
  await solveActive(page, 3);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Complete' })).toHaveCount(2);
  await expect(page.evaluate(() => localStorage.getItem('puzzle-late:progress:v1'))).resolves.toBe(realBeforeDemo);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.evaluate(() => localStorage.getItem('demo:puzzle-late:progress:v1'))).resolves.toBeNull();
  await expect(page.evaluate(() => localStorage.getItem('puzzle-late:progress:v1'))).resolves.toBe(realBeforeDemo);
});

test('@claim:demo-persists Sample completion stays in the demo after reload', async ({ page }) => {
  await page.goto('/demo');
  await solveActive(page, 3);
  const savedDemo = await page.evaluate(() => localStorage.getItem('demo:puzzle-late:progress:v1'));
  await page.reload();
  await expect(page.getByLabel('Demo status')).toBeVisible();
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Complete' })).toHaveCount(3);
  await expect(page.evaluate(() => localStorage.getItem('demo:puzzle-late:progress:v1'))).resolves.toBe(savedDemo);
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveURL('/privacy?demo=1');
  await expect(page.getByLabel('Demo status')).toBeVisible();
  await page.getByRole('link', { name: 'Puzzles', exact: true }).click();
  await expect(page).toHaveURL('/demo#shelf');
  await expect(page.getByLabel('Demo status')).toBeVisible();
});

test('@claim:local-only Progress remains local and play makes no third-party requests', async ({ page }) => {
  const requestOrigins = new Set<string>();
  page.on('request', (request) => requestOrigins.add(new URL(request.url()).origin));
  await page.goto('/');
  await solveActive(page, 1);
  await page.reload();
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Last lantern' })).toContainText('Complete');
  expect([...requestOrigins]).toEqual([new URL(page.url()).origin]);
});

test('@claim:puzzle-ending A correct deduction reaches its completion card and ending', async ({ page }) => {
  await page.goto('/demo');
  await solveActive(page, 3);
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeFocused();
  await expect(page.locator('.round-ending')).toContainText('Steam turns into a small blue paper moon.');
  await expect(page.getByRole('button', { name: 'Play the next free puzzle' })).toBeVisible();
});

test('@claim:restart-reset Two wrong answers lead to a loss, and restart restores both marks', async ({ page }) => {
  await page.goto('/demo');
  const wrongChoices = puzzles[2].choices.filter((choice) => choice !== puzzles[2].answer);
  await page.getByRole('button', { name: wrongChoices[0], exact: true }).click();
  await expect(page.locator('.attempts')).toContainText('1 mark left');
  await page.getByRole('button', { name: wrongChoices[1], exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Puzzle lost' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Puzzle lost' })).toBeFocused();
  await page.getByRole('button', { name: 'Restart this puzzle' }).click();
  await expect(page.locator('.attempts')).toContainText('2 marks left');
  await expect(page.getByRole('heading', { name: 'Blue kettle' })).toBeFocused();
});

test('@claim:settings-persist The still-motion setting persists after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('checkbox', { name: 'Keep page motion still' }).check();
  await page.getByRole('button', { name: 'Save settings' }).click();
  await expect(page.getByRole('button', { name: 'Settings' })).toBeFocused();
  await page.reload();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('checkbox', { name: 'Keep page motion still' })).toBeChecked();
});

test('@claim:real-reset Settings can reset local progress without changing the motion setting', async ({ page }) => {
  await page.goto('/');
  await solveActive(page, 1);
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('checkbox', { name: 'Keep page motion still' }).check();
  await page.getByRole('button', { name: 'Reset local progress' }).click();
  await expect(page.getByRole('heading', { name: 'Reset local progress?' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset local progress' }).click();
  await expect(page.locator('.game-card')).toContainText('Puzzle 1 of 40');
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Complete' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('checkbox', { name: 'Keep page motion still' })).toBeChecked();
});

test('@claim:billing-unavailable The full anthology cannot start checkout before registration', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Purchase registration pending' })).toBeDisabled();
  await expect(page.locator('a[href*="checkout"], a[href*="billing"]')).toHaveCount(0);
  expect(requests.some((url) => /checkout|billing/i.test(url))).toBe(false);
});

test('the game and an answer control are in the initial viewport', async ({ page }) => {
  await page.goto('/');
  const viewport = page.viewportSize();
  const game = await page.locator('.game-card').boundingBox();
  const firstAnswer = await page.locator('[data-answer]').first().boundingBox();
  expect(viewport).not.toBeNull();
  expect(game).not.toBeNull();
  expect(firstAnswer).not.toBeNull();
  expect(game!.y).toBeLessThan(viewport!.height * 0.72);
  expect(firstAnswer!.y + firstAnswer!.height).toBeLessThanOrEqual(viewport!.height);
});

test('the modal settings dialog traps focus, closes with Escape, and restores focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.locator('dialog')).toBeVisible();
  await expect(page.locator('dialog')).toHaveJSProperty('open', true);
  expect(await page.locator('dialog').evaluate((dialog) => dialog.matches(':modal'))).toBe(true);
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Settings' })).toBeFocused();
});

test('all visible links and buttons meet the 44 pixel touch target minimum', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/404.html']) {
    await page.goto(route);
    await expectTouchTargets(page);
  }
});

test('Puzzles navigates from legal pages and browser history restores title and focus', async ({ page }) => {
  await page.goto('/privacy');
  await page.getByRole('link', { name: 'Puzzles', exact: true }).click();
  await expect(page).toHaveURL(/\/#shelf$/);
  await expect(page.getByRole('heading', { name: 'Choose a puzzle' })).toBeFocused();
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveTitle('Privacy — Puzzle Late');
  await page.goBack();
  await expect(page).toHaveTitle('Puzzle Late — Solve visual deduction puzzles');
  await expect(page.getByRole('heading', { name: 'Choose a puzzle' })).toBeFocused();
});

test('the fifth free completion has an honest boundary action', async ({ page }) => {
  await page.goto('/');
  for (let puzzleId = 1; puzzleId <= 5; puzzleId += 1) {
    await openPuzzle(page, puzzleId);
    await solveActive(page, puzzleId);
  }
  await expect(page.getByText('You finished the free five.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Play the next free puzzle' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Choose another free puzzle' }).click();
  await expect(page.getByRole('heading', { name: 'Choose a puzzle' })).toBeFocused();
});

test('keyboard play, locked feedback, invalid storage recovery, and reduced motion work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('puzzle-late:progress:v1', '{broken'));
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto('/');
  await expect(page.locator('.sr-status')).toContainText('Saved progress could not be read');
  await page.getByRole('button', { name: puzzles[0].answer, exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  await page.locator('[data-puzzle="6"]').click();
  await expect(page.locator('.sr-status')).toContainText('registered one-time purchase');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(consoleErrors).toEqual([]);
});

test('known routes return 200 and unknown routes return a designed 404', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/404.html']) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
  }
  const response = await page.goto('/not-a-puzzle');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('Page not found — Puzzle Late');
  await expect(page.getByRole('heading', { name: 'This puzzle page is missing' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Play a puzzle' })).toBeVisible();
});

test('home, demo, legal, and missing pages have no serious accessibility violations', async ({ page }) => {
  for (const route of ['/', '/demo', '/privacy', '/terms', '/404.html', '/not-a-puzzle']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    expect(results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))).toEqual([]);
  }
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const darkResults = await new AxeBuilder({ page: page as never }).analyze();
  expect(darkResults.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))).toEqual([]);
});
