import { motion } from 'framer-motion'

export default function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/humanshu-araspure' },
    { name: 'Behance', url: 'https://www.behance.net/humansharaspur' },
    { name: 'Instagram', url: 'https://instagram.com/humanshu.araspure' },
    { name: 'GitHub', url: 'https://github.com/araspureh-glitch' },
  ]

  return (
    <section id="contact" className="w-full py-16 px-6 sm:px-12 lg:px-16 border-t" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Main CTA Block */}
        <div className="space-y-8 max-w-4xl">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-primary)' }}></span>
            <span>06 / GET IN TOUCH</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] font-sans"
            style={{ color: 'var(--text-primary)' }}
          >
            Have a problem worth solving?
          </motion.h2>

          <p className="text-xl sm:text-3xl font-light max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Let's create something meaningful together.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <a 
              href="mailto:humanshu.araspure@gmail.com" 
              style={{ border: '1px solid var(--border-nav)', color: 'var(--text-primary)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--text-primary)'
                e.currentTarget.style.color = 'var(--bg-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-all duration-200 cursor-pointer"
            >
              <span>Let's talk</span>
              <span>→</span>
            </a>

            <a 
              href="https://linkedin.com/in/humanshu-araspure" 
              target="_blank"
              rel="noreferrer"
              style={{ border: '1px solid var(--border-nav)', color: 'var(--text-primary)' }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-all hover:opacity-80"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>

            <a 
              href="https://www.behance.net/humansharaspur" 
              target="_blank"
              rel="noreferrer"
              style={{ border: '1px solid var(--border-nav)', color: 'var(--text-primary)' }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-all hover:opacity-80"
            >
              <span>Behance</span>
              <span>↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )

}
