import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Understand',
    description: 'Research the problem, users and context.',
  },
  {
    number: '02',
    title: 'Define',
    description: 'Turn insights into a clear problem statement.',
  },
  {
    number: '03',
    title: 'Explore',
    description: 'Generate and test possible solutions.',
  },
  {
    number: '04',
    title: 'Design',
    description: 'Create intuitive and visually refined experiences.',
  },
  {
    number: '05',
    title: 'Validate',
    description: 'Test, learn and iterate.',
  },
]

export default function ProcessSection() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-16 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase">03 — METHODOLOGY</span>
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mt-3 font-sans">
              How I work
            </h2>
          </div>
        </div>

        {/* Process Steps */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 items-center gap-4 sm:gap-6 group hover:bg-white/[0.02] transition-colors px-2 sm:px-4 rounded-xl"
            >
              <div className="md:col-span-2 font-mono text-xs text-[#8A8A8A] tracking-widest">
                {step.number} —
              </div>
              <div className="md:col-span-4 font-mono text-xl sm:text-2xl text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                {step.title}
              </div>
              <div className="md:col-span-6 text-sm sm:text-base text-[#8A8A8A] font-light leading-relaxed font-sans">
                {step.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
