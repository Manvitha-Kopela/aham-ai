import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { useActiveSection } from '../hooks/useHooks'

const NAV_SECTIONS = ['hero', 'services', 'work', 'pricing', 'team', 'blog', 'contact']
const LANGS = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'hi', label: '🇮🇳 हिन्दी' },
  { code: 'te', label: '🇮🇳 తెలుగు' },
  { code: 'es', label: '🇪🇸 Español' },
]

export default function Navbar({ onPortalOpen, onAdminOpen }) {
  const { lang, setLang, t } = useLang()
  const active = useActiveSection(NAV_SECTIONS)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navItems = [
    { id: 'services', label: t.nav.services },
    { id: 'work', label: t.nav.work },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'team', label: t.nav.team },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 62,
        background: scrolled ? 'rgba(14,12,10,0.97)' : 'rgba(14,12,10,0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--bd)',
        transition: 'background .3s',
      }}>
        {/* Logo */}
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px' }}>
          Aham<b style={{ color: 'var(--coral)' }}>.ai</b>
        </div>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none' }} className="desktop-nav">
          {navItems.map(item => (
            <li key={item.id}>
              <button onClick={() => scrollTo(item.id)} style={{
                background: 'none', border: 'none', cursor: 'none',
                fontSize: 13, fontWeight: 500,
                color: active === item.id ? 'var(--tx)' : 'var(--sub)',
                paddingBottom: 4,
                borderBottom: active === item.id ? '2px solid var(--coral)' : '2px solid transparent',
                transition: 'all .2s',
                fontFamily: 'var(--font-body)',
              }}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                fontSize: 11, fontWeight: 700, padding: '7px 12px',
                border: '1px solid var(--bd)', borderRadius: 100,
                color: langOpen ? 'var(--coral)' : 'var(--sub)',
                background: 'transparent', letterSpacing: '.5px',
                transition: 'all .2s', cursor: 'none',
              }}
            >
              🌐 {lang.toUpperCase()} ▾
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: .18 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: 'var(--s1)', border: '1px solid var(--bd2)',
                    borderRadius: 10, padding: 6, minWidth: 130, zIndex: 400,
                  }}
                  onMouseLeave={() => setLangOpen(false)}
                >
                  {LANGS.map(l => (
                    <div key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                      style={{
                        padding: '8px 14px', fontSize: 12, fontWeight: 600,
                        borderRadius: 7, cursor: 'none',
                        color: lang === l.code ? 'var(--coral)' : 'var(--sub)',
                        background: lang === l.code ? 'rgba(255,77,46,.1)' : 'transparent',
                        transition: 'all .2s',
                      }}
                    >
                      {l.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin - desktop */}
          <button onClick={onAdminOpen} className="desktop-nav" style={{
            fontSize: 12, fontWeight: 600, padding: '8px 16px',
            border: '1px solid var(--bd)', borderRadius: 100,
            color: 'var(--sub)', background: 'transparent', cursor: 'none',
            transition: 'all .2s',
          }}>
            {t.nav.admin} ⚙
          </button>

          {/* Client Login - desktop */}
          <button onClick={onPortalOpen} className="desktop-nav" style={{
            fontSize: 12, fontWeight: 600, padding: '8px 16px',
            border: '1px solid var(--bd)', borderRadius: 100,
            color: 'var(--sub)', background: 'transparent', cursor: 'none',
            transition: 'all .2s',
          }}>
            {t.nav.login}
          </button>

          {/* CTA */}
          <button onClick={() => scrollTo('contact')} style={{
            fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
            padding: '10px 20px', borderRadius: 100,
            background: 'var(--coral)', color: 'var(--white)',
            border: 'none', cursor: 'none', letterSpacing: '.3px',
            transition: 'all .2s',
          }}>
            {t.cta1}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 4, cursor: 'none' }}
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i} style={{ width: 22, height: 2, background: 'var(--tx)', borderRadius: 2, display: 'block' }}
                animate={menuOpen
                  ? i === 0 ? { y: 7, rotate: 45 } : i === 1 ? { opacity: 0 } : { y: -7, rotate: -45 }
                  : { y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: .25 }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'sticky', top: 62, zIndex: 290,
              background: 'var(--s1)', borderBottom: '1px solid var(--bd)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  fontSize: 15, fontWeight: 500, color: 'var(--sub)',
                  padding: '12px 0', borderBottom: '1px solid var(--bd)',
                  background: 'none', border: 'none', textAlign: 'left',
                  cursor: 'none',
                  fontFamily: 'var(--font-body)',
                }}>
                  {item.label}
                </button>
              ))}
              <button onClick={() => { onPortalOpen(); setMenuOpen(false) }} style={{
                fontSize: 15, fontWeight: 600, color: 'var(--coral)',
                padding: '12px 0', background: 'none', border: 'none',
                textAlign: 'left', cursor: 'none', fontFamily: 'var(--font-body)',
              }}>
                {t.nav.login} →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
