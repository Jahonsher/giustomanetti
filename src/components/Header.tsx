import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { TLink, useTransition } from './Transition'
import { Mark } from './Mark'
import { asset, CONTACT, LANGS, NAV, PAGE_IMAGES } from '../data'
import { plain, T, useLang } from '../i18n'
import { gsap, useGSAP, lenis, scroll, reducedMotion } from '../lib/motion'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

function LangLinks({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  const { run } = useTransition()
  return (
    <div className={`meta flex items-center gap-3 !text-current ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-3">
          {i > 0 && <span className="opacity-30">·</span>}
          <button
            onClick={() => l !== lang && void run(() => setLang(l))}
            aria-current={l === lang ? 'page' : undefined}
            className={`uline pb-0.5 transition-opacity ${l === lang ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const bar = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [onDark, setOnDark] = useState(pathname === '/')
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])

  // transparent over the home slideshow, paper once you scroll; hides on the way down
  useEffect(() => {
    let last = 0
    let hidden = false
    const tick = () => {
      const y = scroll.y
      setSolid(y > 40)
      setOnDark(pathname === '/' && y < window.innerHeight - 90)
      const down = y > last + 3 && y > 300 && !openRef.current
      const up = y < last - 3
      if (down && !hidden) {
        hidden = true
        gsap.to(bar.current, { yPercent: -100, duration: 0.9, ease: 'power3.out' })
      } else if ((up || y < 300 || openRef.current) && hidden) {
        hidden = false
        gsap.to(bar.current, { yPercent: 0, duration: 0.9, ease: 'power3.out' })
      }
      last = y
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [pathname])

  const light = onDark && !open
  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-700 ${
          solid && !open ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent bg-transparent'
        } ${light && !solid ? 'text-paper' : 'text-ink'}`}
      >
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-[86px] md:px-10">
          <div className="flex items-center gap-8">
            <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="meta group flex items-center gap-3 !text-current" data-cursor="link">
              <span className="relative block h-3 w-7">
                <span className="absolute left-0 h-px w-full bg-current transition-all duration-700 ease-[var(--ease-expo)]" style={{ top: open ? '50%' : '0%', transform: open ? 'rotate(45deg)' : 'none' }} />
                <span
                  className="absolute left-0 h-px bg-current transition-all duration-700 ease-[var(--ease-expo)]"
                  style={{ top: open ? '50%' : '100%', width: open ? '100%' : '65%', transform: open ? 'rotate(-45deg)' : 'none' }}
                />
              </span>
              <span className="hidden sm:inline">{open ? t('close') : t('menu')}</span>
            </button>
            <LangLinks className="hidden md:flex" />
          </div>
          <TLink to="/" aria-label="Giusto Manetti" onClick={() => setOpen(false)} data-cursor="link">
            <Mark />
          </TLink>
          <div className="flex items-center justify-end gap-7">
            <TLink to="/katalog" onClick={() => setOpen(false)} className="meta uline hidden !text-current lg:inline" aria-current={pathname === '/katalog' ? 'page' : undefined}>
              {t('nav.cat')}
            </TLink>
            <TLink
              to="/aloqa"
              onClick={() => setOpen(false)}
              className="meta group relative hidden overflow-hidden rounded-full border border-current px-5 py-3 !text-current sm:inline-block"
              data-cursor="link"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-gold transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-paper">{t('cta.quote')}</span>
            </TLink>
          </div>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

/**
 * Full-screen menu: a sheet of gold leaf drops like a page turning, paper
 * follows, links surface from a blur, and the hovered page shows in an arch.
 */
function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline>(null)
  const { pathname } = useLocation()
  const [hover, setHover] = useState(pathname)

  useGSAP(
    () => {
      const el = root.current!
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { autoAlpha: 1 })
        .fromTo(el.querySelector('[data-leaf]'), { rotateX: -92, transformOrigin: '50% 0%' }, { rotateX: 0, duration: 0.85, ease: 'power3.inOut' })
        .fromTo(el.querySelector('[data-paper]'), { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.8, ease: 'power4.inOut' }, 0.3)
        .fromTo(el.querySelectorAll('[data-item]'), { opacity: 0, filter: 'blur(14px)', y: 30 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.07 }, 0.7)
        .fromTo(el.querySelector('[data-visual]'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 0.75)
        .fromTo(el.querySelectorAll('[data-fade]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.05 }, 1)
    },
    { scope: root },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) {
      setHover(pathname)
      lenis?.stop()
      tl.current.timeScale(reducedMotion ? 4 : 1).play()
    } else {
      lenis?.start()
      tl.current.timeScale(reducedMotion ? 4 : 1.8).reverse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div ref={root} className="invisible fixed inset-0 z-[45] [perspective:1400px]" role="dialog" aria-modal="true" aria-label={t('menu')} aria-hidden={!open}>
      <div data-leaf className="gold-leaf absolute inset-0" />
      <div data-paper className="absolute inset-0 bg-paper" />
      <div className="relative grid h-full grid-rows-[1fr_auto] px-5 pb-8 pt-[100px] md:px-10 md:pt-[120px]">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <nav className="md:col-span-7">
            {NAV.map((n, i) => {
              const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)
              return (
                <TLink
                  key={n.to}
                  to={n.to}
                  data-item
                  onClick={onClose}
                  onMouseEnter={() => setHover(n.to)}
                  className="group flex items-baseline gap-5 py-1 md:gap-8"
                >
                  <span className="w-10 font-display text-lg italic text-gold">{ROMAN[i]}</span>
                  <span
                    className={`didone text-[9.4vw] transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:italic group-hover:text-gold md:text-[4.6vw] ${
                      active ? 'italic text-gold' : ''
                    }`}
                  >
                    {plain(t(n.key))}
                  </span>
                </TLink>
              )
            })}
          </nav>
          <div className="hidden md:col-span-4 md:col-start-9 md:block">
            <div data-visual className="arch relative aspect-[3/4] w-full overflow-hidden">
              {NAV.map((n) => (
                <img
                  key={n.to}
                  src={asset(PAGE_IMAGES[n.to])}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-[1.1s] ease-[var(--ease-expo)]"
                  style={{ opacity: hover === n.to ? 1 : 0, transform: hover === n.to ? 'scale(1)' : 'scale(1.1)', filter: hover === n.to ? 'blur(0px)' : 'blur(8px)' }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 border-t border-line pt-6 text-sm md:grid-cols-4">
          <div data-fade className="flex flex-col gap-1">
            {CONTACT.phones.map((p) => (
              <a key={p.href} href={p.href} className="uline w-fit font-display text-xl">
                {p.label}
              </a>
            ))}
          </div>
          <div data-fade className="text-mute">
            <T k="ci.addrv" />
          </div>
          <div data-fade className="flex gap-5 text-mute">
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="uline">Instagram</a>
            <a href={CONTACT.telegram} target="_blank" rel="noreferrer" className="uline">Telegram</a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="uline">Facebook</a>
          </div>
          <div data-fade className="md:justify-self-end">
            <LangLinks />
          </div>
        </div>
      </div>
    </div>
  )
}
