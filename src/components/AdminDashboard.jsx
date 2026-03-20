import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/usePortal'

// ================================================================
// WHATSAPP FAB
// ================================================================
export function WhatsAppFAB() {
  const WA_NUMBER = '+917013384876' // ← replace with your number
  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}?text=Hi! I found you on your website and I'd like to discuss a project.`}
      target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.06, y: -2 }}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 500,
        background: '#25D366', borderRadius: 100, padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 9,
        boxShadow: '0 4px 20px rgba(37,211,102,.35)',
        fontSize: 13, fontWeight: 700, color: '#fff',
        textDecoration: 'none', cursor: 'none',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      Chat with us
    </motion.a>
  )
}

// ================================================================
// ADMIN LOGIN SCREEN
// ================================================================
function AdminLogin({ auth, onBack }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const submit = async () => {
    try {
      await auth.login(email, pass)
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 20, padding: 48, width: '100%', maxWidth: 440 }}>

        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, textAlign: 'center', marginBottom: 32 }}>
          Admin<b style={{ color: 'var(--coral)' }}>.auth</b>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>Admin Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '13px 16px', fontSize: 14, color: 'var(--tx)', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '13px 16px', fontSize: 14, color: 'var(--tx)', outline: 'none' }} />
        </div>

        {auth.error && <p style={{ fontSize: 12, color: '#FF6B6B', textAlign: 'center', marginBottom: 10 }}>{auth.error}</p>}

        <button onClick={submit} disabled={auth.loading}
          style={{ width: '100%', padding: 15, background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 700, cursor: 'none' }}>
          {auth.loading ? 'Authenticating...' : 'Enter Dashboard →'}
        </button>

        <button onClick={onBack} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', color: 'var(--sub)', fontSize: 13, cursor: 'none' }}>← Back to Site</button>
      </motion.div>
    </div>
  )
}

// ================================================================
// SHARED NAV
// ================================================================
export function OvNav({ title, subtitle, onBack, backLabel = '← Back to Site' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', background: 'var(--s1)', borderBottom: '1px solid var(--bd)', position: 'sticky', top: 0, zIndex: 100 }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--sub)', background: 'none', border: '1px solid var(--bd)', borderRadius: 100, padding: '8px 16px', cursor: 'none', fontFamily: 'var(--font-body)', transition: 'all .2s' }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--tx)'; e.currentTarget.style.borderColor = 'var(--sub)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--sub)'; e.currentTarget.style.borderColor = 'var(--bd)' }}
      >{backLabel}</button>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
        Aham<b style={{ color: 'var(--coral)' }}>.ai</b> — {title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--sub)' }}>{subtitle || ''}</div>
    </div>
  )
}

// ================================================================
// STATUS CONFIG
// ================================================================
const STATUS_CONFIG = {
  new: { label: 'New', bg: 'rgba(245,230,66,.1)', color: 'var(--yellow)' },
  progress: { label: 'In Progress', bg: 'rgba(155,127,255,.1)', color: 'var(--violet)' },
  followup: { label: 'Follow Up', bg: 'rgba(255,77,46,.1)', color: 'var(--coral)' },
  done: { label: 'Completed', bg: 'rgba(197,241,53,.1)', color: 'var(--lime)' },
}

// ================================================================
// ADMIN TABS
// ================================================================
const ADMIN_TABS = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'leads', label: 'Leads', icon: '📥' },
  { id: 'projects', label: 'Projects', icon: '📋' },
  { id: 'newclient', label: '+ New Client', icon: '✚' },
]

