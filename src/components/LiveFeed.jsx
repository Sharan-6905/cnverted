import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allEvents = [
  { type: 'HIRING', company: 'Retool', detail: 'Posted 5 AE roles + Head of Revenue' },
  { type: 'FUNDING', company: 'Codeium', detail: '$65M Series C — General Catalyst' },
  { type: 'LINKEDIN', company: 'Alex Chen', detail: '"We just started evaluating new sales tools…"' },
  { type: 'LAUNCH', company: 'Rippling', detail: 'Launched new partner API' },
  { type: 'EXEC HIRE', company: 'Vercel', detail: 'New CRO hired from Stripe' },
  { type: 'MIGRATION', company: 'Deel', detail: 'Moving from legacy CRM to Salesforce' },
  { type: 'REDDIT', company: 'r/sales', detail: '"What outbound tools work in 2025?"' },
  { type: 'HIRING', company: 'Brex', detail: 'Building SDR team — 8 open roles' },
  { type: 'FUNDING', company: 'Anyscale', detail: 'Series D · $100M raised' },
  { type: 'X POST', company: '@markwilson_gtm', detail: '"Pipeline is anemic. Changing the stack."' },
]

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s`
  if (s < 3600) return `${Math.floor(s / 60)}m`
  return `${Math.floor(s / 3600)}h`
}

export default function LiveFeed() {
  const [events, setEvents] = useState(() =>
    allEvents.slice(0, 6).map((e, i) => ({ ...e, id: i, ts: Date.now() - i * 40000 }))
  )
  const [idx, setIdx] = useState(6)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 8000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setEvents(prev => [{ ...allEvents[idx % allEvents.length], id: Date.now(), ts: Date.now() }, ...prev.slice(0, 7)])
      setIdx(i => i + 1)
    }, 3800)
    return () => clearInterval(t)
  }, [idx])

  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        padding: '64px 48px 48px',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'end',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 20 }}>Live Intelligence</div>
          <h2 style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: 0.96,
            letterSpacing: '-0.04em',
          }}>The feed<br />never stops</h2>
        </div>
        <div style={{ alignSelf: 'end', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#22C55E' }}>LIVE</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px 160px 1fr 56px',
        padding: '8px 48px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(10,10,10,0.02)',
      }}>
        {['TYPE', 'COMPANY', 'SIGNAL', 'AGO'].map(h => (
          <span key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>{h}</span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 160px 1fr 56px',
              padding: '14px 48px',
              borderBottom: '1px solid var(--border)',
              alignItems: 'center',
              background: i === 0 ? 'rgba(10,10,10,0.025)' : 'transparent',
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', color: i === 0 ? 'var(--text)' : 'var(--text-subtle)' }}>{ev.type}</span>
            <span style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--text)' : 'var(--text-muted)' }}>{ev.company}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 24 }}>{ev.detail}</span>
            <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{timeAgo(ev.ts)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  )
}
