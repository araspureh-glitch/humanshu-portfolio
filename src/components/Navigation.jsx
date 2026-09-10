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
      className="fixed top-6 left-1/2 z-50 pointer-events-auto max-w-[95vw]"
    >
      {/* Rectangular Nav Bar with Sharp Corners & Mini Corner Squares */}
      <div className="relative bg-black/60 text-white border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-2xl px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans font-normal transition-all duration-300 hover:border-white/40 hover:bg-black/80">
        
        {/* 4 Mini Corner Squares */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-black shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-black shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-black shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-black shadow-[0_0_6px_rgba(255,255,255,0.9)]" />

        {/* Home */}
        <Link 
          to="/" 
          className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300'}`}
        >
          Home
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/30 text-xs select-none">•</span>

        {/* Work */}
        <Link 
          to="/work" 
          className={`hover:text-white transition-colors ${location.pathname === '/work' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300'}`}
        >
          Work
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/30 text-xs select-none">•</span>

        {/* Center Pixel Dog Logo */}
        <Link 
          to="/" 
          aria-label="Home" 
          className="flex items-center justify-center text-white hover:scale-110 transition-transform px-1 sm:px-2"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" viewBox="0 0 16 16">
            <path d="M9 2h3v2H9V2zM12 4h2v3h-2V4zM4 6h8v4H4V6zM2 8h3v6H2V8zM8 10h2v4H8v-4zM12 10h2v4h-2v-4z" />
          </svg>
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/30 text-xs select-none">•</span>

        {/* About */}
        <Link 
          to="/about" 
          className={`hover:text-white transition-colors ${location.pathname === '/about' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300'}`}
        >
          About
        </Link>

        {/* Bullet Separator */}
        <span className="text-white/30 text-xs select-none">•</span>

        {/* Contact */}
        <Link 
          to="/contact" 
          className={`hover:text-white transition-colors ${location.pathname === '/contact' ? 'text-white font-semibold drop-shadow' : 'text-neutral-300'}`}
        >
          Contact
        </Link>

      </div>
    </motion.header>
  )
}
