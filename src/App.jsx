import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import { AudioProvider } from './components/BackgroundAudio'
import { ThemeProvider } from './context/ThemeContext'

// Route Change Analytics Tracker for GA4
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-71L44PYHEC', {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AudioProvider videoId="rVD-zV6ctoM">
          <ScrollToTop />
          <AnalyticsTracker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AudioProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
