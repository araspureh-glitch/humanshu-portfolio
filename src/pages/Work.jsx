import Nav from '../components/Nav'

function Work() {
  const showcaseProjects = [
    {
      title: "Sanity Studio Modular Builder",
      category: "CMS Architecture",
      desc: "Flexible component library mapping Sanity document blocks straight to Astro and Next.js frontend components.",
      tag: "Sanity v3"
    },
    {
      title: "High-Speed GROQ Fetcher",
      category: "Data Layer",
      desc: "Zero-overhead content querying system with real-time visual editing overlays.",
      tag: "GROQ"
    },
    {
      title: "Agent MCP Server for CMS",
      category: "AI Integration",
      desc: "Protocol bridge connecting AI coding subagents directly to schema inspection and generation tools.",
      tag: "MCP Spec"
    }
  ]

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <Nav />

      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 pt-24 lg:pt-0">
        {/* Left Side Header */}
        <section className="lg:col-span-5 bg-[#f4f3ee] text-[#18181b] p-8 sm:p-14 lg:p-20 flex flex-col justify-between border-r border-[#e2e0d7]">
          <div className="pt-8 lg:pt-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e8e6dc] border border-[#d6d3c4] text-xs font-mono tracking-wider text-[#404045] uppercase mb-6">
              Portfolio & Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              Work & Modules
            </h1>
            <p className="mt-6 text-base text-[#4a4a52] leading-relaxed">
              Explore key architectural modules and production projects built with The Content Architecture design system.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#dedbc8] text-xs font-mono text-[#52525b]">
            <span>SYSTEM VERSION 2.4 // 2026</span>
          </div>
        </section>

        {/* Right Side Work Grid */}
        <section className="lg:col-span-7 bg-[#0c0c0e] text-neutral-100 p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          {/* Tilted Background Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] select-none overflow-hidden flex flex-wrap -rotate-12 scale-125 font-mono text-sm tracking-widest leading-relaxed text-white">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="mr-8 mb-6">THE REPO WORK SHOWCASE MODULES</span>
            ))}
          </div>

          <div className="relative z-10 pt-8 lg:pt-16 space-y-6 max-w-2xl">
            {showcaseProjects.map((item, idx) => (
              <div key={idx} className="bg-[#151518]/90 border border-neutral-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hover:border-neutral-700 transition">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-neutral-400 uppercase">{item.category}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400">{item.tag}</span>
                </div>
                <h2 className="text-xl font-bold font-mono text-white mb-2">{item.title}</h2>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Work
