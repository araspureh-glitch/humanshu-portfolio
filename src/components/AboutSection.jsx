import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Floating Tags Metadata with Z-depth, initial rotations, and responsive offsets
const tagsData = [
  { id: 'tag-1', label: 'UI/UX Designer', x: '-38%', y: '-32%', rotate: -6, zIndex: 30, color: 'from-blue-500/20 to-cyan-500/20' },
  { id: 'tag-2', label: 'Product Designer', x: '36%', y: '-36%', rotate: 5, zIndex: 25, color: 'from-purple-500/20 to-pink-500/20' },
  { id: 'tag-3', label: 'Visual Designer', x: '-42%', y: '5%', rotate: 4, zIndex: 20, color: 'from-[#EA5211]/30 to-orange-600/20' },
  { id: 'tag-4', label: 'Research', x: '42%', y: '2%', rotate: -7, zIndex: 35, color: 'from-emerald-500/20 to-teal-500/20' },
  { id: 'tag-5', label: 'Prototyping', x: '-34%', y: '40%', rotate: -4, zIndex: 15, color: 'from-amber-500/20 to-orange-500/20' },
  { id: 'tag-6', label: 'Figma', x: '32%', y: '38%', rotate: 6, zIndex: 30, color: 'from-pink-500/20 to-[#ff55a5]/20' },
  { id: 'tag-7', label: 'Interaction Design', x: '-12%', y: '-48%', rotate: 3, zIndex: 40, color: 'from-cyan-500/20 to-blue-500/20' },
  { id: 'tag-8', label: 'Creative Thinker', x: '10%', y: '46%', rotate: -5, zIndex: 25, color: 'from-violet-500/20 to-indigo-500/20' },
]

// Decorative Floating Stickers / Objects
const decorativeObjects = [
  { id: 'dec-1', icon: '✦', label: 'Sparkle', x: '-24%', y: '-18%', floatDelay: 0, size: 'text-xl text-amber-300' },
  { id: 'dec-2', icon: '🎯', label: 'Cursor', x: '24%', y: '-22%', floatDelay: 0.7, size: 'text-lg text-cyan-400' },
  { id: 'dec-3', icon: '📐', label: 'Grid', x: '-26%', y: '24%', floatDelay: 1.2, size: 'text-xl text-purple-400' },
  { id: 'dec-4', icon: '🎨', label: 'Palette', x: '26%', y: '22%', floatDelay: 0.4, size: 'text-xl text-pink-400' },
  { id: 'dec-5', icon: '⚡', label: 'Motion', x: '-48%', y: '-12%', floatDelay: 0.9, size: 'text-lg text-yellow-400' },
  { id: 'dec-6', icon: '📷', label: 'Lens', x: '48%', y: '-10%', floatDelay: 1.5, size: 'text-lg text-emerald-400' },
]

