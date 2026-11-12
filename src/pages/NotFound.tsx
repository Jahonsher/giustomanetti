import { HeroCanvas } from '../gl/HeroCanvas'
import { Reveal } from '../components/Reveal'
import { TLink } from '../components/Transition'
import { plain, useLang } from '../i18n'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="grain relative h-[100svh] overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <HeroCanvas />
      </div>
      <div className="relative flex h-full flex-col items-center justify-center gap-8 px-5 text-center">
        <Reveal as="p" by="chars" immediate className="display text-[30vw] leading-none md:text-[20vw]">
          404
        </Reveal>
        <Reveal as="p" immediate delay={0.3} className="display text-3xl italic md:text-5xl" html={t('nf.h')} />
        <p className="max-w-sm text-sm text-ash">{plain(t('nf.p'))}</p>
        <TLink to="/" className="glass-drop label rounded-full px-6 py-3.5 !text-bone" data-cursor="link">
          ← {t('nf.cta')}
        </TLink>
      </div>
    </section>
  )
}
