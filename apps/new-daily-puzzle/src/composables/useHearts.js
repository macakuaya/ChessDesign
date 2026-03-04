import { ref, watch } from 'vue'

export function useHearts(totalLives, moveState) {
  const lives = ref(totalLives)
  const heartsEntrance = ref(false)
  const heartbeatActive = ref(false)
  let heartbeatDelayTimer = null
  const breakingHeartIndex = ref(null)
  const breakingPhase = ref(null)
  let breakingHeartTimer = null
  let breakingShrinkTimer = null

  watch(lives, (val) => {
    if (heartbeatDelayTimer) { clearTimeout(heartbeatDelayTimer); heartbeatDelayTimer = null }
    if (val === 1) {
      heartbeatDelayTimer = setTimeout(() => { heartbeatActive.value = true }, 600)
    } else {
      heartbeatActive.value = false
    }
  })

  watch(moveState, (val) => {
    if (val !== 'awaiting' && val !== 'soft-hint' && val !== 'soft-solution') {
      heartbeatActive.value = false
      if (heartbeatDelayTimer) { clearTimeout(heartbeatDelayTimer); heartbeatDelayTimer = null }
    } else if (lives.value === 1 && !heartbeatActive.value && !heartbeatDelayTimer) {
      heartbeatDelayTimer = setTimeout(() => { heartbeatActive.value = true }, 600)
    }
  })

  let heartbeatAudioCtx = null
  let heartbeatInterval = null

  const playLubDub = () => {
    if (!heartbeatAudioCtx) return
    const ctx = heartbeatAudioCtx
    const now = ctx.currentTime

    const thud = (time, freq, gain, duration) => {
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      env.gain.setValueAtTime(gain, time)
      env.gain.exponentialRampToValueAtTime(0.001, time + duration)
      osc.connect(env)
      env.connect(ctx.destination)
      osc.start(time)
      osc.stop(time + duration)
    }

    thud(now, 50, 0.12, 0.10)
    thud(now + 0.30, 55, 0.18, 0.12)
  }

  const startHeartbeatSound = () => {
    try {
      heartbeatAudioCtx = new (window.AudioContext || window.webkitAudioContext)()
      playLubDub()
      heartbeatInterval = setInterval(playLubDub, 2000)
    } catch (e) { /* Web Audio not available */ }
  }

  const stopHeartbeatSound = () => {
    if (heartbeatInterval) { clearInterval(heartbeatInterval); heartbeatInterval = null }
    if (heartbeatAudioCtx) { heartbeatAudioCtx.close().catch(() => {}); heartbeatAudioCtx = null }
  }

  watch(heartbeatActive, (active) => {
    if (active) startHeartbeatSound()
    else stopHeartbeatSound()
  })

  const loseLife = () => {
    if (lives.value <= 0) return
    if (breakingHeartIndex.value !== null) {
      lives.value--
      return
    }
    breakingHeartIndex.value = lives.value
    breakingPhase.value = 'shrinking'

    if (breakingShrinkTimer) clearTimeout(breakingShrinkTimer)
    breakingShrinkTimer = setTimeout(() => {
      breakingShrinkTimer = null
      lives.value--
      breakingPhase.value = 'snapping'
    }, 195)

    if (breakingHeartTimer) clearTimeout(breakingHeartTimer)
    breakingHeartTimer = setTimeout(() => {
      breakingHeartIndex.value = null
      breakingPhase.value = null
      breakingHeartTimer = null
    }, 300)
  }

  const heartBreakStyle = (i) => {
    if (heartsEntrance.value && breakingHeartIndex.value !== i) {
      return { animationDelay: ((i - 1) * 120) + 'ms' }
    }
    return {}
  }

  const reset = (newTotalLives) => {
    lives.value = newTotalLives
    heartsEntrance.value = false
    heartbeatActive.value = false
    stopHeartbeatSound()
    if (heartbeatDelayTimer) { clearTimeout(heartbeatDelayTimer); heartbeatDelayTimer = null }
    breakingHeartIndex.value = null
    breakingPhase.value = null
    if (breakingHeartTimer) { clearTimeout(breakingHeartTimer); breakingHeartTimer = null }
    if (breakingShrinkTimer) { clearTimeout(breakingShrinkTimer); breakingShrinkTimer = null }
  }

  const cleanup = () => {
    if (breakingHeartTimer) { clearTimeout(breakingHeartTimer); breakingHeartTimer = null }
    if (breakingShrinkTimer) { clearTimeout(breakingShrinkTimer); breakingShrinkTimer = null }
    stopHeartbeatSound()
  }

  return {
    lives, heartsEntrance, heartbeatActive, breakingHeartIndex, breakingPhase,
    loseLife, heartBreakStyle, stopHeartbeatSound, reset, cleanup,
  }
}
