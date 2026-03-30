# Chess Prototypes

A monorepo for Chess.com UI prototypes with shared components.

## Live Demos

- **Landing**: https://macakuaya.github.io/ChessDesign/
- **Daily Puzzle**: https://macakuaya.github.io/ChessDesign/new-daily-puzzle/
- **Notifications**: https://macakuaya.github.io/ChessDesign/new-notifications/
- **Skills**: https://macakuaya.github.io/ChessDesign/skills/
- **Juicy Learn**: https://macakuaya.github.io/ChessDesign/juicy-learn/

## Structure

```
ChessDesign/
├── shared/
│   └── chess-components/        # Shared components (sounds, animations, celebrations)
├── apps/
│   ├── new-daily-puzzle/        # Daily Puzzle prototype
│   ├── new-notifications/       # Notifications prototype
│   ├── skills/                  # Skills prototype
│   └── juicy-learn/             # Juicy Learn prototype
├── landing/                     # Landing page
└── .github/workflows/           # Auto-deploy to GitHub Pages
```

## Development

### Running a prototype locally

```bash
cd apps/new-daily-puzzle
npm install
npm run dev
```

Same pattern for any app -- `cd` into the app folder, install, and run.

### Adding a new prototype

1. Create a new folder in `apps/`
2. Copy the structure from an existing app (e.g., `new-daily-puzzle`)
3. Update `vite.config.js` with the correct `base` path
4. Add build steps to `.github/workflows/deploy.yml`
5. Add link to `landing/index.html`

## Shared Components

Import shared components in any app using the `@chess/components` alias:

```js
import { BoardCelebration, SkillEarned } from '@chess/components'
import { playSound, useSound } from '@chess/components/sounds'
```

## Deployment

Automatic deployment to GitHub Pages on push to `main` branch.
