import { T } from '@/i18n';
import Hero from '@/components/sections/Hero';
import CardGrid from '@/components/sections/CardGrid';
import Split from '@/components/sections/Split';
import CtaBand from '@/components/sections/CtaBand';

const CARDS = [
  { image: 'img/ig/kosm-niqob', alt: 'Маска из сусального золота на лице', title: 'k2.c1h', text: 'k2.c1p', tags: ['24K', { k: 'k2.t.salon' }] },
  { image: 'img/ig/kosm-koz', alt: 'Патчи из сусального золота под глазами', title: 'k2.c2h', text: 'k2.c2p', tags: [{ k: 'k2.t.loc' }, { k: 'k2.t.leaf' }] },
  { image: 'img/wp/25', alt: 'Книжка сусального золота Manetti', title: 'k2.c3h', text: 'k2.c3p', tags: [{ k: 'k2.t.b2b' }, { k: 'k2.t.doc' }] }
];

export default function Kosmetika() {
  return (
    <>
      <Hero light image="img/kosmetika" eyebrow="k2.eye" title="k2.h" />

      <section className="sec">
        <div className="wrap">
          <T as="p" className="lede rv" k="k2.p" />
          <CardGrid items={CARDS} />
        </div>
      </section>

      <Split mist eyebrow="k2.why" title="k2.whyh" paragraphs={['k2.whyp1', 'k2.whyp2']}
             image="img/ig/kosmetika-2" alt="Золотые хлопья на коже лица" />

      <CtaBand text="k2.ask" />
    </>
  );
}
