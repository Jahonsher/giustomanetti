import { useRef, useState } from 'react'
import { asset, HERO_SLIDES } from '../data'
import { gsap, useGSAP, setReady, reducedMotion } from '../lib/motion'
import { Mark } from './Mark'

const YEAR = new Date().getFullYear()
const preload = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = asset(src)
  })

/** Years count from 1600 to today while fonts and hero photos load. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const el = root.current!
      const year = el.querySelector('[data-year]')!
      const bar = el.querySelector('[data-bar]')
      let loaded = 0
      const jobs = [document.fonts.ready.then(() => undefined), ...HERO_SLIDES.map((s) => preload(s.image))]
      jobs.forEach((j) => j.then(() => loaded++))

      gsap.from(el.querySelector('[data-mark]'), { opacity: 0, filter: 'blur(16px)', y: 12, duration: 1.4, ease: 'power3.out' })
      const p = { v: 0 }
      const chase = gsap.to(p, {
        v: 1,
        duration: reducedMotion ? 0.2 : 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.min(p.v, (loaded + 1) / (jobs.length + 1))
          year.textContent = String(Math.round(1600 + v * (YEAR - 1600)))
          gsap.set(bar, { scaleX: v })
        },
      })
      Promise.all([Promise.all(jobs), chase.then()]).then(() => {
        year.textContent = String(YEAR)
        gsap
          .timeline({ onComplete: () => setDone(true) })
          .set(bar, { scaleX: 1 })
          .to(el.querySelectorAll('[data-out]'), { opacity: 0, filter: 'blur(10px)', duration: 0.6, ease: 'power2.in', stagger: 0.05 })
          .call(() => setReady(true))
          .to(el, { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '-=0.15')
      })
    },
    { scope: root },
  )

  if (done) return null
  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-paper text-ink">
      <div data-out data-mark>
        <Mark size="xl" />
      </div>
      <div data-out className="flex w-[min(420px,70vw)] flex-col items-center gap-4">
        <div className="flex w-full justify-between font-display text-sm italic text-mute">
          <span>1600</span>
          <span data-year className="gold-text text-2xl not-italic tabular-nums">1600</span>
          <span>{YEAR}</span>
        </div>
        <div className="h-px w-full bg-line">
          <div data-bar className="h-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </div>
  )
}
