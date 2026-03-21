import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useHooks'
import { useLang } from '../context/LanguageContext'
import { PORTFOLIO } from '../data/content'

// ===== SCROLL REVEAL WRAPPER =====
export function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .65, delay, ease: [0.25,0.1,0.25,1] }}
    >
      {children}
    </motion.div>
  )
}

export function Ticker() {
  const { t } = useLang()
  const itemsStr = t.ticker || 'Web Design · SEO Strategy · Brand Identity · Video Editing · Content Creation · Social Media · Motion Design'
  const tickerItems = itemsStr.split(' · ')
  const items = [...tickerItems, ...tickerItems]
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)', padding: '14px 0' }}>
      <div style={{ display: 'inline-flex', animation: 'tick 30s linear infinite' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 3,
            color: (i % 2 === 1) ? 'var(--coral)' : 'var(--mut)',
            padding: '0 20px',
          }}>
            {item} {i % 2 === 0 ? '' : '✦'}
          </span>
        ))}
      </div>
      <style>{`@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

// ===== STATS =====
export function Stats() {
  const { t } = useLang()
  const items = [
    { n: '50', sup: '+', label: t.stats.projects },
    { n: '3', sup: '×', label: t.stats.roi },
    { n: '4', sup: '', label: t.stats.langs },
    { n: '24', sup: 'h', label: t.stats.reply },
  ]
  return (
    <Reveal>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--bd)' }}>
        {items.map((s, i) => (
          <div key={i} className="stats-item" style={{ padding: '40px', borderRight: i < 3 ? '1px solid var(--bd)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 50, fontWeight: 700, lineHeight: 1, letterSpacing: -2, marginBottom: 6 }}>
              {s.n}<b style={{ color: 'var(--coral)' }}>{s.sup}</b>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sub)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

// ===== SERVICES =====
export function Services() {
  const { t } = useLang()
  return (
    <section className="section bd-b" id="services">
      <Reveal><div className="eyebrow">{t.sections.services}</div></Reveal>
      <Reveal delay={0.1}>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridAutoRows: 'minmax(190px,auto)', gap: 10 }}>

          {/* Featured — Web Design */}
          <BentoCard span={7} tall featured className="svc-1">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.5)', marginBottom: 'auto', display: 'block' }}>01 — Flagship</span>
            <div>
              <div style={{ fontSize: 26, marginBottom: 14 }}>⬡</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: -.5, marginBottom: 8, color: 'var(--white)' }}>Web Design & Development</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.7 }}>Custom-built websites that load fast, look stunning, and convert — from landing pages to full e-commerce platforms.</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                {['React','Webflow','Shopify','WordPress'].map(t => <Tag key={t} featured>{t}</Tag>)}
              </div>
            </div>
          </BentoCard>

          {/* Stat */}
          <BentoCard span={5} dark className="svc-2">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--mut)' }}>Avg. Result</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 58, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
                3<span style={{ fontSize: 24, color: 'var(--coral)' }}>×ROI</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--sub)', marginTop: 8 }}>Average return clients see after a full digital refresh.</p>
            </div>
          </BentoCard>

          {/* SEO */}
          <BentoCard span={5} className="svc-3">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--mut)' }}>02</span>
            <div>
              <div style={{ fontSize: 26, marginBottom: 14 }}>◎</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: -.5, marginBottom: 8 }}>SEO & Content Strategy</div>
              <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.7 }}>Rank higher, stay there. Technical audits + content that search engines and humans love.</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                {['On-Page','Backlinks','Blogging'].map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </BentoCard>

          {/* Brand */}
          <BentoCard span={4} className="svc-4">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--mut)' }}>03</span>
            <div>
              <div style={{ fontSize: 26, marginBottom: 14 }}>◈</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: -.5, marginBottom: 8 }}>Brand Identity</div>
              <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.7 }}>Logo, palette, typography and brand guidelines done right.</p>
            </div>
          </BentoCard>

          {/* Video */}
          <BentoCard span={3} className="svc-5">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--mut)' }}>04</span>
            <div>
              <div style={{ fontSize: 26, marginBottom: 14 }}>▶</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: -.5, marginBottom: 8 }}>Video & Content</div>
              <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.7 }}>Reels, edits, short-form. Scroll-stopping.</p>
            </div>
          </BentoCard>

          {/* Social */}
          <BentoCard span={6} lime className="svc-6">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'rgba(14,12,10,.4)' }}>05</span>
            <div>
              <div style={{ fontSize: 26, marginBottom: 14 }}>📱</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: -.5, color: '#0E0C0A', marginBottom: 8 }}>Social Media Management</div>
              <p style={{ fontSize: 13, color: 'rgba(14,12,10,.6)', lineHeight: 1.7 }}>Consistent posting, real engagement, followers who actually care about your brand.</p>
            </div>
          </BentoCard>

          {/* Languages */}
          <BentoCard span={6} dark className="svc-7">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--mut)' }}>We work in your language</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
              {['🇮🇳 Telugu','🇮🇳 Hindi','🇬🇧 English','🇪🇸 Español'].map(l => (
                <span key={l} style={{ background: 'var(--s1)', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, border: '1px solid var(--bd)' }}>{l}</span>
              ))}
            </div>
          </BentoCard>
        </div>
      </Reveal>
    </section>
  )
}

function BentoCard({ children, span = 6, tall, featured, dark, lime, className }) {
  const bg = featured ? 'var(--coral)' : lime ? 'var(--lime)' : dark ? 'var(--s2)' : 'var(--s1)'
  return (
    <div className={className} style={{
      gridColumn: `span ${span}`, ...(tall ? { gridRow: 'span 2' } : {}),
      background: bg, border: `1px solid ${featured ? 'var(--coral)' : lime ? 'var(--lime)' : 'var(--bd)'}`,
      borderRadius: 16, padding: 32,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      transition: 'all .3s',
    }}>
      {children}
    </div>
  )
}

function Tag({ children, featured }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: '4px 11px', borderRadius: 100,
      border: `1px solid ${featured ? 'rgba(255,255,255,.25)' : 'var(--bd)'}`,
      color: featured ? 'rgba(255,255,255,.8)' : 'var(--sub)',
    }}>{children}</span>
  )
}

// ===== PORTFOLIO =====
export function Portfolio() {
  const { t } = useLang()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section bd-b" id="work">
      <Reveal>
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{t.sections.work}</div>
            <div className="section-title" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: t.sections.workTitle }} />
          </div>
          <button className="btn-outline">{t.sections.allWork}</button>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {PORTFOLIO.map(p => (
            <div key={p.id} className="portfolio-item" style={{
              gridColumn: p.wide ? 'span 2' : 'span 1',
              borderRadius: 16, overflow: 'hidden',
              background: 'var(--s1)', border: '1px solid var(--bd)',
              cursor: 'none', transition: 'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bd2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{
                height: p.wide ? 320 : 240,
                background: p.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.07)' }}>{p.label}</span>
                <div style={{ position: 'absolute', top: 18, right: 18, width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,.4)' }}>↗</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', background: 'linear-gradient(to top,rgba(0,0,0,.88),transparent)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>{p.type}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: p.wide ? 26 : 18, fontWeight: 700, color: 'var(--white)' }}>{p.name}</div>
                </div>
              </div>
              <div style={{ padding: '16px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.client}</span>
                <span style={{ fontSize: 12, color: 'var(--lime)', fontWeight: 700, background: 'rgba(197,241,53,.08)', padding: '3px 11px', borderRadius: 100 }}>{p.result}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ===== PROCESS =====
export function Process() {
  const { t } = useLang()
  const steps = [
    { n: '01', icon: '🔍', title: t.process.s1, desc: t.process.d1 },
    { n: '02', icon: '📐', title: t.process.s2, desc: t.process.d2 },
    { n: '03', icon: '⚡', title: t.process.s3, desc: t.process.d3 },
    { n: '04', icon: '🚀', title: t.process.s4, desc: t.process.d4 },
  ]
  return (
    <section className="section bd-b" id="process">
      <Reveal><div className="eyebrow">{t.process.title}</div></Reveal>
      <Reveal delay={0.1}>
        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}>
          {steps.map((s, i) => (
            <div key={i} className="process-step" style={{
              padding: '36px 30px',
              borderRight: i < 3 ? '1px solid var(--bd)' : 'none',
              transition: 'background .25s',
              position: 'relative',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--s1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'rgba(255,255,255,.04)', lineHeight: 1, marginBottom: 20 }}>{s.n}</div>
              <div style={{ fontSize: 20, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
              <p style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
