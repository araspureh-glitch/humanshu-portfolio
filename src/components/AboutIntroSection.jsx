import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Sparkles, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

// Work project images array for the Juan Mora style inline banner pill
const workPortfolioImages = [
  {
    id: 'flex-step',
    src: '/flexstep-cover.png',
    title: 'Flex Step E-Commerce',
    category: 'Spatial Footwear UI/UX',
    year: '2026',
    accent: '#EA5211'
  },
  {
    id: 'ecogrid',
    src: '/ecogrid-cover.png',
    title: 'EcoGrid SaaS Dashboard',
    category: 'Smart City Data Vis',
    year: '2025',
    accent: '#38bdf8'
  },
  {
    id: 'beheal',
    src: '/beheal-cover.jpg',
    title: 'BeHeal Health App',
    category: 'Biometric Mobile UI',
    year: '2025',
    accent: '#10b981'
  },
  {
    id: 'architect',
    src: '/hero.jpg',
    title: 'Humanshu Araspure',
    category: 'UI/UX Architect & Product Designer',
    year: '2026',
    accent: '#EA5211'
  }
]

function JuanMoraNameBanner() {
  const bannerRef = useRef(null)
  const [activeImgIdx, setActiveImgIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Spring physics for smooth 3D tilt tracking mouse
  const rotateXSpring = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateYSpring = useSpring(0, { stiffness: 150, damping: 20 })
  const scaleSpring = useSpring(1, { stiffness: 200, damping: 20 })

  // Scroll driven parallax scale & opacity
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start']
  })

  const bannerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.8, 0.3])

  // Mouse Move Handler: 3D Tilt + Cursor Position Image Scrubbing (like Juan Mora site)
  const handleMouseMove = useCallback((e) => {
    if (!bannerRef.current) return
    const rect = bannerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate cursor percentage (0 to 1) across the banner width
    const percentX = Math.max(0, Math.min(1, x / rect.width))
    
    // Dynamically scrub through work images based on mouse X position
    const imageCount = workPortfolioImages.length
    const nextIdx = Math.min(imageCount - 1, Math.floor(percentX * imageCount))
    setActiveImgIdx(nextIdx)

    // Calculate 3D tilt angles
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rY = ((x - centerX) / centerX) * 14 // rotate Y up to 14 deg
    const rX = -((y - centerY) / centerY) * 14 // rotate X up to -14 deg

    rotateXSpring.set(rX)
    rotateYSpring.set(rY)
    scaleSpring.set(1.04)
  }, [rotateXSpring, rotateYSpring, scaleSpring])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateXSpring.set(0)
    rotateYSpring.set(0)
    scaleSpring.set(1)
  }

  // Auto-cycle fallback when not hovering/lightbox
  useEffect(() => {
    if (isHovered || isLightboxOpen) return
    const timer = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % workPortfolioImages.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [isHovered, isLightboxOpen])

  const nextImage = (e) => {
    e?.stopPropagation()
    setActiveImgIdx((prev) => (prev + 1) % workPortfolioImages.length)
  }

  const prevImage = (e) => {
    e?.stopPropagation()
    setActiveImgIdx((prev) => (prev - 1 + workPortfolioImages.length) % workPortfolioImages.length)
  }

  const currentWork = workPortfolioImages[activeImgIdx]

  return (
    <motion.div
      ref={bannerRef}
      style={{ scale: bannerScale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-8 sm:py-14 select-none perspective-[1000px]"
    >
      {/* Background Soft Glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-56 bg-[#EA5211]/20 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Top Eyebrow Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#EA5211] animate-pulse" />
          <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest">
            01 // DESIGN DIRECTOR & UI/UX ARCHITECT
          </span>
        </motion.div>

        {/* Juan Mora Style Giant Name Banner with 3D Tilt & Cursor Image Scrubbing */}
        <div className="flex flex-wrap items-center justify-center leading-none tracking-tighter font-sans font-bold text-[#FFB396] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] gap-y-2">
          {/* First Name Half */}
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block transition-transform duration-300 hover:scale-[1.01]"
          >
            Human
          </motion.span>

          {/* Inline Interactive Work Image Pill Container with 3D Tilt Physics */}
          <motion.div
            style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              scale: scaleSpring,
            }}
            onClick={() => setIsLightboxOpen(true)}
            className="group/pill relative inline-flex items-center justify-center align-middle mx-2 sm:mx-4 md:mx-6 my-auto w-32 sm:w-52 md:w-72 lg:w-96 h-16 sm:h-24 md:h-32 lg:h-40 rounded-2xl sm:rounded-3xl border-2 border-white/20 hover:border-[#EA5211] bg-black/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer transition-colors duration-300 will-change-transform"
          >
            {/* Animated Work Image Slide */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentWork.id}
                src={currentWork.src}
                alt={currentWork.title}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Glowing Active Border Beam Line */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 group-hover/pill:border-[#EA5211]/60 transition-colors pointer-events-none" />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Project Label inside the Pill */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md text-[9px] sm:text-[11px] font-mono text-white border border-white/20 truncate max-w-[80%] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
                {currentWork.title}
              </span>

              <span className="p-1 sm:p-1.5 rounded-full bg-[#EA5211] text-white opacity-0 group-hover/pill:opacity-100 transition-opacity duration-300 shadow-lg">
                <Maximize2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </span>
            </div>

            {/* Manual Controls on Hover */}
            {isHovered && (
              <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-auto">
                <button
                  onClick={prevImage}
                  className="p-1 rounded-full bg-black/70 hover:bg-[#EA5211] text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-1 rounded-full bg-black/70 hover:bg-[#EA5211] text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Second Name Half */}
          <motion.span 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block transition-transform duration-300 hover:scale-[1.01]"
          >
            shu
          </motion.span>
        </div>

        {/* Sub-Headline & Cursor Scrubber Hint */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base font-sans text-neutral-300 font-light"
        >
          <span>Humanshu Araspure</span>
          <span className="text-[#EA5211] font-mono">•</span>
          <span>Web & Brand Design Specialist</span>
          <span className="text-[#EA5211] font-mono">•</span>
          <span className="font-mono text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Hover / Move cursor to scrub portfolio
          </span>
        </motion.div>
      </div>

      {/* Lightbox Preview Modal for Work Images */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#121214] border border-white/20 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h4 className="text-xl font-normal text-white font-sans">{currentWork.title}</h4>
                  <p className="text-xs font-mono text-[#EA5211] mt-0.5">{currentWork.category} — {currentWork.year}</p>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#EA5211] text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image View */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={currentWork.src}
                  alt={currentWork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {workPortfolioImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeImgIdx ? 'w-8 bg-[#EA5211]' : 'w-2 bg-white/20 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevImage}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#EA5211] text-white text-xs font-mono transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextImage}
                    className="px-4 py-2 rounded-full bg-[#EA5211] hover:bg-orange-600 text-white text-xs font-mono transition-colors"
                  >
                    Next Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
                  exit={{ y: 0, opacity: 1 }}
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
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-12 sm:py-20 px-6 sm:px-12 lg:px-16 relative overflow-hidden border-b border-white/10">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Juan Mora Inspired Large Name Hero Banner with Inline Work Image Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <JuanMoraNameBanner />
        </motion.div>

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

