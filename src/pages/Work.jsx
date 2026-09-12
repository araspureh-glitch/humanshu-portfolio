import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import BackgroundAudio from '../components/BackgroundAudio'
import SelectedWorkSection from '../components/SelectedWorkSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function Work() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen pt-16">
      <CustomCursor />
      <Navigation />
      <BackgroundAudio videoId="16jA-6hiSUo" />
      <main>
        <SelectedWorkSection />
      </main>
      <Footer />
    </div>
  )
}

export default Work
