import { motion } from 'framer-motion'

export default function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/humanshu-araspure' },
    { name: 'Behance', url: 'https://www.behance.net/humansharaspur' },
    { name: 'Instagram', url: 'https://instagram.com/humanshu.araspure' },
    { name: 'GitHub', url: 'https://github.com/araspureh-glitch' },
  ]

  return (
    <section id="contact" className="w-full bg-[#050505] text-[#F5F5F5] py-32 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[520px]">
        
        {/* Main CTA Block */}
        <div className="space-y-8 max-w-4xl">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
            <span>06 / GET IN TOUCH</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.95] font-sans"
          >
            Have a problem worth solving?
          </motion.h2>

          <p className="text-xl sm:text-3xl text-neutral-300 font-light max-w-2xl">
            Let's create something meaningful together.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg cursor-pointer"
            >
              <span>Let's talk</span>
              <span className="text-lg">↗</span>
            </a>

            <a 
              href="https://linkedin.com/in/humanshu-araspure" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-sm uppercase tracking-widest transition-all hover:bg-white/10"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>

            <a 
              href="https://www.behance.net/humansharaspur" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-sm uppercase tracking-widest transition-all hover:bg-white/10"
            >
              <span>Behance</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Footer Meta & Socials */}
        <div className="pt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/10 mt-20 font-mono text-xs text-neutral-400">
          
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