export default function AboutSection() {
  const [activeHoveredTag, setActiveHoveredTag] = useState(null)
  const [tagTilts, setTagTilts] = useState({})

  // Handle individual tag mouse move for cursor-relative physical tilt
  const handleTagMouseMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 to 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5

    setTagTilts((prev) => ({
      ...prev,
      [id]: {
        tiltY: relativeX * 18, // tilt left/right toward cursor
        tiltX: -relativeY * 14, // tilt up/down
      }
    }))
  }

  const handleTagMouseLeave = (id) => {
    setActiveHoveredTag(null)
    setTagTilts((prev) => ({
      ...prev,
      [id]: { tiltY: 0, tiltX: 0 }
    }))
  }

  return (
    <section id="about" className="w-full bg-[#050505] text-[#F5F5F5] py-28 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#8A8A8A] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-ping"></span>
              <span>02 / ABOUT ME</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight mt-2 font-sans">
              Human-centered UX & Visual Architecture
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-xs sm:text-right">
            Interactive Moodboard & Discipline Focus
          </p>
        </div>

        {/* MAIN COMPOSITION: INTERACTIVE FLOATING TAG PORTRAIT */}
        <div className="relative w-full min-h-[580px] sm:min-h-[680px] flex items-center justify-center py-12">
          
          {/* CENTER PORTRAIT WRAPPER WITH ANIMATED DASHED SELECTION FRAME */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            animate={{
              scale: activeHoveredTag ? 1.018 : 1,
              rotate: activeHoveredTag ? (activeHoveredTag.includes('tag-1') ? -0.8 : 0.8) : 0,
            }}
            className="relative z-20 group cursor-pointer"
          >


            {/* Central Portrait Image */}
            <div className="relative w-64 h-80 sm:w-80 sm:h-[420px] rounded-[32px] overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-neutral-900">
              <img 
                src="/hero.jpg" 
                alt="Humanshu Araspure - Portrait" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-left pointer-events-none">
                <div>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">DESIGNER</span>
                  <span className="font-sans text-sm text-white font-medium">Humanshu A.</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  AVAILABLE 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* FLOATING DECORATIVE STICKERS / OBJECTS */}
          {decorativeObjects.map((obj, i) => {
            const isReacting = activeHoveredTag !== null
            return (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{
                  y: isReacting ? [0, -4, 0] : [0, -8, 0],
                  rotate: isReacting ? [0, 8, 0] : [0, -4, 0],
                  scale: isReacting ? 1.15 : 1,
                }}
                transition={{
                  y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: obj.floatDelay },
                  rotate: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                style={{
                  left: `calc(50% + ${obj.x})`,
                  top: `calc(50% + ${obj.y})`,
                }}
                className="hidden sm:flex absolute z-15 p-2.5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-xl items-center justify-center cursor-default hover:bg-white/10 hover:border-white/30 transition-colors"
              >
                <span className={obj.size}>{obj.icon}</span>
              </motion.div>
            )
          })}

          {/* FLOATING INTERACTIVE DISCIPLINE TAGS */}
          {tagsData.map((tag, i) => {
            const isHovered = activeHoveredTag === tag.id
            const tilts = tagTilts[tag.id] || { tiltX: 0, tiltY: 0 }

            return (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.15 + i * 0.07,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
                style={{
                  left: `calc(50% + ${tag.x})`,
                  top: `calc(50% + ${tag.y})`,
                  zIndex: isHovered ? 50 : tag.zIndex,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  onMouseEnter={() => setActiveHoveredTag(tag.id)}
                  onMouseMove={(e) => handleTagMouseMove(tag.id, e)}
                  onMouseLeave={() => handleTagMouseLeave(tag.id)}
                  animate={{
                    rotateX: isHovered ? tilts.tiltX : 0,
                    rotateY: isHovered ? tilts.tiltY : 0,
                    rotateZ: isHovered ? tag.rotate * 0.5 : tag.rotate,
                    scale: isHovered ? 1.14 : 1,
                    y: isHovered ? -12 : [0, -6, 0],
                    z: isHovered ? 40 : 0,
                  }}
                  /* @ts-ignore */
                  transition={{
                    y: isHovered 
                      ? { type: 'spring', stiffness: 350, damping: 18, mass: 0.8 } 
                      : { duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                    scale: { type: 'spring', stiffness: 380, damping: 18 },
                    rotateX: { type: 'spring', stiffness: 400, damping: 25 },
                    rotateY: { type: 'spring', stiffness: 400, damping: 25 },
                    rotateZ: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className={`
                    group relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/20 
                    bg-gradient-to-r ${tag.color} bg-black/70 backdrop-blur-xl 
                    text-xs sm:text-sm font-mono tracking-wide text-white cursor-pointer select-none
                    shadow-[0_10px_25px_rgba(0,0,0,0.5)] 
                    hover:shadow-[0_20px_40px_rgba(234,82,17,0.4)] hover:border-white/60 hover:text-white
                    will-change-transform transition-colors duration-200 flex items-center gap-2
                  `}
                >
                  {/* Active Indicator Pulse Dot */}
                  <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#EA5211] animate-ping' : 'bg-white/40'}`} />
                  
                  <span>{tag.label}</span>

                  {/* Hover Depth Glow Highlight */}
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              </motion.div>
            )
          })}

        </div>

        {/* Editorial Text Statement Below Moodboard */}
        <div className="max-w-3xl mx-auto text-center space-y-6 pt-6 border-t border-white/10">
          <p className="text-xl sm:text-3xl font-light text-neutral-200 leading-relaxed font-sans">
            "Design is not just what it looks like and feels like. Design is how it works under pressure, in motion, and across human lives."
          </p>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
            HUMANSHU ARASPURE — UI/UX ARCHITECT
          </span>
        </div>

      </div>
    </section>
  )
}
