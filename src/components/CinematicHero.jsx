import { motion, useScroll, useTransform } from 'framer-motion'

export default function CinematicHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4])

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#050505] text-[#F5F5F5] overflow-hidden flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-10">
      
      {/* High-Resolution Portrait Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <img
          src="/hero.jpg"
          alt="Humanshu Araspure - UI/UX Designer"
          className="w-full h-full object-cover object-[55%_25%] sm:object-[75%_20%] opacity-90 contrast-115 brightness-90 transition-all duration-700"
        />

        {/* Cinematic Subtle Gradient Overlays for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
      </motion.div>

      {/* Subtle Noise Grain Texture Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* UPPER SECTION: Intro Text & Right Positioning */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4 sm:pt-8">
        
        {/* Upper Left: Small Intro Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-6 space-y-1 font-mono text-[11px] sm:text-xs text-[#8A8A8A] tracking-wider leading-relaxed max-w-sm"
        >
          <p className="text-white font-medium">UI/UX Designer.</p>
          <p>I turn complex problems into simple,</p>
          <p>meaningful digital experiences.</p>
        </motion.div>

        {/* Upper Right: Positioning Label & Coordinates */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:col-span-6 flex flex-col md:items-end justify-between space-y-2 text-right font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] tracking-widest uppercase"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-medium">UI / UX DESIGNER</span>
          </div>
          <p className="text-neutral-400">Based in India — 20.5937° N, 78.9629° E</p>
        </motion.div>

      </div>

      {/* LOWER SECTION: Main Editorial Headline & Scroll Explorer */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-4">
        
        {/* Lower Left: Large Editorial Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="lg:col-span-9"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-extralight text-[#F5F5F5] tracking-tight leading-[0.95] max-w-4xl font-sans drop-shadow-lg">
            Designing digital experiences that people actually want to use.
          </h1>
        </motion.div>

        {/* Lower Right / Bottom Left: Scroll to explore */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="lg:col-span-3 flex lg:justify-end items-center"
        >
          <a 
            href="#work" 
            className="group flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-[#8A8A8A] hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
              <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </motion.div>

      </div>

      {/* Fine Horizontal Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-10" />
    </section>
  )
}
