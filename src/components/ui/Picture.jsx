/* <picture>: zamonaviy brauzer WebP oladi, eskisi JPEG.
   src kengaytmasiz beriladi: "img/wp/ig-318441970"  ->  .webp + .jpg
   mobile berilsa, 720px dan kichik ekranda oʻsha rasm olinadi. */
import { asset } from '@/lib/env';

export default function Picture({ src, alt = '', className, eager = false, mobile }) {
  return (
    <picture>
      {mobile && <source media="(max-width:720px)" srcSet={asset(`${mobile}.webp`)} type="image/webp" />}
      {mobile && <source media="(max-width:720px)" srcSet={asset(`${mobile}.jpg`)} />}
      <source srcSet={asset(`${src}.webp`)} type="image/webp" />
      <img
        decoding="async"
        className={className}
        src={asset(`${src}.jpg`)}
        alt={alt}
        loading={eager ? undefined : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
      />
    </picture>
  );
}
