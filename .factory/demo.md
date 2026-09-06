# Demo sandbox

## Enter the sample

Open `https://puzzle-late.sociobot.in/demo`, or select **Try it with sample data** from the first screen.

The demo immediately opens Puzzle 3, “Blue kettle,” with Puzzles 1 and 2 already complete. This makes the shelf, progress marks, ending flow, and next-puzzle control visible without changing a visitor’s local game.

The **Demo — sample data, nothing is saved** label stays visible while demo mode is active, including on the privacy and terms routes. “Nothing is saved” means the demo never writes to the real progress key. Sample completion stays in the separate demo key after reload.

## Isolation and reset

- Real local progress key: `puzzle-late:progress:v1`
- Demo local progress key: `demo:puzzle-late:progress:v1`
- **Reset demo** restores the demo to Puzzles 1 and 2 complete with Puzzle 3 active.
- **Start for real** deletes the demo key, returns to `/`, and loads only the real key.

The app does not read or write the real progress key while the demo banner is shown. `@claim:demo-isolated` verifies real-data isolation and reset. `@claim:demo-persists` verifies the separate demo record after reload.
