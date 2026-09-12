export function createRenderer({ canvas }) {
  let animationFrameId;
  let isDisposed = false;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  let resolveReady;
  const ready = new Promise((resolve) => {
    resolveReady = resolve;
  });

  if (!gl) {
    const ctx = canvas.getContext('2d');
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const render = () => {
      if (isDisposed) return;
      time += 0.01;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    resolveReady();
    return { ready, dispose: () => { isDisposed = true; cancelAnimationFrame(animationFrameId); } };
  }

  // --- High-Precision WebGL Realistic Interstellar Black Hole Shader ---
  const vsSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;

    #define PI 3.14159265359

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);

      // Position Black Hole on Right Side matching reference image
      vec2 bhPos = vec2(0.38, 0.02);
      vec2 p = uv - bhPos;

      // Rotate for realistic 3D accretion disk perspective tilt
      float angle = -0.22;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      p = rot * p;

      float dist = length(p);

      // Gravitational Lensing effect bending light around event horizon
      float lens = 0.065 / (dist + 0.04);
      vec2 lensP = p * (1.0 - lens);

      // Distorted coordinates for tilted accretion disk
      vec2 diskUV = vec2(lensP.x, lensP.y * 3.4);
      float rDisk = length(diskUV);
      float phiDisk = atan(diskUV.y, diskUV.x);

      // Starfield Background
      float starHash = hash(gl_FragCoord.xy);
      float star = step(0.995, starHash) * (0.3 + 0.7 * sin(u_time * 2.0 + starHash * 100.0));

      // Accretion Disk Dust Trails & Rotation
      float diskNoise = fbm(vec2(rDisk * 8.0 - u_time * 0.4, phiDisk * 4.0 + u_time * 0.2));
      float diskDensity = smoothstep(0.72, 0.26, rDisk) * smoothstep(0.19, 0.25, rDisk);
      float accretionDisk = diskDensity * (0.65 + 0.35 * diskNoise);

      // Gravitational Einstein Ring / Upper & Lower Lensed Arc
      float arcUpper = smoothstep(0.02, 0.0, abs(dist - 0.245)) * step(0.0, p.y) * 1.6;
      float arcLower = smoothstep(0.015, 0.0, abs(dist - 0.235)) * step(p.y, 0.0) * 0.8;

      // Inner Photon Ring (Bright Silver Edge)
      float photonRing = smoothstep(0.01, 0.0, abs(dist - 0.22)) * 2.5;

      // Event Horizon Black Hole Shadow Mask
      float shadowMask = smoothstep(0.21, 0.218, dist);

      // Color Palette: Grayscale Silver/White with rich contrast
      vec3 bgCol = vec3(0.015) + vec3(star * 0.7);

      // Accretion disk bright white core fading to silver
      vec3 diskCol = mix(vec3(0.85, 0.88, 0.95), vec3(1.0, 1.0, 1.0), diskNoise) * accretionDisk * 2.2;
      
      // Gravitational Arc Lensing Color
      vec3 lensedCol = vec3(0.95, 0.97, 1.0) * (arcUpper + arcLower);

      // Combine Space + Disk + Lensing
      vec3 finalCol = bgCol + diskCol + lensedCol + vec3(1.0) * photonRing;

      // Apply Event Horizon Shadow
      finalCol *= shadowMask;

      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "position");
  const resLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");

  const resize = () => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };
  resize();
  window.addEventListener('resize', resize);

  let startTime = performance.now();
  const render = () => {
    if (isDisposed) return;
    resize();

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, (performance.now() - startTime) * 0.001);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrameId = requestAnimationFrame(render);
  };

  render();
  resolveReady();

  return {
    ready,
    dispose() {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
      }
    }
  };
}
