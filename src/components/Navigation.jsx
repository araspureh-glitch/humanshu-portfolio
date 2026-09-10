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
      {/* Floating Pill Nav Bar - 1:1 Match to Inspo Image */}
      <div className="bg-white/95 text-neutral-800 border border-neutral-300/80 shadow-[0_8px_30px_rgb(0,0,0,0.18)] backdrop-blur-xl rounded-full px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans font-normal transition-all duration-300 hover:shadow-2xl hover:border-neutral-400">
        
        {/* Work */}
        <Link 
          to="/work" 
          className={`hover:text-black transition-colors ${location.pathname === '/work' ? 'text-black font-semibold' : 'text-neutral-700'}`}
        >
          Work
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-300 text-xs select-none">•</span>

        {/* Unplug */}
        <Link 
          to="/about" 
          className={`hover:text-black transition-colors ${location.pathname === '/about' ? 'text-black font-semibold' : 'text-neutral-700'}`}
        >
          Unplug
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-300 text-xs select-none">•</span>

        {/* Pixel Dog Glyph Logo (Center) */}
        <Link 
          to="/" 
          aria-label="Home" 
          className="flex items-center justify-center text-black hover:scale-110 transition-transform px-1 sm:px-2"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 16 16">
            <path d="M9 2h3v2H9V2zM12 4h2v3h-2V4zM4 6h8v4H4V6zM2 8h3v6H2V8zM8 10h2v4H8v-4zM12 10h2v4h-2v-4z" />
          </svg>
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-300 text-xs select-none">•</span>

        {/* Lab */}
        <Link 
          to="/work" 
          className="hover:text-black transition-colors text-neutral-700"
        >
          Lab
        </Link>

        {/* Bullet Separator */}
        <span className="text-neutral-300 text-xs select-none">•</span>

        {/* About */}
        <Link 
          to="/about" 
          className={`hover:text-black transition-colors ${location.pathname === '/about' ? 'text-black font-semibold' : 'text-neutral-700'}`}
        >
          About
        </Link>

      </div>
    </motion.header>
  )
}
