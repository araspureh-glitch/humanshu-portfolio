import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export const PORTFOLIO_PROJECT_LINKS = [
  {
    heading: "Flex Step",
    subheading: "UI/UX · Next-Gen Footwear E-Commerce",
    imgSrc: "/flexstep-cover.png",
    href: "/project/flex-step",
  },
  {
    heading: "EcoGrid",
    subheading: "UI/UX · Smart City Energy Dashboard",
    imgSrc: "/ecogrid-cover.png",
    href: "/project/ecogrid",
  },
  {
    heading: "BeHeal",
    subheading: "Mobile App · Health & Wellness Tracking",
    imgSrc: "/beheal-cover.jpg",
    href: "/project/beheal",
  },
  {
    heading: "Lynk Sweets",
    subheading: "Mobile App · Artisanal Pastry Marketplace",
    imgSrc: "/skater-portrait.png",
    href: "/project/lynk-sweets",
  },
  {
    heading: "Seed to Soul",
    subheading: "Mobile App · Plant Care & Mindful Habits",
    imgSrc: "/hero.jpg",
    href: "/project/seed-to-soul",
  },
  {
    heading: "Hgraphix",
    subheading: "Brand Identity · Minimalist Studio Guidelines",
    imgSrc: "/og-image.jpg",
    href: "/project/hgraphix",
  },
];

export function InteractiveHoverLinks({ links = PORTFOLIO_PROJECT_LINKS.slice(0, 3), onProjectSelect }) {
  return (
    <section className="bg-[#050505] text-[#F5F5F5] py-12 md:py-20 px-4 md:px-8 w-full border-t border-b border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-4 gap-4">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse"></span>
              <span>SELECTED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2 font-sans">
              Interactive Case Studies
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Hover to preview work
          </span>
        </div>

        {links.map((link) => (
          <ProjectLink key={link.heading} {...link} onProjectSelect={onProjectSelect} />
        ))}

        {/* View More Button */}
        <div className="mt-12 flex justify-center">
          <RouterLink to="/work">
            <LiquidMetalButton label="VIEW MORE PROJECTS →" />
          </RouterLink>
        </div>
      </div>
    </section>
  );
}

function ProjectLink({ heading, imgSrc, subheading, href, onProjectSelect }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleClick = (e) => {
    if (onProjectSelect) {
      const slug = href.replace('/project/', '');
      onProjectSelect(slug);
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="relative"
    >
      <RouterLink
        to={href}
        ref={ref}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="group relative flex items-center justify-between border-b border-white/10 py-6 md:py-10 transition-colors duration-500 hover:border-white/40"
      >
        <div className="relative z-10">
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10 block text-4xl font-medium text-neutral-400 transition-colors duration-500 group-hover:text-white md:text-6xl"
          >
            {heading.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
                key={i}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </motion.span>
          <span className="relative z-10 mt-2 block font-sans text-xs sm:text-sm text-neutral-400 font-light tracking-wide transition-colors duration-500 group-hover:text-neutral-200">
            {subheading}
          </span>
        </div>

        <motion.img
          style={{
            top,
            left,
            translateX: "-10%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
            whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
          }}
          transition={{ type: "spring" }}
          src={imgSrc}
          className="absolute z-30 h-24 w-32 rounded-lg object-cover shadow-2xl pointer-events-none md:h-48 md:w-64 border border-white/20"
          alt={`Image representing ${heading}`}
        />

        <div className="overflow-hidden relative z-10">
          <motion.div
            variants={{
              initial: {
                x: "100%",
                opacity: 0,
              },
              whileHover: {
                x: "0%",
                opacity: 1,
              },
            }}
            transition={{ type: "spring" }}
            className="p-3"
          >
            <ArrowRight className="size-6 text-white md:size-10" />
          </motion.div>
        </div>
      </RouterLink>
    </motion.div>
  );
}
