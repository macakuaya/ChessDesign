# Juicy Learn Prototype -- Agent Context

## What This Is

A Vue 3 prototype at `ChessDesign/apps/juicy-learn/` that simulates Chess.com's lesson/puzzle experience with "juicy" animations. It runs via Vite (`npm run dev`) at `http://localhost:5173/ChessDesign/juicy-learn/`.

The entire app is a single ~2700-line file: `src/App.vue` (plus a small `src/components/CoachBubble.vue`). It uses `@chesscom/design-system` for UI components and icons.

## Architecture

- **No chessboard library** -- custom 8x8 grid with FEN parsing, click/drag move handling, and custom legal-move validation
- **Lesson data** is hardcoded in the `lessons` array (3 lessons, 5 questions each)
- **State machine** is ad-hoc refs: `lessonState` ('lesson-intro' | 'playing'), `questionState` ('intro' | 'wrong' | 'hint' | 'solution')

## Animation System

All animations are CSS keyframe-based with setTimeout orchestration (no animation library). Key animation functions:

- **`triggerSingleAnimation(square, color, label, onExplosion, onComplete)`** -- Core function. Shows a colored overlay on the square, a "+1" icon that grows then shrinks to a coin at top-right, a label pill that morphs into a colored circle, both fly to the progress bar. Explosion effect on landing. Duration: ~1850ms.
- **`triggerCorrectMoveAnimations(square, streakNumber)`** -- Chains two `triggerSingleAnimation` calls: first "Correct!" (green), then "Streak N" (streak-colored). After the streak animation starts, at 800ms it sets `correctBadgeSquare` to show a persistent green checkmark badge (z-index 3, hidden behind the coin at z-index 5, revealed when it flies away).
- **`triggerBrilliantAnimation(square, onComplete)`** -- Production-matching brilliant effect (1300ms main + 100ms wait + 300ms splashFadeOut). Entry: icon fadeingrow at center + "Brilliant!" text slides in from top. 700ms hold. Exit: icon slides to corner, text shrinks, icon-background expands. Then splashFadeOut: icon-bg scales 1→2 + fade out. Calls `onComplete` when done.
- **`triggerCheckmateAnimation(kingSquare, isBlackKing, onComplete)`** -- Red overlay + rotated king icon + "Checkmate" label. 800ms, then `onComplete`.

## Correct Move Flow (`tryMove` function)

When user makes the correct move, the flow depends on the question type:

1. **Intermediate correct (has continuation):** Shows green checkmark badge for 500ms, auto-plays opponent move, then user solves the continuation
2. **Correct with opponent response:** Badge for 500ms, opponent recaptures, then flying animations from opponent's square
3. **Checkmate:** Checkmate animation first, then Correct!/Streak flying coins
4. **Brilliant (`brilliant: true` on question):** Brilliant animation first (with splashFadeOut), then Correct!/Streak flying coins
5. **Standard:** Correct!/Streak flying coins directly

## Question Data Fields

```js
{
  fen: '...',                    // Starting position
  correctMove: { from, to, piece }, // The correct move
  brilliant: true,               // Optional: triggers brilliant animation
  kingSquare: 'g8',             // Optional: triggers checkmate animation
  opponentResponse: { from, to }, // Optional: opponent auto-plays after correct
  continuation: {                // Optional: multi-move puzzle
    opponentMove: { from, to },
    correctMove: { from, to, piece },
    intro, wrong, hint, solution
  },
  intro, wrong, hint, solution   // Coach bubble messages per state
}
```

## Key Reactive State

- `pieces` -- array of `{ type, square }` parsed from FEN
- `selectedSquare`, `lastMove`, `isDragging` -- interaction state
- `skillHighlight` / `skillHighlightLabel` -- which square has flying coin animation
- `brilliantHighlight` / `brilliantFadingOut` -- brilliant animation state
- `checkmateHighlight` / `checkmateKingColor` -- checkmate animation state
- `intermediateCorrectSquare` -- temporary green badge (500ms) for mid-puzzle correct moves
- `correctBadgeSquare` -- persistent green badge after flying points (cleared on next question)
- `streak` / `displayedStreak` -- streak counter (actual vs displayed, synced on explosion)
- `displayedProgress` -- progress bar percentage (synced on explosion)

## Production Chess.com Reference

The chess.com web repo is at `Chesscom/chess/` with puzzle code in:
- `client/web/puzzles/modules/puzzle-rated/` -- rated puzzle logic
- `client/web/puzzles/modules/puzzle-core/` -- core puzzle engine
- `client/web/puzzles/modules/chessboard/` -- board actions

Production puzzle animation flow: user solves → submitMoves() → API response → `pathAnimationActor` XState machine sequences flying coins (partial → brilliant → difficulty → time → streak). Each coin emits `FlyoutEffectBegin`/`FlyoutEffectEnd`. The correct badge (`addPostAnimationBoardGlyph`) fires on `FlyoutEffectBegin` of the first coin. Production brilliant uses `game.markings.addOne` with `animated: true` + `pillText`, removed via `removeOneWithAnimation({ type: 'splashFadeOut' })`.

## Recent Changes (this session)

1. **Correct badge after flying points** -- Added `correctBadgeSquare` ref + persistent green checkmark SVG. Appears at 800ms into the streak (last) animation, behind the coin (z-index 3), revealed when coin flies away. Cleared in `loadQuestion`.
2. **Brilliant animation** -- Marked 3rd puzzle (Qxd5, lesson 1 question 3) as `brilliant: true`. Rewrote brilliant CSS to match production: 300ms fadeingrow entry, 700ms hold, 300ms exit-to-corner with text shrink + icon-bg expand, then 100ms wait + 300ms splashFadeOut. Chains into Correct!/Streak afterward. Text positioned at `left: 90%` matching production's `--text-x-position`.
