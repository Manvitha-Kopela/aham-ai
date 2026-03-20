import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { Reveal } from './Sections'

// ========================================================
// TO CONNECT EMAILJS:
// 1. npm install @emailjs/browser
// 2. Sign up at https://emailjs.com
// 3. Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY below
// ========================================================
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', service: 'Web Design & Development', msg: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t.errors.name
    if (!form.email.trim() || !form.email.includes('@')) e.email = t.errors.email
    if (!form.msg.trim()) e.msg = t.errors.msg
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStatus('sending')

    // ---- EmailJS integration ----
    // Uncomment when you have your EmailJS credentials:
    /*
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        service: form.service,
        message: form.msg,
        to_email: 'hello@aham.ai',
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', service: 'Web Design & Development', msg: '' })
    } catch (err) {
      setStatus('error')
    }
    */

    // Simulated success for demo:
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', service: 'Web Design & Development', msg: '' })
    }, 1400)
  }

  const services = ['Web Design & Development', 'SEO & Content Strategy', 'Brand Identity & Design', 'Video & Content Creation', 'Social Media Management', 'Full Digital Package']

  return (
    <section className="section" id="contact">
      <Reveal>
        <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ background: 'var(--coral)', padding: '48px 56px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1, color: 'var(--white)' }}
                dangerouslySetInnerHTML={{ __html: t.contact.heading }}
              />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', marginTop: 12 }}>{t.contact.sub}</p>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['📍', 'Bhimavaram, Andhra Pradesh, India'], ['📧', 'hello@aham.ai'], ['⏱', 'Reply within 24 hours, always']].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{icon}</div>
                    {text}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 20 }}>
                {['🇮🇳 Telugu', '🇮🇳 Hindi', '🇬🇧 English', '🇪🇸 Español'].map(l => (
                  <span key={l} style={{ fontSize: 11, fontWeight: 700, padding: '5px 13px', borderRadius: 100, background: 'rgba(255,255,255,.15)', color: 'rgba(255,255,255,.9)' }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '44px 56px' }}>
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)', borderRadius: 12, padding: '28px', textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'var(--green)' }}
              >
                {t.form.success}
              </motion.div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label={t.form.name} error={errors.name}>
                  <input type="text" value={form.name} placeholder="Your full name" onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle(errors.name)} onFocus={e => e.target.style.borderColor = 'var(--coral)'} onBlur={e => e.target.style.borderColor = errors.name ? '#FF6B6B' : 'var(--bd)'} />
                </Field>

                <Field label={t.form.email} error={errors.email}>
                  <input type="email" value={form.email} placeholder="you@email.com" onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle(errors.email)} onFocus={e => e.target.style.borderColor = 'var(--coral)'} onBlur={e => e.target.style.borderColor = errors.email ? '#FF6B6B' : 'var(--bd)'} />
                </Field>

                <Field label={t.form.service} style={{ gridColumn: 'span 2' }}>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle(), width: '100%' }}>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label={t.form.msg} error={errors.msg} style={{ gridColumn: 'span 2' }}>
                  <textarea value={form.msg} rows={4} placeholder="Goals, timeline, budget range — the more detail the better." onChange={e => setForm({ ...form, msg: e.target.value })} style={{ ...inputStyle(errors.msg), resize: 'none', width: '100%' }} onFocus={e => e.target.style.borderColor = 'var(--coral)'} onBlur={e => e.target.style.borderColor = errors.msg ? '#FF6B6B' : 'var(--bd)'} />
                </Field>

                <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
                  <div style={{ fontSize: 13, color: 'var(--sub)' }}>
                    No spam. No pushy calls.<br />
                    <strong style={{ color: 'var(--tx)' }}>Just honest, helpful conversation.</strong>
                  </div>
                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .98 }}
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, padding: '16px 36px', borderRadius: 100, background: status === 'sending' ? 'rgba(255,77,46,.7)' : 'var(--coral)', color: 'var(--white)', border: 'none', cursor: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    {status === 'sending' ? 'Sending...' : t.form.submit}
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <style>{`
        @media(max-width:900px){
          #contact .ct-form-grid { grid-template-columns: 1fr !important; }
          #contact > div > div:first-child { padding: 32px 24px !important; }
          #contact > div > div:last-child { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, error, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--sub)' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 11, color: '#FF6B6B' }}>{error}</span>}
    </div>
  )
}

const inputStyle = (error) => ({
  background: 'var(--bg)',
  border: `1px solid ${error ? '#FF6B6B' : 'var(--bd)'}`,
  borderRadius: 10, padding: '13px 16px',
  fontSize: 14, color: 'var(--tx)', outline: 'none',
  transition: 'border-color .2s',
  width: '100%',
})
