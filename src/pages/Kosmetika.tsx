import { CardGrid, ContactCTA, Lede, PageHero, Split } from '../components/Blocks'
import { KOSMETIKA } from '../data'

export default function Kosmetika() {
  return (
    <>
      <PageHero image={KOSMETIKA.hero} eyebrow="k2.eye" title="k2.h" />
      <section className="tone-light panel px-5 py-24 md:px-10 md:py-32">
        <Lede k="k2.p" />
        <CardGrid items={KOSMETIKA.cards} />
      </section>
      <section className="px-5 py-24 md:px-10 md:py-32">
        <Split reverse image={KOSMETIKA.split} eyebrow="k2.why" title="k2.whyh" paragraphs={['k2.whyp1', 'k2.whyp2']} />
      </section>
      <ContactCTA text="k2.ask" />
    </>
  )
}
