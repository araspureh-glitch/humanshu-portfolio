import { useState } from 'react'
import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import { useAudio } from '../components/BackgroundAudio'
import HelloIntro from '../components/HelloIntro'
import Hero from '../components/Hero'
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

  const { isPlaying, toggleAudio } = useAudio()

  return (
    <div
      className="font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen flex flex-col justify-between"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <HelloIntro onComplete={() => setIntroComplete(true)} />
      <CustomCursor />
      <Navigation introComplete={introComplete} />

      <main className="flex-1">
        <Hero introComplete={introComplete} />
        <InteractiveHoverLinks />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default Home
