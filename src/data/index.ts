/* Giusto Manetti Battiloro UZ — site data.
 * All visible text lives in src/i18n/texts.ts (ru / uz / en); here we only
 * keep text *keys*, image paths, links and numbers. */

export type Lang = 'ru' | 'uz' | 'en'
export const LANGS: Lang[] = ['ru', 'uz', 'en']

/** Resolve a public file against the deploy base (e.g. /giustomanetti-uz/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
/** public/assets/<p>.webp */
export const img = (p: string) => `assets/${p}.webp`

export const pad = (n: number) => String(n).padStart(2, '0')

/* ---------- contacts (from the old src/lib/env.js) ---------- */
export const CONTACT = {
  telegram: 'https://t.me/manettiuz',
  instagram: 'https://www.instagram.com/manetti_uz/',
  facebook: 'https://www.facebook.com/Manettiuz',
  phones: [
    { href: 'tel:+998910249999', label: '+998 91 024 99 99' },
    { href: 'tel:+998712351234', label: '+998 71 235 12 34' },
  ],
  email: 'giustomanetti.uz@gmail.com',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=41.322984%2C69.276844',
  mapEmbed: 'https://www.google.com/maps?q=41.322984,69.276844&z=17&hl=ru&output=embed',
  yandex: 'https://yandex.uz/maps/?ll=69.276844%2C41.322984&z=17&pt=69.276844,41.322984',
}

/* ---------- navigation ---------- */
export const NAV = [
  { to: '/', key: 'nav.home', title: 't.index' },
  { to: '/qurilish', key: 'nav.qur', title: 't.qur' },
  { to: '/katalog', key: 'nav.cat', title: 't.kat' },
  { to: '/kosmetika', key: 'nav.kos', title: 't.kos' },
  { to: '/galereya', key: 'nav.gal', title: 't.gal' },
  { to: '/aloqa', key: 'nav.con', title: 't.con' },
]

/* ---------- home ---------- */
export type Direction = { title: string; text: string; image: string; to?: string; href?: string }

/** Directions shown on the 3D ring (scroll-driven navigation). */
export const DIRECTIONS: Direction[] = [
  { title: 'qb.k', text: 'qb.p', image: img('img/wp/ig-318441970'), to: '/qurilish' },
  { title: 'p1.h', text: 'k.p', image: img('img/catalogo'), to: '/katalog' },
  { title: 'kb.k', text: 'kb.p', image: img('img/kosmetika'), to: '/kosmetika' },
  { title: 'gl.k', text: 'gl.p', image: img('img/gallery'), to: '/galereya' },
  { title: 'p2.h', text: 'p2.p', image: img('img/eshop'), to: '/aloqa' },
  { title: 'vt.k', text: 'vt.p', image: img('img/vetrina'), href: CONTACT.instagram },
]

export const REELS = [
  { href: 'https://www.instagram.com/reel/C_xhWeyO5x6/', image: img('reels/ram-zarhal'), caption: 'Ramka zarhallash' },
  { href: 'https://www.instagram.com/reel/CsSIHvuokPe/', image: img('reels/varaq'), caption: 'Zarhal varaq' },
  { href: 'https://www.instagram.com/reel/CshBlwwxCEh/', image: img('reels/ram-varaq'), caption: 'Varaq qoʻyish' },
  { href: 'https://www.instagram.com/reel/CshB0VHMnX4/', image: img('reels/ram-bolus'), caption: 'Bolus ustida' },
  { href: 'https://www.instagram.com/reel/CshB_M5tqnD/', image: img('reels/dokon'), caption: 'Ustaxonada' },
  { href: 'https://www.instagram.com/reel/CuNKWxJtCi4/', image: img('reels/ram-bosish'), caption: 'Varaqni bosish' },
  { href: 'https://www.instagram.com/reel/C9m51oXNLLy/', image: img('reels/ram-silliq'), caption: 'Silliqlash' },
]

export const FACTS = [
  { value: 400, suffix: '+', label: 'fa.1' },
  { value: 15, suffix: '', label: 'fa.2' },
  { value: 70, suffix: '+', label: 'fa.3' },
  { value: 29, suffix: '', label: 'fa.4' },
]

export const MARKS = ['mk.1', 'mk.2', 'mk.3', 'mk.4']

/** Workshop photos (assets/img/foto). */
export const WORKSHOP = [
  img('img/foto/varaq-ranglari'),
  img('img/foto/ramka-zarhallash'),
  img('img/foto/mo-yqalam-naqsh'),
  img('img/foto/varaq-bolus'),
  img('img/foto/ganch-silliqlash'),
  img('img/foto/varaq-qutilar'),
]

/* ---------- inner pages ---------- */
export type Tag = string | { k: string }
export type Card = { image: string; alt: string; title: string; text: string; tags: Tag[] }
export type Photo = { image: string; alt: string; wide?: boolean }

