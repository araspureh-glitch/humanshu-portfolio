import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const certificatesData = [
  {
    id: 'cert-accenture',
    brand: 'accenture',
    brandSuffix: '>',
    category: 'DIGITAL SKILLS',
    title: 'User Experience',
    platform: 'FutureLearn',
    date: 'Oct 2025',
    duration: '3 weeks',
    score: '92%',
    credentialId: 'rrz99ml',
    skills: ['User Flows', 'Wireframing', 'Usability Testing'],
    verticalLabel: '— FUTURELEARN',
    issuer: 'Accenture Digital Academy'
  },
  {
    id: 'cert-uiux-beginners',
    brand: 'Great Learning',
    brandSuffix: '✦',
    category: 'UI / UX DESIGN',
    title: 'UI/UX for Beginners',
    platform: 'Great Learning',
    date: 'Sept 2025',
    duration: 'Self-Paced',
    score: 'Verified',
    credentialId: 'GL-UX-2025-89',
    skills: ['Figma Hierarchy', 'User Centricity', 'Wireframing'],
    verticalLabel: '— GREAT LEARNING',
    issuer: 'Great Learning Academy'
  },
  {
    id: 'cert-uiux-design',
    brand: 'SkillUp',
    brandSuffix: '⚡',
    category: 'UI / UX DESIGN',
    title: 'UI/UX Design',
    platform: 'SkillUp',
    date: 'Aug 2025',
    duration: 'Advanced Track',
    score: '100%',
    credentialId: 'SKUP-UIUX-901',
    skills: ['Design Systems', 'Micro-Interactions', 'Component Kits'],
    verticalLabel: '— SKILLUP',
    issuer: 'Simplilearn SkillUp'
  },
  {
    id: 'cert-design-thinking',
    brand: 'HP LIFE',
    brandSuffix: '®',
    category: 'DESIGN THINKING',
    title: 'Design Thinking Process',
    platform: 'HP LIFE',
    date: 'June 2025',
    duration: 'Methodology',
    score: 'Certified',
    credentialId: 'HPLIFE-DT-442',
    skills: ['Problem Framing', 'Ideation', 'User Empathy'],
    verticalLabel: '— HP LIFE',
    issuer: 'HP Foundation LIFE Program'
  },
  {
    id: 'cert-graphic-uiux',
    brand: 'Simplilearn',
    brandSuffix: '❖',
    category: 'GRAPHIC & UI/UX',
    title: 'Graphic Design + UI/UX',
    platform: 'Simplilearn',
    date: 'June 2025',
    duration: 'Specialization',
    score: 'Distinction',
    credentialId: 'SMP-GDUI-770',
    skills: ['Visual Craft', 'Typography', 'Brand Identity'],
    verticalLabel: '— SIMPLILEARN',
    issuer: 'Simplilearn Executive Education'
  }
]

