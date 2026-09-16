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

    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`)
    setSpotlightPos({ x, y })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className="group cursor-pointer flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-white/30 shadow-2xl relative overflow-hidden will-change-transform h-full"
    >
      {/* Interactive Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />

      <div className="space-y-5 relative z-10">
        {/* Top Card Bar */}
        <div className="flex items-center justify-between font-sans text-xs font-medium tracking-wider border-b border-white/10 pb-4 text-neutral-400">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-[#EA5211] font-sans">{project.id}</span>
            <span>//</span>
            <span className="truncate max-w-[180px] sm:max-w-none">{project.client}</span>
          </div>
          <span>{project.year}</span>
        </div>

        {/* Role & Timeline Badges */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-[11px] font-sans font-medium text-neutral-200 uppercase tracking-wider border border-white/10">
            {project.role}
          </span>
          <span className="font-sans text-xs font-medium text-neutral-400 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            {project.timeline}
          </span>
        </div>

        {/* Complete Visual Preview Container (Full Uncropped Image) */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 group-hover:border-[#EA5211]/40 transition-all duration-300 aspect-[16/10] w-full flex items-center justify-center p-2 sm:p-3">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className={`w-full h-full rounded-xl bg-gradient-to-br ${project.imageBg} p-6 flex flex-col justify-center items-center text-center space-y-3`}>
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
                {project.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">{project.name}</h4>
                <p className="text-xs text-neutral-400 mt-1">{project.category}</p>
              </div>
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div className="pt-2">
          <span className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#EA5211] block font-semibold mb-1">
            {project.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-white font-sans group-hover:text-[#EA5211] transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-300 font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="pt-5 border-t border-white/10 flex items-center justify-between relative z-10 mt-6">
        <span className="text-xs font-sans tracking-[0.18em] uppercase text-white font-medium group-hover:text-[#EA5211] transition-colors">
          View Case Study Page
        </span>
        <div className="w-10 h-10 rounded-full bg-[#EA5211] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(234,82,17,0.6)] transition-all duration-300 flex-shrink-0">
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
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
    <section id="work" className="w-full bg-[#050505] text-[#F5F5F5] py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-sans text-[11px] text-neutral-400 uppercase tracking-[0.18em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211] animate-ping"></span>
              <span>01 / FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight mt-3 font-sans">
              Selected work
            </h2>
          </div>
          <p className="text-xs font-sans text-neutral-400 uppercase tracking-[0.18em] font-medium max-w-xs sm:text-right">
            UI/UX · Graphic Design · Research
            <span className="block text-white font-medium mt-1">2024 – 2026 ARCHIVE</span>
          </p>
        </div>

        {/* 2-Column Side by Side Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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

