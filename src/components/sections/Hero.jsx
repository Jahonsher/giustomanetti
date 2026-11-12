/* Sahifa tepasidagi katta rasmli blok.
   variant="hero"  -> bosh sahifa (katta)
   variant="phero" -> ichki sahifalar
   Mazmuni ketma-ket koʻtarilib chiqadi (.ready klassi, CSS da). */
import { useEffect, useState } from 'react';
import Picture from '@/components/ui/Picture';
import { T } from '@/i18n';
import { prefersReducedMotion } from '@/lib/env';

export default function Hero({ variant = 'phero', light = false, image, alt = '', eyebrow, title, children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) { setReady(true); return; }
    let r2;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setReady(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);

  const cls = ['film', variant, light && `${variant}--light`, ready && 'ready'].filter(Boolean).join(' ');

  return (
    <section className={cls}>
      <Picture src={image} alt={alt} className="film__m film__m--poster" eager />
      <div className="film__veil" />
      <div className="wrap film__in">
        {eyebrow && <T className="eyebrow" k={eyebrow} />}
        {title && <T as="h1" className="d2" k={title} />}
        {children}
      </div>
    </section>
  );
}
