import React, { useEffect, useRef, useState } from 'react'

/**
 * CrtFisheyeHeroCanvas
 * High-performance WebGL Canvas rendering a retro fisheye barrel lens distortion,
 * curved CRT monitor screen, subtle chromatic aberration, fine scanlines, cinematic vignette, and film grain.
 * Scoped exclusively to the Hero visual background container.
 */
export default function CrtFisheyeHeroCanvas({
  imageSrc = '/camera-portrait.jpg',
  className = '',
  distortionStrength = 0.0,
  vignetteStrength = 0.0,
  grainOpacity = 0.04,
  scanlineOpacity = 0.04,
  chromaticAberration = 0.1,
  interactionStrength = 0.015,
  animationSpeed = 1.0,
}) {
  const canvasRef = useRef(null)
  const animFrameIdRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)

  // Listen for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Handle mouse / touch hover for micro perspective tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      // Normalize mouse to [-1, 1]
      const nx = (e.clientX / innerWidth) * 2 - 1
      const ny = -((e.clientY / innerHeight) * 2 - 1)
      mouseRef.current.targetX = nx
      mouseRef.current.targetY = ny
    }

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Initialize WebGL context and render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })
    if (!gl) {
      console.warn('WebGL not supported for CRT Fisheye Hero Canvas')
      return
    }

    // --- Shaders Definition ---
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

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
      uniform float u_chromaticAberration;
      uniform float u_interactionStrength;
      uniform float u_animationSpeed;
      uniform float u_isReducedMotion;

      // Pseudo-random generator for film grain
      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        // Center-normalized aspect-corrected coords [-1, 1]
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

        // Interactive mouse shift & slow breathing optical float
        vec2 mouseOffset = (u_isReducedMotion > 0.5) ? vec2(0.0) : u_mouse * u_interactionStrength;
        float breathing = (u_isReducedMotion > 0.5) ? 0.0 : sin(u_time * u_animationSpeed * 1.2) * 0.005;
        
        st += mouseOffset;

        // Radial distance from center
        float r = length(st);

        // Barrel / Fisheye Distortion formula
        float distFactor = 1.0 + (u_distortionStrength + breathing) * (r * r);
        vec2 distortedSt = st * distFactor;

        // Aspect fit cover math for background image
        float screenAspect = u_resolution.x / u_resolution.y;
        float imgAspect = u_imageResolution.x / u_imageResolution.y;
        vec2 scale = vec2(1.0);
        if (screenAspect > imgAspect) {
          scale = vec2(1.0, imgAspect / screenAspect);
        } else {
          scale = vec2(screenAspect / imgAspect, 1.0);
        }

        // Map back to [0, 1] UV space for image sampling
        vec2 uv = distortedSt * (min(u_resolution.x, u_resolution.y) / u_resolution) * scale * 0.5 + 0.5;

        vec3 color;
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          // Render edge clamp with ambient darkening for out of bounds
          vec2 clampedUv = clamp(uv, 0.0, 1.0);
          color = texture2D(u_image, clampedUv).rgb * 0.35;
        } else {
          // Chromatic Aberration: RGB channel separation
          float caAmount = 0.004 * u_chromaticAberration;
          vec2 caOffsetR = (uv - 0.5) * (1.0 + caAmount) + 0.5 - uv;
          vec2 caOffsetB = (uv - 0.5) * (1.0 - caAmount) + 0.5 - uv;

          float colR = texture2D(u_image, uv + caOffsetR).r;
          float colG = texture2D(u_image, uv).g;
          float colB = texture2D(u_image, uv + caOffsetB).b;

          color = vec3(colR, colG, colB);
        }

        // Subtle CRT Horizontal Scanlines
        float scanline = sin(gl_FragCoord.y * 1.2 + u_time * 2.5) * 0.5 + 0.5;
        scanline = mix(1.0, 0.88 + 0.12 * scanline, u_scanlineOpacity);
        color *= scanline;

        // Micro Film Grain / Sensor Noise
        float grainTime = (u_isReducedMotion > 0.5) ? 1.0 : u_time;
        float grain = (rand(uv * 600.0 + grainTime * 15.0) - 0.5) * u_grainOpacity;
        color += vec3(grain);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile Helper
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

    // Setup full screen quad [-1, -1] to [1, 1]
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
    const uChromaticAberration = gl.getUniformLocation(program, 'u_chromaticAberration')
    const uInteractionStrength = gl.getUniformLocation(program, 'u_interactionStrength')
    const uAnimationSpeed = gl.getUniformLocation(program, 'u_animationSpeed')
    const uIsReducedMotion = gl.getUniformLocation(program, 'u_isReducedMotion')

    // Texture Setup
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // Placeholder 1x1 pixel while loading
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 15, 255]))

    let imgWidth = 1920
    let imgHeight = 1080

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

    // Render Animation Loop
    const startTime = performance.now()

    const render = () => {
      resizeCanvas()

      // Smooth mouse lerp
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      const currentTime = (performance.now() - startTime) / 1000

      gl.useProgram(program)

      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform2f(uImgResolution, imgWidth, imgHeight)
      gl.uniform2f(uMouse, m.x, m.y)
      gl.uniform1f(uTime, currentTime)

      // Responsive adjustments: soften distortion slightly on small mobile screens
      const isMobile = canvas.width < 640
      const currentDistortion = isMobile ? distortionStrength * 0.65 : distortionStrength

      gl.uniform1f(uDistortionStrength, currentDistortion)
      gl.uniform1f(uVignetteStrength, vignetteStrength)
      gl.uniform1f(uGrainOpacity, grainOpacity)
      gl.uniform1f(uScanlineOpacity, scanlineOpacity)
      gl.uniform1f(uChromaticAberration, chromaticAberration)
      gl.uniform1f(uInteractionStrength, interactionStrength)
      gl.uniform1f(uAnimationSpeed, animationSpeed)
      gl.uniform1f(uIsReducedMotion, reducedMotion ? 1.0 : 0.0)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.uniform1i(uImage, 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animFrameIdRef.current = requestAnimationFrame(render)
    }

    // Use IntersectionObserver to pause rendering when hero is out of view
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
    chromaticAberration,
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