// ================================================================
// MAIN ADMIN DASHBOARD
// ================================================================
export function AdminDashboard({ onBack }) {
  console.log('Rendering AdminDashboard...')
  const auth = useAuth()
  const [tab, setTab] = useState('overview')
  const [leads, setLeads] = useState([])
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewClient, setViewClient] = useState(null)

  useEffect(() => {
    if (auth.user && auth.profile?.role === 'admin') {
      loadData()
    }
  }, [auth.user, auth.profile])

  async function loadData() {
    setLoading(true)
    try {
      const [leadsRes, projectsRes, clientsRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('projects').select('*, profiles(full_name, company)').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('role', 'client').order('created_at', { ascending: false }),
      ])

      setLeads(leadsRes.data || [])
      setProjects(projectsRes.data || [])
      setClients(clientsRes.data || [])
    } catch (e) {
      console.error('Admin load error:', e)
    } finally {
      setLoading(false)
    }
  }

  async function updateLeadStatus(id, status) {
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  if (auth.loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>

  if (!auth.user || auth.profile?.role !== 'admin') {
    return <AdminLogin auth={auth} onBack={onBack} />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OvNav title="Admin Dashboard" subtitle="Aham.ai Team" onBack={onBack} />

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 62px)' }}>

        {/* Sidebar */}
        <div style={{ width: 200, background: 'var(--s1)', borderRight: '1px solid var(--bd)', padding: '20px 12px', flexShrink: 0, position: 'sticky', top: 62, height: 'calc(100vh - 62px)', display: 'flex', flexDirection: 'column' }}>
          {ADMIN_TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'none',
              background: tab === t.id
                ? t.id === 'newclient' ? 'rgba(197,241,53,.1)' : 'rgba(255,77,46,.1)'
                : 'transparent',
              color: tab === t.id
                ? t.id === 'newclient' ? 'var(--lime)' : 'var(--coral)'
                : 'var(--sub)',
              fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              marginBottom: 2, textAlign: 'left', fontFamily: 'var(--font-body)',
              transition: 'all .2s',
              ...(t.id === 'newclient' ? { marginTop: 16, borderTop: '1px solid var(--bd)', paddingTop: 16 } : {}),
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>{t.label}
              {t.id === 'leads' && leads.filter(l => l.status === 'new').length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--coral)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100 }}>
                  {leads.filter(l => l.status === 'new').length}
                </span>
              )}
            </button>
          ))}
          <button onClick={auth.logout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'none',
            background: 'transparent',
            color: 'var(--sub)',
            fontSize: 13, fontWeight: 400,
            marginTop: 'auto', textAlign: 'left', fontFamily: 'var(--font-body)',
            transition: 'all .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--coral)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--sub)'}
          >
            <span style={{ fontSize: 14 }}>🚪</span>Log Out
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {viewClient ? (
              <ClientDetail key="detail" client={viewClient} projects={projects} onBack={() => { setViewClient(null); loadData() }} />
            ) : (
              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>

                {/* ── OVERVIEW ── */}
                {tab === 'overview' && (
                  <div>
                    <SectionTitle>Dashboard Overview</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 28 }}>
                      {[
                        { n: leads.filter(l => l.status === 'new').length, l: 'New Leads', c: 'var(--coral)' },
                        { n: projects.filter(p => p.status !== 'Completed').length, l: 'Active Projects', c: 'var(--violet)' },
                        { n: clients.length, l: 'Total Clients', c: 'var(--lime)' },
                        { n: leads.length, l: 'Total Leads', c: 'var(--yellow)' },
                      ].map(s => (
                        <div key={s.l} style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: 24 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: s.c, lineHeight: 1, marginBottom: 4 }}>{loading ? '...' : s.n}</div>
                          <div style={{ fontSize: 12, color: 'var(--sub)' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
                      {/* Recent leads */}
                      <AdminCard title="Recent Leads" action={{ label: 'View All', onClick: () => setTab('leads') }}>
                        {leads.slice(0, 5).map(l => (
                          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--bd)' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx)', marginBottom: 2 }}>{l.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--sub)' }}>{l.service} · {l.email}</div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: STATUS_CONFIG[l.status]?.bg, color: STATUS_CONFIG[l.status]?.color }}>
                              {STATUS_CONFIG[l.status]?.label}
                            </span>
                          </div>
                        ))}
                        {!leads.length && <EmptyState text="No leads yet" />}
                      </AdminCard>

                      {/* Active projects */}
                      <AdminCard title="Active Projects" action={{ label: 'View All', onClick: () => setTab('projects') }}>
                        {projects.slice(0, 4).map(p => (
                          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--bd)' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: (p.color || '#9B7FFF') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx)', marginBottom: 2 }}>{p.name}</div>
                              <div style={{ fontSize: 11, color: 'var(--sub)' }}>{p.profiles?.company || p.type}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ width: 60, height: 3, background: 'var(--mut)', borderRadius: 2, marginBottom: 3 }}>
                                <div style={{ height: '100%', borderRadius: 2, background: p.color || 'var(--coral)', width: `${p.complete}%` }} />
                              </div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: p.color || 'var(--coral)' }}>{p.complete}%</div>
                            </div>
                          </div>
                        ))}
                        {!projects.length && <EmptyState text="No projects yet" />}
                      </AdminCard>
                    </div>
                  </div>
                )}

                {/* ── CLIENTS ── */}
                {tab === 'clients' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                      <SectionTitle>All Clients</SectionTitle>
                      <button onClick={() => setTab('newclient')} style={{ fontSize: 13, fontWeight: 700, padding: '10px 22px', borderRadius: 100, background: 'var(--lime)', color: '#0E0C0A', border: 'none', cursor: 'none' }}>
                        + Add New Client
                      </button>
                    </div>
                    {!clients.length && <EmptyState text="No clients yet — add your first client using the form" />}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                      {clients.map(c => (
                        <div key={c.id} onClick={() => setViewClient(c)}
                          style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: 24, transition: 'all .2s', cursor: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bd2)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bd)'}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,var(--coral),var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', flexShrink: 0 }}>
                              {getInitials(c.full_name)}
                            </div>
                            <div>
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{c.full_name || 'Unnamed'}</div>
                              <div style={{ fontSize: 12, color: 'var(--sub)' }}>{c.company || '—'}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 4 }}>📧 {c.phone || '—'}</div>
                          <div style={{ fontSize: 12, color: 'var(--sub)', marginBottom: 16 }}>📍 {c.city || '—'}</div>
                          <div style={{ fontSize: 11, color: 'var(--mut)', fontFamily: 'monospace', background: 'var(--s2)', padding: '4px 8px', borderRadius: 6, wordBreak: 'break-all' }}>
                            {c.id}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── LEADS ── */}
                {tab === 'leads' && (
                  <div>
                    <SectionTitle>All Leads</SectionTitle>
                    {!leads.length && <EmptyState text="No leads yet — they appear here when someone fills the contact form" />}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {leads.map(l => (
                        <div key={l.id} style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '18px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{l.name}</div>
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: STATUS_CONFIG[l.status]?.bg, color: STATUS_CONFIG[l.status]?.color }}>
                                {STATUS_CONFIG[l.status]?.label}
                              </span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 4 }}>📧 {l.email} · 🛠 {l.service}</div>
                            <div style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.6 }}>{l.message}</div>
                            <div style={{ fontSize: 11, color: 'var(--mut)', marginTop: 8 }}>{new Date(l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                          {/* Status changer */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                            {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                              <button key={key} onClick={() => updateLeadStatus(l.id, key)}
                                style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, border: 'none', cursor: 'none', background: l.status === key ? val.bg : 'transparent', color: l.status === key ? val.color : 'var(--mut)', transition: 'all .2s' }}>
                                {val.label}
                              </button>
                            ))}
                            {/* Convert to client button */}
                            <button onClick={() => { setTab('newclient') }}
                              style={{ fontSize: 10, fontWeight: 700, padding: '6px 10px', borderRadius: 100, border: '1px solid var(--lime)', cursor: 'none', background: 'rgba(197,241,53,.08)', color: 'var(--lime)', marginTop: 4, transition: 'all .2s' }}>
                              → Make Client
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {tab === 'projects' && (
                  <div>
                    <SectionTitle>All Projects</SectionTitle>
                    {!projects.length && <EmptyState text="No projects yet" />}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {projects.map(p => (
                        <div key={p.id} style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color .2s' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bd2)'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bd)'}
                        >
                          <div style={{ width: 48, height: 48, borderRadius: 12, background: (p.color || '#9B7FFF') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{p.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 3 }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--sub)' }}>{p.profiles?.full_name || 'Unknown Client'} · {p.profiles?.company || ''} · {p.type}</div>
                          </div>
                          <div style={{ textAlign: 'center', padding: '0 20px' }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: p.color || 'var(--coral)' }}>{p.complete}%</div>
                            <div style={{ fontSize: 10, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: 1 }}>Complete</div>
                          </div>
                          <div style={{ textAlign: 'center', padding: '0 20px' }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--yellow)' }}>{p.days_left}d</div>
                            <div style={{ fontSize: 10, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: 1 }}>To Launch</div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 100, background: 'rgba(155,127,255,.1)', color: 'var(--violet)' }}>{p.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── NEW CLIENT FORM ── */}
                {tab === 'newclient' && (
                  <NewClientForm onSuccess={() => { loadData(); setTab('clients') }} />
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ================================================================
// NEW CLIENT FORM — creates Supabase user + profile + project
// ================================================================
function NewClientForm({ onSuccess }) {
  const [step, setStep] = useState(1) // 1=client info, 2=project info, 3=timeline, 4=done
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Step 1 — Client info
  const [client, setClient] = useState({
    full_name: '', company: '', email: '', phone: '', city: '', password: '',
  })

  // Step 2 — Project info
  const [project, setProject] = useState({
    name: '', type: 'Web Design & Development', status: 'In Progress',
    color: '#9B7FFF', icon: '💼', complete: 0, days_left: 30, target_date: '',
  })

  // Step 3 — Timeline steps
  const [timeline, setTimeline] = useState([
    { title: 'Discovery & Research', status: 'pending', target_date: '' },
    { title: 'Strategy & Proposal', status: 'pending', target_date: '' },
    { title: 'Design & Development', status: 'pending', target_date: '' },
    { title: 'Review & Revisions', status: 'pending', target_date: '' },
    { title: 'Launch', status: 'pending', target_date: '' },
  ])

  // Step 4 — Deliverables
  const [deliverables, setDeliverables] = useState([
    'Discovery Document',
    'Brand Identity / Logo',
    'Design Mockups',
    'Development',
    'SEO Setup',
    'Final Review',
    'Launch',
  ])

  const PROJECT_TYPES = [
    'Web Design & Development', 'Brand Identity & Design',
    'SEO & Content Strategy', 'Social Media Management',
    'Video & Content Creation', 'Full Digital Package',
  ]

  const PROJECT_ICONS = ['💼', '💎', '🌿', '🌶', '🏥', '🚀', '⭐', '🔥', '💡', '🎯']
  const PROJECT_COLORS = [
    { label: 'Purple', value: '#9B7FFF' }, { label: 'Coral', value: '#FF4D2E' },
    { label: 'Lime', value: '#C5F135' }, { label: 'Blue', value: '#3B82F6' },
    { label: 'Yellow', value: '#F5E642' }, { label: 'Teal', value: '#14B8A6' },
  ]

  const handleCreateClient = async () => {
    setLoading(true)
    setError(null)

    try {
      // ── 1. Create auth user using admin API ──
      const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
        email: client.email,
        password: client.password,
        email_confirm: true, // skip email confirmation
        user_metadata: { full_name: client.full_name },
      })

      // Fallback: use signUp if admin API not available
      let userId
      if (authErr) {
        // If admin API fails, use regular signUp
        const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
          email: client.email,
          password: client.password,
          options: { data: { full_name: client.full_name } },
        })
        if (signUpErr) throw signUpErr
        userId = signUpData.user?.id
      } else {
        userId = authData.user?.id
      }

      if (!userId) throw new Error('Failed to create user — no user ID returned')

      // ── 2. Update profile ──
      await supabase.from('profiles').upsert({
        id: userId,
        full_name: client.full_name,
        company: client.company,
        phone: client.phone,
        city: client.city,
        role: 'client',
      })

      // ── 3. Create project ──
      const { data: projectData, error: projErr } = await supabase
        .from('projects')
        .insert({
          client_id: userId,
          name: project.name || `${client.company} Project`,
          type: project.type,
          status: project.status,
          color: project.color,
          icon: project.icon,
          complete: Number(project.complete),
          days_left: Number(project.days_left),
          target_date: project.target_date || null,
        })
        .select()
        .single()

      if (projErr) throw projErr
      const projectId = projectData.id

      // ── 4. Create timeline steps ──
      if (timeline.length > 0) {
        await supabase.from('timeline_steps').insert(
          timeline.filter(t => t.title.trim()).map((t, i) => ({
            project_id: projectId,
            title: t.title,
            status: t.status,
            target_date: t.target_date || null,
            sort_order: i + 1,
          }))
        )
      }

      // ── 5. Create deliverables ──
      if (deliverables.length > 0) {
        await supabase.from('deliverables').insert(
          deliverables.filter(d => d.trim()).map((d, i) => ({
            project_id: projectId,
            title: d,
            done: false,
            sort_order: i + 1,
          }))
        )
      }

      // ── 6. Create welcome notification ──
      await supabase.from('notifications').insert({
        user_id: userId,
        project_id: projectId,
        type: 'milestone',
        text: `Welcome to Aham.ai! Your ${project.name || 'project'} portal is ready.`,
      })

      // ── Done! ──
      setStep(5)

    } catch (err) {
      console.error('Create client error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (err) => ({
    width: '100%', background: 'var(--bg)',
    border: `1px solid ${err ? '#FF6B6B' : 'var(--bd)'}`,
    borderRadius: 10, padding: '12px 14px',
    fontSize: 14, color: 'var(--tx)', outline: 'none',
  })

  const labelStyle = {
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7,
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <SectionTitle>Add New Client</SectionTitle>

      {/* Progress steps */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {['Client Info', 'Project', 'Timeline', 'Review'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: step > i + 1 ? 'var(--lime)' : step === i + 1 ? 'var(--coral)' : 'var(--s2)', color: step > i + 1 ? '#0E0C0A' : step === i + 1 ? '#fff' : 'var(--sub)', transition: 'all .3s' }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 12, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? 'var(--tx)' : 'var(--sub)' }}>{s}</span>
            </div>
            {i < 3 && <div style={{ width: 24, height: 1, background: 'var(--bd)' }} />}
          </div>
        ))}
      </div>

      {error && (
        <div style={{ background: 'rgba(255,77,46,.08)', border: '1px solid rgba(255,77,46,.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: 'var(--coral)' }}>
          ⚠ {error}
        </div>
      )}

      {/* ── STEP 1: Client Info ── */}
      {step === 1 && (
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Client Information</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input value={client.full_name} onChange={e => setClient(p => ({ ...p, full_name: e.target.value }))}
                placeholder="e.g. Ravi Kiran" style={inputStyle(!client.full_name)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = client.full_name ? 'var(--bd)' : '#FF6B6B'} />
            </div>
            <div>
              <label style={labelStyle}>Company Name</label>
              <input value={client.company} onChange={e => setClient(p => ({ ...p, company: e.target.value }))}
                placeholder="e.g. Nexora Jewellery" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" value={client.email} onChange={e => setClient(p => ({ ...p, email: e.target.value }))}
                placeholder="client@company.com" style={inputStyle(!client.email)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = client.email ? 'var(--bd)' : '#FF6B6B'} />
            </div>
            <div>
              <label style={labelStyle}>Password * <span style={{ color: 'var(--mut)', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>(client uses this to log in)</span></label>
              <input type="text" value={client.password} onChange={e => setClient(p => ({ ...p, password: e.target.value }))}
                placeholder="e.g. Nexora@2026" style={inputStyle(!client.password)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = client.password ? 'var(--bd)' : '#FF6B6B'} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input value={client.phone} onChange={e => setClient(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input value={client.city} onChange={e => setClient(p => ({ ...p, city: e.target.value }))}
                placeholder="e.g. Hyderabad" style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
          </div>

          <div style={{ marginTop: 28, padding: '16px', background: 'rgba(197,241,53,.06)', border: '1px solid rgba(197,241,53,.2)', borderRadius: 10, fontSize: 13, color: 'var(--lime)' }}>
            💡 After creating the client, send them their email and password so they can log into their portal.
          </div>

          <button onClick={() => {
            if (!client.full_name || !client.email || !client.password) {
              setError('Please fill in Full Name, Email and Password')
              return
            }
            setError(null)
            setStep(2)
          }}
            style={{ marginTop: 24, padding: '14px 36px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'none' }}>
            Next: Project Details →
          </button>
        </div>
      )}

      {/* ── STEP 2: Project Info ── */}
      {step === 2 && (
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Project Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Project Name</label>
              <input value={project.name} onChange={e => setProject(p => ({ ...p, name: e.target.value }))}
                placeholder={`e.g. ${client.company || 'Client'} — Web Design`} style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>Service Type</label>
              <select value={project.type} onChange={e => setProject(p => ({ ...p, type: e.target.value }))}
                style={{ ...inputStyle(false), cursor: 'none' }}>
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Project Status</label>
              <select value={project.status} onChange={e => setProject(p => ({ ...p, status: e.target.value }))}
                style={{ ...inputStyle(false), cursor: 'none' }}>
                {['Not Started', 'In Progress', 'On Hold', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Progress (0–100%)</label>
              <input type="number" min="0" max="100" value={project.complete}
                onChange={e => setProject(p => ({ ...p, complete: e.target.value }))}
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>Days Until Launch</label>
              <input type="number" min="1" value={project.days_left}
                onChange={e => setProject(p => ({ ...p, days_left: e.target.value }))}
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>Target Launch Date</label>
              <input type="date" value={project.target_date}
                onChange={e => setProject(p => ({ ...p, target_date: e.target.value }))}
                style={inputStyle(false)}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
            </div>
            <div>
              <label style={labelStyle}>Project Icon</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PROJECT_ICONS.map(icon => (
                  <button key={icon} onClick={() => setProject(p => ({ ...p, icon }))}
                    style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${project.icon === icon ? 'var(--coral)' : 'var(--bd)'}`, background: project.icon === icon ? 'rgba(255,77,46,.1)' : 'var(--s2)', fontSize: 20, cursor: 'none', transition: 'all .2s' }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Project Color</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PROJECT_COLORS.map(c => (
                  <button key={c.value} onClick={() => setProject(p => ({ ...p, color: c.value }))}
                    title={c.label}
                    style={{ width: 32, height: 32, borderRadius: '50%', background: c.value, border: `3px solid ${project.color === c.value ? 'var(--tx)' : 'transparent'}`, cursor: 'none', transition: 'all .2s' }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button onClick={() => setStep(1)} style={{ padding: '14px 28px', background: 'transparent', color: 'var(--sub)', border: '1px solid var(--bd)', borderRadius: 100, fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'none' }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ padding: '14px 36px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'none' }}>Next: Timeline →</button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Timeline ── */}
      {step === 3 && (
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Project Timeline</div>
          <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 24 }}>Set the milestones and expected dates for this project.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {timeline.map((step_, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 140px 32px', gap: 10, alignItems: 'center' }}>
                <input value={step_.title} onChange={e => setTimeline(prev => prev.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s))}
                  placeholder={`Step ${i + 1}`} style={{ ...inputStyle(false), padding: '10px 14px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                  onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
                <select value={step_.status} onChange={e => setTimeline(prev => prev.map((s, idx) => idx === i ? { ...s, status: e.target.value } : s))}
                  style={{ ...inputStyle(false), padding: '10px 10px', cursor: 'none', width: 120 }}>
                  <option value="pending">Pending</option>
                  <option value="current">Current</option>
                  <option value="done">Done</option>
                </select>
                <input type="date" value={step_.target_date} onChange={e => setTimeline(prev => prev.map((s, idx) => idx === i ? { ...s, target_date: e.target.value } : s))}
                  style={{ ...inputStyle(false), padding: '10px 10px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                  onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
                <button onClick={() => setTimeline(prev => prev.filter((_, idx) => idx !== i))}
                  style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>
            ))}
          </div>

          <button onClick={() => setTimeline(prev => [...prev, { title: '', status: 'pending', target_date: '' }])}
            style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, border: '1px dashed var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', marginBottom: 24, display: 'block' }}>
            + Add Step
          </button>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Deliverables Checklist</div>
            {deliverables.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                <input value={d} onChange={e => setDeliverables(prev => prev.map((item, idx) => idx === i ? e.target.value : item))}
                  placeholder={`Deliverable ${i + 1}`} style={{ ...inputStyle(false), flex: 1, padding: '10px 14px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                  onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
                <button onClick={() => setDeliverables(prev => prev.filter((_, idx) => idx !== i))}
                  style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
              </div>
            ))}
            <button onClick={() => setDeliverables(prev => [...prev, ''])}
              style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, border: '1px dashed var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', marginTop: 4 }}>
              + Add Deliverable
            </button>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(2)} style={{ padding: '14px 28px', background: 'transparent', color: 'var(--sub)', border: '1px solid var(--bd)', borderRadius: 100, fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'none' }}>← Back</button>
            <button onClick={() => setStep(4)} style={{ padding: '14px 36px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'none' }}>Next: Review →</button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Review & Confirm ── */}
      {step === 4 && (
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Review & Create</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <ReviewBlock title="Client">
              <ReviewRow label="Name" value={client.full_name} />
              <ReviewRow label="Company" value={client.company} />
              <ReviewRow label="Email" value={client.email} />
              <ReviewRow label="Password" value={client.password} />
              <ReviewRow label="Phone" value={client.phone || '—'} />
              <ReviewRow label="City" value={client.city || '—'} />
            </ReviewBlock>
            <ReviewBlock title="Project">
              <ReviewRow label="Name" value={project.name || `${client.company} Project`} />
              <ReviewRow label="Type" value={project.type} />
              <ReviewRow label="Status" value={project.status} />
              <ReviewRow label="Progress" value={`${project.complete}%`} />
              <ReviewRow label="Days Left" value={project.days_left} />
              <ReviewRow label="Launch Date" value={project.target_date || 'Not set'} />
            </ReviewBlock>
          </div>

          <div style={{ background: 'rgba(197,241,53,.06)', border: '1px solid rgba(197,241,53,.2)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--lime)', marginBottom: 8 }}>What will be created:</div>
            <div style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.8 }}>
              ✓ Supabase auth account for {client.email}<br />
              ✓ Client profile ({client.full_name})<br />
              ✓ Project: {project.name || `${client.company} Project`}<br />
              ✓ {timeline.filter(t => t.title).length} timeline steps<br />
              ✓ {deliverables.filter(d => d).length} deliverables<br />
              ✓ Welcome notification for the client
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(3)} style={{ padding: '14px 28px', background: 'transparent', color: 'var(--sub)', border: '1px solid var(--bd)', borderRadius: 100, fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'none' }}>← Back</button>
            <button onClick={handleCreateClient} disabled={loading}
              style={{ padding: '14px 40px', background: loading ? 'rgba(197,241,53,.5)' : 'var(--lime)', color: '#0E0C0A', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              {loading ? 'Creating...' : '🚀 Create Client & Project'}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: Success ── */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Client Created!</div>
          <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            {client.full_name}'s account and project are ready. Send them their login details:
          </p>

          {/* Copy-ready message */}
          <div style={{ background: 'var(--s2)', border: '1px solid var(--bd)', borderRadius: 14, padding: '24px 28px', textAlign: 'left', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--sub)', marginBottom: 14 }}>WhatsApp / Email Message</div>
            <div id="client-msg" style={{ fontSize: 13, color: 'var(--tx)', lineHeight: 1.9 }}>
              Hi {client.full_name}! 👋<br /><br />
              Your Aham.ai Client Portal is ready!<br /><br />
              🔗 Login: <b style={{ color: 'var(--coral)' }}>https://yourwebsite.com</b><br />
              📧 Email: <b>{client.email}</b><br />
              🔑 Password: <b>{client.password}</b><br /><br />
              You can track your project, download files, approve designs and message our team directly. Let me know if you need help logging in!<br /><br />
              — Aham.ai Team
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => {
              const text = document.getElementById('client-msg').innerText
              navigator.clipboard.writeText(text)
            }}
              style={{ padding: '12px 28px', background: 'var(--s2)', color: 'var(--tx)', border: '1px solid var(--bd)', borderRadius: 100, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'none' }}>
              📋 Copy Message
            </button>
            <button onClick={() => { setStep(1); setClient({ full_name: '', company: '', email: '', phone: '', city: '', password: '' }); setProject({ name: '', type: 'Web Design & Development', status: 'In Progress', color: '#9B7FFF', icon: '💼', complete: 0, days_left: 30, target_date: '' }) }}
              style={{ padding: '12px 28px', background: 'transparent', color: 'var(--sub)', border: '1px solid var(--bd)', borderRadius: 100, fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'none' }}>
              + Add Another Client
            </button>
            <button onClick={onSuccess}
              style={{ padding: '12px 28px', background: 'var(--lime)', color: '#0E0C0A', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'none' }}>
              View All Clients →
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Small helpers ─────────────────────────────────────────────────
function AdminCard({ title, children, action }) {
  return (
    <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>{title}</div>
        {action && <button onClick={action.onClick} style={{ fontSize: 12, color: 'var(--coral)', background: 'none', border: 'none', cursor: 'none', fontWeight: 600 }}>{action.label}</button>}
      </div>
      {children}
    </div>
  )
}

function SectionTitle({ children }) {
  return <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, letterSpacing: -.5, marginBottom: 24 }}>{children}</div>
}

function EmptyState({ text }) {
  return <div style={{ padding: '40px 20px', textAlign: 'center', fontSize: 13, color: 'var(--mut)', border: '1px dashed var(--bd)', borderRadius: 12 }}>{text}</div>
}

function ReviewBlock({ title, children }) {
  return (
    <div style={{ background: 'var(--s2)', border: '1px solid var(--bd)', borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--coral)' }}>{title}</div>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--bd)', fontSize: 13 }}>
      <span style={{ color: 'var(--sub)' }}>{label}</span>
      <span style={{ color: 'var(--tx)', fontWeight: 600 }}>{value}</span>
    </div>
  )
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

// ================================================================
// CLIENT DETAIL VIEW
// ================================================================
function ClientDetail({ client, projects, onBack }) {
  const clientProjects = projects.filter(p => p.client_id === client.id)

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--bd)', borderRadius: 100, padding: '8px 16px', color: 'var(--sub)', fontSize: 13, cursor: 'none' }}>← Back</button>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,var(--coral),var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff' }}>
          {getInitials(client.full_name)}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>{client.full_name}</div>
          <div style={{ fontSize: 14, color: 'var(--sub)' }}>{client.company || 'Private Client'} · {client.city || 'No location'}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        {/* Contact Info */}
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, padding: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--coral)', marginBottom: 20 }}>Contact Details</div>
          <DetailRow label="Email" value={client.email} />
          <DetailRow label="Phone" value={client.phone || '—'} />
          <DetailRow label="City" value={client.city || '—'} />
          <DetailRow label="User ID" value={client.id} code />
          <DetailRow label="Created" value={new Date(client.created_at).toLocaleDateString()} />
        </div>

        {/* Client Projects */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Projects ({clientProjects.length})</div>
          {clientProjects.length === 0 ? (
            <EmptyState text="No projects found for this client" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {clientProjects.map(p => (
                <div key={p.id} style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: (p.color || '#9B7FFF') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--sub)' }}>{p.type} · {p.status}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.complete}%</div>
                    <div style={{ fontSize: 10, color: 'var(--sub)' }}>Complete</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function DetailRow({ label, value, code }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--sub)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--tx)', fontFamily: code ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>{value}</div>
    </div>
  )
}