import CustomCursor from '../components/CustomCursor'
import Navigation from '../components/Navigation'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

function Contact() {
  return (
    <div
      className="font-sans antialiased selection:bg-[#EA5211] selection:text-white min-h-screen pt-16 flex flex-col justify-between"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <CustomCursor />
      <Navigation />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>

  )
}

export default Contact
