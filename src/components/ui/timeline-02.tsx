"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";

export type TimelineItem = {
  id?: string;
  date: string;
  title: string;
  company?: string;
  type?: string;
  location?: string;
  summary?: string;
  description?: string;
  content?: string;
  highlights?: string[];
  skills?: string[];
};

export const defaultTimelineData: TimelineItem[] = [
  {
    id: "01",
    date: "Aug 2026 – Present",
    title: "Senior UI/UX Designer",
    company: "Saff co",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Led the core UI/UX product design direction for web applications, user flows, Information Architecture, and Figma design systems.",
    highlights: [
      "Architected end-to-end user journeys, wireframes, and responsive layouts in Figma.",
      "Established centralized design tokens for consistent typography, spacing, and UI components.",
      "Iterated interfaces through user research, usability testing, and WCAG accessibility guidelines."
    ],
    skills: ["UI/UX Design", "Figma", "Information Architecture", "User Flows", "Responsive Design"]
  },
  {
    id: "02",
    date: "Jul 2026 – Present",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Spearheaded UI/UX design initiatives across web and mobile digital products, translating complex requirements into interactive interfaces.",
    highlights: [
      "Designed wireframes and interactive prototypes for core web and mobile touchpoints.",
      "Collaborated directly with product and development teams for seamless design handoffs.",
      "Contributed to design systems, component libraries, and interface UX improvements."
    ],
    skills: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    title: "Design Intern",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid",
    location: "Remote / Hybrid",
    summary: "Completed a 6-month UI/UX Internship designing 5 end-to-end e-commerce web platforms including flagship storefronts Seed to Soul and Lynk Sweets.",
    highlights: [
      "Managed full design lifecycle from user research and wireframing to production handoff.",
      "Established consistent design systems and improved user journeys for e-commerce storefronts.",
      "Created visual marketing assets and maintained overall brand consistency."
    ],
    skills: ["UI/UX Design", "E-Commerce Design", "User Research", "Seed to Soul", "Lynk Sweets"]
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Partnered directly with the founder to define the 'Connect – Collaborate – Create' brand identity, vector logo direction, and website UI.",
    highlights: [
      "Developed full brand identity concept, typography scale, and vector logo mark.",
      "Designed responsive marketing website UI with clear visual hierarchy."
    ],
    skills: ["UI/UX Design", "Branding", "Logo Design", "Visual Hierarchy"]
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    title: "UI/UX Designer",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Designed a minimalist checklist mobile experience focused on intuitive onboarding, smooth task management, and mobile UX touch patterns.",
    highlights: [
      "Created frictionless mobile task onboarding and state feedback flows.",
      "Built complete visual identity system including logo, typography, and color palette."
    ],
    skills: ["Mobile UI/UX", "Visual Identity", "Typography", "Prototyping"]
  }
];

interface TimelineCardProps {
  entry: TimelineItem;
  index: number;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
}

function TimelineCard({ entry, index, isExpanded, toggleExpand }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "center center", "end 15%"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.01, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 1, 1, 0.55]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 1, 0.2]);
  const nodeScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 1.35, 0.9]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="relative pl-8 sm:pl-12 md:pl-16 group"
    >
      <motion.div 
        style={{ scale: nodeScale }}
        className="absolute left-[-5px] sm:left-[-6px] top-6 z-20 flex items-center justify-center"
      >
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-emerald-500/30 animate-ping opacity-75" />
        <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_15px_rgba(52,211,153,0.8)] border border-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      </motion.div>

      <motion.div 
        className="relative bg-[#0d0d0e]/80 backdrop-blur-xl border border-white/10 group-hover:border-emerald-500/40 transition-all duration-500 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl shadow-black/60 overflow-hidden"
      >
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {entry.id ? `ROLE #${entry.id}` : `RELEASE`}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/10 flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-neutral-400" />
              {entry.date}
            </span>
          </div>

          {(entry.company || entry.type) && (
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              {entry.company && (
                <span className="flex items-center gap-1 text-neutral-300 font-medium">
                  <Briefcase className="w-3 h-3 text-emerald-400" />
                  {entry.company}
                </span>
              )}
              {entry.type && (
                <span className="text-neutral-500 hidden sm:inline">• {entry.type}</span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-normal text-white font-sans tracking-tight mb-3 group-hover:text-emerald-300 transition-colors">
          {entry.title}
        </h3>

        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-5">
          {entry.summary || entry.description || entry.content}
        </p>

        {entry.skills && entry.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {entry.skills.map((skill, sIdx) => (
              <span 
                key={sIdx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/5 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isExpanded && entry.highlights && entry.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden pt-4 mt-2 border-t border-white/10 space-y-3"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/90 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Contributions & Impact
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                {entry.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-3 group/item">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="leading-relaxed text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {entry.highlights && entry.highlights.length > 0 && (
          <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-3">
            <span className="text-[11px] font-mono text-neutral-500">
              {entry.highlights.length} Key Highlights
            </span>
            <button
              onClick={() => toggleExpand(index)}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 active:scale-95 transition-all"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Hide Highlights" : "Expand Details"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface TimelineProps {
  data?: TimelineItem[];
  title?: string;
}

export default function Timeline_02({ data = defaultTimelineData, title = "Work Experience" }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({ 0: true });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"]
  });

  const animatedBeamHeight = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-[#050505] text-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {title && (
          <div className="mb-14 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-medium tracking-[0.2em] text-emerald-400 uppercase">
                04 — CAREER TIMELINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2 font-sans">
                {title}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-medium">
              RELEASE TIMELINE
            </span>
          </div>
        )}

        <div ref={containerRef} className="relative space-y-12 sm:space-y-16">
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10 rounded-full" />

          <motion.div
            style={{ scaleY: animatedBeamHeight }}
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-400 via-teal-300 to-cyan-500 origin-top shadow-[0_0_12px_rgba(52,211,153,0.9)] rounded-full z-10"
          />

          {data.map((entry, index) => (
            <TimelineCard
              key={entry.id || index}
              entry={entry}
              index={index}
              isExpanded={!!expandedItems[index]}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

