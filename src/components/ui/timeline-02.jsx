import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";

export const defaultTimelineData = [
  {
    id: "01",
    date: "Aug 2026 – Present",
    title: "Senior UI/UX Designer",
    company: "Saff co",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Lead UI/UX Designer responsible for end-to-end responsive web products, user flows, Information Architecture, and high-fidelity Figma design systems.",
    highlights: [
      "Led full product design lifecycle across user journeys, wireframes, and responsive layouts.",
      "Established centralized Figma design token library ensuring typography & spacing consistency.",
      "Iterated interfaces through user research, usability testing, and accessibility guidelines (WCAG)."
    ],
    skills: ["UI/UX Design", "Figma", "Information Architecture", "User Flows", "Design Systems", "Accessibility"],
  },
  {
    id: "02",
    date: "Jul 2026 – Present",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    location: "Remote",
    summary: "Spearheaded UI/UX design direction for web and mobile digital product initiatives, transforming complex requirements into refined interactive interfaces.",
    highlights: [
      "Designed high-impact wireframes and high-fidelity interactive prototypes in Figma.",
      "Collaborated directly with engineering and product leaders for seamless developer handoff.",
      "Enhanced overall UX friction points, boosting user engagement and visual clarity."
    ],
    skills: ["Web Design", "Figma", "Wireframing", "Prototyping", "UX Optimization", "Developer Handoff"],
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    title: "Design Intern",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid",
    location: "Remote / Hybrid",
    summary: "6-month UI/UX Internship designing 5 end-to-end e-commerce websites including flagship platforms Seed to Soul and Lynk Sweets.",
    highlights: [
      "Crafted 5 end-to-end e-commerce web platforms from user research to production handoff.",
      "Designed flagship digital storefronts 'Seed to Soul' and 'Lynk Sweets'.",
      "Created promotional digital assets and enforced brand visual consistency across touchpoints."
    ],
    skills: ["E-Commerce Design", "User Research", "Web Design", "Lynk Sweets", "Graphic Design"],
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Partnered directly with the founder to define the 'Connect – Collaborate – Create' brand identity, website UI, and visual hierarchy.",
    highlights: [
      "Conceptualized full visual identity including logo system, color schemes, and brand voice.",
      "Designed responsive marketing website UI with clean hierarchy and engaging micro-interactions.",
      "Incorporated founder feedback loops to polish user touchpoints and value proposition."
    ],
    skills: ["Branding", "Logo Design", "Visual Hierarchy", "Website UI", "Client Collaboration"],
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    title: "UI/UX Designer",
    company: "Freelance Checklist App",
    type: "Freelance • Remote",
    location: "Remote",
    summary: "Designed a checklist-based mobile experience focused on intuitive onboarding, smooth task management, and minimal UI aesthetic.",
    highlights: [
      "Created frictionless mobile task onboarding flows with clear state indicators.",
      "Built complete visual identity kit including logo, typography matrix, and palette.",
      "Delivered interactive prototype with smooth transition physics."
    ],
    skills: ["Mobile UI/UX", "Visual Identity", "Typography", "Task Management UI"],
  },
];

export default function Timeline_02({ data = defaultTimelineData, title = "Work Experience" }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="bg-[#050505] text-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Career Journey</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-sans">
              {title}
            </h2>
          </div>
        )}

        <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {/* Subtle gradient line overlay */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-cyan-500 via-white/20 to-transparent pointer-events-none" />

          {data.map((entry, index) => {
            const isExpanded = expandedItems[index];

            return (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-cyan-400 ring-4 ring-[#050505] shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                </div>

                <Card className="border border-white/10 bg-neutral-900/50 backdrop-blur-md shadow-md transition-all duration-300 hover:border-white/25 hover:bg-neutral-900/80">
                  <CardContent className="p-6 sm:p-7">
                    {/* Header: Company & Role */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span className="font-semibold">{entry.company}</span>
                          {entry.type && (
                            <span className="text-neutral-500">• {entry.type}</span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                          {entry.title}
                        </h3>
                      </div>

                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start sm:self-center shrink-0">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{entry.date}</span>
                      </div>
                    </div>

                    {/* Summary text */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                      {entry.summary || entry.content}
                    </p>

                    {/* Expandable Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-white/10 pt-4 mt-2 space-y-4"
                        >
                          {entry.highlights && entry.highlights.length > 0 && (
                            <div>
                              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Key Achievements & Responsibilities
                              </h4>
                              <ul className="space-y-2 text-sm text-neutral-300">
                                {entry.highlights.map((item, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Skills pills */}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
                        {entry.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 text-xs rounded-full bg-white/5 text-neutral-400 border border-white/5 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More / Read Less Button */}
                    <div className="mt-5 pt-2 flex justify-end">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors py-1 px-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-950/50 cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "READ LESS" : "READ MORE"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
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
