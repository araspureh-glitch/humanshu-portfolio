import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

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

function DisciplineAccordionRow({ item, index, isOpen, onToggle, onHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border-b border-white/10 group transition-colors duration-500 ${isOpen ? 'bg-white/[0.015]' : 'hover:bg-white/[0.01]'}`}
      onMouseEnter={onHover}
    >
      <button
        onClick={onToggle}
        className="w-full py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 transition-all duration-300 px-2 sm:px-4 rounded-xl cursor-pointer"
      >
        <div className="flex items-center gap-6 sm:gap-10">
          <span className={`font-sans text-xs sm:text-sm font-medium tracking-widest transition-colors duration-300 ${isOpen ? item.iconColor : 'text-neutral-500'}`}>
            {item.num}
          </span>
          <div className="flex items-center gap-3.5">
            {isOpen && (
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`w-1 h-6 sm:h-8 rounded-full ${item.dotBg} shadow-[0_0_12px_rgba(255,255,255,0.4)]`}
              />
            )}
            <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-extralight font-sans tracking-tight transition-all duration-300 ${isOpen ? 'text-white translate-x-1' : 'text-white/85 group-hover:text-white group-hover:translate-x-2'}`}>
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Pure Text Label - Refined Geometric Sans */}
          <span className={`font-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${isOpen ? item.iconColor : 'text-neutral-400 group-hover:text-white'}`}>
            {item.badge}
          </span>
          <Plus className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? `rotate-45 ${item.iconColor}` : 'text-neutral-400 group-hover:text-white'}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pb-8 px-2 sm:pl-16 md:pl-20"
          >
            <div className="max-w-4xl space-y-2 pt-1">
              <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-[0.2em] block font-semibold">
                APPROACH & IMPACT
              </span>
              <p className="text-base sm:text-lg font-sans text-neutral-200 font-light leading-relaxed">
                {item.desc}
              </p>
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
      desc: 'Decoding user behaviors, mapping intuitive user journeys, and removing cognitive friction before placing pixels.'
    },
    {
      num: '02',
      badge: 'SYSTEMS & TOKENS',
      iconColor: 'text-[#EA5211]',
      dotBg: 'bg-[#EA5211]',
      badgeBorder: 'border-[#EA5211]/40',
      title: 'Design Systems Architecture',
      desc: 'Structuring scalable Figma token systems, modular UI component libraries, and developer-ready handoff specs.'
    },
    {
      num: '03',
      badge: 'MOTION & CRAFT',
      iconColor: 'text-purple-400',
      dotBg: 'bg-purple-400',
      badgeBorder: 'border-purple-500/40',
      title: 'Interactive Prototyping',
      desc: 'Infusing digital interfaces with purposeful micro-interactions, responsive physics, and fluid motion design.'
    }
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
            <div className="flex items-center gap-2 font-sans text-[11px] text-neutral-400 uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>01 / ABOUT ME</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight font-sans">
              Humanshu Araspure
            </h1>
          </div>
          <p className="font-sans text-xs text-neutral-400 uppercase tracking-[0.18em] font-medium max-w-xs sm:text-right">
            Crafting minimal, high-impact digital experiences
          </p>
        </motion.div>

        {/* Interactive Bio with Hover Image Preview Popups */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-sans text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-medium">
            <span>PERSPECTIVE & PROFILE</span>
            <span>•</span>
            <span className="text-emerald-400">Hover text to preview</span>
          </div>
          <InteractiveBio />
        </div>

        {/* Sleek Minimalist Interactive Rows / Accordion */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between font-sans text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium pb-2">
            <span>CORE DISCIPLINES</span>
            <span className="text-neutral-500 text-[10px]">Hover or click to inspect discipline</span>
          </div>

          <div className="border-t border-white/10">
            {disciplines.map((item, index) => (
              <DisciplineAccordionRow
                key={item.num}
                item={item}
                index={index}
                isOpen={openRow === index}
                onToggle={() => setOpenRow(openRow === index ? null : index)}
                onHover={() => setOpenRow(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
