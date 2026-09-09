import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 5 curated international greetings for optimal rhythm
const GREETINGS = [
  'Bonjour',
  'Olá',
  'Namaste',
  'नमस्ते',
  'Hello',
]

export default function HelloIntro({ onComplete }) {
  const [shouldRender, setShouldRender] = useState(true)
  const [index, setIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // 1. Check prefers-reduced-motion & session storage
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeenIntro = sessionStorage.getItem('hasSeenMultilingualIntro') === 'true'

    if (prefersReducedMotion || hasSeenIntro) {
      setShouldRender(false)
      if (onComplete) onComplete()
      return
    }

    // Lock body scroll during intro animation
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Perfectly balanced rhythm (~460ms per word allows clear reading without dragging)
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex >= GREETINGS.length - 1) {
          clearInterval(interval)
          // Gentle hold on final 'Hello' before curtain slide
          setTimeout(() => {
            setIsExiting(true)
          }, 500)
          return prevIndex
        }
        return prevIndex + 1
      })
    }, 460)

    // Complete intro callback after exit curtain slide (~2.8s total)
    const completeTimer = setTimeout(() => {
      setShouldRender(false)
      sessionStorage.setItem('hasSeenMultilingualIntro', 'true')
      document.body.style.overflow = originalOverflow
      if (onComplete) onComplete()
    }, 2850)

    return () => {
      clearInterval(interval)
      clearTimeout(completeTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [onComplete])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="multilingual-preloader"
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#050505] text-white flex items-center justify-center pointer-events-auto select-none overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Centered Minimal Bullet + Vertical Text Mask ONLY */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-sans tracking-wide text-white">
            {/* Small White Circular Bullet/Dot with gentle pulse */}
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-white flex-shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />

            {/* Overflow Hidden Mask Viewport */}
            <div className="relative overflow-hidden h-[1.5em] flex items-center justify-start min-w-[130px] sm:min-w-[200px] md:min-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{
                    duration: 0.32,
                    ease: [0.25, 1, 0.35, 1], // Luxurious smooth deceleration curve
                  }}
                  className="inline-block whitespace-nowrap text-white font-light leading-none"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {GREETINGS[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Smooth GPU Curtain Slide */
        <motion.div
          key="curtain-exit"
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] pointer-events-none"
          style={{ transform: 'translateZ(0)' }}
        />
      )}
    </AnimatePresence>
  )
}
