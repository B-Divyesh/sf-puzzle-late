# Puzzle Late design system

## Direction

Puzzle Late is a small paper diorama at dusk. The game uses layered, slightly imperfect paper shapes instead of glass panels or game-dashboard chrome. That makes each deduction feel like a small, physical scene that can be read at a glance: a schedule card, a shadow cast across a page, or a route cut through a map.

The direction fits the product because players arrive after a daily puzzle and need an immediate, calm second challenge. It stays compact and legible on a phone rather than turning the game into a menu wall.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f6eddb` | Warm ivory page background |
| `--surface` | `#fffaf0` | Puzzle cards and readable plates |
| `--ink` | `#202647` | Deep indigo text and primary controls |
| `--rose` | `#a85064` | Muted rose paper accents |
| `--ochre` | `#9a6716` | Lamp, path, and completion accents |
| `--sage` | `#56735d` | Shadow and route guidance |
| `--focus` | `#0b5d6d` | High-contrast focus ring |

The dusk palette has a dark preference treatment in CSS. The product is not a generic dark mode inversion: the dark version keeps ivory text on deep-indigo surfaces, sage guidance, and rose paper accents. Body text and controls meet the 4.5:1 target in both treatments.

## Type, spacing, and shape

- Headings: locally bundled Fraunces 600, used for puzzle names and the single-page headline.
- Controls and body: locally bundled Atkinson Hyperlegible 400 for clear controls, clue text, and numerals.
- Scale: 18 px base text, a 4/8 px rhythm, and a 45–70 character reading measure.
- Shapes: square paper edges, one- to twelve-pixel offset shadows, thin ink outlines, and a few rounded cut-paper silhouettes. Cards indicate actual independent content: a playable puzzle, a shelf item, or an ending.

Both font files are self-hosted from the installed OFL Fontsource packages at build time. No font or script is loaded from a CDN.

## Interaction and motion

The active puzzle is on the first screen. A player reads a diagram, chooses an answer, receives immediate correct/wrong feedback, and either reaches a small ending card or loses both marks and restarts. Standard buttons make the game usable with pointer, touch, Enter, and Space; all targets are at least 44 px.

Motion is optional. There is no autoplay, looping animation, camera movement, sound, flashing, or timing requirement. The settings dialog has a local **Keep page motion still** choice, and `prefers-reduced-motion` disables smooth scrolling and any future transitions. The game has no real-time simulation because its challenge is deduction, not reaction time.

## Puzzle design and curve

All 40 puzzles are authored in `src/data/puzzles.ts`; none are scraped, generated at runtime, or based on a publisher’s archive.

- Puzzles 1–5: direct timing order and interval deductions, free to play.
- Puzzles 6–15: timing chains and middle-position deductions.
- Puzzles 16–28: light direction, shadow direction, and relative-length deductions.
- Puzzles 29–40: route constraints, stops, required places, closed paths, and total beats.

Each entry has one selectable valid answer, two non-spoiler nudges, a compact text-equivalent visual diagram, and a unique ending line. The unit suite validates this structure for the entire anthology. A dated local calculation selects the featured shelf item without sending the date anywhere.

## Original asset plan and provenance

- `public/sf-puzzle-late-og.png` is the product’s 1200×630 social image. It was generated on 2026-09-06 with the factory image deployment (`factory-image`) from the prompt recorded in `public/sf-puzzle-late-og.png.json`, then cropped and optimized locally. It depicts an original paper house, hills, moon, trees, and path; it has no text, brands, people, or watermark. It was visually reviewed for seams, unintended symbols, and text artifacts.
- `public/sf-puzzle-late-og.webp` is a WebP derivative, and `public/apple-touch-icon.png` is a cropped app-icon derivative. Neither is part of the initial game load.
- The first-screen diorama, puzzle diagrams, paper stack, and `public/favicon.svg` are hand-authored HTML/CSS/SVG shapes. They are original product assets, not a copied illustration system.

The generated social image is disclosed as factory-generated product imagery by this provenance record. Runtime play does not send images or puzzle data to any model or service.
