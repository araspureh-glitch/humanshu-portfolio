import { useState } from 'react'

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('ALL')

  const skillCategories = [
    {
      category: 'UX',
      title: 'UX & RESEARCH',
      items: ['User Research', 'User Flows', 'Information Architecture', 'Wireframing', 'Usability Testing']
    },
    {
      category: 'UI',
      title: 'UI & INTERACTION',
      items: ['Visual Design', 'Interaction Design', 'Design Systems', 'Responsive Design']
    },
    {
      category: 'GRAPHIC',
      title: 'GRAPHIC & BRANDING',
      items: ['Branding', 'Typography', 'Layout', 'Visual Communication']
    },
    {
      category: 'TOOLS',
      title: 'TOOLS & SOFTWARE',
      items: ['Figma', 'Illustrator', 'Photoshop', 'DaVinci Resolve', 'Krita']
    }
  ]

  const tabs = ['ALL', 'UX', 'UI', 'GRAPHIC', 'TOOLS']

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
              <span>04 / CORE DISCIPLINES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mt-3 font-sans">
              Skills & tools
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Typography-Based Skill Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories
            .filter((cat) => activeTab === 'ALL' || cat.category === activeTab)
            .map((cat) => (
              <div 
                key={cat.category}
                className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.035] hover:border-[#0A66C2]/40 transition-all duration-300 space-y-6 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                  <span className="text-[#0A66C2] font-bold">{cat.category} //</span>
                  <span className="text-neutral-400 uppercase tracking-widest">{cat.title}</span>
                </div>

                {/* Typography Pills with Interactive Glow & White Hover Effect */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {cat.items.map((item) => (
                    <div 
                      key={item}
                      className="group relative px-5 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <span className="font-sans text-lg sm:text-xl font-light text-white group-hover:text-black transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}
