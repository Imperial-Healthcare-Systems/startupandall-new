/**
 * Two-panel mega-menu information architecture.
 *
 * Each top-level nav button (label must match the header's existing labels
 * verbatim) opens a two-panel menu: the LEFT panel lists intent-based
 * sub-categories, the RIGHT panel shows a curated set of services for the
 * highlighted sub-category. Service names are taken from lib/catalogue.ts and
 * link to /service/{svcSlugify(name)} — see lib/utils.ts. The [name, time]
 * lists are deliberately curated (≤7 each); the full catalogue lives on /services.
 *
 * Icons are raw SVG strings (rendered via <RawSvg />) so this stays a plain .ts
 * data module. Stroke style matches the existing catalogue/header icon set.
 */

export type NavService = [name: string, time: string];

export type NavSubcategory = {
  key: string;
  label: string;
  icon: string;
  blurb: string;
  services: NavService[];
};

export type NavMega = {
  label: string;
  icon: string;
  subs: NavSubcategory[];
};

// ---- Icon set (16px line icons, currentColor) ---------------------------------
const I = {
  rocket:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  envelope:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
  badge:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  trendUp:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  building:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>',
  star:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  swap:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  tag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  briefcase:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  copyright:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>',
  bulb:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>',
  receipt:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  fileText:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
  percent:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  scale:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="m5 7-3 6a3 3 0 0 0 6 0z"/><path d="m19 7-3 6a3 3 0 0 0 6 0z"/><path d="M7 21h10"/></svg>',
  link:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 14h2a2 2 0 0 0 0-4h-3l-3.5 3.5"/><path d="m7 18 1.5-1.5"/><path d="M19 14v-3a2 2 0 0 0-2-2"/><path d="M21 19v-2a4 4 0 0 0-4-4"/></svg>',
  refresh:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>',
  utensils:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-3 5v6c0 1.1.9 2 2 2h1zm0 0v7"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  award:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  store:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l1.5-4h17L22 7"/><path d="M2 7h20v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M4 10v10h16V10"/><path d="M9 20v-5h6v5"/></svg>',
  cpu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
  factory:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M4 20V8l6 4V8l6 4V8l4 2v10"/><path d="M8 20v-4M14 20v-4"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  coins:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/></svg>',
} as const;

