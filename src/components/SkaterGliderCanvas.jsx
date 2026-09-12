import { useEffect, useRef } from 'react'

export default function SkaterGliderCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let startTime = Date.now()

    // Character Image
    const characterImg = new Image()
    characterImg.src = '/skater-portrait.png'

    // Particle & Speedline collections
    const speedLines = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 350,
      length: 40 + Math.random() * 90,
      speed: 8 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.35,
    }))

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 350,
      radius: 1 + Math.random() * 2.5,
      speedX: -(2 + Math.random() * 4),
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: 0.2 + Math.random() * 0.6,
    }))

    // Historical trail points for neon skateboard path
    const trailPoints = []

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = 380
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const width = canvas.width
      const height = canvas.height
      const centerY = height * 0.55

      ctx.clearRect(0, 0, width, height)

      // 1. Render Speed Lines (Horizontal velocity streaks)
      speedLines.forEach((line) => {
        line.x += line.speed
        if (line.x > width) line.x = -line.length
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.length, line.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // 2. Render Floating Ambient Dust Particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = width
        if (p.y < 0 || p.y > height) p.y = height / 2

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10, 102, 194, ${p.opacity})`
        ctx.shadowColor = '#00f0ff'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // 3. Compute Character Position (Moving Right to Left on Sine Wave)
      const travelSpeed = 160 // pixels per sec
      const totalDist = width + 300
      const charX = width + 150 - ((elapsed * travelSpeed) % totalDist)
      
      const waveFreq = 0.006
      const waveAmp = 32
      const charY = centerY + Math.sin(charX * waveFreq + elapsed * 2.5) * waveAmp

      // Calculate Slope / Rotation Angle along Sine Wave
      const dx = 1
      const dy = Math.cos(charX * waveFreq + elapsed * 2.5) * waveAmp * waveFreq
      const slopeAngle = Math.atan2(dy, dx)

      // Torso & Bounce motion physics
      const bounce = Math.abs(Math.sin(elapsed * 6)) * 4

      // Store trail point
      trailPoints.push({ x: charX + 20, y: charY + 38, alpha: 1 })
      if (trailPoints.length > 80) trailPoints.shift()

      // 4. Render Neon Skateboard Trail Path
      if (trailPoints.length > 1) {
        ctx.beginPath()
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y)
        for (let i = 1; i < trailPoints.length; i++) {
          ctx.lineTo(trailPoints[i].x, trailPoints[i].y)
        }
        ctx.strokeStyle = '#00F0FF'
        ctx.lineWidth = 4
        ctx.shadowColor = '#00F0FF'
        ctx.shadowBlur = 15
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // 5. Render Skater Character & Deck Container with Matrix Rotation
      ctx.save()
      ctx.translate(charX, charY + bounce)
      ctx.rotate(slopeAngle)

      // Draw Skateboard Deck
      const deckW = 110
      const deckH = 10
      ctx.fillStyle = '#EA5211'
      ctx.shadowColor = '#00F0FF'
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.roundRect(-deckW / 2, 20, deckW, deckH, 5)
      ctx.fill()
      ctx.shadowBlur = 0

      // Skateboard Deck Grip Top Accent Line
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(-deckW / 2 + 5, 20, deckW - 10, 2)

      // Fast Spinning Neon Wheels
      const wheelRadius = 8
      const wheelX1 = -deckW / 2 + 18
      const wheelX2 = deckW / 2 - 18
      const wheelY = 32
      const rotationAngle = elapsed * 35

      const drawWheel = (wx, wy) => {
        ctx.save()
        ctx.translate(wx, wy)
        ctx.rotate(-rotationAngle)

        // Outer wheel neon ring
        ctx.beginPath()
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2)
        ctx.fillStyle = '#111827'
        ctx.strokeStyle = '#00F0FF'
        ctx.lineWidth = 2.5
        ctx.shadowColor = '#00F0FF'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.stroke()

        // Rotating wheel spokes
        ctx.beginPath()
        ctx.moveTo(-wheelRadius + 2, 0)
        ctx.lineTo(wheelRadius - 2, 0)
        ctx.moveTo(0, -wheelRadius + 2)
        ctx.lineTo(0, wheelRadius - 2)
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.restore()
      }

      drawWheel(wheelX1, wheelY)
      drawWheel(wheelX2, wheelY)

      // Wheel Sparks / Trail Glow
      for (let s = 0; s < 3; s++) {
        const sparkX = wheelX2 + Math.random() * 25
        const sparkY = wheelY + (Math.random() - 0.5) * 6
        ctx.beginPath()
        ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#00F0FF'
        ctx.shadowColor = '#00F0FF'
        ctx.shadowBlur = 6
        ctx.fill()
      }

      // Render Character Cutout Image
      if (characterImg.complete && characterImg.naturalWidth !== 0) {
        const imgH = 170
        const imgW = (characterImg.naturalWidth / characterImg.naturalHeight) * imgH
        ctx.drawImage(characterImg, -imgW / 2 - 5, -imgH + 22, imgW, imgH)
      } else {
        // Fallback Vector Character Silhouette
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(0, -60, 20, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section className="w-full bg-[#050505] py-16 px-4 border-t border-b border-white/10 relative overflow-hidden">
      
      {/* Header Info Tag */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 px-6 z-10 relative">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span>03 / DYNAMIC MOTION ARCHITECTURE</span>
        </div>
        <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          60FPS VECTOR GLIDER • SMOOTH SEAMLESS LOOP
        </div>
      </div>

      {/* Canvas Container */}
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0a0a0c] to-[#050505] shadow-2xl">
        <canvas ref={canvasRef} className="w-full block" />
      </div>

    </section>
  )
}
