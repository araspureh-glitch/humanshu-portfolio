import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const specialties = [
  'UI/UX Design',
  'UX Research',
  'Interaction Design',
  'Visual Design',
  'Branding',
]

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

export default function AboutSection() {
  const paragraphRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'center 0.35'],
  })

  const textParagraph = "I'm Humanshu Araspure, a UI/UX designer focused on creating clear, useful and visually thoughtful digital experiences. My work sits at the intersection of user experience, visual design and problem solving."
  const words = textParagraph.split(' ')

  return (
    <section id="about" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column Label */}
        <div className="lg:col-span-4 font-mono text-[11px] text-[#8A8A8A] uppercase tracking-widest flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
          <span>02 / ABOUT</span>
        </div>

        {/* Right Column Editorial Text & Capabilities */}
        <div className="lg:col-span-8 space-y-12">
          
          <p 
            ref={paragraphRef}
            className="text-2xl sm:text-4xl lg:text-5xl font-light leading-[1.2] font-sans flex flex-wrap"
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
          </p>

          {/* Core Discipline Tags */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-widest block">Capabilities & Expertise</span>
            <div className="flex flex-wrap gap-3">
              {specialties.map((spec) => (
                <span 
                  key={spec}
                  className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 font-mono text-xs text-neutral-300 hover:bg-white hover:border-white hover:text-black hover:font-medium transition-all duration-300 cursor-pointer shadow-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
