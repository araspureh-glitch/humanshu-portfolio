import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const defaultTimelineData = [
  {
    id: "01",
    date: "2026 — PRESENT",
    title: "Senior UI/UX Designer",
    company: "Saff co",
    type: "Internship • Remote",
    summary: "Led the core UI/UX product design direction for web applications, user flows, Information Architecture, and Figma design systems.",
    highlights: [
      "Architected end-to-end user journeys, wireframes, and responsive layouts in Figma.",
      "Established centralized design tokens for consistent typography, spacing, and UI components.",
      "Iterated interfaces through user research, usability testing, and WCAG accessibility guidelines."
    ]
  },
  {
    id: "02",
    date: "2026 — PRESENT",
    title: "Design Intern",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    summary: "Spearheaded UI/UX design initiatives across web and mobile digital products, translating complex requirements into interactive interfaces.",
    highlights: [
      "Designed wireframes and interactive prototypes for core web and mobile touchpoints.",
      "Collaborated directly with product and development teams for seamless design handoffs.",
      "Contributed to design systems, component libraries, and interface UX improvements."
    ]
  },
  {
    id: "03",
    date: "2025 — 2026",
    title: "Design Intern",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship / Hybrid",
    summary: "Completed a 6-month UI/UX Internship designing 5 end-to-end e-commerce web platforms including flagship storefronts Seed to Soul and Lynk Sweets.",
    highlights: [
      "Managed full design lifecycle from user research and wireframing to production handoff.",
      "Established consistent design systems and improved user journeys for e-commerce storefronts.",
      "Created visual marketing assets and maintained overall brand consistency."
    ]
  },
  {
    id: "04",
    date: "2025 — 2025",
    title: "UI/UX & Brand Designer",
    company: "Prorion",
    type: "Freelance • Remote",
    summary: "Partnered directly with the founder to define the 'Connect – Collaborate – Create' brand identity, vector logo direction, and website UI.",
    highlights: [
      "Developed full brand identity concept, typography scale, and vector logo mark.",
      "Designed responsive marketing website UI with clear visual hierarchy."
    ]
  },
  {
    id: "05",
    date: "2025 — 2025",
    title: "UI/UX Designer",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    summary: "Designed a minimalist checklist mobile experience focused on intuitive onboarding, smooth task management, and mobile UX touch patterns.",
    highlights: [
      "Created frictionless mobile task onboarding and state feedback flows.",
      "Built complete visual identity system including logo, typography, and color palette."
    ]
  }
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
    <section className="bg-[#050505] text-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {title && (
          <div className="mb-12 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-medium tracking-[0.2em] text-neutral-400 uppercase">
                04 — CAREER HISTORY
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2 font-sans">
                {title}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-medium">
              EXPERIENCE TIMELINE
            </span>
          </div>
        )}

        {/* Diegovz Inspired Architectural Timeline Rows */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {data.map((entry, index) => {
            const isExpanded = expandedItems[index];

            return (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-3 sm:px-6 rounded-xl transition-all duration-300"
              >
                {/* Left Column: Period & Role Type Meta */}
                <div className="md:col-span-4 space-y-1 font-mono">
                  <div className="text-xs text-neutral-300 font-semibold tracking-widest uppercase">
                    {entry.date}
                  </div>
                  <div className="text-xs text-neutral-400 font-normal tracking-wide">
                    {entry.company}
                  </div>
                  {entry.type && (
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                      {entry.type}
                    </div>
                  )}
                </div>

                {/* Right Column: Title, Narrative & Impact */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-light text-white font-sans tracking-tight group-hover:text-white transition-colors">
                      {entry.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {entry.summary || entry.description || entry.content}
                  </p>

                  {/* Expandable Highlights */}
                  <AnimatePresence>
                    {isExpanded && entry.highlights && entry.highlights.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden pt-2 space-y-2 border-t border-white/10"
                      >
                        <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-light">
                          {entry.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span className="text-neutral-400 font-mono">—</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* View More / View Less Link */}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group/link py-1"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "View Less" : "View More"}</span>
                        <span className="group-hover/link:translate-x-0.5 transition-transform text-neutral-300">
                          {isExpanded ? "↑" : "→"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
