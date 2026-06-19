import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: 52,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font)',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text)',
      }}>CNVRTED</span>

      <div style={{ display: 'flex', gap: 36, fontSize: 14, fontWeight: 500 }}>
        {[['Product', '#'], ['Signals', '#'], ['Pricing', '/pricing.html'], ['About', '/about.html']].map(([item, href]) => (
          <a
            key={item}
            href={href}
            style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{item}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>Sign in</a>
      </div>
    </motion.nav>
  )
}
