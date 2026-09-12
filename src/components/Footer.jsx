import React, { useState, useEffect } from "react";

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
  // Initial board state matching screenshot (Cell 3 has 'O' pre-placed)
  const initialBoard = [null, null, null, "O", null, null, null, null, null];
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
    <footer className="w-full bg-[#050505] text-[#F5F5F5] py-20 px-6 sm:px-12 lg:px-20 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8">
        
        {/* Left Column: Direct Inquiry, Email, Subtitle & Text Links with Arrows */}
        <div className="flex flex-col space-y-6 max-w-xl">
          
          {/* Direct Inquiry Block */}
          <div className="flex flex-col space-y-1">
            <span className="font-mono text-[11px] text-neutral-500 tracking-[0.2em] uppercase font-semibold">
              DIRECT INQUIRY
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

          {/* Social Links Row with Arrows (↗) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs text-neutral-300 tracking-widest font-medium uppercase pt-2">
            <a 
              href="https://linkedin.com/in/humanshu-araspure" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>LINKEDIN</span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
            </a>

            <a 
              href="https://www.behance.net/humansharaspur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>BEHANCE</span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
            </a>

            <a 
              href="https://instagram.com/humanshu.araspure" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>INSTAGRAM</span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
            </a>

            <a 
              href="https://github.com/araspureh-glitch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>GITHUB</span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
            </a>
          </div>

        </div>

        {/* Right Column: Tic-Tac-Toe Game */}
        <div className="flex flex-col items-start md:items-start pt-2">
          
          {/* Header */}
          <div className="font-sans text-sm text-neutral-300 tracking-wide font-normal mb-5">
            By the way, can you beat me? :)
          </div>

          {/* Tic-Tac-Toe Grid */}
          <div className="relative flex flex-col items-center">
            
            <div className="grid grid-cols-3 w-[160px] sm:w-[180px] h-[160px] sm:h-[180px]">
              {board.map((cell, index) => {
                const isRightCol = index % 3 === 2;
                const isBottomRow = index >= 6;

                return (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={cell !== null || winner !== null}
                    className={`flex items-center justify-center font-mono text-2xl sm:text-3xl font-light text-white transition-colors ${
                      !isRightCol ? "border-r border-neutral-800" : ""
                    } ${!isBottomRow ? "border-b border-neutral-800" : ""} ${
                      cell === null && !winner ? "hover:bg-white/[0.03]" : ""
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
              <div className="mt-4 flex items-center gap-3 text-xs font-mono text-neutral-300">
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





