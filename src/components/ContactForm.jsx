/* Ariza formasi. send.php ga yuboradi (u Telegram botga joʻnatadi).
   send.php ishlamasa (PHP yoʻq, internet uzildi): matnni nusxalab Telegramni ochadi. */
import { useRef, useState } from 'react';
import { T, useLang } from '@/i18n';
import { TG_URL } from '@/lib/env';

const ENDPOINT = `${import.meta.env.BASE_URL}send.php`;
const OPTIONS = ['f.o1', 'f.o2', 'f.o3', 'f.o4'];

export default function ContactForm() {
  const { t, lang } = useLang();
  const formRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);   // 'f.ok' | 'f.ok2' | 'f.err'

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(formRef.current);
    const data = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      interest: String(fd.get('interest') || ''),
      message: String(fd.get('message') || '').trim(),
      website: String(fd.get('website') || ''),
      lang,
      page: (location.hostname || 'local') + location.pathname
    };
    if (!data.name || !data.phone) { setStatus('f.err'); return; }

    const text = 'Giusto Manetti, ' +
      (lang === 'uz' ? 'yangi ariza' : lang === 'en' ? 'new request' : 'новая заявка') + '\n' +
      data.name + '\n' + data.phone +
      (data.interest ? '\n' + data.interest : '') +
      (data.message ? '\n' + data.message : '');

    setBusy(true);
    let sent = false;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      const j = r.ok ? await r.json().catch(() => null) : null;
      sent = !!(j && j.ok);
    } catch { sent = false; }
    setBusy(false);

    if (sent) {
      setStatus('f.ok');
      formRef.current.reset();
    } else {
      try { navigator.clipboard?.writeText(text); } catch { /* ruxsat yoʻq */ }
      setStatus('f.ok2');
      window.open(TG_URL, '_blank', 'noopener');
    }
  }

  return (
    <form className="form" ref={formRef} noValidate style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
      <div className="f2">
        <div className="f">
          <T as="label" htmlFor="fn" k="f.name" />
          <input id="fn" name="name" type="text" autoComplete="name" placeholder={t('f.phname')} required />
        </div>
        <div className="f">
          <T as="label" htmlFor="fp" k="f.tel" />
          <input id="fp" name="phone" type="tel" autoComplete="tel" placeholder={t('f.phtel')} required />
        </div>
      </div>
      <div className="f">
        <T as="label" htmlFor="fi" k="f.int" />
        <select id="fi" name="interest">
          {OPTIONS.map((k) => <option key={k}>{t(k)}</option>)}
        </select>
      </div>
      <div className="f">
        <T as="label" htmlFor="fm" k="f.msg" />
        <textarea id="fm" name="message" rows={3} />
      </div>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <T as="button" className="btn btn--fill" type="submit" disabled={busy} k="f.send" />
      <T as="p" className="body" style={{ fontSize: '.86rem' }} k="f.note" />
      <p className={'ok' + (status ? ' on' : '')}>{status ? t(status) : ''}</p>
    </form>
  );
}
