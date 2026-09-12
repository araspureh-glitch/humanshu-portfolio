import { useState, useRef, forwardRef, useImperativeHandle } from 'react'

const BackgroundAudio = forwardRef(function BackgroundAudio({ videoId = '16jA-6hiSUo', onStateChange }, ref) {
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
      onStateChange?.(false)
    } else {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
        '*'
      )
      setIsPlaying(true)
      onStateChange?.(true)
    }
  }

  useImperativeHandle(ref, () => ({
    toggleAudio,
    isPlaying
  }))

  return (
    <>
      {/* Hidden YouTube iFrame API player for background audio */}
      <iframe
        ref={playerRef}
        title="Background Audio Player"
        className="hidden"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}&controls=0&disablekb=1`}
        allow="autoplay; encrypted-media"
      />
    </>
  )
})

export default BackgroundAudio

