import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles, ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  viewMode?: "text" | "icon";
  icon?: React.ComponentType<any>;
  showArrow?: boolean;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  icon: CustomIcon,
  showArrow = false,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 48,
        height: 48,
        innerWidth: 44,
        innerHeight: 44,
        shaderWidth: 48,
        shaderHeight: 48,
      };
    } else {
      const extraWidth = showArrow ? 68 : 52;
      const calcWidth = Math.max(160, Math.round(label.length * 9.5 + extraWidth));
      return {
        width: calcWidth,
        height: 48,
        innerWidth: calcWidth - 4,
        innerHeight: 44,
        shaderWidth: calcWidth,
        shaderHeight: 48,
      };
    }
  }, [viewMode, label, showArrow]);

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
              u_shiftRed: 0.6,
              u_shiftBlue: 0.4,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 0,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
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
    shaderMount.current?.setSpeed?.(1.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1.2);
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

    onClick?.(e);
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
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition:
              "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: isHovered ? "scale(1.03)" : "scale(1)",
          }}
        >
          {/* Text & Icon Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transformStyle: "preserve-3d",
              transition:
                "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {viewMode === "icon" && (
              (() => {
                const RenderIcon = CustomIcon || Sparkles;
                return (
                  <RenderIcon
                    size={18}
                    style={{
                      color: isHovered ? "#EA5211" : "#F5F5F5",
                      filter: isHovered
                        ? "drop-shadow(0px 0px 8px rgba(234, 82, 17, 0.7))"
                        : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.8))",
                      transition: "all 0.3s ease",
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                );
              })()
            )}
            {viewMode === "text" && (
              <span
                style={{
                  fontSize: "12px",
                  color: isHovered ? "#EA5211" : "#F5F5F5",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  textShadow: isHovered
                    ? "0px 0px 12px rgba(234, 82, 17, 0.6)"
                    : "0px 1px 3px rgba(0, 0, 0, 0.9)",
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  whiteSpace: "nowrap",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{label}</span>
                {showArrow && (
                  <ArrowRight
                    size={14}
                    style={{
                      transform: isHovered ? "translateX(3px)" : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </span>
            )}
          </div>

          {/* Inner Dark Capsule Background Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.97)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: isHovered
                  ? "linear-gradient(180deg, #18181c 0%, #0a0a0d 100%)"
                  : "linear-gradient(180deg, #121214 0%, #050505 100%)",
                border: isHovered ? "1px solid rgba(234, 82, 17, 0.3)" : "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.6)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Outer Liquid Metal Shader Ring Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition:
                "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.97)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(0, 0, 0, 0.6)"
                  : isHovered
                    ? "0px 0px 20px 2px rgba(234, 82, 17, 0.35), 0px 0px 0px 1px rgba(234, 82, 17, 0.5)"
                    : "0px 0px 15px 0px rgba(255, 255, 255, 0.08), 0px 0px 0px 1px rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                background: "transparent",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${dimensions.shaderWidth}px`,
                  maxWidth: `${dimensions.shaderWidth}px`,
                  height: `${dimensions.shaderHeight}px`,
                  transition: "width 0.4s ease, height 0.4s ease",
                }}
              />
            </div>
          </div>

          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              transition:
                "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={label}
          />
        </div>
      </div>
    </div>
  );
}
