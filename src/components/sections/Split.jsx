/* Ikki ustun: chapda sarlavha va matn, oʻngda rasm. */
import Picture from '@/components/ui/Picture';
import { T } from '@/i18n';

export default function Split({ eyebrow, title, titleClass = 'd3', paragraphs = [], image, alt, mist = false, gap = '1.6rem', id, children }) {
  return (
    <section className={'sec' + (mist ? ' sec--mist' : '')} id={id}>
      <div className="wrap split">
        <div className="rv">
          <T className="eyebrow" k={eyebrow} />
          <T as="h2" className={titleClass} k={title} />
          <span className="flour" />
          {paragraphs.map((k, i) => (
            <T key={k} as="p" className="body" style={i === 0 ? { marginTop: gap } : undefined} k={k} />
          ))}
        </div>
        <figure className="split__i rv d-1" style={{ margin: 0 }}>
          <Picture src={image} alt={alt} />
        </figure>
      </div>
      {children}
    </section>
  );
}
