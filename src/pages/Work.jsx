import Header from '../components/Header'
import { Button } from '@/components/ui/button'

function Work() {
  const projects = [
    {
      title: "Interactive AI Agent Workspace",
      description: "A futuristic web dashboard built with React and Tailwind CSS featuring dynamic task execution and real-time state visualization.",
      tags: ["React", "Tailwind CSS", "Vite", "AI Workflow"],
      link: "https://github.com/araspureh-glitch/humanshu-portfolio"
    },
    {
      title: "Design System Storybook",
      description: "Comprehensive UI component library showcasing customizable, accessible, and themeable React components.",
      tags: ["React", "Storybook", "Tailwind CSS", "UI/UX"],
      link: "https://github.com/araspureh-glitch/humanshu-portfolio"
    },
    {
      title: "Full-Stack Portfolio Portal",
      description: "Personal portfolio website featuring dark glassmorphism aesthetics, responsive layouts, and interactive project showcases.",
      tags: ["JavaScript", "Tailwind v4", "Vite", "Responsive"],
      link: "https://github.com/araspureh-glitch/humanshu-portfolio"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 min-h-screen flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="py-10 border-b border-neutral-800/80">
            <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full mb-4">
              Portfolio & Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              My Work
            </h1>
            <p className="mt-4 text-slate-400 max-w-xl text-base leading-relaxed">
              A curated collection of web applications, component libraries, and frontend interfaces built with React, Vite, and modern styling tools.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#141417] border border-neutral-800/90 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div>
                  <h2 className="text-xl font-bold font-mono text-white mb-3">{item.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{item.description}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full border-neutral-800 bg-neutral-900 text-xs font-mono tracking-wider hover:bg-neutral-800 text-emerald-400 cursor-pointer">
                    <a href={item.link} target="_blank" rel="noreferrer">
                      View Code ↗
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} Humanshu. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for opportunities
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Work
