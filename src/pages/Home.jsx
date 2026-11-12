import { Link } from 'react-router-dom';
import { T } from '@/i18n';
import { CONTACT_PATH, IG_URL } from '@/lib/env';
import Picture from '@/components/ui/Picture';
import Hero from '@/components/sections/Hero';
import Banner from '@/components/sections/Banner';
import Split from '@/components/sections/Split';
import Marquee from '@/components/sections/Marquee';
import Facts from '@/components/sections/Facts';
import { IconHeadset, IconMedal, IconShield, IconTruck } from '@/components/ui/Icons';

const REELS = [
  { href: 'https://www.instagram.com/reel/C_xhWeyO5x6/', image: 'reels/ram-zarhal', alt: 'Золочение рамы сусальным золотом Giusto Manetti', caption: 'Ramka zarhallash' },
  { href: 'https://www.instagram.com/reel/CsSIHvuokPe/', image: 'reels/varaq', alt: 'Книжки сусального золота Manetti', caption: 'Zarhal varaq' },
  { href: 'https://www.instagram.com/reel/CshBlwwxCEh/', image: 'reels/ram-varaq', alt: 'Нанесение листа золота на раму', caption: 'Varaq qoʻyish' },
  { href: 'https://www.instagram.com/reel/CshB0VHMnX4/', image: 'reels/ram-bolus', alt: 'Золочение рамы на болюсе', caption: 'Bolus ustida' },
  { href: 'https://www.instagram.com/reel/CshB_M5tqnD/', image: 'reels/dokon', alt: 'Мастерская Giusto Manetti в Ташкенте', caption: 'Ustaxonada' },
  { href: 'https://www.instagram.com/reel/CuNKWxJtCi4/', image: 'reels/ram-bosish', alt: 'Прижатие листа золота к раме', caption: 'Varaqni bosish' },
  { href: 'https://www.instagram.com/reel/C9m51oXNLLy/', image: 'reels/ram-silliq', alt: 'Полировка золочёной рамы замшей', caption: 'Silliqlash' }
];

const FACTS = [
  { value: 400, suffix: '+', label: 'fa.1' },
  { value: 15, label: 'fa.2' },
  { value: 70, suffix: '+', label: 'fa.3' },
  { value: 29, label: 'fa.4' }
];

const MARKS = [
  { Icon: IconShield, k: 'mk.1' },
  { Icon: IconMedal, k: 'mk.2' },
  { Icon: IconTruck, k: 'mk.3' },
  { Icon: IconHeadset, k: 'mk.4' }
];

function Panel({ tone, title, text, cta, to, image, alt, className = '' }) {
  return (
    <article className={`panel panel--${tone} rv${className}`}>
      <div className="panel__t">
        <T as="h2" k={title} />
        <T as="p" k={text} />
        <T as={Link} className="btn btn--light" to={to} k={cta} />
      </div>
      <div className="panel__i"><Picture src={image} alt={alt} /></div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Hero variant="hero" image="poster/hero" alt="Золочёная скульптура на крыше в сумерках над городом" title="h.h1">
        <T as="p" k="h.sub" />
        <div className="hero__cta">
          <T as={Link} className="btn btn--light" to="/katalog" k="cta.cat" />
          <T as={Link} className="alink alink--light" to="/qurilish" k="qb.k" />
        </div>
      </Hero>

      <Banner image="img/wp/ig-318441970" alt="Золочёный свод, выполненный сусальным золотом Manetti"
              title="qb.k" text="qb.p" to="/qurilish" bigTitle="qb.t" />

      <section className="sec">
        <div className="wrap duo">
          <Panel tone="gold" title="p2.h" text="p2.p" cta="cta.order" to={CONTACT_PATH}
                 image="img/eshop" alt="Продукты Manetti для золочения: кисти, миссии, защитные составы" />
          <Panel tone="navy" title="p1.h" text="p1.p" cta="cta.quote" to="/katalog" className=" d-1"
                 image="img/catalogo" alt="Коробка и книжки сусального золота Giusto Manetti Firenze" />
        </div>
      </section>

      <Banner image="img/vetrina" alt="Prep & Seal и резная рама"
              title="vt.k" text="vt.p" href={IG_URL} bigTitle="vt.t" />

      <Banner image="img/gallery" alt="Зеркальная галерея Версаля, золочение Manetti"
              title="gl.k" text="gl.p" to="/galereya" bigTitle="gl.t" />

      <Banner light image="img/kosmetika" mobileImage="img/kosmetika-m" alt="Золотая маска и патчи из сусального золота 24K"
              title="kb.k" text="kb.p" to="/kosmetika" />

      {/* Instagram devori */}
      <section className="sec sec--mist">
        <div className="wrap">
          <T className="eyebrow rv" k="ig.eye" />
          <T as="h2" className="d3 rv" k="ig.h" />
          <span className="flour rv" />
          <T as="p" className="body rv" style={{ marginTop: '1.4rem' }} k="ig.p" />
        </div>

        <Marquee items={REELS} label="Instagram · @manetti_uz" />

        <div className="wrap center">
          <p className="rv" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <T as="a" className="btn" href={IG_URL} target="_blank" rel="noopener" k="ig.cta" />
          </p>
        </div>
      </section>

      {/* Biz haqimizda */}
      <Split id="about" eyebrow="ab.eye" title="ab.h" titleClass="d2" gap="2rem" paragraphs={['ab.p1', 'ab.p2']}
             image="img/wp/ig-321844381" alt="Книжка сусального золота Giusto Manetti Firenze">
        <div className="wrap" style={{ marginTop: 'clamp(3rem,6vw,5rem)' }}>
          <hr className="rule" />
          <Facts items={FACTS} />
        </div>
      </Split>

      <section className="sec sec--tight sec--mist">
        <div className="wrap marks rv">
          {MARKS.map(({ Icon, k }) => (
            <div className="mark2" key={k}><Icon /><T k={k} /></div>
          ))}
        </div>
      </section>
    </>
  );
}
