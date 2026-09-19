import React, { useState } from 'react'

export default function CinematicHero() {
  const [isCameraHovered, setIsCameraHovered] = useState(false)

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[760px] max-h-[1150px] overflow-hidden bg-[#050505] text-[#F5F5F5] select-none flex flex-col justify-between pt-20 pb-4"
    >
      {/* ==========================================
          1. BLACK CRUSHED PAPER BACKGROUND & CORNERS
          ========================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Solid dark crushed paper base */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Black & White Hero Background Image */}
        <img
          src="/assets/hero_bg_bw.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 brightness-75 opacity-45 mix-blend-luminosity"
        />

        {/* Vignette & Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />

        {/* Edge Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      {/* ==========================================
          MAIN HERO COLLAGE CONTENT (STATIC HTML/CSS)
          ========================================== */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between">
        {/* ==========================================
            DESKTOP COLLAGE BOARD (MD & ABOVE)
            ========================================== */}
        <div className="hidden md:block relative w-full h-full">



        </div>

        {/* ==========================================
            DEDICATED RESPONSIVE MOBILE HERO (< 768px)
            ========================================== */}
        <div className="block md:hidden relative w-full h-full flex flex-col justify-between pt-2 pb-4 overflow-hidden">

        </div>

        {/* ==========================================
            SCROLL INDICATOR & COORDINATES
            ========================================== */}
        <div className="relative z-30 w-full flex items-center justify-between pb-4 pt-2 border-t border-white/10 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          {/* Left: Scroll Down Icon + Text */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }}
          >
            <img src="/assets/16_scroll_down_icon.png" alt="" className="w-4 h-5 object-contain" />
            <span className="font-bold">SCROLL DOWN</span>
          </div>

          {/* Right: Coordinates & Crosshair */}
          <div className="flex items-center gap-2 text-neutral-400">
            <span>21.1458° N 79.0882° E</span>
            <img src="/assets/17_coordinates_crosshair.png" alt="" className="w-4 h-4 object-contain opacity-80" />
          </div>
        </div>
      </div>
    </section>
  )
}
