import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Sections'
import { useLang } from '../context/LanguageContext'

// ================================================================
// BEHOLD.SO INSTAGRAM FEED — 3-STEP SETUP (no API, totally free)
// ================================================================
// STEP 1 → Go to https://behold.so → Sign Up (free)
//
// STEP 2 → Click "New Feed" → connect your Instagram
//          Works with Personal, Creator, or Business accounts
//          Set posts count to 12 → Save
//
// STEP 3 → Click "Get Code" → copy ONLY the Feed ID from the
//          script tag. It looks like this:
//          <script src="...?feedId=AbCdEfGhIjKlMnOp"></script>
//          Paste JUST the ID below:
// ================================================================

const BEHOLD_FEED_ID = 'RFkQCGBqu4mGYJjVon6a'  // ← paste here, e.g. 'AbCdEfGhIjKlMnOp'

// ================================================================

const IS_READY = BEHOLD_FEED_ID !== 'YOUR_BEHOLD_FEED_ID'

const MOCK_POSTS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  mediaType: 'IMAGE',
  likesCount: Math.floor(Math.random() * 400) + 150,
  commentsCount: Math.floor(Math.random() * 40) + 8,
  permalink: 'https://instagram.com',
  gradient: [
    'linear-gradient(135deg,#1A0E2E,#7B5CF0)',
    'linear-gradient(135deg,#0A1A10,#2E9940)',
    'linear-gradient(135deg,#1A0A0A,#C23535)',
    'linear-gradient(135deg,#1A100A,#C28020)',
    'linear-gradient(135deg,#0A0F1A,#2556A8)',
    'linear-gradient(135deg,#101A0A,#3A7010)',
    'linear-gradient(135deg,#1A0A10,#7C1A4A)',
    'linear-gradient(135deg,#0A1818,#0A5060)',
    'linear-gradient(135deg,#1A1A0A,#6A6A10)',
    'linear-gradient(135deg,#180A1A,#5C1080)',
    'linear-gradient(135deg,#0A180A,#1A7030)',
    'linear-gradient(135deg,#1A0C0A,#882010)',
  ][i],
}))

export default function InstagramFeed() {
  const { t } = useLang()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(IS_READY)
  const [error, setError] = useState(null)
  const [following, setFollowing] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    if (!IS_READY) { setPosts(MOCK_POSTS); return }

    fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then(r => { if (!r.ok) throw new Error(`Status ${r.status}`); return r.json() })
      .then(data => {
        const items = Array.isArray(data) ? data : data?.posts || []
        setPosts(items.slice(0, 12))
        setLoading(false)
      })
      .catch(err => {
        console.error('Behold error:', err)
        setError('Could not load feed — showing placeholder posts.')
        setPosts(MOCK_POSTS)
        setLoading(false)
      })
  }, [])

  const username = posts[0]?.username || 'aham.ai'

  return (
    <section className="section bd-b" id="instagram">
      <Reveal>

        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {posts[0]?.ownerProfilePicUrl
              ? <img src={posts[0].ownerProfilePicUrl} alt={username} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--coral)' }} />
              : <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,var(--coral),var(--violet))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>A</div>
            }
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 3 }}>@{username}</div>
              <div style={{ fontSize: 12, color: 'var(--sub)' }}>
                {IS_READY ? `${posts.length} ${t.instagram.posts} · auto-updates` : `1,240 ${t.instagram.followers} · ${t.instagram.digitalStudio}`}
              </div>
            </div>
          </div>

          <motion.a
            href={`https://instagram.com/${username}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
            onClick={() => setFollowing(true)}
            style={{ fontSize: 13, fontWeight: 700, padding: '10px 24px', borderRadius: 100, background: 'transparent', color: following ? 'var(--lime)' : 'var(--tx)', border: `1.5px solid ${following ? 'var(--lime)' : 'var(--bd)'}`, cursor: 'none', transition: 'all .25s', fontFamily: 'var(--font-display)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {following ? t.instagram.following : t.instagram.follow}
          </motion.a>
        </div>

        {/* Setup banner */}
        {!IS_READY && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(245,230,66,.06)', border: '1px solid rgba(245,230,66,.2)', borderRadius: 12, padding: '14px 20px', marginBottom: 20, fontSize: 13, color: 'var(--yellow)', display: 'flex', alignItems: 'flex-start', gap: 10 }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>⚙</span>
            <span>
              Showing mock posts.{' '}
              <strong>3 steps to go live:</strong>{' '}
              Sign up at <a href="https://behold.so" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--yellow)', fontWeight: 700 }}>behold.so</a>
              {' → '}connect Instagram{' → '}paste your Feed ID into{' '}
              <code style={{ background: 'rgba(0,0,0,.3)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>InstagramFeed.jsx</code>
            </span>
          </motion.div>
        )}

        {/* Error banner */}
        {error && (
          <div style={{ background: 'rgba(255,77,46,.08)', border: '1px solid rgba(255,77,46,.25)', borderRadius: 12, padding: '14px 20px', marginBottom: 20, fontSize: 13, color: 'var(--coral)' }}>
            ⚠ {error}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 10, background: 'var(--s1)', animation: 'igShimmer 1.4s ease-in-out infinite', animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {posts.map((post, i) => (
              <PostTile
                key={post.id || i}
                post={post}
                index={i}
                hovered={hoveredId === (post.id || i)}
                onHover={setHoveredId}
              />
            ))}
          </div>
        )}

        {IS_READY && (
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--mut)', marginTop: 14 }}>
            Feed via <a href="https://behold.so" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sub)' }}>Behold.so</a> · auto-updates daily
          </p>
        )}

      </Reveal>

      <style>{`
        @keyframes igShimmer { 0%,100%{opacity:.3} 50%{opacity:.65} }
        @media(max-width:900px){
          #instagram [style*="repeat(4,1fr)"]{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:540px){
          #instagram [style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important;}
        }
      `}</style>
    </section>
  )
}

function PostTile({ post, index, hovered, onHover }) {
  const isVideo = post.mediaType === 'VIDEO' || post.media_type === 'VIDEO'
  const imgUrl = post.pngUrl || post.webpUrl || post.mediaUrl || post.thumbnail_url || null
  const likes = post.likesCount ?? post.like_count ?? null
  const comments = post.commentsCount ?? post.comments_count ?? null

  return (
    <motion.a
      href={post.permalink || 'https://instagram.com'}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: .94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .35, delay: index * 0.045 }}
      onMouseEnter={() => onHover(post.id || index)}
      onMouseLeave={() => onHover(null)}
      style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '1', position: 'relative', display: 'block', cursor: 'none', background: 'var(--s1)' }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: .4 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {imgUrl
          ? <img src={imgUrl} alt="Instagram post" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: post.gradient }} />
        }
      </motion.div>

      {isVideo && (
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.65)', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: '#fff', fontWeight: 700 }}>▶</div>
      )}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#fff', fontSize: 13, fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              {likes !== null ? likes.toLocaleString('en-IN') : '—'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#fff', fontSize: 13, fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              {comments !== null ? comments.toLocaleString('en-IN') : '—'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
