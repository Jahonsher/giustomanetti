/* Telefondagi yon menyu. Ochiq/yopiq holati <body class="menu"> orqali (CSS). */
import NavLinks from './NavLinks';

export default function Drawer({ onNavigate }) {
  return (
    <nav className="drawer" aria-label="Menyu">
      <NavLinks onNavigate={onNavigate} />
    </nav>
  );
}
