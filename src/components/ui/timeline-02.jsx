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
    date: "Jul 2026 – Present",
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
    type: "Internship • Remote",
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
      "Collaborated directly with the founder to translate Prorion’s product vision into a clear visual and digital experience.",
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

  // Scroll tracking to highlight current active step
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

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
            <div className="flex items-center gap-2 font-mono text-xs text-[#EA5211] uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
              <span>MY JOURNEY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-sans">
              WORK EXPERIENCE
            </h2>
          </div>

          {/* Minimal Timeline Steps */}
          <div className="relative pl-6 py-2 border-l border-white/10 space-y-6">
            
            {/* Active Orange Accent Bar/Dot */}
            <motion.div
              className="absolute left-[-4px] w-2 h-2 rounded-full bg-[#EA5211] shadow-[0_0_10px_rgba(234,82,17,0.8)]"
              animate={{
                top: `${activeStep * 54 + 14}px`
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {data.map((item, idx) => {
              const isActive = activeStep === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToStep(idx)}
                  className={`w-full text-left flex items-center justify-between gap-3 transition-all duration-300 group cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isActive ? "text-[#EA5211] font-bold" : "text-neutral-500 group-hover:text-white"
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
                  </div>

                  {isActive && (
                    <span className="text-[10px] font-mono text-[#EA5211] tracking-widest uppercase border border-[#EA5211]/30 px-1.5 py-0.5 rounded bg-[#EA5211]/10 shrink-0">
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
                      ? "bg-[#09090b]/90 border-[#EA5211]/30 shadow-[0_20px_50px_rgba(234,82,17,0.1)] border-l-4 border-l-[#EA5211]"
                      : "bg-[#070709]/50 border-white/5 opacity-70 hover:opacity-90"
                  }`}
                >
                  {/* Header: Number, Date, Company & Role */}
                  <div className="border-b border-white/10 pb-6 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#EA5211] font-bold">{item.id}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-neutral-400 tracking-wider uppercase">{item.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EA5211]/10 border border-[#EA5211]/30 text-[10px] font-mono text-[#EA5211]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211] animate-pulse" />
                            ACTIVE ROLE
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[11px] tracking-wider uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white font-sans pt-2">
                      {item.company}
                    </h3>
                    <p className="text-base sm:text-lg font-normal text-[#EA5211] tracking-tight font-sans">
                      {item.role || item.title}
                    </p>
                  </div>

                  {/* Work Cover Image Preview */}
                  {item.image && (
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#121214] max-h-56 sm:max-h-72">
                      <img
                        src={item.image}
                        alt={item.company}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
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
                        className="overflow-hidden pt-2 border-t border-white/10"
                      >
                        <div className="space-y-3 py-2">
                          <h5 className="text-xs font-mono uppercase tracking-widest text-[#EA5211] font-medium">
                            Key Responsibilities & Impact:
                          </h5>
                          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                            {item.highlights.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3">
                                <span className="text-[#EA5211] font-mono mt-0.5">•</span>
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Bar: View Details + Relevant Experience CTAs */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    {/* View Details Toggle Link */}
                    {item.highlights && item.highlights.length > 0 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-[#EA5211] transition-colors duration-300 cursor-pointer py-1 group"
                        aria-expanded={isExpanded}
                      >
                        <span className="relative">
                          {isExpanded ? "View Less" : "View Details"}
                          <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#EA5211] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                      </button>
                    )}

                    {/* Contextual CTAs tailored to each experience */}
                    {item.ctas && item.ctas.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {item.ctas.map((cta, cIdx) => (
                          <Link
                            key={cIdx}
                            to={cta.link}
                            className={`text-xs font-mono tracking-wider transition-all duration-300 inline-flex items-center gap-1.5 py-2 px-4 rounded-full ${
                              cta.primary
                                ? "bg-[#EA5211] text-white hover:bg-[#EA5211]/85 shadow-[0_4px_14px_rgba(234,82,17,0.35)]"
                                : "bg-white/5 border border-white/15 text-neutral-300 hover:text-white hover:border-white/30"
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
