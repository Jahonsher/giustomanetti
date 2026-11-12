import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageMeta from '@/components/PageMeta';
import { ROUTES } from '@/routes';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {ROUTES.map(({ path, Component, ...meta }) => (
          <Route
            key={path}
            path={path}
            element={<><PageMeta path={path} {...meta} /><Component /></>}
          />
        ))}
        <Route path="*" element={<><PageMeta path="/404" tkey="nf.h" noindex /><NotFound /></>} />
      </Route>
    </Routes>
  );
}
