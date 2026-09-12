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
      className="border-b border-white/10 group transition-colors duration-300 py-6 sm:py-8 cursor-pointer"
      onMouseEnter={onHover}
      onClick={onToggle}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 md:gap-8">
        {/* Left Column: Number & Sub-label (Exact layout matching reference screenshot) */}
        <div className="md:col-span-3 sm:col-span-4 space-y-0.5 pt-0.5">
          <span className="block font-sans text-xs font-light text-neutral-400 tracking-tight">
            {item.num}
          </span>
          <span className="block font-sans text-xs font-normal text-neutral-300 group-hover:text-white transition-colors">
            {item.sublabel}
          </span>
        </div>

        {/* Right Column: Clean Statement Headline & Accordion Detail */}
        <div className="md:col-span-9 sm:col-span-8 space-y-2">
          <h3 
            className={`text-xl sm:text-2xl lg:text-3xl font-sans tracking-tight leading-snug transition-all duration-300 ${
              isOpen 
                ? 'text-white font-normal' 
                : 'text-neutral-400/80 font-light group-hover:text-white'
            }`}
          >
            {item.title}
          </h3>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden pt-1"
              >
                <p className="text-xs sm:text-sm font-sans text-neutral-400 font-light leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutIntroSection() {
  const [openRow, setOpenRow] = useState(0)

  const disciplines = [
    {
      num: '0.1',
      sublabel: 'Our Mission',
      title: 'Smarter, human-centered research tools',
      desc: 'Decoding user behaviors, mapping intuitive user journeys, and removing cognitive friction before placing a single pixel on screen.'
    },
    {
      num: '0.2',
      sublabel: 'Our Vision',
      title: 'Lead the future of Scalable Design Systems',
      desc: 'Structuring scalable Figma token systems, modular UI component libraries, and developer-ready handoff specs.'
    },
    {
      num: '0.3',
      sublabel: 'Our Ambition',
      title: 'Simplify fluid motion & micro-interactions',
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

        {/* Sleek Minimalist Core Disciplines Layout (Inspired by reference screenshot) */}
        <div className="space-y-4 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-sans font-medium text-white tracking-tight">
                At Humanshu Studio
              </p>
              <p className="text-sm sm:text-base font-sans font-medium text-[#38bdf8] tracking-tight">
                We make digital experiences better
              </p>
            </div>
            <span className="font-sans text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium">
              CORE DISCIPLINES
            </span>
          </div>

          <div>
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
