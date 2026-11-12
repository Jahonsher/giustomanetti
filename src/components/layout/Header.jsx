import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LANGS, T, useLang } from '@/i18n';
import { CONTACT_PATH } from '@/lib/env';
import NavLinks from './NavLinks';

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="group" aria-label="Til">
      {LANGS.map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l[0].toUpperCase() + l.slice(1)}
        </button>
      ))}
    </div>
  );
}

export function Mark({ as: Tag = Link, ...rest }) {
  return (
    <Tag className="mark" {...rest}>
      <b>Giusto Manetti</b>
      <span>Battiloro · Firenze 1600</span>
    </Tag>
  );
}

export default function Header({ menuOpen, onToggleMenu }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'hdr' + (stuck ? ' stuck' : '')}>
      <div className="wrap">
        <div className="hdr__in">
          <div className="hdr__l"><LangSwitch /></div>

          <Mark to="/" />

          <div className="hdr__r">
            <T as={Link} className="btn btn--fill" to={CONTACT_PATH} k="cta.quote" />
            <button className="burger" type="button" aria-label="Menu" aria-expanded={menuOpen} onClick={onToggleMenu}>
              <i /><i /><i />
            </button>
          </div>
        </div>
        <nav className="nav" aria-label="Asosiy menyu"><NavLinks /></nav>
      </div>
    </header>
  );
}
