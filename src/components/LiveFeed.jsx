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

const typeIcons = {
  LINKEDIN: <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2" style={{ flexShrink: 0 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  REDDIT: <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF4500" style={{ flexShrink: 0 }}><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
  'X POST': <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
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
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.07em', color: i === 0 ? 'var(--text)' : 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {typeIcons[ev.type] || null}
              {ev.type}
            </span>
            <span style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--text)' : 'var(--text-muted)' }}>{ev.company}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 24 }}>{ev.detail}</span>
            <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{timeAgo(ev.ts)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  )
}
