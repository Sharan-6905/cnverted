import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "CNVRTED found us three enterprise opportunities we had zero visibility into. The hiring signals alone paid for a year of subscription in week one.",
    name: "Jordan Lee",
    title: "Co-Founder & CEO",
    company: "Stackline",
  },
  {
    quote: "We used to spend 40% of our SDR time on research. Now CNVRTED surfaces the right accounts every morning. Our team just executes.",
    name: "Marcus Webb",
    title: "Head of Revenue",
    company: "Workframe",
  },
  {
    quote: "The intent scores are scary accurate. We stopped sending generic sequences the day we started using CNVRTED. Pipeline quality went through the roof.",
    name: "Priya Nair",
    title: "Founder",
    company: "Accord Agency",
  },
]

export default function Testimonials() {
  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        padding: '64px 48px 48px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 20 }}>What Teams Say</div>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 4vw, 56px)',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
        }}>Revenue teams<br />love it</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            style={{
              padding: '40px 40px',
              borderRight: i < testimonials.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text)', flex: 1 }}>
              "{t.quote}"
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{t.title} · {t.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
