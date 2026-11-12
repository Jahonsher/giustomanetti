/* Sahifa almashganda ishlaydigan umumiy effektlar:
   - .rv elementlari ekranga kirganda .in oladi (paydo boʻlish animatsiyasi)
   - bannerlardagi poster yengil parallaks bilan suriladi (faqat keng ekranda)
   - yangi sahifa tepadan ochiladi */

import { useEffect, useLayoutEffect } from 'react';
import { isSmallScreen, prefersReducedMotion } from '@/lib/env';

function onFrame(fn) {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; fn(); });
  };
}

export function useScrollTop(key) {
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [key]);
}

/* Skroll boʻyicha tekshiramiz: IntersectionObserver baʼzan sahifa
   ochilganda ishlamaydi va matn koʻrinmay qoladi. */
export function useReveal(key) {
  useEffect(() => {
    const rv = [...document.querySelectorAll('.rv:not(.in)')];
    const check = () => {
      const h = window.innerHeight || 800;
      for (let i = rv.length - 1; i >= 0; i--) {
        const r = rv[i].getBoundingClientRect();
        if (r.top < h * 0.93 && r.bottom > -40) { rv[i].classList.add('in'); rv.splice(i, 1); }
      }
    };
    const tick = onFrame(check);
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    document.addEventListener('visibilitychange', check);
    const timers = [0, 120, 400, 1000].map((ms) => setTimeout(check, ms));
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      document.removeEventListener('visibilitychange', check);
      timers.forEach(clearTimeout);
    };
  }, [key]);
}

export function useParallax(key) {
  useEffect(() => {
    if (prefersReducedMotion() || isSmallScreen()) return;
    const posters = [...document.querySelectorAll('.banner:not(.banner--light) .film__m--poster')];
    if (!posters.length) return;
    posters.forEach((p) => { p.style.willChange = 'transform'; });

    const run = () => {
      const vh = window.innerHeight || 800;
      for (const p of posters) {
        const box = p.getBoundingClientRect();
        const off = (box.top + box.height / 2 - vh / 2) / vh;        /* -0.5..0.5 */
        const shift = Math.max(-26, Math.min(26, off * -44));
        p.style.transform = `translate3d(0,${shift.toFixed(1)}px,0) scale(1.12)`;
      }
    };
    const tick = onFrame(run);
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    run();
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, [key]);
}
