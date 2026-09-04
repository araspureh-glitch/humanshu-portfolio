import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import CinematicHero from '../components/CinematicHero'
import SelectedWorkSection from '../components/SelectedWorkSection'
import AboutSection from '../components/AboutSection'
import ProcessSection from '../components/ProcessSection'
import PersonalStatementSection from '../components/PersonalStatementSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-white selection:text-black min-h-screen">
      <CustomCursor />
      <Navigation />
      
      <main>
        <CinematicHero />
        <SelectedWorkSection />
        <AboutSection />
        <ProcessSection />
        <PersonalStatementSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default Home
