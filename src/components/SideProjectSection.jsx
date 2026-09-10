import { motion } from 'framer-motion'

export default function SideProjectSection() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-24 sm:py-32 px-6 sm:px-12 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Section Heading & Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white tracking-tight font-normal drop-shadow-sm">
            Thanks for visiting
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed">
            I am also building a side project; it's about typefaces. We know how hard it is to find the perfect typeface for your next project. As a type maniac, I am here to help you.
          </p>
        </motion.div>

        {/* Vector Font Feature Display (Image 2 with Bezier Nodes styling) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative inline-block mt-8 group"
        >
          {/* Main Logo Container */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-neutral-900/80 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-white/35 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]">
            <img 
              src="/typeface-logo.png" 
              alt="Typeface Side Project - ha logo" 
              className="w-48 h-48 sm:w-72 sm:h-72 object-contain mx-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* Interactive Vector Bezier Control Handles (Figma/Vector Editor Aesthetic) */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* Top-left node */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full border border-pink-400 bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
              <div className="absolute top-4 left-4 w-12 h-px bg-dashed border-t border-pink-400/60 -rotate-45" />

              {/* Top-right node */}
              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full border border-pink-400 bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
              
              {/* Bottom-left node */}
              <div className="absolute bottom-4 left-4 w-2.5 h-2.5 rounded-full border border-pink-400 bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />

              {/* Bottom-right node */}
              <div className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full border border-pink-400 bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />

              {/* Center control handle lines */}
              <div className="absolute top-1/2 left-6 right-6 h-px border-t border-dashed border-white/20" />
            </div>
          </div>

          {/* Badge Tag */}
          <div className="mt-6 flex justify-center items-center gap-2 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse"></span>
            <span>Typeface Project · In Development</span>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
