import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollStory from './components/ScrollStory'
import Comparison from './components/Comparison'
import LiveFeed from './components/LiveFeed'
import AICopilot from './components/AICopilot'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero />
        <ScrollStory />
        <Comparison />
        <LiveFeed />
        <AICopilot />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
