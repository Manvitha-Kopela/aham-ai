import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { TEAM, FAQS, POSTS, IG_POSTS } from '../data/content'
import { Reveal } from './Sections'

// ===== TEAM =====
export function Team() {
  const { t } = useLang()
  const topThree = TEAM.filter(m => !m.wide)
  const bottomTwo = TEAM.filter(m => m.wide)

  return (
    <section className="section bd-b" id="team">
      <Reveal>
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{t.sections.team}</div>
            <div className="section-title" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: t.sections.teamTitle }} />
          </div>
          <p style={{ maxWidth: 280, fontSize: 13, color: 'var(--sub)', lineHeight: 1.7 }}>
            {t.sections.teamSub}
          </p>
        </div>
      </Reveal>

      {/* Top 3 */}
      <Reveal delay={0.1}>
        <div className="team-grid-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 12 }}>
          {topThree.map(m => <TeamCard key={m.id} member={m} />)}
        </div>
      </Reveal>

      {/* Bottom 2 — wide cards */}
      <Reveal delay={0.2}>
        <div className="team-grid-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {bottomTwo.map(m => <TeamCardWide key={m.id} member={m} />)}
        </div>
      </Reveal>
      <style>{`
        @media(max-width: 1024px) {
          .team-grid-top { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid-bottom { grid-template-columns: 1fr !important; }
        }
        @media(max-width: 640px) {
          .team-grid-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function TeamCard({ member: m }) {
  const { t } = useLang()
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: .25 }}
      style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}
    >
      {/* Photo area */}
      <div style={{ height: 200, background: m.bgGradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: m.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--white)', overflow: 'hidden' }}>
          {m.photoUrl ? (
            <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            m.initials
          )}
        </div>
        {!m.photoUrl && <span style={{ fontSize: 10, color: 'rgba(255,255,255,.02)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.common.photoPlaceholder}</span>}
      </div>

      {/* Info */}
      <div style={{ padding: '22px 24px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, letterSpacing: -.3, marginBottom: 2 }}>{m.name}</div>
        <div style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 600, marginBottom: 10 }}>{m.role}</div>
        <p style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.7, marginBottom: 12 }}>{m.bio}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {m.skills.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, border: '1px solid var(--bd)', color: 'var(--sub)' }}>{s}</span>)}
        </div>
      </div>

      {/* Works */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--mut)', marginBottom: 10 }}>{t.common.recentWork}</div>
        <div className="team-works-grid" style={{ display: 'flex', gap: 8 }}>
          {m.works.map(w => (
            <div key={w.name} style={{ flex: 1, background: 'var(--s2)', borderRadius: 8, padding: '8px 10px', border: '1px solid var(--bd)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: w.color, marginBottom: 5 }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--tx)' }}>{w.name}</div>
              <div style={{ fontSize: 10, color: 'var(--sub)' }}>{w.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--bd)', padding: '12px 24px', gap: 12 }}>
        {m.stats.map(s => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--lime)' }}>{s.n}</div>
            <div style={{ fontSize: 9, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: 1 }}>{t.common.stats[s.key] || s.l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TeamCardWide({ member: m }) {
  const { t } = useLang()
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: .25 }}
      className="team-card-wide"
      style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden', display: 'grid', gridTemplateColumns: '180px 1fr' }}
    >
      <div style={{ background: m.bgGradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 200 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: m.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--white)', overflow: 'hidden' }}>
          {m.photoUrl ? (
            <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            m.initials
          )}
        </div>
        {!m.photoUrl && <span style={{ fontSize: 9, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', padding: '0 8px' }}>Add photo in code</span>}
      </div>
      <div>
        <div style={{ padding: '22px 24px 12px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{m.name}</div>
          <div style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 600, marginBottom: 8 }}>{m.role}</div>
          <p style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.7, marginBottom: 10 }}>{m.bio}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {m.skills.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, border: '1px solid var(--bd)', color: 'var(--sub)' }}>{s}</span>)}
          </div>
        </div>
        <div className="recent-work-container" style={{ padding: '0 24px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--mut)', marginBottom: 10 }}>{t.common.recentWork}</div>
          <div className="team-works-grid" style={{ display: 'flex', gap: 8 }}>
            {m.works.map(w => (
              <div key={w.name} style={{ flex: 1, background: 'var(--s2)', borderRadius: 8, padding: '8px 10px', border: '1px solid var(--bd)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: w.color, marginBottom: 5 }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--tx)' }}>{w.name}</div>
                <div style={{ fontSize: 10, color: 'var(--sub)' }}>{w.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 640px) {
          .team-card-wide { grid-template-columns: 1fr !important; }
          .recent-work-container { display: none; }
        }
      `}</style>
    </motion.div>
  )
}

// ===== FAQ =====
export function FAQ() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)

  return (
    <section className="section bd-b" id="faq">
      <Reveal><div className="eyebrow">{t.sections.faq}</div></Reveal>
      <Reveal delay={0.05}><div className="section-title" style={{ marginBottom: 32 }} dangerouslySetInnerHTML={{ __html: t.sections.faqTitle }} /></Reveal>
      <Reveal delay={0.1}>
        <div style={{ border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid var(--bd)' : 'none' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '22px 28px', cursor: 'none', background: 'none', border: 'none',
                fontSize: 15, fontWeight: 600, color: 'var(--tx)', textAlign: 'left',
                fontFamily: 'var(--font-body)',
                transition: 'background .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: .25 }}
                  style={{ width: 28, height: 28, border: '1px solid var(--bd)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: open === i ? 'var(--white)' : 'var(--sub)', background: open === i ? 'var(--coral)' : 'transparent', flexShrink: 0, transition: 'background .25s, color .25s' }}
                >+</motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [0.25,0.1,0.25,1] }} style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 28px 20px', fontSize: 14, color: 'var(--sub)', lineHeight: 1.8 }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ===== BLOG =====
export function Blog() {
  const { t } = useLang()
  const catStyles = {
    'cat-web': { background: 'rgba(155,127,255,.15)', color: 'var(--violet)' },
    'cat-seo': { background: 'rgba(197,241,53,.1)', color: 'var(--lime)' },
    'cat-brand': { background: 'rgba(255,77,46,.1)', color: 'var(--coral)' },
  }

  return (
    <section className="section bd-b" id="blog">
      <Reveal>
        <div className="section-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{t.sections.blog}</div>
            <div className="section-title" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: t.sections.blogTitle }} />
          </div>
          <button className="btn-outline">{t.common.allArticles}</button>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {POSTS.map(post => (
            <motion.div key={post.id} whileHover={{ y: -4 }} transition={{ duration: .25 }}
              style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden', cursor: 'none' }}
            >
              <div style={{ height: 160, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.08)' }}>{post.cat}</span>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, padding: '4px 12px', borderRadius: 100, ...catStyles[post.catClass] }}>
                  {post.cat}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, letterSpacing: -.3, lineHeight: 1.25, margin: '10px 0 8px' }}>{post.title}</div>
                <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--mut)' }}>{post.date} · {post.read} {t.common.read}</span>
                  <span style={{ color: 'var(--coral)', fontWeight: 600 }}>{t.common.readMore}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <style>{`
          @media(max-width: 1024px) {
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media(max-width: 640px) {
            .blog-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Reveal>
    </section>
  )
}

// ===== INSTAGRAM — now in InstagramFeed.jsx =====
export { default as Instagram } from './InstagramFeed'
