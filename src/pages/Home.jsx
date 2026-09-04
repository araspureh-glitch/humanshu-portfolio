import Nav from '../components/Nav'

function Home() {
  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <Nav />

      {/* Main Split Layout */}
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 pt-24 lg:pt-0">
        
        {/* Left Side: Light/Cream Architecture Section */}
        <section className="lg:col-span-6 bg-[#f4f3ee] text-[#18181b] p-8 sm:p-14 lg:p-20 flex flex-col justify-between border-r border-[#e2e0d7]">
          <div className="pt-8 lg:pt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8e6dc] border border-[#d6d3c4] text-xs font-mono tracking-wider text-[#404045] uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Agent-Ready Starter Kit
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-black">
              The Content Architecture
            </h1>

            <p className="mt-6 text-lg text-[#4a4a52] leading-relaxed max-w-xl font-normal">
              A structured, opinionated CMS framework engineered for modern web teams. Built for Sanity CMS, Astro, and Next.js with modular page building blocks.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center font-mono text-xs">
              <a 
                href="https://www.contentarchitecture.dev" 
                target="_blank" 
                rel="noreferrer" 
                className="px-6 py-3.5 rounded-lg bg-black text-white font-medium hover:bg-neutral-800 transition shadow-lg flex items-center gap-2"
              >
                <span>EXPLORE STARTER</span>
                <span>↗</span>
              </a>
              <a 
                href="#features" 
                className="px-6 py-3.5 rounded-lg bg-[#e6e4da] border border-[#d2cfc3] text-[#27272a] font-medium hover:bg-[#dedbc8] transition"
              >
                SYSTEM SPEC
              </a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#dedbc8] grid grid-cols-2 gap-6 font-mono text-xs text-[#52525b]">
            <div>
              <span className="block text-black font-semibold uppercase mb-1">Stack</span>
              Sanity, Next.js, Astro, Tailwind
            </div>
            <div>
              <span className="block text-black font-semibold uppercase mb-1">Target</span>
              Production Web Apps & CMS
            </div>
          </div>
        </section>

        {/* Right Side: Dark Monochrome Tiled Background Section */}
        <section className="lg:col-span-6 bg-[#0c0c0e] text-neutral-100 p-8 sm:p-14 lg:p-20 relative overflow-hidden flex flex-col justify-between">
          
          {/* Tilted Repeating Background Text matching minimal.gallery screenshot */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] select-none overflow-hidden flex flex-wrap -rotate-12 scale-125 font-mono text-sm tracking-widest leading-relaxed text-white">
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className="mr-8 mb-6">
                THE CONTENT ARCHITECTURE THE ARCHITECTURE CMS FRAMEWORK
              </span>
            ))}
          </div>

          {/* Interactive Showcase Cards */}
          <div className="relative z-10 pt-8 lg:pt-16 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Architecture Layers</span>
              <span className="text-xs font-mono text-emerald-400">STATUS: READY</span>
            </div>

            {/* Feature Card 1 */}
            <div className="bg-[#151518]/90 border border-neutral-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hover:border-neutral-700 transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wide">01 // Modular Schema</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 font-mono text-neutral-400">SANITY</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Structured content models with zero-bleed boundaries. Easily compose pages with dynamic block components.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-[#151518]/90 border border-neutral-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hover:border-neutral-700 transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wide">02 // Fetch Engine</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 font-mono text-neutral-400">GROQ / ASTRO</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Optimized data-fetching pipeline with instant preview resolution and automatic TypeScript type generation.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-[#151518]/90 border border-neutral-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hover:border-neutral-700 transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-mono text-base font-bold text-white uppercase tracking-wide">03 // Agent Ready</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 font-mono text-neutral-400">AI TOOLS</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                LLM-friendly architecture docs and MCP integration to let AI coding agents build new pages seamlessly.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-16 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>CONTENTARCHITECTURE.DEV</span>
            <span>MINIMAL GALLERY FEATURED</span>
          </div>

        </section>

      </main>
    </div>
  )
}

export default Home
