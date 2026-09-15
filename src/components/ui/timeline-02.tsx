"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
    skills: ["UI/UX Design", "Figma", "Information Architecture", "User Flows", "Responsive Design"],
  },
  {
    id: "02",
    date: "Jul 2026 – Present",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    summary: "Spearheaded UI/UX design direction, wireframes, interactive prototypes, and design system tokens.",
    skills: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    title: "Design Intern",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid",
    summary: "Designed 5 end-to-end e-commerce platforms including flagship storefronts Seed to Soul and Lynk Sweets.",
    skills: ["UI/UX Design", "Web Design", "E-Commerce Design", "User Research", "Graphic Design"],
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    summary: "Defined the 'Connect – Collaborate – Create' brand concept, vector logo direction, and website UI.",
    skills: ["UI/UX Design", "Branding", "Logo Design", "Visual Hierarchy"],
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    title: "UI/UX Designer",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    summary: "Designed a minimalist checklist mobile experience focused on intuitive onboarding and task management.",
    skills: ["Mobile UI/UX", "Visual Identity", "Typography", "Prototyping"],
  },
];

interface TimelineProps {
  data?: TimelineItem[];
  title?: string;
}

export default function Timeline_02({ data = defaultTimelineData, title = "Work Experience" }: TimelineProps) {
  return (
    <section className="bg-[#050505] text-[#F5F5F5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="mb-8 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-medium tracking-[0.2em] text-neutral-400 uppercase">
                04 — WORK EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-1 font-sans">
                {title}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              CAREER TIMELINE
            </span>
          </div>
        )}

        {/* Timeline Axis Container */}
        <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-5 sm:pl-8 space-y-5 sm:space-y-6">
          {/* Subtle line overlay */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" />

          {data.map((entry, index) => {
            const displaySkills = entry.skills ? entry.skills.slice(0, 5) : [];

            return (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[27px] sm:-left-[39px] top-5 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full border border-white/50 bg-[#050505] transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:border-white" />
                </div>

                {/* Minimal Card */}
                <Card className="border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-[#0d0d0d]">
                  <CardContent className="p-4 sm:p-5 space-y-2.5">
                    
                    {/* Top Row: Company & Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-neutral-400 tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        <span className="text-white font-medium">{entry.company}</span>
                        {entry.type && <span className="text-neutral-500">• {entry.type}</span>}
                      </div>

                      {/* Date Badge */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 self-start sm:self-auto shrink-0 tracking-wider">
                        {entry.date}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-lg sm:text-xl font-light text-white tracking-tight font-sans">
                      {entry.title}
                    </h3>

                    {/* Short Summary */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                      {entry.summary || entry.description || entry.content}
                    </p>

                    {/* Max 5 Stack Pills */}
                    {displaySkills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/5">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mr-1">
                          STACK:
                        </span>
                        {displaySkills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.03] text-neutral-300 border border-white/10 font-mono hover:border-white/25 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

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
