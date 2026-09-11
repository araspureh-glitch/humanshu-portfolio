import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const previewData = {
  architect: {
    image: "/hero.jpg",
    title: "Humanshu Araspure",
    subtitle: "UI/UX Architect & Product Designer",
  },
  research: {
    image: "/beheal-cover.jpg",
    title: "User Research & Flows",
    subtitle: "Empathy & User Journey Mapping",
  },
  architecture: {
    image: "/flexstep-cover.png",
    title: "Design Systems & Tokens",
    subtitle: "Scalable Component Libraries in Figma",
  },
  systems: {
    image: "/ecogrid-cover.png",
    title: "Responsive Visual Craft",
    subtitle: "High-Fidelity Interfaces & Motion Design",
  },
}

function HoverLink({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}) {
  return (
    <span
      className="inline-block relative text-white cursor-pointer px-1 group"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      <span className="relative z-10 font-serif italic text-white group-hover:text-emerald-300 transition-colors duration-300">
        {children}
      </span>
      {/* Accent underline visible only on hover */}
      <span className="absolute bottom-0.5 left-1 right-1 h-[1.5px] bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </span>
  )
}

function PreviewCard({
  data,
  position,
  isVisible,
}) {
  if (!data) return null

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-all duration-200 ease-out ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
        }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="bg-[#121214]/95 border border-white/20 p-2.5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl w-72 space-y-2">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-40 object-cover rounded-xl border border-white/10"
        />
        <div className="px-1.5 pb-1">
          <h5 className="text-xs font-mono font-medium text-white tracking-wide">{data.title}</h5>
          <p className="text-[11px] font-mono text-neutral-400 mt-0.5">{data.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function InteractiveBio() {
  const [activePreview, setActivePreview] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Preload preview images
  useEffect(() => {
    Object.values(previewData).forEach((data) => {
      const img = new Image()
      img.src = data.image
    })
  }, [])

  const updatePosition = useCallback((e) => {
    const cardWidth = 290
    const cardHeight = 220
    const offsetY = 25

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }
    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key, e) => {
      setActivePreview(previewData[key])
      setIsVisible(true)
      updatePosition(e)
    },
    [updatePosition]
  )

  const handleHoverMove = useCallback(
    (e) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition]
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <div className="relative">
      <p className="text-2xl sm:text-4xl md:text-5xl font-extralight leading-[1.3] tracking-tight font-sans text-neutral-300 max-w-5xl">
        I am Humanshu Araspure, a{" "}
        <HoverLink
          previewKey="architect"
          onHoverStart={handleHoverStart}
          onHoverMove={handleHoverMove}
          onHoverEnd={handleHoverEnd}
        >
          UI/UX Architect
        </HoverLink>{" "}
        and Product Designer. I craft minimal, human-centered digital experiences by bridging{" "}
        <HoverLink
          previewKey="research"
          onHoverStart={handleHoverStart}
          onHoverMove={handleHoverMove}
          onHoverEnd={handleHoverEnd}
        >
          user research
        </HoverLink>
        , clean{" "}
        <HoverLink
          previewKey="architecture"
          onHoverStart={handleHoverStart}
          onHoverMove={handleHoverMove}
          onHoverEnd={handleHoverEnd}
        >
          information architecture
        </HoverLink>
        , and responsive{" "}
        <HoverLink
          previewKey="systems"
          onHoverStart={handleHoverStart}
          onHoverMove={handleHoverMove}
          onHoverEnd={handleHoverEnd}
        >
          visual systems
        </HoverLink>
        .
      </p>

      {/* Hover Floating Preview Card */}
      <PreviewCard data={activePreview} position={position} isVisible={isVisible} />
    </div>
  )
}

