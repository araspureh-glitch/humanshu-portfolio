import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-[#F5F5F5] overflow-hidden">
      <div className="py-8 px-6 text-center border-t border-white/5 font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
        © {new Date().getFullYear()} Humanshu Araspure — All Rights Reserved
      </div>
    </footer>
  );
}

