import { motion } from 'framer-motion'

const specialties = [
  'UI/UX Design',
  'UX Research',
  'Interaction Design',
  'Visual Design',
  'Branding',
]

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column Label */}
        <div className="lg:col-span-4 font-mono text-xs text-[#8A8A8A] uppercase tracking-widest">
          <span>02 — ABOUT</span>
        </div>

        {/* Right Column Editorial Text & Capabilities */}
        <div className="lg:col-span-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-2xl sm:text-4xl lg:text-5xl font-light leading-[1.2] text-[#F5F5F5] font-sans"
          >
            <p>
              I'm Humanshu Araspure, a UI/UX designer focused on creating clear, useful and visually thoughtful digital experiences.
            </p>
            <p className="text-[#8A8A8A]">
              My work sits at the intersection of user experience, visual design and problem solving.
            </p>
          </motion.div>

          {/* Core Discipline Tags */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-widest block">Capabilities & Expertise</span>
            <div className="flex flex-wrap gap-3">
              {specialties.map((spec) => (
                <span 
                  key={spec}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 font-mono text-xs text-neutral-300 hover:border-white/40 hover:text-white transition-colors"
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
