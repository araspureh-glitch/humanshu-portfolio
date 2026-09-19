import React, { useState } from 'react'
import AsciiPortraitCanvas from './ui/AsciiPortraitCanvas'

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


          {/* ------------------------------------------
              YELLOW HANDDRAWN STAR (Upper Left Accent)
              ------------------------------------------ */}
          <img
            src="/assets/08_yellow_handdrawn_star.png"
            alt="Star"
            className="absolute top-[12%] left-[42%] w-8 lg:w-10 h-auto pointer-events-none z-15 opacity-90 animate-star-pulse"
          />

          {/* ------------------------------------------
              PORTRAIT COLLAGE GROUP (MAIN + SECONDARY BEHIND)
              ------------------------------------------ */}
          <div className="absolute top-[6%] left-[36%] lg:left-[39%] w-[44vw] max-w-[540px] h-[72vh] max-h-[660px] pointer-events-auto z-20">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* SECONDARY PORTRAIT (02_secondary_portrait.png) - Z-10 (BEHIND MAIN PORTRAIT) */}
              <div
                onMouseEnter={() => setIsCameraHovered(true)}
                onMouseLeave={() => setIsCameraHovered(false)}
                className="group absolute top-[2%] right-[0%] lg:right-[2%] w-[48%] max-w-[240px] h-auto z-10 rotate-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-300 hover:rotate-12 hover:scale-105"
              >
                <img
                  src="/assets/02_secondary_portrait.png"
                  alt="Secondary Portrait"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* MAIN PORTRAIT ASCII CANVAS ART (21st.dev inspired Dither/ASCII Engine) */}
              <div className="relative z-20 w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20">
                <AsciiPortraitCanvas
                  imageSrc="/assets/ascii_source_photo.jpg"
                  className="w-full h-full"
                  width={520}
                  height={640}
                  config={{
                    renderMode: "dither",
                    bgMode: "none",
                    cellSize: 9,
                    contrast: 158,
                    animStyle: "shimmer",
                    animSpeed: { enabled: true, intensity: 100 },
                    animIntensity: { enabled: true, intensity: 60 }
                  }}
                />
              </div>
            </div>
          </div>

          {/* 21. Pixel Speech Bubble "SMILE :)" - Z-30 (Appears ONLY on hover over camera portrait) */}
          <div
            className={`absolute top-[2%] right-[7%] lg:right-[9%] w-28 sm:w-32 lg:w-36 h-auto pointer-events-none z-30 transition-all duration-300 ease-out transform ${
              isCameraHovered
                ? 'scale-100 opacity-100 -translate-y-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]'
                : 'scale-75 opacity-0 translate-y-2'
            }`}
          >
            <img
              src="/assets/21_smile_speech_bubble.png"
              alt="SMILE :)"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* ------------------------------------------
              HANDWRITTEN NOTE (14_design_builds_better_experiences_note.png)
              ------------------------------------------ */}
          <div className="absolute top-[14%] right-[0%] lg:right-[1%] w-[15vw] max-w-[190px] h-auto pointer-events-auto z-25 drop-shadow-[0_14px_30px_rgba(0,0,0,0.9)] animate-float-note">
            <img
              src="/assets/14_design_builds_better_experiences_note.png"
              alt="Design Builds Better Experiences Note"
              className="w-full h-auto object-contain"
            />
            {/* 20. White loop arrow under bottom-left of note */}
            <img
              src="/assets/20_white_loop_arrow.png"
              alt=""
              className="absolute -bottom-20 left-1 w-14 lg:w-16 h-auto pointer-events-none opacity-95 drop-shadow-md animate-arrow-nudge"
            />
          </div>

          {/* ------------------------------------------
              VINYL CIRCLE (03_vinyl_circle.png)
              ------------------------------------------ */}
          <div className="absolute top-[62%] left-[34%] lg:left-[36%] w-28 lg:w-36 h-28 lg:h-36 pointer-events-auto z-25 drop-shadow-[0_14px_28px_rgba(0,0,0,0.9)]">
            <img
              src="/assets/03_vinyl_circle.png"
              alt="Vinyl Circle"
              className="w-full h-full object-contain animate-vinyl-spin transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
            {/* 10. Handdrawn circle accent around vinyl */}
            <img
              src="/assets/10_handdrawn_circle.png"
              alt=""
              className="absolute -bottom-2 -left-2 w-12 h-12 pointer-events-none opacity-80"
            />
          </div>

          {/* ------------------------------------------
              MEGAPHONE STICKER (04_megaphone_sticker.png)
              ------------------------------------------ */}
          <div className="absolute top-[60%] right-[6%] lg:right-[8%] w-28 lg:w-36 h-auto pointer-events-auto z-25 drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] animate-sticker-wiggle transition-transform duration-300 hover:scale-110 cursor-pointer">
            <img
              src="/assets/04_megaphone_sticker.png"
              alt="Megaphone Sticker"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* ------------------------------------------
              HANDDRAWN ARROW WHITE (05_handdrawn_arrow_white.png)
              ------------------------------------------ */}
          <div className="absolute top-[48%] left-[28%] lg:left-[30%] w-16 lg:w-22 h-auto pointer-events-none z-22 opacity-85 -rotate-12">
            <img
              src="/assets/05_handdrawn_arrow_white.png"
              alt=""
              className="w-full h-auto"
            />
          </div>
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
