import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import AboutIntroSection from '../components/AboutIntroSection'
import AboutSection from '../components/AboutSection'
import FloatingHobbiesCloud from '../components/FloatingHobbiesCloud'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import PhilosophySection from '../components/PhilosophySection'
import Footer from '../components/Footer'

function About() {
  return (
    <div
      className="font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen pt-20 flex flex-col justify-between"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <CustomCursor />
      <Navigation />
      <main className="flex-1">
        <AboutIntroSection />
        <AboutSection />
        <PhilosophySection />
        <ExperienceSection />
        <SkillsSection />
        <FloatingHobbiesCloud />
      </main>
      <Footer />
    </div>
  )
}

export default About
