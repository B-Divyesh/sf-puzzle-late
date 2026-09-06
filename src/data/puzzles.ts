export type PuzzleKind = 'timing' | 'shadow' | 'route';

export type Puzzle = {
  id: number;
  kind: PuzzleKind;
  title: string;
  scene: string;
  prompt: string;
  choices: string[];
  answer: string;
  hints: [string, string];
  ending: string;
  free: boolean;
  diagram: string[];
};

type AuthoredPuzzle = Omit<Puzzle, 'id' | 'free'>;

const timing: AuthoredPuzzle[] = [
  {
    kind: 'timing', title: 'Last lantern', scene: 'A ferry leaves a paper quay at dusk.',
    prompt: 'The ferry leaves after the moth lamp and before the bell. Which marker is its place?',
    choices: ['Moth lamp', 'Ferry flag', 'Bell'], answer: 'Ferry flag',
    hints: ['Place the ferry between the other two markers.', 'Only the middle marker can be after the lamp and before the bell.'],
    ending: 'The ferry flag folds into a small shorebird.', diagram: ['Moth lamp · beat 2', 'Ferry flag · beat 4', 'Bell · beat 6'],
  },
  {
    kind: 'timing', title: 'Pear clock', scene: 'Three notes reach a garden gate.',
    prompt: 'The pear note arrives two beats after the reed note. The gate opens at beat 5. Which note arrives at beat 3?',
    choices: ['Reed note', 'Pear note', 'Gate note'], answer: 'Reed note',
    hints: ['Count backward two beats from the pear note.', 'The pear note is at beat 5, so the reed note is at beat 3.'],
    ending: 'A pear-shaped clock keeps one quiet extra minute.', diagram: ['Reed note · beat 3', 'Pear note · beat 5', 'Gate note · beat 5'],
  },
  {
    kind: 'timing', title: 'Blue kettle', scene: 'A tea stall packs up under a blue roof.',
    prompt: 'The spoon is packed first. The kettle is packed last. Which item is packed between them?',
    choices: ['Spoon', 'Cup', 'Kettle'], answer: 'Cup',
    hints: ['Look for the single middle place.', 'The cup is the only item neither first nor last.'],
    ending: 'Steam turns into a small blue paper moon.', diagram: ['Spoon · beat 1', 'Cup · beat 3', 'Kettle · beat 5'],
  },
  {
    kind: 'timing', title: 'Cedar post', scene: 'A letter carrier follows the dusk posts.',
    prompt: 'Cedar comes before red. Red is at beat 4. Which post is at beat 2?',
    choices: ['Cedar post', 'Red post', 'Moon post'], answer: 'Cedar post',
    hints: ['The cedar post must be earlier than beat 4.', 'The route card places cedar at beat 2.'],
    ending: 'The cedar post sprouts a tiny paper branch.', diagram: ['Cedar post · beat 2', 'Red post · beat 4', 'Moon post · beat 6'],
  },
  {
    kind: 'timing', title: 'Pocket orchard', scene: 'A gardener closes three small gates.',
    prompt: 'Plum closes one beat before orchard. Orchard closes at beat 6. Which gate is at beat 5?',
    choices: ['Plum gate', 'Orchard gate', 'River gate'], answer: 'Plum gate',
    hints: ['Move one beat backward from the orchard gate.', 'The gate immediately before beat 6 is the plum gate.'],
    ending: 'A plum leaf becomes a bookmark for the next puzzle.', diagram: ['River gate · beat 3', 'Plum gate · beat 5', 'Orchard gate · beat 6'],
  },
  {
    kind: 'timing', title: 'Three umbrellas', scene: 'Rain starts on a market lane.',
    prompt: 'The striped umbrella opens after the ochre umbrella. The rose umbrella opens last. Which umbrella opens first?',
    choices: ['Ochre umbrella', 'Striped umbrella', 'Rose umbrella'], answer: 'Ochre umbrella',
    hints: ['Find the umbrella known to be before another.', 'The ochre umbrella is before striped, and rose is last.'],
    ending: 'Three umbrellas make a neat paper fan.', diagram: ['Ochre umbrella · beat 1', 'Striped umbrella · beat 3', 'Rose umbrella · beat 5'],
  },
  {
    kind: 'timing', title: 'Tin moon', scene: 'A watchmaker winds a small moon.',
    prompt: 'The key turns at beat 2. The moon rises three beats later. Which marker shows the moon rise?',
    choices: ['Key', 'Moon', 'Star'], answer: 'Moon',
    hints: ['Add three beats to the key turn.', 'Beat 2 plus three is beat 5, where the moon marker sits.'],
    ending: 'The tin moon catches a glint of the lantern.', diagram: ['Key · beat 2', 'Moon · beat 5', 'Star · beat 7'],
  },
  {
    kind: 'timing', title: 'Little theatre', scene: 'A paper actor enters after the curtain rises.',
    prompt: 'The curtain rises first. The lantern is lit last. Which part happens in the middle?',
    choices: ['Curtain rise', 'Actor enters', 'Lantern lit'], answer: 'Actor enters',
    hints: ['There is one action between first and last.', 'The actor enters after the curtain and before the lantern.'],
    ending: 'The actor bows, then folds flat into the stage.', diagram: ['Curtain rise · beat 1', 'Actor enters · beat 4', 'Lantern lit · beat 7'],
  },
  {
    kind: 'timing', title: 'Saffron stairs', scene: 'A courier climbs three painted steps.',
    prompt: 'The courier steps on saffron after sage, then reaches indigo. Which step is second?',
    choices: ['Sage', 'Saffron', 'Indigo'], answer: 'Saffron',
    hints: ['Read the order as a short sequence.', 'Sage comes first, saffron second, and indigo third.'],
    ending: 'The stair rail turns into a narrow gold ribbon.', diagram: ['Sage step · beat 2', 'Saffron step · beat 4', 'Indigo step · beat 6'],
  },
  {
    kind: 'timing', title: 'Night seed', scene: 'A seed packet travels through a greenhouse.',
    prompt: 'The packet reaches glass at beat 4, then soil two beats later. Which place is at beat 6?',
    choices: ['Glass table', 'Soil tray', 'Water jar'], answer: 'Soil tray',
    hints: ['Start at the given beat and count forward two.', 'Beat 4 followed by two beats is beat 6 at the soil tray.'],
    ending: 'A single seed opens into a paper star flower.', diagram: ['Water jar · beat 2', 'Glass table · beat 4', 'Soil tray · beat 6'],
  },
  {
    kind: 'timing', title: 'Copper ticket', scene: 'A station clerk stamps three tickets.',
    prompt: 'The copper ticket is stamped before the ivory ticket. The indigo ticket is stamped last. Which ticket can be first?',
    choices: ['Copper ticket', 'Ivory ticket', 'Indigo ticket'], answer: 'Copper ticket',
    hints: ['One ticket must occur before ivory, and indigo is last.', 'Copper is the only ticket that can take the first stamp.'],
    ending: 'The ticket gains a tiny stamped crescent.', diagram: ['Copper ticket · beat 1', 'Ivory ticket · beat 3', 'Indigo ticket · beat 5'],
  },
  {
    kind: 'timing', title: 'Rope bridge', scene: 'A bridge keeper checks three knots.',
    prompt: 'First knot: beat 1. Last knot: beat 7. Which knot is at beat 4?',
    choices: ['First knot', 'Middle knot', 'Last knot'], answer: 'Middle knot',
    hints: ['The middle beat is halfway between 1 and 7.', 'Beat 4 belongs to the middle knot.'],
    ending: 'The bridge holds a small folded river below it.', diagram: ['First knot · beat 1', 'Middle knot · beat 4', 'Last knot · beat 7'],
  },
  {
    kind: 'timing', title: 'Rose ferry', scene: 'A ferry collects three parcels at sunset.',
    prompt: 'The seed parcel is collected after the map parcel. The shell parcel is collected after the seed parcel. Which parcel is second?',
    choices: ['Map parcel', 'Seed parcel', 'Shell parcel'], answer: 'Seed parcel',
    hints: ['Put the parcels in the stated order.', 'Map comes first, seed second, shell third.'],
    ending: 'The rose ferry sails into the margin of the page.', diagram: ['Map parcel · beat 2', 'Seed parcel · beat 4', 'Shell parcel · beat 6'],
  },
  {
    kind: 'timing', title: 'Candle census', scene: 'A clerk notes which candle burns longest.',
    prompt: 'The short candle ends at beat 3. The tall candle lasts two beats longer. Which candle ends at beat 5?',
    choices: ['Short candle', 'Tall candle', 'Blue candle'], answer: 'Tall candle',
    hints: ['Add two beats to the short candle’s end.', 'The tall candle ends at beat 5.'],
    ending: 'The tall candle leaves a warm paper halo.', diagram: ['Short candle · beat 3', 'Tall candle · beat 5', 'Blue candle · beat 7'],
  },
  {
    kind: 'timing', title: 'Pocket radio', scene: 'A small radio sends three dusk signals.',
    prompt: 'The river signal plays before the tower signal. The final signal comes from the hill. Which signal is in the middle?',
    choices: ['River signal', 'Tower signal', 'Hill signal'], answer: 'Tower signal',
    hints: ['One signal is first and another is final.', 'River comes before tower, while hill is final, leaving tower in the middle.'],
    ending: 'The radio hum becomes a thin line of gold along the page.', diagram: ['River signal · beat 1', 'Tower signal · beat 4', 'Hill signal · beat 7'],
  },
];

