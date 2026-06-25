import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Signal cards that fly in ─── */
const signalPool = [
  { id: 0, source: 'LinkedIn', icon: 'in', color: '#0A66C2', company: 'Sarah Chen', role: 'VP Sales · Acme Corp', text: '"Looking for CRM alternatives for Q3."', score: 91, tag: 'INTENT' },
  { id: 1, source: 'Funding', icon: '$', color: '#16A34A', company: 'Anyscale', role: 'Series D · $100M raised', text: 'General Catalyst · just announced', score: 92, tag: 'FUNDING' },
  { id: 2, source: 'Reddit', icon: 'r/', color: '#FF4500', company: 'r/sales', role: '847 upvotes · 234 comments', text: '"Best Apollo alternatives in 2025?"', score: 76, tag: 'DISCUSSION' },
  { id: 3, source: 'Hiring', icon: '↑', color: '#7C3AED', company: 'Brex', role: 'San Francisco, CA', text: '8 SDR + 2 AE roles posted this week', score: 83, tag: 'HIRING' },
  { id: 4, source: 'X', icon: 'x', color: '#E5E7EB', company: '@markwilson_gtm', role: '12.4K followers', text: '"Pipeline is anemic. Changing the stack."', score: 79, tag: 'PAIN' },
  { id: 5, source: 'LinkedIn', icon: 'in', color: '#0A66C2', company: 'Notion', role: 'Head of RevOps · Notion', text: '"Evaluating outbound platforms for H2."', score: 85, tag: 'INTENT' },
  { id: 6, source: 'Funding', icon: '$', color: '#16A34A', company: 'Codeium', role: 'Series C · $65M raised', text: 'Sequoia · Greenoaks · just announced', score: 90, tag: 'FUNDING' },
  { id: 7, source: 'Hiring', icon: '↑', color: '#7C3AED', company: 'Linear', role: 'Remote', text: 'Head of Revenue + 3 AE roles open now', score: 81, tag: 'HIRING' },
]

function SignalCard({ card, index }) {
  const isTop = index === 0
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -60, scale: 0.95 }}
      animate={{
        opacity: Math.max(1 - index * 0.18, 0.08),
        y: 0,
        scale: 1 - index * 0.025,
        filter: index > 2 ? `blur(${(index - 2) * 1.5}px)` : 'none',
      }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: `${index * 68}px`,
        left: 0,
        right: 0,
        background: isTop ? '#1A1A1A' : '#161616',
        border: `1px solid ${isTop ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: isTop ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)' : 'none',
        zIndex: 10 - index,
        pointerEvents: 'none',
      }}
    >
      {/* Source icon */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: `${card.color}20`,
        border: `1px solid ${card.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: card.color, letterSpacing: '0.02em' }}>{card.icon.toUpperCase()}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: isTop ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>{card.company}</span>
          <span style={{
            fontSize: 8, fontWeight: 700, padding: '2px 6px', letterSpacing: '0.07em',
            color: card.color, background: `${card.color}18`, border: `1px solid ${card.color}30`,
          }}>{card.tag}</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{card.role}</div>
        <div style={{ fontSize: 11, color: isTop ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.text}</div>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{
          fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1,
          color: card.score >= 85 ? '#22C55E' : card.score >= 75 ? '#F59E0B' : 'rgba(255,255,255,0.3)',
          textShadow: card.score >= 85 && isTop ? '0 0 20px rgba(34,197,94,0.4)' : 'none',
        }}>{card.score}</div>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', fontWeight: 600, letterSpacing: '0.08em', marginTop: 2 }}>FIT</div>
      </div>
    </motion.div>
  )
}

function FlyingCards() {
  const [cards, setCards] = useState(signalPool.slice(0, 5).map((c, i) => ({ ...c, _key: i })))
  const [poolIdx, setPoolIdx] = useState(5)

  useEffect(() => {
    const id = setInterval(() => {
      const next = { ...signalPool[poolIdx % signalPool.length], _key: Date.now() }
      setCards(prev => [next, ...prev.slice(0, 4)])
      setPoolIdx(i => i + 1)
    }, 2800)
    return () => clearInterval(id)
  }, [poolIdx])

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 28, marginBottom: 32, paddingLeft: 2 }}>
        {[['847', 'Sources monitored'], ['23/hr', 'Signal rate'], ['91%', 'Intent accuracy']].map(([val, label]) => (
          <div key={label}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
        <motion.div
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }}
        />
        <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>LIVE SIGNAL FEED</span>
      </div>

      {/* Card stack */}
      <div style={{ position: 'relative', height: 360 }}>
        <AnimatePresence initial={false}>
          {cards.map((card, i) => (
            <SignalCard key={card._key} card={card} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero-grid" style={{
      height: 'calc(100vh - 56px)',
      background: '#0A0A0A',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow + grain */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />
        <div style={{ position: 'absolute', top: '60%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.025 }} />
      </div>

      {/* Left — copy */}
      <div className="hero-left" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 48px 64px 56px',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        gap: 36,
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
        >
          {/* Product badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '6px 14px' }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#22C55E', textTransform: 'uppercase' }}>AI Revenue Intelligence · Early Access</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontWeight: 800,
            fontSize: 'clamp(36px, 3.8vw, 62px)',
            lineHeight: 0.92,
            letterSpacing: '-0.05em',
            color: '#fff',
            margin: 0,
          }}>
            Right now,<br />
            <span style={{ color: 'rgba(255,255,255,0.22)' }}>someone is choosing</span><br />
            your competitor.
          </h1>

          {/* Body */}
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 360, margin: 0 }}>
            They posted on Reddit. Searched LinkedIn. Hired three SDRs. The signal was there — CNVRTED catches it the moment it happens, before your competitor's rep picks up the phone.
          </p>

          {/* Single bold proof line */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, letterSpacing: '-0.05em', color: '#22C55E', lineHeight: 1, textShadow: '0 0 24px rgba(34,197,94,0.35)' }}>23</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 400, lineHeight: 1.4 }}>buying signals detected in the last hour alone.</span>
          </div>

          {/* Traction signal */}
          <div style={{ display: 'flex', gap: 24, paddingTop: 4, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[['12,400+', 'signals processed in early access'], ['340ms', 'avg. signal-to-pipeline time'], ['4.2×', 'reply rate vs. cold outbound']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 3 }}>{num}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="https://app.cnvrted.com" target="_blank" rel="noopener noreferrer" style={{
              background: '#fff',
              color: '#0A0A0A',
              fontSize: 13, fontWeight: 700,
              padding: '13px 28px',
              letterSpacing: '0.01em',
              display: 'inline-block',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.4)',
            }}>Watch Live Signals →</a>
            <a href="#how" style={{
              color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 500,
              padding: '13px 20px',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'inline-block',
            }}>How it works</a>
          </div>
        </motion.div>
      </div>

      {/* Right — flying cards */}
      <motion.div
        className="hero-cards-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ padding: '48px 56px 48px 40px', position: 'relative', zIndex: 1, overflow: 'hidden' }}
      >
        <FlyingCards />
      </motion.div>
    </section>
  )
}
