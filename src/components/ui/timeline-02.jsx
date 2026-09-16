import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const defaultTimelineData = [
  {
    id: "01",
    date: "Aug 2026 – Present",
    company: "Saff co",
    type: "Internship • Remote",
    role: "Senior UI/UX Designer",
    image: "/flexstep-cover.png",
    summary:
      "As Lead UI/UX Designer, worked on a responsive web-based digital product focusing on clean, intuitive, and user-friendly interaction design.",
    highlights: [
      "Led the design process across user flows, Information Architecture, wireframes, responsive layouts, and high-fidelity UI designs in Figma.",
      "Focused on understanding user needs, simplifying complex journeys, and creating clear navigation patterns for seamless user experience.",
      "Maintained design direction and consistency across typography, spacing, components, and visual elements with a strong focus on accessibility (WCAG) and responsive behavior."
    ],
    ctas: [
      { label: "Explore Case Studies", link: "/work", primary: true },
      { label: "Discuss UI/UX Project", link: "/contact", primary: false }
    ]
  },
  {
    id: "02",
    date: "Jul 2026 – Sep 10 2026",
    company: "Torkk (BLACKORIGINX)",
    type: "Internship • Remote",
    role: "Design Intern",
    image: "/beheal-cover.jpg",
    summary:
      "Led UI/UX design direction at Torkk (BlackOriginX Private Limited), taking ownership of design process across digital product initiatives.",
    highlights: [
      "Worked on understanding product requirements, defining user flows, developing wireframes, and translating concepts into high-fidelity responsive interfaces using Figma.",
      "Created intuitive experiences while maintaining consistency across screens, components, and interactive micro-animations.",
      "Collaborated closely with product, development, and cross-functional teams to contribute to design systems, prototyping, and UX optimizations."
    ],
    ctas: [
      { label: "View Design Systems", link: "/work", primary: true },
      { label: "Book Consultation", link: "/contact", primary: false }
    ]
  },
  {
    id: "03",
    date: "Sep 2025 – Feb 2026",
    company: "ABIS Foods and Proteins (IB Group)",
    type: "Internship • Hybrid",
    role: "Design Intern",
    image: "/ecogrid-cover.png",
    summary:
      "6-month UI/UX Design Internship designing 5 end-to-end e-commerce websites including flagship platforms Seed to Soul and Lynk Sweets.",
    highlights: [
      "Successfully designed 5 end-to-end e-commerce websites, managing full lifecycle from user research to developer handoff.",
      "Contributed to flagship platforms such as Seed to Soul and Lynk Sweets while establishing consistent design systems.",
      "Supported graphic design initiatives by creating high-impact visual assets and ensuring total brand consistency."
    ],
    ctas: [
      { label: "View E-Commerce Work", link: "/work", primary: true },
      { label: "Get In Touch", link: "/contact", primary: false }
    ]
  },
  {
    id: "04",
    date: "Nov 2025 – Dec 2025",
    company: "Prorion",
    type: "Freelance • Remote",
    role: "UI/UX & Brand Designer",
    image: "/safetypulse-cover.png",
    summary:
      "Collaborated directly with the founder to translate Prorion's product vision into a clear visual and digital experience.",
    highlights: [
      "Developed the \"Connect – Collaborate – Create\" brand concept and logo direction.",
      "Contributed to website UI, visual hierarchy, user experience design, and design iterations.",
      "Refined designs through iterative founder feedback to build a cohesive, engaging brand touchpoint."
    ],
    ctas: [
      { label: "View Brand Identity", link: "/work", primary: true },
      { label: "Collaborate On Brand", link: "/contact", primary: false }
    ]
  },
  {
    id: "05",
    date: "Oct 2025 – Nov 2025",
    company: "Checklist Mobile App",
    type: "Freelance • Remote",
    role: "UI/UX Designer",
    image: "/mindspace-cover.png",
    summary:
      "Designed a checklist-based mobile experience focused on intuitive onboarding, smooth task management, and minimal UI interface.",
    highlights: [
      "Designed frictionless mobile task onboarding and task management flows.",
      "Created complete visual identity including logo mark, typography system, and color palette.",
      "Delivered high-fidelity mobile prototypes optimized for mobile touch interactions."
    ],
    ctas: [
      { label: "View Mobile Prototypes", link: "/work", primary: true },
      { label: "Discuss Mobile UI/UX", link: "/contact", primary: false }
    ]
  }
];

