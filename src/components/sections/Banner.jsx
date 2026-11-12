/* Toʻliq kenglikdagi rasm ustida karta: sarlavha, matn, tugma.
   bigTitle berilsa, oʻng tomonda katta yozuv chiqadi.
   to = ichki sahifa (/katalog), href = tashqi havola. */
import { Link } from 'react-router-dom';
import Picture from '@/components/ui/Picture';
import { T } from '@/i18n';

export default function Banner({ image, mobileImage, alt, title, text, cta = 'cta.more', to, href, bigTitle, light = false }) {
  const btn = to
    ? <T as={Link} className="btn btn--fill" to={to} k={cta} />
    : <T as="a" className="btn btn--fill" href={href} target="_blank" rel="noopener" k={cta} />;

  return (
    <section className={'film banner' + (light ? ' banner--light' : '')}>
      <Picture src={image} mobile={mobileImage} alt={alt} className="film__m film__m--poster" />
      <div className="film__veil" />
      <div className="wrap film__in">
        <div className="banner__card rv">
          <T as="h2" k={title} />
          <T as="p" k={text} />
          {btn}
        </div>
        {bigTitle && <T as="h2" className="banner__t rv d-1" k={bigTitle} />}
      </div>
    </section>
  );
}
