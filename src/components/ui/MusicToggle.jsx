import React from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../BackgroundAudio'

export default function MusicToggle() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <motion.button
      id="music-toggle-btn"
      aria-label={isPlaying ? 'Pause Blinding Lights' : 'Play Blinding Lights'}
      title={isPlaying ? 'Pause Song (Blinding Lights)' : 'Play Song (Blinding Lights)'}
      onClick={toggleAudio}
      whileTap={{ scale: 0.90 }}
      whileHover={{ scale: 1.10 }}
      className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white transition-all duration-300 hover:border-white/50 hover:bg-black/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)] cursor-pointer overflow-hidden p-0.5"
      style={{ flexShrink: 0 }}
    >
      <img
        src="/assets/vinyl_record_icon.png"
        alt="Vinyl Record"
        className={`w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${
          isPlaying ? 'animate-spin' : 'opacity-85'
        }`}
        style={{ animationDuration: '3s' }}
      />
    </motion.button>
  )
}
