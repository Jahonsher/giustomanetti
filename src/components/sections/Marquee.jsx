/* Instagram lentasi: kartalar uzluksiz oʻngdan chapga suriladi.
   "Harakatni kamaytirish" yoqilgan boʻlsa qoʻlda suriladigan qoladi. */
import { useState } from 'react';
import Picture from '@/components/ui/Picture';
import { IconInstagramSm } from '@/components/ui/Icons';
import { prefersReducedMotion } from '@/lib/env';

function ReelCard({ href, image, alt, caption, hidden }) {
  return (
    <a className="mcard" href={href} target="_blank" rel="noopener"
       aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>
      <Picture src={image} alt={alt} />
      <span className="mcard__scrim" />
      <span className="mcard__dot" aria-hidden="true"><IconInstagramSm /></span>
      <span className="mcard__cap"><b>{caption}</b></span>
    </a>
  );
}

export default function Marquee({ items, label }) {
  const [run] = useState(() => !prefersReducedMotion());
  return (
    <div className={'mq rv' + (run ? ' mq--run' : '')} aria-label={label}>
      <div className="mq__track">
        {items.map((it) => <ReelCard key={it.href} {...it} />)}
        {run && items.map((it) => <ReelCard key={'c' + it.href} {...it} hidden />)}
      </div>
    </div>
  );
}
