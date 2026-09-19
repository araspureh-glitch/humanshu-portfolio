import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button'
import { useTheme } from '../context/ThemeContext'

export default function Hero({ introComplete = true }) {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section 
      id="hero"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-28 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Ambient Image Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <img 
          src="/hero.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-15 blur-3xl scale-125 saturate-50"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(to top, #050505, rgba(5,5,5,0.8), transparent)' 
              : 'linear-gradient(to top, #F8F7F4, rgba(248,247,244,0.8), transparent)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to right, #050505, transparent, #050505)'
              : 'linear-gradient(to right, #F8F7F4, transparent, #F8F7F4)'
          }}
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={introComplete ? "visible" : "hidden"}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        
        {/* Left Column */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center space-y-8">
          
          <div 
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider w-fit backdrop-blur-md shadow-sm"
            style={{ 
              background: theme === 'dark' ? 'rgba(23, 23, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>UI/UX & VISUAL DESIGNER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-sans">
            I turn ideas into <span className="bg-gradient-to-r from-neutral-200 via-[#EA5211] to-emerald-400 bg-clip-text text-transparent">experiences</span> people remember
          </h1>

          <p className="text-base sm:text-xl max-w-xl leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
            A multidisciplinary designer blending UI/UX, visual design, and branding to create meaningful digital experiences.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link to="/work">
              <LiquidMetalButton label="See selected work" />
            </Link>
          </div>

          <div 
            className="pt-8 border-t flex items-center gap-8 text-xs font-mono"
            style={{ borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}
          >
            <div>
              <span className="block uppercase font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Role</span>
              UI/UX & Branding
            </div>
            <div>
              <span className="block uppercase font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Location</span>
              India / Remote
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div 
            className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border shadow-2xl"
            style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-card)' }}
          >
            <img 
              src="/hero.jpg" 
              alt="Humanshu - UI/UX Designer" 
              className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-neutral-300 pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800">
                HUMANSHU
              </span>
              <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-emerald-400">
                ● AVAILABLE
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

