import { motion } from 'framer-motion'

const contrasts = [
  {
    old: 'Spray a list of 2,000 contacts and pray three reply.',
    cnvrted: 'Reach the 12 who are actively looking — this morning.',
  },
  {
    old: 'Buy a database updated last quarter.',
    cnvrted: 'Catch the signal the moment it happens.',
  },
  {
    old: 'Write generic outreach and guess the timing.',
    cnvrted: 'Send one sentence anchored to what they just said publicly.',
  },
]

export default function Comparison() {
  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.025,
      }} />

      <div className="comparison-inner" style={{ position: 'relative', zIndex: 1, padding: '120px 56px' }}>
        {/* Editorial statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 96 }}
        >
          <p style={{
            fontWeight: 800,
            fontSize: 'clamp(32px, 4.5vw, 68px)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: '#fff',
            maxWidth: 820,
            margin: 0,
          }}>
            Most sales teams are working from a list.{' '}
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>
              You'll be working from the moment.
            </span>
          </p>
        </motion.div>

        {/* Contrast rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {contrasts.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="comparison-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 32,
                paddingBottom: 32,
                gap: 80,
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.15)', marginTop: 3, flexShrink: 0 }}>✕</span>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, margin: 0, fontWeight: 400, textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,0.1)' }}>{row.old}</p>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', marginTop: 3, flexShrink: 0 }}>→</span>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{row.cnvrted}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
