import { puzzles, type Puzzle } from './data/puzzles';

export type PlayMode = 'real' | 'demo';

export type Settings = {
  still: boolean;
};

export type Progress = {
  completed: number[];
  selectedPuzzle: number;
  settings: Settings;
};

const REAL_KEY = 'puzzle-late:progress:v1';
const DEMO_KEY = 'demo:puzzle-late:progress:v1';

const defaultProgress = (): Progress => ({
  completed: [],
  selectedPuzzle: 1,
  settings: { still: false },
});

const demoProgress = (): Progress => ({
  completed: [1, 2],
  selectedPuzzle: 3,
  settings: { still: false },
});

function isProgress(value: unknown): value is Progress {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Progress;
  return Array.isArray(candidate.completed)
    && candidate.completed.every((id) => Number.isInteger(id) && puzzles.some((puzzle) => puzzle.id === id))
    && Number.isInteger(candidate.selectedPuzzle)
    && puzzles.some((puzzle) => puzzle.id === candidate.selectedPuzzle)
    && Boolean(candidate.settings)
    && typeof candidate.settings.still === 'boolean';
}

export function storageKey(mode: PlayMode): string {
  return mode === 'demo' ? DEMO_KEY : REAL_KEY;
}

export function loadProgress(mode: PlayMode): { progress: Progress; recovered: boolean } {
  const fallback = mode === 'demo' ? demoProgress() : defaultProgress();
  try {
    const stored = window.localStorage.getItem(storageKey(mode));
    if (!stored) return { progress: fallback, recovered: false };
    const parsed = JSON.parse(stored) as unknown;
    if (!isProgress(parsed)) return { progress: fallback, recovered: true };
    return { progress: parsed, recovered: false };
  } catch {
    return { progress: fallback, recovered: true };
  }
}

export function saveProgress(mode: PlayMode, progress: Progress): void {
  window.localStorage.setItem(storageKey(mode), JSON.stringify(progress));
}

export function resetProgress(mode: PlayMode, settings?: Settings): Progress {
  const progress = mode === 'demo' ? demoProgress() : defaultProgress();
  if (settings) progress.settings = { ...settings };
  saveProgress(mode, progress);
  return progress;
}

export function abandonDemo(): void {
  window.localStorage.removeItem(DEMO_KEY);
}

export function isUnlocked(puzzle: Puzzle, progress: Progress): boolean {
  return puzzle.free || progress.completed.includes(puzzle.id);
}

export function nextPuzzle(currentId: number, completed: number[]): Puzzle {
  const remainingFree = puzzles.filter((puzzle) => puzzle.free && !completed.includes(puzzle.id));
  if (remainingFree.length) {
    const currentIndex = remainingFree.findIndex((puzzle) => puzzle.id > currentId);
    return remainingFree[currentIndex === -1 ? 0 : currentIndex];
  }
  return puzzles.find((puzzle) => puzzle.id === currentId) ?? puzzles[0];
}

export function complete(progress: Progress, puzzleId: number): Progress {
  const completed = progress.completed.includes(puzzleId)
    ? progress.completed
    : [...progress.completed, puzzleId].sort((a, b) => a - b);
  return {
    ...progress,
    completed,
    // Keep the solved card on screen so its ending belongs to the puzzle just completed.
    selectedPuzzle: puzzleId,
  };
}
