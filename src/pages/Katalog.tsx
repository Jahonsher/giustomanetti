import { CardGrid, ContactCTA, Lede, PageHero } from '../components/Blocks'
import { KATALOG } from '../data'

export default function Katalog() {
  return (
    <>
      <PageHero image={KATALOG.hero} eyebrow="k.eye" title="k.h" />
      <section className="tone-light panel px-5 py-24 md:px-10 md:py-32">
        <Lede k="k.p" />
        <CardGrid items={KATALOG.groups} />
      </section>
      <ContactCTA text="k.note" />
    </>
  )
}