export const NAV_MENU: NavMega[] = [
  {
    label: "Start a Business",
    icon: I.rocket,
    subs: [
      {
        key: "company-registration",
        label: "Company Registration",
        icon: I.building,
        blurb: "Pick the right structure and get incorporated.",
        services: [
          ["Private Limited Company", "10 days"],
          ["One Person Company (OPC)", "10 days"],
          ["Limited Liability Partnership (LLP)", "10 days"],
          ["Partnership Registration", "21 days"],
          ["Sole Proprietorship Registration", "7 days"],
          ["Public Limited Company", "10 days"],
        ],
      },
      {
        key: "special-entities",
        label: "Special Entities",
        icon: I.star,
        blurb: "Non-profit, cooperative and specialised structures.",
        services: [
          ["Section 8 Company Registration", "30 days"],
          ["Producer Company", "10 days"],
          ["Cooperative Society", "10 days"],
          ["Trust Registration", "10 days"],
          ["Microfinance Institution", "10 days"],
          ["Insurance Marketing Firm (IMF)", "10 days"],
        ],
      },
      {
        key: "subsidiary-conversion",
        label: "Subsidiary & Conversion",
        icon: I.swap,
        blurb: "Set up a subsidiary or convert your entity type.",
        services: [
          ["Subsidiary Company", "10 days"],
          ["Entity Conversion", "45 days"],
          ["OPC to Private Limited Conversion", "40 days"],
        ],
      },
      {
        key: "name-setup",
        label: "Name & Setup",
        icon: I.tag,
        blurb: "Reserve a name and open your business bank account.",
        services: [
          ["Reserve Unique Name (RUN)", "10 days"],
          ["RUN Extension", "10 days"],
          ["Bank Account Opening", "7 days"],
        ],
      },
    ],
  },
  {
    label: "Protect Your Brand",
    icon: I.shield,
    subs: [
      {
        key: "trademark",
        label: "Trademark",
        icon: I.shield,
        blurb: "Register and defend your brand name and logo.",
        services: [
          ["Trademark Registration", "Filing in 3 days"],
          ["Trademark Expedited", "180 days"],
          ["Trademark Objection Response", "15 days"],
          ["Trademark Opposition", "10 days"],
          ["Trademark Hearing", "15 days"],
          ["Trademark Renewal", "7 days"],
        ],
      },
      {
        key: "trademark-management",
        label: "Trademark Management",
        icon: I.briefcase,
        blurb: "Assign, license and manage existing trademarks.",
        services: [
          ["Trademark Licensing", "7 days"],
          ["Trademark Transfer", "30 days"],
          ["Trademark Mail Change", "10 days"],
          ["Attorney Addition for Trademark", "7 days"],
        ],
      },
      {
        key: "copyright",
        label: "Copyright",
        icon: I.copyright,
        blurb: "Protect creative works, logos and websites.",
        services: [
          ["Copyright Registration", "60 days"],
          ["Copyright Logo", "10 days"],
          ["Copyright of Website", "7 days"],
          ["Copyright Audit", "10 days"],
        ],
      },
      {
        key: "patent",
        label: "Patent",
        icon: I.bulb,
        blurb: "Secure your inventions and innovations.",
        services: [
          ["Patent Service", "7 days"],
          ["Patent Expedition Service", "10 days"],
        ],
      },
    ],
  },
  {
    label: "Tax & Compliance",
    icon: I.envelope,
    subs: [
      {
        key: "gst",
        label: "GST",
        icon: I.receipt,
        blurb: "GST registration, returns and amendments.",
        services: [
          ["GST Registration", "7 days"],
          ["GST Filings", "3 days"],
          ["LUT (Letter of Undertaking)", "5 days"],
          ["GST Amendment", "10 days"],
        ],
      },
      {
        key: "income-tax",
        label: "Income Tax",
        icon: I.percent,
        blurb: "ITR filing, audits and advance tax.",
        services: [
          ["Income Tax Return Filing", "5 days"],
          ["Individual ITR", "5 days"],
          ["Company ITR", "10 days"],
          ["Advance Tax", "5 days"],
          ["Tax Audit", "7 days"],
          ["Transfer Pricing Audit", "10 days"],
        ],
      },
      {
        key: "tds",
        label: "TDS",
        icon: I.fileText,
        blurb: "TDS returns, challans and foreign remittance.",
        services: [
          ["TDS Return Filing", "5 days"],
          ["TDS Challan Payment", "2 days"],
          ["15CA/CB Filing", "10 days"],
        ],
      },
      {
        key: "roc-mca",
        label: "ROC & MCA",
        icon: I.badge,
        blurb: "Annual ROC filings and director compliance.",
        services: [
          ["INC-20A Commencement of Business", "5 days"],
          ["AOC-4 Annual Return Filing", "7 days"],
          ["MGT-7A Annual Return Filing", "10 days"],
          ["DIR-3 KYC Filing", "8 days"],
          ["ADT-1 Filing", "3 days"],
          ["Director Addition", "14 days"],
        ],
      },
      {
        key: "llp-compliance",
        label: "LLP Compliance",
        icon: I.link,
        blurb: "Annual returns and changes for LLPs.",
        services: [
          ["Form 8 (Annual Return)", "10 days"],
          ["Form 11 (Annual Return)", "3 days"],
          ["Form 3", "10 days"],
          ["LLP Agreement Form 3 Filing", "5 days"],
          ["LLP Partner Addition Process", "35 days"],
          ["LLP Name Change", "15 days"],
        ],
      },
      {
        key: "accounting-advisory",
        label: "Accounting & Advisory",
        icon: I.bulb,
        blurb: "Bookkeeping, statements and CA support.",
        services: [
          ["Monthly Bookkeeping", "3 days"],
          ["Financial Statements", "10 days"],
          ["CA Consultation", "7 days"],
          ["Net Worth Certificate", "7 days"],
          ["Valuation Report", "15 days"],
          ["Agreement Drafting", "10 days"],
        ],
      },
      {
        key: "payroll-hr",
        label: "Payroll & HR",
        icon: I.refresh,
        blurb: "EPF, ESI, payroll and HR compliance.",
        services: [
          ["EPFO Filings", "7 days"],
          ["ESIC Filings", "7 days"],
          ["Payroll Processing", "5 days"],
          ["PT Registration Service", "10 days"],
        ],
      },
    ],
  },
  {
    label: "Licenses & Registrations",
    icon: I.badge,
    subs: [
      {
        key: "food-health-drugs",
        label: "Food, Health & Drugs",
        icon: I.utensils,
        blurb: "FSSAI, Ayush, drug and health-trade licences.",
        services: [
          ["FSSAI License", "10 days"],
          ["FSSAI Compliance", "7 days"],
        ],
      },
      {
        key: "import-export",
        label: "Import & Export",
        icon: I.globe,
        blurb: "IEC, ICEGATE and export-body registrations.",
        services: [
          ["Import Export Code (IEC)", "7 days"],
        ],
      },
      {
        key: "quality-standards",
        label: "Quality & Standards",
        icon: I.award,
        blurb: "ISO, barcodes and identifier registrations.",
        services: [
          ["ISO Certification", "10 days"],
          ["ISO Audit Service", "7 days"],
          ["Legal Entity Identifier (LEI)", "10 days"],
          ["GS1 Barcode Registration", "10 days"],
          ["Barcode Registration", "10 days"],
        ],
      },
      {
        key: "trade-environment",
        label: "Trade & Environment",
        icon: I.store,
        blurb: "Trade, shop, pollution and RERA approvals.",
        services: [
          ["Shops and Establishment Registration", "10 days"],
          ["RERA Agent Registration", "15 days"],
          ["RERA Promoter Registration", "20 days"],
        ],
      },
      {
        key: "tech-government",
        label: "Tech & Government",
        icon: I.cpu,
        blurb: "STPI, Softex, GeM and credit-guarantee schemes.",
        services: [
          ["GeM Registration", "7 days"],
        ],
      },
      {
        key: "msme-pt",
        label: "MSME & Professional Tax",
        icon: I.factory,
        blurb: "MSME (Udyam) and professional-tax registration.",
        services: [
          ["MSME / Udyam Registration", "10 days"],
          ["MSME Registration for Partnership", "7 days"],
          ["PT Registration Service", "10 days"],
          ["PT Filing", "5 days"],
        ],
      },
    ],
  },
  {
    label: "Grow & Funding",
    icon: I.trendUp,
    subs: [
      {
        key: "startup-recognition",
        label: "Startup Recognition",
        icon: I.rocket,
        blurb: "DPIIT recognition and startup tax benefits.",
        services: [
          ["Startup India Registration", "15 days"],
          ["MeitY Startup Hub", "10 days"],
          ["80-IAC Tax Benefit Application", "15 days"],
          ["Seed Funding Application", "30 days"],
        ],
      },
      {
        key: "funding-reports",
        label: "Funding & Reports",
        icon: I.coins,
        blurb: "Valuations, projections and funding readiness.",
        services: [
          ["Valuation Report", "15 days"],
          ["Projection Report", "10 days"],
          ["Net Worth Certificate", "7 days"],
          ["Financial and Legal Advisory", "30 days"],
        ],
      },
      {
        key: "ngo-charitable",
        label: "NGO & Charitable",
        icon: I.heart,
        blurb: "12A, 80G and CSR registrations for non-profits.",
        services: [
          ["12A Registration", "30 days"],
          ["80G Registration", "25 days"],
          ["Corporate Social Responsibility (CSR-1)", "10 days"],
          ["Darpan Filing", "7 days"],
          ["Trust Registration", "10 days"],
        ],
      },
      {
        key: "legal-agreements",
        label: "Legal & Agreements",
        icon: I.scale,
        blurb: "Founder, pledge and other legal agreements.",
        services: [
          ["Agreement Drafting", "10 days"],
          ["Agreement Notarization", "7 days"],
          ["Founder Agreement", "7 days"],
          ["Pledge Agreement Draft", "10 days"],
        ],
      },
    ],
  },
];
