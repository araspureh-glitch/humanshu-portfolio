import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MosaicHeroCanvas from './MosaicHeroCanvas'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'

export default function CinematicHero({ introComplete = true }) {
  // Motion variants for container and elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] bg-[#050505] text-[#F5F5F5] overflow-hidden flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-10">
      
      {/* Mosaic Pixel Tile Layer with Ambient Depth (Static, Zero Hover Lag) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Light Orb behind portrait */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/[0.04] blur-[150px] pointer-events-none" />

        <MosaicHeroCanvas imageSrc="/hero.jpg" />

        {/* Minimal Editorial Gradient Overlays for Readability & Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={introComplete ? "visible" : "hidden"}
        className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none"
      >
        {/* UPPER SECTION: Intro Text & Right Positioning */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 sm:pt-8 pointer-events-none">
          
          {/* Upper Left: Small Intro Text */}
          <motion.div variants={itemVariants} className="md:col-span-6 space-y-1 font-mono text-[11px] sm:text-xs text-[#8A8A8A] tracking-wider leading-relaxed max-w-sm">
            <p className="text-white font-medium">UI/UX Designer.</p>
            <p>I turn complex problems into simple,</p>
            <p>meaningful digital experiences.</p>
          </motion.div>

          {/* Upper Right: Positioning Label & Coordinates */}
          <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col md:items-end justify-between space-y-2 text-right font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-medium">UI / UX DESIGNER</span>
            </div>
            <p className="text-neutral-400">Based in India — 20.5937° N, 78.9629° E</p>
          </motion.div>

        </div>

        {/* LOWER SECTION: Main Editorial Headline & Scroll Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-4 pointer-events-none">
          
          {/* Lower Left: Large Editorial Headline */}
          <motion.div variants={itemVariants} className="lg:col-span-9 pointer-events-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-extralight text-[#F5F5F5] tracking-tight leading-[0.95] max-w-4xl font-sans drop-shadow-2xl flex flex-wrap gap-x-[0.25em] gap-y-1">
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="inline-block cursor-default"
                >
                  Designing
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                  className="inline-block cursor-default"
                >
                  digital
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="font-serif italic font-normal bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent tracking-normal px-1 inline-block cursor-default" 
                  style={{ fontFamily: '"Instrument Serif", "Alex Brush", serif' }}
                >
                  experiences
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
                  className="inline-block cursor-default"
                >
                  that
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
                  className="inline-block cursor-default"
                >
                  people
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="inline-block cursor-default"
                >
                  actually
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.56 }}
                  className="inline-block cursor-default"
                >
                  want
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
                  className="inline-block cursor-default"
                >
                  to
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block py-1">
                <motion.span 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.68 }}
                  className="font-serif italic font-normal bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent tracking-normal px-0.5 inline-block cursor-default" 
                  style={{ fontFamily: '"Instrument Serif", "Alex Brush", serif' }}
                >
                  use.
                </motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Lower Right / Bottom Left: Scroll to explore */}
          <motion.div variants={itemVariants} className="lg:col-span-3 flex lg:justify-end items-center pointer-events-auto">
            <Link to="/work">
              <LiquidMetalButton viewMode="icon" />
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* Fine Horizontal Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-10 pointer-events-none" />
    </section>
  )
}

