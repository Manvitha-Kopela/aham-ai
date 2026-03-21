import { useLang } from '../context/LanguageContext'
export default function Footer({ onAdminOpen }) {
  const { t } = useLang()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const links = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.work, id: 'work' },
    { label: t.nav.team, id: 'team' },
    { label: t.nav.blog, id: 'blog' },
    { label: t.footer.privacy, id: null },
  ]

  return (
    <footer className="footer-container" style={{ borderTop: '1px solid var(--bd)', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
        Aham<b style={{ color: 'var(--coral)' }}>.ai</b>
      </div>

      <div className="footer-links" style={{ display: 'flex', gap: 20 }}>
        {links.map(l => (
          <button key={l.label} onClick={() => l.id && scrollTo(l.id)} style={{ fontSize: 12, color: 'var(--sub)', background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--font-body)', transition: 'color .2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.target.style.color = 'var(--tx)'}
            onMouseLeave={e => e.target.style.color = 'var(--sub)'}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--mut)' }}>{t.footer.madeIn}</span>
        <button onClick={onAdminOpen} style={{ fontSize: 11, color: 'var(--mut)', background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--font-body)', transition: 'color .2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--sub)'}
          onMouseLeave={e => e.target.style.color = 'var(--mut)'}
        >
          {t.nav.admin} ⚙
        </button>
      </div>
    </footer>
  )
}
