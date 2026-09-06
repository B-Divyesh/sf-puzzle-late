import { describe, expect, it } from 'vitest';
import { featuredPuzzle, puzzles, validatePuzzles } from './puzzles';

describe('the authored anthology', () => {
  it('contains 40 playable deductions with a valid answer, two nudges, and an ending', () => {
    expect(validatePuzzles(puzzles)).toEqual([]);
  });

  it('@claim:authored-content gives every anthology card its own title, ending, and playable answer', () => {
    expect(new Set(puzzles.map((puzzle) => puzzle.title)).size).toBe(40);
    expect(new Set(puzzles.map((puzzle) => puzzle.ending)).size).toBe(40);
    expect(puzzles.every((puzzle) => puzzle.choices.includes(puzzle.answer) && puzzle.hints.length === 2)).toBe(true);
  });

  it('keeps exactly five puzzles in the free sample', () => {
    expect(puzzles.filter((puzzle) => puzzle.free)).toHaveLength(5);
  });

  it('selects a deterministic featured puzzle for a given day', () => {
    expect(featuredPuzzle(new Date('2026-09-06T12:00:00Z')).id)
      .toBe(featuredPuzzle(new Date('2026-09-06T23:59:00Z')).id);
  });
});
