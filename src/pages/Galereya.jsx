import { T } from '@/i18n';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';

/* wide: true -> ikki katak egallaydi */
const PHOTOS = [
  { image: 'img/wp/ig-318441970', alt: 'Золочёный свод интерьера', wide: true },
  { image: 'img/wp/doratura-guazzo-09b', alt: 'Нанесение листа ножом' },
  { image: 'img/wp/ig-338945148', alt: 'Золочёная резьба' },

  { image: 'img/wp/painting-19', alt: 'Живопись и золото' },
  { image: 'img/wp/ig-335619433', alt: 'Работа с листом золота' },
  { image: 'img/wp/ig-281206986', alt: 'Рулон золота', wide: true },

  { image: 'img/wp/25', alt: 'Фактура золотого листа' },
  { image: 'img/wp/img-2204', alt: 'Листы в книжке' },
  { image: 'img/wp/ig-339085209', alt: 'Кисть золотаря' },
  { image: 'img/wp/ig-339082312', alt: 'Лист золота на доске' },

  { image: 'img/wp/ig-321844381', alt: 'Книжка Giusto Manetti' },
  { image: 'img/wp/ig-325457552', alt: 'Фирменные книжки золота' },
  { image: 'img/wp/familyandfriends-bricioleoro-125mg-goldc', alt: 'Gold Chef, золотая крошка' },
  { image: 'img/wp/1', alt: 'Золочение предмета' }
];

export default function Galereya() {
  return (
    <>
      <Hero image="img/wp/ig-338945148" eyebrow="gl2.eye" title="gl2.h" />

      <section className="sec">
        <div className="wrap">
          <T as="p" className="lede rv" style={{ marginBottom: 'clamp(2rem,4vw,3rem)' }} k="gl2.p" />
          <Gallery items={PHOTOS} lightbox rowStarts={[0, 3, 6, 10]} />
        </div>
      </section>
    </>
  );
}
