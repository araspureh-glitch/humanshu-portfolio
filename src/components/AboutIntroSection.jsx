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
      {/* Minimal 1px half-stroke underline accent */}
      <span className="absolute bottom-1 left-1 right-1 h-[1px] bg-white/40 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-cyan-400 group-hover:h-[1.5px] transition-all duration-300" />
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

function DisciplineCard({ item, index }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative group p-8 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-between space-y-6"
    >
      {/* Subtle Cursor Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.05), transparent 80%)`
        }}
      />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
          <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
            {item.num}
          </span>
          <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-neutral-400 uppercase tracking-widest">
            {item.badge}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-light text-white font-sans tracking-tight">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed font-light">
          {item.desc}
        </p>
      </div>

      {/* Clean Feature Bullets inside card */}
      <ul className="space-y-2 pt-4 border-t border-white/10 font-sans text-xs text-neutral-400 relative z-10">
        {item.details.map((detail, idx) => (
          <li key={idx} className="flex items-center gap-2.5 text-neutral-400">
            <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
            <span className="font-light">{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function AboutIntroSection() {
  const disciplines = [
    {
      num: '01',
      badge: 'Research & Flows',
      title: 'Human-Centered Research',
      desc: 'Decoding user behaviors, mapping intuitive user journeys, and removing cognitive friction before placing pixels.',
      details: [
        'Empathy mapping & user persona synthesis',
        'Wireframing & information architecture',
        'Usability testing & feedback iteration'
      ]
    },
    {
      num: '02',
      badge: 'Systems & Tokens',
      title: 'Design Systems Architecture',
      desc: 'Structuring scalable Figma token systems, modular UI component libraries, and developer-ready handoff specs.',
      details: [
        'Atomic design component architecture',
        'Typography, color, & layout token structures',
        'Cross-platform responsiveness & accessibility'
      ]
    },
    {
      num: '03',
      badge: 'Motion & Craft',
      title: 'Interactive Prototyping',
      desc: 'Infusing digital interfaces with purposeful micro-interactions, responsive physics, and fluid motion design.',
      details: [
        'Framer Motion & interactive JS animations',
        'High-fidelity interactive Figma prototypes',
        'Polished micro-interactions & feedback states'
      ]
    }
  ]

  const stats = [
    { label: 'ROLE', value: 'UI/UX Architect' },
    { label: 'LOCATION', value: 'India (Remote / Hybrid)' },
    { label: 'CREDENTIALS', value: 'Google UX Certified' },
    { label: 'STATUS', value: 'Available 2026' }
  ]

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">

        {/* Editorial Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 gap-4"
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
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            <span>PERSPECTIVE & PROFILE</span>
            <span>•</span>
            <span className="text-emerald-400">Hover underlined text to preview</span>
          </div>
          <InteractiveBio />
        </div>

        {/* Minimal Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/10 font-mono text-xs">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">{stat.label}</span>
              <span className="text-sm font-light text-white tracking-wide block">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Minimal Disciplines Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <span>CORE DISCIPLINES</span>
            <span className="text-neutral-500 text-[10px]">Pillars of Craft</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((item, index) => (
              <DisciplineCard
                key={item.num}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
