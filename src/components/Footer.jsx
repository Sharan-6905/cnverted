export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Top bar */}
      <div style={{
        padding: '24px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font)' }}>© 2025 CNVRTED.</p>
        <div style={{ display: 'flex', gap: 28, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
          {[['Privacy', '/privacy.html'], ['Terms', '/terms.html'], ['Contact', 'mailto:hello@cnvrted.com']].map(([item, href]) => (
            <a key={item} href={href}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              style={{ transition: 'color 0.15s', fontFamily: 'var(--font)' }}
            >{item}</a>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div style={{
        overflow: 'hidden',
        lineHeight: 0.85,
        userSelect: 'none',
        paddingTop: 8,
      }}>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(120px, 18vw, 260px)',
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.28)',
          display: 'block',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}>
          CNVRTED
        </span>
      </div>
    </footer>
  )
}
