import React, { useState } from 'react'
import VaporHalftoneCanvas from './VaporHalftoneCanvas'

export default function CinematicHero({ introComplete, onAudioToggle, isPlaying }) {
  const [currentMode, setCurrentMode] = useState('dither')

  // User parameters configuration
  const vaporConfig = {
    renderMode: currentMode,
    bgMode: "blur",
    bgBlur: 12,
    bgOpacity: 85,
    cellSize: 9,
    coverage: 100,
    invert: false,
    styleBlend: "source-over",
    charSet: "standard",
    customChars: "",
    brightness: 5,
    contrast: 120,
    edgeEmphasis: 0,
    density: 0,
    tint: "#ff8a3d",
    tintOpacity: 22,
    overlayBlend: "soft-light",
    saturation: 110,
    grayscale: 0,
    pfx: {
      vignette: { enabled: true, intensity: 45 },
      scanLines: { enabled: false, intensity: 40 },
      chromatic: { enabled: false, intensity: 15 },
      bloom: { enabled: true, intensity: 65 },
      filmGrain: { enabled: false, intensity: 30 },
      glitch: { enabled: false, intensity: 20 },
      pixelate: { enabled: false, intensity: 15 },
      halftone: { enabled: true, intensity: 40 },
      filmDust: { enabled: false, intensity: 20 }
    },
    animated: true,
    animStyle: "shimmer",
    animSpeed: { enabled: true, intensity: 100 },
    animIntensity: { enabled: true, intensity: 65 },
    lights: { enabled: false, points: [] },
    mask: { enabled: false, tool: "freehand", brushSize: 30, showOverlay: false, invert: false, dataUrl: null, shapes: [] }
  }

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[760px] max-h-[1150px] overflow-hidden bg-[#050505] text-[#F5F5F5] select-none flex flex-col justify-between pt-20 pb-4"
    >
      {/* ==========================================
          1. VAPOR HALFTONE CANVAS BACKGROUND
          ========================================== */}
      <div className="absolute inset-0 w-full h-full z-0">
        <VaporHalftoneCanvas
          imageSrc="/assets/hero_ascii_source.jpg"
          customConfig={vaporConfig}
          className="w-full h-full"
        />

        {/* Dark Vignette Overlay for Crisp Typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)] pointer-events-none z-10" />

        {/* Paper Corner Accents */}
        <img
          src="/assets/11_green_torn_corner.png"
          alt=""
          className="absolute top-0 left-0 w-16 sm:w-22 lg:w-28 h-auto pointer-events-none z-20 opacity-90 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
        />
        <img
          src="/assets/12_purple_torn_corner.png"
          alt=""
          className="absolute bottom-0 left-0 w-28 sm:w-36 lg:w-48 h-auto pointer-events-none z-20 opacity-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
        />
        <img
          src="/assets/19_grid_torn_corner.png"
          alt=""
          className="absolute bottom-0 right-0 w-14 sm:w-18 lg:w-24 h-auto pointer-events-none z-20 opacity-90 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* ==========================================
          2. HERO OVERLAY CONTENT & TYPOGRAPHY
          ========================================== */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between py-6">
        
        {/* Top Badges & Render Mode Selectors */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>VAPOR HALFTONE PORTRAIT ENGINE</span>
          </div>

          {/* Quick Render Mode Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 bg-black/80 border border-white/15 p-1 rounded-xl backdrop-blur-md text-[11px] font-mono">
            {['dither', 'characters', 'matrix', 'mosaic', 'hexdump'].map((mode) => (
              <button
                key={mode}
                onClick={() => setCurrentMode(mode)}
                className={`px-3 py-1 rounded-lg uppercase transition-all duration-200 ${
                  currentMode === mode
                    ? 'bg-[#ff8a3d] text-black font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Central Hero Heading */}
        <div className="my-auto max-w-3xl space-y-6">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#ff8a3d] uppercase font-semibold">
              // MULTIDISCIPLINARY DESIGNER & DEVELOPER
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-sans">
              HUMANSHU <br />
              <span className="bg-gradient-to-r from-white via-amber-100 to-[#ff8a3d] bg-clip-text text-transparent">
                ARASPURE
              </span>
            </h1>
          </div>

          <p className="text-neutral-300 text-sm sm:text-lg max-w-xl leading-relaxed font-light">
            Blending visual design, tactile collage paper aesthetics, and real-time canvas dither algorithms into immersive web experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('about')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
              }}
              className="px-6 py-3 rounded-full bg-[#ff8a3d] text-black font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(255,138,61,0.4)] hover:bg-[#ffa366] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              EXPLORE PORTFOLIO
            </button>
            
            {onAudioToggle && (
              <button
                onClick={onAudioToggle}
                className="px-5 py-3 rounded-full bg-black/60 border border-white/20 text-white font-mono text-xs hover:border-[#ff8a3d] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{isPlaying ? '🔊 SOUND ON' : '🔇 MUTE SOUND'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator & Coordinates */}
        <div className="w-full flex items-center justify-between pb-2 pt-4 border-t border-white/10 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <img src="/assets/16_scroll_down_icon.png" alt="" className="w-4 h-5 object-contain" />
            <span className="font-bold text-neutral-200">SCROLL DOWN</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <span className="hidden sm:inline">MODE: {currentMode.toUpperCase()}</span>
            <span>21.1458° N 79.0882° E</span>
            <img src="/assets/17_coordinates_crosshair.png" alt="" className="w-4 h-4 object-contain opacity-80" />
          </div>
        </div>

      </div>
    </section>
  )
}
