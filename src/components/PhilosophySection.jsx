import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  const color = useTransform(progress, range, ['#4a4a4a', '#ffffff'])

  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block mr-[0.25em] transition-colors duration-150"
    >
      {word}
    </motion.span>
  )
}

export default function PhilosophySection() {
  const quoteRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start 0.85', 'center 0.35'],
  })

  const quoteText = "“Good design isn't about adding more. It's about making the right things easier to understand.”"
  const words = quoteText.split(' ')

  const principles = [
    {
      num: '01',
      title: 'Understand the problem',
      desc: 'Deep user research and context synthesis before placing a single pixel on screen.'
    },
    {
      num: '02',
      title: 'Design for people',
      desc: 'Creating accessible, inclusive, and human-centered workflows that prioritize clarity.'
    },
    {
      num: '03',
      title: 'Simplify the experience',
      desc: 'Stripping away cognitive friction to make complex systems feel effortless.'
    },
    {
      num: '04',
      title: 'Sweat the details',
      desc: 'Crafting pixel-precise visual grids, fluid micro-interactions, and robust design tokens.'
    }
  ]

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Main Philosophy Statement */}
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
            <span>05 / DESIGN PHILOSOPHY</span>
          </div>

          <blockquote 
            ref={quoteRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.18] font-sans max-w-5xl mx-auto flex flex-wrap justify-center"
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <ScrollWord 
                  key={i} 
                  word={word} 
                  progress={scrollYProgress} 
                  range={[start, end]} 
                />
              )
            })}
          </blockquote>
        </div>

        {/* Four Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {principles.map((p) => (
            <div 
              key={p.num}
              className="group p-8 rounded-2xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.04] hover:border-[#0A66C2]/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-neutral-400">
                <span className="text-xl font-bold text-[#0A66C2] group-hover:scale-110 transition-transform">{p.num}</span>
                <span>PRINCIPLE</span>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xl font-light text-white font-sans group-hover:translate-x-1 transition-transform">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
