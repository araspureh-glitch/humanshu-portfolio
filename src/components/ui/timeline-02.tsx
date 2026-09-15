"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

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
    summary: "Led responsive web app UI/UX design, user flows, Information Architecture, and Figma design systems.",
    highlights: [
      "Architected end-to-end user flows, wireframes, and responsive layouts in Figma.",
      "Established centralized design tokens for typography, spacing, and UI components.",
      "Iterated interfaces through user research, usability testing, and WCAG accessibility guidelines."
    ],
    skills: ["UI/UX Design", "Figma", "Information Architecture", "User Flows", "Responsive Design"],
  },
  {
    id: "02",
    date: "Jul 2026 – Present",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    summary: "Spearheaded UI/UX design direction, wireframes, interactive prototypes, and design system tokens.",
    highlights: [
      "Designed wireframes and interactive prototypes for core web and mobile touchpoints.",
      "Collaborated directly with product and development teams for seamless design handoffs.",
      "Contributed to design systems, component libraries, and interface UX improvements."
    ],
    skills: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    title: "Design Intern",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid",
    summary: "Designed 5 end-to-end e-commerce platforms including flagship storefronts Seed to Soul and Lynk Sweets.",
    highlights: [
      "Managed full design lifecycle from user research and wireframing to production handoff.",
      "Established consistent design systems and improved user journeys for e-commerce storefronts.",
      "Created visual marketing assets and maintained overall brand consistency."
    ],
    skills: ["UI/UX Design", "Web Design", "E-Commerce Design", "User Research", "Graphic Design"],
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    summary: "Defined the 'Connect – Collaborate – Create' brand concept, vector logo direction, and website UI.",
    highlights: [
      "Developed full brand identity concept, typography scale, and vector logo mark.",
      "Designed responsive marketing website UI with clear visual hierarchy."
    ],
    skills: ["UI/UX Design", "Branding", "Logo Design", "Visual Hierarchy"],
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    title: "UI/UX Designer",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    summary: "Designed a minimalist checklist mobile experience focused on intuitive onboarding and task management.",
    highlights: [
      "Created frictionless mobile task onboarding and state feedback flows.",
      "Built complete visual identity system including logo, typography, and color palette."
    ],
    skills: ["Mobile UI/UX", "Visual Identity", "Typography", "Prototyping"],
  },
];

interface TimelineProps {
  data?: TimelineItem[];
  title?: string;
}

export default function Timeline_02({ data = defaultTimelineData, title = "Work Experience" }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-[#050505] text-[#F5F5F5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="mb-8 pb-4 border-b border-white/15 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                04 — WORK EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-1 font-sans">
                {title}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-medium">
              CAREER TIMELINE
            </span>
          </div>
        )}

        {/* Timeline Axis Container */}
        <div className="relative border-l border-white/20 ml-2 sm:ml-4 pl-5 sm:pl-8 space-y-6 sm:space-y-7">
          {/* Line overlay */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white/40 via-white/15 to-transparent pointer-events-none" />

          {data.map((entry, index) => {
            const displaySkills = entry.skills ? entry.skills.slice(0, 5) : [];
            const isExpanded = expandedItems[index];

            return (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="relative group"
              >
                {/* High visibility Timeline dot */}
                <div className="absolute -left-[27px] sm:-left-[39px] top-5 flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-full border border-white bg-white ring-4 ring-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:scale-125" />
                </div>

                {/* High Visibility Minimal Card */}
                <Card className="border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-[#0e0e0e] shadow-lg">
                  <CardContent className="p-4 sm:p-5 space-y-3">
                    
                    {/* Top Row: Company & Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center flex-wrap gap-2 text-xs font-mono tracking-wide uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-white font-semibold">{entry.company}</span>
                        {entry.type && <span className="text-neutral-400 font-medium">• {entry.type}</span>}
                      </div>

                      {/* Date Text (No background or stroke) */}
                      <span className="text-xs font-mono text-neutral-400 self-start sm:self-auto shrink-0 tracking-wider">
                        {entry.date}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg sm:text-2xl font-normal text-white tracking-tight font-sans">
                      {entry.title}
                    </h3>

                    {/* Short Summary */}
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                      {entry.summary || entry.description || entry.content}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && entry.highlights && entry.highlights.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden pt-2.5 space-y-2 border-t border-white/10"
                        >
                          <ul className="space-y-1.5 text-xs text-neutral-300 font-light">
                            {entry.highlights.map((item, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2.5">
                                <span className="text-emerald-400 font-mono font-semibold">—</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Stack Pills + High Visibility View More in Right Hand Side Bottom Corner */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-white/10">
                      {displaySkills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase tracking-widest mr-1">
                            STACK:
                          </span>
                          {displaySkills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-xs font-mono text-neutral-300 flex items-center gap-2"
                            >
                              <span>{skill}</span>
                              {sIdx < displaySkills.length - 1 && (
                                <span className="text-neutral-500 font-mono">•</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* High-Visibility View More Button in Right Hand Corner */}
                      {entry.highlights && entry.highlights.length > 0 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-xs font-mono font-medium transition-all flex items-center gap-1.5 ml-auto shrink-0 cursor-pointer shadow-sm group/btn"
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? "View Less" : "View More"}</span>
                          <span className="group-hover/btn:translate-x-0.5 transition-transform text-white">
                            {isExpanded ? "↑" : "→"}
                          </span>
                        </button>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
