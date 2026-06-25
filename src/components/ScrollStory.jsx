import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  {
    step: '01', label: 'Detect Signals',
    headline: 'Hundreds of signals enter the engine every hour.',
    sub: 'CNVRTED continuously monitors LinkedIn posts, Reddit threads, X conversations, funding announcements, hiring surges, and product launches — capturing intent before it becomes public knowledge.',
    visual: 'signals',
  },
  {
    step: '02', label: 'Enrich Companies',
    headline: 'Every signal becomes a complete account profile.',
    sub: 'Industry, headcount, funding stage, tech stack, decision makers, and growth trajectory — all resolved automatically within seconds of signal detection.',
    visual: 'enrichment',
  },
  {
    step: '03', label: 'AI Qualification',
    headline: 'The AI scores fit and discards noise.',
    sub: 'Intent scores are calculated using ICP match, signal strength, timing, and competitive context. Low-fit accounts fade. High-fit accounts surface to the top.',
    visual: 'qualification',
  },
  {
    step: '04', label: 'Pipeline Generation',
    headline: 'Qualified accounts route into your pipeline automatically.',
    sub: 'No manual list building. No guesswork. Accounts self-organize by intent strength, stage fit, and engagement window — ready to work the moment they appear.',
    visual: 'pipeline',
  },
  {
    step: '05', label: 'Launch Outreach',
    headline: 'Go from signal to conversation in minutes.',
    sub: 'AI drafts outreach anchored to the specific signal — not a generic template. The right message, to the right person, at the exact moment they show intent.',
    visual: 'outreach',
  },
]

