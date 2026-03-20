import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, usePortal } from '../hooks/usePortal'
import { OvNav } from './AdminDashboard'

const TABS = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'files', label: 'Files', icon: '📁' },
  { id: 'approvals', label: 'Approvals', icon: '✅' },
  { id: 'invoices', label: 'Invoices', icon: '💳' },
  { id: 'messages', label: 'Messages', icon: '💬' },
  { id: 'brandkit', label: 'Brand Kit', icon: '◈' },
  { id: 'schedule', label: 'Schedule', icon: '📅' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

const fileColors = {
  pdf: '#FF4D2E', ai: '#FF9A00', fig: '#9B7FFF',
  zip: '#3B82F6', png: '#22C55E', jpg: '#22C55E',
}
const fileColor = (type) => fileColors[type] || 'var(--sub)'

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function timeSince(dateStr) {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// ── Shared small components ───────────────────────────────────────
function DashCard({ title, children }) {
  return (
    <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  )
}

function TabTitle({ children, style }) {
  return <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: -.5, ...style }}>{children}</div>
}

function EmptyState({ text }) {
  return <div style={{ padding: '40px 20px', textAlign: 'center', fontSize: 13, color: 'var(--mut)' }}>{text}</div>
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Aham<b style={{ color: 'var(--coral)' }}>.ai</b>
        </div>
        <div style={{ fontSize: 13, color: 'var(--sub)' }}>Loading your dashboard...</div>
      </div>
    </div>
  )
}

