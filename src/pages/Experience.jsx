import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import BackgroundAudio from '../components/BackgroundAudio'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function Experience() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#0A66C2] selection:text-white min-h-screen pt-20">
      <CustomCursor />
      <Navigation />
      <BackgroundAudio videoId="16jA-6hiSUo" />
      <main>
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  )
}

export default Experience
