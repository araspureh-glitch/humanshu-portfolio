import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ToolItem {
  id: string;
  name: string;
  glowColor: string;
  borderColor: string;
  icon: (isHovered: boolean) => React.ReactNode;
}

const toolsData: ToolItem[] = [
  {
    id: "figma",
    name: "Figma",
    glowColor: "rgba(26, 188, 254, 0.8)",
    borderColor: "#1ABCFE",
    icon: (isHovered) => (
      <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 drop-shadow-[0_0_12px_rgba(26,188,254,0.8)]">
        <path fill="#F24E1E" d="M19 19A9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1 19 0h9.5v19H19z" />
        <path fill="#FF7262" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill="#1ABCFE" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 0 47.5z" />
        <path fill="#0ACF83" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    glowColor: "rgba(255, 154, 0, 0.7)",
    borderColor: "#FF9A00",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#2b0c00] border-[#FF9A00] text-[#FF9A00] shadow-[0_0_15px_rgba(255,154,0,0.6)]"
            : "bg-[#180a00]/90 border-[#FF9A00]/80 text-[#FF9A00]"
        )}
      >
        Ai
      </div>
    ),
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    glowColor: "rgba(49, 168, 255, 0.7)",
    borderColor: "#31A8FF",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#001A30] border-[#31A8FF] text-[#31A8FF] shadow-[0_0_15px_rgba(49,168,255,0.6)]"
            : "bg-[#000f1c]/90 border-[#31A8FF]/80 text-[#31A8FF]"
        )}
      >
        Ps
      </div>
    ),
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    glowColor: "rgba(153, 153, 255, 0.7)",
    borderColor: "#9999FF",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#0c0038] border-[#9999FF] text-[#9999FF] shadow-[0_0_15px_rgba(153,153,255,0.6)]"
            : "bg-[#070020]/90 border-[#9999FF]/80 text-[#9999FF]"
        )}
      >
        Ae
      </div>
    ),
  },
  {
    id: "chevron",
    name: "Chevron / Peak",
    glowColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    ),
  },
  {
    id: "flag",
    name: "Folded Flag",
    glowColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    id: "swirl",
    name: "Swirl / Teardrop",
    glowColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: "bracket",
    name: "Frame / Bracket",
    glowColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5M8 3H3v5M16 21h5v-5M8 21H3v-5" />
      </svg>
    ),
  },
];

