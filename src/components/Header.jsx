import { Link } from 'react-router-dom'
import Nav from './Nav'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-800/80 bg-[#0c0c0e]/80 backdrop-blur-md transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Brand Name as Link to / */}
        <Link 
          to="/" 
          className="font-mono text-sm sm:text-base font-extrabold tracking-widest text-white hover:text-neutral-300 transition-colors flex items-center gap-2.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform duration-200 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
          <span className="uppercase">HUMANSHU</span>
        </Link>

        {/* Center/Right: Existing Nav component */}
        <div className="hidden md:flex items-center">
          <Nav />
        </div>

        {/* Right Side: Mobile Nav + Book a Call Button */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Nav />
          </div>

          <Button 
            asChild
            className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-mono text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 cursor-pointer shadow-md"
          >
            <a href="mailto:araspurehumanshu@gmail.com">
              Book a call
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
