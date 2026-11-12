/* Barcha sahifalar shu yerda. Yangi sahifa qoʻshish:
   1) src/pages/ ga komponent yozing
   2) shu roʻyxatga bitta qator qoʻshing
   Menyu, footer va sahifa sarlavhasi shu roʻyxatdan avtomatik olinadi. */

import Home from '@/pages/Home';
import Qurilish from '@/pages/Qurilish';
import Katalog from '@/pages/Katalog';
import Kosmetika from '@/pages/Kosmetika';
import Galereya from '@/pages/Galereya';
import Aloqa from '@/pages/Aloqa';

export const ROUTES = [
  { path: '/', Component: Home, nav: 'nav.home', tkey: 't.index', footer: true,
    desc: 'Официальный представитель Giusto Manetti Battiloro (Firenze, с 1600 года) в Узбекистане. Сусальное золото, материалы для золочения, съедобное золото и серебро. Ташкент.' },
  { path: '/qurilish', Component: Qurilish, nav: 'nav.qur', tkey: 't.qur', footer: true,
    desc: 'Сусальное золото для куполов, минаретов, фасадов, интерьеров и лепнины. Наружное золочение, реставрация, поставки объектам и мастерским по Узбекистану.' },
  { path: '/katalog', Component: Katalog, nav: 'nav.cat', tkey: 't.kat', footer: true,
    desc: 'Сусальное золото 24K, серебро, палладий, платина, болюс, миссии, защитные составы и инструменты для золочения. Поставки по Узбекистану.' },
  { path: '/kosmetika', Component: Kosmetika, nav: 'nav.kos', tkey: 't.kos', footer: true,
    desc: 'Сусальное золото 24K для косметологии: маски для лица, патчи под глаза, салонные процедуры и производство косметики. Поставки по Узбекистану.' },
  { path: '/galereya', Component: Galereya, nav: 'nav.gal', tkey: 't.gal', footer: true,
    desc: 'Своды и фасады, рамы и иконы, десерты и коктейли. Работы, выполненные золотом Manetti.' },
  { path: '/aloqa', Component: Aloqa, nav: 'nav.con', tkey: 't.con', footer: false,
    desc: 'Ташкент, Юнусабад, ул. Абдуллы Кадыри, 38А. Телефон +998 95 145 44 22. Заявка на прайс Giusto Manetti Battiloro.' }
];
