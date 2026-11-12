import { T } from '@/i18n';
import { EMAIL, MAP_LINK, PHONES } from '@/lib/env';
import Hero from '@/components/sections/Hero';
import ContactForm from '@/components/ContactForm';

const MAP_EMBED = 'https://www.google.com/maps?q=41.322984,69.276844&z=17&hl=ru&output=embed';
const YANDEX = 'https://yandex.uz/maps/?ll=69.276844%2C41.322984&z=17&pt=69.276844,41.322984';
const ext = { target: '_blank', rel: 'noopener' };

function InfoRow({ label, children }) {
  return (
    <div className="cinfo__i">
      <T className="cinfo__k" k={label} />
      {children}
    </div>
  );
}

export default function Aloqa() {
  return (
    <>
      <Hero image="img/wp/ig-325457552" eyebrow="c.eye" title="c.h" />

      <section className="sec">
        <div className="wrap split">
          <div className="rv">
            <T as="p" className="lede" k="c.p" />

            <div className="cinfo" style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
              <InfoRow label="ci.addr">
                <span className="cinfo__v"><T as="a" href={MAP_LINK} {...ext} k="ci.addrv" /></span>
              </InfoRow>
              <InfoRow label="ci.tel">
                <span className="cinfo__v">
                  {PHONES.map((p, i) => <span key={p.href}>{i > 0 && <br />}<a href={p.href}>{p.label}</a></span>)}
                </span>
              </InfoRow>
              <InfoRow label="ci.mail">
                <span className="cinfo__v"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
              </InfoRow>
              <InfoRow label="ci.hours">
                <T className="cinfo__v" k="ci.hoursv" />
              </InfoRow>
            </div>
          </div>

          <div className="rv d-1">
            <T as="h2" className="d3" k="c.fh" />
            <span className="flour" style={{ marginBottom: '2rem' }} />
            <ContactForm />
          </div>
        </div>

        <div className="wrap" style={{ marginTop: 'clamp(2.5rem,5vw,4rem)' }}>
          <div className="map rv">
            <iframe title="Giusto Manetti Uzbekistan" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={MAP_EMBED} />
          </div>
          <p className="maplinks rv d-1">
            <a className="alink" href={YANDEX} {...ext}>Yandex Maps</a>
            <a className="alink" href={MAP_LINK} {...ext}>Google Maps</a>
          </p>
        </div>
      </section>
    </>
  );
}
