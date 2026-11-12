import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { asset, FACTS, MARKS, pad, type Card, type Photo } from '../data'
import { plain, useLang } from '../i18n'
import { gsap, useGSAP, useReady, reducedMotion, isTouch, lenis, scroll } from '../lib/motion'
import { Arch } from './Arch'
import { Blur, FadeUp, Lines, ScrubBlur } from './Reveal'
import { TLink } from './Transition'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

/* ------------------------------------------------------------------ */
/** Inner-page opening: Didone title on the left, a tall arch on the right. */
export function PageHero({ image, eyebrow, title, lede, index = 'I' }: { image: string; eyebrow: string; title: string; lede?: string; index?: string }) {
  const { t } = useLang()
  return (
    <section className="relative px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
      <div className="grid items-end gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Blur as="p" immediate className="eyebrow mb-8">{`${index} — ${plain(t(eyebrow))}`}</Blur>
          <Blur as="h1" by="chars" immediate delay={0.1} className="didone text-[15vw] md:text-[7.4vw]" html={t(title)} />
          {lede && <Lines immediate delay={0.5} className="mt-10 max-w-xl text-[1.05rem] leading-relaxed text-mute" html={t(lede)} />}
          <div className="mt-14 hidden items-center gap-4 md:flex">
            <span className="relative block h-16 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[drip_2.4s_var(--ease-silk)_infinite] bg-gold" />
            </span>
            <span className="meta">{t('hero.scroll')}</span>
          </div>
        </div>
        <Arch src={image} eager className="aspect-[3/4] w-full md:col-span-4 md:col-start-9 md:max-h-[76vh]" />
      </div>
    </section>
  )
}

