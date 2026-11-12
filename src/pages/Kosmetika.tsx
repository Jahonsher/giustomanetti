import { CardGrid, CTA, PageHero, Split } from '../components/Blocks'
import { KOSMETIKA, img } from '../data'

export default function Kosmetika() {
  return (
    <>
      <PageHero image={img('img/kosmetika-m')} eyebrow="k2.eye" title="k2.h" lede="k2.p" index="III" />
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <CardGrid items={KOSMETIKA.cards} />
      </section>
      <section className="tone-cream px-5 py-28 md:px-10 md:py-40">
        <Split reverse image={KOSMETIKA.split} eyebrow="k2.why" title="k2.whyh" paragraphs={['k2.whyp1', 'k2.whyp2']} />
      </section>
      <CTA text="k2.ask" />
    </>
  )
}
