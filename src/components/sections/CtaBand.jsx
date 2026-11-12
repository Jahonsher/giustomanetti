/* Sahifa oxiridagi toʻq koʻk chiziq: qisqa matn + "Narx soʻrash" tugmasi. */
import { Link } from 'react-router-dom';
import { T } from '@/i18n';
import { CONTACT_PATH } from '@/lib/env';

export default function CtaBand({ text, cta = 'cta.quote', to = CONTACT_PATH }) {
  return (
    <section className="sec sec--navy sec--tight">
      <div className="wrap center">
        <T as="p" className="lede rv" style={{ color: 'rgba(243,239,228,.84)' }} k={text} />
        <p className="rv d-1" style={{ marginTop: '1.8rem' }}>
          <T as={Link} className="btn btn--light" to={to} k={cta} />
        </p>
      </div>
    </section>
  );
}
