import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-24 pb-12 px-6 sm:px-12 lg:px-16 bg-[#09090b] text-white overflow-hidden">
      
      {/* Ambient Image Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <img 
          src="/hero.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-15 blur-3xl scale-125 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono tracking-wider text-neutral-300 w-fit backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>UI/UX & VISUAL DESIGNER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
            I turn ideas into <span className="bg-gradient-to-r from-white via-neutral-200 to-emerald-400 bg-clip-text text-transparent">experiences</span> people remember
          </h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-xl leading-relaxed font-normal">
            A multidisciplinary designer blending UI/UX, visual design, and branding to create meaningful digital experiences.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs uppercase font-bold tracking-wider px-7 py-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95 cursor-pointer shadow-md"
            >
              <Link to="/work" className="flex items-center gap-2">
                <span>See selected work</span>
                <span className="text-base">↘</span>
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-neutral-800/80 flex items-center gap-8 text-xs font-mono text-neutral-500">
            <div>
              <span className="block text-neutral-400 uppercase font-semibold mb-0.5">Role</span>
              UI/UX & Branding
            </div>
            <div>
              <span className="block text-neutral-400 uppercase font-semibold mb-0.5">Location</span>
              India / Remote
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group bg-neutral-900">
            <img 
              src="/hero.jpg" 
              alt="Humanshu - UI/UX Designer" 
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
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
        </div>

      </div>
    </section>
  )
}
