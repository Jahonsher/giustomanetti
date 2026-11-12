import { useRef } from 'react'
import { asset } from '../data'
import { gsap, useGSAP, useReady, reducedMotion } from '../lib/motion'

type Props = {
  src: string
  alt?: string
  /** frame shape: Florentine arch, full round top, or plain */
  shape?: 'arch' | 'pill' | 'rect'
  className?: string
  parallax?: boolean
  eager?: boolean
  cursor?: string
}

/**
 * Photo in an arched frame. On entering the viewport a sheet of gold leaf
 * is laid over it and lifted away (like gilding), while the photo settles
 * from a slight zoom. Inside the frame the photo drifts with scroll.
 */
export function Arch({ src, alt = '', shape = 'arch', className = '', parallax = true, eager, cursor }: Props) {
  const root = useRef<HTMLElement>(null)
  const ready = useReady()
  const frame = shape === 'arch' ? 'arch' : shape === 'pill' ? 'arch-sm' : 'rounded-[6px]'

  useGSAP(
    () => {
      const el = root.current!
      const img = el.querySelector('[data-img]')
      const foil = el.querySelector('[data-foil]')
      const par = el.querySelector('[data-par]')
      if (reducedMotion) {
        gsap.set(foil, { autoAlpha: 0 })
        return
      }
      if (parallax) gsap.fromTo(par, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      if (!ready) return
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        .fromTo(foil, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.7, ease: 'power3.inOut' })
        .set(img, { autoAlpha: 1 })
        .to(foil, { scaleY: 0, transformOrigin: '50% 0%', duration: 1, ease: 'power3.inOut' })
        .fromTo(img, { scale: 1.28 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, '<')
    },
    { dependencies: [ready], scope: root },
  )

  return (
    <figure ref={root} className={`group relative isolate overflow-hidden ${frame} ${className}`} data-cursor={cursor}>
      <div data-par className="absolute inset-x-0 -inset-y-[8%]">
        <div className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.05]">
          <img
            data-img
            src={asset(src)}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={`h-full w-full object-cover ${reducedMotion ? '' : 'invisible'}`}
          />
        </div>
      </div>
      <span data-foil className="gold-leaf pointer-events-none absolute inset-0 z-[1] scale-y-0" aria-hidden />
    </figure>
  )
}
