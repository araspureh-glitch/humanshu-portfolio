import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navigation({ introComplete = true }) {
  const location = useLocation()

  return (
    <motion.header
      initial={{ y: -30, opacity: 0, x: '-50%' }}
      animate={introComplete ? { y: 0, opacity: 1, x: '-50%' } : { y: -30, opacity: 0, x: '-50%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 pointer-events-auto max-w-[92vw]"
    >
      {/* Original Dark Floating Pill Nav Bar - 1:1 Match to User Image */}
      <div className="bg-[#050505]/90 text-white border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans font-medium transition-all duration-300 hover:border-white/35">
        
        {/* Home */}
        <Link 
          to="/" 
          className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white font-semibold' : 'text-neutral-300'}`}
        >
          Home
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-600 text-xs select-none">•</span>

        {/* Work */}
        <Link 
          to="/work" 
          className={`hover:text-white transition-colors ${location.pathname === '/work' ? 'text-white font-semibold' : 'text-neutral-300'}`}
        >
          Work
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-600 text-xs select-none">•</span>

        {/* Center Glowing White Pixel Dog Glyph Logo */}
        <Link 
          to="/" 
          aria-label="Home" 
          className="flex items-center justify-center text-white hover:scale-110 transition-transform px-1 sm:px-2 relative group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" viewBox="0 0 16 16">
            <path d="M9 2h3v2H9V2zM12 4h2v3h-2V4zM4 6h8v4H4V6zM2 8h3v6H2V8zM8 10h2v4H8v-4zM12 10h2v4h-2v-4z" />
          </svg>
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-600 text-xs select-none">•</span>

        {/* About */}
        <Link 
          to="/about" 
          className={`hover:text-white transition-colors ${location.pathname === '/about' ? 'text-white font-semibold' : 'text-neutral-300'}`}
        >
          About
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-600 text-xs select-none">•</span>

        {/* Contact */}
        <Link 
          to="/contact" 
          className={`hover:text-white transition-colors ${location.pathname === '/contact' ? 'text-white font-semibold' : 'text-neutral-300'}`}
        >
          Contact
        </Link>

      </div>
    </motion.header>
  )
}
