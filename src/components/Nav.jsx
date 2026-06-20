import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      setPastHero(y > window.innerHeight - 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = !pastHero  // dark mode while over dark hero

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="nav-wrap"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: 56,
        background: dark
          ? scrolled ? 'rgba(10,10,10,0.85)' : 'transparent'
          : 'rgba(255,255,255,0.92)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)'
          : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? '#fff' : '#0A0A0A' }}>CNVRTED</span>

      <div className="nav-links" style={{ display: 'flex', gap: 36, fontSize: 13, fontWeight: 500 }}>
        {[['How it works', '#how'], ['Pricing', '/pricing.html'], ['About', '/about.html']].map(([label, href]) => (
          <a key={label} href={href} style={{ color: dark ? 'rgba(255,255,255,0.45)' : '#9B9B9B', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = dark ? '#fff' : '#0A0A0A'}
            onMouseLeave={e => e.target.style.color = dark ? 'rgba(255,255,255,0.45)' : '#9B9B9B'}
          >{label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="#" className="nav-sign-in" style={{ fontSize: 13, fontWeight: 500, color: dark ? 'rgba(255,255,255,0.4)' : '#9B9B9B' }}>Sign in</a>
        <a href="https://app.cnvrted.com" target="_blank" rel="noopener noreferrer" style={{
          background: dark ? '#fff' : '#0A0A0A',
          color: dark ? '#0A0A0A' : '#fff',
          fontSize: 12, fontWeight: 700,
          padding: '8px 18px',
          letterSpacing: '0.01em',
          transition: 'all 0.2s ease',
        }}>Get Started</a>
      </div>
    </motion.nav>
  )
}
