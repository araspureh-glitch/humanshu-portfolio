import React, { useState, useEffect } from 'react'
import CrtFisheyeHeroCanvas from './ui/CrtFisheyeHeroCanvas'

export default function CinematicHero() {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Parallax mouse tracker
  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20
      const y = (e.clientY / innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  // Scroll parallax tracker
  useEffect(() => {
    if (prefersReducedMotion) return
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const portraitParallaxY = prefersReducedMotion ? 0 : scrollY * 0.15
  const portraitScale = prefersReducedMotion ? 1.0 : Math.max(0.94, 1.0 - scrollY * 0.0003)
  const hudParallaxY = prefersReducedMotion ? 0 : scrollY * 0.08
  const textParallaxY = prefersReducedMotion ? 0 : scrollY * 0.22

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-screen min-h-[720px] max-h-[1100px] overflow-hidden bg-[#000000] text-[#FFFFFF] select-none flex flex-col justify-between grayscale"
    >
      {/* ==========================================
          1. BLACK CRUSHED PAPER & CRT VISUAL CONTAINER
          ========================================== */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${portraitParallaxY + mousePos.y * 0.4}px, 0) scale(${isHovered && !prefersReducedMotion ? 1.02 : portraitScale})`
        }}
      >
        <CrtFisheyeHeroCanvas
          imageSrc="/camera-portrait.jpg"
          className="w-full h-full"
          distortionStrength={0.32}
          vignetteStrength={0.70}
          grainOpacity={0.08}
          scanlineOpacity={0.14}
          chromaticAberration={0.40}
          interactionStrength={0.04}
          animationSpeed={1.0}
          imageZoom={1.0}
          isHovered={isHovered}
        />

        {/* Crushed Black Paper Noise Texture Filter */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.14] mix-blend-overlay pointer-events-none">
          <filter id="crushedPaperNoiseMono">
            <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#crushedPaperNoiseMono)" />
        </svg>

        {/* Monochromatic Dark Gradients for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.80)_100%)] pointer-events-none" />
      </div>

      {/* ==========================================
          2. SURVEILLANCE & SYSTEM TECHNICAL HUD OVERLAYS
          ========================================== */}
      {/* Top-Left Surveillance Timestamp */}
      <div 
        className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20 font-mono text-[11px] sm:text-xs text-neutral-400 tracking-[0.2em] uppercase space-y-1 pointer-events-none select-none"
        style={{ transform: `translate3d(${mousePos.x * -0.2}px, ${hudParallaxY + mousePos.y * -0.2}px, 0)` }}
      >
        <div className="flex items-center gap-2 text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>REC</span>
        </div>
        <div className="text-neutral-300">CAM_04 — SURVEILLANCE</div>
        <div className="text-neutral-500 font-mono">23:59:61</div>
      </div>

      {/* Top-Right Environmental Technical Text (Partially Viewport Cropped) */}
      <div 
        className="absolute top-6 -right-6 sm:top-10 sm:right-4 z-20 font-mono text-[10px] sm:text-xs text-neutral-500 tracking-[0.25em] uppercase text-right pointer-events-none select-none opacity-80"
        style={{ transform: `translate3d(${mousePos.x * 0.3}px, ${hudParallaxY}px, 0)` }}
      >
        <div className="text-white font-mono font-bold">ERR:4B / 23:59:61</div>
        <div>SYSTEM_ERROR // FRAME_DROP</div>
        <div className="text-neutral-600 hidden sm:block">DATA_CORRUPT: 0x88402</div>
      </div>

      {/* Mid-Right Signal Status HUD */}
      <div 
        className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 z-20 font-mono text-[10px] sm:text-xs text-neutral-400 tracking-[0.2em] uppercase space-y-2 pointer-events-none select-none hidden md:block"
        style={{ transform: `translate3d(${mousePos.x * 0.2}px, ${hudParallaxY}px, 0)` }}
      >
        <div className="border-r-2 border-neutral-400 pr-3 text-right">
          <div className="text-white font-semibold">SIGNAL_LOST</div>
          <div className="text-neutral-500 text-[9px]">FRAME_0048</div>
        </div>
      </div>

      {/* Bottom-Right System Tag */}
      <div 
        className="absolute bottom-10 right-6 sm:bottom-12 sm:right-12 z-20 font-mono text-[10px] sm:text-xs text-neutral-500 tracking-[0.2em] uppercase pointer-events-none select-none text-right hidden sm:block"
        style={{ transform: `translate3d(${mousePos.x * -0.3}px, ${hudParallaxY}px, 0)` }}
      >
        <div>NO_SIGNAL // 20.5937° N, 78.9629° E</div>
        <div className="text-neutral-600">ANALOG_CRT_TRANSMISSION</div>
      </div>

      {/* ==========================================
          3. EDITORIAL MONOCHROME HERO TYPOGRAPHY
          ========================================== */}
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-14 sm:pb-20 md:pb-24 lg:pb-28 mt-auto pointer-events-none"
        style={{ transform: `translate3d(${mousePos.x * 0.15}px, ${textParallaxY + mousePos.y * 0.15}px, 0)` }}
      >
        {/* Role & Secondary Metadata */}
        <div className="mb-4 sm:mb-6 pointer-events-auto flex items-center gap-3 font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-neutral-300">
          <span className="font-semibold text-white">GRAPHIC DESIGNER</span>
          <span className="text-neutral-600 font-light">/</span>
          <span className="text-neutral-400">UI/UX DESIGNER</span>
        </div>

        {/* Main Name Headline */}
        <div className="pointer-events-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-[0.90] font-sans drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            HUMANSHU<br />
            <span className="text-neutral-400 font-light">ARASPURE</span>
          </h1>
        </div>
      </div>

    </section>
  )
}

