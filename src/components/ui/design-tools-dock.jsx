import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- 8 Tools Matching Exact Prompt Spec ---
const toolsData = [
  {
    id: "figma",
    name: "Figma",
    glowColor: "rgba(26, 188, 254, 0.65)",
    borderColor: "#1ABCFE",
    icon: (isHovered) => (
      <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300">
        <path fill={isHovered ? "#F24E1E" : "#E0E0E0"} d="M19 19A9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1 19 0h9.5v19H19z" />
        <path fill={isHovered ? "#FF7262" : "#E0E0E0"} d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill={isHovered ? "#A259FF" : "#E0E0E0"} d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill={isHovered ? "#1ABCFE" : "#E0E0E0"} d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 0 47.5z" />
        <path fill={isHovered ? "#0ACF83" : "#E0E0E0"} d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    glowColor: "rgba(255, 154, 0, 0.65)",
    borderColor: "#FF9A00",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#2b0c00] border-[#FF9A00] text-[#FF9A00] shadow-[0_0_15px_rgba(255,154,0,0.6)]"
            : "bg-transparent border-[#FF9A00]/80 text-[#FF9A00]"
        )}
      >
        Ai
      </div>
    ),
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    glowColor: "rgba(49, 168, 255, 0.65)",
    borderColor: "#31A8FF",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#001A30] border-[#31A8FF] text-[#31A8FF] shadow-[0_0_15px_rgba(49,168,255,0.6)]"
            : "bg-transparent border-[#31A8FF]/80 text-[#31A8FF]"
        )}
      >
        Ps
      </div>
    ),
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    glowColor: "rgba(153, 153, 255, 0.65)",
    borderColor: "#9999FF",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-md border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#0c0038] border-[#9999FF] text-[#9999FF] shadow-[0_0_15px_rgba(153,153,255,0.6)]"
            : "bg-transparent border-[#9999FF]/80 text-[#9999FF]"
        )}
      >
        Ae
      </div>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    glowColor: "rgba(236, 72, 153, 0.65)",
    borderColor: "#EC4899",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "url(#agGradMacro)" : "#E0E0E0"}>
        <path d="M12 3L2 19h4.5l2.2-4h6.6l2.2 4H22L12 3zm0 4.5l2.3 4.2H9.7L12 7.5z" />
        <defs>
          <linearGradient id="agGradMacro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "framer",
    name: "Framer",
    glowColor: "rgba(0, 85, 255, 0.65)",
    borderColor: "#0055FF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#0055FF" : "#E0E0E0"}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    id: "blender",
    name: "Blender",
    glowColor: "rgba(234, 118, 0, 0.65)",
    borderColor: "#EA7600",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#EA7600" : "#E0E0E0"}>
        <path d="M12.5 10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        <path d="M2.5 12a1 1 0 0 1 1.7-.7l4.3 4.3a1 1 0 1 1-1.4 1.4L2.8 12.7a1 1 0 0 1-.3-.7z" />
        <path d="M18.8 4.2a1 1 0 0 1 1.4 1.4l-6.8 6.8a1 1 0 1 1-1.4-1.4l6.8-6.8z" />
      </svg>
    ),
  },
  {
    id: "notion",
    name: "Notion",
    glowColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#FFFFFF" : "#E0E0E0"}>
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.776c-.42-.326-.98-.42-1.54-.373L3.339 2.57c-.466.046-.56.28-.373.466l1.493 1.172zm.233 3.497v13.626c0 .7.327 1.026 1.073.98l13.916-.84c.746-.046.886-.466.886-1.119V6.679c0-.653-.28-.98-.933-.933L5.438 6.586c-.513.047-.746.373-.746 1.119zm12.378 1.446c.14 0 .326.093.326.326v10.548c0 .28-.186.42-.42.42h-1.493c-.233 0-.326-.14-.326-.373V13.86L10.3 19.32c-.373.466-.746.373-.98.093L6.848 15.68v3.453c0 .28-.14.42-.373.42H5.122c-.28 0-.42-.14-.42-.42V9.477c0-.28.14-.42.42-.42h1.68c.28 0 .42.093.56.326l5.226 6.301v-5.835c0-.28.14-.42.373-.42h1.494z" />
      </svg>
    ),
  },
];

