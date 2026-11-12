import { CTA, Gallery, PageHero } from '../components/Blocks'
import { GALEREYA } from '../data'

export default function Galereya() {
  return (
    <>
      <PageHero image={GALEREYA.hero} eyebrow="gl2.eye" title="gl2.h" lede="gl2.p" index="IV" />
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <Gallery items={GALEREYA.photos} />
      </section>
      <CTA text="c.p" />
    </>
  )
}
