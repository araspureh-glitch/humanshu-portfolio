import { useEffect, useRef } from 'react'

export default function MosaicHeroCanvas({ imageSrc = '/hero.jpg' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc

    let animationFrameId
    let mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 }
    }

    img.onload = () => {
      const render = () => {
        const width = canvas.offsetWidth
        const height = canvas.offsetHeight
        if (width === 0 || height === 0) return

        canvas.width = width
        canvas.height = height

        // Offscreen sampling canvas
        const offCanvas = document.createElement('canvas')
        const offCtx = offCanvas.getContext('2d')
        const tileSize = 7 // Reduced finer tile size in pixels

        const cols = Math.ceil(width / tileSize)
        const rows = Math.ceil(height / tileSize)

        offCanvas.width = cols
        offCanvas.height = rows

        // Calculate cover position targeting subject on right side
        const imgAspect = img.width / img.height
        const canvasAspect = width / height
        let drawWidth = cols
        let drawHeight = rows
        let offsetX = 0
        let offsetY = 0

        if (imgAspect > canvasAspect) {
          drawWidth = rows * imgAspect
          offsetX = (cols - drawWidth) * 0.72 // Align face towards right
        } else {
          drawHeight = cols / imgAspect
          offsetY = (rows - drawHeight) * 0.2
        }

        offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

        const imgData = offCtx.getImageData(0, 0, cols, rows).data

        // Clear main canvas with near-black
        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, width, height)

        const padding = 0.8 // Fine tile border gap
        const cornerRadius = 1.2

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const index = (r * cols + c) * 4
            const red = imgData[index]
            const green = imgData[index + 1]
            const blue = imgData[index + 2]

            // Convert to high-contrast monochrome lightness (0.0 to 1.0)
            let brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255
            
            // Boost brightness curve matching reference image
            brightness = Math.pow(brightness, 0.7) * 1.85
            if (brightness > 1) brightness = 1

            // Interactive mouse proximity shimmer effect
            const px = c * tileSize + tileSize / 2
            const py = r * tileSize + tileSize / 2
            const dist = Math.hypot(mouse.x - px, mouse.y - py)
            if (dist < 130) {
              const boost = (1 - dist / 130) * 0.35
              brightness = Math.min(1, brightness + boost)
            }

            // Map brightness to monochromatic tile color
            const val = Math.floor(brightness * 255)
            
            if (val < 18) {
              // Dark background mosaic tile
              ctx.fillStyle = '#08080a'
            } else {
              // Metallic B&W mosaic square tile
              ctx.fillStyle = `rgb(${val}, ${val}, ${val})`
            }

            // Draw tile with rounded corners
            const x = c * tileSize + padding
            const y = r * tileSize + padding
            const w = tileSize - padding * 2
            const h = tileSize - padding * 2

            ctx.beginPath()
            ctx.roundRect(x, y, w, h, cornerRadius)
            ctx.fill()

            // Specular top highlight for metallic mosaic sheen
            if (val > 80) {
              ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.5})`
              ctx.fillRect(x + 1, y + 1, w - 2, 1.5)
            }
          }
        }
      }

      render()
      window.addEventListener('resize', render)

      return () => {
        window.removeEventListener('resize', render)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [imageSrc])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
    />
  )
}
