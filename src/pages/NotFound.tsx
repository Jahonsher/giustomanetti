import { Blur, Lines } from '../components/Reveal'
import { TLink } from '../components/Transition'
import { useLang } from '../i18n'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gap-8 px-5 text-center">
      <Blur as="p" by="chars" immediate className="didone gold-text text-[32vw] leading-none md:text-[22vw]">
        404
      </Blur>
      <Blur as="h1" immediate delay={0.3} className="didone text-4xl italic md:text-6xl" html={t('nf.h')} />
      <Lines immediate delay={0.5} className="max-w-sm text-mute" html={t('nf.p')} />
      <TLink to="/" className="gold-leaf meta rounded-full px-7 py-4 !text-navy" data-cursor="link">
        ← {t('nf.cta')}
      </TLink>
    </section>
  )
}