export default function Timeline_02({ data = defaultTimelineData }) {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const itemRefs = useRef([]);
  const stepBtnRefs = useRef([]);
  const [dotTop, setDotTop] = useState(16);

  // Viewport scroll tracking to highlight exact active card in view
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportCenter);
          if (rect.top <= viewportCenter + 200 && rect.bottom >= 150) {
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          }
        }
      });

      setActiveStep(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  // Recalculate dynamic dot position to align center with active left step button
  useEffect(() => {
    if (stepBtnRefs.current[activeStep]) {
      const btn = stepBtnRefs.current[activeStep];
      setDotTop(btn.offsetTop + btn.offsetHeight / 2 - 4);
    }
  }, [activeStep]);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToStep = (index) => {
    setActiveStep(index);
    setExpandedItems((prev) => ({
      ...prev,
      [index]: true
    }));
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
        
        {/* LEFT COLUMN: Minimal Editorial Sticky Timeline */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8 z-20">
          
          {/* Label & Title */}
          <div className="space-y-3">
            {/* "MY JOURNEY" label — keep orange dot, grey text */}
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
              <span>MY JOURNEY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-sans">
              WORK EXPERIENCE
            </h2>
          </div>

          {/* Minimal Timeline Steps */}
          <div className="relative pl-6 py-2 border-l border-white/10 space-y-6">
            
            {/* Active Accent Dot — orange only here */}
            <motion.div
              className="absolute left-[-4px] w-2 h-2 rounded-full bg-[#EA5211] shadow-[0_0_10px_rgba(234,82,17,0.6)]"
              animate={{
                top: `${dotTop}px`
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {data.map((item, idx) => {
              const isActive = activeStep === idx;

              return (
                <button
                  key={item.id}
                  ref={(el) => (stepBtnRefs.current[idx] = el)}
                  onClick={() => scrollToStep(idx)}
                  className={`w-full text-left flex items-center justify-between gap-3 transition-all duration-300 group cursor-pointer ${
                    isActive ? "opacity-100 font-semibold" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {/* ID number — grey, white when active */}
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isActive ? "text-white font-bold" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {item.id}
                    </span>
                    <span
                      className={`text-sm sm:text-base tracking-tight font-sans transition-colors duration-300 truncate ${
                        isActive ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                      }`}
                    >
                      {item.company}
                    </span>
                  </div>

                  {/* ACTIVE badge — subtle grey instead of bright orange */}
                  {item.id === "01" && (
                    <span className="text-[10px] font-mono text-neutral-300 tracking-widest uppercase border border-white/20 px-1.5 py-0.5 rounded bg-white/5 shrink-0">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Work Showcase Cards */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16">
          {data.map((item, index) => {
            const isActive = activeStep === index;
            const isExpanded = !!expandedItems[index];

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="scroll-mt-32"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-6 sm:p-10 rounded-2xl border transition-all duration-500 space-y-6 group ${
                    isActive
                      ? "bg-[#0f0f10] border-white/15 border-l-2 border-l-[#EA5211]"
                      : "bg-[#09090c]/80 border-white/[0.07] opacity-85 hover:opacity-100 hover:border-white/12"
                  }`}
                >
                  {/* Header: Number, Date, Company & Role */}
                  <div className="border-b border-white/[0.08] pb-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {/* ID number — grey */}
                        <span className="text-neutral-500 font-bold">{item.id}</span>
                        <span className="text-white/20">•</span>
                        {/* Date — light grey */}
                        <span className="text-neutral-400 tracking-wider uppercase font-medium">{item.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Type badge — neutral grey */}
                        <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 text-[11px] tracking-wider uppercase font-medium">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Company name — white */}
                    <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white font-sans pt-2">
                      {item.company}
                    </h3>
                    {/* Role — light grey instead of orange */}
                    <p className="text-base sm:text-lg font-medium text-neutral-400 tracking-tight font-sans">
                      {item.role || item.title}
                    </p>
                  </div>

                  {/* Work Cover Image Preview */}
                  {item.image && (
                    <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#121214] max-h-56 sm:max-h-72">
                      <img
                        src={item.image}
                        alt={item.company}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-40" />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {item.summary || item.description}
                  </p>

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
                            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, delay: 0.05 }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15 }
                          }
                        }}
                        className="overflow-hidden pt-2 border-t border-white/[0.08]"
                      >
                        <div className="space-y-3 py-2">
                          {/* Section label — grey */}
                          <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                            Key Responsibilities & Impact:
                          </h5>
                          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                            {item.highlights.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                {/* Bullet — grey dash instead of orange */}
                                <span className="text-neutral-600 font-mono mt-0.5">–</span>
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    {/* View Details Toggle */}
                    {item.highlights && item.highlights.length > 0 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-mono tracking-widest uppercase text-neutral-500 hover:text-white transition-colors duration-300 cursor-pointer py-1 group"
                        aria-expanded={isExpanded}
                      >
                        <span className="relative">
                          {isExpanded ? "View Less" : "View Details"}
                          <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                      </button>
                    )}

                    {/* CTAs */}
                    {item.ctas && item.ctas.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {item.ctas.map((cta, cIdx) => (
                          <Link
                            key={cIdx}
                            to={cta.link}
                            className={`text-xs font-mono tracking-wider transition-all duration-300 inline-flex items-center gap-1.5 py-2 px-4 rounded-full ${
                              cta.primary
                                ? "bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                                : "bg-transparent border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                            }`}
                          >
                            <span>{cta.label}</span>
                            <span className="text-[11px] font-sans">↗</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
