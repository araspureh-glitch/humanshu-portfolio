export function createRenderer({ canvas }) {
  let animationFrameId;
  let isDisposed = false;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  let resolveReady;
  const ready = new Promise((resolve) => {
    resolveReady = resolve;
  });

  if (!gl) {
    console.warn("WebGL not supported, falling back to 2D canvas black hole rendering");
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
      time += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Black Hole Center on Right Side
      const centerX = w * 0.8;
      const centerY = h * 0.5;
      const baseRadius = Math.min(w, h) * 0.22;

      // Outer Accretion Disk Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.5, centerX, centerY, baseRadius * 2.8);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      glowGrad.addColorStop(0.2, 'rgba(220, 225, 245, 0.6)');
      glowGrad.addColorStop(0.5, 'rgba(120, 140, 180, 0.2)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Accretion Disk Ring (Gravitational Lensing Tilt)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.25);
      ctx.scale(1.8, 0.45);

      const diskGrad = ctx.createRadialGradient(0, 0, baseRadius * 0.7, 0, 0, baseRadius * 2.2);
      diskGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      diskGrad.addColorStop(0.3, 'rgba(200, 210, 235, 0.8)');
      diskGrad.addColorStop(0.7, 'rgba(100, 110, 135, 0.3)');
      diskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Event Horizon (Black Center)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.78, 0, Math.PI * 2);
      ctx.fill();

      // Photon Ring (Bright Inner Edge)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.79, 0, Math.PI * 2);
      ctx.stroke();

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
      }
    };
  }

  // --- WebGL Shader Implementation for Ultra Realistic Black Hole ---
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

    void main() {
      vec2 st = (gl_FragCoord.xy - u_resolution * 0.5) / min(u_resolution.x, u_resolution.y);
      
      // Shift black hole center towards right side to match screenshot layout
      st.x -= 0.32;
      st.y += 0.05;

      // Rotate coordinates slightly for cinematic tilt angle
      float angle = -0.3;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      st = rot * st;

      float r = length(st);
      
      // Gravitational lensing deformation
      float distortion = 0.12 / (r + 0.08);
      vec2 stLens = st * (1.0 - distortion);

      // Accretion disk ellipse
      vec2 stDisk = vec2(stLens.x, stLens.y * 3.2);
      float rDisk = length(stDisk);

      // Stars background
      float stars = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      stars = step(0.996, stars) * 0.6;

      // Accretion disk intensity & noise
      float diskGlow = smoothstep(0.7, 0.25, rDisk) * smoothstep(0.18, 0.28, rDisk);
      float noise = sin(atan(stDisk.y, stDisk.x) * 12.0 + u_time * 2.0) * 0.1 + 0.9;
      float disk = diskGlow * noise;

      // Photon Ring (Inner edge reflection)
      float photonRing = smoothstep(0.015, 0.0, abs(r - 0.24)) * 1.8;

      // Event Horizon Shadow
      float shadow = smoothstep(0.23, 0.245, r);

      // Color Composition
      vec3 color = vec3(0.02, 0.02, 0.03); // Deep space background
      color += vec3(stars);

      // Add Accretion Disk (Monochrome silver/white with subtle blue shift)
      vec3 diskColor = mix(vec3(0.7, 0.75, 0.85), vec3(1.0, 1.0, 1.0), disk);
      color += diskColor * disk * 1.5;
      
      // Add Photon Ring
      color += vec3(0.9, 0.95, 1.0) * photonRing;

      // Mask Event Horizon (Black Center)
      color *= shadow;

      gl_FragColor = vec4(color, 1.0);
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
