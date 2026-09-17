import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

import MosaicHeroCanvas from './MosaicHeroCanvas'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'

export default function CinematicHero({ introComplete = true, onAudioToggle, isPlaying }) {
  const { theme } = useTheme()
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
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-10"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      
      {/* Pixelated Hero Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
        <MosaicHeroCanvas imageSrc="/hero.jpg" tileSize={8} />

        {/* Minimal Subtle Gradients for Legibility Without Dimming the Portrait */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: theme === 'dark' 
              ? 'linear-gradient(to top, #050505 5%, rgba(5,5,5,0.2) 50%, transparent 100%)' 
              : 'linear-gradient(to top, #F8F7F4 5%, rgba(248,247,244,0.2) 50%, transparent 100%)' 
          }} 
        />
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: theme === 'dark' 
              ? 'linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.35) 45%, transparent 80%)' 
              : 'linear-gradient(to right, rgba(248,247,244,0.85) 0%, rgba(248,247,244,0.35) 45%, transparent 80%)' 
          }} 
        />
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
                  className="font-serif italic font-normal text-[#EA5211] tracking-normal px-1 inline-block cursor-default" 
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
                  className="font-serif italic font-normal text-[#EA5211] tracking-normal px-0.5 inline-block cursor-default" 
                  style={{ fontFamily: '"Instrument Serif", "Alex Brush", serif' }}
                >
                  use.
                </motion.span>
              </span>
            </h1>
          </motion.div>



        </div>
      </motion.div>

      {/* Fine Horizontal Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FFFFFF1A] z-10 pointer-events-none" />
    </section>
  )
}

