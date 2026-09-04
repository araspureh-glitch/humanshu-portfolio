import { motion } from 'framer-motion'

export default function PersonalStatementSection() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase block"
        >
          STATEMENT // PHILOSOPHY
        </motion.span>

        <motion.blockquote 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-[#F5F5F5] tracking-tight leading-[1.15] font-sans max-w-5xl mx-auto"
        >
          “Good design isn't about adding more.{' '}
          <span className="text-[#8A8A8A]">It's about making the right things matter.”</span>
        </motion.blockquote>

      </div>
    </section>
  )
}