// ── Login Screen ──────────────────────────────────────────────────
function LoginScreen({ auth, onBack }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const submit = async () => {
    try { await auth.login(email, pass) }
    catch { }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OvNav title="Client Portal" onBack={onBack} />
      <div style={{ minHeight: 'calc(100vh - 62px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 20, padding: 48, width: '100%', maxWidth: 440 }}>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, textAlign: 'center', marginBottom: 32 }}>
            Aham<b style={{ color: 'var(--coral)' }}>.ai</b>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Welcome back</div>
          <p style={{ fontSize: 13, color: 'var(--sub)', textAlign: 'center', marginBottom: 28 }}>
            Access your project dashboard, files and messages.
          </p>

          {[
            { label: 'Email Address', val: email, set: setEmail, type: 'email', ph: 'your@email.com' },
            { label: 'Password', val: pass, set: setPass, type: 'password', ph: '••••••••' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>
                {f.label}
              </label>
              <input
                type={f.type} value={f.val} placeholder={f.ph}
                onChange={e => f.set(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '13px 16px', fontSize: 14, color: 'var(--tx)', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                onBlur={e => e.target.style.borderColor = 'var(--bd)'}
              />
            </div>
          ))}

          {auth.error && (
            <p style={{ fontSize: 12, color: '#FF6B6B', textAlign: 'center', marginBottom: 10 }}>{auth.error}</p>
          )}

          <button onClick={submit} disabled={auth.loading}
            style={{ width: '100%', padding: 15, fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, background: auth.loading ? 'rgba(255,77,46,.6)' : 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, cursor: 'none', marginTop: 8 }}>
            {auth.loading ? 'Signing in...' : 'Access My Dashboard →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--sub)', marginTop: 16 }}>
            Forgot password? Contact{' '}
            <a href="mailto:hello@aham.ai" style={{ color: 'var(--coral)' }}>hello@aham.ai</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────
function Dashboard({ auth, onBack }) {
  const portal = usePortal(auth.user, auth.profile)
  const [tab, setTab] = useState('overview')
  const [showNotifs, setShowNotifs] = useState(false)
  const [newMsg, setNewMsg] = useState('')
  const [bookedSlot, setBookedSlot] = useState(null)
  const [revisionOpen, setRevisionOpen] = useState(false)
  const [revisionText, setRevisionText] = useState('')
  const [revisionPriority, setRevisionPriority] = useState('normal')
  const [revisionSent, setRevisionSent] = useState(false)
  const [rating, setRating] = useState(0)
  const [ratingDone, setRatingDone] = useState(false)
  const [profileForm, setProfileForm] = useState(null)
  const [profileSaved, setProfileSaved] = useState(false)
  const fileInputRef = useRef(null)

  const unread = portal.notifications.filter(n => !n.read).length
  const p = auth.profile || {}
  const proj = portal.activeProject
  const pd = portal.projectData

  if (!profileForm && p.full_name) {
    setProfileForm({
      full_name: p.full_name,
      company: p.company || '',
      phone: p.phone || '',
      city: p.city || '',
      email: auth.user?.email || '',
    })
  }

  const sendMsg = async () => {
    if (!newMsg.trim()) return
    await portal.postMessage(newMsg)
    setNewMsg('')
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try { await portal.handleFileUpload(file) }
    catch (err) { alert('Upload failed: ' + err.message) }
  }

  const submitRevision = () => {
    if (!revisionText.trim()) return
    setRevisionSent(true)
    portal.postMessage(`[REVISION REQUEST — ${revisionPriority.toUpperCase()}]: ${revisionText}`)
    setTimeout(() => { setRevisionSent(false); setRevisionOpen(false); setRevisionText('') }, 2500)
  }

  const saveProfile = async () => {
    await auth.saveProfile(profileForm)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  if (portal.loadingProject && !pd) return <LoadingScreen />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Top Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 62, background: 'var(--s1)', borderBottom: '1px solid var(--bd)', position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
          Aham<b style={{ color: 'var(--coral)' }}>.ai</b> Portal
        </div>

        {/* Project switcher */}
        <div style={{ display: 'flex', gap: 8 }}>
          {portal.projects.map(pr => (
            <button key={pr.id} onClick={() => portal.setActiveProject(pr)}
              style={{ fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 100, border: 'none', cursor: 'none', background: proj?.id === pr.id ? pr.color + '20' : 'transparent', color: proj?.id === pr.id ? pr.color : 'var(--sub)', outline: proj?.id === pr.id ? `1px solid ${pr.color}40` : 'none', transition: 'all .2s' }}>
              {pr.icon} {pr.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowNotifs(!showNotifs); portal.dismissNotifications() }}
              style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--bd)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', fontSize: 16 }}>
              🔔
            </button>
            {unread > 0 && (
              <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: 'var(--coral)', fontSize: 9, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unread}
              </div>
            )}
            <AnimatePresence>
              {showNotifs && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ position: 'absolute', top: 44, right: 0, width: 320, background: 'var(--s1)', border: '1px solid var(--bd2)', borderRadius: 14, overflow: 'hidden', zIndex: 300 }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--bd)', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700 }}>Notifications</div>
                  {portal.notifications.length === 0
                    ? <div style={{ padding: 16, fontSize: 13, color: 'var(--sub)', textAlign: 'center' }}>No notifications yet</div>
                    : portal.notifications.map(n => (
                      <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid var(--bd)', background: n.read ? 'transparent' : 'rgba(255,77,46,.04)' }}>
                        <div style={{ fontSize: 13, color: 'var(--tx)', marginBottom: 3 }}>{n.text}</div>
                        <div style={{ fontSize: 11, color: 'var(--sub)' }}>{new Date(n.created_at).toLocaleDateString()}</div>
                      </div>
                    ))
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ fontSize: 13, fontWeight: 600 }}>{p.full_name || 'Client'}</div>
          <button onClick={auth.logout}
            style={{ fontSize: 12, color: 'var(--sub)', background: 'none', border: '1px solid var(--bd)', borderRadius: 100, padding: '6px 14px', cursor: 'none', fontFamily: 'var(--font-body)' }}>
            Log Out
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 62px)' }}>

        {/* Sidebar */}
        <div style={{ width: 200, background: 'var(--s1)', borderRight: '1px solid var(--bd)', padding: '20px 12px', flexShrink: 0, position: 'sticky', top: 62, height: 'calc(100vh - 62px)', overflowY: 'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'none', background: tab === t.id ? 'rgba(255,77,46,.1)' : 'transparent', color: tab === t.id ? 'var(--coral)' : 'var(--sub)', fontSize: 13, fontWeight: tab === t.id ? 600 : 400, marginBottom: 2, textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'all .2s' }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              {t.label}
              {t.id === 'approvals' && pd?.approvals?.filter(a => a.status === 'pending').length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--coral)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100 }}>
                  {pd.approvals.filter(a => a.status === 'pending').length}
                </span>
              )}
              {t.id === 'invoices' && pd?.invoices?.filter(i => i.status === 'due').length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'rgba(245,230,66,.15)', color: 'var(--yellow)', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100 }}>
                  due
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>

              {/* ── OVERVIEW ── */}
              {tab === 'overview' && (
                <div>
                  <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '24px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                        Welcome back, {p.full_name?.split(' ')[0] || 'there'}! 👋
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--sub)' }}>{proj?.name} — {proj?.type}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, padding: '7px 16px', borderRadius: 100, background: `${proj?.color || '#9B7FFF'}15`, color: proj?.color || 'var(--violet)', border: `1px solid ${proj?.color || '#9B7FFF'}30` }}>
                        🔨 {proj?.status}
                      </div>
                      <button onClick={() => setTab('schedule')}
                        style={{ fontSize: 12, fontWeight: 600, padding: '7px 16px', borderRadius: 100, background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'none' }}>
                        📅 Book a Call
                      </button>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                      { n: `${proj?.complete || 0}%`, l: 'Complete', c: 'var(--lime)' },
                      { n: `${proj?.days_left || 0}d`, l: 'To Launch', c: 'var(--yellow)' },
                      { n: `${pd?.deliverables?.filter(x => x.done).length || 0}/${pd?.deliverables?.length || 0}`, l: 'Deliverables', c: 'var(--violet)' },
                      { n: `${pd?.approvals?.filter(a => a.status === 'pending').length || 0}`, l: 'Needs Approval', c: 'var(--coral)' },
                    ].map(s => (
                      <div key={s.l} style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 12, padding: '18px 20px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: s.c }}>{s.n}</div>
                        <div style={{ fontSize: 11, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
                    <DashCard title="Project Timeline">
                      {(pd?.timeline || []).map((s, i) => (
                        <div key={s.id} style={{ display: 'flex', gap: 14, position: 'relative' }}>
                          {i < (pd.timeline.length - 1) && (
                            <div style={{ position: 'absolute', left: 13, top: 30, bottom: 0, width: 1, background: 'var(--bd)' }} />
                          )}
                          <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, background: s.status === 'done' ? 'var(--lime)' : s.status === 'current' ? 'var(--coral)' : 'transparent', border: s.status === 'done' ? '2px solid var(--lime)' : s.status === 'current' ? '2px solid var(--coral)' : '2px solid var(--bd)', color: (s.status === 'done' || s.status === 'current') ? '#0E0C0A' : 'var(--sub)' }}>
                            {s.status === 'done' ? '✓' : s.status === 'current' ? '→' : i + 1}
                          </div>
                          <div style={{ paddingBottom: 22, flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.title}</div>
                            <div style={{ fontSize: 11, color: 'var(--sub)' }}>{s.target_date}</div>
                          </div>
                        </div>
                      ))}
                      {!pd?.timeline?.length && <EmptyState text="No timeline steps yet" />}
                    </DashCard>

                    <DashCard title="Recent Activity">
                      {(pd?.activity || []).map((a, i) => (
                        <div key={a.id} style={{ display: 'flex', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < pd.activity.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: (a.color || 'var(--coral)') + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{a.icon}</div>
                          <div>
                            <div style={{ fontSize: 12, color: 'var(--tx)', lineHeight: 1.5, marginBottom: 2 }}>{a.text}</div>
                            <div style={{ fontSize: 11, color: 'var(--mut)' }}>{timeSince(a.created_at)}</div>
                          </div>
                        </div>
                      ))}
                      {!pd?.activity?.length && <EmptyState text="No activity yet" />}
                    </DashCard>
                  </div>

                  {/* Satisfaction rating */}
                  <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 24px', marginTop: 16 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                      How are we doing?{' '}
                      <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--sub)' }}>Rate this milestone</span>
                    </div>
                    {ratingDone
                      ? <div style={{ color: 'var(--lime)', fontSize: 14, fontWeight: 600 }}>✓ Thanks for the feedback!</div>
                      : (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onClick={() => setRating(s)}
                              style={{ fontSize: 28, background: 'none', border: 'none', cursor: 'none', opacity: s <= rating ? 1 : 0.3, transition: 'all .15s', transform: s <= rating ? 'scale(1.15)' : 'scale(1)' }}>
                              ⭐
                            </button>
                          ))}
                          {rating > 0 && (
                            <button onClick={() => setRatingDone(true)}
                              style={{ marginLeft: 12, fontSize: 12, fontWeight: 700, padding: '7px 18px', borderRadius: 100, background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'none' }}>
                              Submit
                            </button>
                          )}
                        </div>
                      )
                    }
                  </div>
                </div>
              )}

              {/* ── FILES ── */}
              {tab === 'files' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TabTitle>Files & Documents</TabTitle>
                    <div>
                      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleUpload} />
                      <button onClick={() => fileInputRef.current?.click()}
                        style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'none' }}>
                        ↑ Upload File
                      </button>
                    </div>
                  </div>
                  {!(pd?.files?.length) && <EmptyState text="No files uploaded yet" />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(pd?.files || []).map(f => (
                      <div key={f.id}
                        style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, transition: 'border-color .2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bd2)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bd)'}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: fileColor(f.file_type) + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: fileColor(f.file_type), flexShrink: 0 }}>
                          .{f.file_type}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{f.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--sub)' }}>
                            By {f.uploader_name} · {new Date(f.created_at).toLocaleDateString()} · {f.size_mb} MB
                          </div>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: 'rgba(155,127,255,.1)', color: 'var(--violet)' }}>
                          {f.category}
                        </span>
                        <button
                          onClick={async () => {
                            const url = await portal.getDownloadUrl(f.storage_path)
                            if (url) window.open(url, '_blank')
                          }}
                          style={{ fontSize: 12, fontWeight: 600, padding: '7px 16px', borderRadius: 100, border: '1px solid var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', transition: 'all .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.color = 'var(--sub)' }}
                        >
                          ↓ Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── APPROVALS ── */}
              {tab === 'approvals' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TabTitle>Approvals & Feedback</TabTitle>
                    <button onClick={() => setRevisionOpen(true)}
                      style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, background: 'rgba(255,77,46,.1)', color: 'var(--coral)', border: '1px solid rgba(255,77,46,.2)', cursor: 'none' }}>
                      + Request Revision
                    </button>
                  </div>
                  {!(pd?.approvals?.length) && <EmptyState text="No items pending approval" />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(pd?.approvals || []).map(a => (
                      <div key={a.id}
                        style={{ background: 'var(--s1)', border: `1px solid ${a.status === 'pending' ? 'rgba(255,77,46,.3)' : 'var(--bd)'}`, borderRadius: 14, padding: '20px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                            {a.preview_icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{a.item_name}</div>
                            <div style={{ fontSize: 12, color: 'var(--sub)' }}>By {a.submitted_by} · {new Date(a.created_at).toLocaleDateString()}</div>
                          </div>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            {a.status === 'pending' && (
                              <>
                                <button onClick={() => portal.handleApproval(a.id, 'approved')}
                                  style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, background: 'rgba(197,241,53,.15)', color: 'var(--lime)', border: 'none', cursor: 'none' }}>
                                  ✓ Approve
                                </button>
                                <button onClick={() => portal.handleApproval(a.id, 'changes')}
                                  style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, background: 'rgba(255,77,46,.1)', color: 'var(--coral)', border: 'none', cursor: 'none' }}>
                                  ↺ Changes
                                </button>
                              </>
                            )}
                            {a.status === 'approved' && <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(197,241,53,.12)', color: 'var(--lime)' }}>✓ Approved</span>}
                            {a.status === 'changes' && <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(255,77,46,.1)', color: 'var(--coral)' }}>↺ Changes Requested</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Revision modal */}
                  <AnimatePresence>
                    {revisionOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: 24 }}
                        onClick={e => e.target === e.currentTarget && setRevisionOpen(false)}>
                        <motion.div initial={{ scale: .95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95 }}
                          style={{ background: 'var(--s1)', border: '1px solid var(--bd2)', borderRadius: 18, padding: 32, width: '100%', maxWidth: 500 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Request a Revision</div>
                          {revisionSent
                            ? <div style={{ color: 'var(--lime)', fontSize: 14, fontWeight: 600, textAlign: 'center', padding: '20px 0' }}>✓ Revision request sent!</div>
                            : (
                              <>
                                <div style={{ marginBottom: 14 }}>
                                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>Priority</label>
                                  <div style={{ display: 'flex', gap: 8 }}>
                                    {['low', 'normal', 'urgent'].map(pv => (
                                      <button key={pv} onClick={() => setRevisionPriority(pv)}
                                        style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'none', fontSize: 12, fontWeight: 600, textTransform: 'capitalize', background: revisionPriority === pv ? 'var(--coral)' : 'var(--s2)', color: revisionPriority === pv ? '#fff' : 'var(--sub)', transition: 'all .2s' }}>
                                        {pv}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>Describe the Change</label>
                                  <textarea value={revisionText} onChange={e => setRevisionText(e.target.value)} rows={4}
                                    placeholder="Describe what you'd like changed and where..."
                                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: 'var(--tx)', outline: 'none', resize: 'none' }}
                                    onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                  <button onClick={() => setRevisionOpen(false)}
                                    style={{ flex: 1, padding: 12, borderRadius: 100, border: '1px solid var(--bd)', background: 'transparent', color: 'var(--sub)', cursor: 'none', fontSize: 13, fontFamily: 'var(--font-body)' }}>
                                    Cancel
                                  </button>
                                  <button onClick={submitRevision}
                                    style={{ flex: 2, padding: 12, borderRadius: 100, background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                                    Send Request →
                                  </button>
                                </div>
                              </>
                            )
                          }
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── INVOICES ── */}
              {tab === 'invoices' && (
                <div>
                  <TabTitle style={{ marginBottom: 20 }}>Invoices & Payments</TabTitle>
                  {pd?.invoices?.length > 0 && (
                    <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 24px', marginBottom: 16, display: 'flex', gap: 20 }}>
                      {[
                        { label: 'Total', val: `₹${pd.invoices.reduce((s, i) => s + Number(i.amount), 0).toLocaleString('en-IN')}`, c: 'var(--tx)' },
                        { label: 'Paid', val: `₹${pd.invoices.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0).toLocaleString('en-IN')}`, c: 'var(--lime)' },
                        { label: 'Due', val: `₹${pd.invoices.filter(i => i.status === 'due').reduce((s, i) => s + Number(i.amount), 0).toLocaleString('en-IN')}`, c: 'var(--coral)' },
                      ].map(s => (
                        <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: s.c }}>{s.val}</div>
                          <div style={{ fontSize: 12, color: 'var(--sub)', marginTop: 4 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!(pd?.invoices?.length) && <EmptyState text="No invoices yet" />}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(pd?.invoices || []).map(inv => (
                      <div key={inv.id}
                        style={{ background: 'var(--s1)', border: `1px solid ${inv.status === 'due' ? 'rgba(255,77,46,.3)' : 'var(--bd)'}`, borderRadius: 12, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: inv.status === 'paid' ? 'rgba(197,241,53,.1)' : 'rgba(255,77,46,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                          {inv.status === 'paid' ? '✅' : inv.status === 'due' ? '💳' : '🕐'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{inv.invoice_number} — {inv.description}</div>
                          <div style={{ fontSize: 12, color: 'var(--sub)' }}>{inv.due_date}</div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginRight: 16 }}>
                          ₹{Number(inv.amount).toLocaleString('en-IN')}
                        </div>
                        {inv.status === 'paid' && <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(197,241,53,.12)', color: 'var(--lime)' }}>✓ Paid</span>}
                        {inv.status === 'due' && <button style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 100, background: 'var(--coral)', color: '#fff', border: 'none', cursor: 'none' }}>Pay Now →</button>}
                        {inv.status === 'upcoming' && <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: 'rgba(155,127,255,.1)', color: 'var(--violet)' }}>Upcoming</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── MESSAGES ── */}
              {tab === 'messages' && (
                <div>
                  <TabTitle style={{ marginBottom: 20 }}>Team Messages</TabTitle>
                  <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: 24 }}>
                    <div style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 16 }}>
                      {!(pd?.messages?.length) && <EmptyState text="No messages yet — say hello!" />}
                      {(pd?.messages || []).map((m, i) => (
                        <div key={m.id || i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                          <div style={{ width: 34, height: 34, borderRadius: '50%', background: m.sender_type === 'team' ? 'rgba(255,77,46,.15)' : 'rgba(155,127,255,.15)', color: m.sender_type === 'team' ? 'var(--coral)' : 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                            {m.sender_initials}
                          </div>
                          <div style={{ background: 'var(--s2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--sub)', lineHeight: 1.6, flex: 1 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--tx)', marginBottom: 3 }}>{m.sender_name}</div>
                            {m.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMsg()}
                        placeholder="Type a message..."
                        style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: 'var(--tx)', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                        onBlur={e => e.target.style.borderColor = 'var(--bd)'} />
                      <button onClick={sendMsg}
                        style={{ padding: '12px 22px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'none' }}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── BRAND KIT ── */}
              {tab === 'brandkit' && (
                <div>
                  <TabTitle style={{ marginBottom: 20 }}>Your Brand Kit</TabTitle>
                  {!(pd?.brandAssets?.length) && <EmptyState text="Brand assets will appear here once uploaded by the team" />}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {(pd?.brandAssets || []).map(b => (
                      <div key={b.id}
                        style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '24px 20px', textAlign: 'center', transition: 'all .2s', cursor: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bd2)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.transform = 'none' }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>{b.icon}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--sub)', marginBottom: 16 }}>{b.file_name}</div>
                        <button
                          onClick={async () => {
                            const url = await portal.getDownloadUrl(b.storage_path)
                            if (url) window.open(url, '_blank')
                          }}
                          style={{ fontSize: 12, fontWeight: 700, padding: '8px 20px', borderRadius: 100, background: (b.color || 'var(--violet)') + '15', color: b.color || 'var(--violet)', border: 'none', cursor: 'none', width: '100%' }}>
                          ↓ Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SCHEDULE ── */}
              {tab === 'schedule' && (
                <div>
                  <TabTitle style={{ marginBottom: 8 }}>Book a Call</TabTitle>
                  <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 24 }}>
                    Pick a time that works for you. All calls are 30 minutes via Google Meet.
                  </p>
                  {bookedSlot
                    ? (
                      <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
                        style={{ background: 'rgba(197,241,53,.08)', border: '1px solid rgba(197,241,53,.25)', borderRadius: 14, padding: 28, textAlign: 'center' }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Call Booked!</div>
                        <div style={{ fontSize: 14, color: 'var(--lime)', fontWeight: 600, marginBottom: 8 }}>{bookedSlot}</div>
                        <div style={{ fontSize: 13, color: 'var(--sub)' }}>A Google Meet link will be sent to your email.</div>
                        <button onClick={() => setBookedSlot(null)}
                          style={{ marginTop: 16, fontSize: 12, color: 'var(--sub)', background: 'none', border: 'none', cursor: 'none', textDecoration: 'underline' }}>
                          Pick a different time
                        </button>
                      </motion.div>
                    )
                    : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                        {portal.slots.length === 0 && <EmptyState text="No available slots right now. Contact us directly." />}
                        {portal.slots.map(s => (
                          <button key={s.id}
                            onClick={async () => { await portal.handleBookSlot(s.id); setBookedSlot(s.label) }}
                            style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 12, padding: '16px 20px', fontSize: 14, fontWeight: 500, color: 'var(--tx)', cursor: 'none', textAlign: 'left', transition: 'all .2s', fontFamily: 'var(--font-body)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.color = 'var(--coral)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.color = 'var(--tx)' }}>
                            📅 {s.label}
                          </button>
                        ))}
                      </div>
                    )
                  }
                </div>
              )}

              {/* ── SETTINGS ── */}
              {tab === 'settings' && profileForm && (
                <div style={{ maxWidth: 560 }}>
                  <TabTitle style={{ marginBottom: 24 }}>Profile Settings</TabTitle>
                  <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,var(--coral),var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, flexShrink: 0 }}>
                      {getInitials(p.full_name)}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{p.full_name}</div>
                      <div style={{ fontSize: 13, color: 'var(--sub)' }}>{p.company}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[
                      { label: 'Full Name', key: 'full_name', type: 'text', span: 1 },
                      { label: 'Company', key: 'company', type: 'text', span: 1 },
                      { label: 'Email Address', key: 'email', type: 'email', span: 2 },
                      { label: 'Phone Number', key: 'phone', type: 'tel', span: 1 },
                      { label: 'City', key: 'city', type: 'text', span: 1 },
                    ].map(f => (
                      <div key={f.key} style={{ gridColumn: `span ${f.span}` }}>
                        <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)', display: 'block', marginBottom: 7 }}>{f.label}</label>
                        <input
                          type={f.type}
                          value={profileForm[f.key] || ''}
                          onChange={e => setProfileForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          disabled={f.key === 'email'}
                          style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 10, padding: '12px 14px', fontSize: 14, color: f.key === 'email' ? 'var(--sub)' : 'var(--tx)', outline: 'none', opacity: f.key === 'email' ? 0.6 : 1 }}
                          onFocus={e => { if (f.key !== 'email') e.target.style.borderColor = 'var(--coral)' }}
                          onBlur={e => e.target.style.borderColor = 'var(--bd)'}
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={saveProfile}
                    style={{ marginTop: 20, padding: '13px 32px', background: profileSaved ? 'var(--lime)' : 'var(--coral)', color: profileSaved ? '#0E0C0A' : '#fff', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'none', transition: 'background .3s' }}>
                    {profileSaved ? '✓ Saved!' : 'Save Changes →'}
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────
// ── Admin Restriction Screen ───────────────────────────────────
function AdminAccessRestriction({ auth, onBack, onAdminOpen }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OvNav title="Admin Access" onBack={onBack} />
      <div style={{ minHeight: 'calc(100vh - 62px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 20, padding: 48, width: '100%', maxWidth: 440 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🛡️</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Admin Detected</div>
          <p style={{ fontSize: 13, color: 'var(--sub)', marginBottom: 28, lineHeight: 1.6 }}>
            You are logged in with an **Admin account**. This portal is designed for client project tracking only.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={onAdminOpen} style={{ width: '100%', padding: 15, background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: 100, fontFamily: 'var(--font-display)', fontWeight: 700, cursor: 'none' }}>
              Go to Admin Dashboard →
            </button>
            <button onClick={auth.logout} style={{ width: '100%', padding: 12, background: 'none', border: '1px solid var(--bd)', color: 'var(--sub)', borderRadius: 100, fontWeight: 600, cursor: 'none' }}>
              Log Out
            </button>
            <button onClick={onBack} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--mut)', fontSize: 12, cursor: 'none' }}>
              Back to Site
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function ClientPortal({ onBack, onAdminOpen }) {
  const auth = useAuth()
  if (auth.loading) return <LoadingScreen />
  if (!auth.user) return <LoginScreen auth={auth} onBack={onBack} />
  
  if (auth.profile?.role === 'admin') {
    return <AdminAccessRestriction auth={auth} onBack={onBack} onAdminOpen={onAdminOpen} />
  }

  return <Dashboard auth={auth} onBack={onBack} />
}