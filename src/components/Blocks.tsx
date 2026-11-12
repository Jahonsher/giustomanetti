import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { asset, FACTS, MARKS, pad, type Card, type Photo } from '../data'
import { plain, useLang } from '../i18n'
import { gsap, useGSAP, useReady, reducedMotion, isTouch, lenis, useMedia } from '../lib/motion'
import { GLImage } from './GLImage'
import { Reveal, FadeUp } from './Reveal'
import { TLink } from './Transition'

/* ------------------------------------------------------------------ */
/** Inner-page hero: big photo that settles from a zoom, title seeps out. */
export function PageHero({ image, eyebrow, title, index = '01' }: { image: string; eyebrow: string; title: string; index?: string }) {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      const pic = root.current!.querySelector('[data-pic]')
      if (reducedMotion) return
      gsap.to(pic, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      if (ready) gsap.fromTo(pic, { scale: 1.25, filter: 'brightness(0.4)' }, { scale: 1.06, filter: 'brightness(1)', duration: 2.4, ease: 'power3.out' })
    },
    { dependencies: [ready], scope: root },
  )
  return (
    <section ref={root} className="relative h-[92svh] min-h-[560px] overflow-hidden">
      <img data-pic src={asset(image)} alt="" className="absolute inset-0 h-full w-full scale-[1.06] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div className="relative flex h-full flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
        <Reveal as="p" immediate className="label mb-6 !text-bone/80">{`${index} — ${plain(t(eyebrow))}`}</Reveal>
        <Reveal as="h1" by="words" immediate delay={0.1} className="display max-w-[16ch] text-[15vw] md:text-[8.5vw]" html={t(title)} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
export function SectionHead({ index, label, children }: { index: string; label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
      <Reveal as="p" className="label">{`${index} — ${label}`}</Reveal>
      {children}
    </div>
  )
}

/** Big lead paragraph that lights up word by word. */
export function Lede({ k }: { k: string }) {
  const { t } = useLang()
  return <Reveal as="p" className="display max-w-5xl text-3xl leading-[1.18] md:text-[2.8rem]" html={t(k)} />
}

/* ------------------------------------------------------------------ */
/** Image cards with tags (Qurilish / Katalog / Kosmetika). */
export function CardGrid({ items }: { items: Card[] }) {
  const { t } = useLang()
  const wide = useMedia('(min-width: 1024px)')
  return (
    <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <article key={c.title} className={wide && i % 3 === 1 ? 'lg:mt-24' : ''}>
          <GLImage src={c.image} alt={c.alt} className="aspect-[4/5] w-full rounded-[22px]" cursor="view" />
          <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <Reveal as="h3" by="words" className="display text-4xl md:text-5xl" html={t(c.title)} />
            <span className="label">{pad(i + 1)}</span>
          </div>
          <Reveal as="p" className="mt-4 text-[0.95rem] leading-relaxed text-ash" html={t(c.text)} />
          <FadeUp y={20} className="mt-5 flex flex-wrap gap-2">
            {c.tags.map((tag, j) => (
              <span key={j} className="label rounded-full border border-line px-3 py-1.5 !text-bone">
                {typeof tag === 'string' ? tag : plain(t(tag.k))}
              </span>
            ))}
          </FadeUp>
        </article>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Photo + eyebrow + title + paragraphs. */
export function Split({ image, eyebrow, title, paragraphs, reverse }: { image: string; eyebrow: string; title: string; paragraphs: string[]; reverse?: boolean }) {
  const { t } = useLang()
  return (
    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
      <GLImage src={image} alt="" className={`aspect-[4/5] rounded-[26px] md:col-span-5 ${reverse ? 'md:order-2 md:col-start-8' : ''}`} />
      <div className={`md:col-span-6 ${reverse ? 'md:order-1' : 'md:col-start-7'}`}>
        <Reveal as="p" className="label mb-6">{`— ${plain(t(eyebrow))}`}</Reveal>
        <Reveal as="h2" by="words" className="display text-5xl md:text-7xl" html={t(title)} />
        <div className="mt-10 space-y-6">
          {paragraphs.map((k) => (
            <Reveal key={k} as="p" className="max-w-xl leading-relaxed text-ash md:text-lg" html={t(k)} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** 400+ / 15 / 70+ / 29 — numbers count up when they scroll in. */
export function Stats() {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      if (!ready) return
      root.current!.querySelectorAll<HTMLElement>('[data-value]').forEach((el) => {
        const end = Number(el.dataset.value)
        const o = { v: 0 }
        gsap.to(o, {
          v: end,
          duration: reducedMotion ? 0 : 2.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        })
      })
      gsap.from(root.current!.querySelectorAll('[data-rule]'), { scaleX: 0, transformOrigin: '0 50%', duration: 1.6, ease: 'expo.inOut', stagger: 0.1, scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
    },
    { dependencies: [ready], scope: root },
  )
  return (
    <div ref={root} className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
      {FACTS.map((s) => (
        <div key={s.label}>
          <div data-rule className="mb-6 h-px w-full bg-line" />
          <p className="display flex items-start text-7xl lg:text-8xl">
            <span data-value={s.value} className="tabular-nums">
              0
            </span>
            {s.suffix && <span className="ml-1 text-4xl text-sand">{s.suffix}</span>}
          </p>
          <p className="label mt-3">{plain(t(s.label))}</p>
        </div>
      ))}
    </div>
  )
}

/** Four quality marks in a row. */
export function Marks() {
  const { t } = useLang()
  return (
    <div className="grid gap-px overflow-hidden rounded-[26px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {MARKS.map((k, i) => (
        <div key={k} className="group relative bg-[var(--color-ink)] p-8 md:p-10">
          <span className="display text-5xl text-sand">{pad(i + 1)}</span>
          <Reveal as="p" by="words" className="display mt-10 text-3xl leading-tight md:text-[2.1rem]">
            {plain(t(k))}
          </Reveal>
          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sand transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-x-100" />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/** Masonry photo wall with parallax columns + full-screen lightbox. */
export function Gallery({ items }: { items: Photo[] }) {
  const { t } = useLang()
  const root = useRef<HTMLDivElement>(null)
  const wide = useMedia('(min-width: 768px)')
  const cols = wide ? 3 : 1
  const [open, setOpen] = useState<number | null>(null)

  useGSAP(
    () => {
      if (reducedMotion || !wide) return
      root.current!.querySelectorAll<HTMLElement>('[data-speed]').forEach((col) => {
        gsap.fromTo(col, { y: 0 }, { y: -Number(col.dataset.speed), ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { dependencies: [wide], scope: root },
  )

  const columns = Array.from({ length: cols }, (_, c) => items.map((p, i) => ({ p, i })).filter(({ i }) => i % cols === c))
  return (
    <>
      <div ref={root} className={`grid gap-6 md:gap-8 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {columns.map((col, c) => (
          <div key={c} data-speed={[60, 160, 100][c]} className={`flex flex-col gap-6 md:gap-8 ${c === 1 ? 'md:pt-28' : ''}`}>
            {col.map(({ p, i }) => (
              <button key={p.image + i} onClick={() => setOpen(i)} className="block text-left" data-cursor={t('view')}>
                <GLImage src={p.image} alt={p.alt} className={`rounded-[20px] ${p.wide ? 'aspect-[4/3]' : i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`} />
                <span className="label mt-3 block">
                  {pad(i + 1)} — {p.alt}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </>
  )
}

function Lightbox({ items, index, onClose, onIndex }: { items: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const { t } = useLang()
  const close = () => gsap.to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut', onComplete: onClose })
  const go = (d: number) => onIndex((index + d + items.length) % items.length)

  useEffect(() => {
    lenis?.stop()
    gsap.fromTo(root.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
    return () => {
      lenis?.start()
    }
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })
  useGSAP(() => {
    gsap.fromTo(root.current!.querySelector('[data-photo]'), { scale: 1.08, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'power3.out' })
  }, { dependencies: [index], scope: root })

  const it = items[index]
  return createPortal(
    <div ref={root} className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur" role="dialog" aria-modal="true" aria-label={it.alt}>
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <span className="label">
          {pad(index + 1)} / {pad(items.length)} — {it.alt}
        </span>
        <button onClick={close} className="label link-line !text-bone">
          {t('close')} ✕
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-8 md:px-24">
        <img data-photo key={it.image} src={asset(it.image)} alt={it.alt} className="h-full max-h-full w-auto max-w-full rounded-[16px] object-contain" />
        <button onClick={() => go(-1)} className="glass-drop absolute left-2 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full md:left-8" aria-label="Prev">
          ←
        </button>
        <button onClick={() => go(1)} className="glass-drop absolute right-2 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full md:right-8" aria-label="Next">
          →
        </button>
      </div>
    </div>,
    document.body,
  )
}

/* ------------------------------------------------------------------ */
/** Gold call-to-action band with a magnetic round button. */
export function ContactCTA({ text, label = 'c.eye' }: { text: string; label?: string }) {
  const { t } = useLang()
  const btn = useRef<HTMLAnchorElement>(null)
  useGSAP(() => {
    if (isTouch) return
    const el = btn.current!
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * 0.35)
      yTo((e.clientY - r.top - r.height / 2) * 0.35)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  })
  return (
    <section className="tone-sand panel px-5 py-24 md:px-10 md:py-32">
      <Reveal as="p" className="label mb-10">{`— ${plain(t(label))}`}</Reveal>
      <div className="grid items-end gap-12 md:grid-cols-12">
        <Reveal as="h2" by="words" className="display text-5xl leading-[1.05] md:col-span-9 md:text-[4.4vw]" html={t(text)} />
        <div className="flex md:col-span-3 md:justify-end">
          <TLink ref={btn} to="/aloqa" className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border border-bone/40 md:h-48 md:w-48" data-cursor="link">
            <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
            <span className="label relative px-4 text-center !text-bone transition-colors duration-500 group-hover:!text-ink">{t('cta.quote')}</span>
          </TLink>
        </div>
      </div>
    </section>
  )
}
