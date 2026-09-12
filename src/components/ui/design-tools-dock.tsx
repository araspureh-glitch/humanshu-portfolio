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
    glowColor: "rgba(26, 188, 254, 0.6)",
    borderColor: "rgba(26, 188, 254, 0.9)",
    icon: (isHovered) => (
      <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300">
        <path fill={isHovered ? "#F24E1E" : "#999999"} d="M19 19A9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1 19 0h9.5v19H19z" />
        <path fill={isHovered ? "#FF7262" : "#999999"} d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill={isHovered ? "#A259FF" : "#999999"} d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill={isHovered ? "#1ABCFE" : "#999999"} d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 0 47.5z" />
        <path fill={isHovered ? "#0ACF83" : "#999999"} d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      </svg>
    ),
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    glowColor: "rgba(255, 154, 0, 0.6)",
    borderColor: "rgba(255, 154, 0, 0.9)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#2b0c00] border-[#FF9A00] text-[#FF9A00] shadow-[0_0_15px_rgba(255,154,0,0.6)]"
            : "bg-[#16171b] border-neutral-600 text-neutral-400"
        )}
      >
        Ai
      </div>
    ),
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    glowColor: "rgba(49, 168, 255, 0.6)",
    borderColor: "rgba(49, 168, 255, 0.9)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#001A30] border-[#31A8FF] text-[#31A8FF] shadow-[0_0_15px_rgba(49,168,255,0.6)]"
            : "bg-[#16171b] border-neutral-600 text-neutral-400"
        )}
      >
        Ps
      </div>
    ),
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    glowColor: "rgba(153, 153, 255, 0.6)",
    borderColor: "rgba(153, 153, 255, 0.9)",
    icon: (isHovered) => (
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-bold font-sans text-xs tracking-tighter transition-all duration-300 select-none",
          isHovered
            ? "bg-[#0c0038] border-[#9999FF] text-[#9999FF] shadow-[0_0_15px_rgba(153,153,255,0.6)]"
            : "bg-[#16171b] border-neutral-600 text-neutral-400"
        )}
      >
        Ae
      </div>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    glowColor: "rgba(236, 72, 153, 0.6)",
    borderColor: "rgba(236, 72, 153, 0.9)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "url(#agGrad3dTs)" : "#999999"}>
        <path d="M12 3L2 19h4.5l2.2-4h6.6l2.2 4H22L12 3zm0 4.5l2.3 4.2H9.7L12 7.5z" />
        <defs>
          <linearGradient id="agGrad3dTs" x1="0%" y1="0%" x2="100%" y2="100%">
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
    glowColor: "rgba(0, 85, 255, 0.6)",
    borderColor: "rgba(0, 85, 255, 0.9)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#0055FF" : "#999999"}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    id: "blender",
    name: "Blender",
    glowColor: "rgba(234, 118, 0, 0.6)",
    borderColor: "rgba(234, 118, 0, 0.9)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#EA7600" : "#999999"}>
        <path d="M12.5 10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        <path d="M2.5 12a1 1 0 0 1 1.7-.7l4.3 4.3a1 1 0 1 1-1.4 1.4L2.8 12.7a1 1 0 0 1-.3-.7z" />
        <path d="M18.8 4.2a1 1 0 0 1 1.4 1.4l-6.8 6.8a1 1 0 1 1-1.4-1.4l6.8-6.8z" />
      </svg>
    ),
  },
  {
    id: "notion",
    name: "Notion",
    glowColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#FFFFFF" : "#999999"}>
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.776c-.42-.326-.98-.42-1.54-.373L3.339 2.57c-.466.046-.56.28-.373.466l1.493 1.172zm.233 3.497v13.626c0 .7.327 1.026 1.073.98l13.916-.84c.746-.046.886-.466.886-1.119V6.679c0-.653-.28-.98-.933-.933L5.438 6.586c-.513.047-.746.373-.746 1.119zm12.378 1.446c.14 0 .326.093.326.326v10.548c0 .28-.186.42-.42.42h-1.493c-.233 0-.326-.14-.326-.373V13.86L10.3 19.32c-.373.466-.746.373-.98.093L6.848 15.68v3.453c0 .28-.14.42-.373.42H5.122c-.28 0-.42-.14-.42-.42V9.477c0-.28.14-.42.42-.42h1.68c.28 0 .42.093.56.326l5.226 6.301v-5.835c0-.28.14-.42.373-.42h1.494z" />
      </svg>
    ),
  },
];

