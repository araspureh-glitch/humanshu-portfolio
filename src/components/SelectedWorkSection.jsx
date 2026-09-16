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

    const rotateX = ((y - centerY) / centerY) * -3
    const rotateY = ((x - centerX) / centerX) * 3

    setTransform(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`)
    setSpotlightPos({ x, y })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
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
      className="group cursor-pointer flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.012] hover:bg-white/[0.03] hover:border-white/20 shadow-xl relative overflow-hidden will-change-transform h-full"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      <div className="space-y-3.5 relative z-10">
        {/* Top Minimal Card Header */}
        <div className="flex items-center justify-between font-mono text-[11px] border-b border-white/5 pb-2.5 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#EA5211]">{project.id}</span>
            <span className="text-neutral-600">//</span>
            <span className="truncate max-w-[150px] text-neutral-300 font-sans font-medium">{project.client}</span>
          </div>
          <span className="text-neutral-500 font-mono text-[10px]">{project.year}</span>
        </div>

        {/* Role & Timeline Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-sans font-medium text-neutral-300 uppercase tracking-wider">
            {project.role}
          </span>
          <span className="font-mono text-[10px] text-neutral-500">
            {project.timeline}
          </span>
        </div>

        {/* Minimal Uncropped Image Preview */}
        <div className="relative rounded-xl overflow-hidden bg-[#08080a] border border-white/10 group-hover:border-[#EA5211]/30 transition-all duration-300 aspect-[16/9] w-full flex items-center justify-center p-1.5 sm:p-2">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className={`w-full h-full rounded-lg bg-gradient-to-br ${project.imageBg} p-4 flex flex-col justify-center items-center text-center space-y-2`}>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg font-bold text-white">
                {project.name.charAt(0)}
              </div>
              <p className="text-xs text-neutral-400 font-sans">{project.category}</p>
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div>
          <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#EA5211] block font-semibold mb-0.5">
            {project.category}
          </span>
          <h3 className="text-lg sm:text-xl font-medium text-white font-sans group-hover:text-[#EA5211] transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Sleek Minimal Footer */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between relative z-10 mt-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-white transition-colors">
          View Case Study
        </span>
        <div className="w-7 h-7 rounded-full bg-[#EA5211] text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(234,82,17,0.5)] transition-all duration-300 flex-shrink-0">
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section id="work" className="w-full bg-[#050505] text-[#F5F5F5] py-20 px-4 sm:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211] animate-ping"></span>
              <span>01 / FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mt-2 font-sans">
              Selected work
            </h2>
          </div>
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.18em] max-w-xs sm:text-right">
            UI/UX · Graphic Design · Research
            <span className="block text-white font-medium mt-0.5">2024 – 2026 ARCHIVE</span>
          </p>
        </div>

        {/* Minimal 3-Column Aesthetic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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


