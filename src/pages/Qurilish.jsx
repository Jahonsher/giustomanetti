import { T } from '@/i18n';
import Hero from '@/components/sections/Hero';
import CardGrid from '@/components/sections/CardGrid';
import Gallery from '@/components/sections/Gallery';
import Split from '@/components/sections/Split';
import CtaBand from '@/components/sections/CtaBand';

const CARDS = [
  { image: 'img/wp/ig-318441970', alt: 'Золочёный свод', title: 'q.c1h', text: 'q.c1p', tags: ['24K', { k: 'q.t.out' }] },
  { image: 'img/wp/ig-338945148', alt: 'Золочёная лепнина', title: 'q.c2h', text: 'q.c2p', tags: [{ k: 'q.t.in' }, 'Doratura'] },
  { image: 'img/gallery', alt: 'Золочёный интерьер', title: 'q.c3h', text: 'q.c3p', tags: [{ k: 'q.t.rest' }, 'Patina'] }
];

const WORKS = [
  { image: 'img/ig/ish-1', alt: 'Нанесение сусального золота' },
  { image: 'img/ig/ish-2', alt: 'Золочение поверхности' },
  { image: 'img/ig/ish-3', alt: 'Работа с листом' },
  { image: 'img/ig/ish-4', alt: 'Золочение деревянных элементов' },
  { image: 'img/wp/doratura-guazzo-09b', alt: 'Нанесение листа на поверхность' },
  { image: 'img/wp/img-2204', alt: 'Золочение лепного карниза' },
  { image: 'img/wp/ig-335619433', alt: 'Работа с листом золота' },
  { image: 'img/wp/ig-339085209', alt: 'Кисть золотаря' }
];

export default function Qurilish() {
  return (
    <>
      <Hero image="img/wp/ig-318441970" eyebrow="q.eye" title="q.h" />

      <section className="sec">
        <div className="wrap">
          <T as="p" className="lede rv" k="q.p" />
          <CardGrid items={CARDS} />
        </div>
      </section>

      <section className="sec sec--mist">
        <div className="wrap">
          <T className="eyebrow rv" k="q.work" />
          <T as="h2" className="d3 rv" k="q.workh" />
          <span className="flour rv" />
          <T as="p" className="body rv" style={{ marginTop: '1.4rem' }} k="q.workp" />
          <div style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <Gallery items={WORKS} />
          </div>
        </div>
      </section>

      <Split eyebrow="q.why" title="q.whyh" paragraphs={['q.whyp1', 'q.whyp2']}
             image="img/wp/ig-338945148" alt="Золочёный резной декор" />

      <CtaBand text="q.ask" />
    </>
  );
}