const shadow: AuthoredPuzzle[] = [
  {
    kind: 'shadow', title: 'East window', scene: 'A small house has a low sun on its east side.',
    prompt: 'The sun shines from the east. Which side of the house receives its shadow?',
    choices: ['East side', 'West side', 'Roof'], answer: 'West side',
    hints: ['A shadow falls away from the light.', 'With light from the east, the shadow extends west.'],
    ending: 'The west wall collects a folded square of night.', diagram: ['Sun → east', 'House ◼ center', 'Shadow → west'],
  },
  {
    kind: 'shadow', title: 'Sage greenhouse', scene: 'A greenhouse stands near a south-facing wall.',
    prompt: 'A lamp is placed north of the greenhouse. Which edge stays in its shadow?',
    choices: ['North edge', 'South edge', 'Lamp edge'], answer: 'South edge',
    hints: ['The shadow lies opposite the lamp.', 'A north lamp sends the shadow to the south edge.'],
    ending: 'A sage leaf catches the outline and keeps it.', diagram: ['Lamp ↑ north', 'Greenhouse ◼ center', 'Shadow ↓ south'],
  },
  {
    kind: 'shadow', title: 'Two towers', scene: 'A narrow tower and a wide tower face the same dusk light.',
    prompt: 'Both towers receive light from the left. Which shadow points right?',
    choices: ['Narrow tower', 'Wide tower', 'Both towers'], answer: 'Both towers',
    hints: ['The light direction is shared.', 'Each tower casts away from the left-hand light.'],
    ending: 'The twin shadows join like two strips of paper.', diagram: ['Light ← left', 'Narrow ◼  Wide ◼', 'Shadows → right'],
  },
  {
    kind: 'shadow', title: 'Paper crane', scene: 'A crane rests above a square plaza.',
    prompt: 'The crane’s shadow falls down the page. Where is the light source?',
    choices: ['Above the crane', 'Below the crane', 'Inside the plaza'], answer: 'Above the crane',
    hints: ['Trace a shadow backward to its light.', 'A downward shadow means the light is above the crane.'],
    ending: 'The crane lifts one paper wing toward the lamp.', diagram: ['Light ↑ top', 'Crane ◇ center', 'Shadow ↓ bottom'],
  },
  {
    kind: 'shadow', title: 'Ochre arch', scene: 'An ochre arch frames a quiet lane.',
    prompt: 'The arch casts a shadow to the left. Which direction does the sun come from?',
    choices: ['Left', 'Right', 'Below'], answer: 'Right',
    hints: ['Light and shadow point away from each other.', 'A left-facing shadow needs light from the right.'],
    ending: 'The arch becomes a small doorway cut from gold paper.', diagram: ['Shadow ← left', 'Arch ∩ center', 'Sun → right'],
  },
  {
    kind: 'shadow', title: 'River marker', scene: 'Three markers stand beside a paper river.',
    prompt: 'The lantern is the tallest marker. With one shared low sun, which marker has the longest shadow?',
    choices: ['Stone', 'Lantern', 'Flag'], answer: 'Lantern',
    hints: ['All three use the same light angle.', 'At one light angle, the tallest marker makes the longest shadow.'],
    ending: 'The lantern’s long shadow becomes a riverbank.', diagram: ['Sun ↘ same angle', 'Stone ·  Flag ▴  Lantern ▮', 'Longest shadow: tallest'],
  },
  {
    kind: 'shadow', title: 'Folded hill', scene: 'A hill is folded along a north–south crease.',
    prompt: 'Light comes from the south. Which slope is lit?',
    choices: ['North slope', 'South slope', 'Crease only'], answer: 'South slope',
    hints: ['The slope facing the light is lit.', 'The south-facing slope meets the south light.'],
    ending: 'The hill crease gains a small indigo path.', diagram: ['Light ↑ from south', 'North slope /\ South slope', 'Lit face: south'],
  },
  {
    kind: 'shadow', title: 'Moon cup', scene: 'A cup sits beside a square evening lamp.',
    prompt: 'The lamp stands to the cup’s right. On which side of the cup is the shadow?',
    choices: ['Left side', 'Right side', 'Inside the cup'], answer: 'Left side',
    hints: ['The shadow takes the side opposite the lamp.', 'A lamp on the right puts the shadow on the left.'],
    ending: 'The cup holds one tiny reflected moon.', diagram: ['Shadow ← left', 'Cup ◜  Lamp ■', 'Lamp → right'],
  },
  {
    kind: 'shadow', title: 'Tiny silo', scene: 'A round silo has one painted door.',
    prompt: 'The door is on the west face. The western face is dark. Where is the sun?',
    choices: ['West', 'East', 'On the door'], answer: 'East',
    hints: ['The dark face points away from the sun.', 'If the west face is dark, light comes from the east.'],
    ending: 'The silo door opens onto a quiet paper field.', diagram: ['West door ◼ dark', 'Silo ◯', 'Sun → east'],
  },
  {
    kind: 'shadow', title: 'Pond sign', scene: 'A sign rises from a shallow pond.',
    prompt: 'The sign’s shadow points toward the pond. The pond is south of the sign. Where is the light?',
    choices: ['North', 'South', 'In the pond'], answer: 'North',
    hints: ['The shadow travels from the sign toward the south.', 'The light must come from north to cast southward.'],
    ending: 'The pond turns the sign into a second, wavering cut-out.', diagram: ['Sun ↑ north', 'Sign ▮', 'Pond ↓ south / shadow ↓'],
  },
  {
    kind: 'shadow', title: 'Rose roof', scene: 'A rose roof overhangs a narrow porch.',
    prompt: 'At dusk the roof shadow is shortest. What has changed from low morning sun?',
    choices: ['The sun is higher', 'The roof is lower', 'The porch moved'], answer: 'The sun is higher',
    hints: ['Object height has not changed.', 'Higher light makes a shorter shadow.'],
    ending: 'The roof edge becomes a clean rose line on the page.', diagram: ['Low sun → long shadow', 'High sun → short shadow', 'Roof height stays fixed'],
  },
  {
    kind: 'shadow', title: 'Quiet gate', scene: 'A gate has a lantern on each side.',
    prompt: 'The east lantern is lit. Which side of the gate stays darkest?',
    choices: ['East side', 'West side', 'Both sides'], answer: 'West side',
    hints: ['The lit lantern faces the east side.', 'The opposite west side receives the gate’s shadow.'],
    ending: 'The gate’s dark side folds into a pocket for a key.', diagram: ['East lantern ✦', 'Gate ║', 'West shadow ░'],
  },
  {
    kind: 'shadow', title: 'Map pin', scene: 'A tall map pin stands beside a small pebble.',
    prompt: 'Both cast shadows at the same time. Which clue lets you compare their lengths?',
    choices: ['Their heights', 'Their names', 'Their colors'], answer: 'Their heights',
    hints: ['The sun angle is equal for both objects.', 'At one angle, height determines the relative shadow length.'],
    ending: 'The map pin makes a small path from its shadow.', diagram: ['Same sun angle', 'Pin ▮ taller than pebble ·', 'Compare heights'],
  },
];

