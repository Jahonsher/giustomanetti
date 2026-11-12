# giustomanetti.uz

Giusto Manetti Battiloro kompaniyasining Oʻzbekistondagi rasmiy vakili sayti.
manetti.com uslubida: yorugʻ fon, Zilla Slab + Montserrat shriftlari,
oltin (`#C39F5F`) va koʻk (`#182340`) ranglar. 6 sahifa, 3 til, video fonlar.

React (Vite + React Router) da yozilgan bir sahifali ilova (SPA).
Har sahifa alohida komponent, umumiy qismlar qayta ishlatiladi.

---

## Ishga tushirish

```bash
npm install      # birinchi marta
npm run dev      # http://localhost:4180
npm run build    # hostingga tayyor nusxa -> dist/
npm run preview  # dist/ ni tekshirish
```

## Sahifalar (routerlar)

| Manzil | Komponent | Nima |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Bosh sahifa |
| `/qurilish` | `src/pages/Qurilish.jsx` | Qurilish va dekor |
| `/katalog` | `src/pages/Katalog.jsx` | B2B katalog, 6 guruh |
| `/kosmetika` | `src/pages/Kosmetika.jsx` | Kosmetik oltin |
| `/galereya` | `src/pages/Galereya.jsx` | Galereya, rasm kattalashadi (← → Esc) |
| `/aloqa` | `src/pages/Aloqa.jsx` | Aloqa, ariza formasi, karta |
| boshqa | `src/pages/NotFound.jsx` | 404 |

Barcha sahifalar roʻyxati: `src/routes.js`. Menyu, footer va sahifa
sarlavhasi shu roʻyxatdan avtomatik olinadi.

## Papkalar

```
index.html                 Vite kirish nuqtasi (shriftlar, meta)
src/
  main.jsx                 ilovani ishga tushiradi
  App.jsx                  routerlar
  routes.js                sahifalar roʻyxati  <- yangi sahifa shu yerga
  pages/                   har sahifa alohida
  components/
    layout/                Header, Drawer (mobil menyu), Footer, Fab
    sections/              Hero, Banner, CardGrid, Gallery, Split, Facts, Marquee, CtaBand
    ui/                    Picture (webp+jpg), Icons
    ContactForm.jsx        ariza -> send.php -> Telegram
    PageMeta.jsx           title / description / canonical
  hooks/                   paydo boʻlish, parallaks, body klasslari
  i18n/texts.js            BARCHA matnlar, 3 tilda   <- matnni shu yerda oʻzgartiring
  i18n/index.jsx           useLang(), <T k="..."/>
  lib/env.js               telefon, e-mail, havolalar
  styles/m.css             dizayn
public/                    oʻzgarmasdan dist/ ga koʻchadi
  assets/img, reels, poster  rasmlar
  send.php                 ariza -> Telegram
  .htaccess                React Router uchun + eski .html manzillardan 301
_legacy/                   eski HTML versiya (scroll.html, classic.html va h.k.)
```

## ⚠️ Birinchi oʻrnatishda: config.php

Telegram tokeni kodda **yoʻq**. Saytni ishga tushirishdan oldin:

```bash
copy public\\config.example.php public\\config.php
```

Soʻng `config.php` ni oching va token hamda chat ID ni yozing.
Bu fayl `.gitignore` da, shuning uchun GitHub'ga hech qachon tushmaydi.

Hozirgi bot: **@giustomanetti_bot**, arizalar Jahongir (@Xikmatilloyev) ga keladi.

---

## Matnni oʻzgartirish

Hamma matn `src/i18n/texts.js` ichida, `ru` / `uz` / `en` boʻlimlariga ajratilgan.
Masalan `"h.h1"` — bosh sahifadagi katta sarlavha. Komponentda: `<T k="h.h1" as="h1" />`.

## Yangi sahifa qoʻshish

1. `src/pages/Yangi.jsx` yarating (boshqa sahifadan nusxa olish oson).
2. `src/routes.js` ga bitta qator qoʻshing: `path`, `Component`, `nav`, `tkey`, `desc`.
3. Matnlarni `src/i18n/texts.js` ga 3 tilda yozing.

---

## Hostingga yuklash

`npm run build` qiling, soʻng **`dist/` ichidagi hamma narsani** (yashirin
`.htaccess` ham) `public_html` (yoki `www`) papkasiga yuklang.
`config.php` ni hostingda QOʻLDA yarating, u GitHub'da yoʻq.

`.htaccess` kerak: busiz `/katalog` kabi manzil sahifa yangilanganda 404 beradi.
Eski `katalog.html` kabi manzillar avtomatik yangisiga yoʻnaltiriladi.

`send.php` uchun hostingda **PHP** boʻlishi shart. Boʻlmasa forma
avtomatik zaxira yoʻlga oʻtadi: arizani nusxalaydi va Telegram ochadi.

---

## Eslatmalar

1. **Bosh sahifadagi blok rasmlari manetti.com dan olingan** (`assets/img/`).
   Bular bosh kompaniyaning oʻz marketing fotolari; rasmiy vakil sifatida
   ishlatish odatiy, lekin Manetti'dan bir ogʻiz tasdiq olib qoʻyish maʼqul.
2. **Eski saytdagi rasmlar koʻchirildi** (`assets/img/wp/`). Endi sayt
   `giustomanetti.uz/wp-content/` ga bogʻliq emas: eski WordPress oʻchirilsa
   ham hech narsa buzilmaydi.
3. **Raqamlar manetti.com dan olingan**: 400+ yil, 15 avlod, 70+ davlat, 29 tus.
4. **Onlayn doʻkon (savat, toʻlov) yoʻq.** manetti.com da ESHOP bor, bizda
   uning oʻrniga "ariza qoldirish" ishlaydi. Haqiqiy doʻkon alohida ish.
