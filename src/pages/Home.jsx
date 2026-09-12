import { useState, useRef } from 'react'
import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import BackgroundAudio from '../components/BackgroundAudio'
import HelloIntro from '../components/HelloIntro'
import CinematicHero from '../components/CinematicHero'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import { InteractiveHoverLinks } from '../components/ui/interactive-hover-links'

function Home() {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === 'undefined') return true
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeen = sessionStorage.getItem('hasSeenMultilingualIntro') === 'true'
    return prefersReduced || hasSeen
  })

  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen flex flex-col justify-between">
      <HelloIntro onComplete={() => setIntroComplete(true)} />
      <CustomCursor />
      <Navigation introComplete={introComplete} />
      <BackgroundAudio ref={audioRef} videoId="16jA-6hiSUo" onStateChange={setIsPlaying} />

      <main className="flex-1">
        <CinematicHero 
          introComplete={introComplete} 
          onAudioToggle={() => audioRef.current?.toggleAudio()}
          isPlaying={isPlaying}
        />
        <InteractiveHoverLinks />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default Home