const route: AuthoredPuzzle[] = [
  {
    kind: 'route', title: 'Quay to kiln', scene: 'A courier crosses three paper streets.',
    prompt: 'Which route reaches the kiln in 4 beats without using the closed bridge?',
    choices: ['Quay → Reed → Kiln', 'Quay → Bridge → Kiln', 'Quay → Hill → Kiln'], answer: 'Quay → Reed → Kiln',
    hints: ['Ignore the route that names the closed bridge.', 'The reed route is the only open route marked 2 + 2 beats.'],
    ending: 'The kiln warms a small brick-red square on the map.', diagram: ['Quay—2—Reed—2—Kiln', 'Quay—×—Bridge—1—Kiln', 'Quay—3—Hill—3—Kiln'],
  },
  {
    kind: 'route', title: 'Archive lane', scene: 'Three lanes lead to a dusk archive.',
    prompt: 'Which route has the fewest stops from the square to the archive?',
    choices: ['Square → Archive', 'Square → Tree → Archive', 'Square → Well → Gate → Archive'], answer: 'Square → Archive',
    hints: ['Count the named arrows, not the scenery.', 'The direct line has one segment; every other choice has more.'],
    ending: 'The archive shelf opens to a single paper star.', diagram: ['Square—1—Archive', 'Square—1—Tree—1—Archive', 'Square—1—Well—1—Gate—1—Archive'],
  },
  {
    kind: 'route', title: 'Rose stair', scene: 'A rose stair connects a garden to a roof.',
    prompt: 'The garden-to-roof route must visit the bell but not the pond. Which route works?',
    choices: ['Garden → Bell → Roof', 'Garden → Pond → Roof', 'Garden → Gate → Roof'], answer: 'Garden → Bell → Roof',
    hints: ['One place is required and one place is forbidden.', 'Only the first route includes Bell without Pond.'],
    ending: 'The bell leaves a rose ring around the roof tile.', diagram: ['Garden—Bell—Roof', 'Garden—Pond—Roof', 'Garden—Gate—Roof'],
  },
  {
    kind: 'route', title: 'Cedar loop', scene: 'A messenger follows a loop around cedar trees.',
    prompt: 'Which route returns to Cedar without visiting the same stop twice?',
    choices: ['Cedar → Mill → Cedar', 'Cedar → Mill → Mill → Cedar', 'Cedar → Cedar → Mill'], answer: 'Cedar → Mill → Cedar',
    hints: ['A return is allowed; repeating an intermediate stop is not.', 'The first route visits Cedar, Mill, then Cedar with no repeated middle stop.'],
    ending: 'A cedar needle circles into a tiny green ring.', diagram: ['Cedar—Mill—Cedar', 'Cedar—Mill—Mill—Cedar', 'Cedar—Cedar—Mill'],
  },
  {
    kind: 'route', title: 'Lantern pass', scene: 'A lantern pass has one steep shortcut.',
    prompt: 'Which open route costs exactly 5 beats from porch to tower?',
    choices: ['Porch → Gate → Tower', 'Porch → Steps → Tower', 'Porch → Creek → Tower'], answer: 'Porch → Steps → Tower',
    hints: ['Add the two number marks on each route.', 'The steps route is marked 3 + 2, making 5.'],
    ending: 'The tower lantern points a narrow beam at the porch.', diagram: ['Porch—2—Gate—2—Tower', 'Porch—3—Steps—2—Tower', 'Porch—1—Creek—6—Tower'],
  },
  {
    kind: 'route', title: 'Seed road', scene: 'A seed cart must avoid a wet field.',
    prompt: 'Which route reaches the shed without the wet field?',
    choices: ['Cart → Orchard → Shed', 'Cart → Wet field → Shed', 'Cart → Wet field → Gate → Shed'], answer: 'Cart → Orchard → Shed',
    hints: ['Cross out any choice that names Wet field.', 'Only the orchard route never enters the wet field.'],
    ending: 'A seed rolls from the cart and becomes a small leaf.', diagram: ['Cart—Orchard—Shed', 'Cart—Wet field—Shed', 'Cart—Wet field—Gate—Shed'],
  },
  {
    kind: 'route', title: 'Indigo bridge', scene: 'A bridge links two quiet islands.',
    prompt: 'Which route uses the indigo bridge exactly once and reaches the island?',
    choices: ['Dock → Indigo bridge → Island', 'Dock → Indigo bridge → Dock → Island', 'Dock → Rope bridge → Island'], answer: 'Dock → Indigo bridge → Island',
    hints: ['The required bridge must appear once, not zero or twice.', 'Only the first route names Indigo bridge one time.'],
    ending: 'The indigo bridge folds into a line of night birds.', diagram: ['Dock—Indigo bridge—Island', 'Dock—Indigo bridge—Dock—Island', 'Dock—Rope bridge—Island'],
  },
  {
    kind: 'route', title: 'Museum porch', scene: 'A porter carries a framed map to a museum.',
    prompt: 'The porter can carry the map on flat paths only. Which route is allowed?',
    choices: ['Porch → Flat lane → Museum', 'Porch → Steep path → Museum', 'Porch → Steps → Museum'], answer: 'Porch → Flat lane → Museum',
    hints: ['Only a path marked flat fits the condition.', 'Flat lane is the sole route without steps or a steep path.'],
    ending: 'The framed map gains a small paper border.', diagram: ['Porch—Flat lane—Museum', 'Porch—Steep path—Museum', 'Porch—Steps—Museum'],
  },
  {
    kind: 'route', title: 'Quiet square', scene: 'A musician walks to a small square before rain.',
    prompt: 'Which route has two turns before the square?',
    choices: ['Door → Lane → Square', 'Door → Lane → Arch → Square', 'Door → Square'], answer: 'Door → Lane → Arch → Square',
    hints: ['Each stop between start and end represents a turn.', 'Lane and Arch are the two stops before Square.'],
    ending: 'The square holds a tiny folded music note.', diagram: ['Door—Lane—Square', 'Door—Lane—Arch—Square', 'Door—Square'],
  },
  {
    kind: 'route', title: 'Clockwork path', scene: 'A clockmaker sends a gear to the workshop.',
    prompt: 'Which route is the only one that passes the key before the workshop?',
    choices: ['Bench → Key → Workshop', 'Bench → Workshop → Key', 'Bench → Bell → Workshop'], answer: 'Bench → Key → Workshop',
    hints: ['The key must appear before, not after, the workshop.', 'The first route places Key between Bench and Workshop.'],
    ending: 'The gear clicks into a small paper clock face.', diagram: ['Bench—Key—Workshop', 'Bench—Workshop—Key', 'Bench—Bell—Workshop'],
  },
  {
    kind: 'route', title: 'Willow crossing', scene: 'A walker chooses between three crossings at the river.',
    prompt: 'Which route reaches the far bank in the least total beats?',
    choices: ['Bank → Willow → Far bank', 'Bank → Stone → Far bank', 'Bank → Ferry → Far bank'], answer: 'Bank → Stone → Far bank',
    hints: ['Add each pair of beat marks.', 'The stone crossing is marked 1 + 1, lower than the others.'],
    ending: 'A willow leaf floats across the final paper river.', diagram: ['Bank—2—Willow—2—Far bank', 'Bank—1—Stone—1—Far bank', 'Bank—2—Ferry—3—Far bank'],
  },
  {
    kind: 'route', title: 'Fold line', scene: 'A map is creased through a small town.',
    prompt: 'Which route crosses the fold line once and then stops at the studio?',
    choices: ['Town → Fold line → Studio', 'Town → Fold line → Town → Studio', 'Town → Studio'], answer: 'Town → Fold line → Studio',
    hints: ['Count the phrase “Fold line” in each route.', 'Only the first route crosses it exactly once.'],
    ending: 'The map crease becomes a narrow path to the studio door.', diagram: ['Town—Fold line—Studio', 'Town—Fold line—Town—Studio', 'Town—Studio'],
  },
];

