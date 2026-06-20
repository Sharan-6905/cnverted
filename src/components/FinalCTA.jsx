import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      {/* Grain */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity: 0.025 }} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: '120px 56px', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{
          fontWeight: 800,
          fontSize: 'clamp(48px, 6vw, 96px)',
          lineHeight: 0.92,
          letterSpacing: '-0.05em',
          color: '#fff',
          marginBottom: 40,
          maxWidth: 900,
        }}>
          The signal is live.<br />
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>Is your team watching?</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', lineHeight: 1.75, maxWidth: 380, marginBottom: 56 }}>
          Every hour you're not in CNVRTED, someone else is getting the signal first.
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a
            href="https://app.cnvrted.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#fff',
              color: '#0A0A0A',
              fontSize: 13,
              fontWeight: 700,
              padding: '14px 32px',
              letterSpacing: '0.01em',
              display: 'inline-block',
            }}
          >Watch Live Signals</a>
          <button style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 13,
            fontWeight: 500,
            padding: '14px 28px',
            border: '1px solid rgba(255,255,255,0.1)',
            letterSpacing: '0.01em',
          }}>Book a Demo</button>
        </div>
      </motion.div>
    </section>
  )
}
