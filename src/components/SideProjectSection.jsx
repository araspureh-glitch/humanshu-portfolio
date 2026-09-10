import { motion } from 'framer-motion'

export default function SideProjectSection() {
  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-28 sm:py-36 px-6 border-t border-white/10 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        
        {/* Title & Copy */}
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

        {/* Vector Font Frame Graphic (Exact Match to Inspo Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative inline-block"
        >
          {/* Outer Rounded Vector Container Frame */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[36px] bg-black border border-white/20 p-5 sm:p-6 shadow-2xl flex items-center justify-center group hover:border-white/40 transition-all duration-500">
            
            {/* Top-Left Pink Diagonal Handle Line */}
            <div className="absolute -top-3 -left-3 w-8 h-px bg-[#ff55a5] -rotate-45 pointer-events-none opacity-80" />

            {/* 4 Pink Corner Nodes */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#ff55a5] shadow-[0_0_10px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#ff55a5] shadow-[0_0_10px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#ff55a5] shadow-[0_0_10px_#ff55a5] border border-white/40 z-30" />
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#ff55a5] shadow-[0_0_10px_#ff55a5] border border-white/40 z-30" />

            {/* Horizontal Center Guide Line */}
            <div className="absolute top-1/2 left-4 right-4 h-px border-b border-dashed border-white/20 pointer-events-none z-10" />

            {/* Inner Logo Graphic */}
            <div className="w-full h-full rounded-[26px] bg-black overflow-hidden flex items-center justify-center p-3 relative z-20">
              <img 
                src="/typeface-logo.png" 
                alt="Typeface Side Project Logo" 
                className="w-full h-full object-contain rounded-[20px]"
              />

              {/* Vector Editor Node Selection Ring (Top Right of 'a') */}
              <div className="absolute top-[38%] right-[22%] w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-xs flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] pointer-events-none z-30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
