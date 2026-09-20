import React from 'react'
import CrtFisheyeHeroCanvas from './ui/CrtFisheyeHeroCanvas'

export default function CinematicHero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[760px] max-h-[1150px] overflow-hidden bg-[#050505] text-[#F5F5F5] select-none flex flex-col justify-between"
    >
      {/* ==========================================
          1. FULL SCREEN RETRO CRT FISHEYE HERO VISUAL
          ========================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <CrtFisheyeHeroCanvas
          imageSrc="/camera-portrait.jpg"
          className="w-full h-full"
          distortionStrength={0.20}
          vignetteStrength={0.62}
          grainOpacity={0.08}
          scanlineOpacity={0.14}
          interactionStrength={0.02}
          animationSpeed={1.0}
        />

        {/* Crushed paper noise filter overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.10] mix-blend-overlay pointer-events-none">
          <filter id="crushedPaperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#crushedPaperNoise)" />
        </svg>

        {/* Dark Gradient Overlay at Bottom for Perfect Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,5,0.75)_100%)] pointer-events-none" />
      </div>

      {/* ==========================================
          2. HERO TYPOGRAPHY & METADATA CONTENT
          ========================================== */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col justify-between pt-20 sm:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28 pointer-events-none">
        
        {/* Upper Technical Numbers (Positioned under logo & Let's Talk button, scrolling with hero section) */}
        <div className="w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase select-none">
          <div>4B / 23:59:61</div>
          <div className="hidden sm:block">ERR:4B / 23:59:61</div>
        </div>

        <div>
          {/* Role & Coordinates Status Badge */}
          <div className="mb-5 sm:mb-6 pointer-events-auto space-y-1 font-mono text-xs sm:text-sm uppercase tracking-[0.16em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            <div className="font-semibold text-white">
              UI / UX DESIGNER
            </div>
            <div className="text-neutral-400 text-[11px] sm:text-xs tracking-widest">
              BASED IN INDIA — 20.5937° N, 78.9629° E
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl pointer-events-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Designing digital<br />
              experiences that people<br />
              actually want to use.
            </h1>
          </div>
        </div>

      </div>
    </section>
  )
}
