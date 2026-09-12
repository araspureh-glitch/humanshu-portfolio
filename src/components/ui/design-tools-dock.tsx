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
    glowColor: "rgba(26, 188, 254, 0.7)",
    borderColor: "#1ABCFE",
    icon: (isHovered) => (
      <svg viewBox="0 0 38 57" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300">
        <path fill={isHovered ? "#F24E1E" : "#FFFFFF"} d="M19 19A9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1 19 0h9.5v19H19z" />
        <path fill={isHovered ? "#FF7262" : "#FFFFFF"} d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill={isHovered ? "#A259FF" : "#FFFFFF"} d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill={isHovered ? "#1ABCFE" : "#FFFFFF"} d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 0 47.5z" />
        <path fill={isHovered ? "#0ACF83" : "#FFFFFF"} d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
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
            : "bg-transparent border-white/80 text-white"
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
            : "bg-transparent border-white/80 text-white"
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
            : "bg-transparent border-white/80 text-white"
        )}
      >
        Ae
      </div>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    glowColor: "rgba(236, 72, 153, 0.7)",
    borderColor: "#EC4899",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "url(#agGradCleanTs)" : "#FFFFFF"}>
        <path d="M12 3L2 19h4.5l2.2-4h6.6l2.2 4H22L12 3zm0 4.5l2.3 4.2H9.7L12 7.5z" />
        <defs>
          <linearGradient id="agGradCleanTs" x1="0%" y1="0%" x2="100%" y2="100%">
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
    glowColor: "rgba(0, 85, 255, 0.7)",
    borderColor: "#0055FF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#0055FF" : "#FFFFFF"}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    id: "blender",
    name: "Blender",
    glowColor: "rgba(234, 118, 0, 0.7)",
    borderColor: "#EA7600",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill={isHovered ? "#EA7600" : "#FFFFFF"}>
        <path d="M12.5 10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        <path d="M2.5 12a1 1 0 0 1 1.7-.7l4.3 4.3a1 1 0 1 1-1.4 1.4L2.8 12.7a1 1 0 0 1-.3-.7z" />
        <path d="M18.8 4.2a1 1 0 0 1 1.4 1.4l-6.8 6.8a1 1 0 1 1-1.4-1.4l6.8-6.8z" />
      </svg>
    ),
  },
  {
    id: "notion",
    name: "Notion",
    glowColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "#FFFFFF",
    icon: (isHovered) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300" fill="#FFFFFF">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.326L17.86 1.776c-.42-.326-.98-.42-1.54-.373L3.339 2.57c-.466.046-.56.28-.373.466l1.493 1.172zm.233 3.497v13.626c0 .7.327 1.026 1.073.98l13.916-.84c.746-.046.886-.466.886-1.119V6.679c0-.653-.28-.98-.933-.933L5.438 6.586c-.513.047-.746.373-.746 1.119zm12.378 1.446c.14 0 .326.093.326.326v10.548c0 .28-.186.42-.42.42h-1.493c-.233 0-.326-.14-.326-.373V13.86L10.3 19.32c-.373.466-.746.373-.98.093L6.848 15.68v3.453c0 .28-.14.42-.373.42H5.122c-.28 0-.42-.14-.42-.42V9.477c0-.28.14-.42.42-.42h1.68c.28 0 .42.093.56.326l5.226 6.301v-5.835c0-.28.14-.42.373-.42h1.494z" />
      </svg>
    ),
  },
];

export function DesignToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-black text-[#F5F5F5] py-20 px-4 sm:px-8 flex flex-col items-center justify-center relative z-20 overflow-hidden select-none">
      <div className="w-full max-w-5xl flex flex-col items-start space-y-4">
        <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase font-semibold">
          <span>SIDE VIEW</span>
          <span className="w-7 h-[1.5px] bg-neutral-600"></span>
        </div>

        <div 
          className="w-full flex justify-center py-8 overflow-visible"
          style={{
            perspective: "1600px",
            perspectiveOrigin: "25% 40%",
          }}
        >
          <div 
            className="relative rounded-[36px] border border-white/35 bg-gradient-to-b from-[#14161b]/95 via-[#0c0d10] to-[#050608] backdrop-blur-2xl p-4 sm:p-5 ring-1 ring-white/20 shadow-[0_40px_95px_rgba(0,0,0,0.98),inset_0_2px_3px_rgba(255,255,255,0.45)] overflow-visible"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(14deg) rotateY(-9deg) translateZ(0px)",
            }}
          >
            <div 
              className="absolute left-0 right-0 -bottom-7 h-7 rounded-b-[36px] bg-gradient-to-b from-white/25 via-white/10 to-black/95 border-x border-b border-white/35 pointer-events-none shadow-2xl"
              style={{
                transform: "rotateX(-55deg) translateZ(-5px)",
              }}
            />

            <div 
              className="flex items-center gap-3 sm:gap-4.5 px-4 sm:px-6 py-3 bg-black/80 rounded-[28px] border border-white/15 shadow-[inset_0_4px_12px_rgba(0,0,0,0.98)] overflow-visible"
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
                          ? `0 22px 45px -4px ${tool.glowColor}, 0 0 30px rgba(26,188,254,0.5), 0 6px 0 #0a0b0d, inset 0 2px 3px rgba(255,255,255,0.55)`
                          : "0 6px 0 #090a0c, 0 12px 20px rgba(0,0,0,0.95), inset 0 1.5px 2px rgba(255,255,255,0.25)",
                        borderColor: isHovered ? tool.borderColor : "rgba(255,255,255,0.28)",
                      }}
                      className={cn(
                        "relative w-12 h-12 sm:w-14 sm:h-14 md:w-[62px] md:h-[62px] rounded-2xl flex items-center justify-center border transition-all duration-300 outline-none cursor-pointer select-none backdrop-blur-xl",
                        isHovered
                          ? "bg-gradient-to-b from-[#2a2c35]/95 via-[#1d1e26]/95 to-[#13141a]"
                          : "bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-black/90 hover:border-white/50"
                      )}
                      aria-label={tool.name}
                    >
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
