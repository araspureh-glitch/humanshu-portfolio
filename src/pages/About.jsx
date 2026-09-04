import Header from '../components/Header'

function About() {
  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <Header />

      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 pt-20">
        {/* Left Side: About Philosophy */}
        <section className="lg:col-span-6 bg-[#f4f3ee] text-[#18181b] p-8 sm:p-14 lg:p-20 flex flex-col justify-between border-r border-[#e2e0d7]">
          <div className="pt-8 lg:pt-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e8e6dc] border border-[#d6d3c4] text-xs font-mono tracking-wider text-[#404045] uppercase mb-6">
              Philosophy & Spec
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              About The Architecture
            </h1>
            <p className="mt-6 text-base text-[#4a4a52] leading-relaxed max-w-lg">
              The Content Architecture was created to bridge structured Headless CMS content models with high-efficiency static and server-side rendering pipelines.
            </p>
            <p className="mt-4 text-sm text-[#52525b] leading-relaxed max-w-lg">
              Featured on Minimal Gallery, this setup emphasizes clean separation of concerns, minimalist typography, and seamless developer experience.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#dedbc8] text-xs font-mono text-[#52525b]">
            <span>FOUNDER & AUTHOR: EDOARDO LUNARDI</span>
          </div>
        </section>

        {/* Right Side Specs */}
        <section className="lg:col-span-6 bg-[#0c0c0e] text-neutral-100 p-8 sm:p-14 lg:p-20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] select-none overflow-hidden flex flex-wrap -rotate-12 scale-125 font-mono text-sm tracking-widest leading-relaxed text-white">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="mr-8 mb-6">ABOUT SPEC CONTENT MANAGEMENT ASTRO NEXTJS</span>
            ))}
          </div>

          <div className="relative z-10 pt-8 lg:pt-16 space-y-6">
            <div className="bg-[#151518]/90 border border-neutral-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">Core Principles</h3>
              <ul className="space-y-3 font-mono text-sm text-neutral-300">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Single Source of Truth for Content Schema
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Composable Component-Driven Page Builders
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Strict TypeScript Type-Safety & Code Gen
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Zero-Bloat Minimalist UI/UX Guidelines
                </li>
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-16 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500">
            <span>MINIMAL GALLERY ARCHIVE // CONTENTARCHITECTURE.DEV</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About
