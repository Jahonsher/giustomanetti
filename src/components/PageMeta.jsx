/* Har sahifa uchun <title>, description, canonical va og: teglarini qoʻyadi. */
import { useEffect } from 'react';
import { useLang } from '@/i18n';

const SITE = 'https://giustomanetti.uz';

function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el && create) { el = create(); document.head.appendChild(el); }
  if (el) el.setAttribute(attr, value);
}

export default function PageMeta({ path, tkey, desc, noindex }) {
  const { t } = useLang();

  useEffect(() => {
    const title = t(tkey).replace(/<br\s*\/?>/gi, ' ');
    document.title = title;
    setMeta('meta[property="og:title"]', 'content', title);
    if (desc) {
      setMeta('meta[name="description"]', 'content', desc);
      setMeta('meta[property="og:description"]', 'content', desc);
    }
    setMeta('link[rel="canonical"]', 'href', SITE + (path === '/' ? '/' : path));
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex' : 'index,follow', () => {
      const m = document.createElement('meta'); m.setAttribute('name', 'robots'); return m;
    });
  }, [t, tkey, desc, path, noindex]);

  return null;
}
