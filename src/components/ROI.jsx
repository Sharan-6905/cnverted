import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ROI() {
  const [accounts, setAccounts] = useState(10000)

  const withoutMeetings = Math.max(Math.round(accounts * 0.0005), 1)
  const withoutResponses = Math.round(accounts * 0.02)
  const cnvrtedSignals = Math.round(accounts * 0.02)
  const cnvrtedQualified = Math.round(cnvrtedSignals * 0.25)
  const cnvrtedMeetings = Math.round(cnvrtedQualified * 0.24)
  const lift = Math.round(((cnvrtedMeetings / withoutMeetings) - 1) * 100)

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
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 20 }}>ROI Calculator</div>
          <h2 style={{
            fontFamily: 'var(--font)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: 0.96,
            letterSpacing: '-0.04em',
          }}>The math<br />is simple</h2>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
              Accounts in market
            </label>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
              {accounts.toLocaleString()}
            </span>
          </div>
          <input
            type="range" min={1000} max={50000} step={1000} value={accounts}
            onChange={e => setAccounts(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--text)', appearance: 'auto' }}
          />
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '14px 48px', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)', background: 'rgba(10,10,10,0.03)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>WITHOUT CNVRTED</span>
        </div>
        <div style={{ padding: '14px 48px', borderBottom: '1px solid var(--border)', background: 'rgba(10,10,10,0.03)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>WITH CNVRTED</span>
        </div>

        {[
          [accounts.toLocaleString(), 'Accounts researched', cnvrtedSignals.toLocaleString(), 'Intent signals detected'],
          [withoutResponses.toLocaleString(), 'Responses (2%)', cnvrtedQualified.toLocaleString(), 'Qualified accounts'],
          [withoutMeetings, 'Meetings booked', cnvrtedMeetings, 'Meetings booked'],
        ].map(([n1, l1, n2, l2], i) => (
          <>
            <motion.div key={'l' + i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '24px 48px', borderRight: '1px solid var(--border)', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-muted)', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{n1}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{l1}</div>
            </motion.div>
            <motion.div key={'r' + i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.05 }}
              style={{ padding: '24px 48px', background: 'transparent', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: i === 2 ? 'var(--green)' : 'var(--text)', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{n2}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{l2}</div>
            </motion.div>
          </>
        ))}
      </div>

      {lift > 0 && (
        <div style={{ padding: '20px 48px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
            {lift}% more meetings — with {Math.round(cnvrtedSignals / accounts * 100)}% of the research effort
          </span>
        </div>
      )}
    </section>
  )
}
