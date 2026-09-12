import React, { useState, useEffect } from "react";

// ─── Winner Check ────────────────────────────────────────────────────────────
function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines)
    if (board[a] && board[a]===board[b] && board[a]===board[c])
      return { winner: board[a], line: [a,b,c] };
  return null;
}

function getAIMove(board) {
  const e = board.map((v,i)=>(v===null?i:null)).filter(v=>v!==null);
  if (!e.length) return null;
  for (const i of e){ const t=[...board];t[i]="O";if(checkWinner(t))return i; }
  for (const i of e){ const t=[...board];t[i]="X";if(checkWinner(t))return i; }
  if (board[4]===null) return 4;
  const c=[0,2,6,8].filter(i=>board[i]===null);
  if (c.length) return c[Math.floor(Math.random()*c.length)];
  return e[Math.floor(Math.random()*e.length)];
}

function Cell({ value, index, onClick, disabled, isWinCell }) {
  const col = index % 3, row = Math.floor(index / 3);
  return (
    <button
      onClick={onClick} disabled={disabled} aria-label={`Cell ${index}`}
      style={{ width: 52, height: 52 }}
      className={[
        "flex items-center justify-center transition-all duration-200 relative group",
        col < 2 ? "border-r border-white/[0.15]" : "",
        row < 2 ? "border-b border-white/[0.15]" : "",
        !disabled && !value ? "cursor-pointer hover:bg-white/[0.05]" : "cursor-default",
        isWinCell ? "bg-white/[0.08]" : "",
      ].join(" ")}
    >
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.18] text-white transition-opacity select-none pointer-events-none"
          style={{ fontWeight: 100, fontSize:"1.1rem" }}>×</span>
      )}
      {value==="X" && <span className="select-none text-white" style={{ fontWeight:200, fontSize:"1.15rem", fontFamily:"system-ui" }}>×</span>}
      {value==="O" && <span className="select-none text-white/60" style={{ fontWeight:200, fontSize:"1.05rem", fontFamily:"system-ui" }}>○</span>}
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
    else if (result?.winner==="O") { setMsg("I won! 🤖");   setGameOver(true); }
    else if (isFull)               { setMsg("Draw 🤝");     setGameOver(true); }
    else setMsg(isXNext ? "" : "…");
  }, [board, result, isFull, isXNext]);

  useEffect(() => {
    if (!isXNext && !result && !isFull) {
      const t = setTimeout(() => {
        const idx = getAIMove(board);
        if (idx!==null){ const n=[...board]; n[idx]="O"; setBoard(n); setIsXNext(true); }
      }, 420);
      return () => clearTimeout(t);
    }
  }, [isXNext, result, isFull, board]);

  const handleClick = (i) => {
    if (board[i]||gameOver||!isXNext) return;
    const n=[...board]; n[i]="X"; setBoard(n); setIsXNext(false);
  };
  const reset = () => { setBoard(INIT); setIsXNext(true); setGameOver(false); setMsg(""); };

  const socials = [
    { name:"LinkedIn",  url:"https://linkedin.com/in/humanshu-araspure" },
    { name:"Behance",   url:"https://www.behance.net/humansharaspur" },
    { name:"Instagram", url:"https://instagram.com/humanshu.araspure" },
    { name:"GitHub",    url:"https://github.com/araspureh-glitch" },
  ];

  const meta = [
    { label:"Role",        value:"UI/UX Designer" },
    { label:"Location",    value:"India (Remote / Hybrid)" },
    { label:"Credentials", value:"Google UX Certified" },
    { label:"Status",      value:"Available 2026" },
  ];

  return (
    <footer className="w-full bg-[#050505] text-white select-none border-t border-white/10 overflow-hidden">

      {/* ── HERO EMAIL ROW ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-16 pb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">

        {/* Left: big heading + email */}
        <div className="flex flex-col gap-5 max-w-2xl">
          <span className="font-mono text-[10px] text-white/35 tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            Get in touch
          </span>

          <a href="mailto:humanshu.araspure@gmail.com" className="group w-fit">
            <h2 className="font-sans text-2xl sm:text-3xl font-light text-white tracking-tight leading-tight group-hover:text-white/70 transition-colors duration-300">
              humanshu.araspure@gmail.com
            </h2>
            <div className="mt-2 h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </a>

          <p className="text-white/40 text-[13px] font-sans font-light leading-relaxed max-w-sm">
            Crafting interfaces that solve real problems — available for freelance, full-time & collaborations.
          </p>
        </div>

        {/* Right: Tic Tac Toe */}
        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
            Can you beat me? :)
          </span>

          <div className="grid grid-cols-3" style={{ width:156, height:156 }}>
            {board.map((cell,i) => (
              <Cell key={i} value={cell} index={i}
                onClick={() => handleClick(i)}
                disabled={!!cell||gameOver||!isXNext}
                isWinCell={winLine.includes(i)} />
            ))}
          </div>

          <div className="flex items-center gap-3 min-h-[18px]">
            {msg && <span className="font-mono text-[10px] text-white/50 tracking-wide">{msg}</span>}
            {(gameOver||board.some(Boolean)) && (
              <button onClick={reset}
                className="font-mono text-[10px] text-white/30 hover:text-white/70 tracking-[0.2em] uppercase transition-colors duration-200">
                play again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── META INFO BAR ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="border border-white/[0.08] rounded-xl grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {meta.map(({ label, value }, i) => (
            <div
              key={label}
              className={[
                "px-6 py-5 flex flex-col gap-1.5",
                i < meta.length - 1 ? "border-r border-white/[0.08]" : "",
              ].join(" ")}
            >
              <span className="font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase">{label}</span>
              <span className="font-sans text-[13px] text-white/80 font-light">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOCIAL + COPYRIGHT ROW ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

        {/* Socials */}
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {socials.map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-1">
              <span className="font-mono text-[10px] text-white/40 group-hover:text-white tracking-[0.18em] uppercase transition-colors duration-200">{name}</span>
              <span className="font-mono text-[9px] text-white/15 group-hover:text-white/60 transition-all duration-200 -translate-x-0.5 group-hover:translate-x-0 inline-block">↗</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <span className="font-mono text-[9px] text-white/15 tracking-[0.2em] uppercase whitespace-nowrap">
          © {new Date().getFullYear()} Humanshu Araspure
        </span>
      </div>

    </footer>
  );
}
