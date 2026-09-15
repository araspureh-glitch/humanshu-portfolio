import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import AboutIntroSection from '../components/AboutIntroSection'
import FloatingHobbiesCloud from '../components/FloatingHobbiesCloud'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import PhilosophySection from '../components/PhilosophySection'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen pt-20">
      <CustomCursor />
      <Navigation />
      <main>
        <AboutIntroSection />
        <PhilosophySection />
        <ExperienceSection />
        <SkillsSection />
        {/* <FloatingHobbiesCloud /> */}
      </main>
      <Footer />
    </div>
  )
}

export default About