function DisciplineAccordionRow({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border-b border-white/10 group transition-colors duration-500 ${isOpen ? 'bg-white/[0.015]' : 'hover:bg-white/[0.01]'}`}
    >
      <button
        onClick={onToggle}
        className="w-full py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 transition-colors duration-300 px-2 sm:px-4 rounded-lg"
      >
        <div className="flex items-center gap-6 sm:gap-10">
          <span className={`font-mono text-xs sm:text-sm font-medium transition-colors duration-300 ${isOpen ? item.iconColor : 'text-neutral-500'}`}>
            {item.num}
          </span>
          <div className="flex items-center gap-3">
            {isOpen && (
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className={`w-1 h-6 sm:h-8 rounded-full ${item.dotBg}`}
              />
            )}
            <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-extralight font-sans tracking-tight transition-all duration-300 ${isOpen ? 'text-white translate-x-1' : 'text-white/90 group-hover:text-white group-hover:translate-x-2'}`}>
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <span className={`font-mono text-[11px] uppercase tracking-widest border px-3 py-1 rounded-full transition-all duration-300 ${isOpen ? `${item.badgeBorder} ${item.iconColor} bg-white/[0.03]` : 'border-white/15 text-neutral-400 group-hover:border-white/40 group-hover:text-white'}`}>
            {item.badge}
          </span>
          <span className={`text-2xl font-light transition-all duration-300 ${isOpen ? `rotate-45 ${item.iconColor}` : 'text-neutral-400 group-hover:text-white'}`}>
            +
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pb-10 px-2 sm:pl-16 md:pl-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                  APPROACH & IMPACT
                </span>
                <p className="text-sm sm:text-base font-sans text-neutral-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                  CAPABILITIES & DELIVERABLES
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {item.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.035] hover:bg-white/[0.08] hover:border-white/30 text-xs sm:text-sm font-sans font-normal text-neutral-200 backdrop-blur-md transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                      <span className={`text-xs ${item.iconColor}`}>✦</span>
                      <span>{tag}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function AboutIntroSection() {
  const [openRow, setOpenRow] = useState(0)

  const disciplines = [
    {
      num: '01',
      badge: 'RESEARCH & FLOWS',
      iconColor: 'text-emerald-400',
      dotBg: 'bg-emerald-400',
      badgeBorder: 'border-emerald-500/40',
      title: 'Human-Centered Research',
      desc: 'Decoding user behaviors, mapping intuitive user journeys, and removing cognitive friction before placing pixels.',
      tags: ['Empathy Mapping', 'Wireframing & IA', 'Usability Testing & Feedback']
    },
    {
      num: '02',
      badge: 'SYSTEMS & TOKENS',
      iconColor: 'text-cyan-400',
      dotBg: 'bg-cyan-400',
      badgeBorder: 'border-cyan-500/40',
      title: 'Design Systems Architecture',
      desc: 'Structuring scalable Figma token systems, modular UI component libraries, and developer-ready handoff specs.',
      tags: ['Atomic Component Architecture', 'Design Tokens & Variables', 'WCAG 2.1 Accessibility']
    },
    {
      num: '03',
      badge: 'MOTION & CRAFT',
      iconColor: 'text-purple-400',
      dotBg: 'bg-purple-400',
      badgeBorder: 'border-purple-500/40',
      title: 'Interactive Prototyping',
      desc: 'Infusing digital interfaces with purposeful micro-interactions, responsive physics, and fluid motion design.',
      tags: ['Framer Motion & JS Physics', 'High-Fi Interactive Prototypes', 'Polished Micro-Interactions']
    }
  ]

  const stats = [
    { label: 'ROLE', value: 'UI/UX Architect' },
    { label: 'LOCATION', value: 'India (Remote / Hybrid)' },
    { label: 'CREDENTIALS', value: 'Google UX Certified' },
    { label: 'STATUS', value: 'Available 2026' }
  ]

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* Editorial Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>01 / ABOUT ME</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight font-sans">
              Humanshu Araspure
            </h1>
          </div>
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest max-w-xs sm:text-right">
            Crafting minimal, high-impact digital experiences
          </p>
        </motion.div>

        {/* Interactive Bio with Hover Image Preview Popups */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            <span>PERSPECTIVE & PROFILE</span>
            <span>•</span>
            <span className="text-emerald-400">Hover text to preview</span>
          </div>
          <InteractiveBio />
        </div>

        {/* Sleek Minimal Floating Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.015] font-mono text-xs border border-white/5">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">{stat.label}</span>
              <span className="text-sm font-light text-white tracking-wide block">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Sleek Minimalist Interactive Rows / Accordion */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 uppercase tracking-widest pb-2">
            <span>CORE DISCIPLINES</span>
            <span className="text-neutral-500 text-[10px]">Click to inspect discipline</span>
          </div>

          <div className="border-t border-white/10">
            {disciplines.map((item, index) => (
              <DisciplineAccordionRow
                key={item.num}
                item={item}
                index={index}
                isOpen={openRow === index}
                onToggle={() => setOpenRow(openRow === index ? null : index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
