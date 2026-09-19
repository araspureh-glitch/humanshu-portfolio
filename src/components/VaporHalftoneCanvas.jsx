import React, { useEffect, useRef } from 'react'

const DEFAULT_CONFIG = {
  renderMode: "dither",
  bgMode: "blur",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 10,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 115,
  edgeEmphasis: 0,
  density: 0,
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  tint: "#ff8a3d",
  tintOpacity: 25,
  overlayBlend: "soft-light",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: true, intensity: 60 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: true, intensity: 40 },
    filmDust: { enabled: false, intensity: 20 }
  },
  animated: true,
  animStyle: "shimmer",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] },
  mask: { enabled: false, tool: "freehand", brushSize: 30, showOverlay: false, invert: false, dataUrl: null, shapes: [] }
}

const CHAR_SETS = {
  standard: " .:-=+*#%@",
  simple: " .:#@",
  blocks: " ░▒▓█",
  ascii: " .'`^\",:;Il!i>~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  binary: "01",
  minimal: " .*",
}

export default function VaporHalftoneCanvas({
  imageSrc = "/assets/hero_ascii_source.jpg",
  customConfig = {},
  className = ""
}) {
  const canvasRef = useRef(null)
  const config = { ...DEFAULT_CONFIG, ...customConfig }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId = null
    let isDisposed = false
    let startTime = performance.now()

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc

    // Offscreen canvas for sampling
    const sampleCanvas = document.createElement('canvas')
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true })

    // Offscreen background canvas
    const bgCanvas = document.createElement('canvas')
    const bgCtx = bgCanvas.getContext('2d')

    const render = () => {
      if (isDisposed || !img.complete || img.naturalWidth === 0) {
        if (!isDisposed) {
          animFrameId = requestAnimationFrame(render)
        }
        return
      }

      const rect = canvas.getBoundingClientRect()
      const width = Math.floor(rect.width || canvas.clientWidth || window.innerWidth)
      const height = Math.floor(rect.height || canvas.clientHeight || window.innerHeight)

      if (width === 0 || height === 0) {
        animFrameId = requestAnimationFrame(render)
        return
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        bgCanvas.width = width
        bgCanvas.height = height
      }

      const currentTime = (performance.now() - startTime) / 1000
      const speedMult = config.animSpeed?.enabled ? (config.animSpeed.intensity / 50) : 1
      const animTime = currentTime * speedMult
      const animAmp = config.animIntensity?.enabled ? (config.animIntensity.intensity / 100) : 0.6

      const cellSize = Math.max(3, config.cellSize || 10)
      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      if (sampleCanvas.width !== cols || sampleCanvas.height !== rows) {
        sampleCanvas.width = cols
        sampleCanvas.height = rows
      }

      // Calculate object-fit: cover draw dimensions
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = width / height
      let sWidth = cols, sHeight = rows, sX = 0, sY = 0

      if (imgAspect > canvasAspect) {
        sWidth = rows * imgAspect
        sX = (cols - sWidth) / 2
      } else {
        sHeight = cols / imgAspect
        sY = (rows - sHeight) / 2
      }

      // 1. Draw into sampling canvas
      sampleCtx.clearRect(0, 0, cols, rows)
      sampleCtx.drawImage(img, sX, sY, sWidth, sHeight)
      const imgData = sampleCtx.getImageData(0, 0, cols, rows).data

      // Draw background
      bgCtx.clearRect(0, 0, width, height)
      if (config.bgMode === 'blur') {
        bgCtx.save()
        bgCtx.filter = `blur(${config.bgBlur || 12}px) brightness(0.6)`
        let bgW = width, bgH = height, bgX = 0, bgY = 0
        if (imgAspect > canvasAspect) {
          bgW = height * imgAspect
          bgX = (width - bgW) / 2
        } else {
          bgH = width / imgAspect
          bgY = (height - bgH) / 2
        }
        bgCtx.drawImage(img, bgX, bgY, bgW, bgH)
        bgCtx.restore()
      } else if (config.bgMode === 'photo') {
        bgCtx.drawImage(img, 0, 0, width, height)
      } else if (config.bgMode === 'color') {
        bgCtx.fillStyle = '#09090b'
        bgCtx.fillRect(0, 0, width, height)
      }

      // Clear main canvas
      ctx.clearRect(0, 0, width, height)

      // Render Step 1: Draw BG with bgOpacity
      ctx.save()
      ctx.globalAlpha = (config.bgOpacity !== undefined ? config.bgOpacity : 90) / 100
      ctx.drawImage(bgCanvas, 0, 0)
      ctx.restore()

      // Render Step 2 & 3: Render Grid Shapes
      const charSetString = config.customChars || CHAR_SETS[config.charSet] || CHAR_SETS.standard
      const contrastFactor = Math.max(0, (config.contrast !== undefined ? config.contrast : 115) / 100)
      const brightnessOffset = (config.brightness || 0) / 100
      const coveragePct = (config.coverage !== undefined ? config.coverage : 100) / 100

      ctx.save()
      ctx.globalCompositeOperation = config.styleBlend || 'source-over'

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (coveragePct < 1 && Math.sin(r * 12.9898 + c * 78.233) * 43758.5453 % 1 > coveragePct) {
            continue
          }

          const idx = (r * cols + c) * 4
          let red = imgData[idx]
          let green = imgData[idx + 1]
          let blue = imgData[idx + 2]
          const alpha = imgData[idx + 3]

          if (alpha < 10) continue

          // Luminance 0..1
          let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255.0

          // Contrast & Brightness
          lum = (lum - 0.5) * contrastFactor + 0.5 + brightnessOffset
          lum = Math.min(1, Math.max(0, lum))

          if (config.invert) lum = 1 - lum

          // Animation Shimmer / Wave / Pulse
          if (config.animated) {
            let animMod = 0
            if (config.animStyle === 'shimmer') {
              animMod = Math.sin(c * 0.25 + r * 0.2 + animTime * 3) * 0.18 * animAmp
            } else if (config.animStyle === 'wave') {
              animMod = Math.sin(c * 0.15 + animTime * 4) * 0.2 * animAmp
            } else if (config.animStyle === 'pulse') {
              animMod = Math.sin(animTime * 3) * 0.15 * animAmp
            } else if (config.animStyle === 'ripple') {
              const dx = c - cols / 2
              const dy = r - rows / 2
              const dist = Math.sqrt(dx * dx + dy * dy)
              animMod = Math.sin(dist * 0.3 - animTime * 4) * 0.2 * animAmp
            } else if (config.animStyle === 'flicker') {
              animMod = (Math.random() - 0.5) * 0.25 * animAmp
            }
            lum = Math.min(1, Math.max(0, lum + animMod))
          }

          const posX = c * cellSize
          const posY = r * cellSize
          const centerX = posX + cellSize / 2
          const centerY = posY + cellSize / 2

          // Apply Saturation & Grayscale to sampled color
          if (config.grayscale > 0) {
            const gVal = 0.299 * red + 0.587 * green + 0.114 * blue
            const gRatio = config.grayscale / 100
            red = red * (1 - gRatio) + gVal * gRatio
            green = green * (1 - gRatio) + gVal * gRatio
            blue = blue * (1 - gRatio) + gVal * gRatio
          }

          const fillStyle = `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${alpha / 255})`
          ctx.fillStyle = fillStyle
          ctx.strokeStyle = fillStyle

          const renderMode = config.renderMode || 'dither'

          if (renderMode === 'dither' || renderMode === 'dots') {
            const maxRadius = (cellSize / 2) * 0.95
            const radius = maxRadius * lum
            if (radius > 0.4) {
              ctx.beginPath()
              ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
              ctx.fill()
            }
          } else if (renderMode === 'characters') {
            const charIdx = Math.floor(lum * (charSetString.length - 1))
            const char = charSetString[charIdx] || ' '
            ctx.font = `bold ${Math.floor(cellSize * 1.1)}px monospace`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(char, centerX, centerY)
          } else if (renderMode === 'mosaic' || renderMode === 'pixel') {
            ctx.fillRect(posX + 0.5, posY + 0.5, cellSize - 1, cellSize - 1)
          } else if (renderMode === 'cross') {
            const arm = (cellSize / 2) * lum
            ctx.lineWidth = Math.max(1, cellSize * 0.15)
            ctx.beginPath()
            ctx.moveTo(centerX - arm, centerY)
            ctx.lineTo(centerX + arm, centerY)
            ctx.moveTo(centerX, centerY - arm)
            ctx.lineTo(centerX, centerY + arm)
            ctx.stroke()
          } else if (renderMode === 'diamond') {
            const dSize = (cellSize / 2) * lum
            ctx.beginPath()
            ctx.moveTo(centerX, centerY - dSize)
            ctx.lineTo(centerX + dSize, centerY)
            ctx.lineTo(centerX, centerY + dSize)
            ctx.lineTo(centerX - dSize, centerY)
            ctx.closePath()
            ctx.fill()
          } else if (renderMode === 'lines' || renderMode === 'diagonal') {
            const h = cellSize * lum
            ctx.fillRect(posX, centerY - h / 2, cellSize, h)
          } else if (renderMode === 'matrix') {
            const katakana = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890:*"
            const matrixChar = katakana[Math.floor((c * 17 + r * 31 + Math.floor(animTime * 12)) % katakana.length)]
            ctx.fillStyle = `rgba(34, 197, 94, ${lum * 0.9 + 0.1})`
            ctx.font = `${Math.floor(cellSize * 1.0)}px monospace`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(matrixChar, centerX, centerY)
          } else if (renderMode === 'hexdump') {
            const hex = Math.floor(lum * 255).toString(16).padStart(2, '0').toUpperCase()
            ctx.font = `${Math.floor(cellSize * 0.75)}px monospace`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(hex, centerX, centerY)
          } else if (renderMode === 'hexagons') {
            const hexR = (cellSize / 2) * lum
            ctx.beginPath()
            for (let a = 0; a < 6; a++) {
              const angle = (a * Math.PI) / 3
              const hx = centerX + hexR * Math.cos(angle)
              const hy = centerY + hexR * Math.sin(angle)
              if (a === 0) ctx.moveTo(hx, hy)
              else ctx.lineTo(hx, hy)
            }
            ctx.closePath()
            ctx.fill()
          } else {
            // Default fallback shape: scalable rounded dither dot
            const radius = (cellSize / 2) * lum
            if (radius > 0.4) {
              ctx.beginPath()
              ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }
      ctx.restore()

      // Render Step 4: Tint Overlay (#ff8a3d @ 25% soft-light opacity)
      if (config.tint && config.tintOpacity > 0) {
        ctx.save()
        ctx.globalCompositeOperation = config.overlayBlend || 'soft-light'
        ctx.globalAlpha = (config.tintOpacity || 25) / 100
        ctx.fillStyle = config.tint
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // Render Step 5: Post-FX Pipeline
      const pfx = config.pfx || {}

      // Bloom Effect (Glow)
      if (pfx.bloom?.enabled) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = (pfx.bloom.intensity / 100) * 0.45
        ctx.filter = 'blur(10px) brightness(1.2)'
        ctx.drawImage(canvas, 0, 0)
        ctx.restore()
      }

      // Halftone Subtle Dot Screen Overlay
      if (pfx.halftone?.enabled) {
        ctx.save()
        ctx.globalCompositeOperation = 'overlay'
        ctx.globalAlpha = (pfx.halftone.intensity / 100) * 0.15
        const patternCanvas = document.createElement('canvas')
        patternCanvas.width = 6
        patternCanvas.height = 6
        const pCtx = patternCanvas.getContext('2d')
        pCtx.fillStyle = '#ffffff'
        pCtx.fillRect(0, 0, 6, 6)
        pCtx.fillStyle = '#000000'
        pCtx.beginPath()
        pCtx.arc(3, 3, 1.5, 0, Math.PI * 2)
        pCtx.fill()
        const pattern = ctx.createPattern(patternCanvas, 'repeat')
        if (pattern) {
          ctx.fillStyle = pattern
          ctx.fillRect(0, 0, width, height)
        }
        ctx.restore()
      }

      // Vignette Effect
      if (pfx.vignette?.enabled) {
        ctx.save()
        const vigIntensity = (pfx.vignette.intensity / 100) * 0.85
        const grad = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.25,
          width / 2, height / 2, Math.max(width, height) * 0.75
        )
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, `rgba(0,0,0,${vigIntensity})`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // Scanlines Effect
      if (pfx.scanLines?.enabled) {
        ctx.save()
        ctx.fillStyle = `rgba(0,0,0, ${(pfx.scanLines.intensity / 100) * 0.25})`
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 2)
        }
        ctx.restore()
      }

      // Chromatic Aberration
      if (pfx.chromatic?.enabled) {
        ctx.save()
        const shift = (pfx.chromatic.intensity / 100) * 4
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = 0.3
        ctx.drawImage(canvas, -shift, 0)
        ctx.drawImage(canvas, shift, 0)
        ctx.restore()
      }

      // Film Grain
      if (pfx.filmGrain?.enabled) {
        ctx.save()
        ctx.globalCompositeOperation = 'overlay'
        ctx.globalAlpha = (pfx.filmGrain.intensity / 100) * 0.08
        ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }

      // Render Step 6: Lights Points
      if (config.lights?.enabled && config.lights.points?.length > 0) {
        ctx.save()
        config.lights.points.forEach(light => {
          const lx = light.x * width
          const ly = light.y * height
          const lRadius = (light.radius || 100)
          const lInt = (light.intensity || 50) / 100
          const lGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lRadius)
          lGrad.addColorStop(0, `rgba(255, 138, 61, ${lInt})`)
          lGrad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.globalCompositeOperation = 'screen'
          ctx.fillStyle = lGrad
          ctx.beginPath()
          ctx.arc(lx, ly, lRadius, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.restore()
      }

      if (config.animated && !isDisposed) {
        animFrameId = requestAnimationFrame(render)
      }
    }

    img.onload = () => {
      render()
    }
    if (img.complete) render()

    const handleResize = () => {
      render()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isDisposed = true
      if (animFrameId) cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [imageSrc, JSON.stringify(customConfig)])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover pointer-events-none ${className}`}
    />
  )
}
