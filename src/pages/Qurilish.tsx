import { CardGrid, ContactCTA, Gallery, Lede, PageHero, Split } from '../components/Blocks'
import { Reveal } from '../components/Reveal'
import { QURILISH } from '../data'
import { plain, useLang } from '../i18n'

export default function Qurilish() {
  const { t } = useLang()
  return (
    <>
      <PageHero image={QURILISH.hero} eyebrow="q.eye" title="q.h" />
      <section className="tone-light panel px-5 py-24 md:px-10 md:py-32">
        <Lede k="q.p" />
        <CardGrid items={QURILISH.cards} />
      </section>
      <section className="px-5 py-24 md:px-10 md:py-32">
        <Reveal as="p" className="label mb-6">{`— ${plain(t('q.work'))}`}</Reveal>
        <Reveal as="h2" by="words" className="display text-6xl md:text-8xl" html={t('q.workh')} />
        <Reveal as="p" className="mb-16 mt-6 max-w-xl leading-relaxed text-ash" html={t('q.workp')} />
        <Gallery items={QURILISH.works} />
      </section>
      <section className="tone-light panel px-5 py-24 md:px-10 md:py-32">
        <Split image={QURILISH.split} eyebrow="q.why" title="q.whyh" paragraphs={['q.whyp1', 'q.whyp2']} />
      </section>
      <ContactCTA text="q.ask" />
    </>
  )
}
