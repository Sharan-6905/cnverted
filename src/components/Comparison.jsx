import { motion } from 'framer-motion'

const rows = [
  ['Static databases updated monthly', 'Real-time intent signals, always on'],
  ['Contact-first: spray & pray', 'Intent-first: find buyers in motion'],
  ['Generic templated outreach', 'AI-personalized per signal'],
  ['Guessing the right timing', 'Perfect timing — catch them now'],
  ['Manual research for every account', 'Automatic enrichment at detection'],
]

export default function Comparison() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        padding: '64px 48px 48px',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 20 }}>The Difference</div>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 56px)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          marginBottom: 20,
        }}>Why traditional databases fail</h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
          Lead databases were built for a different era. CNVRTED surfaces intent before it becomes a database record.
        </p>
      </div>

      {/* Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Headers */}
        <div style={{ padding: '14px 48px', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: 'rgba(10,10,10,0.03)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>TRADITIONAL TOOLS</span>
        </div>
        <div style={{ padding: '14px 48px', borderBottom: '1px solid var(--border)', background: 'var(--text)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>CNVRTED</span>
        </div>

        {rows.map(([before, after], i) => (
          <>
            <motion.div
              key={'b' + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '20px 48px',
                borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                borderRight: '1px solid var(--border)',
                fontSize: 14,
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ color: 'rgba(10,10,10,0.2)', fontWeight: 700, fontSize: 13 }}>✕</span>
              {before}
            </motion.div>
            <motion.div
              key={'a' + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 + 0.04 }}
              style={{
                padding: '20px 48px',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: 'var(--bg-dark)',
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ color: '#22C55E', fontWeight: 700, fontSize: 13 }}>✓</span>
              {after}
            </motion.div>
          </>
        ))}
      </div>
    </section>
  )
}
