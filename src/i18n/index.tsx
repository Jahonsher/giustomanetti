import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import TXT from './texts'
import { LANGS, type Lang } from '../data'

/* Interface words added by the redesign (the site's own copy stays in texts.ts). */
const UI: Record<Lang, Record<string, string>> = {
  ru: {
    menu: 'Меню',
    close: 'Закрыть',
    view: 'Смотреть',
    open: 'Открыть',
    tagline: 'Firenze · dal 1600',
    'hero.scroll': 'Листайте вниз',
    'hero.loc': 'Ташкент · Юнусабад',
    'ring.label': 'Направления',
    'ring.hint': 'Листайте — направления вращаются',
    'stats.label': 'В цифрах',
    'work.label': 'Мастерская',
    'work.h': 'Лист, кисть и болюс',
    'top': 'Наверх',
    'lang': 'Язык',
    photos: 'фото',
  },
  uz: {
    menu: 'Menyu',
    close: 'Yopish',
    view: 'Koʻrish',
    open: 'Ochish',
    tagline: 'Firenze · dal 1600',
    'hero.scroll': 'Pastga aylantiring',
    'hero.loc': 'Toshkent · Yunusobod',
    'ring.label': 'Yoʻnalishlar',
    'ring.hint': 'Aylantiring — yoʻnalishlar aylanadi',
    'stats.label': 'Raqamlarda',
    'work.label': 'Ustaxona',
    'work.h': 'Varaq, moʻyqalam va bolus',
    'top': 'Yuqoriga',
    'lang': 'Til',
    photos: 'foto',
  },
  en: {
    menu: 'Menu',
    close: 'Close',
    view: 'View',
    open: 'Open',
    tagline: 'Firenze · dal 1600',
    'hero.scroll': 'Scroll down',
    'hero.loc': 'Tashkent · Yunusabad',
    'ring.label': 'Directions',
    'ring.hint': 'Scroll — the directions turn',
    'stats.label': 'In numbers',
    'work.label': 'Workshop',
    'work.h': 'Leaf, brush and bole',
    'top': 'Back to top',
    'lang': 'Language',
    photos: 'photos',
  },
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }
const LangContext = createContext<Ctx | null>(null)
const STORE_KEY = 'gm-lang' // same key as the previous site, so visitors keep their language

const initial = (): Lang => {
  try {
    const s = localStorage.getItem(STORE_KEY) as Lang | null
    if (s && LANGS.includes(s)) return s
  } catch {
    /* private mode */
  }
  return 'ru'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial)
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORE_KEY, lang)
    } catch {
      /* private mode */
    }
  }, [lang])
  const t = useCallback((k: string) => UI[lang][k] ?? TXT[lang][k] ?? TXT.ru[k] ?? UI.ru[k] ?? k, [lang])
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang outside LangProvider')
  return ctx
}

/** Strip the few inline tags used in texts (<br>, <a>) for plain-text places. */
export const plain = (s: string) => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')

/** Text that may contain <br>/<a> from texts.ts. */
export function T({ k, as: Tag = 'span', className }: { k: string; as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'; className?: string }) {
  const { t } = useLang()
  const v = t(k)
  return v.includes('<') ? <Tag className={className} dangerouslySetInnerHTML={{ __html: v }} /> : <Tag className={className}>{v}</Tag>
}
