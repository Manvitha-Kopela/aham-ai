import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Ticker, Stats, Services, Portfolio, Process } from './components/Sections'
import Pricing from './components/Pricing'
import { Team, FAQ, Blog, Instagram } from './components/OtherSections'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { WhatsAppFAB, AdminDashboard } from './components/AdminDashboard'
import { ClientPortal } from './components/ClientPortal'
import './styles/globals.css'

export default function App() {
  const [view, setView] = useState('site')

  return (
    <LanguageProvider>
      <Cursor />
      <AnimatePresence mode="wait">
        {view === 'admin' && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, overflowY: 'auto', background: 'var(--bg)' }}>
            <AdminDashboard onBack={() => setView('site')} />
          </motion.div>
        )}
        {view === 'portal' && (
          <motion.div key="portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, overflowY: 'auto', background: 'var(--bg)' }}>
            <ClientPortal onBack={() => setView('site')} onAdminOpen={() => setView('admin')} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: view === 'site' ? 'visible' : 'hidden', pointerEvents: view === 'site' ? 'auto' : 'none' }}>
        <Navbar onPortalOpen={() => setView('portal')} onAdminOpen={() => setView('admin')} />
        <main>
          <Hero />
          <Ticker />
          <Stats />
          <Services />
          <Portfolio />
          <Pricing />
          <Team />
          <Process />
          <FAQ />
          <Blog />
          <Instagram />
          <Contact />
        </main>
        <Footer onAdminOpen={() => setView('admin')} />
        {view === 'site' && <WhatsAppFAB />}
      </div>
    </LanguageProvider>
  )
}
