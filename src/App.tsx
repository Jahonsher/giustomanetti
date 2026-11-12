import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { TransitionProvider } from './components/Transition'
import { plain, useLang } from './i18n'
import { initSmoothScroll, destroySmoothScroll } from './lib/motion'
import Home from './pages/Home'
import Qurilish from './pages/Qurilish'
import Katalog from './pages/Katalog'
import Kosmetika from './pages/Kosmetika'
import Galereya from './pages/Galereya'
import Aloqa from './pages/Aloqa'
import NotFound from './pages/NotFound'
import { NAV } from './data'

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
      <Header />
      <main key={lang} className="paper-grain relative">
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
