import { createContext, useCallback, useContext, useEffect, useRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react'
import { useHref, useLocation, useNavigate } from 'react-router'
import { gsap, ScrollTrigger, nextFrame, scrollToTop, setReady, reducedMotion } from '../lib/motion'
import { Mark } from './Mark'

type Ctx = { go: (to: string) => void; run: (fn: () => void) => Promise<void> }
const TransitionContext = createContext<Ctx | null>(null)

/**
 * Page transition: a slanted sheet of gold leaf sweeps across the screen,
 * the wordmark surfaces from a blur, the route changes underneath and the
 * sheet carries on off the other side.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const sheet = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const internalNav = useRef(false)

  const cover = useCallback(() => {
    const el = sheet.current!
    return new Promise<void>((resolve) => {
      gsap
        .timeline({ onComplete: resolve })
        .set(el, { autoAlpha: 1, xPercent: -135 })
        .to(el, { xPercent: 0, duration: reducedMotion ? 0.01 : 1, ease: 'power3.inOut' })
        .fromTo(el.querySelector('[data-mark]'), { opacity: 0, filter: 'blur(12px)', scale: 0.96 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.35')
    })
  }, [])

  const uncover = useCallback(() => {
    const el = sheet.current!
    gsap
      .timeline({ onComplete: () => void gsap.set(el, { autoAlpha: 0 }) })
      .to(el.querySelector('[data-mark]'), { opacity: 0, filter: 'blur(10px)', duration: 0.4, ease: 'power2.in' })
      .call(() => setReady(true))
      .to(el, { xPercent: 135, duration: reducedMotion ? 0.01 : 1.1, ease: 'power3.inOut' }, '-=0.1')
  }, [])

  const run = useCallback(
    async (fn: () => void) => {
      if (busy.current) return
      busy.current = true
      setReady(false)
      await cover()
      internalNav.current = true
      fn()
      await nextFrame()
      await nextFrame()
      scrollToTop()
      ScrollTrigger.refresh()
      await new Promise((r) => setTimeout(r, 140))
      internalNav.current = false
      uncover()
      busy.current = false
    },
    [cover, uncover],
  )

  const go = useCallback(
    (to: string) => {
      if (to === location.pathname + location.search) {
        scrollToTop(false)
        return
      }
      void run(() => navigate(to))
    },
    [location, navigate, run],
  )

  useEffect(() => {
    if (internalNav.current) return
    scrollToTop()
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])

  return (
    <TransitionContext.Provider value={{ go, run }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden>
        <div ref={sheet} className="gold-leaf invisible absolute -inset-y-[10%] -left-[25%] w-[150%] -skew-x-[14deg]">
          <div className="absolute inset-0 grid skew-x-[14deg] place-items-center">
            <div data-mark className="text-navy">
              <Mark size="xl" />
            </div>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useTransition outside provider')
  return ctx
}

/** <a> that navigates through the page transition. */
export function TLink({
  to,
  children,
  onClick,
  ...rest
}: { to: string; children: ReactNode; ref?: Ref<HTMLAnchorElement> } & AnchorHTMLAttributes<HTMLAnchorElement> & Record<`data-${string}`, unknown>) {
  const href = useHref(to)
  const { go } = useTransition()
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    go(to)
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
