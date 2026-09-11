import { useEffect, useRef, useState } from 'react'

export default function HorizontalLayout({ children, activeSection, onSectionChange }) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId = null
    let targetScrollLeft = container.scrollLeft
    let currentScrollLeft = container.scrollLeft

    // Smooth momentum animation loop
    const smoothScrollLoop = () => {
      const diff = targetScrollLeft - currentScrollLeft
      if (Math.abs(diff) > 0.5) {
        currentScrollLeft += diff * 0.18
        container.scrollLeft = currentScrollLeft
        animationFrameId = requestAnimationFrame(smoothScrollLoop)
      } else {
        currentScrollLeft = targetScrollLeft
        container.scrollLeft = targetScrollLeft
        animationFrameId = null
      }
    }

    const handleWheel = (e) => {
      // Check if target is inside a scrollable modal
      let target = e.target
      let isInnerScrollable = false
      while (target && target !== container) {
        if (target.getAttribute && target.getAttribute('data-inner-scroll') === 'true') {
          const isScrollable = target.scrollHeight > target.clientHeight
          if (isScrollable) {
            const atTop = target.scrollTop <= 0 && e.deltaY < 0
            const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 1 && e.deltaY > 0
            if (!atTop && !atBottom) {
              isInnerScrollable = true
              break
            }
          }
        }
        target = target.parentElement
      }

      if (!isInnerScrollable) {
        e.preventDefault()
        const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
        const maxScroll = container.scrollWidth - container.clientWidth
        
        targetScrollLeft = Math.max(0, Math.min(maxScroll, targetScrollLeft + delta * 1.5))

        if (!animationFrameId) {
          currentScrollLeft = container.scrollLeft
          animationFrameId = requestAnimationFrame(smoothScrollLoop)
        }
      }
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)

      // Active section detection based on horizontal position
      const sections = container.querySelectorAll('[data-section-id]')
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect()
        const secId = sec.getAttribute('data-section-id')
        if (rect.left <= window.innerWidth * 0.6 && rect.right >= window.innerWidth * 0.2) {
          if (onSectionChange && secId) {
            onSectionChange(secId)
          }
        }
      })
    }

    const handleKeyDown = (e) => {
      const maxScroll = container.scrollWidth - container.clientWidth
      if (e.key === 'ArrowRight') {
        targetScrollLeft = Math.min(maxScroll, container.scrollLeft + window.innerWidth * 0.6)
        if (!animationFrameId) {
          currentScrollLeft = container.scrollLeft
          animationFrameId = requestAnimationFrame(smoothScrollLoop)
        }
      } else if (e.key === 'ArrowLeft') {
        targetScrollLeft = Math.max(0, container.scrollLeft - window.innerWidth * 0.6)
        if (!animationFrameId) {
          currentScrollLeft = container.scrollLeft
          animationFrameId = requestAnimationFrame(smoothScrollLoop)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [onSectionChange])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Top Horizontal Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#0A66C2] via-indigo-500 to-purple-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(10,102,194,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Horizontal Scroll Hint Indicator at bottom right */}
      <div className="fixed bottom-6 right-8 z-40 hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-[11px] font-mono text-neutral-300 pointer-events-none shadow-xl">
        <span className="animate-pulse">SCROLL HORIZONTALLY</span>
        <span className="text-white font-bold">← →</span>
      </div>
    </div>
  )
}