export function DesignToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-black text-[#F5F5F5] py-20 px-4 sm:px-8 flex flex-col items-center justify-center relative z-20 overflow-hidden select-none">
      
      {/* Ambient Cool Blue Dark Studio Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_70%,rgba(26,188,254,0.08),transparent_60%)]" />

      {/* Container Wrapper */}
      <div className="w-full max-w-5xl flex flex-col items-start space-y-4 relative z-10">
        
        {/* Top-Left Monospace Tag Label: SIDE VIEW — */}
        <div className="flex items-center gap-3 font-sans text-xs text-neutral-400 tracking-[0.25em] uppercase font-semibold">
          <span>SIDE VIEW</span>
          <span className="w-7 h-[1.5px] bg-neutral-600"></span>
        </div>

        {/* Low Close 3/4 Side Perspective Stage */}
        <div 
          className="w-full flex justify-center py-10 overflow-visible"
          style={{
            perspective: "1500px",
            perspectiveOrigin: "25% 42%",
          }}
        >
          
          {/* Main Macro Keypad Enclosure Container */}
          <div className="relative overflow-visible group">

            {/* Macro Keypad Device Body (Smooth Pill-Shaped Dark Charcoal Enclosure) */}
            <div 
              className="relative rounded-[36px] border border-white/35 bg-gradient-to-b from-[#161820]/95 via-[#0e1014] to-[#06070a] backdrop-blur-2xl p-4 sm:p-5 ring-1 ring-white/20 shadow-[0_45px_100px_rgba(0,0,0,0.98),0_20px_50px_rgba(26,188,254,0.18),inset_0_2px_4px_rgba(255,255,255,0.45)] overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(15deg) rotateY(-10deg) translateZ(0px)",
              }}
            >
              
              {/* Soft Ambient Blue Light Along Lower Edge */}
              <div 
                className="absolute left-4 right-4 -bottom-2 h-4 rounded-full bg-[#1ABCFE]/30 blur-md pointer-events-none"
                style={{ transform: "translateZ(-10px)" }}
              />

              {/* Front Translucent Rim Extrusion */}
              <div 
                className="absolute left-0 right-0 -bottom-7 h-7 rounded-b-[36px] bg-gradient-to-b from-white/25 via-white/10 to-black/95 border-x border-b border-white/35 pointer-events-none shadow-2xl"
                style={{
                  transform: "rotateX(-55deg) translateZ(-5px)",
                }}
              />

              {/* Inner Recessed Glass Key Tray */}
              <div 
                className="flex items-center gap-3 sm:gap-4.5 px-4 sm:px-6 py-3 bg-black/80 rounded-[28px] border border-white/15 shadow-[inset_0_4px_14px_rgba(0,0,0,0.98)] overflow-visible"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {toolsData.map((tool, index) => {
                  const isHovered = hoveredIndex === index;
                  const isFigmaActive = index === 0;

                  let neighborShift = 0;
                  if (hoveredIndex !== null) {
                    const diff = index - hoveredIndex;
                    if (diff === -1) neighborShift = -5;
                    if (diff === 1) neighborShift = 5;
                  }

                  const isFarRight = index >= 6;

                  return (
                    <div 
                      key={tool.id} 
                      className={cn(
                        "relative flex flex-col items-center transition-all duration-500",
                        isFarRight && "opacity-95"
                      )} 
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      
                      {/* Floating Dark Tooltip Pill */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.85 }}
                            animate={{ opacity: 1, y: -64, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.85 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-0 z-50 pointer-events-none flex flex-col items-center"
                            style={{ transform: "translateZ(65px)" }}
                          >
                            <div className="bg-[#121317] border border-neutral-600/90 text-white font-sans text-xs font-medium px-4 py-1.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.95)] whitespace-nowrap">
                              {tool.name}
                            </div>
                            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-neutral-600/90 -mt-[1px]" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Glossy Translucent Dark Glass 3D Physical Key */}
                      <motion.button
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ y: 0, scale: 1 }}
                        animate={{
                          y: isHovered ? -16 : 0,
                          x: neighborShift,
                          scale: isHovered ? 1.10 : 1,
                          translateZ: isHovered ? 34 : (isFigmaActive ? 16 : 12),
                        }}
                        whileTap={{
                          y: isHovered ? -4 : 2,
                          scale: 0.95,
                          translateZ: 4,
                          transition: { duration: 0.1 }
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 25,
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          boxShadow: (isHovered || isFigmaActive)
                            ? `0 22px 45px -4px ${tool.glowColor}, 0 0 32px rgba(26,188,254,0.65), 0 6px 0 #0a0b0d, inset 0 2px 3px rgba(255,255,255,0.6)`
                            : "0 6px 0 #090a0c, 0 12px 20px rgba(0,0,0,0.95), inset 0 1.5px 2px rgba(255,255,255,0.25)",
                          borderColor: (isHovered || isFigmaActive) ? tool.borderColor : "rgba(255,255,255,0.28)",
                        }}
                        className={cn(
                          "relative w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] rounded-2xl flex items-center justify-center border transition-all duration-300 outline-none cursor-pointer select-none backdrop-blur-xl",
                          (isHovered || isFigmaActive)
                            ? "bg-gradient-to-b from-[#2a2c35]/95 via-[#1d1e26]/95 to-[#13141a]"
                            : "bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-black/90 hover:border-white/50"
                        )}
                        aria-label={tool.name}
                      >
                        {/* Centered Key Icon */}
                        <div className="flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
                          {tool.icon(isHovered || isFigmaActive)}
                        </div>
                      </motion.button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Glossy Black Floor Reflection Underneath Device */}
            <div 
              className="w-full flex justify-center opacity-20 blur-[3px] pointer-events-none mt-2 scale-y-[-0.6] origin-top brightness-75 select-none"
              style={{
                transform: "rotateX(-15deg) rotateY(-10deg)",
              }}
            >
              <div className="rounded-[36px] border border-white/20 bg-gradient-to-b from-white/10 to-transparent p-4 sm:p-5 w-full h-16" />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DesignToolsDock;

