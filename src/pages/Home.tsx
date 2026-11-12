import { useRef } from 'react'
import { HeroCanvas } from '../gl/HeroCanvas'
import { DirectionRing } from '../gl/DirectionRing'
import { GLImage } from '../components/GLImage'
import { Reveal, ScrubText, FadeUp } from '../components/Reveal'
import { TLink } from '../components/Transition'
import { ContactCTA, Marks, SectionHead, Stats } from '../components/Blocks'
import { CONTACT, img, pad, REELS, WORKSHOP } from '../data'
import { plain, useLang } from '../i18n'
import { gsap, useGSAP, reducedMotion, useReady } from '../lib/motion'

function Hero() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)
  const ready = useReady()

  useGSAP(
    () => {
      if (reducedMotion) return
      gsap.to(root.current!.querySelector('[data-hero-title]'), {
        yPercent: -30,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      if (ready) gsap.from(root.current!.querySelectorAll('[data-hero-fade]'), { autoAlpha: 0, y: 24, duration: 1.6, ease: 'power4.out', stagger: 0.08, delay: 0.8 })
    },
    { dependencies: [ready], scope: root },
  )

  return (
    <section ref={root} className="grain relative h-[100svh] min-h-[640px] overflow-hidden">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="relative flex h-full flex-col justify-between px-5 pb-8 pt-32 md:px-10 md:pb-10 md:pt-40">
        <div data-hero-fade className="invisible flex justify-between">
          <span className="label">01 — {plain(t('top.l'))}</span>
          <span className="label hidden md:block">{t('tagline')}</span>
        </div>
        <div data-hero-title>
          <Reveal as="h1" by="words" immediate delay={0.15} className="display max-w-[22ch] text-[10vw] leading-[0.98] md:text-[5.4vw]" html={t('h.h1')} />
        </div>
        <div className="grid items-end gap-8 md:grid-cols-3">
          <p data-hero-fade className="invisible max-w-sm text-sm leading-relaxed text-bone/85">
            {plain(t('h.sub'))}
          </p>
          <div data-hero-fade className="invisible hidden flex-col items-center gap-3 md:flex">
            <span className="label">{t('hero.scroll')}</span>
            <span className="relative block h-14 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_var(--ease-expo)_infinite] bg-sand" />
            </span>
          </div>
          <div data-hero-fade className="invisible flex flex-wrap items-center gap-4 md:justify-end">
            <TLink to="/katalog" className="glass-drop label rounded-full px-6 py-3.5 !text-bone transition-transform duration-500 hover:scale-[1.04] active:scale-95" data-cursor="link">
              {t('cta.cat')}
            </TLink>
            <TLink to="/qurilish" className="label link-line !text-bone" data-cursor="link">
              {t('qb.k')} →
            </TLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Heritage() {
  const { t } = useLang()
  return (
    <section className="tone-light panel px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal as="p" className="label">{`— ${plain(t('ab.eye'))}`}</Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal as="h2" by="words" className="display mb-12 text-6xl italic text-sand md:text-8xl" html={t('ab.h')} />
          <ScrubText className="display text-3xl leading-[1.18] md:text-[2.7rem]" html={t('ab.p1')} />
        </div>
      </div>
      <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
        <GLImage src={img('img/wp/ig-321844381')} alt="Giusto Manetti Firenze" className="aspect-[4/5] rounded-[26px] md:col-span-5 md:col-start-2" />
        <div className="flex flex-col justify-end gap-10 md:col-span-5 md:col-start-8">
          <GLImage src={img('img/foto/varaq-ranglari')} alt="" className="aspect-square w-2/3 self-end rounded-[22px]" />
          <Reveal as="p" className="leading-relaxed text-ash md:text-lg" html={t('ab.p2')} />
        </div>
      </div>
      <div className="mt-24 md:mt-32">
        <Reveal as="p" className="label mb-14">{`— ${t('stats.label')}`}</Reveal>
        <Stats />
      </div>
    </section>
  )
}

/** E-shop (gold) and Catalogue (navy) — the two ways to buy. */
function Duo() {
  const { t } = useLang()
  const cards = [
    { title: 'p2.h', text: 'p2.p', cta: 'cta.order', to: '/aloqa', image: img('img/eshop'), tone: 'tone-sand' },
    { title: 'p1.h', text: 'p1.p', cta: 'cta.quote', to: '/katalog', image: img('img/catalogo'), tone: 'tone-char' },
  ]
  return (
    <section className="grid gap-2 px-2 md:grid-cols-2 md:gap-3 md:px-3">
      {cards.map((c, i) => (
        <article key={c.title} className={`${c.tone} flex flex-col overflow-hidden rounded-[28px] md:rounded-[44px]`}>
          <div className="p-8 md:p-12">
            <span className="label">{pad(i + 1)}</span>
            <Reveal as="h2" by="chars" className="display mt-8 text-7xl md:text-8xl">
              {plain(t(c.title))}
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-lg leading-relaxed text-ash" html={t(c.text)} />
            <FadeUp y={20} className="mt-8">
              <TLink to={c.to} className="group inline-flex items-center gap-4" data-cursor="link">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:bg-bone group-hover:text-ink">→</span>
                <span className="label link-line !text-bone">{t(c.cta)}</span>
              </TLink>
            </FadeUp>
          </div>
          <GLImage src={c.image} alt="" className="mx-4 mb-4 mt-auto aspect-[16/10] rounded-[22px] md:mx-6 md:mb-6 md:rounded-[30px]" />
        </article>
      ))}
    </section>
  )
}

/** Instagram reels — a pinned horizontal run. */
function Reels() {
  const { t } = useLang()
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} className="tone-char relative mt-2 flex h-screen flex-col justify-center overflow-hidden md:mt-3">
      <div className="mb-10 px-5 md:px-10">
        <SectionHead index="03" label={plain(t('ig.eye'))}>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="label link-line !text-bone">
            {t('ig.cta')} ↗
          </a>
        </SectionHead>
      </div>
      <div ref={track} className="flex w-max items-end gap-6 px-5 md:gap-10 md:px-10">
        <div className="flex w-[80vw] shrink-0 flex-col justify-end md:w-[34vw]">
          <Reveal as="h2" by="words" className="display text-6xl md:text-[5.6vw]" html={t('ig.h')} />
          <Reveal as="p" className="mt-6 max-w-md leading-relaxed text-ash" html={t('ig.p')} />
        </div>
        {REELS.map((r, i) => (
          <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="group block w-[62vw] shrink-0 md:w-[22vw]" data-cursor="Instagram">
            <GLImage src={r.image} alt={r.caption} className={`w-full rounded-[24px] ${i % 2 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`} />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="display text-3xl transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:italic">{r.caption}</h3>
              <span className="label">{pad(i + 1)}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/** Endless strip of workshop photos + quality marks. */
function Workshop() {
  const { t } = useLang()
  const row = [...WORKSHOP, ...WORKSHOP]
  return (
    <section className="tone-light panel overflow-hidden py-24 md:py-32">
      <div className="px-5 md:px-10">
        <Reveal as="p" className="label mb-6">{`— ${t('work.label')}`}</Reveal>
        <Reveal as="h2" by="words" className="display text-6xl md:text-8xl">
          {t('work.h')}
        </Reveal>
      </div>
      <div className="mt-16 overflow-hidden">
        <div className="flex w-max gap-6" style={{ animation: reducedMotion ? 'none' : 'marquee 60s linear infinite' }}>
          {row.map((src, i) => (
            <GLImage key={i} src={src} alt="" reveal={false} className="aspect-[4/5] w-[60vw] shrink-0 rounded-[22px] md:w-[22vw]" />
          ))}
        </div>
      </div>
      <div className="mt-20 px-5 md:mt-28 md:px-10">
        <Marks />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Heritage />
      <DirectionRing />
      <Duo />
      <Reels />
      <Workshop />
      <ContactCTA text="c.p" />
    </>
  )
}