/** Centered statement that sharpens word by word while scrolling. */
export function Statement({ eyebrow, k, className = '' }: { eyebrow?: string; k: string; className?: string }) {
  const { t } = useLang()
  return (
    <section className={`px-5 py-28 text-center md:px-10 md:py-40 ${className}`}>
      {eyebrow && <Blur as="p" className="eyebrow mb-10">{plain(t(eyebrow))}</Blur>}
      <ScrubBlur className="didone mx-auto max-w-5xl text-[2rem] leading-[1.22] md:text-[3.2rem]" html={t(k)} />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/** Arched image cards with italic tag line. */
export function CardGrid({ items }: { items: Card[] }) {
  const { t } = useLang()
  return (
    <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <article key={c.title} className={`group ${i % 3 === 1 ? 'lg:mt-28' : ''}`}>
          <Arch src={c.image} alt={c.alt} className="aspect-[3/4] w-full" cursor="view" />
          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-display text-xl italic text-gold">{ROMAN[i]}</span>
            <Blur as="h3" className="didone text-4xl md:text-[2.6rem]" html={t(c.title)} />
          </div>
          <Lines className="mt-5 leading-relaxed text-mute" html={t(c.text)} />
          <FadeUp y={14} className="mt-5 font-display text-[0.95rem] italic text-gold">
            {c.tags.map((tag) => (typeof tag === 'string' ? tag : plain(t(tag.k)))).join('  ·  ')}
          </FadeUp>
        </article>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
export function Split({ image, eyebrow, title, paragraphs, reverse }: { image: string; eyebrow: string; title: string; paragraphs: string[]; reverse?: boolean }) {
  const { t } = useLang()
  return (
    <div className="grid items-center gap-14 md:grid-cols-12 md:gap-16">
      <Arch src={image} shape="pill" className={`aspect-[4/5] w-full md:col-span-5 ${reverse ? 'md:order-2 md:col-start-8' : ''}`} />
      <div className={`md:col-span-6 ${reverse ? 'md:order-1' : 'md:col-start-7'}`}>
        <Blur as="p" className="eyebrow mb-8">{plain(t(eyebrow))}</Blur>
        <Blur as="h2" by="chars" className="didone text-5xl md:text-[4.6rem]" html={t(title)} />
        <div className="mt-10 space-y-6">
          {paragraphs.map((k) => (
            <Lines key={k} className="max-w-xl leading-relaxed text-mute md:text-[1.07rem]" html={t(k)} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Numbers roll into place on odometer drums. */
export function Odometer() {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      if (!ready) return
      root.current!.querySelectorAll<HTMLElement>('[data-drum]').forEach((drum, i) => {
        const d = Number(drum.dataset.drum)
        gsap.fromTo(
          drum,
          { yPercent: 0 },
          { yPercent: -(10 + d) * 10 / 2, duration: reducedMotion ? 0 : 2.4 + (i % 3) * 0.25, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } },
        )
      })
    },
    { dependencies: [ready], scope: root },
  )
  return (
    <div ref={root} className="grid grid-cols-2 border-t border-line md:grid-cols-4">
      {FACTS.map((f, k) => (
        <div key={f.label} className={`px-2 py-10 md:px-8 ${k ? 'border-line md:border-l' : ''} ${k % 2 ? 'border-l' : ''}`}>
          <div className="didone flex items-start text-7xl [font-variant-numeric:lining-nums_tabular-nums] md:text-8xl" aria-label={`${f.value}${f.suffix}`}>
            {String(f.value)
              .split('')
              .map((ch, i) => (
                <span key={i} className="relative inline-block h-[1.15em] overflow-hidden" aria-hidden>
                  {/* two turns of 0–9 so every digit travels a little */}
                  <span data-drum={ch} className="block">
                    {Array.from({ length: 20 }, (_, n) => (
                      <span key={n} className="block h-[1.15em] leading-[1.15em]">
                        {n % 10}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            {f.suffix && <span className="ml-1 text-4xl italic text-gold">{f.suffix}</span>}
          </div>
          <p className="meta mt-4">{plain(t(f.label))}</p>
        </div>
      ))}
    </div>
  )
}

/** Quality marks with roman numerals. */
export function Marks() {
  const { t } = useLang()
  return (
    <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
      {MARKS.map((k, i) => (
        <div key={k} className={`group flex items-baseline gap-5 py-8 sm:px-6 ${i ? 'lg:border-l' : ''} border-line ${i % 2 ? 'sm:border-l' : ''}`}>
          <span className="font-display text-2xl italic text-gold">{ROMAN[i]}</span>
          <Blur as="p" className="didone text-2xl leading-snug transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
            {plain(t(k))}
          </Blur>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Sticky cards that stack; the one underneath sinks back and dims. */
export function StackCards({ items }: { items: { eyebrow: string; title: string; text: string; image: string; cta: string; to?: string; href?: string; tone: string }[] }) {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (reducedMotion) return
      const cards = root.current!.querySelectorAll<HTMLElement>('[data-card]')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.fromTo(card.querySelector('[data-inner]'), { scale: 1, rotate: 0, filter: 'brightness(1)' }, {
          scale: 0.9,
          rotate: i % 2 ? 1.2 : -1.2,
          filter: 'brightness(0.6)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 12%', scrub: true },
        })
      })
    },
    { scope: root },
  )
  return (
    <div ref={root} className="px-3 md:px-6">
      {items.map((c, i) => {
        const Btn = c.to ? (
          <TLink to={c.to} className="meta group/b inline-flex items-center gap-4 !text-current" data-cursor="link">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-current transition-colors duration-500 group-hover/b:bg-gold group-hover/b:border-gold group-hover/b:text-paper">→</span>
            <span className="uline">{t(c.cta)}</span>
          </TLink>
        ) : (
          <a href={c.href} target="_blank" rel="noreferrer" className="meta group/b inline-flex items-center gap-4 !text-current" data-cursor="link">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-current transition-colors duration-500 group-hover/b:bg-gold group-hover/b:border-gold group-hover/b:text-paper">↗</span>
            <span className="uline">{t(c.cta)}</span>
          </a>
        )
        return (
          <div key={c.title} data-card className="sticky top-[10vh] mb-[6vh] h-[84vh] min-h-[520px]">
            <div data-inner className={`${c.tone} grid h-full origin-top overflow-hidden rounded-[32px] md:grid-cols-12`}>
              <div className="flex flex-col justify-between p-8 md:col-span-6 md:p-14">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl italic text-gold">{ROMAN[i]}</span>
                  <span className="meta">{plain(t(c.eyebrow))}</span>
                </div>
                <div>
                  <Blur as="h3" by="chars" className="didone text-6xl md:text-[5.4vw]" html={t(c.title)} />
                  <Lines className="mt-6 max-w-md leading-relaxed text-mute" html={t(c.text)} />
                  <div className="mt-8">{Btn}</div>
                </div>
              </div>
              <div className="hidden p-4 md:col-span-6 md:block md:p-6">
                <Arch src={c.image} className="h-full w-full" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Draggable film strip; cards skew with the drag velocity. */
export function DragStrip({ items }: { items: { href: string; image: string; caption: string }[] }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const st = useRef({ x: 0, target: 0, v: 0, down: false, sx: 0, sTarget: 0, moved: false })

  useEffect(() => {
    const s = st.current
    const max = () => Math.max(0, track.current!.scrollWidth - wrap.current!.clientWidth)
    const tick = () => {
      if (!track.current || !wrap.current) return
      if (!s.down) s.target += s.v
      s.v *= 0.92
      s.target = Math.min(0, Math.max(-max(), s.target))
      const prev = s.x
      s.x += (s.target - s.x) * 0.1
      const vel = s.x - prev
      gsap.set(track.current, { x: s.x })
      track.current!.querySelectorAll<HTMLElement>('[data-tilt]').forEach((c) => (c.style.transform = `skewX(${gsap.utils.clamp(-8, 8, -vel * 0.25)}deg)`))
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  const down = (e: React.PointerEvent) => {
    const s = st.current
    s.down = true
    s.moved = false
    s.sx = e.clientX
    s.sTarget = s.target
    s.v = 0
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const move = (e: React.PointerEvent) => {
    const s = st.current
    if (!s.down) return
    const dx = e.clientX - s.sx
    if (Math.abs(dx) > 5) s.moved = true
    const before = s.target
    s.target = s.sTarget + dx * 1.2
    s.v = (s.target - before) * 0.6
  }
  const up = () => {
    st.current.down = false
  }

  return (
    <div ref={wrap} className="cursor-grab overflow-hidden active:cursor-grabbing" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} data-cursor="drag ↔">
      <div ref={track} className="flex w-max touch-pan-y gap-6 px-5 md:gap-8 md:px-10">
        {items.map((r, i) => (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            draggable={false}
            onClick={(e) => st.current.moved && e.preventDefault()}
            className="group block w-[64vw] shrink-0 select-none md:w-[24vw]"
          >
            <div data-tilt className="will-change-transform">
              <div className={`arch-sm relative overflow-hidden ${i % 2 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                <img src={asset(r.image)} alt={r.caption} draggable={false} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105" />
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between">
              <span className="didone text-2xl italic">{r.caption}</span>
              <span className="meta">{pad(i + 1)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Photo wall; a click grows the photo out of its frame to full screen. */
export function Gallery({ items }: { items: Photo[] }) {
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const origin = useRef<HTMLElement | null>(null)
  return (
    <>
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-8">
        {items.map((p, i) => (
          <button
            key={p.image + i}
            onClick={(e) => {
              origin.current = e.currentTarget.querySelector('img')
              setOpen(i)
            }}
            className="group block w-full break-inside-avoid text-left"
            data-cursor={t('view')}
          >
            <Arch src={p.image} alt={p.alt} shape={i % 4 === 0 ? 'arch' : 'rect'} className={p.wide ? 'aspect-[4/3] w-full' : i % 3 === 1 ? 'aspect-[3/4] w-full' : 'aspect-[4/5] w-full'} />
            <span className="mt-4 flex items-baseline gap-3">
              <span className="font-display italic text-gold">{ROMAN[i % 8]}</span>
              <span className="meta">{p.alt}</span>
            </span>
          </button>
        ))}
      </div>
      {open !== null && <Viewer items={items} index={open} origin={origin} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}

function Viewer({ items, index, origin, onIndex, onClose }: { items: Photo[]; index: number; origin: React.RefObject<HTMLElement | null>; onIndex: (i: number) => void; onClose: () => void }) {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const first = useRef(true)
  const opened = useRef(index) // only the photo we opened can fly back to its frame

  // FLIP: the photo grows from where it sat on the page
  useLayoutEffect(() => {
    const el = img.current!
    const bg = root.current!.querySelector('[data-bg]')
    const ui = root.current!.querySelectorAll('[data-ui]')
    lenis?.stop()
    const from = origin.current?.getBoundingClientRect()
    const to = el.getBoundingClientRect()
    if (from && !reducedMotion) {
      gsap.fromTo(
        el,
        { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: '0 0' },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 1.1, ease: 'power4.inOut' },
      )
    }
    gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.7 })
    gsap.fromTo(ui, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.05 })
    return () => {
      lenis?.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    gsap.fromTo(img.current, { opacity: 0, filter: 'blur(14px)', scale: 1.04 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.9, ease: 'power3.out' })
  }, [index])

  const close = () => {
    const el = img.current!
    const from = el.getBoundingClientRect()
    const to = origin.current?.getBoundingClientRect()
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(root.current!.querySelectorAll('[data-ui]'), { opacity: 0, duration: 0.25 })
    if (to && !reducedMotion && index === opened.current)
      tl.to(el, { x: to.left - from.left, y: to.top - from.top, scaleX: to.width / from.width, scaleY: to.height / from.height, transformOrigin: '0 0', duration: 0.9, ease: 'power4.inOut' }, 0)
    else tl.to(el, { opacity: 0, filter: 'blur(12px)', duration: 0.5 }, 0)
    tl.to(root.current!.querySelector('[data-bg]'), { opacity: 0, duration: 0.6 }, 0.2)
  }
  const go = (d: number) => onIndex((index + d + items.length) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const it = items[index]
  return createPortal(
    <div ref={root} className="fixed inset-0 z-[95] flex flex-col" role="dialog" aria-modal="true" aria-label={it.alt}>
      <div data-bg className="absolute inset-0 bg-paper" />
      <div data-ui className="relative flex items-center justify-between px-5 py-6 md:px-10">
        <span className="meta">
          <span className="font-display text-base italic text-gold">{ROMAN[index % 8]}</span> — {it.alt} · {pad(index + 1)}/{pad(items.length)}
        </span>
        <button onClick={close} className="meta uline !text-ink" data-cursor="link">
          {t('close')} ✕
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-10 md:px-28">
        <img ref={img} key={it.image} src={asset(it.image)} alt={it.alt} className="h-full max-h-full w-auto max-w-full object-contain" />
        {[-1, 1].map((d) => (
          <button
            key={d}
            data-ui
            onClick={() => go(d)}
            className={`absolute top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/70 backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-paper ${d < 0 ? 'left-3 md:left-8' : 'right-3 md:right-8'}`}
            aria-label={d < 0 ? 'Prev' : 'Next'}
            data-cursor="link"
          >
            {d < 0 ? '←' : '→'}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  )
}

/* ------------------------------------------------------------------ */
/** Navy band: a giant italic line rides the scroll velocity; gold seal button. */
export function CTA({ text }: { text: string }) {
  const { t } = useLang()
  const line = useRef<HTMLDivElement>(null)
  const seal = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    let x = 0
    let dir = 1
    const tick = () => {
      if (!line.current) return
      const v = scroll.velocity
      if (Math.abs(v) > 0.2) dir = Math.sign(v)
      x -= (0.6 + Math.min(14, Math.abs(v)) * 0.35) * dir
      const w = line.current!.scrollWidth / 2
      if (x <= -w) x += w
      if (x > 0) x -= w
      gsap.set(line.current, { x })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  useGSAP(() => {
    if (isTouch) return
    const el = seal.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.4)' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * 0.3)
      yTo((e.clientY - r.top - r.height / 2) * 0.3)
    }
    const leave = () => (xTo(0), yTo(0))
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  })

  const phrase = `${plain(t('cta.quote'))} — Giusto Manetti — `
  return (
    <section className="tone-navy relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Blur as="p" className="eyebrow mb-8">{plain(t('c.eye'))}</Blur>
        <Lines className="didone text-2xl leading-snug md:text-[2.1rem]" html={t(text)} />
      </div>
      <div className="relative mt-16 md:mt-24">
        <div ref={line} className="flex w-max whitespace-nowrap font-display text-[16vw] italic leading-none md:text-[11vw]">
          <span className="gold-text pr-[4vw]">{phrase.repeat(3)}</span>
          <span className="gold-text pr-[4vw]">{phrase.repeat(3)}</span>
        </div>
        <TLink
          ref={seal}
          to="/aloqa"
          className="gold-leaf absolute left-1/2 top-1/2 -ml-[72px] -mt-[72px] grid h-36 w-36 place-items-center rounded-full text-navy shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:-ml-[88px] md:-mt-[88px] md:h-44 md:w-44"
          data-cursor="link"
        >
          <span className="meta px-5 text-center !text-navy">{t('cta.quote')}</span>
        </TLink>
      </div>
    </section>
  )
}
