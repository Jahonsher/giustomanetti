# giustomanetti.uz

Giusto Manetti Battiloro kompaniyasining Oʻzbekistondagi rasmiy vakili sayti.

**3.0 — premium redizayn** (`redesign` branch): NovaColor saytidagi kabi animatsiyalar,
Manetti ranglarida — Florensiya oltini (`#C39F5F`) va toʻq koʻk (`#182340`), fil suyagi panellar.
6 sahifa, 3 til (ru / uz / en).

🔗 Koʻrish (GitHub Pages): https://jahonsher.github.io/giustomanetti/

## Nimalar bor

- **Hero:** WebGL "suyuq oltin varaq" shaderi, sichqonchaga javob beradi.
- **3D yoʻnalishlar halqasi:** skroll bilan aylanadi (Qurilish, Katalog, Kosmetika, Galereya, E-shop, Vitrina).
- **Rasmlar WebGL'da:** skrollda egiladi, hover'da toʻlqin, ekranga kirganda ochiladi.
- **Matnlar** qatorma-qator / soʻzma-soʻz "sizib chiqadi"; sahifa oʻtish pardasi, preloader, kursor.
- **Liquid Glass navbar** (iOS uslubi): doim joyida, chetlari linzadek sinadi (Chrome),
  boʻlimni linzani surib almashtirish mumkin; menyu navbardan suyuqlikdek oqib tushadi.
- **Til tomchisi:** RU / UZ / EN — surib yoki bosib almashtiriladi.

## Ishga tushirish

```bash
npm install      # birinchi marta
npm run dev      # http://localhost:4180
npm run build    # giustomanetti.uz hostingi uchun -> dist/
npm run deploy   # GitHub Pages preview (/giustomanetti/ ostida)
```

## Papkalar

```
src/
  main.tsx, App.tsx        ilova va routerlar (/, /qurilish, /katalog, /kosmetika, /galereya, /aloqa)
  data/index.ts            rasmlar, kontaktlar, kartalar, galereya roʻyxatlari  <- shu yerda
  i18n/texts.ts            BARCHA matnlar, 3 tilda  <- matnni shu yerda oʻzgartiring
  i18n/index.tsx           til tizimi + redizayn qoʻshgan interfeys soʻzlari
  pages/                   har sahifa alohida
  components/              Header (navbar, menyu, til), Footer, Blocks (hero, kartalar,
                           galereya, CTA...), ContactForm, Reveal (matn animatsiyalari)
  gl/                      WebGL: hero shader, 3D halqa, rasm effektlari
  lib/                     silliq skroll (Lenis), GSAP, liquid glass sinishi
public/                    oʻzgarmasdan dist/ ga koʻchadi
  assets/img, reels, poster  rasmlar (webp + jpg)
  send.php                 ariza -> Telegram
  .htaccess                React Router uchun + eski .html manzillardan 301
_legacy/                   eski HTML versiya
```

## ⚠️ Birinchi oʻrnatishda: config.php

Telegram tokeni kodda **yoʻq**. Hostingda `public/config.example.php` dan nusxa olib
`config.php` yarating va token hamda chat ID ni yozing. Bu fayl `.gitignore` da.

Hozirgi bot: **@giustomanetti_bot**.

## Hostingga yuklash

`npm run build`, soʻng **`dist/` ichidagi hamma narsani** (yashirin `.htaccess` ham)
`public_html` ga yuklang. `send.php` uchun hostingda **PHP** boʻlishi shart. Boʻlmasa
(masalan GitHub Pages'da) forma zaxira yoʻlga oʻtadi: arizani nusxalaydi va Telegram ochadi.

## Eslatmalar

1. Bosh sahifadagi blok rasmlari manetti.com dan olingan (bosh kompaniya fotolari).
2. Raqamlar manetti.com dan: 400+ yil, 15 avlod, 70+ davlat, 29 tus.
3. Onlayn doʻkon (savat, toʻlov) yoʻq — "ariza qoldirish" ishlaydi.
4. Chetlardagi linza sinishi faqat Chrome'da; Safari/Firefox'da oddiy xira shisha.
