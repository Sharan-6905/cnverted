import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const signals = [
  { company: 'Acme Corp', signal: 'Evaluating CRM solutions', score: 91, tag: 'INTENT' },
  { company: 'r/sales', signal: 'Apollo alternatives thread', score: 84, tag: 'DISCUSSION' },
  { company: 'Vertex AI', signal: 'Series A · $12M raised', score: 88, tag: 'FUNDING' },
  { company: 'Draftbit', signal: 'Hiring 4 SDRs + Head of Sales', score: 79, tag: 'HIRING' },
  { company: 'Cloudinary', signal: 'Migrating from HubSpot', score: 86, tag: 'MIGRATION' },
  { company: '@revops_lead', signal: 'Outbound stack is broken', score: 72, tag: 'SOCIAL' },
  { company: 'Retool', signal: 'VP Sales posting about tools', score: 77, tag: 'INTENT' },
  { company: 'Codeium', signal: 'Series C · $65M raised', score: 90, tag: 'FUNDING' },
  { company: 'Brex', signal: 'Building SDR team — 8 open roles', score: 83, tag: 'HIRING' },
  { company: 'Rippling', signal: 'Launched new partner API', score: 75, tag: 'LAUNCH' },
  { company: 'Deel', signal: 'Moving from Pipedrive to Salesforce', score: 87, tag: 'MIGRATION' },
  { company: 'Linear', signal: 'Hiring Head of Revenue', score: 81, tag: 'HIRING' },
  { company: 'Anyscale', signal: 'Series D · $100M raised', score: 92, tag: 'FUNDING' },
  { company: 'Vercel', signal: 'New CRO hired from Stripe', score: 80, tag: 'EXEC HIRE' },
  { company: '@gtm_weekly', signal: 'Thread on outbound tool alternatives', score: 69, tag: 'SOCIAL' },
  { company: 'Notion', signal: 'Evaluating outbound platforms', score: 85, tag: 'INTENT' },
]

function OSPanel() {
  const [rows, setRows] = useState(signals.slice(0, 11))
  const [idx, setIdx] = useState(11)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setRows(prev => [signals[idx % signals.length], ...prev.slice(0, 11)])
      setIdx(i => i + 1)
      setTick(t => t + 1)
    }, 2400)
    return () => clearInterval(id)
  }, [idx])

  return (
    <div style={{
      background: '#0A0A0A',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font)',
    }}>
      {/* Status bar */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 32 }}>
          {[['SOURCES', '847'], ['SIGNALS/HR', '23'], ['QUALIFIED', String(8 + (tick % 4))]].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', marginBottom: 3, fontWeight: 500 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 130px 1fr 52px',
        gap: 0,
        padding: '8px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {['SOURCE', 'COMPANY', 'SIGNAL', 'SCORE'].map(h => (
          <span key={h} style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {rows.map((row, i) => (
          <motion.div
            key={row.company + row.tag}
            initial={i === 0 ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 130px 1fr 52px',
              gap: 0,
              padding: '10px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              alignItems: 'center',
              opacity: Math.max(1 - i * 0.15, 0.18),
            }}
          >
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: i === 0 ? '#22C55E' : 'rgba(255,255,255,0.35)',
              background: i === 0 ? 'rgba(34,197,94,0.1)' : 'transparent',
              padding: i === 0 ? '2px 6px' : '2px 0',
              display: 'inline-block',
            }}>{row.tag}</span>
            <span style={{ fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{row.company}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{row.signal}</span>
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: row.score > 85 ? '#22C55E' : row.score > 75 ? '#F59E0B' : 'rgba(255,255,255,0.35)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}>{row.score}</span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.04em' }}>CNVRTED INTELLIGENCE ENGINE</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontVariantNumeric: 'tabular-nums' }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{
      height: 'calc(100vh - 56px)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Left */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px',
        borderRight: '1px solid var(--border)',
        overflow: 'hidden',
        gap: 32,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >
          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(48px, 5vw, 80px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            margin: 0,
          }}>
            Find Buyers<br />
            The Moment<br />
            Intent Appears
          </h1>

          {/* Body */}
          <p style={{
            fontSize: 16,
            fontWeight: 400,
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: 400,
            margin: 0,
          }}>
            CNVRTED monitors LinkedIn, Reddit, X, hiring activity, funding events, and buying conversations — surfacing prospects the moment they show intent.
          </p>

          {/* CTA */}
          <div>
            <button style={{
              background: 'var(--text)',
              color: 'var(--bg)',
              fontSize: 14,
              fontWeight: 500,
              padding: '13px 28px',
              borderRadius: 0,
              letterSpacing: '0.01em',
            }}>
              Watch Live Signals
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 40,
            borderTop: '1px solid var(--border)',
            paddingTop: 24,
          }}>
            {[['23', 'Signals per hour'], ['91%', 'Intent accuracy'], ['<2 min', 'To first outreach']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1, marginBottom: 5 }}>{num}</div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 400 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right — OS panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        style={{ overflow: 'hidden' }}
      >
        <OSPanel />
      </motion.div>
    </section>
  )
}
