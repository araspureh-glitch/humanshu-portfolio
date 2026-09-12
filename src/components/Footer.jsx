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

  for (const idx of empty) {
    const t = [...board]; t[idx] = "O";
    if (checkWinner(t)) return idx;
  }
  for (const idx of empty) {
    const t = [...board]; t[idx] = "X";
    if (checkWinner(t)) return idx;
  }
  if (board[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter(i => board[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

// ─── Cell Component ─────────────────────────────────────────────────────────
function Cell({ value, index, onClick, disabled, isWinCell }) {
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${index}`}
      className={[
        "flex items-center justify-center transition-colors duration-150",
        col < 2 ? "border-r border-white/20" : "",
        row < 2 ? "border-b border-white/20" : "",
        !disabled && value === null ? "hover:bg-white/[0.03] cursor-pointer" : "cursor-default",
        isWinCell ? "bg-white/[0.06]" : "",
      ].join(" ")}
      style={{ width: 80, height: 80 }}
    >
      {value && (
        <span
          className="select-none"
          style={{
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 100,
            fontSize: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          {value}
        </span>
      )}
    </button>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const INITIAL_BOARD = Array(9).fill(null);
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const result = checkWinner(board);
  const winLine = result ? result.line : [];
  const isFull = board.every(c => c !== null);

  // Update status message
  useEffect(() => {
    if (result?.winner === "X") {
      setStatusMsg("You won! 🎉");
      setGameOver(true);
    } else if (result?.winner === "O") {
      setStatusMsg("I won! 🤖");
      setGameOver(true);
    } else if (isFull) {
      setStatusMsg("Draw! 🤝");
      setGameOver(true);
    } else {
      setStatusMsg(isXNext ? "" : "AI thinking…");
    }
  }, [board, result, isFull, isXNext]);

  // AI move
  useEffect(() => {
    if (!isXNext && !result && !isFull) {
      const timer = setTimeout(() => {
        const idx = getAIMove(board);
        if (idx !== null) {
          const next = [...board];
          next[idx] = "O";
          setBoard(next);
          setIsXNext(true);
        }
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isXNext, result, isFull, board]);

  const handleClick = (index) => {
    if (board[index] || gameOver || !isXNext) return;
    const next = [...board];
    next[index] = "X";
    setBoard(next);
    setIsXNext(false);
  };

  const reset = () => {
    setBoard(INITIAL_BOARD);
    setIsXNext(true);
    setGameOver(false);
    setStatusMsg("");
  };

  return (
    <footer className="w-full bg-[#050505] text-[#F5F5F5] select-none border-t border-white/10">
      {/* ── Main Two-Column Row ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-start">

        {/* LEFT: Contact info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-neutral-500 tracking-[0.25em] uppercase">
              Direct Inquiry
            </span>
            <a
              href="mailto:humanshu.araspure@gmail.com"
              className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight hover:text-neutral-300 transition-colors w-fit"
            >
              humanshu.araspure@gmail.com
            </a>
            <p className="text-neutral-400 text-sm font-sans pt-1">
              Design, coding and motion graphics by me.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-neutral-400 tracking-widest uppercase pt-2">
            {[
              { name: "LinkedIn", url: "https://linkedin.com/in/humanshu-araspure" },
              { name: "Behance", url: "https://www.behance.net/humansharaspur" },
              { name: "Instagram", url: "https://instagram.com/humanshu.araspure" },
              { name: "GitHub", url: "https://github.com/araspureh-glitch" },
            ].map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>{name}</span>
                <span className="text-neutral-600 group-hover:text-white transition-colors">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: Tic-Tac-Toe */}
        <div className="flex flex-col items-start md:items-end gap-4">
          {/* Caption */}
          <p className="text-sm text-white font-sans font-normal">
            By the way, can you beat me? :)
          </p>

          {/* Grid — equal 80×80 cells, only inner dividers */}
          <div
            className="grid grid-cols-3"
            style={{ width: 240, height: 240 }}
          >
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

          {/* Status + reset */}
          <div className="flex items-center gap-4 h-6">
            {statusMsg && (
              <span className="text-sm font-sans text-neutral-300">
                {statusMsg}
              </span>
            )}
            {(gameOver || board.some(c => c !== null)) && (
              <button
                onClick={reset}
                className="text-sm font-sans text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
              >
                Play again
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/5 px-6 sm:px-12 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Humanshu Araspure — All rights reserved
        </span>
        <span className="font-mono text-[10px] text-neutral-700 tracking-widest uppercase">
          Built with React · Deployed on Vercel
        </span>
      </div>
    </footer>
  );
}
