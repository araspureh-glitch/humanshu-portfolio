import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SideProjectSection() {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 3D tilt calculation
    const rotX = ((y - centerY) / centerY) * -10
    const rotY = ((x - centerX) / centerX) * 10
    setRotateX(rotX)
    setRotateY(rotY)

    // Percentage for spotlight and follower lens node
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-28 sm:py-36 px-6 border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle Background Radial Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        
        {/* Title & Description Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif italic text-white tracking-tight font-light leading-none drop-shadow-md">
            Thanks for visiting
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mx-auto px-4">
            I am also building a side project; it's about typefaces. We know how hard it is to find the perfect typeface for your next project. As a type maniac, I am here to help you.
          </p>
        </motion.div>

        {/* Interactive Vector Font Inspector Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative inline-block mt-4 perspective-1000"
        >
          {/* Top-Left Floating Diagonal Pink Handle Line (Outside Box with Floating Animation) */}
          <motion.div 
            animate={{ y: [0, -3, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-7 -left-7 w-8 h-px bg-[#ff55a5] -rotate-45 pointer-events-none shadow-[0_0_8px_#ff55a5] z-30"
          />

          {/* Main 3D Tilt Card Box */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-[36px] bg-[#050505] border border-white/15 p-6 shadow-2xl flex items-center justify-center overflow-hidden cursor-crosshair group will-change-transform"
          >
            
            {/* Interactive Radial Spotlight on Hover */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,85,165,0.08), transparent 70%)`
              }}
            />

            {/* 4 Glowing Pink Corner Nodes */}
            <div className="absolute top-5 left-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_14px_#ff55a5] border border-white/40 z-30 animate-pulse" />
            <div className="absolute top-5 right-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_14px_#ff55a5] border border-white/40 z-30 animate-pulse" />
            <div className="absolute bottom-5 left-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_14px_#ff55a5] border border-white/40 z-30 animate-pulse" />
            <div className="absolute bottom-5 right-5 w-3.5 h-3.5 rounded-full bg-[#ff55a5] shadow-[0_0_14px_#ff55a5] border border-white/40 z-30 animate-pulse" />

            {/* Left & Right Edge Midpoint Ticks */}
            <div className="absolute top-1/2 left-3 -translate-y-1/2 w-2 h-px bg-white/30 z-30" />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 w-2 h-px bg-white/30 z-30" />

            {/* Inner Logo Image */}
            <div className="w-full h-full flex items-center justify-center p-2 relative z-20">
              <img 
                src="/typeface-logo.png" 
                alt="Typeface Side Project Logo" 
                className="w-full h-full object-contain rounded-2xl select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Vector Selection Lens 1 (Top Loop of 'a') */}
              <motion.div 
                animate={{ scale: [1, 1.06, 1], y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[38%] right-[25%] w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 bg-black/50 backdrop-blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)] z-40 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
              </motion.div>

              {/* Vector Selection Lens 2 (Bottom Terminal of 'a' - matching prompt screenshot) */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], x: [0, 2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-[28%] right-[14%] w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/40 bg-black/50 backdrop-blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9)] z-40 pointer-events-none"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
              </motion.div>

              {/* Mouse Follower Interactive Vector Point Lens on Hover */}
              {isHovered && (
                <div 
                  className="absolute w-8 h-8 rounded-full border border-pink-400/80 bg-pink-500/20 backdrop-blur-xs flex items-center justify-center pointer-events-none z-50 transition-all duration-75 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,85,165,0.4)]"
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-pink-300 shadow-[0_0_6px_#ff55a5]" />
                </div>
              )}
            </div>

          </div>
        </motion.div>

        {/* Interactive Indicator Tag */}
        <div className="flex justify-center items-center gap-2.5 font-sans font-medium text-xs text-neutral-400 uppercase tracking-[0.18em] pt-2">
          <span className="w-2 h-2 rounded-full bg-[#ff55a5] animate-ping" />
          <span>Interactive Vector Type Inspector</span>
        </div>

      </div>
    </section>
  )
}
