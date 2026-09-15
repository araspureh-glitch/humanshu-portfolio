import { useState, useRef, createContext, useContext } from 'react'

const AudioContext = createContext({
  isPlaying: false,
  toggleAudio: () => {},
})

export const useAudio = () => useContext(AudioContext)

export function AudioProvider({ children, videoId = 'rVD-zV6ctoM' }) {
  const [isPlaying, setIsPlaying] = useState(false)
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
    </AudioContext.Provider>
  )
}

export default function BackgroundAudio({ videoId = 'rVD-zV6ctoM' }) {
  return null
}
