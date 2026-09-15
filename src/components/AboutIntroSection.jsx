import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PixelPerfectHeroHeader() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 768) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    // Maximum movement 6px on desktop only as requested
    setMousePos({ x: x * 12, y: y * 12 })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[60vh] sm:min-h-[75vh] flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 rounded-3xl overflow-hidden bg-[#0a0a0c] select-none border border-white/10"
    >
      {/* Full-width Warm-Toned Background Photograph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.38, x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{
          opacity: { duration: 1, ease: 'easeOut' },
          x: { duration: 0.3, ease: 'easeOut' },
          y: { duration: 0.3, ease: 'easeOut' }
        }}
        className="absolute inset-0 bg-cover bg-center filter brightness-95 contrast-105 pointer-events-none scale-105"
        style={{ backgroundImage: `url('/hero.jpg')` }}
      />

      {/* Dark Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/60 pointer-events-none" />

      {/* Exact Hero Composition: Humanshu [Central Card] Araspure */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-8">
        
        <div className="w-full flex flex-row items-center justify-center whitespace-nowrap leading-none tracking-tighter font-sans font-bold text-[#FFBC95] text-3xl sm:text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem] gap-2 sm:gap-4 md:gap-6 py-2">
          
          {/* First Name Masked Reveal: "Humanshu" */}
          <div className="overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Humanshu
            </motion.span>
          </div>

          {/* Central Dark Card with Artwork & Subtle Float */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 my-auto"
          >
            {/* Subtle Vertical Float after Load */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-28 sm:w-48 md:w-64 lg:w-80 h-14 sm:h-24 md:h-32 lg:h-40 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 bg-[#121214] shadow-2xl overflow-hidden flex items-center justify-center p-2.5 sm:p-3"
            >
              {/* Card Artwork Matching Reference Screenshot */}
              <div className="w-full h-full rounded-lg sm:rounded-xl bg-[#09090b] border border-white/10 p-2 sm:p-3 flex flex-col justify-between relative overflow-hidden text-left">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <p className="text-[6px] sm:text-[8px] font-mono text-emerald-400 tracking-widest uppercase">PREPARE YOURSELF ///</p>
                    <p className="text-[5px] sm:text-[7px] font-mono text-neutral-400 leading-tight">
                      &gt; REMEMBER<br />
                      &gt; TRUST YOUR INSTINCTS<br />
                      &gt; OBEY YOUR INSTINCTS
                    </p>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                {/* Central Cyan/Green Symbol */}
                <div className="my-auto text-center flex flex-col items-center justify-center">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L18 8v8l-6 3.75L6 16V8l6-3.2z" />
                  </svg>
                  <span className="text-[7px] sm:text-[9px] font-mono text-emerald-400 font-bold tracking-widest mt-0.5">TopTrader</span>
                </div>

                <div className="flex justify-end">
                  <span className="text-[5px] sm:text-[7px] font-mono text-neutral-500 text-right leading-tight">
                    DO YOU HAVE WHAT IT TAKES<br />TO BE THE TOP TRADER?
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Last Name Masked Reveal: "Araspure" */}
          <div className="overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Araspure
            </motion.span>
          </div>

        </div>

        {/* Subtitle Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-sans text-neutral-300 font-light"
        >
          <span>Humanshu Araspure</span>
          <span className="text-[#FFBC95] font-mono">•</span>
          <span>Design Director & UI/UX Specialist</span>
        </motion.div>

      </div>
    </div>
  )
}

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
      <span className="relative z-10 font-serif italic text-white group-hover:text-[#EA5211] transition-colors duration-300">
        {children}
      </span>
      {/* Accent underline visible only on hover */}
      <span className="absolute bottom-0.5 left-1 right-1 h-[1.5px] bg-gradient-to-r from-[#EA5211] via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
      <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] sm:leading-[1.35] tracking-tight font-sans text-neutral-100 max-w-5xl">
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
      layout="position"
      onMouseEnter={onHover}
      onClick={onToggle}
      className={`border-b border-white/10 group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] py-4 sm:py-5 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer ${
        isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-3 md:gap-6">
        {/* Left Column: Number & Sub-label */}
        <div className="md:col-span-3 sm:col-span-4 space-y-0.5 pt-0.5">
          <span
            className={`block font-sans text-xs tracking-tight transition-colors duration-400 ease-out ${
              isOpen ? 'text-[#EA5211] font-medium' : 'text-neutral-500 group-hover:text-neutral-300 font-light'
            }`}
          >
            {item.num}
          </span>
          <span
            className={`block font-sans text-xs transition-colors duration-400 ease-out ${
              isOpen ? 'text-white font-medium' : 'text-neutral-400 group-hover:text-white font-light'
            }`}
          >
            {item.sublabel}
          </span>
        </div>

        {/* Right Column: Statement Headline & Expandable Description */}
        <div className="md:col-span-9 sm:col-span-8 space-y-2">
          <h3 
            className={`text-base sm:text-lg lg:text-xl font-sans tracking-tight leading-snug transition-colors duration-400 ease-out ${
              isOpen 
                ? 'text-white font-normal' 
                : 'text-neutral-400/80 font-light group-hover:text-white'
            }`}
          >
            {item.title}
          </h3>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                    opacity: { duration: 0.35, delay: 0.05, ease: 'easeOut' }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                    opacity: { duration: 0.2, ease: 'easeIn' }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.p 
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -4, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="text-xs sm:text-sm font-sans text-neutral-400 font-light leading-relaxed max-w-2xl pt-1 pb-1"
                >
                  {item.desc}
                </motion.p>
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
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-12 sm:py-20 px-6 sm:px-12 lg:px-16 relative overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Pixel-Perfect Hero Section matching reference screenshot with Humanshu Araspure name */}
        <PixelPerfectHeroHeader />

        {/* Interactive Bio with Hover Image Preview Popups */}
        <div className="pt-4 border-t border-white/10">
          <InteractiveBio />
        </div>

        {/* Sleek Minimalist Core Disciplines Layout */}
        <div className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/10">
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-sans font-medium text-white tracking-tight">
                At Humanshu Studio
              </p>
              <p className="text-xs sm:text-sm font-sans font-medium text-[#EA5211] tracking-tight">
                We make digital experiences better
              </p>
            </div>
            <span className="font-sans text-[11px] text-neutral-400 uppercase tracking-[0.2em] font-medium">
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
                onHover={() => {
                  if (openRow !== index) setOpenRow(index)
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

