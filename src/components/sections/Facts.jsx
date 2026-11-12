/* Raqamlar: ekranga kirganda 0 dan sanab chiqadi ("400+", "15"...). */
import { useEffect, useRef, useState } from 'react';
import { T } from '@/i18n';
import { prefersReducedMotion } from '@/lib/env';

const ease = (p) => 1 - Math.pow(1 - p, 3);

function useCountUp(ref) {
  const [p, setP] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    if (p === 1) return;
    let raf, t0 = 0, started = false;
    const step = (t) => {
      if (!t0) t0 = t;
      const k = Math.min((t - t0) / 1300, 1);
      setP(ease(k));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    const check = () => {
      if (started || !ref.current) return;
      const vh = window.innerHeight || 800;
      const r = ref.current.getBoundingClientRect();
      if (r.top > vh * 0.9 || r.bottom < 0) return;
      started = true;
      raf = requestAnimationFrame(step);
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const timers = [0, 300, 900, 1600].map((ms) => setTimeout(check, ms));
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return p;
}

export default function Facts({ items }) {
  const ref = useRef(null);
  const p = useCountUp(ref);
  return (
    <div className="facts rv" ref={ref} style={{ paddingTop: 'clamp(2rem,4vw,3rem)' }}>
      {items.map(({ value, suffix = '', label }) => (
        <div className="fact" key={label}>
          <b>{p === 1 ? value : Math.round(value * p)}{suffix}</b>
          <T k={label} />
        </div>
      ))}
    </div>
  );
}
