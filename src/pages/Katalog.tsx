import { useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { CardGrid, CTA, PageHero } from '../components/Blocks'
import { CatalogShelf, CatalogViewer, ProductGrid } from '../components/Catalog'
import { Blur, Lines } from '../components/Reveal'
import { CATALOGS, KATALOG } from '../data'
import { plain, useLang } from '../i18n'

/** Section opening: eyebrow + Didone title on the left, a short lede on the right. */
function Head({ eye, h, p }: { eye: string; h: string; p: string }) {
  const { t } = useLang()
  return (
    <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
      <div className="md:col-span-7">
        <Blur as="p" className="eyebrow mb-6">{plain(t(eye))}</Blur>
        <Blur as="h2" by="chars" className="didone text-6xl md:text-[5.4vw]" html={t(h)} />
      </div>
      <Lines className="self-end leading-relaxed text-mute md:col-span-4 md:col-start-9" html={t(p)} />
    </div>
  )
}

export default function Katalog() {
  // the open catalogue lives in the URL (?catalog=…&page=…): shareable, and "back" closes it
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const open = CATALOGS.find((c) => c.id === params.get('catalog'))
  const start = Number(params.get('page')) || 1

  const show = useCallback(
    (id: string, page: number) => setParams({ catalog: id, page: String(page) }, { state: { viewer: true }, preventScrollReset: true }),
    [setParams],
  )
  const onPage = useCallback(
    (page: number) => {
      if (open) setParams({ catalog: open.id, page: String(page) }, { replace: true, state: location.state, preventScrollReset: true })
    },
    [open, setParams, location.state],
  )
  const close = useCallback(() => {
    if ((location.state as { viewer?: boolean } | null)?.viewer) navigate(-1)
    else setParams({}, { replace: true, preventScrollReset: true })
  }, [location.state, navigate, setParams])

  return (
    <>
      <PageHero image={KATALOG.hero} eyebrow="k.eye" title="k.h" lede="k.p" index="II" />

      <section className="tone-cream px-5 py-28 md:px-10 md:py-36">
        <Head eye="cat.eye" h="cat.h" p="cat.p" />
        <CatalogShelf onOpen={show} />
      </section>

      <section className="px-5 py-28 md:px-10 md:py-40">
        <Head eye="k.sec.eye" h="k.sec.h" p="k.sec.p" />
        <CardGrid items={KATALOG.groups} />
      </section>

      <section className="tone-cream px-5 py-28 md:px-10 md:py-36">
        <Head eye="pr.eye" h="pr.h" p="pr.p" />
        <ProductGrid items={KATALOG.products} onOpen={show} />
      </section>

      <CTA text="k.note" />

      {open && <CatalogViewer key={open.id} catalog={open} start={start} onClose={close} onPage={onPage} />}
    </>
  )
}
