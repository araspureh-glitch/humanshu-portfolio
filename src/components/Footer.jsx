import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-[#8A8A8A] border-t border-white/10 px-6 sm:px-12 lg:px-16 py-8 font-mono text-xs uppercase tracking-widest">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Name & Title */}
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Humanshu Araspure</span>
          <span className="text-neutral-700">/</span>
          <span>UI/UX Designer</span>
        </div>

        {/* Center: Year */}
        <div>
          <span>© 2026</span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-6">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

      </div>
    </footer>
  )
}
