import Header from '../components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Header />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 min-h-screen flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="py-10 border-b border-neutral-800/80">
            <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full mb-4">
              Background & Experience
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              About Me
            </h1>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              I am a passionate Frontend Developer dedicated to creating clean, performant, and intuitive web applications.
            </p>
          </div>

          {/* Bio & Details */}
          <div className="py-10 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold font-mono text-white">What I Do</h2>
              <p className="text-slate-400">
                I specialize in modern React architectures, component-driven UI libraries, and responsive interface engineering. My goal is to build web experiences that combine rich aesthetics with scalable code structure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6">
                <h3 className="text-base font-bold font-mono text-white mb-3">Frontend Development</h3>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  React.js, ES6+ JavaScript, Tailwind CSS v4, HTML5, CSS3, Vite, Single Page Applications & Routing.
                </p>
              </div>

              <div className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6">
                <h3 className="text-base font-bold font-mono text-white mb-3">UI/UX Architecture</h3>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  Design Systems, Storybook, Component Libraries, Dark Mode, Glassmorphism, Micro-Animations.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl cursor-pointer">
                <a href="mailto:araspurehumanshu@gmail.com">
                  Get In Touch ↗
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-neutral-800 bg-neutral-900 text-slate-200 font-mono text-xs uppercase tracking-wider rounded-xl cursor-pointer">
                <Link to="/work">Browse Portfolio</Link>
              </Button>
            </div>
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

export default About
