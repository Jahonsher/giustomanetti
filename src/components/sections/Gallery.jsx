/* Rasm toʻri (4 ustun). lightbox=true boʻlsa rasm bosilganda kattalashadi:
   ← → bilan varaqlanadi, Esc yopadi.
   items: [{ image, alt, wide }] */
import { useCallback, useEffect, useState } from 'react';
import Picture from '@/components/ui/Picture';
import { IconClose, IconNext, IconPrev } from '@/components/ui/Icons';
import useBodyClass from '@/hooks/useBodyClass';
import { asset } from '@/lib/env';

const delay = (i, cols) => (i % cols ? ` d-${i % cols}` : '');

function Lightbox({ items, index, onClose, onGo }) {
  const open = index !== null;
  useBodyClass(open, 'lock');

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onGo(-1);
      if (e.key === 'ArrowRight') onGo(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, onGo]);

  const it = open ? items[index] : null;
  return (
    <div
      className={'lb' + (open ? ' on' : '')}
      role="dialog" aria-modal="true" aria-label="Фото"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="lb__x" type="button" aria-label="Close" onClick={onClose}><IconClose /></button>
      <button className="lb__p" type="button" aria-label="Prev" onClick={() => onGo(-1)}><IconPrev /></button>
      <button className="lb__n" type="button" aria-label="Next" onClick={() => onGo(1)}><IconNext /></button>
      {it && <img decoding="async" src={asset(`${it.image}.jpg`)} alt={it.alt || ''} />}
    </div>
  );
}

export default function Gallery({ items, lightbox = false, rowStarts }) {
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const go = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  /* rowStarts: kechikish (d-1, d-2...) har qator boshida 0 dan boshlanishi uchun */
  let col = 0;
  return (
    <>
      <div className="grid4">
        {items.map((it, i) => {
          if (rowStarts?.includes(i)) col = 0;
          const d = rowStarts ? (col ? ` d-${col}` : '') : delay(i, 4);
          col++;
          return (
            <figure
              key={it.image + i}
              className={'gi' + (it.wide ? ' gi--w' : '') + ' rv' + d}
              style={{ margin: 0 }}
              onClick={lightbox ? () => setIndex(i) : undefined}
            >
              <Picture src={it.image} alt={it.alt} />
            </figure>
          );
        })}
      </div>
      {lightbox && <Lightbox items={items} index={index} onClose={close} onGo={go} />}
    </>
  );
}
