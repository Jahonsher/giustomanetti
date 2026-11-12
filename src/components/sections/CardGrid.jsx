/* Rasmli kartalar toʻri (3 ustun).
   items: [{ image, alt, title, text, tags: ["24K", { k: "q.t.out" }] }]
   tag oddiy satr boʻlsa shundayligicha, { k } boʻlsa tarjima qilinadi. */
import Picture from '@/components/ui/Picture';
import { T } from '@/i18n';

const delay = (i) => (i % 3 ? ` d-${i % 3}` : '');

export function Card({ image, alt, title, text, tags = [], className = '' }) {
  return (
    <article className={'card rv' + className}>
      <div className="card__i"><Picture src={image} alt={alt} /></div>
      <div className="card__b">
        <T as="h3" k={title} />
        <T as="p" k={text} />
        <div className="tagrow">
          {tags.map((tag, i) => typeof tag === 'string'
            ? <span key={i} className="tag">{tag}</span>
            : <T key={i} className="tag" k={tag.k} />)}
        </div>
      </div>
    </article>
  );
}

export default function CardGrid({ items }) {
  return (
    <div className="trio" style={{ marginTop: 'clamp(2.4rem,5vw,4rem)' }}>
      {items.map((it, i) => <Card key={it.title} {...it} className={delay(i)} />)}
    </div>
  );
}
