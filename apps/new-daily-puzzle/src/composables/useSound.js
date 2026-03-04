const PUZZLE_SOUNDS = {
  correct: 'https://www.chess.com/bundles/web/sounds/correct-2-15.mp3',
  incorrect: 'https://www.chess.com/bundles/web/sounds/incorrect-2-15.mp3',
  puzzleSolved: 'https://www.chess.com/bundles/web/sounds/puzzles/solving/puzzle-solved.wav',
  levelUp: 'https://www.chess.com/bundles/web/sounds/puzzles/level_up/level_up_award.wav',
}

const puzzleSoundCache = {}
const preloadPuzzleSound = (key) => {
  if (!puzzleSoundCache[key]) {
    puzzleSoundCache[key] = new Audio(PUZZLE_SOUNDS[key])
    puzzleSoundCache[key].preload = 'auto'
  }
  return puzzleSoundCache[key]
}

Object.keys(PUZZLE_SOUNDS).forEach(preloadPuzzleSound)

const playPuzzleSound = (key) => {
  const audio = preloadPuzzleSound(key)
  audio.currentTime = 0
  audio.play().catch(error => console.warn('Failed to play sound:', error))
}

export function useSound() {
  return { playPuzzleSound }
}
