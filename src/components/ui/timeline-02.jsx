import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const defaultTimelineData = [
  {
    id: "01",
    date: "Aug 2026 – Present",
    company: "Saff co",
    type: "Internship • Remote",
    role: "Senior UI/UX Designer",
    summary:
      "As Lead UI/UX Designer, worked on a responsive web-based digital product focusing on clean, intuitive, and user-friendly interaction design.",
    highlights: [
      "Led the design process across user flows, Information Architecture, wireframes, responsive layouts, and high-fidelity UI designs in Figma.",
      "Focused on understanding user needs, simplifying complex journeys, and creating clear navigation patterns for seamless user experience.",
      "Maintained design direction and consistency across typography, spacing, components, and visual elements with a strong focus on accessibility (WCAG) and responsive behavior."
    ]
  },
  {
    id: "02",
    date: "Jul 2026 – Present",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    role: "Design Intern",
    summary:
      "Led UI/UX design direction at Torkk (BlackOriginX Private Limited), taking ownership of design process across digital product initiatives.",
    highlights: [
      "Worked on understanding product requirements, defining user flows, developing wireframes, and translating concepts into high-fidelity responsive interfaces using Figma.",
      "Created intuitive experiences while maintaining consistency across screens, components, and interactive micro-animations.",
      "Collaborated closely with product, development, and cross-functional teams to contribute to design systems, prototyping, and UX optimizations."
    ]
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid • Remote / Hybrid",
    role: "Design Intern",
    summary:
      "6-month UI/UX Design Internship designing 5 end-to-end e-commerce websites including flagship platforms Seed to Soul and Lynk Sweets.",
    highlights: [
      "Successfully designed 5 end-to-end e-commerce websites, managing full lifecycle from user research to developer handoff.",
      "Contributed to flagship platforms such as Seed to Soul and Lynk Sweets while establishing consistent design systems.",
      "Supported graphic design initiatives by creating high-impact visual assets and ensuring total brand consistency."
    ]
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    company: "Prorion",
    type: "Freelance • Remote",
    role: "UI/UX & Brand Designer",
    summary:
      "Collaborated directly with the founder to translate Prorion’s product vision into a clear visual and digital experience.",
    highlights: [
      "Developed the \"Connect – Collaborate – Create\" brand concept and logo direction.",
      "Contributed to website UI, visual hierarchy, user experience design, and design iterations.",
      "Refined designs through iterative founder feedback to build a cohesive, engaging brand touchpoint."
    ]
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    role: "UI/UX Designer",
    summary:
      "Designed a checklist-based mobile experience focused on intuitive onboarding, smooth task management, and minimal UI interface.",
    highlights: [
      "Designed frictionless mobile task onboarding and task management flows.",
      "Created complete visual identity including logo mark, typography system, and color palette.",
      "Delivered high-fidelity mobile prototypes optimized for mobile touch interactions."
    ]
  }
];

export default function Timeline_02({ data = defaultTimelineData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const itemRefs = useRef([]);

  // IntersectionObserver to set active step based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const top = ref.offsetTop;
          const height = ref.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToStep = (index) => {
    if (itemRefs.current[index]) {
      const targetPos = itemRefs.current[index].offsetTop - 120;
      window.scrollTo({
        top: targetPos,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full text-[#F5F5F5] font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Sticky Vertical Timeline (Brilean-inspired) */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8 z-20">
          
          {/* Label & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#CCFF00] uppercase tracking-[0.2em] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span>MY JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-sans">
              WORK EXPERIENCE
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Humanshu Araspure • UI/UX & Graphic Designer
            </p>
          </div>

          {/* Interactive Step Timeline Indicator */}
          <div className="relative pl-6 py-2 border-l border-white/10 space-y-6">
            
            {/* Active Yellow-Lime Dot on Timeline */}
            <motion.div
              className="absolute left-[-5px] w-2.5 h-2.5 rounded-full bg-[#CCFF00] shadow-[0_0_12px_rgba(204,255,0,0.8)]"
              animate={{
                top: `${activeStep * 56 + 12}px`
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />

            {data.map((item, idx) => {
              const isActive = activeStep === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToStep(idx)}
                  className={`w-full text-left flex items-center gap-4 transition-all duration-300 group cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                  }`}
                >
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      isActive ? "text-[#CCFF00] font-bold" : "text-neutral-500 group-hover:text-white"
                    }`}
                  >
                    {item.id}
                  </span>
                  <span
                    className={`text-sm sm:text-base tracking-tight font-sans transition-colors duration-300 truncate ${
                      isActive ? "text-white font-medium" : "text-neutral-400 group-hover:text-white"
                    }`}
                  >
                    {item.company}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Experience Details Cards */}
        <div className="lg:col-span-8 space-y-16 sm:space-y-24">
          {data.map((item, index) => {
            const isActive = activeStep === index;
            const isExpanded = !!expandedItems[index];

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="scroll-mt-32 pt-6 first:pt-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-500 space-y-6 ${
                    isActive
                      ? "bg-[#0c0c0e] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      : "bg-[#08080a]/60 border-white/5 opacity-70 hover:opacity-90"
                  }`}
                >
                  {/* Card Header: Meta + Company */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-5">
                    <div>
                      <div className="flex items-center gap-3 font-mono text-xs text-[#CCFF00]">
                        <span className="font-bold">{item.id}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-400 tracking-widest uppercase">{item.date}</span>
                      </div>
                      <h3
                        className={`text-2xl sm:text-4xl font-light tracking-tight mt-2 font-sans transition-colors duration-300 ${
                          isActive ? "text-white" : "text-neutral-300"
                        }`}
                      >
                        {item.company}
                      </h3>
                    </div>

                    <div className="sm:text-right font-mono text-xs text-neutral-400 space-y-1">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#FFBC95]">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Role & Description */}
                  <div className="space-y-3">
                    <h4 className="text-lg sm:text-xl font-medium text-white font-sans tracking-tight">
                      {item.role || item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                      {item.summary || item.description}
                    </p>
                  </div>

                  {/* Expandable Responsibilities */}
                  <AnimatePresence initial={false}>
                    {isExpanded && item.highlights && (
                      <motion.div
                        key="responsibilities"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, delay: 0.05 }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.15 }
                          }
                        }}
                        className="overflow-hidden pt-2 border-t border-white/10"
                      >
                        <div className="space-y-3 py-2">
                          <h5 className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] font-medium">
                            Key Responsibilities & Impact:
                          </h5>
                          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                            {item.highlights.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                <span className="text-[#CCFF00] font-mono mt-0.5">•</span>
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* View More / View Less Button */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-2 flex justify-start">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-mono tracking-wider text-neutral-300 hover:text-[#CCFF00] transition-colors cursor-pointer flex items-center gap-2 group py-1.5 px-3 rounded-lg border border-white/10 hover:border-[#CCFF00]/40 bg-white/[0.02]"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "View Less" : "View More"}</span>
                        <span className="transition-transform duration-200 group-hover:translate-y-0.5">
                          {isExpanded ? "↑" : "↓"}
                        </span>
                      </button>
                    </div>
                  )}

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
