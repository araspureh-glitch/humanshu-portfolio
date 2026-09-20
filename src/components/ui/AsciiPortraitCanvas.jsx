import React, { useEffect, useRef, useState } from 'react'

export const defaultConfig = {
  renderMode: "dither",
  bgMode: "none",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 9,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 158,
  edgeEmphasis: 0,
  density: 20,
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 }
  ],
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
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
    vignette: { enabled: false, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: false, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
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
  blocks: " ░▒▓█",
  binary: "01",
  matrix: "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ",
  ascii: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
}

// 4x4 Bayer Dither Matrix for ordered dithering
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
]

export default function AsciiPortraitCanvas({
  imageSrc = "/assets/ascii_source_photo.jpg",
  config = defaultConfig,
  className = "",
  width,
  height,
  autoSize = true,
  onLoaded = () => {},
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const imgRef = useRef(null)
  const offscreenCanvasRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: width || 600, height: height || 700 })

  // Auto-resize observer
  useEffect(() => {
    if (!autoSize && width && height) {
      setDimensions({ width, height })
      return
    }

    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        })
      }
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [width, height, autoSize])

  const renderWidth = dimensions.width
  const renderHeight = dimensions.height

  // Merge provided config with defaults
  const settings = {
    ...defaultConfig,
    ...config,
    pfx: { ...defaultConfig.pfx, ...(config.pfx || {}) },
    animSpeed: { ...defaultConfig.animSpeed, ...(config.animSpeed || {}) },
    animIntensity: { ...defaultConfig.animIntensity, ...(config.animIntensity || {}) },
  }

  // Load Source Image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc
    img.onload = () => {
      imgRef.current = img
      setImageLoaded(true)
      onLoaded()
    }
  }, [imageSrc])

  // Main Render Animation Loop
  useEffect(() => {
    if (!imageLoaded || !imgRef.current || !canvasRef.current || renderWidth <= 0 || renderHeight <= 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = renderWidth
    canvas.height = renderHeight

    // Create offscreen canvas for sampling pixel luminance
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas')
    }
    const offscreen = offscreenCanvasRef.current
    offscreen.width = renderWidth
    offscreen.height = renderHeight
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true })
    if (!offCtx) return

    // Draw image onto offscreen canvas preserving cover aspect ratio
    const img = imgRef.current
    const imgAspect = img.width / img.height
    const canvasAspect = renderWidth / renderHeight
    let drawW = renderWidth
    let drawH = renderHeight
    let offsetX = 0
    let offsetY = 0

    if (imgAspect > canvasAspect) {
      drawW = renderHeight * imgAspect
      offsetX = (renderWidth - drawW) / 2
    } else {
      drawH = renderWidth / imgAspect
      offsetY = (renderHeight - drawH) / 2
    }

    offCtx.clearRect(0, 0, renderWidth, renderHeight)
    offCtx.drawImage(img, offsetX, offsetY, drawW, drawH)

    // Apply basic pixel adjustments (Brightness, Contrast, Saturation, Grayscale)
    const imgData = offCtx.getImageData(0, 0, renderWidth, renderHeight)
    const pixels = imgData.data

    const contrast = settings.contrast
    const brightness = settings.brightness
    const saturation = settings.saturation / 100
    const grayscale = settings.grayscale / 100

    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast))

    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i]
      let g = pixels[i + 1]
      let b = pixels[i + 2]

      // Contrast
      r = contrastFactor * (r - 128) + 128
      g = contrastFactor * (g - 128) + 128
      b = contrastFactor * (b - 128) + 128

      // Brightness
      r += brightness
      g += brightness
      b += brightness

      // Clamp RGB
      r = Math.min(255, Math.max(0, r))
      g = Math.min(255, Math.max(0, g))
      b = Math.min(255, Math.max(0, b))

      // Grayscale & Saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      r = gray * grayscale + (r * (1 - grayscale))
      g = gray * grayscale + (g * (1 - grayscale))
      b = gray * grayscale + (b * (1 - grayscale))

      if (saturation !== 1) {
        const satGray = 0.299 * r + 0.587 * g + 0.114 * b
        r = satGray + (r - satGray) * saturation
        g = satGray + (g - satGray) * saturation
        b = satGray + (b - satGray) * saturation
      }

      pixels[i] = Math.min(255, Math.max(0, r))
      pixels[i + 1] = Math.min(255, Math.max(0, g))
      pixels[i + 2] = Math.min(255, Math.max(0, b))
    }

    offCtx.putImageData(imgData, 0, 0)

    // Animation Loop
    let startTime = performance.now()

    const render = (time) => {
      const elapsed = time - startTime
      const speedVal = settings.animSpeed.enabled ? (settings.animSpeed.intensity / 100) : 1
      const animIntensityVal = settings.animIntensity.enabled ? (settings.animIntensity.intensity / 100) : 0.6
      const animTime = (elapsed * 0.002) * speedVal

      // Clear main canvas
      ctx.clearRect(0, 0, renderWidth, renderHeight)

      // Background mode
      if (settings.bgMode === "solid") {
        ctx.fillStyle = "#050505"
        ctx.fillRect(0, 0, renderWidth, renderHeight)
      } else if (settings.bgMode === "photo") {
        ctx.save()
        ctx.globalAlpha = (settings.bgOpacity / 100)
        ctx.drawImage(offscreen, 0, 0)
        ctx.restore()
      }

      // Grid Sampling Parameters
      const cellSize = Math.max(2, settings.cellSize)
      const cols = Math.floor(renderWidth / cellSize)
      const rows = Math.floor(renderHeight / cellSize)

      const charsStr = settings.customChars || CHAR_SETS[settings.charSet] || CHAR_SETS.standard
      const charLen = charsStr.length

      ctx.fillStyle = "#F5F5F5"
      ctx.font = `${Math.floor(cellSize * 1.1)}px monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const processedData = offCtx.getImageData(0, 0, renderWidth, renderHeight).data

      // Iterate through cell grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = Math.floor(c * cellSize + cellSize / 2)
          const cy = Math.floor(r * cellSize + cellSize / 2)

          // Sample average luminance of cell
          let sumR = 0, sumG = 0, sumB = 0, count = 0
          const sampleStep = Math.max(1, Math.floor(cellSize / 3))

          for (let dy = -cellSize / 2; dy < cellSize / 2; dy += sampleStep) {
            for (let dx = -cellSize / 2; dx < cellSize / 2; dx += sampleStep) {
              const px = Math.min(renderWidth - 1, Math.max(0, Math.floor(cx + dx)))
              const py = Math.min(renderHeight - 1, Math.max(0, Math.floor(cy + dy)))
              const idx = (py * renderWidth + px) * 4

              sumR += processedData[idx]
              sumG += processedData[idx + 1]
              sumB += processedData[idx + 2]
              count++
            }
          }

          const avgR = sumR / count
          const avgG = sumG / count
          const avgB = sumB / count

          // Calculate normalized luminance [0, 1]
          let lum = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 255

          if (settings.invert) {
            lum = 1 - lum
          }

          // Apply Animation Wave / Shimmer / Pulse
          if (settings.animated) {
            if (settings.animStyle === "shimmer") {
              const shimmer = Math.sin(c * 0.35 + r * 0.25 + animTime) * 0.18 * animIntensityVal
              lum = Math.min(1, Math.max(0, lum + shimmer))
            } else if (settings.animStyle === "wave") {
              const wave = Math.sin((c + r) * 0.2 + animTime * 1.5) * 0.2 * animIntensityVal
              lum = Math.min(1, Math.max(0, lum + wave))
            } else if (settings.animStyle === "pulse") {
              const pulse = Math.cos(animTime * 2.0 + Math.sqrt(c*c + r*r) * 0.05) * 0.22 * animIntensityVal
              lum = Math.min(1, Math.max(0, lum + pulse))
            } else if (settings.animStyle === "ripple") {
              const dist = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2))
              const ripple = Math.sin(dist * 0.3 - animTime * 3) * 0.2 * animIntensityVal
              lum = Math.min(1, Math.max(0, lum + ripple))
            }
          }

          // Coverage filtering
          if (settings.coverage < 100) {
            const pseudoRandom = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453
            if ((Math.abs(pseudoRandom) % 1) * 100 > settings.coverage) {
              continue
            }
          }

          // RENDER MODES
          const mode = settings.renderMode || "dither"

          if (mode === "characters") {
            const charIdx = Math.floor(lum * (charLen - 1))
            const char = charsStr[Math.min(charLen - 1, Math.max(0, charIdx))]
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.fillText(char, cx, cy)
          } else if (mode === "dither") {
            const bayerVal = (BAYER_4X4[r % 4][c % 4] / 16.0)
            const ditherThreshold = lum > bayerVal ? lum : lum * 0.5
            const radius = Math.max(0.5, (ditherThreshold * (cellSize / 2.1)))
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.beginPath()
            ctx.arc(cx, cy, radius, 0, Math.PI * 2)
            ctx.fill()
          } else if (mode === "dots" || mode === "bubbles") {
            const radius = Math.max(0.8, (lum * (cellSize / 2.0)))
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.beginPath()
            ctx.arc(cx, cy, radius, 0, Math.PI * 2)
            ctx.fill()
          } else if (mode === "cross") {
            const size = Math.max(1, Math.floor(lum * (cellSize / 2)))
            ctx.strokeStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(cx - size, cy)
            ctx.lineTo(cx + size, cy)
            ctx.moveTo(cx, cy - size)
            ctx.lineTo(cx, cy + size)
            ctx.stroke()
          } else if (mode === "diamond") {
            const size = Math.max(1, Math.floor(lum * (cellSize / 2)))
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.beginPath()
            ctx.moveTo(cx, cy - size)
            ctx.lineTo(cx + size, cy)
            ctx.moveTo(cx, cy + size)
            ctx.lineTo(cx - size, cy)
            ctx.closePath()
            ctx.fill()
          } else if (mode === "pixel" || mode === "mosaic") {
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize)
          } else if (mode === "matrix") {
            const matrixChars = CHAR_SETS.matrix
            const charIdx = Math.floor((Math.sin(c * 7 + r * 13 + animTime * 4) * 0.5 + 0.5) * matrixChars.length)
            const char = matrixChars[charIdx] || "1"
            ctx.fillStyle = `rgb(0, ${Math.floor(lum * 255)}, ${Math.floor(lum * 120)})`
            ctx.fillText(char, cx, cy)
          } else if (mode === "hexdump") {
            const hexes = "0123456789ABCDEF"
            const hexChar = hexes[Math.floor(lum * 15)]
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.fillText(hexChar, cx, cy)
          } else if (mode === "stars") {
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.fillText("✦", cx, cy)
          } else {
            // Default Fallback Dot
            const radius = Math.max(0.6, (lum * (cellSize / 2.2)))
            ctx.fillStyle = `rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`
            ctx.beginPath()
            ctx.arc(cx, cy, radius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // POST EFFECTS (PFX)
      const pfx = settings.pfx

      // Scanlines effect
      if (pfx.scanLines && pfx.scanLines.enabled) {
        ctx.fillStyle = `rgba(0, 0, 0, ${(pfx.scanLines.intensity / 100) * 0.35})`
        for (let y = 0; y < renderHeight; y += 4) {
          ctx.fillRect(0, y, renderWidth, 1.5)
        }
      }

      // Film Grain effect
      if (pfx.filmGrain && pfx.filmGrain.enabled) {
        const grainIntensity = (pfx.filmGrain.intensity / 100) * 0.15
        const grainData = ctx.getImageData(0, 0, renderWidth, renderHeight)
        const gPixels = grainData.data
        for (let i = 0; i < gPixels.length; i += 16) {
          const noise = (Math.random() - 0.5) * 255 * grainIntensity
          gPixels[i] += noise
          gPixels[i + 1] += noise
          gPixels[i + 2] += noise
        }
        ctx.putImageData(grainData, 0, 0)
      }

      // Vignette effect
      if (pfx.vignette && pfx.vignette.enabled) {
        const grad = ctx.createRadialGradient(
          renderWidth / 2, renderHeight / 2, renderWidth * 0.25,
          renderWidth / 2, renderHeight / 2, renderWidth * 0.7
        )
        const vIntensity = (pfx.vignette.intensity / 100)
        grad.addColorStop(0, "rgba(0,0,0,0)")
        grad.addColorStop(1, `rgba(0,0,0,${vIntensity * 0.85})`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, renderWidth, renderHeight)
      }

      if (settings.animated) {
        animFrameRef.current = requestAnimationFrame(render)
      }
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [imageLoaded, renderWidth, renderHeight, JSON.stringify(settings)])

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center overflow-hidden bg-[#050505] ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-500 animate-pulse">
          Loading ASCII Raster Engine...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  )
}
