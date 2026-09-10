import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navigation({ introComplete = true }) {
  const location = useLocation()

  return (
    <motion.header
      initial={{ y: -30, opacity: 0, x: '-50%' }}
      animate={introComplete ? { y: 0, opacity: 1, x: '-50%' } : { y: -30, opacity: 0, x: '-50%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 pointer-events-auto max-w-[94vw]"
    >
      {/* Floating Dark Glassmorphism Pill Nav Bar */}
      <div className="bg-black/60 text-white border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans font-medium transition-all duration-300 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
        
        {/* Home */}
        <Link 
          to="/" 
          className={`transition-colors duration-200 ${location.pathname === '/' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300 hover:text-white'}`}
        >
          Home
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/20 text-xs select-none">•</span>

        {/* Work */}
        <Link 
          to="/work" 
          className={`transition-colors duration-200 ${location.pathname === '/work' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300 hover:text-white'}`}
        >
          Work
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/20 text-xs select-none">•</span>

        {/* Center Pixel Dog Glyph Logo */}
        <Link 
          to="/" 
          aria-label="Home" 
          className="flex items-center justify-center text-white hover:scale-110 transition-transform px-1 sm:px-2"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" viewBox="0 0 16 16">
            <path d="M9 2h3v2H9V2zM12 4h2v3h-2V4zM4 6h8v4H4V6zM2 8h3v6H2V8zM8 10h2v4H8v-4zM12 10h2v4h-2v-4z" />
          </svg>
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/20 text-xs select-none">•</span>

        {/* About */}
        <Link 
          to="/about" 
          className={`transition-colors duration-200 ${location.pathname === '/about' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300 hover:text-white'}`}
        >
          About
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/20 text-xs select-none">•</span>

        {/* Contact */}
        <Link 
          to="/contact" 
          className={`transition-colors duration-200 ${location.pathname === '/contact' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300 hover:text-white'}`}
        >
          Contact
        </Link>

      </div>
    </motion.header>
  )
}
