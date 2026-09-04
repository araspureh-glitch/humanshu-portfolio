import Header from '../components/Header'

function Contact() {
  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-black selection:text-white">
      <Header />

      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 pt-20">
        {/* Left Side Contact Info */}
        <section className="lg:col-span-5 bg-[#f4f3ee] text-[#18181b] p-8 sm:p-14 lg:p-20 flex flex-col justify-between border-r border-[#e2e0d7]">
          <div className="pt-8 lg:pt-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e8e6dc] border border-[#d6d3c4] text-xs font-mono tracking-wider text-[#404045] uppercase mb-6">
              Connect & Inquire
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
              Contact & Inquiries
            </h1>
            <p className="mt-6 text-base text-[#4a4a52] leading-relaxed">
              Get in touch to collaborate, implement The Content Architecture starter kit in your project, or ask technical questions.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#dedbc8] text-xs font-mono text-[#52525b]">
            <span>CONTENTARCHITECTURE.DEV // 2026</span>
          </div>
        </section>

        {/* Right Side Form / Links */}
        <section className="lg:col-span-7 bg-[#0c0c0e] text-neutral-100 p-8 sm:p-14 lg:p-20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] select-none overflow-hidden flex flex-wrap -rotate-12 scale-125 font-mono text-sm tracking-widest leading-relaxed text-white">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="mr-8 mb-6">CONTACT INQUIRY CONTENT ARCHITECTURE MINIMAL GALLERY</span>
            ))}
          </div>

          <div className="relative z-10 pt-8 lg:pt-16 max-w-xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 uppercase mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#151518] border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-neutral-600 font-sans text-sm"
                />
              </div>
              <div>
                <label className="block text-neutral-400 uppercase mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-[#151518] border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-neutral-600 font-sans text-sm"
                />
              </div>
              <div>
                <label className="block text-neutral-400 uppercase mb-2">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your project..." 
                  className="w-full bg-[#151518] border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-neutral-600 font-sans text-sm"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl bg-white text-black font-mono uppercase font-semibold hover:bg-neutral-200 transition shadow-lg text-xs tracking-wider"
              >
                SEND TRANSMISSION ↗
              </button>
            </form>
          </div>

          <div className="relative z-10 mt-16 pt-6 border-t border-neutral-800 text-xs font-mono text-neutral-500">
            <span>OFFICIAL WEBSITE: WWW.CONTENTARCHITECTURE.DEV</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact
