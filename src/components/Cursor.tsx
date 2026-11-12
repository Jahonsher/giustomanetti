import { useEffect, useRef } from 'react'
import { gsap, isTouch, reducedMotion } from '../lib/motion'
import { useLang } from '../i18n'

type Flake = { x: number; y: number; vx: number; vy: number; r: number; rot: number; vr: number; life: number; hue: number; w: number; h: number }

/**
 * Gilder's cursor: a small gold dot, and flakes of gold leaf that shed from
 * the pointer as it moves, tumbling and fading like leaf off a brush.
 * Over links/images the dot opens into a ring with an italic label.
 */
export function Cursor() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const { t } = useLang()
  const viewText = t('view')

  useEffect(() => {
    if (isTouch) return
    document.documentElement.classList.add('has-cursor')
    const c = canvas.current!
    const ctx = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    const resize = () => {
      c.width = window.innerWidth * dpr
      c.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const flakes: Flake[] = []
    let lx = 0
    let ly = 0
    let acc = 0
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' })
    let state = ''

    const move = (e: PointerEvent) => {
      xd(e.clientX)
      yd(e.clientY)
      xr(e.clientX)
      yr(e.clientY)
      // shed flakes proportional to distance travelled
      const dist = Math.hypot(e.clientX - lx, e.clientY - ly)
      lx = e.clientX
      ly = e.clientY
      acc += dist
      if (!reducedMotion)
        while (acc > 26 && flakes.length < 70) {
          acc -= 26
          const s = 2 + Math.random() * 5
          flakes.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.6,
            vy: Math.random() * 0.4,
            r: s,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.12,
            life: 1,
            hue: Math.random(),
            w: s * (0.6 + Math.random()),
            h: s * (0.4 + Math.random() * 0.8),
          })
        }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, input, textarea')
      const next = target ? (target.dataset.cursor ?? (target.matches('input, textarea') ? 'text' : 'link')) : ''
      if (next === state) return
      state = next
      const big = next !== '' && next !== 'link' && next !== 'text'
      if (big) label.current!.textContent = next === 'view' ? viewText : next
      gsap.to(ring.current, { width: big ? 92 : next === 'link' ? 44 : 0, height: big ? 92 : next === 'link' ? 44 : 0, opacity: next === '' || next === 'text' ? 0 : 1, duration: 0.6, ease: 'expo.out' })
      gsap.to(label.current, { autoAlpha: big ? 1 : 0, duration: 0.3 })
      gsap.to(dot.current, { scale: big ? 0 : 1, duration: 0.3 })
    }

    const tick = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, c.width, c.height)
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i]
        f.vy += 0.035 // gravity
        f.vx *= 0.985
        f.x += f.vx + Math.sin(f.rot * 2) * 0.35 // flutter
        f.y += f.vy
        f.rot += f.vr
        f.life -= 0.012
        if (f.life <= 0) {
          flakes.splice(i, 1)
          continue
        }
        ctx.save()
        ctx.translate(f.x, f.y)
        ctx.rotate(f.rot)
        ctx.scale(1, Math.cos(f.rot * 1.7)) // tumbling
        const g = ctx.createLinearGradient(-f.w, -f.h, f.w, f.h)
        const shine = 0.5 + 0.5 * Math.sin(f.rot * 3)
        g.addColorStop(0, `rgba(138,106,47,${f.life})`)
        g.addColorStop(0.5, `rgba(${230 + 25 * shine},${200 + 30 * shine},${130 + 60 * shine},${f.life})`)
        g.addColorStop(1, `rgba(179,138,69,${f.life})`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.moveTo(-f.w, -f.h * 0.6)
        ctx.lineTo(f.w * 0.8, -f.h)
        ctx.lineTo(f.w, f.h * 0.5)
        ctx.lineTo(-f.w * 0.6, f.h)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', move)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('resize', resize)
    }
  }, [viewText])

  if (isTouch) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[110]" aria-hidden>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div ref={dot} className="fixed left-0 top-0 -ml-[4px] -mt-[4px] h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(220,192,137,0.8)]" />
      <div ref={ring} className="fixed left-0 top-0 grid h-0 w-0 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/70 bg-paper/10 opacity-0 backdrop-blur-[2px]">
        <span ref={label} className="invisible font-display text-sm italic text-gold" />
      </div>
    </div>
  )
}
