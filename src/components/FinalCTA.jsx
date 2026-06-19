import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section style={{ background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '100px 48px' }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
          Get Started
        </div>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(48px, 6vw, 96px)',
          lineHeight: 0.94,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: 32,
          maxWidth: 900,
        }}>
          Stop Searching<br />
          For Buyers.<br />
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>Start Finding Intent.</span>
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 440, marginBottom: 56 }}>
          The modern revenue team runs on signals, not databases.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            background: '#fff',
            color: '#0A0A0A',
            fontSize: 14,
            fontWeight: 600,
            padding: '14px 32px',
            borderRadius: 0,
            letterSpacing: '0.01em',
          }}>Book Demo</button>
          <button style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 14,
            fontWeight: 500,
            padding: '14px 32px',
            borderRadius: 0,
            border: '1px solid rgba(255,255,255,0.15)',
            letterSpacing: '0.01em',
          }}>Start Free Trial</button>
        </div>
      </motion.div>
    </section>
  )
}
