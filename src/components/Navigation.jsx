import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import MusicToggle from './ui/MusicToggle'
import { useTheme } from '../context/ThemeContext'

export default function Navigation({ introComplete = true, activeSection: activeSectionProp = 'home' }) {
  const { theme } = useTheme()
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
      className={`fixed top-0 left-0 right-0 z-40 w-full py-4 transition-all duration-500 ${
        scrolled
          ? theme === 'dark'
            ? 'backdrop-blur-xl border-b border-white/[0.12] shadow-2xl'
            : 'backdrop-blur-xl border-b border-black/[0.10] shadow-md'
          : ''
      }`}
      style={{
        background: scrolled
          ? 'var(--bg-nav-scrolled)'
          : theme === 'dark'
            ? 'linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0.60), transparent)'
            : 'linear-gradient(to bottom, rgba(248,247,244,0.95), rgba(248,247,244,0.60), transparent)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between font-mono uppercase" style={{ color: 'var(--text-nav)' }}>
        
        {/* Left: Signature HA. Monogram Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center tracking-tight hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/ha_signature_logo.png"
            alt="HA. Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Center Desktop Nav - Absolutely Centered */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-[13px]" style={{ color: 'var(--text-nav)' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                className={`relative flex items-center gap-2 transition-all duration-200 py-1 cursor-pointer font-mono text-[13px] tracking-[0.14em] uppercase ${
                  isActive 
                    ? 'font-bold' 
                    : 'font-medium'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(150,150,150,0.8)]"
                    style={{ background: 'var(--text-primary)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Desktop CTA + Theme Toggle + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            to="/contact"
            className="hidden sm:flex px-5 py-2 rounded-full transition-all duration-200 items-center gap-2 text-[11px] font-mono tracking-widest uppercase cursor-pointer"
            style={{
              border: '1px solid var(--border-nav)',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--text-primary)'
              e.currentTarget.style.color = 'var(--bg-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            <span>Let's talk</span>
            <span>→</span>
          </Link>

          {/* Music Audio Toggle */}
          <MusicToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-1.5"
            style={{
              border: '1px solid var(--border-nav)',
              background: 'var(--toggle-bg)',
              color: 'var(--text-primary)',
            }}
          >
            <span>{mobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Auto-Layout Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
          style={{
            background: 'var(--bg-nav-scrolled)',
            borderColor: 'var(--border-nav)',
          }}
        >
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 uppercase tracking-widest cursor-pointer font-medium transition-colors duration-150"
                style={{
                  borderBottom: '1px solid var(--border-primary)',
                  color: 'var(--text-nav)',
                }}
              >
                <span>{item.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}
