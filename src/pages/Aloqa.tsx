import { PageHero } from '../components/Blocks'
import { ContactForm } from '../components/ContactForm'
import { Blur, FadeUp } from '../components/Reveal'
import { ALOQA, CONTACT } from '../data'
import { plain, T, useLang } from '../i18n'

export default function Aloqa() {
  const { t } = useLang()
  const rows = [
    { k: 'ci.addr', body: <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="uline" dangerouslySetInnerHTML={{ __html: t('ci.addrv') }} /> },
    {
      k: 'ci.tel',
      body: (
        <span className="flex flex-col">
          {CONTACT.phones.map((p) => (
            <a key={p.href} href={p.href} className="uline w-fit">
              {p.label}
            </a>
          ))}
        </span>
      ),
    },
    { k: 'ci.mail', body: <a href={`mailto:${CONTACT.email}`} className="uline break-all">{CONTACT.email}</a> },
    { k: 'ci.hours', body: <T k="ci.hoursv" /> },
  ]
  return (
    <>
      <PageHero image={ALOQA.hero} eyebrow="c.eye" title="c.h" lede="c.p" index="V" />
      <section className="tone-cream px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <Blur as="h2" by="chars" className="didone mb-14 text-5xl italic md:text-7xl">
              {plain(t('c.fh'))}
            </Blur>
            <FadeUp>
              <ContactForm />
            </FadeUp>
          </div>
          <div className="space-y-10 md:col-span-4 md:col-start-9">
            {rows.map((r, i) => (
              <FadeUp key={r.k} delay={i * 0.08} className="border-t border-line pt-5">
                <p className="eyebrow mb-3">{plain(t(r.k))}</p>
                <div className="font-display text-2xl leading-snug">{r.body}</div>
              </FadeUp>
            ))}
            <FadeUp delay={0.3} className="border-t border-line pt-5">
              <p className="eyebrow mb-3">{plain(t('ft.soc'))}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-display text-2xl italic">
                <a href={CONTACT.telegram} target="_blank" rel="noreferrer" className="uline">Telegram</a>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="uline">Instagram</a>
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="uline">Facebook</a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
      <FadeUp className="px-5 py-24 md:px-10">
        <div className="arch-sm relative aspect-[4/3] overflow-hidden md:aspect-[21/8]">
          <iframe
            title="Giusto Manetti Uzbekistan"
            src={CONTACT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(0.7)_sepia(0.35)_contrast(1.05)]"
          />
        </div>
        <p className="mt-8 flex justify-center gap-10">
          <a href={CONTACT.yandex} target="_blank" rel="noreferrer" className="uline font-display text-xl italic">Yandex Maps</a>
          <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="uline font-display text-xl italic">Google Maps</a>
        </p>
      </FadeUp>
    </>
  )
}
