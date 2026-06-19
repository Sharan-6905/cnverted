import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import ScrollStory from './components/ScrollStory'
import Comparison from './components/Comparison'
import LiveFeed from './components/LiveFeed'
import AICopilot from './components/AICopilot'
import ROI from './components/ROI'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main style={{ paddingTop: 56 }}>
        <Hero />
        <TrustBar />
        <ScrollStory />
        <Comparison />
        <LiveFeed />
        <AICopilot />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
