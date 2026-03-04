import { ref } from 'vue'

const coachVoiceBase = import.meta.env.BASE_URL + 'audio/'
const COACH_VOICE_MAP = {
  'Welcome! It\'s nice to have you back.': 'intro.mp3',
  'Find the best move for white.': 'awaiting.mp3',
  "There's a better move, try again.": 'wrong.mp3',
  'Out of hearts! See the solution or keep trying on your own.': 'out-of-hearts.mp3',
  'Nice job! To learn a little more about this puzzle, watch the video.': 'solved.mp3',
  'Look at the bishop on e4': 'hint-bishop-e4.mp3',
  'Attack along the diagonal with the bishop': 'movehint-bishop.mp3',
  'Bd5 is correct!': 'correct-bd5.mp3',
  'Look at the rook on e1': 'hint-rook-e1.mp3',
  'Deliver checkmate with the rook': 'movehint-rook.mp3',
  'Re8# Checkmate!': 'correct-re8-checkmate.mp3',
}

const coachVoiceCache = {}
const preloadCoachVoice = (filename) => {
  if (!coachVoiceCache[filename]) {
    coachVoiceCache[filename] = new Audio(coachVoiceBase + filename)
    coachVoiceCache[filename].preload = 'auto'
  }
  return coachVoiceCache[filename]
}
Object.values(COACH_VOICE_MAP).forEach(preloadCoachVoice)

let activeCoachVoice = null
let coachVoiceEndedPromise = Promise.resolve()

export function useCoachVoice() {
  const coachVoiceMuted = ref(false)

  const playCoachVoice = (message) => {
    if (coachVoiceMuted.value) return
    if (activeCoachVoice) {
      activeCoachVoice.pause()
      activeCoachVoice.currentTime = 0
    }
    const filename = COACH_VOICE_MAP[message]
    if (!filename) return
    const audio = preloadCoachVoice(filename)
    audio.currentTime = 0
    audio.play().catch(e => console.warn('Coach voice playback failed:', e))
    activeCoachVoice = audio
    coachVoiceEndedPromise = new Promise(resolve => { audio.onended = resolve })
  }

  const waitForCoachVoice = () => coachVoiceEndedPromise

  const stopCoachVoice = () => {
    if (activeCoachVoice) {
      activeCoachVoice.pause()
      activeCoachVoice.currentTime = 0
      activeCoachVoice = null
    }
  }

  return { coachVoiceMuted, playCoachVoice, waitForCoachVoice, stopCoachVoice }
}
