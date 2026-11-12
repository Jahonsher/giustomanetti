import { PageHero } from '../components/Blocks'
import { ContactForm } from '../components/ContactForm'
import { FadeUp, Reveal } from '../components/Reveal'
import { ALOQA, CONTACT } from '../data'
import { plain, T, useLang } from '../i18n'

export default function Aloqa() {
  const { t } = useLang()
  const rows = [
    { k: 'ci.addr', body: <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="link-line" dangerouslySetInnerHTML={{ __html: t('ci.addrv') }} /> },
    {
      k: 'ci.tel',
      body: (
        <span className="flex flex-col">
          {CONTACT.phones.map((p) => (
            <a key={p.href} href={p.href} className="link-line w-fit">
              {p.label}
            </a>
          ))}
        </span>
      ),
    },
    { k: 'ci.mail', body: <a href={`mailto:${CONTACT.email}`} className="link-line break-all">{CONTACT.email}</a> },
    { k: 'ci.hours', body: <T k="ci.hoursv" /> },
  ]
  return (
    <>
      <PageHero image={ALOQA.hero} eyebrow="c.eye" title="c.h" />
      <section className="tone-light panel px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal as="h2" by="words" className="display mb-4 text-5xl md:text-7xl">
              {plain(t('c.fh'))}
            </Reveal>
            <Reveal as="p" className="mb-12 max-w-xl leading-relaxed text-ash" html={t('c.p')} />
            <FadeUp>
              <ContactForm />
            </FadeUp>
          </div>
          <div className="space-y-10 md:col-span-4 md:col-start-9">
            {rows.map((r, i) => (
              <FadeUp key={r.k} delay={i * 0.08} className="border-t border-line pt-5">
                <p className="label mb-3">{plain(t(r.k))}</p>
                <div className="display text-3xl leading-snug">{r.body}</div>
              </FadeUp>
            ))}
            <FadeUp delay={0.3} className="border-t border-line pt-5">
              <p className="label mb-3">{plain(t('ft.soc'))}</p>
              <div className="display flex flex-wrap gap-x-6 gap-y-2 text-3xl">
                <a href={CONTACT.telegram} target="_blank" rel="noreferrer" className="link-line">Telegram ↗</a>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram ↗</a>
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="link-line">Facebook ↗</a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <FadeUp className="px-5 py-24 md:px-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line md:aspect-[21/9]">
          <iframe
            title="Giusto Manetti Uzbekistan"
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(0.6)_sepia(0.25)_contrast(1.05)]"
          />
        </div>
        <p className="mt-6 flex gap-8">
          <a href={CONTACT.yandex} target="_blank" rel="noreferrer" className="label link-line !text-bone">Yandex Maps ↗</a>
          <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="label link-line !text-bone">Google Maps ↗</a>
        </p>
      </FadeUp>
    </>
  )
}
