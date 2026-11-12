import { ContactCTA, Gallery, Lede, PageHero } from '../components/Blocks'
import { Reveal } from '../components/Reveal'
import { GALEREYA, pad } from '../data'
import { useLang } from '../i18n'

export default function Galereya() {
  const { t } = useLang()
  return (
    <>
      <PageHero image={GALEREYA.hero} eyebrow="gl2.eye" title="gl2.h" />
      <section className="tone-light panel px-5 py-24 md:px-10 md:py-32">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Lede k="gl2.p" />
          <Reveal as="p" className="label">{`${pad(GALEREYA.photos.length)} ${t('photos')}`}</Reveal>
        </div>
        <Gallery items={GALEREYA.photos} />
      </section>
      <ContactCTA text="c.p" />
    </>
  )
}