const authored = [...timing, ...shadow, ...route];

export const puzzles: Puzzle[] = authored.map((puzzle, index) => ({
  ...puzzle,
  id: index + 1,
  free: index < 5,
}));

export const freePuzzles = puzzles.filter((puzzle) => puzzle.free);

export function validatePuzzles(items: Puzzle[]): string[] {
  const errors: string[] = [];
  if (items.length !== 40) errors.push(`Expected 40 puzzles; received ${items.length}.`);
  if (new Set(items.map((item) => item.id)).size !== items.length) errors.push('Puzzle IDs must be unique.');
  if (items.filter((item) => item.free).length !== 5) errors.push('Exactly five puzzles must be free.');
  items.forEach((item) => {
    if (!item.choices.includes(item.answer)) errors.push(`${item.title} has no selectable correct answer.`);
    if (item.hints.length !== 2 || item.hints.some((hint) => hint.trim().length < 12)) errors.push(`${item.title} needs two useful hints.`);
    if (!item.ending.trim()) errors.push(`${item.title} needs an ending.`);
    if (item.diagram.length < 3) errors.push(`${item.title} needs a visual deduction diagram.`);
  });
  return errors;
}

export function featuredPuzzle(date = new Date()): Puzzle {
  const day = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000);
  return puzzles[day % puzzles.length];
}
