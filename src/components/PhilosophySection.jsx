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
      tag: 'RESEARCH',
      title: 'Understand the problem',
      desc: 'Deep user research and context synthesis before placing a single pixel on screen.'
    },
    {
      num: '02',
      tag: 'EMPATHY',
      title: 'Design for people',
      desc: 'Creating accessible, inclusive, and human-centered workflows that prioritize clarity.'
    },
    {
      num: '03',
      tag: 'SIMPLICITY',
      title: 'Simplify the experience',
      desc: 'Stripping away cognitive friction to make complex systems feel effortless.'
    },
    {
      num: '04',
      tag: 'CRAFT',
      title: 'Sweat the details',
      desc: 'Crafting pixel-precise visual grids, fluid micro-interactions, and robust design tokens.'
    }
  ]

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Main Philosophy Statement */}
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 font-sans text-[11px] text-neutral-400 uppercase tracking-[0.18em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
            <span>03 / DESIGN PHILOSOPHY</span>
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

        {/* Four Principles Editorial Grid */}
        <div className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#08080a] rounded-2xl overflow-hidden shadow-2xl">
            {principles.map((p, idx) => (
              <motion.div 
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 sm:p-10 flex flex-col justify-between min-h-[300px] hover:bg-gradient-to-b hover:from-white/[0.04] hover:to-transparent transition-all duration-500 ease-out cursor-default"
              >
                {/* Subtle Hover Ambient Glow */}
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                {/* Header Meta */}
                <div className="flex items-center justify-between font-sans text-[11px] text-neutral-500 relative z-10">
                  <span className="text-emerald-400/90 font-semibold tracking-wider group-hover:text-emerald-300 transition-colors">
                    {p.num}
                  </span>
                  <span className="uppercase tracking-widest text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors font-medium">
                    {p.tag || 'PRINCIPLE'}
                  </span>
                </div>

                {/* Main Content */}
                <div className="space-y-4 my-8 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-light text-white font-sans tracking-tight group-hover:translate-x-1.5 transition-transform duration-300 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {p.desc}
                  </p>
                </div>

                {/* Footer Micro Tag & Animated Bottom Accent Line */}
                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-sans font-medium tracking-wider text-neutral-500">
                  <span className="group-hover:text-neutral-300 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>0{idx + 1} // FOCUS</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform text-neutral-600 group-hover:text-emerald-400">
                    →
                  </span>
                </div>

                {/* Hairline Bottom Progress Highlight on Hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
