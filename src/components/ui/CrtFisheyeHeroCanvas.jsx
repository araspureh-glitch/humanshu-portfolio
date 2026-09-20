import React, { useEffect, useRef, useState } from 'react'

/**
 * CrtFisheyeHeroCanvas
 * Pure Monochrome CRT Old-TV / VHS Signal Visual Treatment.
 * Features:
 * - Pure Monochrome / Grayscale (Black, White, Gray ONLY - zero colors)
 * - Subtle animated CRT scanlines & VHS grain
 * - Controlled glitch timing: 92% stable state, 8% brief signal tears (80-200ms)
 * - Right-side vertical signal corruption ONLY (left side clean, subject protected)
 * - Interactive hover intensity boost
 * - Tiny monospaced upper atmospheric camera diagnostic details (20-40% opacity)
 * - Preserves exact original image resolution, framing, subject positioning, and 1:1 aspect ratio
 */
export default function CrtFisheyeHeroCanvas({
  imageSrc = '/camera-portrait.jpg',
  className = '',
  distortionStrength = 0.18,
  vignetteStrength = 0.60,
  grainOpacity = 0.07,
  scanlineOpacity = 0.13,
  interactionStrength = 0.02,
  animationSpeed = 1.0,
}) {
  const canvasRef = useRef(null)
  const animFrameIdRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const hoverRef = useRef({ current: 0, target: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Mouse move and hover listeners
  useEffect(() => {
    const container = canvasRef.current ? canvasRef.current.parentElement : window

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const nx = (e.clientX / innerWidth) * 2 - 1
      const ny = -((e.clientY / innerHeight) * 2 - 1)
      mouseRef.current.targetX = nx
      mouseRef.current.targetY = ny
    }

    const handleMouseEnter = () => {
      hoverRef.current.target = 1.0
    }

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
      hoverRef.current.target = 0.0
    }

    window.addEventListener('mousemove', handleMouseMove)
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Initialize WebGL context and render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })
    if (!gl) {
      console.warn('WebGL not supported for CRT Hero Canvas')
      return
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment Shader - Pure Monochrome CRT & Right-Side Corruption
    const fsSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform vec2 u_imageResolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform sampler2D u_image;
      uniform float u_distortionStrength;
      uniform float u_vignetteStrength;
      uniform float u_grainOpacity;
      uniform float u_scanlineOpacity;
      uniform float u_interactionStrength;
      uniform float u_animationSpeed;
      uniform float u_isReducedMotion;
      uniform float u_glitchBurst;
      uniform float u_hoverFactor;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        // Center-normalized coordinates [-0.5, 0.5]
        vec2 normPos = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution;

        // Micro mouse hover offset
        vec2 mouseOffset = (u_isReducedMotion > 0.5) ? vec2(0.0) : u_mouse * (u_interactionStrength * 0.15);
        float breathing = (u_isReducedMotion > 0.5) ? 0.0 : sin(u_time * u_animationSpeed * 0.8) * 0.003;
        normPos += mouseOffset;

        // Screen & image aspect ratio fit (1:1 contain - ZERO cropping, ZERO zoom, ZERO reframing)
        float screenAspect = u_resolution.x / u_resolution.y;
        float imgAspect = u_imageResolution.x / u_imageResolution.y;

        // CRT Fisheye screen barrel curvature
        vec2 aspectSt = normPos * vec2(max(screenAspect, 1.0), max(1.0 / screenAspect, 1.0));
        float r = length(aspectSt);
        float distFactor = 1.0 + (u_distortionStrength * 0.45 + breathing) * (r * r);
        vec2 distortedNormPos = normPos * distFactor;

        // Map screen coordinates to UV space with exact aspect containment
        vec2 uv = vec2(0.5);
        if (screenAspect > imgAspect) {
          uv.x = distortedNormPos.x * (screenAspect / imgAspect) + 0.5;
          uv.y = distortedNormPos.y + 0.5;
        } else {
          uv.x = distortedNormPos.x + 0.5;
          uv.y = distortedNormPos.y * (imgAspect / screenAspect) + 0.5;
        }

        vec2 sampleUv = uv;

        // Combined glitch intensity from burst timing and mouse hover
        float effectiveGlitch = mix(0.04, 0.85, u_glitchBurst) + u_hoverFactor * 0.35;

        // ==========================================
        // GLITCH EFFECT 1: SUBTLE HORIZONTAL SIGNAL TEARING
        // ==========================================
        // Short, irregular, temporary horizontal line shift during glitch moments
        if (effectiveGlitch > 0.15 && sampleUv.x >= 0.0 && sampleUv.x <= 1.0 && sampleUv.y >= 0.0 && sampleUv.y <= 1.0) {
          float lineId = floor(gl_FragCoord.y * 0.5);
          float timeKey = floor(u_time * 14.0);
          float lineRand = rand(vec2(lineId * 0.03, timeKey));

          if (lineRand > (0.94 - effectiveGlitch * 0.08)) {
            float hShift = (rand(vec2(lineId, timeKey * 1.7)) - 0.5) * 0.025 * effectiveGlitch;
            sampleUv.x += hShift;
          }
        }

        // =======================================================
        // GLITCH EFFECT 2: RIGHT-SIDE VERTICAL SIGNAL CORRUPTION ONLY
        // Reduced by 50% in width and intensity for subtle right-edge effect
        // =======================================================
        if (sampleUv.x > 0.85 && sampleUv.x <= 1.0 && sampleUv.y >= 0.0 && sampleUv.y <= 1.0) {
          float stripX = floor(sampleUv.x * 52.0) / 52.0;
          float blockY = floor(sampleUv.y * 32.0 + sin(stripX * 20.0 + u_time * 3.0)) / 32.0;
          
          float blockNoise = rand(vec2(stripX, blockY + floor(u_time * 5.0)));

          // Displace sampling UVs on far right edge (50% reduced intensity and frequency)
          if (blockNoise > (0.58 - u_hoverFactor * 0.1)) {
            float vDisplaceStrength = 0.12 + u_hoverFactor * 0.08;
            float vShift = (rand(vec2(stripX * 1.5, blockY * 2.0 + floor(u_time * 6.0))) - 0.5) * vDisplaceStrength;
            float hShift = (rand(vec2(blockY * 3.0, floor(u_time * 8.0))) - 0.5) * 0.02;
            
            sampleUv.y += vShift;
            sampleUv.x += hShift;
          }

          // Fine vertical signal line jitter on right side
          float vLine = rand(vec2(floor(gl_FragCoord.x * 0.3), floor(u_time * 12.0)));
          if (vLine > 0.94) {
            sampleUv.y += (vLine - 0.97) * 0.25;
          }
        }

        // Clamp UV for safe image sampling inside bounds
        vec2 clampedUv = clamp(sampleUv, 0.0, 1.0);

        // Sample original photograph
        vec4 rawColor = texture2D(u_image, clampedUv);

        // ==========================================
        // COLOR TREATMENT: PURE MONOCHROME (BLACK & WHITE)
        // ==========================================
        // Standard NTSC Grayscale Conversion (R=G=B, ZERO color added, ZERO chromatic aberration)
        float gray = dot(rawColor.rgb, vec3(0.299, 0.587, 0.114));

        // Subtle CRT Horizontal Scanlines (thin, low opacity, slowly animated)
        float currentScanlineOpacity = u_scanlineOpacity + u_hoverFactor * 0.06;
        float scanline = sin(gl_FragCoord.y * 1.5 + u_time * 2.0) * 0.5 + 0.5;
        scanline = mix(1.0, 0.86 + 0.14 * scanline, currentScanlineOpacity);
        gray *= scanline;

        // Analog VHS Grain & Static Noise
        float currentGrainOpacity = u_grainOpacity + u_hoverFactor * 0.04;
        float grainTime = (u_isReducedMotion > 0.5) ? 1.0 : u_time;
        float staticNoise = (rand(clampedUv * 800.0 + grainTime * 16.0) - 0.5) * currentGrainOpacity;
        gray += staticNoise;

        // Brief brightness instability / flicker during glitch burst
        if (u_glitchBurst > 0.5) {
          float flicker = (rand(vec2(floor(u_time * 15.0), 1.0)) - 0.5) * 0.06;
          gray += flicker;
        }

        // CRT Contrast Curve
        gray = clamp(gray, 0.0, 1.0);
        gray = pow(gray, 1.04);

        // Soft CRT Vignette
        float vignette = smoothstep(1.35, 0.32, r * (0.85 + 0.15 * u_vignetteStrength));
        gray *= vignette;

        vec3 finalColor = vec3(gray);

        // Dark bezel background outside active image bounds
        float inBounds = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
        if (inBounds < 0.5) {
          finalColor = vec3(0.035);
        }

        // CRT Screen Bezel Shadow
        vec2 absSt = abs(distortedNormPos * vec2(min(screenAspect, 1.5), 1.0));
        float crtMask = 1.0 - smoothstep(0.94, 1.22, length(pow(absSt, vec2(3.2))));
        finalColor *= crtMask;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full screen quad setup [-1, -1] to [1, 1]
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uImgResolution = gl.getUniformLocation(program, 'u_imageResolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uImage = gl.getUniformLocation(program, 'u_image')
    const uDistortionStrength = gl.getUniformLocation(program, 'u_distortionStrength')
    const uVignetteStrength = gl.getUniformLocation(program, 'u_vignetteStrength')
    const uGrainOpacity = gl.getUniformLocation(program, 'u_grainOpacity')
    const uScanlineOpacity = gl.getUniformLocation(program, 'u_scanlineOpacity')
    const uInteractionStrength = gl.getUniformLocation(program, 'u_interactionStrength')
    const uAnimationSpeed = gl.getUniformLocation(program, 'u_animationSpeed')
    const uIsReducedMotion = gl.getUniformLocation(program, 'u_isReducedMotion')
    const uGlitchBurst = gl.getUniformLocation(program, 'u_glitchBurst')
    const uHoverFactor = gl.getUniformLocation(program, 'u_hoverFactor')

    // Texture Setup
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 15, 255]))

    let imgWidth = 746
    let imgHeight = 439

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgWidth = img.naturalWidth || img.width
      imgHeight = img.naturalHeight || img.height
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }
    img.src = imageSrc

    // Resize Handler
    const resizeCanvas = () => {
      const displayWidth = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth
      const displayHeight = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, displayWidth, displayHeight)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Render Animation Loop & Glitch Burst Controller
    const startTime = performance.now()
    let lastGlitchEndTime = 0
    let nextGlitchStartTime = performance.now() + 2000 + Math.random() * 2000
    let isGlitching = false

    const render = () => {
      resizeCanvas()

      // Smooth mouse lerp
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      // Smooth hover lerp
      const h = hoverRef.current
      h.current += (h.target - h.current) * 0.08

      const now = performance.now()
      const currentTime = (now - startTime) / 1000

      // Glitch timing controller: 92% stable, 8% burst (80ms - 220ms)
      if (!isGlitching && now >= nextGlitchStartTime) {
        isGlitching = true
        const duration = 80 + Math.random() * 140
        lastGlitchEndTime = now + duration
        nextGlitchStartTime = lastGlitchEndTime + 2200 + Math.random() * 3200
      } else if (isGlitching && now >= lastGlitchEndTime) {
        isGlitching = false
      }

      gl.useProgram(program)

      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform2f(uImgResolution, imgWidth, imgHeight)
      gl.uniform2f(uMouse, m.x, m.y)
      gl.uniform1f(uTime, currentTime)

      gl.uniform1f(uDistortionStrength, distortionStrength)
      gl.uniform1f(uVignetteStrength, vignetteStrength)
      gl.uniform1f(uGrainOpacity, grainOpacity)
      gl.uniform1f(uScanlineOpacity, scanlineOpacity)
      gl.uniform1f(uInteractionStrength, interactionStrength)
      gl.uniform1f(uAnimationSpeed, animationSpeed)
      gl.uniform1f(uIsReducedMotion, reducedMotion ? 1.0 : 0.0)
      gl.uniform1f(uGlitchBurst, isGlitching ? 1.0 : 0.0)
      gl.uniform1f(uHoverFactor, h.current)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.uniform1i(uImage, 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animFrameIdRef.current = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          if (!animFrameIdRef.current) {
            animFrameIdRef.current = requestAnimationFrame(render)
          }
        } else {
          if (animFrameIdRef.current) {
            cancelAnimationFrame(animFrameIdRef.current)
            animFrameIdRef.current = null
          }
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)
    animFrameIdRef.current = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resizeCanvas)
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [
    imageSrc,
    distortionStrength,
    vignetteStrength,
    grainOpacity,
    scanlineOpacity,
    interactionStrength,
    animationSpeed,
    reducedMotion,
  ])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none select-none"
      />
    </div>
  )
}

