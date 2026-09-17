import { useEffect, useRef } from 'react'

export default function MosaicHeroCanvas({ imageSrc = '/hero.jpg', tileSize = 8 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc

    let isDisposed = false

    const renderGrid = () => {
      if (isDisposed || !img.complete || img.naturalWidth === 0) return

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      if (width === 0 || height === 0) return

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      const cols = Math.ceil(width / tileSize)
      const rows = Math.ceil(height / tileSize)

      const offCanvas = document.createElement('canvas')
      offCanvas.width = cols
      offCanvas.height = rows
      const offCtx = offCanvas.getContext('2d')
      if (!offCtx) return

      const imgAspect = img.width / img.height
      const canvasAspect = width / height
      const zoomFactor = 1.05
      let drawWidth = cols * zoomFactor
      let drawHeight = rows * zoomFactor
      let offsetX = 0
      let offsetY = 0

      if (imgAspect > canvasAspect) {
        drawWidth = rows * imgAspect * zoomFactor
        offsetX = (cols - drawWidth) * 0.70
        offsetY = (rows - drawHeight) * 0.35
      } else {
        drawHeight = (cols / imgAspect) * zoomFactor
        offsetX = (cols - drawWidth) * 0.65
        offsetY = (rows - drawHeight) * 0.25
      }

      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      const imgData = offCtx.getImageData(0, 0, cols, rows).data

      // Clear canvas before drawing tiles
      ctx.clearRect(0, 0, width, height)

      const padding = 0.5
      const cornerRadius = 1.0

      // Render pixelated tiles preserving full image colors and details
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = (r * cols + c) * 4
          const rCol = imgData[index]
          const gCol = imgData[index + 1]
          const bCol = imgData[index + 2]
          const alpha = imgData[index + 3]

          if (alpha < 10) continue

          const posX = c * tileSize + padding
          const posY = r * tileSize + padding
          const w = tileSize - padding * 2
          const h = tileSize - padding * 2

          ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`
          ctx.beginPath()
          if (cornerRadius > 0 && typeof ctx.roundRect === 'function') {
            ctx.roundRect(posX, posY, w, h, cornerRadius)
          } else {
            ctx.rect(posX, posY, w, h)
          }
          ctx.fill()
        }
      }
    }

    img.onload = () => renderGrid()
    if (img.complete) renderGrid()

    const resizeObserver = new ResizeObserver(() => renderGrid())
    resizeObserver.observe(canvas)

    return () => {
      isDisposed = true
      resizeObserver.disconnect()
    }
  }, [imageSrc, tileSize])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
    />
  )
}
