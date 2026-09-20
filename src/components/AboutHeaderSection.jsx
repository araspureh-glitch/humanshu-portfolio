import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'

export default function AboutHeaderSection() {
  const [activeTab, setActiveTab] = useState('detailed') // 'corporate' | 'detailed'

  const portraits = [
    { src: "/kid-portrait.png", alt: "Humanshu Kid Vintage Portrait 1" },
    { src: "/kid-portrait-2.png", alt: "Humanshu Kid Birthday Hat" },
    { src: "/kid-portrait-3.png", alt: "Humanshu Young School Child" },
    { src: "/kid-portrait-4.png", alt: "Humanshu School Boy" },
    { src: "/kid-portrait-5.png", alt: "Humanshu Traditional Outfit" },
    { src: "/glasses-portrait.png", alt: "Humanshu Smiling Glasses Portrait" },
    { src: "/toy-camera-portrait.jpg", alt: "Humanshu Camera Portrait" },
  ]

  // Duplicate list to create a seamless infinite loop
  const duplicatedPortraits = [...portraits, ...portraits]

  return (
    <section className="w-full bg-[#050505] text-[#F5F5F5] py-10 sm:py-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-18">
        
        {/* TOP ROW: Header Question + Smooth Flowing Marquee Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Top Left: Download Resume + Headline */}
          <div className="lg:col-span-5 space-y-3.5 pt-1">
            <div>
              <a
                href="https://linkedin.com/in/humanshu-araspure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group cursor-pointer"
              >
                <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">[</span>
                <Download className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                <span>DOWNLOAD RESUME</span>
                <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">]</span>
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight font-sans max-w-sm sm:max-w-lg">
              <span className="text-neutral-400 font-light">Do you really want to</span><br />
              <span className="text-white font-semibold">know more about me</span><br />
              <span className="text-neutral-400 font-light">than my work?</span>
            </h1>
          </div>

          {/* Top Right: Smooth Flowing Infinite Photo Strip */}
          <div className="lg:col-span-7 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex items-center gap-3 w-max py-1"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPortraits.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex-shrink-0 w-24 h-32 sm:w-28 sm:h-40 rounded-none overflow-hidden border border-white/10 hover:border-white/30 bg-[#0c0c0e] transition-all duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* BOTTOM ROW: Interactive Mode Buttons (Left) + Large Vintage Film Frame Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 sm:pt-12 lg:pt-16">
          
          {/* Bottom Left: Two Option Buttons (Horizontal Side-by-Side) & Bio Description */}
          <div className="lg:col-span-6 space-y-5 pt-2">
            <div className="flex flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 font-sans text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('corporate')}
                onMouseEnter={() => setActiveTab('corporate')}
                className={`text-left font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'corporate'
                    ? 'text-neutral-100 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                [NOPE, KEEP IT SHORT AND CORPORATE]
              </button>

              <button
                onClick={() => setActiveTab('detailed')}
                onMouseEnter={() => setActiveTab('detailed')}
                className={`text-right font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === 'detailed'
                    ? 'text-neutral-100 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                [YES, THATS WHY I CLICKED THE 'ABOUT ME' SECTION]
              </button>
            </div>

            {/* Dynamic Chat Bubbles based on active mode */}
            <div className="pt-2 w-full flex flex-col">
              {activeTab === 'corporate' ? (
                <motion.div
                  key="corporate"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 flex flex-col items-start max-w-md mr-auto"
                >
                  {/* Left Question Bubble */}
                  <div className="self-start max-w-[85%] bg-[#27272a] text-neutral-200 font-sans font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-xl">
                    What's your quick corporate summary?
                  </div>

                  {/* Right Answer Bubble */}
                  <div className="self-end max-w-[90%] bg-[#18181b] text-neutral-300 font-sans font-medium text-xs sm:text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-tr-sm shadow-xl">
                    UI/UX Architect & Product Designer specializing in scalable design systems, intuitive user journeys, and high-fidelity React apps.
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detailed"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 flex flex-col items-end max-w-md ml-auto"
                >
                  {/* Question Bubble */}
                  <div className="self-start max-w-[85%] bg-[#27272a] text-neutral-200 font-sans font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-xl">
                    How did you get into design?
                  </div>

                  {/* Answer Bubble */}
                  <div className="self-end max-w-[95%] bg-[#18181b] text-neutral-300 font-sans font-medium text-xs sm:text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-tr-sm shadow-xl">
                    Design has always been part of my life. My dad is a graphic designer, so I grew up surrounded by creativity. I spent a lot of time playing with Photoshop, Dreamweaver, Flash and After Effects as a kid.
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Right: Full Uncropped Featured Photo */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <div className="relative w-full max-w-xl rounded-none overflow-hidden border border-white/10 bg-[#0d0d0f] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src="/toy-camera-portrait.jpg"
                  alt="Featured Humanshu Portrait"
                  className="w-full h-auto object-contain rounded-none"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
