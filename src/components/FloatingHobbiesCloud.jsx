import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const HOBBY_CARDS = [
  {
    id: 1,
    title: 'Fitness & Gym',
    tag: 'STRENGTH',
    image: '/hobbies/fitness.jpg',
    size: 'w-48 h-64 sm:w-56 sm:h-72',
    position: 'top-[8%] left-[8%] sm:left-[12%]',
    rotation: -14,
    zIndex: 20,
    blur: 'blur-none',
    opacity: 0.95,
    floatAnimation: {
      y: [0, -18, 12, -8, 0],
      x: [0, 14, -10, 8, 0],
      rotate: [-14, -8, -18, -11, -14],
      scale: [1, 1.03, 0.98, 1.02, 1],
    },
    duration: 9.4,
    delay: 0,
  },
  {
    id: 2,
    title: 'Football / Turf',
    tag: 'SPORTS',
    image: '/hobbies/football.jpg',
    size: 'w-44 h-60 sm:w-52 sm:h-68',
    position: 'top-[4%] left-[42%] sm:left-[45%]',
    rotation: 8,
    zIndex: 15,
    blur: 'blur-[0.5px]',
    opacity: 0.88,
    floatAnimation: {
      y: [0, 16, -14, 10, 0],
      x: [0, -12, 16, -8, 0],
      rotate: [8, 14, 4, 11, 8],
      scale: [1, 0.97, 1.04, 0.99, 1],
    },
    duration: 11.2,
    delay: 0.8,
  },
  {
    id: 3,
    title: 'Cricket Action',
    tag: 'ATHLETIC',
    image: '/hobbies/cricket.jpg',
    size: 'w-52 h-72 sm:w-60 sm:h-80',
    position: 'top-[12%] right-[6%] sm:right-[10%]',
    rotation: -9,
    zIndex: 25,
    blur: 'blur-none',
    opacity: 0.98,
    floatAnimation: {
      y: [0, -22, 14, -12, 0],
      x: [0, -16, 12, -10, 0],
      rotate: [-9, -4, -14, -7, -9],
      scale: [1, 1.02, 0.97, 1.03, 1],
    },
    duration: 10.6,
    delay: 0.4,
  },
  {
    id: 4,
    title: 'Travel & Heritage',
    tag: 'EXPLORATION',
    image: '/hobbies/travel.jpg',
    size: 'w-56 h-76 sm:w-64 sm:h-84',
    position: 'bottom-[12%] left-[6%] sm:left-[8%]',
    rotation: 12,
    zIndex: 30,
    blur: 'blur-none',
    opacity: 0.95,
    floatAnimation: {
      y: [0, 18, -16, 8, 0],
      x: [0, 15, -12, 10, 0],
      rotate: [12, 17, 7, 14, 12],
      scale: [1, 0.98, 1.03, 0.99, 1],
    },
    duration: 12.8,
    delay: 1.2,
  },
  {
    id: 5,
    title: 'Lifestyle & Vibe',
    tag: 'LIFESTYLE',
    image: '/hobbies/lifestyle.jpg',
    size: 'w-48 h-64 sm:w-56 sm:h-72',
    position: 'bottom-[8%] right-[8%] sm:right-[12%]',
    rotation: -15,
    zIndex: 22,
    blur: 'blur-none',
    opacity: 0.92,
    floatAnimation: {
      y: [0, -15, 20, -10, 0],
      x: [0, -14, 18, -6, 0],
      rotate: [-15, -10, -20, -12, -15],
      scale: [1, 1.04, 0.96, 1.01, 1],
    },
    duration: 9.8,
    delay: 0.6,
  },
  {
    id: 6,
    title: 'UI/UX Crafting',
    tag: 'CREATIVITY',
    image: '/hobbies/design.png',
    size: 'w-44 h-56 sm:w-48 sm:h-64',
    position: 'top-[38%] left-[2%] sm:left-[4%]',
    rotation: -6,
    zIndex: 10,
    blur: 'blur-[1px]',
    opacity: 0.82,
    floatAnimation: {
      y: [0, 14, -18, 12, 0],
      x: [0, 18, -14, 8, 0],
      rotate: [-6, -2, -10, -5, -6],
      scale: [1, 0.96, 1.02, 0.98, 1],
    },
    duration: 13.5,
    delay: 1.5,
  },
  {
    id: 7,
    title: 'Music & Beats',
    tag: 'RHYTHM',
    image: '/hobbies/music.png',
    size: 'w-44 h-56 sm:w-48 sm:h-64',
    position: 'bottom-[4%] left-[40%] sm:left-[42%]',
    rotation: 7,
    zIndex: 12,
    blur: 'blur-[0.5px]',
    opacity: 0.85,
    floatAnimation: {
      y: [0, -16, 12, -14, 0],
      x: [0, -10, 15, -12, 0],
      rotate: [7, 12, 3, 9, 7],
      scale: [1, 1.03, 0.97, 1.02, 1],
    },
    duration: 11.8,
    delay: 0.9,
  },
  {
    id: 8,
    title: 'Photography',
    tag: 'VISUALS',
    image: '/hobbies/photography.png',
    size: 'w-48 h-60 sm:w-52 sm:h-68',
    position: 'top-[36%] right-[2%] sm:right-[4%]',
    rotation: 14,
    zIndex: 18,
    blur: 'blur-none',
    opacity: 0.9,
    floatAnimation: {
      y: [0, 20, -12, 16, 0],
      x: [0, -18, 10, -14, 0],
      rotate: [14, 19, 9, 16, 14],
      scale: [1, 0.97, 1.03, 0.98, 1],
    },
    duration: 10.2,
    delay: 0.3,
  },
]

