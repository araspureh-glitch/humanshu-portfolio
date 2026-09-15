import { useState, useRef, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music } from 'lucide-react'

const AudioContext = createContext({
  isPlaying: false,
  toggleAudio: () => {},
})

export const useAudio = () => useContext(AudioContext)

export function AudioProvider({ children, videoId = 'rVD-zV6ctoM' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const playerRef = useRef(null)

  const toggleAudio = () => {
    if (!playerRef.current || !playerRef.current.contentWindow) return

    if (isPlaying) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      )
      setIsPlaying(false)
    } else {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      )
      setIsPlaying(true)
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}

      {/* Hidden YouTube iFrame API player for background audio */}
      <iframe
        ref={playerRef}
        title="Background Audio Player"
        className="hidden"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}&controls=0&disablekb=1`}
        allow="autoplay; encrypted-media"
      />

      {/* Floating Song Icon Button on Every Page */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] pointer-events-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative flex items-center group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Tooltip Label */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mr-3 px-3.5 py-1.5 rounded-full bg-[#0a0a0a]/90 border border-white/20 backdrop-blur-xl text-xs font-mono text-neutral-200 shadow-2xl whitespace-nowrap flex items-center gap-2 pointer-events-none"
              >
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#EA5211] animate-ping' : 'bg-neutral-500'}`} />
                {isPlaying ? 'Pause Background Song' : 'Play Background Song'}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Audio Button */}
          <motion.button
            onClick={toggleAudio}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            animate={
              isPlaying
                ? { y: [0, -4, 0] }
                : { y: 0 }
            }
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
                : {}
            }
            aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
            className={`relative p-3.5 sm:p-4 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl border cursor-pointer ${
              isPlaying
                ? 'bg-[#EA5211]/20 border-[#EA5211] text-[#EA5211] shadow-[0_0_25px_rgba(234,82,17,0.5)] hover:bg-[#EA5211]/30'
                : 'bg-[#0a0a0a]/85 border-white/15 text-neutral-300 hover:text-white hover:border-white/40 shadow-2xl hover:bg-neutral-900/90'
            }`}
          >
            {isPlaying ? (
              <div className="flex items-center gap-1 h-5 px-0.5" title="Music Playing">
                {/* Animated Equalizer Bars */}
                <motion.span
                  animate={{ height: ['30%', '100%', '40%', '90%', '30%'] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="w-1 bg-[#EA5211] rounded-full"
                />
                <motion.span
                  animate={{ height: ['80%', '20%', '100%', '40%', '80%'] }}
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.15 }}
                  className="w-1 bg-[#EA5211] rounded-full"
                />
                <motion.span
                  animate={{ height: ['40%', '90%', '30%', '100%', '40%'] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.3 }}
                  className="w-1 bg-[#EA5211] rounded-full"
                />
              </div>
            ) : (
              <Music className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </AudioContext.Provider>
  )
}

export default function BackgroundAudio({ videoId = 'rVD-zV6ctoM' }) {
  return null
}
