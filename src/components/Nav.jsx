import { NavLink } from 'react-router-dom'

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'WORK', path: '/work' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
]

export default function Nav() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-3 sm:gap-5 bg-[#141416]/95 border border-[#2d2d32] rounded-xl px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md ring-1 ring-white/5">
        {/* Circuit / Abstract Icon Box */}
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#202024] border border-[#383840] text-neutral-200 shadow-inner shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 8h10M7 12h10M7 16h6" />
            <circle cx="16" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-2.5 py-1 rounded-md text-[11px] font-mono tracking-widest uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-[#28282e] text-white font-semibold border border-[#3d3d46] shadow-sm'
                    : 'text-[#8e8e98] hover:text-white hover:bg-[#1f1f24]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
