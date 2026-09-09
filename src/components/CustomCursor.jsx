import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isHovered = false
    let isVisible = false
    let animationFrameId

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        if (ringRef.current) ringRef.current.style.opacity = '1'
        if (dotRef.current) dotRef.current.style.opacity = '1'
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        isHovered = true
      } else {
        isHovered = false
      }
    }

    const handleMouseLeave = () => {
      isVisible = false
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const render = () => {
      // Smooth lerp positioning
      ringX += (mouseX - ringX) * 0.35
      ringY += (mouseY - ringY) * 0.35

      const scale = isHovered ? 2.2 : 1

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Glassmorphic Outer Lens Ring matching reference image */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-300 ease-out"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="w-12 h-12 rounded-full border border-white/40 bg-white/[0.08] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.12),inset_0_0_12px_rgba(255,255,255,0.15)] flex items-center justify-center" />
      </div>

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      </div>
    </>
  )
}
