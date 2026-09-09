import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CaseStudyModal({ project, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!project) return null
  const cs = project.caseStudy

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click listener */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 cursor-pointer"
        />

        {/* Case Study Content Drawer / Panel */}
        <motion.div 
          ref={modalRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl bg-[#09090b] text-[#F5F5F5] min-h-screen border-l border-white/10 shadow-2xl overflow-y-auto p-6 sm:p-12 lg:p-16"
        >
          {/* Top Bar Navigation */}
          <div className="sticky top-0 z-20 flex items-center justify-between py-4 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 mb-8 sm:mb-12">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                CASE STUDY // {project.id} / {project.name}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/20 hover:border-white text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10"
            >
              Close ✕
            </button>
          </div>

          {/* Hero Header */}
          <div className="space-y-6 pb-12 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] font-semibold">
                {project.category}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{project.year}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{project.client}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.05] text-white font-sans">
              {project.name}
            </h1>

            <p className="text-xl sm:text-2xl text-neutral-400 font-light leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>

            {/* Project Quick Meta Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 font-mono text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Role</span>
                <span className="text-white font-medium">{project.role}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Timeline</span>
                <span className="text-white font-medium">{project.timeline}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Client</span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Tools</span>
                <span className="text-white font-medium">{project.tools.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Composition */}
          <div className="my-12">
            <div className={`w-full aspect-[16/9] rounded-2xl bg-gradient-to-br ${project.imageBg} border border-white/15 p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden`}>
              {project.coverImage && (
                <img 
                  src={project.coverImage} 
                  alt={project.name} 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}
              <div className="relative z-10 flex justify-between items-center font-mono text-xs text-neutral-400">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">DESIGN THINKING ARCHITECTURE</span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">01 / 12 SECTIONS</span>
              </div>
              <div className="relative z-10 space-y-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-xl backdrop-blur-sm max-w-xl">
                <span className="text-xs font-mono text-white tracking-widest uppercase block font-medium">
                  FEATURED CASE STUDY
                </span>
                <h2 className="text-3xl font-light text-white">{project.name} UI System</h2>
              </div>
            </div>
          </div>

          {/* 12 Detailed Case Study Sections */}
          <div className="space-y-16 py-8">

            {/* 01 Overview */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">01 / OVERVIEW</span>
              <h3 className="text-2xl font-light text-white">Project Scope & Context</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.overview}
              </p>
            </section>

            {/* 02 Problem */}
            <section className="space-y-4 p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest block">02 / PROBLEM STATEMENT</span>
              <h3 className="text-2xl font-light text-white">Core Challenge</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.problem}
              </p>
            </section>

            {/* 03 Research */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">03 / RESEARCH & DISCOVERY</span>
              <h3 className="text-2xl font-light text-white">User & Market Analysis</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.research}
              </p>
            </section>

            {/* 04 Insights */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">04 / KEY INSIGHTS</span>
              <h3 className="text-2xl font-light text-white">What We Learned</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {cs.insights.map((insight, idx) => (
                  <div key={idx} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                    <span className="font-mono text-xs text-neutral-500">INSIGHT 0{idx + 1}</span>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">{insight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 User Journey */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">05 / USER JOURNEY</span>
              <h3 className="text-2xl font-light text-white">Mapping Pathways</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.userJourney}
              </p>
            </section>

            {/* 06 Ideation */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">06 / IDEATION</span>
              <h3 className="text-2xl font-light text-white">Exploration & Micro-Interactions</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.ideation}
              </p>
            </section>

            {/* 07 Wireframes */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">07 / WIREFRAMING & LAYOUTS</span>
              <h3 className="text-2xl font-light text-white">Structural Blueprints</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-4">
                {cs.wireframes}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-48 rounded-xl border border-white/10 bg-white/[0.015] flex items-center justify-center font-mono text-xs text-neutral-400">
                  Wireframe Spec Architecture A
                </div>
                <div className="h-48 rounded-xl border border-white/10 bg-white/[0.015] flex items-center justify-center font-mono text-xs text-neutral-400">
                  Wireframe Spec Architecture B
                </div>
              </div>
            </section>

            {/* 08 Visual Design */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">08 / VISUAL DESIGN SYSTEM</span>
              <h3 className="text-2xl font-light text-white">Aesthetic & Component Tokens</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.visualDesign}
              </p>
            </section>

            {/* 09 Prototype */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">09 / PROTOTYPING & MOTION</span>
              <h3 className="text-2xl font-light text-white">Interactive Flow Simulation</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.prototype}
              </p>
            </section>

            {/* 10 Usability Testing */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">10 / USABILITY TESTING</span>
              <h3 className="text-2xl font-light text-white">Validation & Iteration Loops</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.usabilityTesting}
              </p>
            </section>

            {/* 11 Final Outcome */}
            <section className="space-y-4 p-8 rounded-2xl border border-white/15 bg-white/[0.03]">
              <span className="font-mono text-xs text-white uppercase tracking-widest block">11 / FINAL OUTCOME & IMPACT</span>
              <h3 className="text-2xl font-light text-white">Results & Deliverables</h3>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-light">
                {cs.finalOutcome}
              </p>
            </section>

            {/* 12 Reflection */}
            <section className="space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">12 / REFLECTION & TAKEAWAYS</span>
              <h3 className="text-2xl font-light text-white">Learnings</h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {cs.reflection}
              </p>
            </section>

          </div>

          {/* Bottom Action Footer */}
          <div className="pt-12 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-neutral-500">HUMANSHU ARASPURE PORTFOLIO</span>
            <button 
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg"
            >
              Close Case Study ✕
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
