import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const animFrameId = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    // Mouse position update
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      mousePos.current = { x, y }

      // Update dot position immediately for zero lag
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
    }

    // Detect interactive elements hover (buttons, links, inputs)
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Render loop for smooth trailing ring
    const render = () => {
      const targetX = mousePos.current.x
      const targetY = mousePos.current.y
      ringPos.current.x += (targetX - ringPos.current.x) * 0.18
      ringPos.current.y += (targetY - ringPos.current.y) * 0.18

      if (cursorRingRef.current) {
        const scale = isHovered ? 1.6 : 1.0
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }

      animFrameId.current = requestAnimationFrame(render)
    }

    animFrameId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isHovered])

  if (isTouch) return null

  return (
    <>
      {/* Center Precision Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Outer Cursor Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white/70 pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out ${
          isHovered ? 'bg-white/15 border-white' : ''
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}

