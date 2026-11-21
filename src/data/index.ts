/* Giusto Manetti Battiloro UZ — site data.
 * All visible text lives in src/i18n/texts.ts (ru / uz / en); here we only
 * keep text *keys*, image paths, links and numbers. */

export type Lang = 'ru' | 'uz' | 'en'
export const LANGS: Lang[] = ['ru', 'uz', 'en']

/** Resolve a public file against the deploy base (e.g. /giustomanetti/). */
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
/** Full-screen WebGL slideshow on the home page. caption = text key */
export const HERO_SLIDES = [
  { image: img('poster/hero'), caption: 'tagline' },
  { image: img('img/gallery'), caption: 'gl.k' },
  { image: img('img/goldchef'), caption: 'gc.k' },
  { image: img('img/vetrina'), caption: 'vt.k' },
]

/** Picture shown next to each page in the full-screen menu. */
export const PAGE_IMAGES: Record<string, string> = {
  '/': img('poster/hero'),
  '/qurilish': img('img/wp/ig-318441970'),
  '/katalog': img('img/catalogo'),
  '/kosmetika': img('img/kosmetika-m'),
  '/galereya': img('img/wp/ig-338945148'),
  '/aloqa': img('img/wp/ig-325457552'),
}

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

/* ---------- Manetti catalogues (PDF + page images in public/assets/katalog) ---------- */
export type Catalog = {
  id: string
  /** proper name, the same in every language */
  title: string
  /** text key: one-line description */
  sub: string
  year: number
  /** printed pages, as in the PDF */
  printed: number
  /** number of page images p001…pNNN (the 2024 catalogue is laid out in spreads) */
  count: number
  dir: string
  pdf: string
  pdfMb: number
  /** image size of page i (px) — spreads are twice as wide */
  size: (i: number) => [number, number]
  /** chapters: text key + page image number */
  toc: { k: string; page: number }[]
}

const pad3 = (n: number) => String(n).padStart(3, '0')
export const pageSrc = (c: Catalog, i: number) => `assets/katalog/${c.dir}/p${pad3(i)}.webp`
export const thumbSrc = (c: Catalog, i: number) => `assets/katalog/${c.dir}/t${pad3(i)}.webp`
export const isSpread = (c: Catalog, i: number) => c.size(i)[0] > c.size(i)[1]
/** Link into the catalogue viewer on the Katalog page (opens on load). */
export const catalogHref = (id: string, page: number) => `/katalog?catalog=${id}&page=${page}`

export const CATALOGS: Catalog[] = [
  {
    id: 'gmb-2024',
    title: 'Catalogo 2024',
    sub: 'cat.gmb.s',
    year: 2024,
    printed: 158,
    count: 80,
    dir: 'gmb-2024',
    pdf: 'assets/katalog/pdf/giusto-manetti-catalogo-2024.pdf',
    pdfMb: 7.6,
    // page 1 is the front cover, page 80 the back cover; everything between is a spread
    size: (i) => (i === 1 || i === 80 ? [800, 1131] : [1600, 1131]),
    toc: [
      { k: 'ch.prec', page: 8 },
      { k: 'ch.imit', page: 27 },
      { k: 'ch.guazzo', page: 37 },
      { k: 'ch.missione', page: 41 },
      { k: 'ch.fin', page: 47 },
      { k: 'ch.prot', page: 51 },
      { k: 'ch.tools', page: 59 },
      { k: 'ch.kolner', page: 74 },
      { k: 'ch.academy', page: 76 },
    ],
  },
  {
    id: 'belle-arti-2025',
    title: 'Belle Arti 2025',
    sub: 'cat.ba.s',
    year: 2025,
    printed: 65,
    count: 65,
    dir: 'belle-arti-2025',
    pdf: 'assets/katalog/pdf/giusto-manetti-belle-arti-2025.pdf',
    pdfMb: 5.3,
    size: () => [1000, 1414],
    toc: [
      { k: 'ch.prec', page: 9 },
      { k: 'ch.imit', page: 15 },
      { k: 'ch.guazzo', page: 23 },
      { k: 'ch.missione', page: 29 },
      { k: 'ch.fin', page: 35 },
      { k: 'ch.prot', page: 41 },
      { k: 'ch.brushes', page: 47 },
      { k: 'ch.burnish', page: 53 },
      { k: 'ch.academy', page: 63 },
    ],
  },
]

