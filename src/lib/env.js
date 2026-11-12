/* Umumiy yordamchilar va sozlamalar */

export const CONTACT_PATH = '/aloqa';

export const TG_URL = 'https://t.me/manettiuz';
export const IG_URL = 'https://www.instagram.com/manetti_uz/';
export const FB_URL = 'https://www.facebook.com/Manettiuz';

export const PHONES = [
  { href: 'tel:+998910249999', label: '+998 91 024 99 99' },
  { href: 'tel:+998712351234', label: '+998 71 235 12 34' }
];
export const EMAIL = 'giustomanetti.uz@gmail.com';
export const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=41.322984%2C69.276844';

/** public/assets/ ichidagi fayl manzili */
export const asset = (p) => `${import.meta.env.BASE_URL}assets/${p}`;

const mq = (q) => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(q).matches;
export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)');
export const isSmallScreen = () => mq('(max-width: 860px)');
