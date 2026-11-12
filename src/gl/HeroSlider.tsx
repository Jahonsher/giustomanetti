import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { asset, HERO_SLIDES, pad } from '../data'
import { plain, useLang } from '../i18n'
import { gsap, reducedMotion, useReady } from '../lib/motion'

/**
 * Full-screen WebGL slideshow. Slides change along a noisy diagonal seam
 * that glows like a fresh edge of gold leaf; both photos ripple near the
 * seam, each slide slowly zooms (Ken Burns) and drifts with the pointer.
 */
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex0;
  uniform sampler2D uTex1;
  uniform vec2 uImg0;
  uniform vec2 uImg1;
  uniform vec2 uPlane;
  uniform float uProgress;
  uniform float uZoom0;
  uniform float uZoom1;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntro;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

  vec2 cover(vec2 uv, vec2 img, float zoom) {
    float rp = uPlane.x / uPlane.y;
    float ri = img.x / img.y;
    vec2 s = rp < ri ? vec2(rp / ri, 1.0) : vec2(1.0, ri / rp);
    return (uv - 0.5) * s / zoom + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    vec2 m = (uMouse - 0.5) * 0.018;
    float n = fbm(uv * vec2(3.0, 2.0) + uTime * 0.04);

    // diagonal seam with a torn, leaf-like edge
    float diag = uv.x * 0.62 + (1.0 - uv.y) * 0.38;
    float t = uProgress * 1.7 - 0.35;
    float keep = smoothstep(t - 0.05, t + 0.05, diag + (n - 0.5) * 0.5);   // 1 = old slide
    float band = 1.0 - abs(keep * 2.0 - 1.0);                              // peaks on the seam

    vec2 ripple = vec2(n - 0.5, fbm(uv * 4.0 - uTime * 0.05) - 0.5) * band * 0.09;
    vec3 a = texture2D(uTex0, cover(uv + m + ripple, uImg0, uZoom0)).rgb;
    vec3 b = texture2D(uTex1, cover(uv + m - ripple, uImg1, uZoom1)).rgb;
    vec3 col = mix(b, a, keep);

    // fresh gold along the seam
    float live = step(0.001, uProgress) * step(uProgress, 0.999);
    vec3 gold = mix(vec3(0.62, 0.45, 0.18), vec3(1.0, 0.9, 0.62), noise(uv * 40.0 + uTime));
    col = mix(col, gold, pow(band, 4.0) * 0.85 * live);

    // legibility: gentle vignette and darkening
    float v = smoothstep(1.15, 0.25, length((uv - vec2(0.45, 0.5)) * vec2(1.1, 1.0)));
    col *= mix(0.42, 0.85, v);
    col = mix(vec3(0.03, 0.04, 0.09), col, uIntro);
    gl_FragColor = vec4(col, 1.0);
  }
