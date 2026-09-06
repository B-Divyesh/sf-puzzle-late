export type PuzzleSolutionAudit = {
  id: number;
  choiceValidity: readonly [boolean, boolean, boolean];
  reasoning: string;
};

// This fixture is intentionally separate from the production answer field. Each row
// records a manual deduction from the player-visible prompt and diagram. The browser
// claim test uses it to exercise every answer control and its resulting game state.
export const puzzleSolutionAudit: readonly PuzzleSolutionAudit[] = [
  { id: 1, choiceValidity: [false, true, false], reasoning: 'The ferry marker is between the moth lamp and bell.' },
  { id: 2, choiceValidity: [true, false, false], reasoning: 'The diagram places the reed note at beat 3.' },
  { id: 3, choiceValidity: [false, true, false], reasoning: 'The cup is the only item between the first and last items.' },
  { id: 4, choiceValidity: [true, false, false], reasoning: 'The cedar post is the earlier post shown at beat 2.' },
  { id: 5, choiceValidity: [true, false, false], reasoning: 'One beat before beat 6 is beat 5, where the plum gate is shown.' },
  { id: 6, choiceValidity: [true, false, false], reasoning: 'Ochre precedes striped while rose is fixed last.' },
  { id: 7, choiceValidity: [false, true, false], reasoning: 'Three beats after beat 2 is beat 5, the moon marker.' },
  { id: 8, choiceValidity: [false, true, false], reasoning: 'The actor is the only event between the first curtain and last lantern.' },
  { id: 9, choiceValidity: [false, true, false], reasoning: 'The stated order is sage, saffron, then indigo.' },
  { id: 10, choiceValidity: [false, true, false], reasoning: 'Two beats after glass at beat 4 is soil at beat 6.' },
  { id: 11, choiceValidity: [true, false, false], reasoning: 'Copper must precede ivory and indigo is last, so copper is first.' },
  { id: 12, choiceValidity: [false, true, false], reasoning: 'Beat 4 is halfway between beats 1 and 7.' },
  { id: 13, choiceValidity: [false, true, false], reasoning: 'The map, seed, shell chain places seed second.' },
  { id: 14, choiceValidity: [false, true, false], reasoning: 'Two beats after beat 3 is beat 5, where the tall candle ends.' },
  { id: 15, choiceValidity: [false, true, false], reasoning: 'Tower follows river and precedes the final hill signal.' },
  { id: 16, choiceValidity: [false, true, false], reasoning: 'A shadow falls west when its light comes from the east.' },
  { id: 17, choiceValidity: [false, true, false], reasoning: 'The south edge is opposite the lamp north of the greenhouse.' },
  { id: 18, choiceValidity: [false, false, true], reasoning: 'Shared left-side light sends both tower shadows right.' },
  { id: 19, choiceValidity: [true, false, false], reasoning: 'A downward shadow places the light above the crane.' },
  { id: 20, choiceValidity: [false, true, false], reasoning: 'A leftward shadow places the sun to the right.' },
  { id: 21, choiceValidity: [false, true, false], reasoning: 'At one light angle, the tallest marker makes the longest shadow.' },
  { id: 22, choiceValidity: [false, true, false], reasoning: 'The south slope faces the light arriving from the south.' },
  { id: 23, choiceValidity: [true, false, false], reasoning: 'A lamp to the right casts the cup shadow to the left.' },
  { id: 24, choiceValidity: [false, true, false], reasoning: 'A dark west face points away from a light source in the east.' },
  { id: 25, choiceValidity: [true, false, false], reasoning: 'A shadow extending south toward the pond comes from northern light.' },
  { id: 26, choiceValidity: [true, false, false], reasoning: 'Near midday the higher sun shortens a fixed roof shadow compared with low morning sun.' },
  { id: 27, choiceValidity: [false, true, false], reasoning: 'The side opposite the lit east lantern is the dark west side.' },
  { id: 28, choiceValidity: [true, false, false], reasoning: 'With one shared sun angle, object height determines shadow length.' },
  { id: 29, choiceValidity: [true, false, false], reasoning: 'The open reed route costs 2 + 2 beats; the alternatives are closed or cost 6.' },
  { id: 30, choiceValidity: [true, false, false], reasoning: 'The direct square-to-archive route has no intermediate stops.' },
  { id: 31, choiceValidity: [true, false, false], reasoning: 'Only the bell route includes the required bell and excludes the pond.' },
  { id: 32, choiceValidity: [true, false, false], reasoning: 'The mill route returns to Cedar without repeating its one intermediate stop.' },
  { id: 33, choiceValidity: [false, true, false], reasoning: 'The steps route costs 3 + 2 beats, exactly 5.' },
  { id: 34, choiceValidity: [true, false, false], reasoning: 'Only the orchard route reaches the shed without naming the wet field.' },
  { id: 35, choiceValidity: [true, false, false], reasoning: 'The direct route names the indigo bridge once; the return route names it twice and the rope route zero times.' },
  { id: 36, choiceValidity: [true, false, false], reasoning: 'Only the flat-lane route follows the flat-path condition.' },
  { id: 37, choiceValidity: [false, true, false], reasoning: 'Lane and arch are the two intermediate turns before the square.' },
  { id: 38, choiceValidity: [true, false, false], reasoning: 'Only the first route reaches the key before reaching the workshop.' },
  { id: 39, choiceValidity: [false, true, false], reasoning: 'The stone route costs 1 + 1 beats, less than the totals of 4 and 5.' },
  { id: 40, choiceValidity: [true, false, false], reasoning: 'The direct route names the fold line once; the return route names it twice and the last route zero times.' },
];