export const QURILISH = {
  hero: img('img/wp/ig-318441970'),
  cards: [
    { image: img('img/wp/ig-318441970'), alt: 'Золочёный свод', title: 'q.c1h', text: 'q.c1p', tags: ['24K', { k: 'q.t.out' }] },
    { image: img('img/wp/ig-338945148'), alt: 'Золочёная лепнина', title: 'q.c2h', text: 'q.c2p', tags: [{ k: 'q.t.in' }, 'Doratura'] },
    { image: img('img/gallery'), alt: 'Золочёный интерьер', title: 'q.c3h', text: 'q.c3p', tags: [{ k: 'q.t.rest' }, 'Patina'] },
  ] as Card[],
  works: [
    { image: img('img/ig/ish-1'), alt: 'Нанесение сусального золота' },
    { image: img('img/ig/ish-2'), alt: 'Золочение поверхности' },
    { image: img('img/ig/ish-3'), alt: 'Работа с листом' },
    { image: img('img/ig/ish-4'), alt: 'Золочение деревянных элементов' },
    { image: img('img/wp/doratura-guazzo-09b'), alt: 'Нанесение листа на поверхность' },
    { image: img('img/wp/img-2204'), alt: 'Золочение лепного карниза' },
    { image: img('img/wp/ig-335619433'), alt: 'Работа с листом золота' },
    { image: img('img/wp/ig-339085209'), alt: 'Кисть золотаря' },
  ] as Photo[],
  split: img('img/wp/ig-338945148'),
}

export const KATALOG = {
  hero: img('poster/katalog-poster'),
  groups: [
    { image: img('img/wp/img-2204'), alt: 'Листы сусального золота', title: 'k.g1.h', text: 'k.g1.p', tags: ['24K', 'Argento', 'Palladio', 'Platino'] },
    { image: img('img/wp/1'), alt: 'Подготовка поверхности', title: 'k.g2.h', text: 'k.g2.p', tags: ['Prep & Seal', 'Gommalacca'] },
    { image: img('img/wp/painting-19'), alt: 'Болюс и гипс', title: 'k.g3.h', text: 'k.g3.p', tags: ['Bolo', 'Gesso'] },
    { image: img('img/wp/doratura-guazzo-09b'), alt: 'Миссии и клеи', title: 'k.g4.h', text: 'k.g4.p', tags: ['Missione', 'Colla'] },
    { image: img('img/wp/ig-338945148'), alt: 'Защита и патина', title: 'k.g5.h', text: 'k.g5.p', tags: ['Patina', 'Vernice'] },
    { image: img('img/wp/ig-339085209'), alt: 'Инструменты для золочения', title: 'k.g6.h', text: 'k.g6.p', tags: ['Lampemsel', 'Agata'] },
  ] as Card[],
}

export const KOSMETIKA = {
  hero: img('img/kosmetika'),
  cards: [
    { image: img('img/ig/kosm-niqob'), alt: 'Маска из сусального золота на лице', title: 'k2.c1h', text: 'k2.c1p', tags: ['24K', { k: 'k2.t.salon' }] },
    { image: img('img/ig/kosm-koz'), alt: 'Патчи из сусального золота под глазами', title: 'k2.c2h', text: 'k2.c2p', tags: [{ k: 'k2.t.loc' }, { k: 'k2.t.leaf' }] },
    { image: img('img/wp/25'), alt: 'Книжка сусального золота Manetti', title: 'k2.c3h', text: 'k2.c3p', tags: [{ k: 'k2.t.b2b' }, { k: 'k2.t.doc' }] },
  ] as Card[],
  split: img('img/ig/kosmetika-2'),
}

export const GALEREYA = {
  hero: img('img/wp/ig-338945148'),
  photos: [
    { image: img('img/wp/ig-318441970'), alt: 'Золочёный свод интерьера', wide: true },
    { image: img('img/wp/doratura-guazzo-09b'), alt: 'Нанесение листа ножом' },
    { image: img('img/wp/ig-338945148'), alt: 'Золочёная резьба' },
    { image: img('img/wp/painting-19'), alt: 'Живопись и золото' },
    { image: img('img/wp/ig-335619433'), alt: 'Работа с листом золота' },
    { image: img('img/wp/ig-281206986'), alt: 'Рулон золота', wide: true },
    { image: img('img/wp/25'), alt: 'Фактура золотого листа' },
    { image: img('img/wp/img-2204'), alt: 'Листы в книжке' },
    { image: img('img/wp/ig-339085209'), alt: 'Кисть золотаря' },
    { image: img('img/wp/ig-339082312'), alt: 'Лист золота на доске' },
    { image: img('img/wp/ig-321844381'), alt: 'Книжка Giusto Manetti' },
    { image: img('img/wp/ig-325457552'), alt: 'Фирменные книжки золота' },
    { image: img('img/wp/familyandfriends-bricioleoro-125mg-goldc'), alt: 'Gold Chef, золотая крошка' },
    { image: img('img/wp/1'), alt: 'Золочение предмета' },
  ] as Photo[],
}

export const ALOQA = { hero: img('img/wp/ig-325457552') }
