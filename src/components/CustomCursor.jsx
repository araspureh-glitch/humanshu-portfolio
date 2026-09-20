import React, { useEffect, useRef, useState } from 'react'

const GRID_SIZE = 22 // Pixel grid cell size in px

export default function CustomCursor() {
  const canvasRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const activePixels = useRef(new Map())
  const lastGridCell = useRef({ x: -1, y: -1 })
  const animFrameId = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Resize canvas to viewport
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Mouse position update & pixel grid trigger
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      mousePos.current = { x, y }

      // Update dot position immediately for zero lag
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      // Calculate grid coordinates for pxpush.com pixel grid effect
      const gx = Math.floor(x / GRID_SIZE) * GRID_SIZE
      const gy = Math.floor(y / GRID_SIZE) * GRID_SIZE

      if (gx !== lastGridCell.current.x || gy !== lastGridCell.current.y) {
        lastGridCell.current = { x: gx, y: gy }

        // Trigger cluster of pixel grid cells around cursor
        const offsets = [
          [0, 0],
          [-1, 0], [1, 0], [0, -1], [0, 1],
          [-1, -1], [1, 1], [-1, 1], [1, -1]
        ]

        offsets.forEach(([dx, dy], idx) => {
          const px = gx + dx * GRID_SIZE
          const py = gy + dy * GRID_SIZE
          const key = `${px}_${py}`

          const initialOpacity = idx === 0 ? 0.95 : idx <= 4 ? 0.6 : 0.3
          const initialSize = idx === 0 ? 1.0 : idx <= 4 ? 0.75 : 0.5

          activePixels.current.set(key, {
            x: px + GRID_SIZE / 2,
            y: py + GRID_SIZE / 2,
            size: initialSize,
            opacity: initialOpacity,
            decay: 0.04 + Math.random() * 0.02
          })
        })
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

    // Render loop for smooth trailing ring & fading pixel grid
    const render = () => {
      // Lerp ring position smoothly
      const targetX = mousePos.current.x
      const targetY = mousePos.current.y
      ringPos.current.x += (targetX - ringPos.current.x) * 0.18
      ringPos.current.y += (targetY - ringPos.current.y) * 0.18

      if (cursorRingRef.current) {
        const scale = isHovered ? 1.8 : 1.0
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }

      // Draw canvas pixel grid cells
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      activePixels.current.forEach((pixel, key) => {
        pixel.opacity -= pixel.decay
        pixel.size *= 0.96

        if (pixel.opacity <= 0) {
          activePixels.current.delete(key)
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${pixel.opacity})`
          
          // Draw crisp circle pixel dot
          const radius = (GRID_SIZE * 0.4) * pixel.size
          ctx.beginPath()
          ctx.arc(pixel.x, pixel.y, Math.max(1, radius), 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animFrameId.current = requestAnimationFrame(render)
    }

    animFrameId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isHovered])

  if (isTouch) return null

  return (
    <>
      {/* Pixel Grid Trail Canvas (PX PUSH style) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9990] mix-blend-difference"
      />

      {/* Center Precision Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Outer Cursor Circle Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-white/70 pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out ${
          isHovered ? 'bg-white/20 border-white' : ''
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
