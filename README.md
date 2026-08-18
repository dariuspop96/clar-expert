# CLAR EXPERT — site de prezentare

Site static multilingv (RO / EN / FR) pentru **CL Accounting Reporting SRL**, construit cu Astro
și livrat pe Cloudflare Pages. Paginile sunt prerendate; doar cele două endpoint-uri de formular
rulează pe edge.

## Pornire

```bash
npm install
cp .env.example .env      # completează RESEND_API_KEY
npm run dev               # http://localhost:4321
```

| Comandă | Efect |
| --- | --- |
| `npm run dev` | server de dezvoltare cu HMR |
| `npm run build` | build în `dist/` |
| `npm run preview` | rulează build-ul prin Wrangler (testează și `/api/*`) |
| `npm run deploy` | build + deploy pe Cloudflare Pages |

## Arhitectură

```
src/
├─ components/
│  ├─ ui/            Icon, Button, Card, SectionHeader, FormField, FormStatus
│  ├─ Header, Hero, Services, About, Pricing, QuoteForm, Contact, Footer
│  ├─ HomePage       compune secțiunile + scriptul de trimitere a formularelor
│  └─ LegalPage      shell pentru paginile juridice
├─ data/company.ts   date legale — sursă unică de adevăr
├─ i18n/             ro.json (referință) + en.json, fr.json + utils.ts
├─ layouts/Base      <head>, SEO, hreflang, JSON-LD
├─ lib/mail.ts       trimitere prin Resend + validare
├─ pages/            index + /en + /fr + pagini juridice + api/
└─ styles/           tokens.css (custom properties), global.css
```

### Decizii

**Fără framework CSS.** Designul are ~10 componente; tokenii din `tokens.css` plus
`<style>` cu scoping automat în Astro acoperă tot. Zero JS livrat, în afara a două
insule mici (meniu mobil, trimitere formular).

**Datele legale sunt separate de traduceri.** `data/company.ts` conține CUI, nr. J,
adrese, CECCAR. Nu ajung niciodată în fișierele de limbă — altfel ar diverge între versiuni.
Etichetele care le însoțesc („Sediu social:") sunt traduse; valorile nu.

**`ro.json` este contractul de tip.** `Dictionary = typeof ro` — dacă en/fr au chei lipsă,
TypeScript semnalează. `t()` aruncă în dev la o cheie inexistentă, ca să nu ajungă goluri
în producție.

**Formularele funcționează fără JS.** `<form method="POST">` face POST clasic și
redirecționează; cu JS activ, submit-ul e interceptat și starea de succes apare inline.
Protecție anti-spam prin honeypot (câmpul `website`).

## Internaționalizare

Româna e limba implicită și nu are prefix (`/`), engleza și franceza da (`/en/`, `/fr/`).

Pentru a traduce: completează `src/i18n/en.json` și `fr.json`. Valorile sunt momentan
prefixate cu `[EN TODO]` / `[FR TODO]` — un `grep` după "TODO]" arată ce a mai rămas.

Nu se traduc: denumirea firmei, CUI, nr. Reg. Com., adresele, nr. CECCAR. Termenii fiscali
români (ANAF, ONRC, D112, D394, REGES) se păstrează, eventual cu o glosă în paranteză.

## Formulare

Ambele endpoint-uri (`/api/quote`, `/api/contact`) trimit prin **Resend**. Secretele se
setează în Cloudflare, nu în cod:

```bash
wrangler pages secret put RESEND_API_KEY
wrangler pages secret put MAIL_TO      # office@clar-expert.com
wrangler pages secret put MAIL_FROM    # site@clar-expert.com (domeniu verificat în Resend)
```

Domeniul expeditor trebuie verificat în Resend (DKIM), altfel mailurile ajung în spam.

Pentru un nivel suplimentar anti-spam: adaugă Cloudflare Turnstile și validează
`TURNSTILE_SECRET` în endpoint înainte de `sendMail`.

## Deploy

1. `wrangler pages project create clar-expert`
2. Conectează repo-ul în dashboard-ul Cloudflare Pages (build: `npm run build`, output: `dist`)
3. Adaugă domeniul în *Custom domains* — DNS-ul se configurează automat dacă domeniul e pe Cloudflare
4. Setează secretele (vezi mai sus)

## Rămâne de completat

- [ ] Traducerile EN și FR (`src/i18n/`)
- [ ] Programul de lucru — `company.openingHours` (format schema.org, ex. `'Mo-Fr 09:00-17:00'`)
- [ ] Prezentarea echipei — `about.team.desc`
- [ ] Textele paginilor juridice — `src/pages/{privacy,cookies,terms}.astro` (înlocuiește slotul implicit)
- [ ] Logo-ul definitiv — `public/logo.svg` și `logo-light.svg` sunt reconstruite din brand;
      înlocuiește-le cu fișierele originale când le ai
- [ ] Banner de cookies (GDPR) — nu e inclus; recomandat un script propriu, minim, nu o soluție terță
