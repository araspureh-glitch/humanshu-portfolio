import { useTheme } from '../../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

// Sun icon SVG
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  )
}

// Moon icon SVG
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      id="theme-toggle-btn"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      onClick={toggleTheme}
      whileTap={{ scale: 0.90 }}
      whileHover={{ scale: 1.08 }}
      className="theme-toggle-btn"
      style={{ flexShrink: 0 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            className="theme-toggle-icon"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0,   scale: 1,   opacity: 1 }}
            exit={{    rotate:  90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SunIcon />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            className="theme-toggle-icon"
            initial={{ rotate:  90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0,   scale: 1,   opacity: 1 }}
            exit={{    rotate: -90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <MoonIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
