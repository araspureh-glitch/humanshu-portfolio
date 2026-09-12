import React, { useState, useEffect } from "react";

// ─── Winner Check ────────────────────────────────────────────────────────────
function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a]===board[b] && board[a]===board[c])
      return { winner: board[a], line: [a,b,c] };
  }
  return null;
}

// ─── AI Logic ────────────────────────────────────────────────────────────────
function getAIMove(board) {
  const empty = board.map((v,i)=>(v===null?i:null)).filter(v=>v!==null);
  if (!empty.length) return null;
  for (const i of empty){ const t=[...board];t[i]="O";if(checkWinner(t))return i; }
  for (const i of empty){ const t=[...board];t[i]="X";if(checkWinner(t))return i; }
  if (board[4]===null) return 4;
  const c=[0,2,6,8].filter(i=>board[i]===null);
  if (c.length) return c[Math.floor(Math.random()*c.length)];
  return empty[Math.floor(Math.random()*empty.length)];
}

// ─── Cell ─────────────────────────────────────────────────────────────────────
function Cell({ value, index, onClick, disabled, isWinCell }) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${index}`}
      style={{ width: 56, height: 56 }}
      className={[
        "flex items-center justify-center transition-all duration-200 relative group",
        col < 2 ? "border-r border-white/20" : "",
        row < 2 ? "border-b border-white/20" : "",
        !disabled && !value ? "cursor-pointer hover:bg-white/[0.06]" : "cursor-default",
        isWinCell ? "bg-white/10" : "",
      ].join(" ")}
    >
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 text-white transition-opacity select-none pointer-events-none"
          style={{ fontWeight: 100, fontSize: "1.2rem" }}>×</span>
      )}
      {value === "X" && (
        <span className="select-none text-white" style={{ fontWeight: 200, fontSize: "1.25rem", fontFamily: "system-ui, sans-serif" }}>×</span>
      )}
      {value === "O" && (
        <span className="select-none text-neutral-300" style={{ fontWeight: 200, fontSize: "1.15rem", fontFamily: "system-ui, sans-serif" }}>○</span>
      )}
    </button>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const INIT = Array(9).fill(null);
  const [board, setBoard] = useState(INIT);
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [msg, setMsg] = useState("");

  const result = checkWinner(board);
  const winLine = result?.line ?? [];
  const isFull = board.every(Boolean);

  useEffect(() => {
    if (result?.winner==="X")      { setMsg("You won! 🎉"); setGameOver(true); }
    else if (result?.winner==="O") { setMsg("I won! 🤖");  setGameOver(true); }
    else if (isFull)               { setMsg("Draw 🤝");    setGameOver(true); }
    else setMsg(isXNext ? "" : "…");
  }, [board, result, isFull, isXNext]);

  useEffect(() => {
    if (!isXNext && !result && !isFull) {
      const t = setTimeout(() => {
        const idx = getAIMove(board);
        if (idx !== null) { const n=[...board]; n[idx]="O"; setBoard(n); setIsXNext(true); }
      }, 420);
      return () => clearTimeout(t);
    }
  }, [isXNext, result, isFull, board]);

  const handleClick = (i) => {
    if (board[i] || gameOver || !isXNext) return;
    const n = [...board]; n[i] = "X"; setBoard(n); setIsXNext(false);
  };
  const reset = () => { setBoard(INIT); setIsXNext(true); setGameOver(false); setMsg(""); };

  const socials = [
    { name: "LinkedIn",  url: "https://linkedin.com/in/humanshu-araspure" },
    { name: "Behance",   url: "https://www.behance.net/humansharaspur" },
    { name: "Instagram", url: "https://instagram.com/humanshu.araspure" },
    { name: "GitHub",    url: "https://github.com/araspureh-glitch" },
  ];

  return (
    <footer className="w-full bg-[#050505] text-white select-none border-t border-white/10 overflow-hidden">

      {/* ── Top section ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* LEFT */}
        <div className="flex flex-col gap-8">

          {/* Section tag */}
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="font-sans font-medium text-[10px] text-white/40 tracking-[0.3em] uppercase">
              Direct Inquiry
            </span>
          </div>

          {/* Email — large, high contrast, hover effect */}
          <a
            href="mailto:humanshu.araspure@gmail.com"
            className="group block w-fit"
          >
            <div className="relative overflow-hidden">
              <span
                className="block font-sans text-white text-lg sm:text-xl font-normal tracking-tight leading-tight transition-colors duration-300 group-hover:text-white/70"
              >
                humanshu.araspure@gmail.com
              </span>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 h-px bg-white w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </div>
            <span className="mt-1.5 block font-sans font-medium text-[10px] text-white/30 tracking-[0.2em] uppercase group-hover:text-white/50 transition-colors duration-300">
              Open to work ↗
            </span>
          </a>

          {/* Tagline */}
          <p className="text-white/40 text-[13px] font-sans font-light leading-relaxed max-w-sm -mt-2">
            UI/UX designer crafting digital experiences through design, code & motion.
          </p>

          {/* Social links */}
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {socials.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5"
              >
                <span className="font-sans font-medium text-[11px] text-white/50 group-hover:text-white tracking-[0.18em] uppercase transition-colors duration-200">
                  {name}
                </span>
                <span className="font-sans text-[10px] text-white/20 group-hover:text-white/70 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 inline-block">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Tic Tac Toe */}
        <div className="flex flex-col items-start md:items-end gap-4">

          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-[13px] text-white/60 font-light">
              By the way, can you beat me?
            </span>
            <span className="text-white/30 text-xs">:)</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3" style={{ width: 168, height: 168 }}>
            {board.map((cell, i) => (
              <Cell
                key={i}
                value={cell}
                index={i}
                onClick={() => handleClick(i)}
                disabled={!!cell || gameOver || !isXNext}
                isWinCell={winLine.includes(i)}
              />
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 min-h-[20px]">
            {msg && (
              <span className="font-sans font-medium text-[11px] text-white/60 tracking-wide">{msg}</span>
            )}
            {(gameOver || board.some(Boolean)) && (
              <button
                onClick={reset}
                className="font-sans font-medium text-[10px] text-white/30 hover:text-white/80 tracking-[0.2em] uppercase transition-colors duration-200"
              >
                play again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-sans font-medium text-[10px] text-white/20 tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Humanshu Araspure — All rights reserved
        </span>
        <span className="font-sans font-medium text-[10px] text-white/10 tracking-[0.18em] uppercase">
          Built with React · Vercel
        </span>
      </div>

    </footer>
  );
}