export default function RecognitionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [activeModalCert, setActiveModalCert] = useState(null)

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying || activeModalCert) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificatesData.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, activeModalCert])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificatesData.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length)
  }

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 relative overflow-hidden select-none">
      {/* Warm Subtle Ambient Glow centered behind cards */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] pointer-events-none rounded-full opacity-45 blur-[130px] transition-all duration-700"
        style={{
          background: 'radial-gradient(circle at center, rgba(180, 83, 9, 0.25) 0%, rgba(120, 53, 15, 0.08) 55%, transparent 75%)'
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Badge & Main Headline */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-6 flex flex-col justify-center"
        >
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-sans font-medium text-neutral-300 tracking-[0.18em] uppercase bg-white/[0.03] backdrop-blur-md shadow-sm">
              02 / CERTIFICATIONS & LEARNING
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white font-sans leading-[1.08]">
            Building Skills.<br />
            <span className="font-semibold text-white">Growing Further.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-light font-sans max-w-sm leading-relaxed">
            Continuous learning fuels better design, brighter ideas and bigger dreams.
          </p>
        </motion.div>

        {/* Center: Monochrome Glassmorphism Certificate Card Stack Carousel */}
        <div 
          className="lg:col-span-5 flex flex-col items-center justify-center relative py-6"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Card Deck Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] sm:h-[530px] flex items-center justify-center">
            {certificatesData.map((item, index) => {
              // Calculate stack offset relative to active card
              const total = certificatesData.length
              const offset = (index - activeIndex + total) % total

              // Render top 3 cards in stack
              if (offset > 2) return null

              // Stack transform properties
              const scale = 1 - offset * 0.05
              const translateY = -offset * 16
              const opacity = 1 - offset * 0.28
              const zIndex = 30 - offset

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    scale,
                    y: translateY,
                    opacity,
                    zIndex
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  onClick={() => {
                    if (offset === 0) {
                      setActiveModalCert(item)
                    } else {
                      setActiveIndex(index)
                    }
                  }}
                  className={`absolute inset-0 rounded-[2.2rem] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-white/20 bg-gradient-to-b from-[#191a1f]/95 via-[#131418]/95 to-[#0b0c0f]/98 backdrop-blur-2xl text-white shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 group hover:border-white/40`}
                >
                  {/* Card Header: Brand Logo & Category */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
                        <span>{item.brand}</span>
                        {item.brandSuffix && (
                          <span className="text-neutral-400 font-sans text-lg font-light pl-0.5">{item.brandSuffix}</span>
                        )}
                      </div>
                      {offset === 0 && (
                        <span className="text-[10px] font-sans uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 bg-white/10 text-neutral-200 font-semibold backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">
                          Inspect ↗
                        </span>
                      )}
                    </div>

                    <div className="font-sans text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                      {item.category}
                    </div>
                  </div>

                  {/* Card Title & Rich Metadata Stack */}
                  <div className="my-auto space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
                      {item.title}
                    </h3>

                    {/* Metadata Stat Columns Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-neutral-300">
                          <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-semibold text-[11px] sm:text-xs text-white whitespace-nowrap">{item.date}</span>
                        </div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">DATE</span>
                      </div>

                      <div className="space-y-0.5 border-l border-white/10 pl-2.5">
                        <div className="flex items-center gap-1 text-xs text-neutral-300">
                          <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-[11px] sm:text-xs text-white whitespace-nowrap">{item.duration}</span>
                        </div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">TRACK</span>
                      </div>

                      <div className="space-y-0.5 border-l border-white/10 pl-2.5">
                        <div className="flex items-center gap-1 text-xs text-neutral-300">
                          <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-[11px] sm:text-xs text-white whitespace-nowrap">{item.score}</span>
                        </div>
                        <span className="font-sans text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">STATUS</span>
                      </div>
                    </div>

                    {/* Skills Pills */}
                    {item.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {item.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md border border-white/12 bg-white/[0.04] text-[10px] font-sans font-medium text-neutral-300 tracking-tight hover:border-white/30 hover:text-white transition-all duration-200"
                          >
                            <span className="w-1 h-1 rounded-full bg-emerald-400/80 mr-1.5" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Credential ID */}
                    {item.credentialId && (
                      <div className="space-y-0.5 pt-0.5">
                        <span className="text-[9px] font-sans text-neutral-400 uppercase tracking-wider block">Credential ID</span>
                        <span className="font-sans text-xs text-neutral-200 font-medium block">{item.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Vertical Label along right edge */}
                  <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right pointer-events-none">
                    <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-neutral-400 block whitespace-nowrap">
                      {item.verticalLabel}
                    </span>
                  </div>

                  {/* Card Bottom Platform Section */}
                  <div className="pt-3 border-t border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-sans uppercase text-neutral-400 font-semibold tracking-wider block">
                          Platform
                        </span>
                        <span className="text-sm font-bold text-white tracking-tight block">
                          {item.platform}
                        </span>
                      </div>

                      {/* Vector Wave Signature */}
                      <div className="opacity-50 flex items-center shrink-0 pt-1 text-neutral-300">
                        <svg className="w-10 h-6" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 25 C15 5, 25 30, 35 10 C40 2, 45 20, 48 15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Carousel Pagination Controls / Dot Indicators */}
          <div className="flex items-center gap-2.5 mt-8 sm:mt-10 z-30">
            {certificatesData.map((_, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-400 ease-out focus:outline-none cursor-pointer ${
                    isActive 
                      ? 'w-10 h-2.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.7)]' 
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40 rounded-full'
                  }`}
                />
              )
            })}
          </div>
        </div>

        {/* Right Side: Highlighted Narrative Paragraph & Controls */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 space-y-6 flex flex-col justify-center"
        >
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed font-sans">
            I keep upgrading my skills through{' '}
            <strong className="text-white font-bold">industry-recognised certifications</strong>{' '}
            and{' '}
            <strong className="text-white font-bold">hands-on courses</strong>{' '}
            to stay current, build new perspectives and create better design solutions.
          </p>

          {/* Action / Next Prev Nav buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/30 text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
              aria-label="Previous certificate"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.1] hover:border-white/30 text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
              aria-label="Next certificate"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="font-sans text-xs text-neutral-400 font-medium pl-2 tracking-wider">
              0{activeIndex + 1} / 0{certificatesData.length}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Full Certificate Details Inspection Modal Popup */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#0f0f13] border border-white/20 rounded-3xl p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6 overflow-hidden select-text text-white"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 font-semibold">
                    Certifications & Credentials
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-sans">
                    {activeModalCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalCert(null)}
                  className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Details Frame */}
              <div className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans uppercase text-neutral-400 block">ISSUING BRAND / PROVIDER</span>
                    <span className="text-xl font-bold text-white">{activeModalCert.brand}</span>
                  </div>
                  <span className="font-sans text-xs uppercase px-3 py-1 rounded-full border border-white/15 bg-white/5 text-neutral-300 font-semibold">
                    {activeModalCert.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">PLATFORM</span>
                    <span className="text-neutral-200 font-semibold text-sm">{activeModalCert.platform}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">DATE ISSUED</span>
                    <span className="text-neutral-200 font-semibold text-sm">{activeModalCert.date}</span>
                  </div>
                  {activeModalCert.duration && (
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase">TRACK / DURATION</span>
                      <span className="text-neutral-200 font-semibold text-sm">{activeModalCert.duration}</span>
                    </div>
                  )}
                  {activeModalCert.score && (
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase">STATUS / SCORE</span>
                      <span className="text-neutral-200 font-semibold text-sm">{activeModalCert.score}</span>
                    </div>
                  )}
                </div>

                {activeModalCert.skills && (
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <span className="text-[10px] font-sans uppercase text-neutral-400 block tracking-widest font-medium">KEY COMPETENCIES VERIFIED</span>
                    <div className="flex flex-wrap gap-2">
                      {activeModalCert.skills.map((sk, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-white/[0.05] border border-white/15 text-xs font-sans font-medium text-neutral-200 hover:border-white/30 transition-all duration-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mr-2" />
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalCert.credentialId && (
                  <div className="border-t border-white/10 pt-4 text-xs font-sans">
                    <span className="text-neutral-400 block text-[10px] uppercase">CREDENTIAL ID</span>
                    <span className="text-white font-bold tracking-wider">{activeModalCert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setActiveModalCert(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-sans text-xs uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
