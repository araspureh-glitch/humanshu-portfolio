import { motion } from 'framer-motion'

const projects = [
  {
    id: '01',
    name: 'Flex Step',
    category: 'UI/UX / E-commerce',
    year: '2026',
    description: 'Next-gen e-commerce experience focused on seamless motion and conversion architecture.',
    imageBg: 'from-[#121215] to-[#1a1a20]',
    accentColor: '#34d399',
  },
  {
    id: '02',
    name: 'EcoGrid',
    category: 'Smart City Energy Dashboard',
    year: '2025',
    description: 'Complex data visualization platform monitoring real-time urban energy distribution.',
    imageBg: 'from-[#10141d] to-[#161c2b]',
    accentColor: '#60a5fa',
  },
  {
    id: '03',
    name: 'Itinero',
    category: 'Travel / Checklist Mobile Experience',
    year: '2025',
    description: 'Intelligent travel itinerary app with offline-first sync and dynamic route mapping.',
    imageBg: 'from-[#181512] to-[#26201b]',
    accentColor: '#fb923c',
  },
  {
    id: '04',
    name: 'Lynk Sweets',
    category: 'Mobile App UI/UX',
    year: '2025',
    description: 'Bespoke ordering experience for artisanal confectionery and local bakeries.',
    imageBg: 'from-[#1a1216] to-[#281b23]',
    accentColor: '#f472b6',
  },
  {
    id: '05',
    name: 'Seed to Soul',
    category: 'Mobile App UI/UX',
    year: '2024',
    description: 'Holistic wellness tracker with minimal spatial UI and calm micro-interactions.',
    imageBg: 'from-[#121815] to-[#1b2621]',
    accentColor: '#a7f3d0',
  },
  {
    id: '06',
    name: 'Hgraphix',
    category: 'Brand Identity',
    year: '2024',
    description: 'Minimalist identity system and typography guidelines for a creative studio.',
    imageBg: 'from-[#161616] to-[#222222]',
    accentColor: '#e5e5e5',
  },
]

export default function SelectedWorkSection() {
  return (
    <section id="work" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-16 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase">01 — SELECTED WORK</span>
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mt-3 font-sans">
              Selected work
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-widest">
            (2024 — 2026 ARCHIVE)
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Large Visual Area */}
              <div className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br ${project.imageBg} border border-white/10 transition-all duration-500 group-hover:border-white/30 shadow-2xl`}>
                
                {/* Abstract Minimal Graphic Pattern inside card */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full border border-white/5 rounded-xl flex flex-col justify-between p-6 transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                      <span>PROJECT //{project.id}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:translate-x-1 transition-transform duration-300">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Top Right Arrow Indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              {/* Project Info Below Card */}
              <div className="pt-6 flex flex-col justify-between gap-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-white font-medium tracking-wider">{project.name}</span>
                  <span className="text-xs text-[#8A8A8A]">{project.category}</span>
                </div>
                <p className="text-xs text-[#8A8A8A] leading-relaxed font-sans font-normal font-light">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
