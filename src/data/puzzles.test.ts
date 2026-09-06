import { describe, expect, it } from 'vitest';
import { puzzleSolutionAudit } from '../../tests/fixtures/puzzle-solution-audit';
import { featuredPuzzle, nudgeRevealsAnswer, puzzles, validatePuzzles } from './puzzles';

describe('the authored anthology', () => {
  it('contains 40 structurally complete puzzle records', () => {
    expect(validatePuzzles(puzzles)).toEqual([]);
  });

  it('matches every configured answer to the independently reviewed solution fixture', () => {
    expect(puzzleSolutionAudit).toHaveLength(puzzles.length);
    expect(new Set(puzzleSolutionAudit.map((entry) => entry.id)).size).toBe(puzzles.length);
    for (const puzzle of puzzles) {
      const audit = puzzleSolutionAudit.find((entry) => entry.id === puzzle.id);
      expect(audit, `Puzzle ${puzzle.id} is missing an independent solution review.`).toBeDefined();
      expect(audit!.choiceValidity).toHaveLength(puzzle.choices.length);
      expect(audit!.choiceValidity.filter(Boolean), audit!.reasoning).toHaveLength(1);
      const reviewedAnswer = puzzle.choices[audit!.choiceValidity.findIndex(Boolean)];
      expect(puzzle.answer, audit!.reasoning).toBe(reviewedAnswer);
    }
  });

  it('keeps route crossing counts and the roof-shadow premise logically valid', () => {
    for (const [puzzleId, crossing] of [[35, 'Indigo bridge'], [40, 'Fold line']] as const) {
      const puzzle = puzzles[puzzleId - 1];
      const counts = puzzle.choices.map((choice) => choice.split(' → ').filter((stop) => stop === crossing).length);
      expect(counts, `Puzzle ${puzzleId} must offer one route for each crossing count.`).toEqual([1, 2, 0]);
      expect(counts.filter((count) => count === 1)).toHaveLength(1);
    }

    const fixedRoofHeight = 1;
    const lowMorningShadow = fixedRoofHeight / Math.tan(20 * Math.PI / 180);
    const nearMiddayShadow = fixedRoofHeight / Math.tan(60 * Math.PI / 180);
    expect(nearMiddayShadow).toBeLessThan(lowMorningShadow);
    expect(puzzles[25].answer).toBe(puzzles[25].choices[0]);
  });

  it('gives every anthology card its own title and ending', () => {
    expect(new Set(puzzles.map((puzzle) => puzzle.title)).size).toBe(40);
    expect(new Set(puzzles.map((puzzle) => puzzle.ending)).size).toBe(40);
    expect(puzzles.every((puzzle) => puzzle.ending.trim().split(/\s+/).length >= 5)).toBe(true);
  });

  it('@claim:spoiler-free-nudges gives every puzzle two distinct nudges that do not name its answer', () => {
    expect(puzzles.every((puzzle) => puzzle.hints.length === 2 && new Set(puzzle.hints).size === 2)).toBe(true);
    expect(puzzles.every((puzzle) => puzzle.hints.every((hint) => !nudgeRevealsAnswer(puzzle, hint)))).toBe(true);
  });

  it('keeps exactly five puzzles in the free sample', () => {
    expect(puzzles.filter((puzzle) => puzzle.free)).toHaveLength(5);
  });

  it('selects a deterministic featured puzzle for a given day', () => {
    expect(featuredPuzzle(new Date('2026-09-06T12:00:00Z')).id)
      .toBe(featuredPuzzle(new Date('2026-09-06T23:59:00Z')).id);
  });
});
