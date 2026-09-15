"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, CheckCircle2, Layers } from "lucide-react";

export type TimelineItem = {
  id?: string;
  date: string;
  title: string;
  company?: string;
  type?: string;
  location?: string;
  summary?: string;
  content?: string;
  highlights?: string[];
  artifacts?: string[];
  skills?: string[];
};

export const defaultTimelineData: TimelineItem[] = [
  {
    id: "01",
    date: "AUG 2026 – PRESENT",
    title: "Senior UI/UX Designer",
    company: "Saff co",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Leading the core product design direction for responsive web platforms, mapping complex user flows, and crafting scalable Figma design systems.",
    highlights: [
      "Architected end-to-end user journeys, wireframes, and high-fidelity responsive layouts in Figma.",
      "Established a centralized design system with strict spacing tokens, typography scales, and reusable UI components.",
      "Conducted iterative usability tests and accessibility audits (WCAG 2.1 AA) to simplify complex workflows."
    ],
    artifacts: ["Figma Token System", "Responsive Layout Maps", "Usability Audit", "Interactive Prototypes"],
    skills: ["Teamwork", "Team Leadership", "UI/UX Design", "Figma", "Information Architecture", "User Flows", "Responsive Design"],
  },
  {
    id: "02",
    date: "JUL 2026 – PRESENT",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Took full ownership of UI/UX design initiatives across web and mobile digital products, translating product requirements into elegant interactive interfaces.",
    highlights: [
      "Designed high-impact wireframes and high-fidelity interactive prototypes for key user touchpoints.",
      "Collaborated closely with engineering and product leaders for precise component spec handoffs.",
      "Refined design tokens and visual hierarchy, elevating interface clarity and reducing user friction."
    ],
    skills: ["Web Design", "Teamwork", "UI/UX Design", "Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: "03",
    date: "SEP 2025 – FEB 2026",
    title: "Design Intern",
    company: "ABIS Foods & Proteins (IB Group)",
    type: "Internship / Hybrid • Remote / Hybrid",
    location: "Remote / Hybrid",
    summary: "Completed an intensive 6-month UI/UX design internship, successfully launching 5 end-to-end e-commerce platforms including flagship storefronts Seed to Soul and Lynk Sweets.",
    highlights: [
      "Spearheaded end-to-end design for 5 e-commerce websites from user research to production developer handoff.",
      "Designed flagship digital storefronts 'Seed to Soul' and 'Lynk Sweets' with a focus on conversion and luxury aesthetics.",
      "Crafted promotional graphic assets, design systems, and brand visual guidelines across touchpoints."
    ],
    artifacts: ["Seed to Soul Web App", "Lynk Sweets Storefront", "E-Commerce Checkout UX", "Brand Stylebook"],
    skills: ["UI/UX", "Web Design", "E-Commerce Design", "User Research", "Graphic Design"],
  },
  {
    id: "04",
    date: "NOV 2025 – DEC 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Partnered directly with the founder to translate Prorion's product vision into a cohesive digital brand identity around the 'Connect – Collaborate – Create' philosophy.",
    highlights: [
      "Conceptualized full visual identity system including logo mark, typography pairs, and color spectrum.",
      "Designed responsive marketing website UI with clear visual hierarchy and subtle micro-interactions.",
      "Incorporated rapid founder feedback loops to refine landing page conversion and user engagement."
    ],
    artifacts: ["Connect-Collaborate-Create Identity", "Website UI Kit", "Vector Logo Mark"],
    skills: ["UI/UX Designer", "User Experience Design (UED)", "Branding", "Logo Design", "Visual Hierarchy"],
  },
  {
    id: "05",
    date: "OCT 2025 – NOV 2025",
    title: "UI/UX Designer",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Designed an intuitive checklist-based mobile application focused on frictionless user onboarding, minimal task management interfaces, and bespoke visual identity.",
    highlights: [
      "Crafted frictionless mobile onboarding user flows with immediate visual task state feedback.",
      "Designed complete mobile identity system including typography hierarchy, color palette, and app icons.",
      "Delivered interactive mobile prototypes with smooth touch gestures and micro-animations."
    ],
    artifacts: ["Mobile iOS UI Kit", "Task Onboarding Flow", "App Iconography System"],
    skills: ["User Interface Design", "UI & UX", "Mobile Design", "Visual Identity", "Typography"],
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
    <section className="bg-[#050505] text-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="mb-16 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-medium tracking-[0.2em] text-neutral-400 uppercase">
                04 — CAREER TIMELINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2 font-sans">
                {title}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              2025 — PRESENT
            </span>
          </div>
        )}

        {/* Timeline Axis Container */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {/* Subtle gradient line overlay */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

          {data.map((entry, index) => {
            const isExpanded = expandedItems[index];

            return (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-7 flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-full border border-white/60 bg-[#050505] transition-all duration-500 group-hover:scale-125 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>

                <Card className="border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-white/25 hover:bg-[#0d0d0d]">
                  <CardContent className="p-6 sm:p-8">
                    
                    {/* Top Row: Date & Role Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 tracking-wider mb-1 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors" />
                          <span className="text-white font-medium">@{entry.company}</span>
                          {entry.type && <span className="text-neutral-500">• {entry.type}</span>}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight font-sans">
                          {entry.title}
                        </h3>
                      </div>

                      {/* Period Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 self-start sm:self-center shrink-0 tracking-wider">
                        {entry.date}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light mb-5">
                      {entry.summary || entry.content}
                    </p>

                    {/* Expandable Case Study Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden border-t border-white/10 pt-5 mt-3 space-y-5"
                        >
                          {/* Highlights */}
                          {entry.highlights && entry.highlights.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-400 flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
                                <span>Core Impact & Responsibilities</span>
                              </h4>
                              <ul className="space-y-2.5 text-sm text-neutral-300 font-light">
                                {entry.highlights.map((item, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-3">
                                    <span className="text-neutral-500 font-mono text-xs mt-0.5">—</span>
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Artifacts / Deliverables */}
                          {entry.artifacts && entry.artifacts.length > 0 && (
                            <div className="space-y-2.5 pt-2 border-t border-white/5">
                              <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-400 flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5 text-white/80" />
                                <span>Key Deliverables</span>
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {entry.artifacts.map((art, aIdx) => (
                                  <span
                                    key={aIdx}
                                    className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.03] text-neutral-300 border border-white/10"
                                  >
                                    {art}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Skill Tags */}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mr-1">
                          STACK:
                        </span>
                        {entry.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-xs rounded-full bg-white/[0.03] text-neutral-300 border border-white/10 font-mono hover:border-white/30 hover:text-white transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More / Read Less Interactive Button */}
                    <div className="mt-5 pt-3 flex justify-end">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white hover:text-neutral-200 py-1.5 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer group/btn"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "READ LESS" : "READ MORE"}</span>
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5 text-white transition-transform duration-300" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-white transition-transform duration-300" />
                        )}
                      </button>
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
