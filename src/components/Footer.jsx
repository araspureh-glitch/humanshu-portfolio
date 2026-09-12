import React, { useState, useEffect } from "react";

// ─── Winner Check ───────────────────────────────────────────────────────────
function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

// ─── AI Logic ───────────────────────────────────────────────────────────────
function getAIMove(board) {
  const empty = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
  if (empty.length === 0) return null;
  for (const idx of empty) { const t = [...board]; t[idx] = "O"; if (checkWinner(t)) return idx; }
  for (const idx of empty) { const t = [...board]; t[idx] = "X"; if (checkWinner(t)) return idx; }
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter(i => board[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

// ─── Cell ────────────────────────────────────────────────────────────────────
function Cell({ value, index, onClick, disabled, isWinCell }) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const SIZE = 56;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${index}`}
      style={{ width: SIZE, height: SIZE }}
      className={[
        "flex items-center justify-center transition-all duration-200 relative group",
        col < 2 ? "border-r border-white/[0.12]" : "",
        row < 2 ? "border-b border-white/[0.12]" : "",
        !disabled && !value ? "cursor-pointer hover:bg-white/[0.04]" : "cursor-default",
        isWinCell ? "bg-white/[0.08]" : "",
      ].join(" ")}
    >
      {/* Hover ghost */}
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.15] transition-opacity select-none pointer-events-none text-white"
          style={{ fontWeight: 100, fontSize: "1.3rem", fontFamily: "system-ui, sans-serif" }}>
          ×
        </span>
      )}

      {value === "X" && (
        <span
          className="select-none transition-all duration-150"
          style={{ fontWeight: 200, fontSize: "1.3rem", fontFamily: "system-ui, sans-serif", color: "#e2e8f0", letterSpacing: "0.02em" }}
        >
          ×
        </span>
      )}
      {value === "O" && (
        <span
          className="select-none transition-all duration-150"
          style={{ fontWeight: 200, fontSize: "1.2rem", fontFamily: "system-ui, sans-serif", color: "#94a3b8", letterSpacing: "0.02em" }}
        >
          ○
        </span>
      )}
    </button>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export default function Footer() {
  const INITIAL = Array(9).fill(null);
  const [board, setBoard] = useState(INITIAL);
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [msg, setMsg] = useState("");

  const result = checkWinner(board);
  const winLine = result?.line ?? [];
  const isFull = board.every(Boolean);

  useEffect(() => {
    if (result?.winner === "X") { setMsg("You won!"); setGameOver(true); }
    else if (result?.winner === "O") { setMsg("I won."); setGameOver(true); }
    else if (isFull) { setMsg("Draw."); setGameOver(true); }
    else setMsg(isXNext ? "" : "…");
  }, [board, result, isFull, isXNext]);

  useEffect(() => {
    if (!isXNext && !result && !isFull) {
      const t = setTimeout(() => {
        const idx = getAIMove(board);
        if (idx !== null) { const n = [...board]; n[idx] = "O"; setBoard(n); setIsXNext(true); }
      }, 420);
      return () => clearTimeout(t);
    }
  }, [isXNext, result, isFull, board]);

  const handleClick = (i) => {
    if (board[i] || gameOver || !isXNext) return;
    const n = [...board]; n[i] = "X"; setBoard(n); setIsXNext(false);
  };

  const reset = () => { setBoard(INITIAL); setIsXNext(true); setGameOver(false); setMsg(""); };

  const socials = [
    { name: "LinkedIn", url: "https://linkedin.com/in/humanshu-araspure" },
    { name: "Behance",  url: "https://www.behance.net/humansharaspur" },
    { name: "Instagram",url: "https://instagram.com/humanshu.araspure" },
    { name: "GitHub",   url: "https://github.com/araspureh-glitch" },
  ];

  return (
    <footer className="w-full bg-[#050505] text-[#F5F5F5] select-none border-t border-white/[0.07]">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-7">

          {/* Label */}
          <span className="font-mono text-[9px] text-neutral-600 tracking-[0.3em] uppercase">
            Direct Inquiry
          </span>

          {/* Email */}
          <a
            href="mailto:humanshu.araspure@gmail.com"
            className="group w-fit flex flex-col gap-1"
          >
            <span
              className="font-sans text-lg sm:text-xl font-light text-white tracking-tight leading-tight group-hover:text-neutral-300 transition-colors duration-300"
            >
              humanshu.araspure@gmail.com
            </span>
            <span className="h-px bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
          </a>

          {/* Tagline */}
          <p className="text-neutral-500 text-[13px] font-sans font-light leading-relaxed -mt-3 max-w-xs">
            Design, coding and motion graphics by me.
          </p>

          {/* Socials */}
          <div className="flex flex-wrap items-center gap-5 pt-1">
            {socials.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-neutral-500 hover:text-white tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1 group"
              >
                {name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200 inline-block">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Tic Tac Toe */}
        <div className="flex flex-col items-start md:items-end gap-3">

          {/* Caption */}
          <p className="font-sans text-[13px] text-neutral-400 font-light">
            By the way, can you beat me?
          </p>

          {/* Grid container */}
          <div className="relative">
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
          </div>

          {/* Status row */}
          <div className="flex items-center gap-3 h-5">
            {msg && (
              <span className="font-mono text-[11px] text-neutral-400 tracking-wide">
                {msg}
              </span>
            )}
            {(gameOver || board.some(Boolean)) && (
              <button
                onClick={reset}
                className="font-mono text-[10px] text-neutral-600 hover:text-neutral-200 tracking-[0.15em] uppercase transition-colors duration-200 underline underline-offset-2"
              >
                Play again
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.05] px-6 sm:px-12 lg:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-mono text-[9px] text-neutral-700 tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Humanshu Araspure
        </span>
        <span className="font-mono text-[9px] text-neutral-800 tracking-[0.2em] uppercase">
          Built with React · Vercel
        </span>
      </div>

    </footer>
  );
}
