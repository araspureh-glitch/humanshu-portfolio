import Header from '../components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Home() {
  const projects = [
    {
      title: "Interactive AI Agent Workspace",
      description: "A futuristic web dashboard built with React and Tailwind CSS featuring dynamic task execution and real-time state visualization.",
      tags: ["React", "Tailwind CSS", "Vite", "AI Workflow"]
    },
    {
      title: "Design System Storybook",
      description: "Comprehensive UI component library showcasing customizable, accessible, and themeable React components.",
      tags: ["React", "Storybook", "Tailwind CSS", "UI/UX"]
    },
    {
      title: "Full-Stack Portfolio Portal",
      description: "Personal portfolio website featuring dark glassmorphism aesthetics, responsive layouts, and interactive project showcases.",
      tags: ["JavaScript", "Tailwind v4", "Vite", "Responsive"]
    }
  ]

  const skills = [
    "JavaScript (ES6+)", "React.js", "Tailwind CSS v4", "HTML5 & CSS3", 
    "Vite & Build Tools", "Git & GitHub", "REST APIs", "UI/UX Architecture"
  ]

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Header />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col justify-between min-h-screen">
        {/* Hero Section */}
        <section className="py-12 border-b border-neutral-800/80">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Frontend Developer & UI Architect
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-[1.1]">
              Humanshu
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
              Crafting performant, visually impressive, and modern web experiences using React, Vite, and Tailwind CSS.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 cursor-pointer">
                <Link to="/work">View My Work ↗</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-slate-200 font-mono text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                <Link to="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Projects Grid */}
        <section className="py-12 border-b border-neutral-800/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Featured Projects</h2>
            <Link to="/work" className="text-xs font-mono text-emerald-400 hover:underline">View All ↗</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#141417] border border-neutral-800/90 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors font-mono">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">Skills & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {skills.map((skill, idx) => (
              <div 
                key={idx} 
                className="p-3.5 bg-[#141417] border border-neutral-800/80 rounded-xl text-center font-mono text-xs text-slate-300 hover:border-emerald-500/40 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

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

export default Home
