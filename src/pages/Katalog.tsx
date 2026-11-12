import { CardGrid, CTA, PageHero } from '../components/Blocks'
import { KATALOG } from '../data'

export default function Katalog() {
  return (
    <>
      <PageHero image={KATALOG.hero} eyebrow="k.eye" title="k.h" lede="k.p" index="II" />
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <CardGrid items={KATALOG.groups} />
      </section>
      <CTA text="k.note" />
    </>
  )
}
