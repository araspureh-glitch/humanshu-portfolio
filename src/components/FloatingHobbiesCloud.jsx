import { motion } from 'framer-motion'
import { Carousel360 } from './ui/image-fan-carousel'

export default function FloatingHobbiesCloud() {
  return (
    <section 
      id="hobbies"
      className="relative w-full bg-[#050505] text-[#F5F5F5] overflow-hidden py-24 sm:py-32 px-6 sm:px-12 flex flex-col justify-center items-center border-t border-b border-[#262626] select-none"
    >
      {/* Background Spatial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#EA5211]/[0.05] blur-[160px]" />
        
        {/* Subtle Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-10 flex flex-col items-center">
        {/* Editorial Split Header Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end pb-4 border-b border-[#262626]"
        >
          {/* Left Column: Category Badge & Main Heading */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#EA5211] uppercase tracking-[0.2em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
              <span>06 • PERSONAL INTERESTS & HOBBIES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15] font-sans">
              What fuels <span className="font-serif italic text-[#EA5211] font-normal">my everyday energy.</span>
            </h2>
          </div>

          {/* Right Column: Description & Hint */}
          <div className="md:col-span-5 space-y-3 md:pb-1">
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              From fitness & sports to pets, nature trails, and travel—explore life beyond design.
            </p>
            
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[#EA5211]">↻</span>
              <span>Drag or scroll to rotate 360° ring</span>
            </div>
          </div>
        </motion.div>

        {/* 3D 360 Fan Carousel Component */}
        <Carousel360 />
      </div>
    </section>
  )
}
