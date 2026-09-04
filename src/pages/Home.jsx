import Header from '../components/Header'
import Hero from '../components/Hero'
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
    <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Header />
      <Hero />

      <div className="relative max-w-6xl mx-auto px-6 pb-16 flex flex-col justify-between">
        {/* Featured Projects Grid */}
        <section className="py-16 border-b border-neutral-800/80">
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
        <section className="py-16">
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
