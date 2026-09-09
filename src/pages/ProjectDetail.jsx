import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projectsData'
import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import BackgroundAudio from '../components/BackgroundAudio'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const projectIndex = projects.findIndex((p) => p.slug === slug || p.id === slug)
  const project = projects[projectIndex] || projects[0]

  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  const cs = project.caseStudy || {}

  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#0A66C2] selection:text-white min-h-screen pt-24">
      <CustomCursor />
      <Navigation />
      <BackgroundAudio videoId="16jA-6hiSUo" />

      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 space-y-16">
        {/* Back Link & Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Work</span>
          </button>
          
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <span className="text-[#0A66C2] font-bold">CASE STUDY {project.id}</span>
            <span>/</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Project Main Hero Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3.5 py-1 rounded-full bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] font-semibold tracking-wider">
              {project.category}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">{project.client}</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-light text-white tracking-tight leading-[1.05]">
            {project.name}
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-4xl">
            {project.subtitle}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 font-mono text-xs">
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-neutral-500 block uppercase tracking-wider mb-1">Role</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-neutral-500 block uppercase tracking-wider mb-1">Timeline</span>
              <span className="text-white font-medium">{project.timeline}</span>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-neutral-500 block uppercase tracking-wider mb-1">Client</span>
              <span className="text-white font-medium">{project.client}</span>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <span className="text-neutral-500 block uppercase tracking-wider mb-1">Tools</span>
              <span className="text-white font-medium">{project.tools ? project.tools.join(', ') : 'Figma, Motion'}</span>
            </div>
          </div>
        </motion.div>

        {/* Cover Image or Interactive UI Preview */}
        {project.coverImage ? (
          <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
            <img 
              src={project.coverImage} 
              alt={project.name} 
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        ) : (
          <div className={`w-full h-96 rounded-3xl border border-white/10 bg-gradient-to-br ${project.imageBg || 'from-neutral-900 to-black'} p-12 flex flex-col justify-center items-center text-center space-y-4 shadow-2xl relative overflow-hidden`}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold font-mono text-[#0A66C2] shadow-xl">
              {project.id}
            </div>
            <h3 className="text-3xl font-light text-white">{project.name} Digital Prototype</h3>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-md">
              High-fidelity UI/UX design system & spatial interaction architecture
            </p>
          </div>
        )}

        {/* Deep Dive Case Study Content */}
        <div className="space-y-16 pt-8 border-t border-white/10">
          
          {/* Executive Overview */}
          {cs.overview && (
            <section className="space-y-4">
              <span className="font-mono text-xs text-[#0A66C2] uppercase tracking-widest block font-semibold">
                01 // EXECUTIVE OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white">The Challenge & Vision</h2>
              <p className="text-lg text-neutral-300 font-light leading-relaxed">
                {cs.overview}
              </p>
            </section>
          )}

          {/* Problem & Solution Grid */}
          {cs.problem && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.02] space-y-4">
                <span className="font-mono text-xs text-red-400 uppercase tracking-widest block font-semibold">
                  THE PROBLEM
                </span>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                  {cs.problem}
                </p>
              </div>

              {cs.finalOutcome && (
                <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.02] space-y-4">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block font-semibold">
                    THE OUTCOME
                  </span>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                    {cs.finalOutcome}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Research & Key Insights */}
          {cs.insights && cs.insights.length > 0 && (
            <section className="space-y-6 p-8 rounded-3xl border border-white/10 bg-white/[0.015]">
              <span className="font-mono text-xs text-[#0A66C2] uppercase tracking-widest block font-semibold">
                02 // RESEARCH & KEY INSIGHTS
              </span>
              {cs.research && (
                <p className="text-neutral-300 text-base font-light leading-relaxed">
                  {cs.research}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {cs.insights.map((insight, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-white/10 bg-black/40 space-y-2">
                    <span className="font-mono text-xs text-[#0A66C2] font-bold">0{idx + 1}</span>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Process & Execution Steps */}
          <section className="space-y-8">
            <span className="font-mono text-xs text-[#0A66C2] uppercase tracking-widest block font-semibold">
              03 // PROCESS & EXECUTION
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cs.userJourney && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-widest">User Journey</h4>
                  <p className="text-sm text-neutral-200 font-light leading-relaxed">{cs.userJourney}</p>
                </div>
              )}
              {cs.visualDesign && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Visual Design System</h4>
                  <p className="text-sm text-neutral-200 font-light leading-relaxed">{cs.visualDesign}</p>
                </div>
              )}
              {cs.prototype && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Prototyping</h4>
                  <p className="text-sm text-neutral-200 font-light leading-relaxed">{cs.prototype}</p>
                </div>
              )}
              {cs.reflection && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Reflection</h4>
                  <p className="text-sm text-neutral-200 font-light leading-relaxed">{cs.reflection}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Prev / Next Case Study Navigation Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-16 border-t border-white/10">
          <Link
            to={`/project/${prevProject.slug}`}
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
          >
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
              ← Previous Project
            </span>
            <div>
              <span className="font-mono text-xs text-[#0A66C2] block mb-1">{prevProject.category}</span>
              <h4 className="text-2xl font-light text-white font-sans">{prevProject.name}</h4>
            </div>
          </Link>

          <Link
            to={`/project/${nextProject.slug}`}
            className="group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 sm:text-right"
          >
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
              Next Project →
            </span>
            <div>
              <span className="font-mono text-xs text-[#0A66C2] block mb-1">{nextProject.category}</span>
              <h4 className="text-2xl font-light text-white font-sans">{nextProject.name}</h4>
            </div>
          </Link>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </div>
  )
}
