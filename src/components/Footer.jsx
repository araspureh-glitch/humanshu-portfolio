import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper to check for Tic Tac Toe winner
function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],          // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default function Footer() {
  // Tic-Tac-Toe State matching screenshot (Initial state has 'O' in top-left cell 0)
  const initialBoard = ["O", null, null, null, null, null, null, null, null];
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true); // User is 'X'
  const [statusMessage, setStatusMessage] = useState(null);

  const winner = checkWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);

  // AI Move Handler (plays as 'O')
  useEffect(() => {
    if (!isXNext && !winner && !isBoardFull) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, isBoardFull, board]);

  // Handle game end messages
  useEffect(() => {
    if (winner === "X") {
      setStatusMessage("You won! 🎉");
    } else if (winner === "O") {
      setStatusMessage("I won! 🤖");
    } else if (isBoardFull) {
      setStatusMessage("It's a draw! 🤝");
    } else {
      setStatusMessage(null);
    }
  }, [winner, isBoardFull]);

  const handleCellClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const makeAIMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    // 1. Try to win
    for (let idx of emptyIndices) {
      const tempBoard = [...board];
      tempBoard[idx] = "O";
      if (checkWinner(tempBoard) === "O") {
        tempBoard[idx] = "O";
        setBoard(tempBoard);
        setIsXNext(true);
        return;
      }
    }

    // 2. Block player X from winning
    for (let idx of emptyIndices) {
      const tempBoard = [...board];
      tempBoard[idx] = "X";
      if (checkWinner(tempBoard) === "X") {
        const nextBoard = [...board];
        nextBoard[idx] = "O";
        setBoard(nextBoard);
        setIsXNext(true);
        return;
      }
    }

    // 3. Pick center if open
    if (board[4] === null) {
      const nextBoard = [...board];
      nextBoard[4] = "O";
      setBoard(nextBoard);
      setIsXNext(true);
      return;
    }

    // 4. Otherwise pick random empty square
    const randomChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const nextBoard = [...board];
    nextBoard[randomChoice] = "O";
    setBoard(nextBoard);
    setIsXNext(true);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setStatusMessage(null);
  };

  return (
    <footer className="w-full bg-[#050505] text-[#F5F5F5] py-16 px-6 sm:px-12 lg:px-20 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8">
        
        {/* Left Side: Logo, Bio, Socials, Visitor Counter */}
        <div className="flex flex-col space-y-6 max-w-md">
          
          {/* Top Line: Pink Overlapping Icon Box + Domain */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-4 h-4 mr-0.5">
              <div className="absolute inset-0 bg-[#f43f5e] rounded-[2.5px] -translate-x-[2px] -translate-y-[2px]" />
              <div className="absolute inset-0 bg-[#f43f5e]/60 rounded-[2.5px] translate-x-[2px] translate-y-[2px]" />
            </div>
            <a 
              href="/" 
              className="text-white font-medium text-base sm:text-lg font-sans tracking-tight hover:opacity-80 transition-opacity"
            >
              humanshu.dev/
            </a>
          </div>

          {/* Subtitle */}
          <p className="text-neutral-400 text-sm font-sans leading-relaxed">
            Design, coding and motion graphics by me.
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4 text-white/90">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/humanshu-araspure" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 border border-white/80 rounded flex items-center justify-center font-bold text-[10px] tracking-tighter hover:border-white hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              in
            </a>

            {/* Medium */}
            <a 
              href="https://www.behance.net/humansharaspur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-serif font-bold text-base hover:text-white transition-colors px-0.5"
              aria-label="Medium / Portfolio"
            >
              M
            </a>

            {/* X */}
            <a 
              href="https://github.com/araspureh-glitch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="X / Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/humanshu.araspure" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Visitor Counter */}
          <div className="pt-2 text-neutral-400 text-sm font-sans">
            You were visitor number <span className="font-bold text-white tracking-wide">557,822</span>
          </div>

        </div>

        {/* Right Side: Interactive Tic-Tac-Toe Game */}
        <div className="flex flex-col items-start md:items-end">
          
          {/* Headline */}
          <div className="text-neutral-300 text-sm sm:text-base font-sans mb-4 font-normal tracking-wide">
            By the way, can you beat me? :)
          </div>

          {/* Tic Tac Toe Grid */}
          <div className="relative flex flex-col items-center">
            
            <div className="grid grid-cols-3 w-[150px] sm:w-[170px] h-[150px] sm:h-[170px]">
              {board.map((cell, index) => {
                // Wireframe border layout matching screenshot (no outer borders, internal grid lines only)
                const isRightCol = index % 3 === 2;
                const isBottomRow = index >= 6;

                return (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={cell !== null || winner !== null}
                    className={`flex items-center justify-center font-sans text-xl sm:text-2xl font-light text-white transition-colors ${
                      !isRightCol ? "border-r border-neutral-700/60" : ""
                    } ${!isBottomRow ? "border-b border-neutral-700/60" : ""} ${
                      cell === null && !winner ? "hover:bg-white/[0.04]" : ""
                    }`}
                    aria-label={`Cell ${index}`}
                  >
                    {cell}
                  </button>
                );
              })}
            </div>

            {/* Game Status & Reset Button */}
            {statusMessage && (
              <div className="mt-3 flex items-center gap-3 text-xs font-mono text-neutral-300">
                <span>{statusMessage}</span>
                <button
                  onClick={resetGame}
                  className="underline hover:text-white transition-colors"
                >
                  Play again
                </button>
              </div>
            )}

            {!statusMessage && (board.some(c => c === "X") || winner) && (
              <button
                onClick={resetGame}
                className="mt-3 text-[11px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors underline"
              >
                Reset
              </button>
            )}

          </div>

        </div>

      </div>
    </footer>
  );
}


