import { Link } from 'react-router-dom';
import { T } from '@/i18n';
import { CONTACT_PATH, EMAIL, FB_URL, IG_URL, PHONES, TG_URL } from '@/lib/env';
import { IconFacebook, IconInstagram, IconMail, IconPhone, IconTag, IconTelegram } from '@/components/ui/Icons';
import { Mark } from './Header';
import NavLinks from './NavLinks';

const ext = { target: '_blank', rel: 'noopener' };

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div>
            <Mark as="span" style={{ textAlign: 'left' }} />
            <T as="p" k="ft.p" />
          </div>

          <div>
            <T as="h4" k="ft.prod" />
            <ul>
              <NavLinks filter={(r) => r.footer} wrap={(link, key) => <li key={key}>{link}</li>} />
            </ul>
          </div>

          <div>
            <T as="h4" k="ft.svc" />
            <ul className="soc">
              <li><Link to={CONTACT_PATH}><IconTag /><T k="cta.quote" /></Link></li>
              {PHONES.map((p) => <li key={p.href}><a href={p.href}><IconPhone />{p.label}</a></li>)}
              <li><a href={`mailto:${EMAIL}`}><IconMail />{EMAIL}</a></li>
            </ul>
          </div>

          <div>
            <T as="h4" k="ft.soc" />
            <ul className="soc">
              <li><a href={IG_URL} {...ext}><IconInstagram />Instagram</a></li>
              <li><a href={TG_URL} {...ext}><IconTelegram />Telegram</a></li>
              <li><a href={FB_URL} {...ext}><IconFacebook />Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="ftr__bot">
          <span>&copy; {new Date().getFullYear()} Giusto Manetti Battiloro Uzbekistan. <T k="ft.rights" /></span>
          <T k="ft.made" />
        </div>
      </div>
    </footer>
  );
}
