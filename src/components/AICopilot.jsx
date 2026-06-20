import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sourceIcons = {
  LinkedIn: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Reddit: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF4500">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    </svg>
  ),
  Hiring: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  Funding: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  ),
  'X Post': (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  'Tech Change': (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
    </svg>
  ),
}

function SourceTag({ source }) {
  const icon = sourceIcons[source]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 9,
      fontWeight: 700,
      padding: '3px 8px',
      border: '1px solid var(--border)',
      color: 'var(--text-muted)',
      letterSpacing: '0.06em',
    }}>
      {icon}
      {source}
    </span>
  )
}

const results = [
  { company: 'Acme Corp', score: 91, sources: ['LinkedIn', 'Reddit', 'X Post'], reason: 'Evaluating CRM tools, just funded, SDR hiring', angle: 'Timing-based outreach around funding momentum' },
  { company: 'Vertex AI', score: 87, sources: ['LinkedIn', 'X Post'], reason: 'Series A close + 4 new AE roles this week', angle: 'Lead with scale — they\'re building revenue now' },
  { company: 'Draftbit', score: 78, sources: ['X Post', 'Reddit'], reason: 'CTO posted about broken outbound stack', angle: 'Technical angle — speak to their pain directly' },
]

export default function AICopilot() {
  const [typed, setTyped] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const prompt = 'Find companies actively evaluating CRM software.'

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i <= prompt.length) { setTyped(prompt.slice(0, i)); i++ }
      else {
        clearInterval(t)
        setTimeout(() => { setSubmitted(true); setTimeout(() => setShowResults(true), 500) }, 500)
      }
    }, 36)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        padding: '64px 48px 48px',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 56px)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          marginBottom: 20,
        }}>Talk to your pipeline</h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
          Ask CNVRTED anything. Get accounts, signals, and outreach angles — all in natural language.
        </p>
      </div>

      <div style={{ padding: '48px' }}>
        {/* Prompt */}
        <div style={{
          border: '1px solid var(--border-strong)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 32,
          background: 'var(--bg-card)',
          borderRadius: 100,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 15, color: 'var(--text)', flex: 1, fontWeight: 400 }}>
            {typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              style={{ display: 'inline-block', width: 1.5, height: 14, background: 'var(--text)', marginLeft: 2, verticalAlign: 'middle' }}
            />
          </span>
          {submitted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ background: 'var(--text)', color: 'var(--bg)', fontSize: 12, fontWeight: 600, padding: '7px 18px', borderRadius: 100, letterSpacing: '0.04em' }}
            >RUN</motion.button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 60px',
                padding: '8px 0',
                borderBottom: '1px solid var(--border)',
                marginBottom: 0,
              }}>
                {['COMPANY', 'SIGNAL SOURCES', 'OUTREACH ANGLE', 'SCORE'].map(h => (
                  <span key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>{h}</span>
                ))}
              </div>
              {results.map((r, i) => (
                <motion.div
                  key={r.company}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 60px',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--border)',
                    alignItems: 'start',
                    gap: 24,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{r.company}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.reason}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 2 }}>
                    {r.sources.map(s => (
                      <SourceTag key={s} source={s} />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>{r.angle}</div>
                  <div style={{
                    fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em',
                    color: r.score > 85 ? 'var(--green)' : 'var(--text-muted)',
                  }}>{r.score}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
