import { useRef } from 'react'
import { TLink } from './Transition'
import { Reveal } from './Reveal'
import { Mark } from './Mark'
import { CONTACT, NAV } from '../data'
import { T, useLang } from '../i18n'
import { gsap, useGSAP, useReady, lenis, reducedMotion } from '../lib/motion'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useLang()
  const word = useRef<HTMLDivElement>(null)
  const ready = useReady()

  // giant wordmark rises letter by letter as the footer scrolls in
  useGSAP(
    () => {
      if (!ready || reducedMotion) return
      gsap.from(word.current!.querySelectorAll('span'), {
        yPercent: 100,
        ease: 'none',
        stagger: 0.04,
        scrollTrigger: { trigger: word.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    },
    { dependencies: [ready], scope: word },
  )

  return (
    <footer className="tone-char relative mt-2 overflow-hidden rounded-t-[28px] px-5 pt-20 md:mt-3 md:rounded-t-[44px] md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Mark size="lg" />
          <Reveal as="p" className="mt-6 max-w-sm text-sm leading-relaxed text-ash" html={t('ft.p')} />
        </div>
        <div className="md:col-span-2 md:col-start-6">
          <p className="label mb-5">{t('ft.prod')}</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <TLink to={n.to} className="link-line text-ash hover:text-bone">
                  {t(n.key)}
                </TLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="label mb-5">{t('ft.svc')}</p>
          <ul className="space-y-2 text-sm text-ash">
            <li>
              <TLink to="/aloqa" className="link-line text-sand">
                {t('cta.quote')} →
              </TLink>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="link-line text-bone">
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="link-line">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <T k="ci.addrv" />
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="label mb-5">{t('ft.soc')}</p>
          <ul className="space-y-2 text-sm">
            {[
              ['Instagram', CONTACT.instagram],
              ['Telegram', CONTACT.telegram],
              ['Facebook', CONTACT.facebook],
            ].map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noreferrer" className="link-line text-ash hover:text-bone">
                  {name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={word}
        className="display mt-20 flex select-none justify-between overflow-hidden bg-gradient-to-b from-[#e8c987] via-[#c39f5f] to-[#8c6a2f] bg-clip-text text-[21vw] leading-[0.8] tracking-[-0.04em] text-transparent"
        aria-hidden
      >
        {'manetti'.split('').map((ch, i) => (
          <span key={i} className="inline-block bg-gradient-to-b from-[#ecd08f] via-[#c39f5f] to-[#8c6a2f] bg-clip-text">
            {ch}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-mute">
        <span>
          © {YEAR} Giusto Manetti Battiloro Uzbekistan. {t('ft.rights')}. · {t('ft.made')}
        </span>
        <button onClick={() => lenis?.scrollTo(0, { duration: 2 })} className="label link-line">
          {t('top')} ↑
        </button>
      </div>
    </footer>
  )
}
