import { TLink } from './Transition'
import { Blur, Lines } from './Reveal'
import { CONTACT, NAV } from '../data'
import { plain, T, useLang } from '../i18n'
import { lenis } from '../lib/motion'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="tone-cream relative overflow-hidden px-5 pt-24 md:px-10 md:pt-32">
      <div className="text-center">
        <Blur as="p" className="eyebrow mb-8">{t('ft.made')}</Blur>
        <Blur as="p" by="chars" className="didone gold-text text-[13vw] uppercase leading-[0.9] tracking-[0.04em] md:text-[9.5vw]">
          Giusto Manetti
        </Blur>
        <Lines className="mx-auto mt-10 max-w-xl leading-relaxed text-mute" html={t('ft.p')} />
      </div>

      <div className="mt-20 grid gap-12 border-t border-line pt-14 md:grid-cols-4">
        <div>
          <p className="eyebrow mb-5">{t('ft.prod')}</p>
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <TLink to={n.to} className="uline font-display text-lg">
                  {plain(t(n.key))}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">{t('ft.svc')}</p>
          <ul className="space-y-2 text-mute">
            <li>
              <TLink to="/aloqa" className="uline font-display text-lg italic text-gold">
                {t('cta.quote')} →
              </TLink>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="uline text-ink">
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="uline">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-mute">
          <p className="eyebrow mb-5">{plain(t('ci.addr'))}</p>
          <T as="p" k="ci.addrv" className="text-ink" />
          <T as="p" k="ci.hoursv" className="mt-4 text-sm" />
        </div>
        <div>
          <p className="eyebrow mb-5">{t('ft.soc')}</p>
          <ul className="space-y-2">
            {[
              ['Instagram', CONTACT.instagram],
              ['Telegram', CONTACT.telegram],
              ['Facebook', CONTACT.facebook],
            ].map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noreferrer" className="uline font-display text-lg italic">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-mute">
        <span>
          © {YEAR} Giusto Manetti Battiloro Uzbekistan. {t('ft.rights')}.
        </span>
        <button onClick={() => lenis?.scrollTo(0, { duration: 2.2 })} className="meta uline">
          {t('top')} ↑
        </button>
      </div>
    </footer>
  )
}
