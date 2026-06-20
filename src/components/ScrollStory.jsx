import { motion } from 'framer-motion'

const frames = [
  {
    step: '01',
    headline: 'Detect Buying Intent In Real Time',
    sub: 'CNVRTED continuously monitors hundreds of public buying signals across the internet — LinkedIn posts, Reddit threads, funding announcements, hiring activity.',
    visual: 'signals',
  },
  {
    step: '02',
    headline: 'Instant Company Enrichment',
    sub: 'Every signal becomes a complete account profile automatically. Industry, headcount, funding status, tech stack, decision makers — all resolved in seconds.',
    visual: 'enrichment',
  },
  {
    step: '03',
    headline: 'AI Understands Why The Account Matters',
    sub: 'Every recommendation is backed by transparent reasoning. Not a black box — a clear intent score with the specific signals that drove it.',
    visual: 'qualification',
  },
  {
    step: '04',
    headline: 'Qualified Pipelines Build Themselves',
    sub: 'Accounts route automatically into the right pipeline stage based on intent strength. No manual list building. No guesswork.',
    visual: 'pipeline',
  },
  {
    step: '05',
    headline: 'Launch Personalized Outreach Instantly',
    sub: 'Go from signal to conversation in minutes. AI drafts outreach anchored to the specific signal — not a generic template.',
    visual: 'outreach',
  },
]

const tagIcons = {
  LINKEDIN: <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  REDDIT: <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
  FUNDING: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
  HIRING: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
}

function SignalsVisual() {
  const items = [
    { tag: 'LINKEDIN', company: 'Acme Corp', text: '"Looking for CRM recommendations."' },
    { tag: 'REDDIT', company: 'r/sales', text: '"Need better outbound tools."' },
    { tag: 'X', company: 'TechFounder', text: '"Evaluating outbound tools for Q3."' },
    { tag: 'LINKEDIN', company: 'GrowthCo', text: '"Our sales stack needs an upgrade."' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.35 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 120px 1fr',
            gap: 0,
            padding: '14px 20px',
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-subtle)' }}>
            {item.tag}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{item.company}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</span>
        </motion.div>
      ))}
    </div>
  )
}

