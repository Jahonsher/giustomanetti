import { HeroSlider } from '../gl/HeroSlider'
import { Arch } from '../components/Arch'
import { Blur, Lines, ScrubBlur } from '../components/Reveal'
import { TLink } from '../components/Transition'
import { CTA, DragStrip, Marks, Odometer, StackCards } from '../components/Blocks'
import { CONTACT, img, REELS, WORKSHOP } from '../data'
import { plain, useLang } from '../i18n'

const DIRECTIONS = [
  { eyebrow: 'nav.qur', title: 'qb.t', text: 'qb.p', image: img('img/wp/ig-318441970'), cta: 'cta.more', to: '/qurilish', tone: 'tone-cream' },
  { eyebrow: 'nav.cat', title: 'p1.h', text: 'p1.p', image: img('img/catalogo'), cta: 'cta.quote', to: '/katalog', tone: 'tone-navy' },
  { eyebrow: 'nav.kos', title: 'kb.k', text: 'kb.p', image: img('img/kosmetika-m'), cta: 'cta.more', to: '/kosmetika', tone: 'tone-cream' },
  { eyebrow: 'nav.gal', title: 'gl.t', text: 'gl.p', image: img('img/gallery'), cta: 'cta.gal', to: '/galereya', tone: 'tone-navy' },
  { eyebrow: 'p2.h', title: 'gc.k', text: 'p2.p', image: img('img/goldchef'), cta: 'cta.order', to: '/aloqa', tone: 'tone-cream' },
  { eyebrow: 'vt.k', title: 'vt.t', text: 'vt.p', image: img('img/vetrina'), cta: 'ig.cta', href: CONTACT.instagram, tone: 'tone-navy' },
]

export default function Home() {
  const { t } = useLang()
  return (
    <>
      <HeroSlider>
        <Blur as="p" immediate className="eyebrow mb-6 !text-gold-lt">
          {plain(t('top.l'))}
        </Blur>
        <Blur as="h1" by="words" immediate delay={0.2} className="didone max-w-[19ch] text-[10vw] leading-[1.04] md:text-[4.9vw]" html={t('h.h1')} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Lines immediate delay={0.7} className="max-w-md leading-relaxed text-paper/80" html={t('h.sub')} />
          <div className="flex flex-wrap items-center gap-6">
            <TLink to="/katalog" className="gold-leaf meta rounded-full px-7 py-4 !text-navy transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-105" data-cursor="link">
              {t('cta.cat')}
            </TLink>
            <TLink to="/qurilish" className="meta uline !text-paper" data-cursor="link">
              {plain(t('qb.k'))} →
            </TLink>
          </div>
        </div>
      </HeroSlider>

      {/* heritage statement */}
      <section className="px-5 pb-16 pt-28 text-center md:px-10 md:pt-40">
        <Blur as="p" className="eyebrow mb-10">{plain(t('ab.eye'))}</Blur>
        <Blur as="h2" by="chars" className="didone mx-auto max-w-4xl text-6xl italic md:text-[6.2vw]" html={t('ab.h')} />
        <ScrubBlur className="didone mx-auto mt-14 max-w-4xl text-[1.6rem] leading-[1.35] text-ink/90 md:text-[2.3rem]" html={t('ab.p1')} />
      </section>

      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="grid items-end gap-14 md:grid-cols-12">
          <Arch src={img('img/wp/ig-321844381')} alt="Giusto Manetti Firenze" className="aspect-[3/4] w-full md:col-span-4" />
          <div className="md:col-span-4 md:col-start-6">
            <Arch src={img('img/foto/varaq-ranglari')} shape="pill" className="aspect-[4/5] w-full" />
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <Lines className="leading-relaxed text-mute" html={t('ab.p2')} />
          </div>
        </div>
        <div className="mt-24">
          <Blur as="p" className="eyebrow mb-8">{t('stats.label')}</Blur>
          <Odometer />
        </div>
      </section>

      <StackCards items={DIRECTIONS} />

      {/* instagram film strip */}
      <section className="py-28 md:py-40">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 px-5 md:px-10">
          <div>
            <Blur as="p" className="eyebrow mb-6">{plain(t('ig.eye'))}</Blur>
            <Blur as="h2" by="chars" className="didone text-6xl md:text-[5.4vw]" html={t('ig.h')} />
          </div>
          <div className="max-w-sm">
            <Lines className="leading-relaxed text-mute" html={t('ig.p')} />
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="uline mt-5 inline-block font-display text-xl italic text-gold">
              {t('ig.cta')} ↗
            </a>
          </div>
        </div>
        <DragStrip items={REELS} />
      </section>

      {/* workshop */}
      <section className="tone-cream px-5 py-28 md:px-10 md:py-40">
        <div className="text-center">
          <Blur as="p" className="eyebrow mb-6">{t('work.label')}</Blur>
          <Blur as="h2" by="chars" className="didone text-6xl italic md:text-[5.6vw]">
            {t('work.h')}
          </Blur>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {WORKSHOP.slice(0, 4).map((src, i) => (
            <Arch key={src} src={src} shape={i % 2 ? 'pill' : 'arch'} className={`aspect-[3/4] w-full ${i % 2 ? 'md:mt-24' : ''}`} />
          ))}
        </div>
        <div className="mt-24">
          <Marks />
        </div>
      </section>

      <CTA text="c.p" />
    </>
  )
}
