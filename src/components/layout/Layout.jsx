import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Drawer from './Drawer';
import Footer from './Footer';
import Fab from './Fab';
import useBodyClass from '@/hooks/useBodyClass';
import { useParallax, useReveal, useScrollTop } from '@/hooks/usePageEffects';

export default function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useBodyClass(menuOpen, 'menu', 'lock');
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useScrollTop(pathname);
  useReveal(pathname);
  useParallax(pathname);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <Drawer onNavigate={() => setMenuOpen(false)} />
      <main><Outlet /></main>
      <Footer />
      <Fab />
    </>
  );
}
