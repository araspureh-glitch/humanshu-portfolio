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

function InteractiveCard({ item, index, activeTab, setActiveTab }) {
  const isActive = activeTab === index
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
      onClick={() => setActiveTab(index)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className={`
        relative group p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between space-y-6
        ${isActive
          ? 'bg-white/[0.04] border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
          : 'bg-white/[0.012] border-white/10 hover:border-white/25 hover:bg-white/[0.025]'
        }
      `}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.06), transparent 80%)`
        }}
      />

      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
          <span className={`text-base font-medium transition-colors ${isActive ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-white'}`}>
            {item.num}
          </span>
          <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-neutral-400 uppercase tracking-widest">
            {item.badge}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-light text-white font-sans tracking-tight">
          {item.title}
        </h3>

        <p className="text-xs font-mono text-neutral-400 leading-relaxed font-light">
          {item.desc}
        </p>
      </div>

      {/* Active Indicator & Action Hint */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-neutral-500 relative z-10">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
          <span className={isActive ? 'text-white' : 'group-hover:text-neutral-300'}>
            {isActive ? 'Active Focus' : 'Click to inspect'}
          </span>
        </div>
        <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-white' : 'group-hover:translate-x-1'}`}>
          →
        </span>
      </div>
    </motion.div>
  )
}

export default function AboutIntroSection() {
  const [activeTab, setActiveTab] = useState(0)

  const disciplines = [
    {
      num: '01',
      badge: 'Research & Flows',
      title: 'Human-Centered Research',
      desc: 'Decoding user behaviors, mapping intuitive user journeys, and removing cognitive friction before placing pixels.',
      details: [
        'Empathy mapping & user persona synthesis',
        'Wireframing & information architecture',
        'Usability testing & quantitative feedback iteration'
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
        'Cross-platform responsiveness & accessibility (WCAG)'
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

        {/* Minimal Interactive Disciplines Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <span>CORE DISCIPLINES</span>
            <span className="text-neutral-500 text-[10px]">Select a focus to inspect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((item, index) => (
              <InteractiveCard
                key={item.num}
                item={item}
                index={index}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>

          {/* Expanded Spotlight Detail Panel for Active Discipline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-2xl border border-white/15 bg-white/[0.025] backdrop-blur-xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                    SELECTED DISCIPLINE BREAKDOWN — {disciplines[activeTab].num}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-light text-white font-sans">
                    {disciplines[activeTab].title}
                  </h4>
                </div>
                <span className="font-mono text-xs text-neutral-400 border border-white/15 px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                  {disciplines[activeTab].badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono text-xs">
                {disciplines[activeTab].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-neutral-300">
                    <span className="text-emerald-400 font-bold mt-0.5">✦</span>
                    <span className="leading-relaxed font-light">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  )
}
