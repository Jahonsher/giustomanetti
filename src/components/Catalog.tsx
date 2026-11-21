import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { asset, CATALOGS, catalogHref, isSpread, pad, pageSrc, thumbSrc, type Catalog, type Product } from '../data'
import { plain, useLang } from '../i18n'
import { gsap, lenis, reducedMotion, useMedia } from '../lib/motion'
import { Arch } from './Arch'
import { Blur, FadeUp, Lines } from './Reveal'
import { TLink } from './Transition'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

const mb = (n: number, lang: string) => (lang === 'en' ? n.toFixed(1) : n.toFixed(1).replace('.', ','))

/* ------------------------------------------------------------------ */
/** The two Manetti catalogues: cover, chapters, "leaf through" and PDF download. */
export function CatalogShelf({ onOpen }: { onOpen: (id: string, page: number) => void }) {
  const { t, lang } = useLang()
  return (
    <div className="grid gap-24 md:grid-cols-2 md:gap-16 lg:gap-24">
      {CATALOGS.map((c, i) => (
        <article key={c.id} className={i === 1 ? 'md:mt-32' : ''}>
          <button
            onClick={() => onOpen(c.id, 1)}
            className="group/book relative mx-auto block w-[78%] max-w-[420px] text-left md:w-[82%]"
            aria-label={`${t('cat.open')}: ${c.title}`}
            data-cursor={t('open')}
          >
            {/* the pages underneath fan out a little on hover */}
            <span className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.2deg] rounded-[4px] bg-[#fbfaf7] shadow-[0_30px_60px_-30px_rgba(20,27,48,0.45)] transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover/book:translate-x-6 group-hover/book:rotate-[4deg]" aria-hidden />
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1deg] rounded-[4px] bg-[#fbfaf7] shadow-[0_20px_40px_-24px_rgba(20,27,48,0.4)] transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover/book:translate-x-3 group-hover/book:rotate-[2deg]" aria-hidden />
            <span className="relative block transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover/book:-translate-y-2 group-hover/book:-rotate-[1.2deg]">
              <Arch src={pageSrc(c, 1)} alt={`Giusto Manetti — ${c.title}`} shape="rect" parallax={false} className="aspect-[1/1.414] w-full shadow-[0_40px_80px_-40px_rgba(20,27,48,0.55)]" />
              <span className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/20 to-transparent" aria-hidden />
            </span>
          </button>

          <div className="mx-auto mt-14 max-w-xl">
            <FadeUp y={14} className="meta flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-lg italic normal-case tracking-normal text-gold">{ROMAN[i]}</span>
              <span>
                {c.year} · {c.printed} {t('cat.pp')} · IT / EN
              </span>
            </FadeUp>
            <Blur as="h3" by="chars" className="didone mt-5 text-5xl md:text-[3.6rem]">{c.title}</Blur>
            <Lines className="mt-6 leading-relaxed text-mute" html={t(c.sub)} />

            <FadeUp y={14} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <button
                onClick={() => onOpen(c.id, 1)}
                className="gold-leaf meta rounded-full px-7 py-4 !text-navy transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-105"
                data-cursor="link"
              >
                {t('cat.open')}
              </button>
              <a href={asset(c.pdf)} download className="meta uline !text-ink" data-cursor="link">
                {t('cat.pdf')} · {mb(c.pdfMb, lang)} {t('cat.mb')} ↓
              </a>
            </FadeUp>

            <FadeUp y={14} className="mt-12">
              <p className="eyebrow mb-4">{t('cat.toc')}</p>
              <ul className="border-t border-line">
                {c.toc.map((ch, k) => (
                  <li key={ch.k}>
                    <button
                      onClick={() => onOpen(c.id, ch.page)}
                      className="group/ch flex w-full items-baseline gap-4 border-b border-line py-3 text-left"
                      data-cursor="link"
                    >
                      <span className="w-6 font-display text-sm italic text-gold">{pad(k + 1)}</span>
                      <span className="font-display text-lg transition-transform duration-700 ease-[var(--ease-expo)] group-hover/ch:translate-x-2">{plain(t(ch.k))}</span>
                      <span className="ml-auto text-gold opacity-0 transition-opacity duration-500 group-hover/ch:opacity-100" aria-hidden>
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Products with their catalogue photo; a click opens the catalogue on that page. */
export function ProductGrid({ items, onOpen, cols = 4 }: { items: Product[]; onOpen?: (id: string, page: number) => void; cols?: 3 | 4 }) {
  const { t } = useLang()
  return (
    <div className={`grid gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-y-20 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3 lg:gap-x-12'}`}>
      {items.map((p, i) => {
        const inner = (
          <>
            <Arch src={p.image} alt={p.it} shape={i % (cols + 1) === 0 ? 'pill' : 'rect'} className="aspect-[4/5] w-full" cursor={t('open')} />
            <span className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-sm italic text-gold">{pad(i + 1)}</span>
              <span className="font-display text-[0.95rem] italic text-gold">{p.it}</span>
            </span>
          </>
        )
        const link = (
          <span className="meta uline mt-5 inline-block !text-ink">
            {t('pr.link')} →
          </span>
        )
        const stagger = cols === 4 ? (i % 4 === 1 || i % 4 === 3 ? 'lg:mt-20' : '') : i % 3 === 1 ? 'lg:mt-24' : ''
        return (
          <article key={p.id} className={`group ${stagger}`}>
            {onOpen ? (
              <button onClick={() => onOpen(p.catalog, p.page)} className="block w-full text-left">
                {inner}
              </button>
            ) : (
              <TLink to={catalogHref(p.catalog, p.page)} className="block" data-cursor={t('open')}>
                {inner}
              </TLink>
            )}
            <Blur as="h3" className="didone mt-3 text-[1.9rem] leading-[1.08]" html={t(p.title)} />
            <Lines className="mt-4 text-[0.95rem] leading-relaxed text-mute" html={t(p.text)} />
            {onOpen ? (
              <button onClick={() => onOpen(p.catalog, p.page)} data-cursor="link">
                {link}
              </button>
            ) : (
              <TLink to={catalogHref(p.catalog, p.page)} data-cursor="link">
                {link}
              </TLink>
            )}
          </article>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/**
 * Full-screen page viewer. Pages are images (≈1000–1600 px webp) loaded one
 * at a time, the neighbours are preloaded; the small thumbnail sits under the
 * page as a placeholder. On a phone held upright the 2024 catalogue's spreads
 * are shown one half at a time. Click / double-tap zooms, swipe or arrow keys
 * turn the page.
 */
export function CatalogViewer({ catalog: c, start, onClose, onPage }: { catalog: Catalog; start: number; onClose: () => void; onPage?: (page: number) => void }) {
  const { t } = useLang()
  const narrow = useMedia('(max-width: 767px) and (orientation: portrait)')
  const [page, setPage] = useState(() => Math.min(c.count, Math.max(1, Math.round(start) || 1)))
  const [half, setHalf] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [grid, setGrid] = useState(false)
  const [loadedSrc, setLoadedSrc] = useState('')
  const [box, setBox] = useState({ w: 0, h: 0 })
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const dir = useRef(0)
  const focus = useRef({ x: 0.5, y: 0.5 })
  const ptr = useRef({ x: 0, y: 0, down: false, lastTap: 0 })
  const closing = useRef(false)

  const split = narrow && isSpread(c, page)
  const side = split ? half : 0
  const [w, h] = c.size(page)
  const ratio = (split ? w / 2 : w) / h
  const fitW = Math.max(0, Math.min(box.w, box.h * ratio))
  const z = zoom ? (narrow ? 2.6 : 2) : 1
  const sw = Math.round(fitW * z)
  const sh = Math.round((fitW / ratio) * z)
  const src = pageSrc(c, page)
  const canPrev = page > 1 || (split && side === 1)
  const canNext = page < c.count || (split && side === 0)

  /* stage size */
  useLayoutEffect(() => {
    const el = stage.current!
    const measure = () => {
      const cs = getComputedStyle(el)
      setBox({ w: el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), h: el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [zoom])

  /* open */
  useLayoutEffect(() => {
    lenis?.stop()
    const r = root.current!
    if (!reducedMotion) {
      gsap.fromTo(r.querySelector('[data-bg]'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      gsap.fromTo(r.querySelectorAll('[data-ui]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.35, stagger: 0.05, ease: 'power3.out' })
      gsap.fromTo(sheet.current, { opacity: 0, y: 40, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, delay: 0.15, ease: 'power3.out' })
    }
    return () => {
      lenis?.start()
    }
  }, [])

  /* page turn */
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (reducedMotion || !sheet.current) return
    gsap.fromTo(sheet.current, { opacity: 0, x: dir.current * 48, filter: 'blur(10px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' })
  }, [page, side])

  /* report the page (URL) and preload the neighbours */
  useEffect(() => {
    onPage?.(page)
    ;[page + 1, page - 1, page + 2].forEach((p) => {
      if (p < 1 || p > c.count) return
      const im = new Image()
      im.src = asset(pageSrc(c, p))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, c])

  /* zoom: keep the point that was clicked in view */
  useLayoutEffect(() => {
    const el = stage.current
    if (!el || !zoom) return
    el.scrollLeft = focus.current.x * el.scrollWidth - el.clientWidth / 2
    el.scrollTop = focus.current.y * el.scrollHeight - el.clientHeight / 2
  }, [zoom, sw])

  const go = (d: 1 | -1) => {
    setZoom(false)
    if (split && d === 1 && side === 0) {
      dir.current = 1
      setHalf(1)
      return
    }
    if (split && d === -1 && side === 1) {
      dir.current = -1
      setHalf(0)
      return
    }
    const np = page + d
    if (np < 1 || np > c.count) return
    dir.current = d
    setPage(np)
    setHalf(d === -1 && narrow && isSpread(c, np) ? 1 : 0)
  }
  const jump = (p: number) => {
    if (p === page) return setGrid(false)
    dir.current = p > page ? 1 : -1
    setPage(p)
    setHalf(0)
    setZoom(false)
    setGrid(false)
  }

  const close = () => {
    if (closing.current) return
    closing.current = true
    if (reducedMotion) return onClose()
    const r = root.current!
    gsap
      .timeline({ onComplete: onClose })
      .to(r.querySelectorAll('[data-ui]'), { opacity: 0, duration: 0.25 })
      .to(sheet.current, { opacity: 0, y: 30, filter: 'blur(12px)', duration: 0.5, ease: 'power2.in' }, 0)
      .to(r.querySelector('[data-bg]'), { opacity: 0, duration: 0.5 }, 0.15)
  }

  const toggleZoom = (e: { clientX: number; clientY: number }) => {
    const r = sheet.current?.getBoundingClientRect()
    if (r && !zoom) focus.current = { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) }
    if (!r || zoom) focus.current = { x: 0.5, y: 0.5 }
    setZoom((v) => !v)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (grid) setGrid(false)
        else if (zoom) setZoom(false)
        else close()
      } else if (grid) return
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') go(1)
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1)
      else if (e.key === 'Home') jump(1)
      else if (e.key === 'End') jump(c.count)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* swipe to turn, click (mouse) or double-tap (touch) to zoom */
  const onDown = (e: React.PointerEvent) => {
    ptr.current = { ...ptr.current, x: e.clientX, y: e.clientY, down: true }
  }
  const onUp = (e: React.PointerEvent) => {
    const p = ptr.current
    if (!p.down) return
    p.down = false
    const dx = e.clientX - p.x
    const dy = e.clientY - p.y
    if (!zoom && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) return go(dx < 0 ? 1 : -1)
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return
    if (!sheet.current?.contains(e.target as Node)) return
    if (e.pointerType === 'mouse') return toggleZoom(e)
    const now = performance.now()
    if (now - p.lastTap < 320) {
      p.lastTap = 0
      toggleZoom(e)
    } else p.lastTap = now
  }

  const roundBtn =
    'h-12 w-12 place-items-center rounded-full border border-line bg-navy/60 backdrop-blur transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-25 md:h-14 md:w-14'
  const toolBtn = 'meta inline-flex items-center gap-2 !text-ink transition-colors hover:!text-gold'

  return createPortal(
    <div ref={root} className="tone-navy fixed inset-0 z-[95] flex flex-col !bg-transparent" role="dialog" aria-modal="true" aria-label={c.title}>
      <div data-bg className="absolute inset-0 bg-navy" />

      {/* top bar */}
      <div data-ui className="relative z-[2] flex items-center justify-between gap-4 px-4 py-4 md:px-10 md:py-6">
        <p className="meta min-w-0 truncate !text-ink/80">
          <span className="mr-3 font-display text-base normal-case italic tracking-normal text-gold max-[420px]:hidden">{c.title}</span>
          <span className="[font-variant-numeric:tabular-nums]">
            {pad(page)} / {pad(c.count)}
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-5 md:gap-8">
          <button onClick={() => setGrid((v) => !v)} className={toolBtn} aria-pressed={grid} aria-label={t('v.all')} data-cursor="link">
            <span aria-hidden className="text-base leading-none">▦</span>
            <span className="hidden sm:inline">{t('v.all')}</span>
          </button>
          <button onClick={() => toggleZoom({ clientX: 0, clientY: 0 })} className={toolBtn.replace('inline-flex', 'hidden md:inline-flex')} data-cursor="link">
            <span aria-hidden className="text-base leading-none">{zoom ? '−' : '+'}</span>
            {zoom ? t('v.unzoom') : t('v.zoom')}
          </button>
          <a href={asset(c.pdf)} download className={toolBtn} data-cursor="link">
            <span aria-hidden>↓</span>
            <span>PDF</span>
          </a>
          <button onClick={close} className={toolBtn} aria-label={t('close')} data-cursor="link">
            <span className="hidden sm:inline">{t('close')}</span>
            <span aria-hidden>✕</span>
          </button>
        </div>
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        {/* page */}
        <div
          ref={stage}
          data-lenis-prevent
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerCancel={() => (ptr.current.down = false)}
          className={`relative z-[1] min-h-0 flex-1 px-3 pb-3 md:px-28 md:pb-4 ${zoom ? 'overflow-auto' : 'overflow-hidden'}`}
          style={{ touchAction: zoom ? 'auto' : 'pan-y pinch-zoom' }}
        >
          <div className="flex min-h-full min-w-full items-center justify-center" style={zoom ? { width: Math.max(sw, box.w), height: Math.max(sh, box.h) } : { height: '100%' }}>
            <div
              ref={sheet}
              className={`relative shrink-0 overflow-hidden bg-[#fbfaf7] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              style={{ width: sw, height: sh }}
              data-cursor={zoom ? '−' : '+'}
            >
              {(() => {
                const pos = split ? { width: '200%', maxWidth: 'none', transform: side ? 'translateX(-50%)' : undefined } : { width: '100%' }
                return (
                  <>
                    <img src={asset(thumbSrc(c, page))} alt="" aria-hidden draggable={false} className="absolute inset-y-0 left-0 h-full scale-[1.02] object-cover blur-[6px]" style={pos} />
                    <img
                      key={src}
                      src={asset(src)}
                      alt={`${c.title} — ${t('v.page')} ${page}`}
                      draggable={false}
                      decoding="async"
                      onLoad={() => setLoadedSrc(src)}
                      className={`absolute inset-y-0 left-0 h-full object-cover transition-opacity duration-500 ${loadedSrc === src ? 'opacity-100' : 'opacity-0'}`}
                      style={pos}
                    />
                  </>
                )
              })()}
            </div>
          </div>
        </div>

        {/* arrows */}
        {!zoom &&
          ([-1, 1] as const).map((d) => (
            <button
              key={d}
              data-ui
              onClick={() => go(d)}
              disabled={d < 0 ? !canPrev : !canNext}
              className={`${roundBtn} absolute top-1/2 z-[2] hidden -translate-y-1/2 md:grid ${d < 0 ? 'left-6 lg:left-8' : 'right-6 lg:right-8'}`}
              aria-label={d < 0 ? t('v.prev') : t('v.next')}
              data-cursor="link"
            >
              {d < 0 ? '←' : '→'}
            </button>
          ))}

        {/* bottom: scrub bar */}
        <div data-ui className="relative z-[2] flex items-center gap-4 px-4 pb-5 pt-2 md:gap-6 md:px-10 md:pb-6">
          <button onClick={() => go(-1)} disabled={!canPrev} className={`${roundBtn} grid !h-11 !w-11 md:hidden`} aria-label={t('v.prev')}>
            ←
          </button>
          <input
            type="range"
            min={1}
            max={c.count}
            value={page}
            onChange={(e) => jump(Number(e.target.value))}
            className="page-range min-w-0 flex-1"
            style={{ '--p': `${((page - 1) / Math.max(1, c.count - 1)) * 100}%` } as React.CSSProperties}
            aria-label={t('v.page')}
            data-cursor="drag ↔"
          />
          <button onClick={() => go(1)} disabled={!canNext} className={`${roundBtn} grid !h-11 !w-11 md:hidden`} aria-label={t('v.next')}>
            →
          </button>
          <span className="meta hidden !text-ink/60 lg:inline">{t('v.hint')}</span>
        </div>

        {/* all pages */}
        {grid && <PageGrid catalog={c} current={page} onPick={jump} />}
      </div>
    </div>,
    document.body,
  )
}

function PageGrid({ catalog: c, current, onPick }: { catalog: Catalog; current: number; onPick: (p: number) => void }) {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const spreads = isSpread(c, 2)

  useLayoutEffect(() => {
    const el = root.current!
    el.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ block: 'center' })
    if (!reducedMotion) gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div ref={root} data-lenis-prevent className="absolute inset-0 z-[3] overflow-y-auto overscroll-contain bg-navy px-4 pb-16 pt-2 md:px-10">
      <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-6">
        {c.toc.map((ch) => (
          <button key={ch.k} onClick={() => onPick(ch.page)} className="font-display text-base italic text-gold transition-colors hover:text-ink" data-cursor="link">
            {plain(t(ch.k))}
          </button>
        ))}
      </div>
      <div className={`grid gap-x-4 gap-y-6 md:gap-x-6 ${spreads ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'}`}>
        {Array.from({ length: c.count }, (_, k) => k + 1).map((p) => {
          const [w, h] = c.size(p)
          const wide = w > h
          return (
            <button key={p} onClick={() => onPick(p)} aria-current={p === current ? 'page' : undefined} className="group block text-left" data-cursor="link">
              <span className={`flex items-end justify-center ${spreads ? 'aspect-[1600/1131]' : ''}`}>
                <img
                  src={asset(thumbSrc(c, p))}
                  alt={`${t('v.page')} ${p}`}
                  loading="lazy"
                  decoding="async"
                  width={wide ? 360 : 180}
                  height={Math.round(((wide ? 360 : 180) * h) / w)}
                  className={`block h-auto bg-ink/10 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)] outline-offset-4 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 ${spreads && !wide ? 'w-1/2' : 'w-full'} ${p === current ? 'outline outline-1 outline-gold' : ''}`}
                />
              </span>
              <span className={`meta mt-2 block text-center [font-variant-numeric:tabular-nums] ${p === current ? '!text-gold' : '!text-ink/55'}`}>{pad(p)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
