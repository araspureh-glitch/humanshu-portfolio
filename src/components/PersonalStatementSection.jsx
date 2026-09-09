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

export default function PersonalStatementSection() {
  const quoteRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start 0.85', 'center 0.35'],
  })

  const quoteText = "“Good design isn't about adding more. It's about making the right things matter.”"
  const words = quoteText.split(' ')

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        
        <span className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase block">
          STATEMENT // PHILOSOPHY
        </span>

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
    </section>
  )
}