`

const DURATION = 7

export function HeroSlider({ children }: { children?: React.ReactNode }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const ready = useReady()
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const api = useRef<{ goTo: (i: number) => void } | null>(null)
  const bars = useRef<HTMLDivElement>(null)
  const N = HERO_SLIDES.length

  useEffect(() => {
    const el = canvas.current!
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false })
    } catch {
      el.style.display = 'none'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    const u = {
      uTex0: { value: null as THREE.Texture | null },
      uTex1: { value: null as THREE.Texture | null },
      uImg0: { value: new THREE.Vector2(1, 1) },
      uImg1: { value: new THREE.Vector2(1, 1) },
      uPlane: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 0 },
      uZoom0: { value: 1.12 },
      uZoom1: { value: 1.12 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntro: { value: 0 },
    }
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: u }))
    scene.add(mesh)

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height, false)
      u.uPlane.value.set(width, height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const loader = new THREE.TextureLoader()
    const textures: THREE.Texture[] = []
    const size = (tex: THREE.Texture) => {
      const im = tex.image as { width: number; height: number }
      return new THREE.Vector2(im.width, im.height)
    }
    let current = 0
    let busy = false
    let timer: gsap.core.Tween | null = null
    const progress = { v: 0 }

    const schedule = () => {
      timer?.kill()
      progress.v = 0
      timer = gsap.to(progress, {
        v: 1,
        duration: DURATION,
        ease: 'none',
        onUpdate: () => {
          const segs = bars.current?.querySelectorAll<HTMLElement>('[data-seg]')
          segs?.forEach((s, i) => (s.style.transform = `scaleX(${i < current ? 1 : i === current ? progress.v : 0})`))
        },
        onComplete: () => goTo((current + 1) % N),
      })
    }

    const goTo = (next: number) => {
      if (busy || next === current || !textures[next]) return
      busy = true
      u.uTex1.value = textures[next]
      u.uImg1.value = size(textures[next])
      u.uZoom1.value = 1.18
      setIndex(next)
      gsap
        .timeline({
          onComplete: () => {
            u.uTex0.value = textures[next]
            u.uImg0.value = u.uImg1.value.clone()
            u.uZoom0.value = u.uZoom1.value
            u.uProgress.value = 0
            current = next
            busy = false
            gsap.to(u.uZoom0, { value: 1.0, duration: DURATION + 2, ease: 'none' })
            schedule()
          },
        })
        .to(u.uProgress, { value: 1, duration: reducedMotion ? 0.01 : 1.9, ease: 'power2.inOut' })
        .to(u.uZoom1, { value: 1.08, duration: 1.9, ease: 'power2.out' }, 0)
    }
    api.current = { goTo }

    Promise.all(HERO_SLIDES.map((s) => loader.loadAsync(asset(s.image)))).then((list) => {
      list.forEach((tex) => {
        tex.minFilter = THREE.LinearFilter
        tex.generateMipmaps = false
        textures.push(tex)
      })
      u.uTex0.value = textures[0]
      u.uImg0.value = size(textures[0])
      u.uTex1.value = textures[0]
      u.uImg1.value = size(textures[0])
      gsap.to(u.uZoom0, { value: 1.0, duration: DURATION + 2, ease: 'none' })
      schedule()
    })

    const target = new THREE.Vector2(0.5, 0.5)
    const onMove = (e: PointerEvent) => target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) timer?.resume()
      else timer?.pause()
    })
    io.observe(el)

    const tick = (time: number) => {
      if (!visible || !u.uTex0.value) return
      u.uTime.value = time
      u.uMouse.value.lerp(target, 0.05)
      renderer.render(scene, camera)
    }
    gsap.ticker.add(tick)
    ;(el as HTMLCanvasElement & { __intro?: { value: number } }).__intro = u.uIntro

    return () => {
      gsap.ticker.remove(tick)
      timer?.kill()
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
      io.disconnect()
      textures.forEach((x) => x.dispose())
      mesh.geometry.dispose()
      mesh.material.dispose()
      renderer.dispose()
      api.current = null
    }
  }, [N])

  // fade the picture in once the preloader lifts
  useEffect(() => {
    const intro = (canvas.current as (HTMLCanvasElement & { __intro?: { value: number } }) | null)?.__intro
    if (ready && intro) gsap.to(intro, { value: 1, duration: 2.4, ease: 'power2.out' })
  }, [ready])

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#070a14] text-paper">
      <canvas ref={canvas} className="absolute inset-0 block h-full w-full" aria-hidden />
      <div className="relative flex h-full flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-10">
        {children}
        <div className="mt-12 grid items-end gap-6 border-t border-paper/20 pt-6 md:grid-cols-[auto_1fr_auto]">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-3xl italic text-gold-lt">{pad(index + 1)}</span>
            <span className="meta !text-paper/60">/ {pad(N)}</span>
            <span key={index} className="meta ml-4 animate-[fadein_1s_ease] !text-paper">
              {plain(t(HERO_SLIDES[index].caption))}
            </span>
          </div>
          <div ref={bars} className="hidden gap-2 md:flex">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => api.current?.goTo(i)} className="group h-6 flex-1 py-[11px]" aria-label={`${i + 1}`} data-cursor="link">
                <span className="block h-px w-full bg-paper/25">
                  <span data-seg className="block h-full w-full origin-left scale-x-0 bg-gold-lt" />
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => api.current?.goTo((index + d + N) % N)}
                className="grid h-12 w-12 place-items-center rounded-full border border-paper/40 transition-colors duration-500 hover:border-gold-lt hover:bg-gold-lt hover:text-navy"
                aria-label={d < 0 ? 'Prev' : 'Next'}
                data-cursor="link"
              >
                {d < 0 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
