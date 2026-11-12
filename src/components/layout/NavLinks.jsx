/* Menyu havolalari routes.js dan olinadi. NavLink joriy sahifaga
   aria-current="page" ni oʻzi qoʻyadi (CSS shunga qarab belgilaydi). */
import { NavLink } from 'react-router-dom';
import { T } from '@/i18n';
import { ROUTES } from '@/routes';

export default function NavLinks({ onNavigate, filter = () => true, wrap }) {
  return ROUTES.filter(filter).map((r) => {
    const link = (
      <NavLink key={r.path} to={r.path} end={r.path === '/'} onClick={onNavigate}>
        <T k={r.nav} />
      </NavLink>
    );
    return wrap ? wrap(link, r.path) : link;
  });
}
