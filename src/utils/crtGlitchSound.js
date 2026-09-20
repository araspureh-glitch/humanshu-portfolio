/**
 * Procedural Web Audio API CRT TV Glitch Sound Generator
 * Synthesizes zero-latency analog CRT static pops, signal tearing noise,
 * and cathode ray tube hum bursts scoped exclusively for the Hero section.
 */

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }

  return audioCtx
}

let isMuted = false

export function setHeroGlitchMuted(muted) {
  isMuted = muted
}

export function isHeroGlitchMuted() {
  return isMuted
}

export function playCrtGlitchSound({ intensity = 0.30, duration = 0.16 } = {}) {
  if (isMuted) return

  try {
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== 'running') return

    const now = ctx.currentTime

    // 1. CRT Static Signal Noise (Varying Bandpass Filter - Loud & Crisp)
    const sampleRate = ctx.sampleRate
    const bufferSize = Math.floor(sampleRate * Math.min(duration, 0.30))
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      // White noise with random high-voltage crackle pops
      const crackle = Math.random() > 0.82 ? (Math.random() * 2 - 1) * 2.4 : (Math.random() * 2 - 1) * 0.95
      data[i] = crackle
    }

    const noiseNode = ctx.createBufferSource()
    noiseNode.buffer = buffer

    // Metallic CRT Bandpass Filter
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1400 + Math.random() * 1200, now)
    filter.Q.setValueAtTime(2.2, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(intensity * 0.45, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    noiseNode.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    noiseNode.start(now)
    noiseNode.stop(now + duration)

    // 2. High Frequency Voltage Snap (Crisp Crackle Pop)
    const snapOsc = ctx.createOscillator()
    snapOsc.type = 'square'
    snapOsc.frequency.setValueAtTime(2400 + Math.random() * 1600, now)
    snapOsc.frequency.exponentialRampToValueAtTime(200, now + duration * 0.4)

    const snapGain = ctx.createGain()
    snapGain.gain.setValueAtTime(intensity * 0.25, now)
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4)

    snapOsc.connect(snapGain)
    snapGain.connect(ctx.destination)

    snapOsc.start(now)
    snapOsc.stop(now + duration * 0.4)

    // 3. Analog Cathode Tube Sub-Hum (Punchy Low Frequency Buzz)
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(90 + Math.random() * 140, now)
    osc.frequency.exponentialRampToValueAtTime(30 + Math.random() * 15, now + duration)

    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(intensity * 0.30, now)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.85)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration)
  } catch (err) {
    // Fail silently if browser audio context is suspended or blocked
  }
}
