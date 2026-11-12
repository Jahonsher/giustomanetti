# giustomanetti.uz

Giusto Manetti Battiloro kompaniyasining Oʻzbekistondagi rasmiy vakili sayti.

**3.1 — "Maison" dizayni** (`maison` branch). NovaColor saytidan ataylab farqli uslub
(ikkala sayt bitta mijozga). Namuna: Awwwards "Site of the Day" — Marini 1897
(Italiya meros brendi) va Dolsten & Co. matn animatsiyasi.

🔗 Koʻrish (GitHub Pages): https://jahonsher.github.io/giustomanetti/

## Dizayn tili

- **Fil suyagi qogʻoz** fon, toʻq koʻk siyoh, Florensiya oltini; **Playfair Display** (Didone) + Inter.
- **Florensiya arkasi** shaklidagi rasm ramkalari; rasm ekranga kirganda ustiga **oltin varaq**
  qoʻyilib, koʻtariladi (zarhallash kabi).
- **Hero:** toʻliq ekranli WebGL slayd-shou — slaydlar oltin chiziqli qiya chok boʻylab almashadi.
- Matnlar **xiralikdan tiniqlashib** chiqadi (blur reveal); bayonot soʻzma-soʻz tiniqlashadi.
- **Ustma-ust taxlanuvchi kartalar** (yoʻnalishlar), **odometr** raqamlar, sudraladigan Instagram lentasi.
- Galereya: rasm oʻz joyidan toʻliq ekranga **kattalashib** ochiladi.
- Menyu: oltin varaq sahifadek **aylanib tushadi**; sahifa oʻtishi — qiya oltin varaq.
- Preloader: **1600 → bugun** yillar sanaladi. Kursor: **oltin varaq zarralari** toʻkiladi.

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
  components/              Header (+ menyu), Footer, Blocks (sahifa hero, kartalar, galereya,
                           taxlanuvchi kartalar, odometr, CTA...), Arch (arkali rasm),
                           Reveal (blur/qator animatsiyalari), Cursor, Preloader, Transition
  gl/HeroSlider.tsx        WebGL slayd-shou
  lib/motion.ts            silliq skroll (Lenis) + GSAP
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
4. Oldingi (NovaColor uslubidagi) versiya `redesign` branch'ida saqlangan.
