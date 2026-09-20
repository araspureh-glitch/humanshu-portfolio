import React, { useEffect, useRef, useState } from 'react'

/**
 * CrtFisheyeHeroCanvas
 * Strictly monochrome WebGL Canvas rendering a high-contrast black-and-white portrait,
 * retro fisheye barrel distortion, right-side vertical signal corruption,
 * monochrome channel displacement, subtle horizontal scanlines, cinematic vignette, and film grain.
 * 100% Monochrome (Black, White, Grayscale only).
 */
export default function CrtFisheyeHeroCanvas({
  imageSrc = '/camera-portrait.jpg',
  className = '',
  distortionStrength = 0.28,
  vignetteStrength = 0.65,
  grainOpacity = 0.07,
  scanlineOpacity = 0.12,
  chromaticAberration = 0.35,
  interactionStrength = 0.04,
  animationSpeed = 1.0,
  imageZoom = 1.0,
  isHovered = false,
}) {
  const canvasRef = useRef(null)
  const animFrameIdRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const hoverRef = useRef(0)
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
      uniform float u_imageZoom;
      uniform float u_hoverState;

      // Pseudo-random generator for film grain & glitch
      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        // Normalized screen coords from center [-0.5, 0.5]
        vec2 normPos = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution;

        // Interactive mouse shift
        vec2 mouseOffset = (u_isReducedMotion > 0.5) ? vec2(0.0) : u_mouse * (u_interactionStrength * 0.4);
        float breathing = (u_isReducedMotion > 0.5) ? 0.0 : sin(u_time * u_animationSpeed * 1.2) * 0.01;
        
        normPos += mouseOffset;

        // Aspect ratio correction for uniform fisheye distortion
        float screenAspect = u_resolution.x / u_resolution.y;
        vec2 aspectSt = normPos * vec2(max(screenAspect, 1.0), max(1.0 / screenAspect, 1.0));
        float r = length(aspectSt);

        // Fisheye Barrel Distortion formula
        float distFactor = 1.0 + (u_distortionStrength + breathing + u_hoverState * 0.03) * (r * r);
        
        // Distorted normalized position scaled by zoom factor
        vec2 distortedNormPos = normPos * distFactor * u_imageZoom;

        // CRT Screen bezel curve mask
        vec2 absSt = abs(distortedNormPos * vec2(min(screenAspect, 1.5), 1.0));
        float crtMask = 1.0 - smoothstep(0.92, 1.22, length(pow(absSt, vec2(3.2))));

        // Intermittent 80-250ms burst glitch timing calculation (5-10% of time)
        float glitchTime = floor(u_time * 7.5);
        float burstRandom = rand(vec2(glitchTime, 91.27));
        float isGlitchActive = step(0.91, burstRandom) * (1.0 - u_isReducedMotion);
        
        // Occasional horizontal jitter band during glitch burst
        float bandY = floor(gl_FragCoord.y / 10.0);
        float bandShift = (rand(vec2(bandY, glitchTime)) - 0.5) * 0.02 * isGlitchActive;

        // Map distorted screen position to Image UV space with aspect containment
        float imgAspect = u_imageResolution.x / u_imageResolution.y;
        vec2 uv = vec2(0.5);
        if (screenAspect > imgAspect) {
          uv.x = distortedNormPos.x * (screenAspect / imgAspect) + 0.5 + bandShift;
          uv.y = distortedNormPos.y + 0.5;
        } else {
          uv.x = distortedNormPos.x + 0.5 + bandShift;
          uv.y = distortedNormPos.y * (imgAspect / screenAspect) + 0.5;
        }

        // --- VERTICAL SIGNAL CORRUPTION AREA (Right side of portrait) ---
        float rightZone = smoothstep(0.58, 0.78, uv.x);
        if (rightZone > 0.01) {
          // Narrow vertical strips displacement
          float stripId = floor(uv.x * 55.0);
          float stripOffset = (rand(vec2(stripId, floor(u_time * 4.0))) - 0.5) * 0.05 * rightZone;
          
          // Rectangular displaced block slices
          float blockY = floor(uv.y * 22.0);
          float blockNoise = step(0.68, rand(vec2(stripId, blockY + floor(u_time * 3.0))));
          float blockOffset = (rand(vec2(blockY, floor(u_time * 5.0))) - 0.5) * 0.07 * blockNoise * rightZone;

          uv.y += (stripOffset + blockOffset) * (0.6 + 0.4 * isGlitchActive);
          uv.x += (stripOffset * 0.25) * (0.6 + 0.4 * isGlitchActive);
        }

        // Active image bounds check
        float inBounds = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
        
        // Clamp UV for smooth edge sampling
        vec2 clampedUv = clamp(uv, 0.0, 1.0);

        // --- MONOCHROME GRAYSCALE CHANNEL DISPLACEMENT (NO RGB CHROMATIC ABERRATION) ---
        float edgeDisplacement = (0.007 + 0.010 * u_hoverState + 0.015 * isGlitchActive) * (r * r + 0.05);
        vec2 shiftUv1 = clampedUv + vec2(edgeDisplacement, -edgeDisplacement * 0.5);
        vec2 shiftUv2 = clampedUv - vec2(edgeDisplacement * 0.7, edgeDisplacement * 0.4);

        // Sample grayscale texture at primary and shifted UV positions
        vec4 baseTex = texture2D(u_image, clampedUv);
        vec4 shiftTex1 = texture2D(u_image, clamp(shiftUv1, 0.0, 1.0));
        vec4 shiftTex2 = texture2D(u_image, clamp(shiftUv2, 0.0, 1.0));

        // Convert to pure monochrome luminance
        float grayBase = dot(baseTex.rgb, vec3(0.299, 0.587, 0.114));
        float grayShift1 = dot(shiftTex1.rgb, vec3(0.299, 0.587, 0.114));
        float grayShift2 = dot(shiftTex2.rgb, vec3(0.299, 0.587, 0.114));

        // High contrast grayscale tone mapping (crushed blacks, crisp whites)
        grayBase = pow(smoothstep(0.03, 0.95, grayBase), 1.15);
        grayShift1 = pow(smoothstep(0.03, 0.95, grayShift1), 1.15);
        grayShift2 = pow(smoothstep(0.03, 0.95, grayShift2), 1.15);

        // Combine monochrome edge offsets
        float finalGray = grayBase;
        finalGray = mix(finalGray, grayShift1, 0.22);
        finalGray = mix(finalGray, grayShift2, 0.15);

        // Brief contrast/brightness flash during glitch burst
        float burstFlash = isGlitchActive * (rand(vec2(glitchTime, 4.3)) - 0.5) * 0.12;
        finalGray = clamp(finalGray + burstFlash, 0.0, 1.0);

        vec3 color = vec3(finalGray);

        // Soft ambient glow transition for screen edges outside bounds
        if (inBounds < 0.5) {
          color *= 0.15;
        }

        // --- SUBTLE CRT HORIZONTAL SCANLINES ---
        float currentScanlineOpacity = u_scanlineOpacity + u_hoverState * 0.05 + isGlitchActive * 0.08;
        float scanline = sin(gl_FragCoord.y * 1.25 + u_time * 2.5) * 0.5 + 0.5;
        scanline = mix(1.0, 0.80 + 0.20 * scanline, currentScanlineOpacity);
        color *= scanline;

        // Vertical signal lines in corrupted right area
        if (rightZone > 0.1) {
          float vLines = sin(gl_FragCoord.x * 2.0 + u_time * 5.0) * 0.5 + 0.5;
          color *= mix(1.0, 0.75 + 0.25 * vLines, 0.25 * rightZone);
        }

        // Large Soft Cinematic Vignette
        float vignette = smoothstep(1.35, 0.30, r * (0.85 + 0.15 * u_vignetteStrength));
        color *= vignette;

        // --- MICRO FILM GRAIN / SENSOR NOISE ---
        float currentGrainOpacity = u_grainOpacity + u_hoverState * 0.04 + isGlitchActive * 0.06;
        float grainTime = (u_isReducedMotion > 0.5) ? 1.0 : u_time;
        float grain = (rand(clampedUv * 600.0 + grainTime * 15.0) - 0.5) * currentGrainOpacity;
        color += vec3(grain);

        // Apply CRT screen edge shadow mask
        color *= crtMask;

        // GUARANTEE STRICT MONOCHROME (R=G=B)
        gl_FragColor = vec4(vec3(color.r), 1.0);
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
    const uImageZoom = gl.getUniformLocation(program, 'u_imageZoom')
    const uHoverState = gl.getUniformLocation(program, 'u_hoverState')

    // Texture Setup
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // Placeholder 1x1 pixel while loading
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 10, 255]))

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

    // Render Animation Loop
    const startTime = performance.now()

    const render = () => {
      resizeCanvas()

      // Smooth mouse lerp
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      // Smooth hover state lerp
      const targetHover = isHovered ? 1.0 : 0.0
      hoverRef.current += (targetHover - hoverRef.current) * 0.08

      const currentTime = (performance.now() - startTime) / 1000

      gl.useProgram(program)

      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform2f(uImgResolution, imgWidth, imgHeight)
      gl.uniform2f(uMouse, m.x, m.y)
      gl.uniform1f(uTime, currentTime)

      // Responsive adjustments
      const isMobile = canvas.width < 640
      const currentDistortion = isMobile ? distortionStrength * 0.7 : distortionStrength

      gl.uniform1f(uDistortionStrength, currentDistortion)
      gl.uniform1f(uVignetteStrength, vignetteStrength)
      gl.uniform1f(uGrainOpacity, grainOpacity)
      gl.uniform1f(uScanlineOpacity, scanlineOpacity)
      gl.uniform1f(uChromaticAberration, chromaticAberration)
      gl.uniform1f(uInteractionStrength, interactionStrength)
      gl.uniform1f(uAnimationSpeed, animationSpeed)
      gl.uniform1f(uIsReducedMotion, reducedMotion ? 1.0 : 0.0)
      gl.uniform1f(uImageZoom, imageZoom)
      gl.uniform1f(uHoverState, hoverRef.current)

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
    imageZoom,
    isHovered,
    reducedMotion,
  ])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none select-none grayscale"
      />
    </div>
  )
}
