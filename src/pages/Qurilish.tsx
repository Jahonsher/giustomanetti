import { CardGrid, CTA, Gallery, PageHero, Split } from '../components/Blocks'
import { Blur, Lines } from '../components/Reveal'
import { QURILISH } from '../data'
import { plain, useLang } from '../i18n'

export default function Qurilish() {
  const { t } = useLang()
  return (
    <>
      <PageHero image={QURILISH.hero} eyebrow="q.eye" title="q.h" lede="q.p" index="I" />
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <CardGrid items={QURILISH.cards} />
      </section>
      <section className="tone-cream px-5 py-28 md:px-10 md:py-36">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Blur as="p" className="eyebrow mb-6">{plain(t('q.work'))}</Blur>
            <Blur as="h2" by="chars" className="didone text-6xl md:text-[5.4vw]" html={t('q.workh')} />
          </div>
          <Lines className="self-end leading-relaxed text-mute md:col-span-4 md:col-start-9" html={t('q.workp')} />
        </div>
        <Gallery items={QURILISH.works} />
      </section>
      <section className="px-5 py-28 md:px-10 md:py-40">
        <Split image={QURILISH.split} eyebrow="q.why" title="q.whyh" paragraphs={['q.whyp1', 'q.whyp2']} />
      </section>
      <CTA text="q.ask" />
    </>
  )
}
