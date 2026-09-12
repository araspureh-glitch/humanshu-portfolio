import { motion } from 'framer-motion'
import { Carousel360 } from './ui/image-fan-carousel'

export default function FloatingHobbiesCloud() {
  return (
    <section 
      id="hobbies"
      className="relative w-full bg-[#050505] text-[#F5F5F5] overflow-hidden py-24 sm:py-32 px-6 sm:px-12 flex flex-col justify-center items-center border-t border-b border-white/10 select-none"
    >
      {/* Background Spatial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#EA5211]/[0.06] blur-[180px]" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-amber-500/[0.04] blur-[160px]" />
        
        {/* Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-10 flex flex-col items-center">
        {/* Central Editorial Header Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl text-[11px] font-sans font-medium text-neutral-300 uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA5211] animate-ping" />
            <span>06 / PERSONAL INTERESTS & HOBBIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] font-sans">
            What fuels <br />
            <span className="font-serif italic text-[#EA5211] font-normal" style={{ fontFamily: '"Instrument Serif", "Alex Brush", serif' }}>
              my everyday
            </span> energy.
          </h2>

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
