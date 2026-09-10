import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projectsData'
import CaseStudyModal from './CaseStudyModal'

function TiltWorkCard({ project, onClick }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate subtle 3D tilt angles
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`)
    setSpotlightPos({ x, y })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setOpacity(0)
  }

  const isFullWidth = project.layoutType === 'full-width'
  const isTwoColumn = project.layoutType === 'two-column'
  const isHorizontal = project.layoutType === 'horizontal'
  const isMobile = project.layoutType === 'mobile-presentation'

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className="group cursor-pointer flex flex-col space-y-6 p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/30 shadow-2xl relative overflow-hidden will-change-transform"
    >
      {/* Interactive Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />

      {/* Top Card Bar */}
      <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-4 text-neutral-400 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#0A66C2] font-sans">{project.id}</span>
          <span>//</span>
          <span>{project.client}</span>
        </div>
        <span>{project.year}</span>
      </div>

      {/* Hero Visual Preview */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 z-10 group-hover:border-white/20 transition-all duration-300">
        <div className="p-6 sm:p-10 min-h-[320px] sm:min-h-[400px] flex flex-col justify-between relative overflow-hidden">
          {/* Cover Image Background */}
          {project.coverImage ? (
            <>
              <img
                src={project.coverImage}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-black/30 z-0" />
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.imageBg} z-0`} />
          )}

          {/* Top Info Bar */}
          <div className="flex justify-between items-start relative z-10">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white uppercase tracking-wider border border-white/15">
              {project.role}
            </span>
            <span className="font-mono text-xs text-neutral-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
              {project.timeline}
            </span>
          </div>

          {!project.coverImage && (
            <div className="my-auto py-6 relative z-10">
              {isMobile ? (
                <div className="max-w-xs mx-auto aspect-[9/16] h-44 rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-3 flex flex-col justify-between shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-12 h-1.5 rounded-full bg-white/30 mx-auto" />
                  <div className="space-y-2 text-left">
                    <div className="w-3/4 h-3 rounded bg-white/40" />
                    <div className="w-1/2 h-2 rounded bg-white/20" />
                  </div>
                  <div className="w-full h-8 rounded-xl bg-white/10 flex items-center justify-center text-[10px] font-mono text-white">
                    UI PROTOTYPE
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-xl mx-auto border border-white/15 rounded-xl bg-black/40 backdrop-blur-md p-5 space-y-3 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="text-[10px] font-mono text-neutral-400 ml-2">{project.slug}.ui</span>
                  </div>
                  <div className="w-full h-2 rounded bg-white/15" />
                  <div className="w-2/3 h-2 rounded bg-white/20" />
                </div>
              )}
            </div>
          )}

          {/* Bottom Card Title & Button */}
          <div className="flex justify-between items-end relative z-10 pt-16">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#0A66C2] block font-semibold mb-1 drop-shadow">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-4xl font-light text-white font-sans group-hover:translate-x-2 transition-transform duration-300 drop-shadow-md">
                {project.name}
              </h3>
            </div>

            {/* Floating Case Study Arrow Button with Magnetic Glow */}
            <div className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(10,102,194,0.6)] transition-all duration-300 flex-shrink-0">
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <button className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white font-medium group-hover:text-amber-100 transition-colors cursor-pointer">
          <span className="group-hover:translate-x-1 transition-transform">→ View Case Study Page</span>
        </button>
      </div>
    </div>
  )
}

export default function SelectedWorkSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const navigate = useNavigate()

  const handleProjectClick = (project) => {
    navigate(`/project/${project.slug}`)
  }

  return (
    <section id="work" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-16 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-ping"></span>
              <span>01 / FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight mt-3 font-sans">
              Selected work
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-xs sm:text-right">
            UI/UX · Graphic Design · Research
            <span className="block text-white font-medium mt-1">2024 – 2026 ARCHIVE</span>
          </p>
        </div>

        {/* Varied Magazine Visual Rhythm Layout Grid with 3D Tilt */}
        <div className="space-y-24">
          {projects.map((project) => (
            <TiltWorkCard 
              key={project.id} 
              project={project} 
              onClick={() => handleProjectClick(project)} 
            />
          ))}
        </div>

      </div>

      {/* Case Study Modal Drawer Fallback */}
      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  )
}
