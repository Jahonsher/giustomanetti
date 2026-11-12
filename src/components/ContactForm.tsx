/* Request form. Posts to send.php (which forwards to the Telegram bot —
 * the token lives only in config.php on the hosting). If send.php isn't
 * reachable (no PHP, e.g. on GitHub Pages) the request text is copied and
 * Telegram opens, exactly like the previous site. */
import { useRef, useState, type FormEvent } from 'react'
import { CONTACT } from '../data'
import { T, useLang } from '../i18n'

const ENDPOINT = `${import.meta.env.BASE_URL}send.php`
const OPTIONS = ['f.o1', 'f.o2', 'f.o3', 'f.o4']

const field =
  'peer w-full border-0 border-b border-line bg-transparent pb-3 pt-7 font-display text-xl text-ink outline-none transition-colors duration-500 placeholder:text-transparent focus:border-gold md:text-2xl'
const floating =
  'meta pointer-events-none absolute left-0 top-0 transition-all duration-500 peer-placeholder-shown:top-8 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[0.6875rem] peer-focus:uppercase peer-focus:tracking-[0.22em]'

export function ContactForm() {
  const { t, lang } = useLang()
  const form = useRef<HTMLFormElement>(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<'' | 'f.ok' | 'f.ok2' | 'f.err'>('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    const fd = new FormData(form.current!)
    const data = {
      name: String(fd.get('name') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      interest: String(fd.get('interest') || ''),
      message: String(fd.get('message') || '').trim(),
      website: String(fd.get('website') || ''),
      lang,
      page: (location.hostname || 'local') + location.pathname,
    }
    if (!data.name || !data.phone) {
      setStatus('f.err')
      return
    }
    const text =
      'Giusto Manetti, ' +
      (lang === 'uz' ? 'yangi ariza' : lang === 'en' ? 'new request' : 'новая заявка') +
      '\n' +
      data.name +
      '\n' +
      data.phone +
      (data.interest ? '\n' + data.interest : '') +
      (data.message ? '\n' + data.message : '')

    setBusy(true)
    let sent = false
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 12000)
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: ctrl.signal })
      clearTimeout(timer)
      const j = r.ok ? await r.json().catch(() => null) : null
      sent = !!(j && j.ok)
    } catch {
      sent = false
    }
    setBusy(false)
    if (sent) {
      setStatus('f.ok')
      form.current!.reset()
    } else {
      try {
        await navigator.clipboard?.writeText(text)
      } catch {
        /* no permission */
      }
      setStatus('f.ok2')
      window.open(CONTACT.telegram, '_blank', 'noopener')
    }
  }

  return (
    <form ref={form} noValidate onSubmit={onSubmit} className="space-y-10">
      <div className="grid gap-10 md:grid-cols-2">
        <label className="relative block">
          <input name="name" type="text" autoComplete="name" required placeholder={t('f.phname')} className={field} />
          <span className={floating}>{t('f.name')}</span>
        </label>
        <label className="relative block">
          <input name="phone" type="tel" autoComplete="tel" required placeholder={t('f.phtel')} className={field} />
          <span className={floating}>{t('f.tel')}</span>
        </label>
      </div>
      <div role="radiogroup" aria-label={t('f.int')}>
        <span className="meta mb-3 block">{t('f.int')}</span>
        <span className="flex flex-wrap gap-2">
          {OPTIONS.map((k, i) => (
            <span key={k}>
              <input type="radio" name="interest" value={t(k)} defaultChecked={i === 0} id={`int-${k}`} className="peer sr-only" />
              <label
                htmlFor={`int-${k}`}
                className="block cursor-pointer rounded-full border border-line px-4 py-2 font-display text-[0.95rem] italic text-ink transition-colors duration-500 peer-checked:border-gold peer-checked:bg-gold peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-gold"
              >
                {t(k)}
              </label>
            </span>
          ))}
        </span>
      </div>
      <label className="relative block">
        <textarea name="message" rows={3} placeholder={t('f.msg')} className={`${field} resize-none`} data-lenis-prevent />
        <span className={floating}>{t('f.msg')}</span>
      </label>
      {/* honeypot for bots */}
      <input className="hidden" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-8">
        <button
          type="submit"
          disabled={busy}
          className="gold-leaf grid h-32 w-32 place-items-center rounded-full text-navy shadow-[0_18px_40px_-18px_rgba(90,60,10,0.7)] transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-105 active:scale-95 disabled:opacity-50"
          data-cursor="link"
        >
          <span className="meta !text-navy">{t('f.send')}</span>
        </button>
        <div className="max-w-sm space-y-3 text-sm">
          <T as="p" k="f.note" className="text-mute [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4" />
          <p aria-live="polite" className={`font-display italic ${status === 'f.err' ? 'text-red-700' : 'text-gold'}`}>
            {status ? t(status) : ''}
          </p>
        </div>
      </div>
    </form>
  )
}