/** Product shown with a photo from the catalogue; opens the catalogue on its page. */
export type Product = { id: string; image: string; it: string; title: string; text: string; catalog: string; page: number }
const product = (id: string, it: string, page: number, catalog = 'gmb-2024', textId = id): Product => ({
  id,
  image: img(`img/katalog/${id}`),
  it,
  title: `p.${textId}.h`,
  text: `p.${textId}.p`,
  catalog,
  page,
})

export const KATALOG = {
  hero: img('poster/katalog-poster'),
  // the six sections of the Manetti catalogues; photos from the Belle Arti 2025 catalogue
  groups: [
    { image: img('img/katalog/g-doratura'), alt: 'Foglia oro e argento Giusto Manetti', title: 'k.g1.h', text: 'k.g1.p', tags: ['Oro', 'Argento', 'Palladio', 'Platino', 'Similoro'] },
    { image: img('img/katalog/g-guazzo'), alt: 'Doratura a guazzo: gesso, colla, bolo', title: 'k.g2.h', text: 'k.g2.p', tags: ['Gesso di Bologna', 'Colla di coniglio', 'Bolo'] },
    { image: img('img/katalog/g-missione'), alt: 'Doratura a missione', title: 'k.g3.h', text: 'k.g3.p', tags: ['Missione all’acqua', 'ad alcool', 'a vernice'] },
    { image: img('img/katalog/g-finitura'), alt: 'Finitura: vernice mecca, bitume', title: 'k.g4.h', text: 'k.g4.p', tags: ['Vernice mecca', 'Bitume', 'Cera bituminosa'] },
    { image: img('img/katalog/g-protezione'), alt: 'Protezione: gommalacca e acrilici', title: 'k.g5.h', text: 'k.g5.p', tags: ['Gommalacca', 'Protezione acrilica', 'Lascaux UV'] },
    { image: img('img/katalog/g-strumenti'), alt: 'Strumenti: coltelli, brunitoi, cuscinetto', title: 'k.g6.h', text: 'k.g6.p', tags: ['Cuscinetto', 'Coltello', 'Pennellessa', 'Brunitoio'] },
  ] as Card[],
  // photos cropped from the 2024 catalogue spreads; page = page image of that product
  products: [
    product('foglia-libretto', 'Foglia in libretto', 13),
    product('libretto-singolo', 'Foglia in libretto singolo', 17),
    product('foglia-rotolo', 'Foglia in rotolo', 21),
    product('foglia-glass', 'Foglia glass', 20),
    product('foglia-imitazione', 'Foglia imitazione', 28),
    product('kit-cornice', 'Kit · Dorare una cornice', 73),
    product('bolo-italiano', 'Bolo italiano', 39),
    product('missione', 'Missione', 43),
    product('gommalacca', 'Gommalacca', 52),
    product('bitume', 'Bitume · Cera bituminosa', 49),
    product('brunitoi', 'Brunitoi in pietra d’agata', 69),
    product('cuscinetto-coltello', 'Cuscinetto · Coltello · Pennellessa', 60),
  ] as Product[],
}

/** Qurilish page: catalogue materials for buildings and exteriors. */
export const QURILISH_MATERIALS: Product[] = [
  product('foglia-decalco', 'Foglia a decalco · Extra', 10),
  product('foglia-rotolo', 'Foglia in rotolo', 21),
  product('protezione-esterni', 'Protezione acrilica per esterni', 56),
]

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
