export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-neutral-400 border-t border-white/10 px-6 sm:px-12 lg:px-16 py-8 font-mono text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Name & Role */}
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">HUMANSHU ARASPURE</span>
          <span className="text-neutral-700">/</span>
          <span>UI/UX & GRAPHIC DESIGNER</span>
        </div>

        {/* Center: Education & Year */}
        <div className="text-neutral-500 text-[11px]">
          <span>SYMBIOSIS INSTITUTE OF DESIGN · B.DES © 2026</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-6">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  )
}