function EnrichmentVisual() {
  const fields = [
    ['Company', 'Acme Corp'], ['Industry', 'B2B SaaS'],
    ['Employees', '120–180'], ['Funding', 'Series A'],
    ['Tech Stack', 'Salesforce, Outreach'], ['Decision Makers', '3 identified'],
    ['Website', 'acmecorp.com'], ['Growth', '↑ 34% headcount YoY'],
  ]
  return (
    <div style={{ border: '1px solid var(--border)' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>Acme Corp</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--green)' }}>ENRICHED</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {fields.map(([label, val], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            style={{
              padding: '12px 20px',
              borderBottom: i < fields.length - 2 ? '1px solid var(--border)' : 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{val}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function QualificationVisual() {
  const reasons = ['Evaluating CRM tools', 'Hiring 4 SDRs', 'Recently funded ($12M)', 'Active discussions online', 'Technology migration detected']
  return (
    <div style={{ border: '1px solid var(--border)' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>AI Qualification</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Acme Corp</span>
      </div>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 20, alignItems: 'flex-end' }}>
        <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)' }}>91</span>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Intent Score</div>
          <div style={{ width: 100, height: 2, background: 'var(--border)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '91%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ height: '100%', background: 'var(--text)' }}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {reasons.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{ display: 'flex', gap: 10, alignItems: 'center' }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-light)' }}>✓</span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{r}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PipelineVisual() {
  const cols = [
    { label: 'HIGH INTENT', accounts: ['Acme Corp', 'Vertex AI'], active: true },
    { label: 'WARM', accounts: ['Draftbit', 'Cloudinary'], active: false },
    { label: 'MONITOR', accounts: ['Ramp', 'Notion'], active: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid var(--border)' }}>
      {cols.map((col, ci) => (
        <div key={col.label} style={{ borderRight: ci < 2 ? '1px solid var(--border)' : 'none' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.active ? 'var(--text)' : 'var(--text-subtle)' }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: col.active ? 'var(--text)' : 'var(--text-subtle)' }}>{col.label}</span>
          </div>
          <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {col.accounts.map((acc, ai) => (
              <motion.div
                key={acc}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (ci * 2 + ai) * 0.08 }}
                style={{
                  padding: '8px 10px',
                  background: ci === 0 && ai === 0 ? 'var(--text)' : 'transparent',
                  border: ci === 0 && ai === 0 ? 'none' : '1px solid var(--border)',
                  fontSize: 12,
                  fontWeight: ci === 0 && ai === 0 ? 600 : 400,
                  color: ci === 0 && ai === 0 ? 'var(--bg)' : 'var(--text-muted)',
                }}
              >{acc}</motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function OutreachVisual() {
  return (
    <div style={{ border: '1px solid var(--border)' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>AI Outreach Draft</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--green)' }}>READY</span>
      </div>
      {[
        ['SUBJECT', 'Saw your CRM evaluation thread — a thought'],
        ['OPENING', 'Hi Sarah — caught your post on evaluating CRMs. Given your team is scaling and just closed Series A, timing matters a lot here...'],
        ['ANGLE', 'Intent-first, not generic outreach'],
        ['TIMING', 'Send within 24h of signal detection'],
      ].map(([label, val], i, arr) => (
        <div key={label} style={{ padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>{val}</div>
        </div>
      ))}
    </div>
  )
}

const visualMap = {
  signals: <SignalsVisual />,
  enrichment: <EnrichmentVisual />,
  qualification: <QualificationVisual />,
  pipeline: <PipelineVisual />,
  outreach: <OutreachVisual />,
}

export default function ScrollStory() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Section header */}
      <div style={{
        padding: '64px 48px 48px',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 20 }}>How It Works</div>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 56px)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          marginBottom: 20,
        }}>
          Watch a lead move through the engine
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
          From raw signal to personalized outreach in under two minutes. Every step is automatic, transparent, and traceable.
        </p>
      </div>

      {/* Frames */}
      {frames.map((frame, i) => (
        <div
          key={frame.step}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: i < frames.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          {/* Text */}
          <div style={{
            padding: '56px 48px',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: i % 2 === 0 ? 0 : 1,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: 20 }}>STEP {frame.step}</div>
              <h3 style={{
                fontFamily: 'var(--font)',
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 20,
              }}>{frame.headline}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7 }}>{frame.sub}</p>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              padding: '48px',
              display: 'flex',
              alignItems: 'center',
              order: i % 2 === 0 ? 1 : 0,
              background: i % 2 !== 0 ? 'rgba(10,10,10,0.02)' : 'transparent',
            }}
          >
            {visualMap[frame.visual]}
          </motion.div>
        </div>
      ))}

      {/* Workflow summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ padding: '64px 48px', textAlign: 'center' }}
      >
        <h3 style={{
          fontFamily: 'var(--font)',
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          marginBottom: 40,
        }}>From Signal To Pipeline In Seconds</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginBottom: 48, flexWrap: 'wrap' }}>
          {['Signal', 'Enrichment', 'AI Qualification', 'Pipeline', 'Outreach'].map((step, i, arr) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                padding: '9px 18px',
                background: i === 0 ? 'var(--text)' : 'transparent',
                color: i === 0 ? 'var(--bg)' : 'var(--text)',
                border: '1px solid var(--border-strong)',
                borderLeft: i > 0 ? 'none' : '1px solid var(--border-strong)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.01em',
              }}>{step}</div>
            </div>
          ))}
        </div>
        <button style={{
          background: 'var(--text)',
          color: 'var(--bg)',
          fontSize: 14,
          fontWeight: 500,
          padding: '14px 36px',
          borderRadius: 0,
          letterSpacing: '0.01em',
        }}>Book Demo</button>
      </motion.div>
    </section>
  )
}