export default function FloatingHobbiesCloud() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setActiveCard(null)
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[920px] bg-[#050505] text-[#F5F5F5] overflow-hidden py-24 px-6 sm:px-12 flex flex-col justify-center items-center border-t border-b border-white/10 select-none"
    >
      {/* Background Spatial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0A66C2]/[0.06] blur-[160px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/[0.03] blur-[150px]" />
        
        {/* Subtle Grid Backdrop overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Central Editorial Header Overlay */}
      <div className="relative z-30 max-w-2xl mx-auto text-center space-y-4 pointer-events-none my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl text-[11px] font-mono text-neutral-300 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-ping" />
          <span>BEYOND DESIGN // HOBBIES & PASSIONS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05] font-sans">
          What fuels <br />
          <span className="font-serif italic text-[#0A66C2] font-normal" style={{ fontFamily: '"Instrument Serif", "Alex Brush", serif' }}>
            my everyday
          </span> energy.
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
          From fitness & sports to travel and design exploration—hover over any suspended card to bring it into focus.
        </p>
      </div>

      {/* 3D Suspended Floating Image Card Cloud Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-10">
        {HOBBY_CARDS.map((card) => {
          const isHovered = activeCard === card.id

          // Parallax factors based on card depth
          const parallaxX = mousePos.x * (card.zIndex * 1.5)
          const parallaxY = mousePos.y * (card.zIndex * 1.5)

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : card.opacity,
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 0 : card.rotation,
                x: parallaxX,
                y: parallaxY,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ zIndex: isHovered ? 50 : card.zIndex }}
              className={`absolute ${card.position} cursor-pointer group`}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Continuous Slow Organic Floating Loop */}
              <motion.div
                animate={isHovered ? {} : card.floatAnimation}
                transition={
                  isHovered
                    ? {}
                    : {
                        duration: card.duration,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: card.delay,
                      }
                }
                className={`relative ${card.size} rounded-3xl overflow-hidden border transition-all duration-500 shadow-2xl ${
                  isHovered
                    ? 'border-white/60 shadow-[0_25px_60px_rgba(10,102,194,0.4)] blur-none'
                    : `border-white/15 ${card.blur} shadow-[0_15px_35px_rgba(0,0,0,0.7)] group-hover:border-white/40`
                }`}
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Translucent Glass Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Hover Card Badge Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end space-y-1 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#0A66C2] font-semibold uppercase">
                    <span>{card.tag}</span>
                    <span>0{card.id}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-light text-white font-sans tracking-tight">
                    {card.title}
                  </h4>
                </div>

                {/* Subtle Edge Shine Effect */}
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none group-hover:border-white/50 transition-colors" />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
