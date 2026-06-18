# Startup And All — Next.js

A Next.js (App Router + TypeScript) conversion of the original single-file
`index.html` build for **Startup And All** (company registration, GST,
trademarks & compliance services).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically generates all pages)
npm start
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **next/font** via the `geist` package (replaces the ~900 KB of base64 fonts
  that were embedded in the original file)
- Hand-written CSS ported verbatim to `app/globals.css` (design is pixel-identical)

## Structure

```
app/
  layout.tsx              Root layout: fonts, header, footer, ticker, FABs, global behaviors
  page.tsx                Home
  services/page.tsx       Catalogue (marketing HTML + React <ServiceCatalogue/>)
  service/[slug]/page.tsx 185 service detail pages (statically generated)
  quote/[slug]/page.tsx   Quote pages (services, packages, entity → calculator)
  cost-calculator/        Cost calculator page
  about | why-us | faqs | contact | privacy-policy | terms-of-use | refund-policy
  not-found.tsx

components/
  Header / Footer / DisclaimerTicker / FloatingActions   site chrome
  SiteChrome              reveal-on-scroll, header state, scroll bar, parallax, counters
  CostCalculator          full MCA-fee + 36-state stamp-duty calculator (React)
  ServiceCatalogue        search + category tabs + accordion
  Finder                  "find your setup" wizard
  ServiceDetail           service detail renderer
  QuotePage               instant / scoped quotation renderer
  HomeClient              drives the home hero canvas + injects reviews
  Faq / ContactForm enhancers, StaticHtml, RawSvg

lib/
  service-data.ts         185 services (data)
  catalogue.ts            catalogue, icons, package map
  finder-data.ts          finder wizard data
  calc.ts                 calculator domain logic (fee schedule, stamp duty)
  quote.ts / quote-data.ts quote model + package/entity data
  reviews-data.ts         reviews + platforms
  hero-canvas.ts          animated hero background
  pages.ts / pages.json   ported marketing/content HTML (hash links → real routes)
  email-config.ts         EmailJS config (demo mode)
```

## Routing

The original used a hash router (`#/service/:slug`, `#/quote/:slug`, …). These
are now real file-system routes. Internal links were rewritten accordingly.

## How content was ported

- **Data-driven pages** (service detail, catalogue, finder, calculator, quotes,
  reviews) are genuine React components built from typed data modules.
- **Marketing/content pages** (home, about, why-us, faqs, contact, policies)
  render their original, well-tuned markup via a small `StaticHtml` component
  (links pre-rewritten to real routes); interactive bits (FAQ accordion, contact
  form, hero canvas, reviews) are wired up by small client components.

## PDF proposal generator (OTP + email)

The client-side **PDF proposal generator** is fully ported:

- `lib/pdf.ts` — dependency-free PDF writer (real `.pdf`, works offline; embeds
  a JPEG logo from `lib/prop-logo.ts`).
- `lib/proposal.ts` — builds the quotation snapshot for both the calculator
  flow (entity + add-ons) and service/package quotes.
- `lib/email.ts` + `lib/email-config.ts` — EmailJS integration. Ships in
  **`demo` mode**: OTP send/proposal/lead emails are logged and resolved
  locally (the test OTP is shown on screen), so the whole journey works with no
  backend. To go LIVE: fill the EmailJS keys in `lib/email-config.ts` and set
  `mode: 'live'`.
- `components/ProposalGenerator.tsx` — the OTP → verify → PDF + email state
  machine. Used two ways:
  - **Cost calculator** ([CostCalculator] + `components/LeadGate.tsx`): a
    lead-capture gate locks the calculator until name/email/mobile are entered
    (stored in `sessionStorage`); once captured, the proposal is generated
    one-click with no re-prompt.
  - **Service/package quotes** (`components/QuoteProposal.tsx`): full OTP email
    verification before the PDF is generated.
