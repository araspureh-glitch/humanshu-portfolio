import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navigation({ introComplete = true, activeSection: activeSectionProp = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Work', id: 'work', path: '/work' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ]

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={introComplete ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 w-full py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
          : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between text-xs font-mono tracking-widest uppercase">
        
        {/* Left: Minimal Editorial Brand Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2 text-sm tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          <span className="font-sans font-medium tracking-wider text-white text-sm uppercase">
            HUMANSHU <span className="text-neutral-500 font-mono text-[10px] lowercase tracking-normal">°26</span>
          </span>
        </Link>

        {/* Center Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] text-neutral-400">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-2 transition-colors duration-200 py-1 cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            to="/contact"
            className="hidden sm:flex px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase cursor-pointer"
          >
            <span>Let's talk</span>
            <span className="text-xs">↗</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>{mobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Auto-Layout Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070709]/95 border-b border-white/[0.08] backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-mono text-xs text-neutral-300">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/5 text-neutral-300 hover:text-white uppercase tracking-widest cursor-pointer"
              >
                <span>{item.name}</span>
                <span className="text-neutral-400">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}
