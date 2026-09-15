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
        {/* Central Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-5 max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Minimal Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#262626] bg-[#09090b]/80 backdrop-blur-md text-[11px] font-mono text-neutral-300 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
            <span>06 • PERSONAL INTERESTS & HOBBIES</span>
          </div>

          {/* Aesthetic Heading Hierarchy */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] font-sans">
            What fuels <span className="font-serif italic text-[#EA5211] font-normal">my everyday energy.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
            From fitness & sports to pets, nature trails, and travel—rotate through the 3D ring to explore life beyond design.
          </p>
        </motion.div>

        {/* 3D 360 Fan Carousel Component */}
        <Carousel360 />
      </div>
    </section>
  )
}
