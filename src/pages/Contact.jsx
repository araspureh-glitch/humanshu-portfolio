import Header from '../components/Header'
import { Button } from '@/components/ui/button'

function Contact() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Header />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 min-h-screen flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="py-10 border-b border-neutral-800/80">
            <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              Contact Me
            </h1>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              Have a project in mind or interested in working together? Reach out directly via email or send a message.
            </p>
          </div>

          {/* Contact Details & Form */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-6 font-mono text-xs text-slate-300">
              <div className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6 space-y-4">
                <span className="text-neutral-500 uppercase tracking-widest block">Direct Email</span>
                <a href="mailto:araspurehumanshu@gmail.com" className="text-emerald-400 font-bold text-sm block hover:underline">
                  araspurehumanshu@gmail.com
                </a>
              </div>

              <div className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6 space-y-4">
                <span className="text-neutral-500 uppercase tracking-widest block">GitHub Repository</span>
                <a href="https://github.com/araspureh-glitch/humanshu-portfolio" target="_blank" rel="noreferrer" className="text-slate-200 text-sm block hover:underline">
                  araspureh-glitch/humanshu-portfolio ↗
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <form onSubmit={(e) => e.preventDefault()} className="bg-[#141417] border border-neutral-800/90 rounded-2xl p-6 sm:p-8 space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-400 uppercase mb-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/60 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/60 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 uppercase mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can I help you?" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/60 font-sans text-sm"
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono uppercase font-bold tracking-wider text-xs cursor-pointer shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  Send Message ↗
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} Humanshu. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for opportunities
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Contact
