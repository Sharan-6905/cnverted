import { motion } from 'framer-motion'

const logos = ['Salesforce', 'HubSpot', 'Outreach', 'Apollo', 'ZoomInfo', 'Gong', 'Chorus', 'Salesloft']

export default function TrustBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '24px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: 48,
      }}
    >
      <span style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Trusted by
      </span>
      <div style={{
        height: 1,
        background: 'var(--border)',
        flexShrink: 0,
        width: 1,
        alignSelf: 'stretch',
      }} />
      <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
        {logos.map((logo, i) => (
          <motion.span
            key={logo}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
              opacity: 0.25,
            }}
          >
            {logo}
          </motion.span>
        ))}
      </div>
    </motion.section>
  )
}
