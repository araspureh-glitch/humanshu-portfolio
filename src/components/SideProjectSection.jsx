import { motion } from 'framer-motion'

export default function SideProjectSection() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-28 sm:py-36 px-6 border-t border-white/10 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        
        {/* Title & Description Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif italic text-white tracking-tight font-light leading-none">
            Thanks for visiting
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mx-auto px-4">
            I am also building a side project; it's about typefaces. We know how hard it is to find the perfect typeface for your next project. As a type maniac, I am here to help you.
          </p>
        </motion.div>

        {/* Vector Font Frame Graphic - 1:1 Match to Uploaded Screenshot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative inline-block mt-4"
        >
          {/* Top-Left Floating Diagonal Pink Handle Line (Outside Box) */}
          <div className="absolute -top-7 -left-7 w-8 h-px bg-[#ff55a5] -rotate-45 pointer-events-none opacity-90 shadow-[0_0_6px_#ff55a5]" />

          {/* Main Rounded Dark Container Box */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-[36px] bg-[#050505] border border-white/15 p-6 shadow-2xl flex items-center justify-center overflow-hidden group">
            
            {/* 4 Pink Corner Nodes (Inside corners of box) */}
            <div className="absolute top-5 left-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_12px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute top-5 right-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_12px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute bottom-5 left-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_12px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute bottom-5 right-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_12px_#ff55a5] border border-white/40 z-30" />

            {/* Left & Right Edge Midpoint Ticks */}
            <div className="absolute top-1/2 left-3 -translate-y-1/2 w-2 h-px bg-white/20 z-30" />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 w-2 h-px bg-white/20 z-30" />

            {/* Inner Logo Image */}
            <div className="w-full h-full flex items-center justify-center p-2 relative z-20">
              <img 
                src="/typeface-logo.png" 
                alt="Typeface Side Project Logo" 
                className="w-full h-full object-contain rounded-2xl select-none pointer-events-none"
              />

              {/* Vector Selection Lens Cursor (Positioned over 'a' loop) */}
              <div className="absolute top-[38%] right-[25%] w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 bg-black/40 backdrop-blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] z-40 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_white]" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
