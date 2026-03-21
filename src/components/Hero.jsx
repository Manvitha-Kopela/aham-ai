import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLang()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const cardWrapRef = useRef(null)
  const rightRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  // Metrics state
  const [m1, setM1] = useState('0%')
  const [m2, setM2] = useState('0×')
  const [m3, setM3] = useState('0%')
  const [m4, setM4] = useState('0+')
  const [bars, setBars] = useState(false)
  const [n1, setN1] = useState(false)
  const [n2, setN2] = useState(false)

  // Counter helper
  function counter(setter, target, suffix, duration, delay) {
    setTimeout(() => {
      let start = 0
      const step = target / (duration / 16)
      const iv = setInterval(() => {
        start = Math.min(start + step, target)
        setter(Math.floor(start) + suffix)
        if (start >= target) clearInterval(iv)
      }, 16)
    }, delay)
  }

  useEffect(() => {
    // Trigger fade-ins
    const t1 = setTimeout(() => setTriggered(true), 100)

    // Start counters and animations
    const t2 = setTimeout(() => {
      counter(setM1, 280, '%', 1800, 0)
      counter(setM2, 3,   '×', 1200, 200)
      counter(setM3, 98,  '%', 1600, 400)
      counter(setM4, 50,  '+', 1400, 600)

      setTimeout(() => setBars(true),  600)
      setTimeout(() => setN1(true),   1400)
      setTimeout(() => setN2(true),   1800)
    }, 500)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // 3D tilt
  useEffect(() => {
    const right = rightRef.current
    const wrap  = cardWrapRef.current
    if (!right || !wrap) return

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const rx = ((e.clientY - cy) / (r.height / 2)) * -6
      const ry = ((e.clientX - cx) / (r.width / 2)) * 6
      wrap.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => {
      wrap.style.transition = 'transform .6s ease'
      wrap.style.transform  = 'rotateX(0) rotateY(0)'
      setTimeout(() => { wrap.style.transition = 'transform .1s ease' }, 600)
    }

    right.addEventListener('mousemove', onMove)
    right.addEventListener('mouseleave', onLeave)
    return () => {
      right.removeEventListener('mousemove', onMove)
      right.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const fadeIn = (delay) => ({
    opacity: triggered ? 1 : 0,
    transform: triggered ? 'none' : 'translateY(20px)',
    transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
  })

  const scaleIn = {
    opacity: triggered ? 1 : 0,
    transform: triggered ? 'none' : 'scale(.95) translateY(20px)',
    transition: 'opacity .7s ease .3s, transform .7s ease .3s',
  }

  const PROJECTS = [
    { name: 'Nexora Jewellery', type: 'Brand + Web Design',  pct: '75%',  c: '#9B7FFF', bg: 'rgba(155,127,255,.12)', bar: 'linear-gradient(90deg,#9B7FFF,#C4A8FF)', w: 75  },
    { name: 'Zephyr Tech',      type: 'SEO Campaign',        pct: '90%',  c: '#C5F135', bg: 'rgba(197,241,53,.1)',  bar: 'linear-gradient(90deg,#C5F135,#9CCC65)', w: 90  },
    { name: 'FarmFresh Co.',    type: 'E-Commerce Store',    pct: '100%', c: '#FF4D2E', bg: 'rgba(255,77,46,.1)',   bar: 'linear-gradient(90deg,#FF4D2E,#FF8A65)', w: 100 },
    { name: 'SpiceRoute Foods', type: 'Brand + Video',       pct: '60%',  c: '#F5E642', bg: 'rgba(245,230,66,.1)', bar: 'linear-gradient(90deg,#F5E642,#FFA726)', w: 60  },
  ]

  const AVATARS = [
    { i: 'RK', g: 'linear-gradient(135deg,#FF4D2E,#FF8A65)' },
    { i: 'NV', g: 'linear-gradient(135deg,#9B7FFF,#C4A8FF)' },
    { i: 'SK', g: 'linear-gradient(135deg,#C5F135,#8BC34A)' },
    { i: 'PR', g: 'linear-gradient(135deg,#F5E642,#FFA726)' },
    { i: 'AK', g: 'linear-gradient(135deg,#3B82F6,#60A5FA)' },
  ]

  return (
    <section id="hero" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      alignItems: 'center', gap: 48,
      padding: '60px 56px 48px',
      minHeight: '100vh',
      position: 'relative', overflow: 'hidden',
      borderBottom: '1px solid var(--bd)',
    }}>

      {/* Glows */}
      <div style={{ position:'absolute',top:-180,right:-80,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,77,46,.07),transparent 65%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:-100,left:-100,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(155,127,255,.05),transparent 65%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',top:'50%',left:0,transform:'translateY(-52%)',fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(90px,14vw,180px)',color:'rgba(255,255,255,.018)',whiteSpace:'nowrap',letterSpacing:-8,pointerEvents:'none',userSelect:'none' }}>
        AHAM.AI
      </div>

      {/* ── LEFT ── */}
      <div style={{ position:'relative', zIndex:2 }}>

        {/* Badge */}
        <div style={{ ...fadeIn(0.1), display:'inline-flex', alignItems:'center', gap:8, border:'1px solid var(--bd)', borderRadius:100, padding:'7px 16px', fontSize:12, color:'var(--sub)', marginBottom:24 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--lime)', animation:'heroBlink 2s infinite', flexShrink:0 }} />
          {t.tag}
        </div>

        {/* Headline */}
        <h1 style={{ ...fadeIn(0.2), fontFamily:'var(--font-display)', fontWeight:700, fontSize:'clamp(40px,5.5vw,76px)', lineHeight:.91, letterSpacing:-2.5, marginBottom:22 }}>
          {t.h1a}<br />
          <span style={{ WebkitTextStroke:'1.5px rgba(242,237,230,.22)', color:'transparent' }}>{t.h1b}</span><br />
          <span style={{ color:'var(--coral)' }}>{t.h1c}</span>
        </h1>

        {/* Sub */}
        <p style={{ ...fadeIn(0.3), fontSize:14, color:'var(--sub)', lineHeight:1.8, maxWidth:400, marginBottom:28 }}
          dangerouslySetInnerHTML={{ __html: t.sub }}
        />

        {/* Buttons */}
        <div style={{ ...fadeIn(0.4), display:'flex', gap:10, marginBottom:28, flexWrap:'wrap' }}>
          <button className="btn-primary" onClick={() => scrollTo('contact')}>{t.cta1}</button>
          <button className="btn-ghost"   onClick={() => scrollTo('work')}>{t.cta2}</button>
        </div>

        {/* Social proof */}
        <div style={{ ...fadeIn(0.5), display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>

          {/* Avatars */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ display:'flex' }}>
              {AVATARS.map((a, i) => (
                <div key={i} style={{ width:28, height:28, borderRadius:'50%', border:'2px solid var(--bg)', background:a.g, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#fff', marginLeft: i>0 ? -8 : 0, position:'relative', zIndex:5-i }}>
                  {a.i}
                </div>
              ))}
            </div>
            <span style={{ fontSize:11, color:'var(--sub)' }}><strong style={{ color:'var(--tx)' }}>50+</strong> happy clients</span>
          </div>

          <div style={{ width:1, height:18, background:'var(--bd)' }} />

          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:12, color:'#F5E642' }}>★★★★★</span>
            <span style={{ fontSize:11, color:'var(--sub)' }}><strong style={{ color:'var(--tx)' }}>4.9/5</strong> rating</span>
          </div>

          <div style={{ width:1, height:18, background:'var(--bd)' }} />

          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {['🇮🇳 TE','🇮🇳 HI','🇬🇧 EN','🇪🇸 ES'].map(l => (
              <span key={l} style={{ fontSize:10, fontWeight:600, padding:'4px 10px', borderRadius:100, border:'1px solid var(--bd)', color:'var(--sub)' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div ref={rightRef} style={{ position:'relative', zIndex:2, perspective:1000 }}>

        <div ref={cardWrapRef} style={{ ...scaleIn, transformStyle:'preserve-3d', transition:'transform .1s ease' }}>

          {/* Notification 1 */}
          <div style={{ position:'absolute', top:-18, right:-16, display:'flex', alignItems:'center', gap:9, padding:'10px 14px', background:'rgba(18,15,12,.97)', border:'1px solid rgba(197,241,53,.2)', borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,.5)', whiteSpace:'nowrap', zIndex:10, opacity: n1 ? 1 : 0, transform: n1 ? 'none' : 'translateY(8px)', transition:'all .6s ease' }}>
            <div style={{ width:26, height:26, borderRadius:7, background:'rgba(197,241,53,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>🎉</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--lime)', marginBottom:1 }}>{t.hero.newProject}</div>
              <div style={{ fontSize:10, color:'var(--sub)' }}>FarmFresh — {t.hero.conversions}</div>
            </div>
          </div>

          {/* Notification 2 */}
          <div style={{ position:'absolute', bottom:48, left:-20, display:'flex', alignItems:'center', gap:9, padding:'10px 14px', background:'rgba(18,15,12,.97)', border:'1px solid rgba(155,127,255,.2)', borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,.5)', whiteSpace:'nowrap', zIndex:10, opacity: n2 ? 1 : 0, transform: n2 ? 'none' : 'translateY(8px)', transition:'all .6s ease' }}>
            <div style={{ width:26, height:26, borderRadius:7, background:'rgba(155,127,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>💬</div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--violet)', marginBottom:1 }}>{t.hero.approved}</div>
              <div style={{ fontSize:10, color:'var(--sub)' }}>{t.hero.approvedSub}</div>
            </div>
          </div>

          {/* Main Card */}
          <div style={{ background:'linear-gradient(135deg,rgba(22,19,16,.97),rgba(26,24,20,1))', border:'1px solid rgba(255,255,255,.1)', borderRadius:22, padding:24, boxShadow:'0 40px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.05),inset 0 1px 0 rgba(255,255,255,.06)', position:'relative', overflow:'hidden' }}>

            {/* Shimmer */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(255,77,46,.5),rgba(155,127,255,.4),transparent)' }} />

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:9, background:'linear-gradient(135deg,#FF4D2E,#FF8A65)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:11, color:'#fff' }}>A.ai</div>
                <div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:700 }}>Aham.ai Studio</div>
                  <div style={{ fontSize:10, color:'var(--sub)' }}>{t.hero.dashboard} · {t.hero.live}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, fontWeight:700, color:'var(--lime)' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--lime)', animation:'heroBlink 2s infinite', display:'inline-block' }} />
                {t.hero.live}
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:18 }}>
              {[
                { icon:'📈', label: t.hero.traffic, val: m1, color:'#C5F135', line:'linear-gradient(90deg,transparent,#C5F135,transparent)' },
                { icon:'🎯', label: t.hero.convLabel,   val: m2, color:'#FF4D2E', line:'linear-gradient(90deg,transparent,#FF4D2E,transparent)' },
                { icon:'⭐', label: t.hero.satisfaction,  val: m3, color:'#9B7FFF', line:'linear-gradient(90deg,transparent,#9B7FFF,transparent)' },
                { icon:'🚀', label: t.stats.projects,      val: m4, color:'#F5E642', line:'linear-gradient(90deg,transparent,#F5E642,transparent)' },
              ].map(m => (
                <div key={m.label} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:12, padding:'13px 14px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:m.line }} />
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:7 }}>
                    <span style={{ fontSize:15 }}>{m.icon}</span>
                    <span style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:1.5, color:'var(--sub)' }}>{m.label}</span>
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700, lineHeight:1, color:m.color }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height:1, background:'rgba(255,255,255,.06)', marginBottom:16, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <span style={{ position:'absolute', background:'rgba(22,19,16,1)', padding:'0 10px', fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'var(--sub)' }}>{t.hero.activeProjects}</span>
            </div>

            {/* Projects */}
            {PROJECTS.map(p => (
              <div key={p.name} style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:'var(--tx)', marginBottom:1 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:'var(--sub)' }}>{p.type}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:100, background:p.bg, color:p.c }}>{p.pct}</span>
                </div>
                <div style={{ height:3, background:'rgba(255,255,255,.06)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:2, background:p.bar, width: bars ? `${p.w}%` : '0%', transition:'width 1.4s cubic-bezier(.4,0,.2,1)' }} />
                </div>
              </div>
            ))}

            {/* Footer */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:15, paddingTop:14, borderTop:'1px solid rgba(255,255,255,.06)' }}>
              <div style={{ fontSize:11, color:'var(--sub)' }}>
                <span style={{ color:'var(--lime)', marginRight:5 }}>●</span>{t.hero.operational}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:700, padding:'7px 14px', borderRadius:100, background:'var(--coral)', color:'#fff', border:'none', cursor:'none', transition:'background .2s' }}
                onMouseEnter={e => e.target.style.background='#FF6B4A'}
                onMouseLeave={e => e.target.style.background='var(--coral)'}
              >
                {t.cta1}
              </button>
            </div>
          </div>
        </div>

        {/* Glow behind card */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,77,46,.07),transparent 70%)', pointerEvents:'none', zIndex:-1 }} />
      </div>

      <style>{`
        @keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @media(max-width:1100px){
          #hero { gap:32px !important; padding:100px 32px 60px !important; }
        }
        @media(max-width:900px){
          #hero { grid-template-columns:1fr !important; padding:100px 20px 48px !important; min-height:auto !important; text-align: center; }
          #hero > div:first-of-type { display: flex; flex-direction: column; align-items: center; }
          #hero p { margin-left: auto; margin-right: auto; }
          #hero .btn-primary, #hero .btn-ghost { width: 100%; justify-content: center; }
          #hero > div:last-child { margin-top: 40px; }
        }
      `}</style>
    </section>
  )
}