export function DesignToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-16 px-4 sm:px-8 flex items-center justify-center relative z-20 overflow-visible">
      <div 
        className="relative max-w-5xl w-full flex justify-center py-8"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "55% 35%",
        }}
      >
        <div 
          className="relative rounded-3xl sm:rounded-[36px] border border-white/30 bg-[#0b0c10]/85 backdrop-blur-2xl px-4 sm:px-6 py-4 sm:py-5 shadow-[0_35px_80px_rgba(0,0,0,0.95),inset_0_2px_2px_rgba(255,255,255,0.4),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/20 max-w-full overflow-x-auto no-scrollbar"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg) rotateY(-7deg) translateZ(0px)",
            boxShadow: "0 40px 90px rgba(0,0,0,0.95), inset 0 2px 2px rgba(255,255,255,0.35), 0 0 0 1px rgba(255,255,255,0.18)",
          }}
        >
          <div 
            className="absolute left-0 right-0 -bottom-3 h-4 rounded-b-3xl bg-gradient-to-b from-white/20 to-black/90 pointer-events-none border-b border-white/20 shadow-xl" 
            style={{ transform: "rotateX(-45deg) translateZ(-5px)" }}
          />

          <div 
            className="flex items-center gap-2.5 sm:gap-4 px-3 sm:px-5 py-2.5 bg-black/70 rounded-2xl sm:rounded-[28px] border border-white/10 shadow-[inset_0_3px_8px_rgba(0,0,0,0.95)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {toolsData.map((tool, index) => {
              const isHovered = hoveredIndex === index;

              let neighborShift = 0;
              if (hoveredIndex !== null) {
                const diff = index - hoveredIndex;
                if (diff === -1) neighborShift = -5;
                if (diff === 1) neighborShift = 5;
              }

              return (
                <div key={tool.id} className="relative flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.85 }}
                        animate={{ opacity: 1, y: -58, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.85 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 z-50 pointer-events-none flex flex-col items-center"
                        style={{ transform: "translateZ(50px)" }}
                      >
                        <div className="bg-[#101115] border border-neutral-600/90 text-white font-sans text-xs font-medium px-4 py-1.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.95)] whitespace-nowrap">
                          {tool.name}
                        </div>
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-neutral-600/90 -mt-[1px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ y: 0, scale: 1 }}
                    animate={{
                      y: isHovered ? -14 : 0,
                      x: neighborShift,
                      scale: isHovered ? 1.10 : 1,
                      translateZ: isHovered ? 28 : 10,
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
                        ? `0 18px 40px -4px ${tool.glowColor}, 0 6px 0 #0a0b0d, inset 0 2px 2px rgba(255,255,255,0.4)`
                        : "0 6px 0 #090a0c, 0 10px 18px rgba(0,0,0,0.9), inset 0 1.5px 1.5px rgba(255,255,255,0.2)",
                      borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.2)",
                    }}
                    className={cn(
                      "relative w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all duration-300 outline-none cursor-pointer select-none",
                      isHovered
                        ? "bg-gradient-to-b from-[#282a32] via-[#1a1b21] to-[#121317]"
                        : "bg-gradient-to-b from-[#1e1f24] via-[#141518] to-[#0c0d0f] hover:border-white/40"
                    )}
                    aria-label={tool.name}
                  >
                    <div className="flex items-center justify-center" style={{ transform: "translateZ(8px)" }}>
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