export function DesignToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState(0); // Figma active by default matching prompt

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-20 px-4 sm:px-8 flex flex-col items-center justify-center relative z-20 overflow-visible select-none">
      
      <div className="w-full max-w-5xl flex flex-col items-start space-y-4">
        
        {/* Top-Left Tag Label: SIDE VIEW — */}
        <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase font-semibold">
          <span>SIDE VIEW</span>
          <span className="w-7 h-[1.5px] bg-neutral-600"></span>
        </div>

        {/* 3/4 Low Side Perspective Camera Stage */}
        <div 
          className="w-full flex justify-center py-8"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "35% 25%", // Low side perspective converging gently to the right
          }}
        >
          
          {/* Macro Keypad Device Body (Sleek Dark Charcoal Glass Enclosure) */}
          <div 
            className="relative rounded-[36px] border border-white/35 bg-gradient-to-b from-[#16181d]/90 via-[#0d0e12]/95 to-[#08090b] backdrop-blur-2xl p-4 sm:p-5 ring-1 ring-white/20 max-w-full overflow-x-auto no-scrollbar"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(18deg) rotateY(-10deg) translateZ(0px)",
              boxShadow: "0 40px 90px rgba(0,0,0,0.98), inset 0 2px 3px rgba(255,255,255,0.45), 0 0 0 1px rgba(255,255,255,0.25)",
            }}
          >
            
            {/* Front Translucent Glass Rim Extrusion */}
            <div 
              className="absolute left-0 right-0 -bottom-8 h-8 rounded-b-[36px] bg-gradient-to-b from-white/25 via-white/10 to-black/95 border-x border-b border-white/35 pointer-events-none shadow-2xl"
              style={{
                transform: "rotateX(-60deg) translateZ(-6px)",
              }}
            />

            {/* Inner Recessed Glass Key Tray */}
            <div 
              className="flex items-center gap-3 sm:gap-4.5 px-4 sm:px-6 py-3 bg-black/75 rounded-[28px] border border-white/15 shadow-[inset_0_4px_12px_rgba(0,0,0,0.98)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {toolsData.map((tool, index) => {
                const isHovered = hoveredIndex === index;

                // Neighbor Magnetic Displacement
                let neighborShift = 0;
                if (hoveredIndex !== null) {
                  const diff = index - hoveredIndex;
                  if (diff === -1) neighborShift = -5;
                  if (diff === 1) neighborShift = 5;
                }

                return (
                  <div key={tool.id} className="relative flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
                    
                    {/* Tooltip Pill */}
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
                          {/* Caret Arrow */}
                          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-neutral-600/90 -mt-[1px]" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Glassy Translucent Frosted 3D Physical Key */}
                    <motion.button
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      initial={{ y: 0, scale: 1 }}
                      animate={{
                        y: isHovered ? -16 : 0,
                        x: neighborShift,
                        scale: isHovered ? 1.10 : 1,
                        translateZ: isHovered ? 34 : 12,
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
                        boxShadow: isHovered
                          ? `0 22px 45px -4px ${tool.glowColor}, 0 0 25px rgba(26,188,254,0.4), 0 6px 0 #0a0b0d, inset 0 2px 3px rgba(255,255,255,0.5)`
                          : "0 6px 0 #090a0c, 0 12px 20px rgba(0,0,0,0.95), inset 0 1.5px 2px rgba(255,255,255,0.25)",
                        borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.28)",
                      }}
                      className={cn(
                        "relative w-13 h-13 sm:w-15 sm:h-15 md:w-[62px] md:h-[62px] rounded-2xl flex items-center justify-center border transition-all duration-300 outline-none cursor-pointer select-none backdrop-blur-xl",
                        isHovered
                          ? "bg-gradient-to-b from-[#2a2c35]/90 via-[#1d1e26]/95 to-[#13141a]"
                          : "bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-black/80 hover:border-white/50"
                      )}
                      aria-label={tool.name}
                    >
                      {/* Centered White / Brand Icon */}
                      <div className="flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
                        {tool.icon(isHovered)}
                      </div>
                    </motion.button>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DesignToolsDock;
