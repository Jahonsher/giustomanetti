import { Link } from 'react-router-dom';
import { T } from '@/i18n';
import Hero from '@/components/sections/Hero';

export default function NotFound() {
  return (
    <Hero image="img/wp/ig-338945148" eyebrow={null} title="nf.h">
      <T as="p" k="nf.p" />
      <div className="hero__cta">
        <T as={Link} className="btn btn--light" to="/" k="nf.cta" />
      </div>
    </Hero>
  );
}
