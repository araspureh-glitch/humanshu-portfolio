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

      // 6px tile size for high definition grid
      const tileSize = 6
      const cols = Math.ceil(width / tileSize)
      const rows = Math.ceil(height / tileSize)

      const offCanvas = document.createElement('canvas')
      offCanvas.width = cols
      offCanvas.height = rows
      const offCtx = offCanvas.getContext('2d')
      if (!offCtx) return

      const imgAspect = img.width / img.height
      const canvasAspect = width / height
      const zoomFactor = 1.10
      let drawWidth = cols * zoomFactor
      let drawHeight = rows * zoomFactor
      let offsetX = 0
      let offsetY = 0

      if (imgAspect > canvasAspect) {
        drawWidth = rows * imgAspect * zoomFactor
        offsetX = (cols - drawWidth) * 0.72
        offsetY = (rows - drawHeight) * 0.45
      } else {
        drawHeight = (cols / imgAspect) * zoomFactor
        offsetX = (cols - drawWidth) * 0.65
        offsetY = (rows - drawHeight) * 0.35
      }

      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      const imgData = offCtx.getImageData(0, 0, cols, rows).data

      // Background fill
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, width, height)

      const padding = 0.5
      const cornerRadius = 1.0

      // Render mosaic pixel tiles with subtle slate-steel editorial tint
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = (r * cols + c) * 4
          const red = imgData[index]
          const green = imgData[index + 1]
          const blue = imgData[index + 2]

          let brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255
          brightness = Math.pow(brightness, 0.65) * 2.0
          if (brightness > 1) brightness = 1

          const posX = c * tileSize + padding
          const posY = r * tileSize + padding
          const w = tileSize - padding * 2
          const h = tileSize - padding * 2

          let color
          const val = Math.floor(brightness * 255)

          if (val < 15) {
            color = '#050507'
          } else {
            const rCol = Math.min(255, val)
            const gCol = Math.min(255, Math.floor(val * 1.02))
            const bCol = Math.min(255, Math.floor(val * 1.06))
            color = `rgb(${rCol}, ${gCol}, ${bCol})`
          }

          ctx.fillStyle = color
          ctx.beginPath()
          ctx.roundRect(posX, posY, w, h, cornerRadius)
          ctx.fill()
        }
      }
    }

    img.onload = () => {
      renderGrid()
    }

    if (img.complete) {
      renderGrid()
    }

    const resizeObserver = new ResizeObserver(() => {
      renderGrid()
    })
    resizeObserver.observe(canvas)

    return () => {
      isDisposed = true
      resizeObserver.disconnect()
    }
  }, [imageSrc])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
    />
  )
}
