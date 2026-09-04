import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const [timeIST, setTimeIST] = useState('')
  const location = useLocation()

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date())
      setTimeIST(`${timeStr} IST`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-6 sm:px-12 py-6 flex items-center justify-between text-xs font-mono tracking-widest uppercase mix-blend-difference text-neutral-200 pointer-events-none">
      
      {/* Left: Custom Monogram/Logo */}
      <div className="pointer-events-auto">
        <Link 
          to="/" 
          className="group flex items-center gap-2 text-sm font-extrabold tracking-tighter text-white hover:opacity-70 transition-opacity"
        >
          <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs">
            HA
          </span>
        </Link>
      </div>

      {/* Center: Work / About / Playground */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-8 text-[#8A8A8A] text-[11px]">
        <Link 
          to="/" 
          className={`hover:text-white transition-colors ${location.pathname === '/' ? 'text-white font-bold' : ''}`}
        >
          Work
        </Link>
        <span className="text-neutral-700">/</span>
        <Link 
          to="/about" 
          className={`hover:text-white transition-colors ${location.pathname === '/about' ? 'text-white font-bold' : ''}`}
        >
          About
        </Link>
        <span className="text-neutral-700">/</span>
        <a 
          href="#work" 
          className="hover:text-white transition-colors"
        >
          Playground
        </a>
      </nav>

      {/* Right: Live IST Clock + Let's Talk CTA */}
      <div className="pointer-events-auto flex items-center gap-6 text-[11px]">
        {/* Live IST Time */}
        <div className="hidden lg:flex items-center gap-2 text-[#8A8A8A]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{timeIST || '03:15 AM IST'}</span>
        </div>

        {/* Let's Talk CTA */}
        <a 
          href="mailto:humanshu.araspure@gmail.com" 
          className="relative group px-4 py-2 rounded-full border border-white/20 hover:border-white text-white transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-1.5"
        >
          <span>Let's talk</span>
          <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
        </a>
      </div>

    </header>
  )
}
