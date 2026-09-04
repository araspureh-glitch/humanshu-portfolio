import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function Contact() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] font-sans antialiased selection:bg-white selection:text-black min-h-screen pt-16">
      <CustomCursor />
      <Navigation />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Contact
