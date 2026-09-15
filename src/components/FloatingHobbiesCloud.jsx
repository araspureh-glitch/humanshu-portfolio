import { motion } from 'framer-motion'
import { Carousel360 } from './ui/image-fan-carousel'

export default function FloatingHobbiesCloud() {
  return (
    <section 
      id="hobbies"
      className="relative w-full bg-[#050505] text-[#F5F5F5] overflow-hidden py-20 sm:py-28 px-6 sm:px-12 flex flex-col justify-center items-center border-t border-b border-[#262626] select-none"
    >
      {/* Background Spatial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#EA5211]/[0.05] blur-[170px]" />
        
        {/* Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-8 flex flex-col items-center">
        {/* Central Editorial Header Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#141416] text-[10px] font-mono text-neutral-400 tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211]" />
            <span>06 • PERSONAL INTERESTS & HOBBIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15] font-sans">
            What fuels <br className="hidden sm:inline" />
            <span className="font-serif italic text-[#EA5211] font-normal pr-1" style={{ fontFamily: '"Instrument Serif", serif' }}>
              my everyday
            </span>{" "}
            energy.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
            From fitness & sports to pets, nature trails, and travel—rotate through the 3D ring to explore life beyond design.
          </p>
        </motion.div>

        {/* 3D 360 Fan Carousel Component */}
        <Carousel360 />
      </div>
    </section>
  )
}
