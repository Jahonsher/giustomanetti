import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { mediaGL } from './gl/media'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { TransitionProvider } from './components/Transition'
import { plain, useLang } from './i18n'
import { initSmoothScroll, destroySmoothScroll, reducedMotion } from './lib/motion'
import Home from './pages/Home'
import Qurilish from './pages/Qurilish'
import Katalog from './pages/Katalog'
import Kosmetika from './pages/Kosmetika'
import Galereya from './pages/Galereya'
import Aloqa from './pages/Aloqa'
import NotFound from './pages/NotFound'
import { NAV } from './data'

// initialise the shared WebGL layer before any page mounts its images
const glCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
if (glCanvas && !reducedMotion) {
  // above the page content (z-1) so images also show on solid light sections,
  // below the header, menu, lightbox and transition layers
  glCanvas.className = 'pointer-events-none fixed inset-0 z-[2] h-full w-full'
  glCanvas.setAttribute('aria-hidden', 'true')
  mediaGL.init(glCanvas)
}

function GLLayer() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (glCanvas && host.current) host.current.appendChild(glCanvas)
  }, [])
  return <div ref={host} />
}

export default function App() {
  const { lang, t } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  useEffect(() => {
    const page = [...NAV].reverse().find((n) => (n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)))
    document.title = plain(t(page ? page.title : 'nf.h'))
  }, [pathname, t])

  return (
    <TransitionProvider>
      <GLLayer />
      <Header />
      <main key={lang} className="relative z-[1]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qurilish" element={<Qurilish />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/kosmetika" element={<Kosmetika />} />
          <Route path="/galereya" element={<Galereya />} />
          <Route path="/aloqa" element={<Aloqa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
      <Cursor />
      <Preloader />
    </TransitionProvider>
  )
}
