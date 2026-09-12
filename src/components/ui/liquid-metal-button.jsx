import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const shaderRef = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef = useRef(null);
  const rippleId = useRef(0);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );

          // Force canvas element inside container to fill 100% width & height
          const canvas = shaderRef.current.querySelector("canvas");
          if (canvas) {
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.position = "absolute";
            canvas.style.inset = "0";
            canvas.style.borderRadius = "100px";
          }
        }
      } catch (error) {
        console.error("[v0] Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <div className="relative inline-block select-none">
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: "none",
          }}
        >
          {/* Layer 3: Text / Icon Layer */}
          <div
            className="flex items-center justify-center gap-2 pointer-events-none"
            style={{
              padding: viewMode === "icon" ? "12px" : "12px 28px",
              minWidth: viewMode === "icon" ? "46px" : "140px",
              height: "46px",
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "translateZ(20px)",
              zIndex: 30,
            }}
          >
            {viewMode === "icon" && (
              <Sparkles
                size={16}
                style={{
                  color: "#ffffff",
                  filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))",
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            )}
            {viewMode === "text" && (
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace, sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontWeight: 600,
                  textShadow: "0px 1px 3px rgba(0, 0, 0, 0.9)",
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            )}
          </div>

          {/* Layer 2: Inner Dark Pill Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "2px",
                borderRadius: "100px",
                background: "linear-gradient(180deg, #18181b 0%, #000000 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.6)"
                  : "none",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>

          {/* Layer 1: Outer Shader & Border/Shadow Container */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 2px 0px rgba(0, 0, 0, 0.5)"
                  : isHovered
                    ? "0px 0px 0px 1px rgba(255, 255, 255, 0.3), 0px 12px 20px 0px rgba(0, 0, 0, 0.4)"
                    : "0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 6px 14px 0px rgba(0, 0, 0, 0.3)",
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: "transparent",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* Layer 4: Interactive Button overlay */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={typeof label === "string" ? label : "Button"}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
