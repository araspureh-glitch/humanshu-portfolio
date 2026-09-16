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
      style={{ transform, transition: 'transform 0.15s ease-out', borderColor: 'var(--border-nav)', background: 'var(--bg-card)' }}
      className="group cursor-pointer flex flex-col justify-between p-4 sm:p-5 rounded-2xl border shadow-xl relative overflow-hidden will-change-transform h-full"
    >
      {/* Interactive Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(150,150,150,0.12), transparent 40%)`,
        }}
      />

      <div className="space-y-3 relative z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between font-sans text-xs font-medium tracking-wider border-b pb-2.5" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold font-sans" style={{ color: 'var(--text-primary)' }}>{project.id}</span>
            <span>//</span>
            <span className="truncate max-w-[160px] sm:max-w-none" style={{ color: 'var(--text-secondary)' }}>{project.client}</span>
          </div>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
        </div>

        {/* Adjusted Image Preview */}
        <div className="relative rounded-xl overflow-hidden border transition-all duration-300 aspect-[16/10] w-full" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)' }}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.imageBg} p-4 flex flex-col justify-center items-center text-center space-y-2`}>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg font-bold text-white">
                {project.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{project.name}</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">{project.category}</p>
              </div>
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div>
          <span className="text-[10px] font-sans tracking-[0.18em] uppercase block font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-light font-sans transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
            {project.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs font-light leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
      </div>

      {/* Bottom Simplified Action Footer */}
      <div className="pt-3 border-t flex items-center justify-between relative z-10 mt-3" style={{ borderColor: 'var(--border-primary)' }}>
        <span className="text-[11px] font-sans tracking-[0.14em] uppercase transition-colors" style={{ color: 'var(--text-secondary)' }}>
          {project.behanceUrl ? 'View Behance Case Study ↗' : 'View Case Study →'}
        </span>
        <div className="w-7 h-7 rounded-full border flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 flex-shrink-0" style={{ background: 'var(--toggle-bg)', borderColor: 'var(--border-nav)', color: 'var(--text-primary)' }}>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
    if (project.behanceUrl) {
      window.open(project.behanceUrl, '_blank', 'noopener,noreferrer')
    } else {
      navigate(`/project/${project.slug}`)
    }
  }

  return (
    <section id="work" className="w-full py-20 px-6 sm:px-12 lg:px-16 border-t" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 border-b gap-6" style={{ borderColor: 'var(--border-primary)' }}>
          <div>
            <div className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: 'var(--text-primary)' }}></span>
              <span>01 / FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mt-3 font-sans" style={{ color: 'var(--text-primary)' }}>
              Selected work
            </h2>
          </div>
          <p className="text-xs font-sans uppercase tracking-[0.18em] font-medium max-w-xs sm:text-right" style={{ color: 'var(--text-secondary)' }}>
            UI/UX · Graphic Design · Research
            <span className="block font-medium mt-1" style={{ color: 'var(--text-primary)' }}>2024 – 2026 ARCHIVE</span>
          </p>
        </div>

        {/* 2-Column Side by Side Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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



