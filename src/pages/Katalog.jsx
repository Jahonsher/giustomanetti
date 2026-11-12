import { T } from '@/i18n';
import Hero from '@/components/sections/Hero';
import CardGrid from '@/components/sections/CardGrid';
import CtaBand from '@/components/sections/CtaBand';

const GROUPS = [
  { image: 'img/wp/img-2204', alt: 'Листы сусального золота', title: 'k.g1.h', text: 'k.g1.p', tags: ['24K', 'Argento', 'Palladio', 'Platino'] },
  { image: 'img/wp/1', alt: 'Подготовка поверхности', title: 'k.g2.h', text: 'k.g2.p', tags: ['Prep & Seal', 'Gommalacca'] },
  { image: 'img/wp/painting-19', alt: 'Болюс и гипс', title: 'k.g3.h', text: 'k.g3.p', tags: ['Bolo', 'Gesso'] },
  { image: 'img/wp/doratura-guazzo-09b', alt: 'Миссии и клеи', title: 'k.g4.h', text: 'k.g4.p', tags: ['Missione', 'Colla'] },
  { image: 'img/wp/ig-338945148', alt: 'Защита и патина', title: 'k.g5.h', text: 'k.g5.p', tags: ['Patina', 'Vernice'] },
  { image: 'img/wp/ig-339085209', alt: 'Инструменты для золочения', title: 'k.g6.h', text: 'k.g6.p', tags: ['Lampemsel', 'Agata'] }
];

export default function Katalog() {
  return (
    <>
      <Hero image="poster/katalog-poster" eyebrow="k.eye" title="k.h" />

      <section className="sec">
        <div className="wrap">
          <T as="p" className="lede rv" k="k.p" />
          <CardGrid items={GROUPS} />
        </div>
      </section>

      <CtaBand text="k.note" />
    </>
  );
}
