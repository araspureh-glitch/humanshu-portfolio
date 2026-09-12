import { motion } from 'framer-motion'
import { OptimizedBlackHole } from '@/components/ui/optimized-black-hole'

export default function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/humanshu-araspure' },
    { name: 'Behance', url: 'https://www.behance.net/humansharaspur' },
    { name: 'Instagram', url: 'https://instagram.com/humanshu.araspure' },
    { name: 'GitHub', url: 'https://github.com/araspureh-glitch' },
  ]

  return (
    <section id="contact" className="relative w-full bg-[#050505] text-[#F5F5F5] min-h-[650px] overflow-hidden border-t border-white/10 flex flex-col justify-center">
      
      {/* Background Optimized Black Hole Canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <OptimizedBlackHole />
      </div>

      {/* Dark Ambient Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0 pointer-events-none" />

      {/* Overlapping Content Container on the Left */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-between">
        
        {/* Main CTA Card Block */}
        <div className="space-y-8 max-w-xl bg-black/40 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
            <span>06 / GET IN TOUCH</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight leading-[1.05] font-sans"
          >
            Have a problem worth solving?
          </motion.h2>

          <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            Let's create something meaningful together.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg cursor-pointer"
            >
              <span>LET'S TALK</span>
              <span className="text-base">↗</span>
            </a>

            <a 
              href="https://linkedin.com/in/humanshu-araspure" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/10"
            >
              <span>LINKEDIN</span>
              <span>↗</span>
            </a>

            <a 
              href="https://www.behance.net/humansharaspur" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/10"
            >
              <span>BEHANCE</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Footer Meta & Socials */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/10 mt-16 font-mono text-xs text-neutral-400">
          
          <div className="md:col-span-6 space-y-2">
            <span className="text-neutral-500 uppercase tracking-widest block">Direct Inquiry</span>
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              className="text-lg sm:text-xl text-white font-mono hover:text-[#0A66C2] transition-colors block"
            >
              humanshu.araspure@gmail.com
            </a>
          </div>

          <div className="md:col-span-6 flex flex-wrap md:justify-end gap-6 uppercase tracking-widest">
            {socialLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
              >
                {item.name} ↗
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

