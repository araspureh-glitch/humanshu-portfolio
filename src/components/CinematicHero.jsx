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

        {/* Paper texture noise filter */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.22] mix-blend-overlay">
          <filter id="crushedPaperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#crushedPaperNoise)" />
        </svg>

        {/* Crushed paper wrinkles overlay */}
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 35%, rgba(255,255,255,0.18) 0%, transparent 45%),
              radial-gradient(circle at 75% 70%, rgba(255,255,255,0.15) 0%, transparent 40%),
              linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
            `,
          }}
        />

        {/* 11. Green Crumpled Torn Corner (Top Left) - Half Size (1/2) */}
        <img
          src="/assets/11_green_torn_corner.png"
          alt=""
          className="absolute top-0 left-0 w-16 sm:w-22 lg:w-28 h-auto pointer-events-none z-10 opacity-95 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
        />

        {/* 12. Purple Torn Corner with Scribble (Bottom Left) - Half Size (50%) */}
        <img
          src="/assets/12_purple_torn_corner.png"
          alt=""
          className="absolute bottom-0 left-0 w-28 sm:w-36 lg:w-48 h-auto pointer-events-none z-10 opacity-95 drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
        />
        {/* 19. Grid Torn Corner Paper (Bottom Right) - Half Size (1/2) */}
        <img
          src="/assets/19_grid_torn_corner.png"
          alt=""
          className="absolute bottom-0 right-0 w-14 sm:w-18 lg:w-24 h-auto pointer-events-none z-10 opacity-95 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
        />

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
