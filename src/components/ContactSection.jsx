import { motion } from 'framer-motion'

export default function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/humanshu-araspure' },
    { name: 'Behance', url: 'https://behance.net/humanshu' },
    { name: 'Instagram', url: 'https://instagram.com/humanshu.araspure' },
    { name: 'GitHub', url: 'https://github.com/araspureh-glitch' },
  ]

  return (
    <section id="contact" className="w-full bg-[#050505] text-[#F5F5F5] py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        
        {/* Main CTA Block */}
        <div className="space-y-8 max-w-4xl">
          <span className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase block">
            04 — GET IN TOUCH
          </span>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.95] font-sans"
          >
            Have a problem worth solving?
          </motion.h2>

          <p className="text-xl sm:text-2xl text-[#8A8A8A] font-light max-w-xl">
            Let's create something meaningful.
          </p>

          <div className="pt-6">
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            >
              <span>Let's talk</span>
              <span className="text-lg">↗</span>
            </a>
          </div>
        </div>

        {/* Footer Meta & Socials */}
        <div className="pt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/10 mt-16 font-mono text-xs text-[#8A8A8A]">
          
          <div className="md:col-span-6 space-y-2">
            <span className="text-[#8A8A8A] uppercase tracking-widest block">Direct Inquiry</span>
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              className="text-lg text-white font-mono hover:underline block"
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
