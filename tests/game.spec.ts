import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { puzzles } from '../src/data/puzzles';

async function solveActive(page: import('@playwright/test').Page, puzzleId: number): Promise<void> {
  const puzzle = puzzles.find((item) => item.id === puzzleId);
  if (!puzzle) throw new Error(`Missing puzzle ${puzzleId}`);
  await page.getByRole('button', { name: puzzle.answer, exact: true }).click();
}

test('@claim:free-five Five original puzzles are free to play', async ({ page }) => {
  await page.goto('/');
  const freePuzzles = page.locator('.puzzle-chip').filter({ hasText: 'Free' });
  await expect(freePuzzles).toHaveCount(5);
  for (let index = 0; index < 5; index += 1) {
    await freePuzzles.nth(index).click();
    await expect(page.locator('.game-card')).toContainText(`Puzzle ${index + 1} of 40`);
    await expect(page.getByRole('button', { name: 'Show first nudge' })).toBeEnabled();
  }
});

test('@claim:anthology-count The shelf presents all 40 original puzzles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.puzzle-chip')).toHaveCount(40);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'timing' })).toHaveCount(15);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'shadow' })).toHaveCount(13);
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'route' })).toHaveCount(12);
});

test('@claim:two-marks-two-nudges Every puzzle starts with two marks and two optional nudges', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('.attempts')).toContainText('2 marks left');
  await expect(page.getByRole('button', { name: /Show .*nudge/ })).toHaveCount(2);
  await page.getByRole('button', { name: 'Show first nudge' }).click();
  await page.getByRole('button', { name: 'Show second nudge' }).click();
  await expect(page.locator('.nudges li')).toHaveCount(2);
});

test('@claim:demo-isolated Demo never changes real progress and reset restores its sample run', async ({ page }) => {
  await page.goto('/');
  await solveActive(page, 1);
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  const realBeforeDemo = await page.evaluate(() => localStorage.getItem('puzzle-late:progress:v1'));

  await page.goto('/demo');
  await expect(page.getByLabel('Demo status')).toContainText('sample data, nothing is saved');
  await expect(page.locator('.game-card')).toContainText('Puzzle 3 of 40');
  await solveActive(page, 3);
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  await expect(page.evaluate(() => localStorage.getItem('puzzle-late:progress:v1'))).resolves.toBe(realBeforeDemo);

  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.game-card')).toContainText('Puzzle 3 of 40');
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Complete' })).toHaveCount(2);
});

test('@claim:local-only Progress remains in this browser and the game makes no third-party requests', async ({ page }) => {
  const requestOrigins = new Set<string>();
  page.on('request', (request) => requestOrigins.add(new URL(request.url()).origin));
  await page.goto('/');
  await solveActive(page, 1);
  await page.reload();
  await expect(page.locator('.puzzle-chip').filter({ hasText: 'Last lantern' })).toContainText('Complete');
  expect([...requestOrigins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:puzzle-ending A correct deduction reaches a completion card with an ending', async ({ page }) => {
  await page.goto('/demo');
  await solveActive(page, 3);
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  await expect(page.locator('.round-ending')).toContainText('Steam turns into a small blue paper moon.');
  await expect(page.getByRole('button', { name: 'Play the next free puzzle' })).toBeVisible();
});

test('@claim:restart-reset Two wrong answers lead to a loss, and restart restores both marks', async ({ page }) => {
  await page.goto('/demo');
  const wrongChoices = puzzles[2].choices.filter((choice) => choice !== puzzles[2].answer);
  await page.getByRole('button', { name: new RegExp(wrongChoices[0]) }).click();
  await expect(page.locator('.attempts')).toContainText('1 mark left');
  await page.getByRole('button', { name: new RegExp(wrongChoices[1]) }).click();
  await expect(page.getByRole('heading', { name: 'This page folded away' })).toBeVisible();
  await page.getByRole('button', { name: 'Restart this puzzle' }).click();
  await expect(page.locator('.attempts')).toContainText('2 marks left');
  await expect(page.getByRole('button', { name: 'Show first nudge' })).toBeEnabled();
});

test('@claim:settings-persist The still-motion setting persists after a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('checkbox', { name: 'Keep page motion still' }).check();
  await page.getByRole('button', { name: 'Save settings' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByRole('checkbox', { name: 'Keep page motion still' })).toBeChecked();
});

test('keyboard input, locked anthology feedback, routes, and accessibility work', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto('/');
  await page.getByRole('button', { name: new RegExp(puzzles[0].answer) }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Puzzle complete' })).toBeVisible();
  await page.getByRole('button', { name: /06.*Three umbrellas/ }).click();
  await expect(page.locator('.sr-status')).toContainText('registered one-time purchase');
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveTitle('Privacy — Puzzle Late');
  await expect(page.getByRole('heading', { name: 'Privacy and local progress' })).toBeVisible();
  await page.getByRole('link', { name: 'Terms' }).click();
  await expect(page).toHaveTitle('Terms — Puzzle Late');
  await expect(page.getByRole('heading', { name: 'Terms for the puzzle anthology' })).toBeVisible();
  // @axe-core/playwright publishes against a newer compatible Playwright type than the pinned test runner.
  const accessibilityScanResults = await new AxeBuilder({ page: page as never }).analyze();
  expect(accessibilityScanResults.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact ?? ''))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test('the first phone screen gives the job and an active puzzle without a menu wall', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Solve original visual puzzles' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  await expect(page.locator('.game-card')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show first nudge' })).toBeVisible();
});

test('a deep unknown URL has a designed in-app recovery page', async ({ page }) => {
  await page.goto('/not-a-puzzle');
  await expect(page).toHaveTitle('Page not found — Puzzle Late');
  await expect(page.getByRole('heading', { name: 'This puzzle page is missing' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Play a puzzle' })).toBeVisible();
});