/* ─── Dark card wrapper ─── */
function DarkCard({ children, style = {}, glow }) {
  return (
    <div style={{
      background: '#161616',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: glow
        ? '0 0 0 1px rgba(34,197,94,0.15), 0 8px 32px rgba(0,0,0,0.4)'
        : '0 4px 20px rgba(0,0,0,0.3)',
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── STEP 1: Signals ─── */
const signalPool = [
  { src: 'LI', srcColor: '#0A66C2', tag: 'INTENT', company: 'Sarah Chen', sub: 'VP Sales · Acme Corp', text: '"Looking for CRM alternatives for Q3."', score: 91 },
  { src: 'R/', srcColor: '#FF4500', tag: 'DISCUSSION', company: 'r/sales', sub: '847 upvotes', text: '"Best Apollo alternatives in 2025?"', score: 76 },
  { src: 'X', srcColor: '#E5E7EB', tag: 'PAIN', company: '@markwilson_gtm', sub: '12.4K followers', text: '"Pipeline is anemic. Changing the stack."', score: 79 },
  { src: '$', srcColor: '#16A34A', tag: 'FUNDING', company: 'Anyscale', sub: 'General Catalyst', text: 'Series D · $100M raised this week', score: 92 },
  { src: '↑', srcColor: '#7C3AED', tag: 'HIRING', company: 'Brex', sub: 'San Francisco, CA', text: '8 SDR + 2 AE roles posted today', score: 83 },
  { src: 'LI', srcColor: '#0A66C2', tag: 'INTENT', company: 'Notion', sub: 'Head of RevOps · Notion', text: '"Evaluating outbound platforms for H2."', score: 85 },
  { src: '$', srcColor: '#16A34A', tag: 'FUNDING', company: 'Codeium', sub: 'Sequoia · Greenoaks', text: 'Series C · $65M raised', score: 90 },
  { src: '↑', srcColor: '#7C3AED', tag: 'HIRING', company: 'Linear', sub: 'Remote', text: 'Head of Revenue + 3 AE roles open now', score: 81 },
]

function SignalsVisual() {
  const [cards, setCards] = useState(() =>
    signalPool.slice(0, 5).map((c, i) => ({ ...c, _key: i }))
  )
  const poolIdxRef = useRef(5)

  useEffect(() => {
    const id = setInterval(() => {
      const next = { ...signalPool[poolIdxRef.current % signalPool.length], _key: Date.now() }
      poolIdxRef.current += 1
      setCards(prev => [next, ...prev.slice(0, 4)])
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Signal Stream</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', background: 'rgba(34,197,94,0.1)', padding: '4px 9px', border: '1px solid rgba(34,197,94,0.2)' }}>
          <motion.div animate={{ opacity: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ width: 4, height: 4, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#22C55E', letterSpacing: '0.08em' }}>LIVE · 23/hr</span>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <AnimatePresence initial={false}>
          {cards.map((row, i) => (
            <motion.div
              key={row._key}
              layout
              initial={{ opacity: 0, y: -48, scale: 0.96 }}
              animate={{ opacity: Math.max(1 - i * 0.18, 0.1), y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
            <DarkCard glow={i === 0} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${row.srcColor}18`, border: `1px solid ${row.srcColor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: row.srcColor }}>{row.src}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em' }}>{row.company}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', color: row.srcColor, background: `${row.srcColor}15`, border: `1px solid ${row.srcColor}30`, letterSpacing: '0.06em' }}>{row.tag}</span>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 2 }}>{row.sub}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.text}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{
                  fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1,
                  color: row.score >= 85 ? '#22C55E' : row.score >= 75 ? '#F59E0B' : 'rgba(255,255,255,0.3)',
                  textShadow: row.score >= 85 && i === 0 ? '0 0 16px rgba(34,197,94,0.5)' : 'none',
                }}>{row.score}</div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', fontWeight: 600, letterSpacing: '0.06em', marginTop: 2 }}>FIT</div>
              </div>
            </DarkCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── STEP 2: Enrichment ─── */
const enrichFields = [
  ['INDUSTRY', 'B2B SaaS'], ['EMPLOYEES', '120–180'],
  ['FUNDING', 'Series A · $8M'], ['TECH STACK', 'Salesforce, Outreach'],
  ['HQ', 'San Francisco, CA'], ['YOY GROWTH', '↑ 34% headcount'],
]

function EnrichmentVisual() {
  return (
    <div style={{ width: '100%' }}>
      <DarkCard glow>
        {/* Header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 34, height: 34, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#0A0A0A' }}>AC</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Acme Corp</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>acmecorp.com · B2B SaaS</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.1)', padding: '5px 10px', border: '1px solid rgba(34,197,94,0.2)' }}>
            <motion.div animate={{ opacity: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ width: 4, height: 4, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#22C55E', letterSpacing: '0.1em' }}>ENRICHED</span>
          </div>
        </div>

        {/* Signal trigger */}
        <div style={{ padding: '9px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(37,99,235,0.08)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#60A5FA', fontWeight: 500 }}>↳ Triggered by LinkedIn intent post · 3 minutes ago</span>
        </div>

        {/* Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {enrichFields.map(([label, val], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '13px 16px',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', marginBottom: 5, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{val}</div>
            </motion.div>
          ))}
        </div>

        {/* Decision makers */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Decision Makers</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {['SC', 'MR', 'JD'].map((init, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? '#22C55E' : '#2A2A2A', border: '2px solid #161616', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i }}>
                <span style={{ fontSize: 7, fontWeight: 800, color: i === 0 ? '#000' : 'rgba(255,255,255,0.6)' }}>{init}</span>
              </div>
            ))}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 8, fontWeight: 500 }}>3 identified</span>
          </div>
        </div>
      </DarkCard>
    </div>
  )
}

/* ─── STEP 3: Qualification ─── */
const qualAccounts = [
  { name: 'Acme Corp', score: 91, signals: ['CRM Eval', 'Funded', 'SDR Hire'], keep: true, match: 'Strong ICP' },
  { name: 'Vertex AI', score: 87, signals: ['Series A', '4 AE Roles'], keep: true, match: 'Strong ICP' },
  { name: 'Draftbit', score: 76, signals: ['Tech Change'], keep: true, match: 'Moderate ICP' },
  { name: 'Generic SaaS', score: 34, signals: ['Random post'], keep: false, match: 'No fit' },
  { name: 'Unknown Co.', score: 21, signals: ['Unrelated'], keep: false, match: 'No fit' },
]

function QualificationVisual() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>AI Scoring · 5 Accounts</span>
        <span style={{ fontSize: 10, color: '#22C55E', fontWeight: 700 }}>3 qualified ↑</span>
      </div>

      {qualAccounts.map((acc, i) => (
        <motion.div
          key={acc.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: acc.keep ? 1 : 0.2, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.45 }}
          style={{ marginBottom: 5, position: 'relative' }}
        >
          <DarkCard glow={acc.keep && i === 0} style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, filter: acc.keep ? 'none' : 'grayscale(1)' }}>
            <div style={{ width: 30, height: 30, background: acc.keep ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: acc.keep ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}>{acc.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: acc.keep ? '#fff' : 'rgba(255,255,255,0.25)', marginBottom: 5 }}>{acc.name}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {acc.signals.map(s => (
                  <span key={s} style={{ fontSize: 9, fontWeight: 600, padding: '1px 6px', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 56 }}>
              <div style={{
                fontSize: 21, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1,
                color: acc.score >= 80 ? '#22C55E' : acc.score >= 70 ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                textShadow: acc.score >= 80 && acc.keep ? '0 0 16px rgba(34,197,94,0.4)' : 'none',
              }}>{acc.score}%</div>
              <div style={{ width: 56, height: 2, background: 'rgba(255,255,255,0.06)', marginTop: 5 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${acc.score}%` }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: 'easeOut' }}
                  style={{ height: '100%', background: acc.score >= 80 ? '#22C55E' : acc.score >= 70 ? '#F59E0B' : 'rgba(255,255,255,0.15)' }}
                />
              </div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', marginTop: 3, fontWeight: 500 }}>{acc.match}</div>
            </div>
          </DarkCard>
        </motion.div>
      ))}

      <div style={{ padding: '8px 14px', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', fontSize: 11, color: '#22C55E', fontWeight: 600, display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <span>2 removed · below threshold</span>
        <span>3 moving to pipeline →</span>
      </div>
    </div>
  )
}

/* ─── STEP 4: Pipeline ─── */
const pipelineStages = [
  { label: 'HIGH INTENT', color: '#22C55E', cards: [{ name: 'Acme Corp', tag: 'CRM Eval', score: 91, ago: '3m' }, { name: 'Anyscale', tag: 'Just Funded', score: 92, ago: '12m' }] },
  { label: 'WARM', color: '#F59E0B', cards: [{ name: 'Draftbit', tag: 'SDR Hire', score: 76, ago: '1h' }, { name: 'Cloudinary', tag: 'Tech Change', score: 79, ago: '2h' }] },
  { label: 'MONITOR', color: '#6B7280', cards: [{ name: 'Ramp', tag: 'Social', score: 62, ago: '4h' }, { name: 'Notion', tag: 'Mentioned', score: 58, ago: '6h' }] },
]

function PipelineVisual() {
  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {pipelineStages.map((stage) => (
        <div key={stage.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, padding: '6px 8px', background: `${stage.color}12`, border: `1px solid ${stage.color}25` }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: stage.color, boxShadow: `0 0 6px ${stage.color}` }} />
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.08em', color: stage.color, textTransform: 'uppercase' }}>{stage.label}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stage.cards.map((card, i) => (
              <motion.div key={card.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <DarkCard glow={stage.label === 'HIGH INTENT'} style={{ padding: '11px 12px' }}>
                  <div style={{ width: 22, height: 22, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>{card.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', marginBottom: 5 }}>{card.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 8, fontWeight: 600, padding: '2px 5px', background: `${stage.color}15`, color: stage.color, letterSpacing: '0.04em' }}>{card.tag}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: stage.color, letterSpacing: '-0.02em', textShadow: `0 0 12px ${stage.color}60` }}>{card.score}</span>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{card.ago} ago</span>
                  </div>
                </DarkCard>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── STEP 5: Outreach ─── */
function OutreachVisual() {
  const [sent, setSent] = useState(false)
  return (
    <div style={{ width: '100%' }}>
      {/* Context strip */}
      <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: 8, alignItems: 'center' }}>
        <div style={{ width: 26, height: 26, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: '#0A0A0A' }}>AC</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Acme Corp · Sarah Chen, VP Sales</div>
          <div style={{ fontSize: 10, color: '#60A5FA', fontWeight: 500 }}>Triggered: LinkedIn intent post · 3 minutes ago</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#22C55E', textShadow: '0 0 12px rgba(34,197,94,0.4)' }}>91%</div>
      </div>

      {/* Email */}
      <DarkCard glow style={{ overflow: 'hidden' }}>
        <div style={{ padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>New Message</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: '#22C55E', background: 'rgba(34,197,94,0.1)', padding: '3px 8px', border: '1px solid rgba(34,197,94,0.2)' }}>AI DRAFTED</span>
        </div>
        {[['TO', 'sarah.chen@acmecorp.com'], ['SUBJECT', 'Saw your CRM evaluation post — a thought']].map(([label, val], i) => (
          <div key={label} style={{ display: 'flex', gap: 12, padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', width: 48, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 12, color: i === 1 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)', fontWeight: i === 1 ? 600 : 400 }}>{val}</span>
          </div>
        ))}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          {['Hi Sarah — I caught your post about evaluating CRMs for Q3. Given Acme just hit Series A and you\'re building out the SDR team, the timing window is narrow.',
            'We work specifically with SaaS teams at your stage. Happy to share what\'s working for similar companies right now.',
            'Worth a 15-minute call this week?'
          ].map((para, i) => (
            <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: i === 0 ? 0 : '10px 0 0' }}>{para}</p>
          ))}
        </div>
        <div style={{ padding: '9px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.2)', alignSelf: 'center', marginRight: 2 }}>SIGNALS USED:</span>
          {['LinkedIn intent post', 'Series A funding', '4 open SDR roles'].map(t => (
            <span key={t} style={{ fontSize: 9, padding: '2px 7px', border: '1px solid rgba(37,99,235,0.3)', color: '#60A5FA', fontWeight: 600, background: 'rgba(37,99,235,0.08)' }}>{t}</span>
          ))}
        </div>
        <div style={{ padding: '11px 16px', display: 'flex', gap: 8, background: 'rgba(255,255,255,0.02)' }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setSent(true)}
            style={{ background: sent ? '#16A34A' : '#fff', color: sent ? '#fff' : '#0A0A0A', fontSize: 12, fontWeight: 700, padding: '9px 20px', border: 'none', cursor: 'pointer', letterSpacing: '0.01em', transition: 'all 0.2s', boxShadow: sent ? '0 0 16px rgba(34,197,94,0.3)' : 'none' }}
          >{sent ? '✓ Sent' : 'Send Now'}</motion.button>
          {['Edit', 'Schedule'].map(label => (
            <button key={label} style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500, padding: '9px 16px', background: 'transparent', cursor: 'pointer' }}>{label}</button>
          ))}
        </div>
      </DarkCard>
    </div>
  )
}

/* ─── Visual map ─── */
const visualComponents = { signals: SignalsVisual, enrichment: EnrichmentVisual, qualification: QualificationVisual, pipeline: PipelineVisual, outreach: OutreachVisual }

/* ─── Step text (left, white) ─── */
function StepText({ activeIdx }) {
  const step = steps[activeIdx]
  return (
    <div className="story-text-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 56px', borderRight: '1px solid var(--border)', height: '100%', overflow: 'hidden', background: '#fff' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 48 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ height: 2, flex: 1, background: i <= activeIdx ? '#0A0A0A' : 'rgba(0,0,0,0.08)', transition: 'background 0.4s ease', borderRadius: 2 }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}>{step.step}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>{step.label}</span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(26px, 2.6vw, 42px)', lineHeight: 1.07, letterSpacing: '-0.03em', color: 'var(--text)', margin: 0 }}>{step.headline}</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 380, margin: 0 }}>{step.sub}</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
            {steps.map((s, si) => (
              <div key={s.step} style={{ fontSize: 9, fontWeight: 700, padding: '4px 10px', background: si === activeIdx ? '#0A0A0A' : 'transparent', border: `1px solid ${si === activeIdx ? '#0A0A0A' : 'rgba(0,0,0,0.1)'}`, color: si === activeIdx ? '#fff' : 'var(--text-subtle)', letterSpacing: '0.06em', transition: 'all 0.25s ease' }}>{s.label}</div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─── Visual panel (right, dark) ─── */
function StepVisualPanel({ activeIdx }) {
  const Visual = visualComponents[steps[activeIdx].visual]
  return (
    <div className="story-visual-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', height: '100%', overflow: 'hidden', background: '#0D0D0D', position: 'relative' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', position: 'relative', zIndex: 1 }}
        >
          <Visual />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─── Main export ─── */
export default function ScrollStory() {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const navH = 56 + 56
      const totalScroll = el.offsetHeight - (window.innerHeight - navH)
      const scrolled = Math.max(0, -rect.top + navH)
      const progress = Math.min(1, scrolled / totalScroll)
      setActiveIdx(Math.min(Math.floor(progress * steps.length), steps.length - 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="how" ref={containerRef} style={{ position: 'relative', height: `${steps.length * 100}vh` }}>
      <div className="story-sticky" style={{ position: 'sticky', top: 56, height: 'calc(100vh - 56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        <StepText activeIdx={activeIdx} />
        <StepVisualPanel activeIdx={activeIdx} />
      </div>
    </section>
  )
}
