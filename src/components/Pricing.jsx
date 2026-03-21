import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { PLANS } from '../data/content'
import { Reveal } from './Sections'

export default function Pricing() {
  const { t } = useLang()
  const [annual, setAnnual] = useState(false)
  const scrollTo = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section bd-b" id="pricing">
      <Reveal><div className="eyebrow">{t.sections.pricing}</div></Reveal>
      <Reveal delay={0.05}>
        <div className="section-title" dangerouslySetInnerHTML={{ __html: t.pricing.title }} />
      </Reveal>

      {/* Toggle */}
      <Reveal delay={0.1}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          <span style={{ fontSize: 13, fontWeight: annual ? 400 : 600, color: annual ? 'var(--sub)' : 'var(--tx)', transition: 'all .2s' }}>
            {t.pricing.monthly}
          </span>
          <button onClick={() => setAnnual(!annual)} style={{
            width: 44, height: 24, background: 'var(--coral)', borderRadius: 100,
            position: 'relative', border: 'none', cursor: 'none', transition: 'background .2s',
          }}>
            <motion.div animate={{ x: annual ? 20 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ position: 'absolute', top: 3, left: 3, width: 18, height: 18, borderRadius: '50%', background: 'var(--white)' }}
            />
          </button>
          <span style={{ fontSize: 13, fontWeight: annual ? 600 : 400, color: annual ? 'var(--tx)' : 'var(--sub)', transition: 'all .2s' }}>
            {t.pricing.annual}{' '}
            <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--lime)', color: '#0E0C0A', padding: '3px 8px', borderRadius: 100 }}>{t.pricing.save}</span>
          </span>
        </div>
      </Reveal>

      {/* Cards */}
      <Reveal delay={0.15}>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              whileHover={{ y: -4 }}
              transition={{ duration: .25 }}
              style={{
                background: 'var(--s1)',
                border: plan.popular ? '1.5px solid var(--coral)' : '1px solid var(--bd)',
                borderRadius: 16, padding: '36px 32px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {plan.popular && (
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'var(--coral)', color: 'var(--white)', padding: '4px 12px', borderRadius: 100, width: 'fit-content', marginBottom: 20 }}>
                  {t.pricing.popular}
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{plan.name}</div>
              <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>

              {/* Price */}
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
                {plan.priceMonthly ? (
                  <span style={{ fontSize: 44, letterSpacing: -2 }}>
                    ₹{(annual ? plan.priceAnnual : plan.priceMonthly).toLocaleString('en-IN')}
                    <span style={{ fontSize: 16, letterSpacing: 0, fontFamily: 'var(--font-body)', fontWeight: 400, color: 'var(--sub)' }}>{t.pricing.billingSuffix}</span>
                  </span>
                ) : (
                  <span style={{ fontSize: 36, letterSpacing: -1 }}>{t.pricing.custom}</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 28 }}>
                {plan.priceMonthly
                  ? annual
                    ? `${t.pricing.annualBilling} (${t.pricing.saveAnnual} ₹${((plan.priceMonthly - plan.priceAnnual) * 12).toLocaleString('en-IN')})`
                    : t.pricing.monthlyBilling
                  : t.pricing.customNeeds
                }
              </p>

              <div style={{ height: 1, background: 'var(--bd)', marginBottom: 24 }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: f.included ? 'var(--tx)' : 'var(--sub)' }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50', flexShrink: 0,
                      background: f.included ? 'rgba(197,241,53,.15)' : 'rgba(255,255,255,.04)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9,
                    }}>
                      <span style={{ color: f.included ? 'var(--lime)' : 'var(--mut)' }}>{f.included ? '✓' : '—'}</span>
                    </div>
                    {f.text}
                  </div>
                ))}
              </div>

              <button onClick={scrollTo} style={{
                marginTop: 28, width: '100%', padding: 14,
                borderRadius: 100, fontFamily: 'var(--font-display)',
                fontSize: 14, fontWeight: 600, cursor: 'none',
                background: plan.popular ? 'var(--coral)' : 'transparent',
                color: plan.popular ? 'var(--white)' : 'var(--tx)',
                border: plan.popular ? '1.5px solid var(--coral)' : '1.5px solid var(--bd)',
                transition: 'all .25s',
              }}
                onMouseEnter={e => { if (!plan.popular) { e.target.style.borderColor = 'var(--coral)'; e.target.style.color = 'var(--coral)' } else { e.target.style.background = '#FF6B4A' } }}
                onMouseLeave={e => { if (!plan.popular) { e.target.style.borderColor = 'var(--bd)'; e.target.style.color = 'var(--tx)' } else { e.target.style.background = 'var(--coral)' } }}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <style>{`
        @media(max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          #pricing .section-title { font-size: 32px; }
        }
      `}</style>
    </section>
  )
}
