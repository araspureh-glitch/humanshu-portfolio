import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// --- 8 Tools Matching Reference Image ---
const toolsData = [
  {
    id: "figma",
    name: "Figma",
    glowColor: "rgba(26, 188, 254, 0.5)",
    borderColor: "rgba(26, 188, 254, 0.8)",
    icon: (isHovered) => (
      <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300">
        <path fill={isHovered ? "#F24E1E" : "#CCCCCC"} d="M19 19A9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1 19 0h9.5v19H19z" />
        <path fill={isHovered ? "#FF7262" : "#CCCCCC"} d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill={isHovered ? "#A259FF" : "#CCCCCC"} d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill={isHovered ? "#1ABCFE" : "#CCCCCC"} d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 0 47.5z" />
        <path fill={isHovered ? "#0ACF83" : "#CCCCCC"} d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    glowColor: "rgba(255, 154, 0, 0.5)",
    borderColor: "rgba(255, 154, 0, 0.8)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#2b0c00] border-[#FF9A00] text-[#FF9A00] shadow-[0_0_12px_rgba(255,154,0,0.5)]"
            : "bg-[#16171b] border-[#FF9A00]/70 text-[#FF9A00]"
        )}
      >
        Ai
      </div>
    ),
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    glowColor: "rgba(49, 168, 255, 0.5)",
    borderColor: "rgba(49, 168, 255, 0.8)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#001A30] border-[#31A8FF] text-[#31A8FF] shadow-[0_0_12px_rgba(49,168,255,0.5)]"
            : "bg-[#16171b] border-[#31A8FF]/70 text-[#31A8FF]"
        )}
      >
        Ps
      </div>
    ),
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    glowColor: "rgba(153, 153, 255, 0.5)",
    borderColor: "rgba(153, 153, 255, 0.8)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#0c0038] border-[#9999FF] text-[#9999FF] shadow-[0_0_12px_rgba(153,153,255,0.5)]"
            : "bg-[#16171b] border-[#9999FF]/70 text-[#9999FF]"
        )}
      >
        Ae
      </div>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    glowColor: "rgba(236, 72, 153, 0.5)",
    borderColor: "rgba(236, 72, 153, 0.8)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "url(#agGradHover)" : "#E0E0E0"}>
        <path d="M12 3L2 19h4.5l2.2-4h6.6l2.2 4H22L12 3zm0 4.5l2.3 4.2H9.7L12 7.5z" />
        <defs>
          <linearGradient id="agGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
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
    glowColor: "rgba(0, 85, 255, 0.5)",
    borderColor: "rgba(0, 85, 255, 0.8)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#0055FF" : "#E0E0E0"}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    id: "blender",
    name: "Blender",
    glowColor: "rgba(234, 118, 0, 0.5)",
    borderColor: "rgba(234, 118, 0, 0.8)",
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
    glowColor: "rgba(255, 255, 255, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.8)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#FFFFFF" : "#E0E0E0"}>
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.776c-.42-.326-.98-.42-1.54-.373L3.339 2.57c-.466.046-.56.28-.373.466l1.493 1.172zm.233 3.497v13.626c0 .7.327 1.026 1.073.98l13.916-.84c.746-.046.886-.466.886-1.119V6.679c0-.653-.28-.98-.933-.933L5.438 6.586c-.513.047-.746.373-.746 1.119zm12.378 1.446c.14 0 .326.093.326.326v10.548c0 .28-.186.42-.42.42h-1.493c-.233 0-.326-.14-.326-.373V13.86L10.3 19.32c-.373.466-.746.373-.98.093L6.848 15.68v3.453c0 .28-.14.42-.373.42H5.122c-.28 0-.42-.14-.42-.42V9.477c0-.28.14-.42.42-.42h1.68c.28 0 .42.093.56.326l5.226 6.301v-5.835c0-.28.14-.42.373-.42h1.494z" />
      </svg>
    ),
  },
];

export function DesignToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState(0); // Default hover on Figma matching screenshot

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-14 px-4 sm:px-8 flex items-center justify-center relative z-20">
      
      {/* 3D Glass Wireframe Dock Container */}
      <div className="relative max-w-5xl w-full flex justify-center py-4">
        
        {/* Outer 3D Glass Capsule Wireframe Shell */}
        <div className="relative rounded-3xl sm:rounded-[34px] border border-white/25 bg-[#0b0c0f]/80 backdrop-blur-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1.5px_2px_rgba(255,255,255,0.3),inset_0_-1.5px_2px_rgba(0,0,0,0.8)] ring-1 ring-white/15 max-w-full overflow-x-auto no-scrollbar">
          
          {/* Inner Recessed Glass Key Tray */}
          <div className="flex items-center gap-2.5 sm:gap-4 px-2 sm:px-4 py-2 bg-black/60 rounded-2xl sm:rounded-[26px] border border-white/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]">
            
            {toolsData.map((tool, index) => {
              const isHovered = hoveredIndex === index;

              // Neighbor Magnetic Shift (3-4px outward)
              let neighborShift = 0;
              if (hoveredIndex !== null) {
                const diff = index - hoveredIndex;
                if (diff === -1) neighborShift = -4;
                if (diff === 1) neighborShift = 4;
              }

              return (
                <div key={tool.id} className="relative flex flex-col items-center">
                  
                  {/* Floating Tooltip Pill */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.85 }}
                        animate={{ opacity: 1, y: -52, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.85 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 z-50 pointer-events-none flex flex-col items-center"
                      >
                        <div className="bg-[#121317] border border-neutral-600/80 text-white font-sans text-xs font-medium px-4 py-1 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.9)] whitespace-nowrap">
                          {tool.name}
                        </div>
                        {/* Caret Arrow */}
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-neutral-600/80 -mt-[1px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Raised 3D Key Button */}
                  <motion.button
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      y: isHovered ? -12 : 0,
                      x: neighborShift,
                      scale: isHovered ? 1.12 : 1,
                      rotateX: isHovered ? -4 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 24,
                    }}
                    style={{
                      boxShadow: isHovered
                        ? `0 16px 36px -4px ${tool.glowColor}, inset 0 1.5px 1.5px rgba(255,255,255,0.4)`
                        : "0 6px 14px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.18)",
                      borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.15)",
                    }}
                    className={cn(
                      "relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all duration-300 outline-none cursor-pointer select-none",
                      isHovered
                        ? "bg-gradient-to-b from-[#24262d] via-[#17181d] to-[#101114]"
                        : "bg-gradient-to-b from-[#1b1c20] via-[#131417] to-[#0b0c0e] hover:border-white/30"
                    )}
                    aria-label={tool.name}
                  >
                    {/* Centered Logo */}
                    <div className="flex items-center justify-center">
                      {tool.icon(isHovered)}
                    </div>
                  </motion.button>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

export default DesignToolsDock;
