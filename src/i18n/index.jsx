/* Til tizimi. Matnlarning oʻzi: src/i18n/texts.js
   Ishlatish:
     const { t, lang, setLang } = useLang();
     <T k="h.h1" as="h1" className="d2" />   // matnda <br> yoki <a> boʻlsa HTML sifatida chiqadi */

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import TXT from './texts';

export const LANGS = ['ru', 'uz', 'en'];
const STORE_KEY = 'gm-lang';

function initialLang() {
  try {
    const s = localStorage.getItem(STORE_KEY);
    if (s && TXT[s]) return s;
  } catch { /* maxfiy rejim */ }
  return 'ru';
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch { /* maxfiy rejim */ }
  }, [lang]);

  const t = useCallback((k) => {
    const d = TXT[lang] || TXT.ru;
    if (k in d) return d[k];
    return TXT.ru[k] ?? '';
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang() LangProvider ichida ishlatilishi kerak');
  return ctx;
}

/** Tarjima qilingan matnli element. */
export function T({ k, as = 'span', ...rest }) {
  const { t } = useLang();
  const v = t(k);
  if (v.includes('<')) return createElement(as, { ...rest, dangerouslySetInnerHTML: { __html: v } });
  return createElement(as, rest, v);
}
