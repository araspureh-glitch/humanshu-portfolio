import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import AboutSection from '../components/AboutSection'
import ProcessSection from '../components/ProcessSection'
import PersonalStatementSection from '../components/PersonalStatementSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function About() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-white selection:text-black min-h-screen pt-16">
      <CustomCursor />
      <Navigation />
      <main>
        <AboutSection />
        <ProcessSection />
        <PersonalStatementSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default About
