import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP, useReady, reducedMotion } from '../lib/motion'

type Props = {
  as?: ElementType
  children?: ReactNode
  /** text that may contain <br>/<a> from texts.ts */
  html?: string
  className?: string
  by?: 'chars' | 'words'
  delay?: number
  stagger?: number
  /** play right away (above the fold) instead of on scroll */
  immediate?: boolean
  start?: string
}

/**
 * Letters / words resolve out of a soft blur, lifting slightly into place
 * (the "Dolsten" blur reveal).
 */
export function Blur({ as: Tag = 'div', children, html, className = '', by = 'words', delay = 0, stagger, immediate, start = 'top 88%' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      const el = ref.current
      if (!el || !ready) return
      gsap.set(el, { autoAlpha: 1 })
      if (reducedMotion) return
      const split = SplitText.create(el, {
        type: by === 'chars' ? 'words,chars' : 'words',
        autoSplit: true,
        onSplit(self) {
          const targets = by === 'chars' ? self.chars : self.words
          return gsap.from(targets, {
            opacity: 0,
            filter: 'blur(14px)',
            yPercent: by === 'chars' ? 35 : 22,
            duration: by === 'chars' ? 1.5 : 1.6,
            ease: 'power3.out',
            stagger: stagger ?? (by === 'chars' ? 0.035 : 0.06),
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
          })
        },
      })
      return () => split.revert()
    },
    { dependencies: [ready], scope: ref },
  )
  if (html !== undefined) return <Tag ref={ref} className={`invisible ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  return (
    <Tag ref={ref} className={`invisible ${className}`}>
      {children}
    </Tag>
  )
}

/** Body copy: lines rise out of hairline masks. */
export function Lines({ as: Tag = 'p', children, html, className = '', delay = 0, start = 'top 90%' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      const el = ref.current
      if (!el || !ready) return
      gsap.set(el, { autoAlpha: 1 })
      if (reducedMotion) return
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, { yPercent: 105, opacity: 0, duration: 1.4, ease: 'power4.out', stagger: 0.08, delay, scrollTrigger: { trigger: el, start, once: true } })
        },
      })
      return () => split.revert()
    },
    { dependencies: [ready], scope: ref },
  )
  if (html !== undefined) return <Tag ref={ref} className={`invisible ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  return (
    <Tag ref={ref} className={`invisible ${className}`}>
      {children}
    </Tag>
  )
}

/** Statement paragraph: each word sharpens from blur as you scroll through it. */
export function ScrubBlur({ as: Tag = 'p', html, children, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      const el = ref.current
      if (!el || !ready || reducedMotion) return
      const split = SplitText.create(el, {
        type: 'words',
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.08, filter: 'blur(6px)' },
            { opacity: 1, filter: 'blur(0px)', stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true } },
          )
        },
      })
      return () => split.revert()
    },
    { dependencies: [ready], scope: ref },
  )
  if (html !== undefined) return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Non-text blocks: fade and rise. */
export function FadeUp({ children, className = '', delay = 0, y = 50 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const ready = useReady()
  useGSAP(
    () => {
      if (!ref.current || !ready) return
      gsap.set(ref.current, { autoAlpha: 1 })
      if (reducedMotion) return
      gsap.from(ref.current, { y, autoAlpha: 0, duration: 1.6, delay, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } })
    },
    { dependencies: [ready], scope: ref },
  )
  return (
    <div ref={ref} className={`invisible ${className}`}>
      {children}
    </div>
  )
}
