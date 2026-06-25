"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const caret = (
  <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

type MegaItem = { name: string; time: string; slug: string };
type MegaGroup = { label: string; icon: React.ReactNode; items: MegaItem[] };

const MEGA: MegaGroup[] = [
  {
    label: "Start a Business",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    items: [
      { name: "Private Limited Company", time: "10 days", slug: "private-limited-company" },
      { name: "Limited Liability Partnership (LLP)", time: "10 days", slug: "limited-liability-partnership-llp" },
      { name: "One Person Company (OPC)", time: "10 days", slug: "one-person-company-opc" },
      { name: "Partnership Registration", time: "21 days", slug: "partnership-registration" },
      { name: "Sole Proprietorship Registration", time: "7 days", slug: "sole-proprietorship-registration" },
      { name: "Section 8 Company Registration", time: "30 days", slug: "section-8-company-registration" },
      { name: "Startup India Registration", time: "15 days", slug: "startup-india-registration" },
      { name: "Public Limited Company", time: "10 days", slug: "public-limited-company" },
    ],
  },
  {
    label: "Protect Your Brand",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    items: [
      { name: "Trademark Registration", time: "Filing in 3 days", slug: "trademark-registration" },
      { name: "Trademark Objection Response", time: "15 days", slug: "trademark-objection-response" },
      { name: "Trademark Renewal", time: "7 days", slug: "trademark-renewal" },
      { name: "Copyright Registration", time: "60 days", slug: "copyright-registration" },
      { name: "Copyright Logo", time: "10 days", slug: "copyright-logo" },
      { name: "Patent Service", time: "7 days", slug: "patent-service" },
    ],
  },
  {
    label: "Tax & Compliance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </svg>
    ),
    items: [
      { name: "GST Registration", time: "7 days", slug: "gst-registration" },
      { name: "GSTR-1 Filing", time: "3 days", slug: "gstr-1-filing" },
      { name: "GSTR-3B Filing", time: "5 days", slug: "gstr-3b-filing" },
      { name: "GSTR-9 Annual Return", time: "15 days", slug: "gstr-9-annual-return" },
      { name: "Income Tax Return Filing", time: "5 days", slug: "income-tax-return-filing" },
      { name: "TDS Return Filing", time: "5 days", slug: "tds-return-filing" },
      { name: "AOC-4 Annual Return Filing", time: "7 days", slug: "aoc-4-annual-return-filing" },
      { name: "MGT-7A Annual Return Filing", time: "10 days", slug: "mgt-7a-annual-return-filing" },
      { name: "Monthly Bookkeeping", time: "3 days", slug: "monthly-bookkeeping" },
    ],
  },
  {
    label: "Licenses & Registrations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    items: [
      { name: "MSME Registration", time: "10 days", slug: "msme-registration" },
      { name: "Import Export Code (IEC)", time: "7 days", slug: "import-export-code-iec" },
      { name: "FSSAI License", time: "10 days", slug: "fssai-license" },
      { name: "ISO Certification", time: "10 days", slug: "iso-certification" },
      { name: "Trade License Registration", time: "14 days", slug: "trade-license-registration" },
      { name: "Digital Signature Certificate", time: "10 days", slug: "digital-signature-certificate" },
      { name: "GeM Registration", time: "7 days", slug: "gem-registration" },
      { name: "RERA Registration", time: "20 days", slug: "rera-registration" },
    ],
  },
  {
    label: "Grow & Funding",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    items: [
      { name: "Startup India Registration", time: "15 days", slug: "startup-india-registration" },
      { name: "80-IAC Tax Benefit Application", time: "15 days", slug: "80-iac-tax-benefit-application" },
      { name: "Seed Funding Application", time: "30 days", slug: "seed-funding-application" },
      { name: "12A Registration", time: "30 days", slug: "12a-registration" },
      { name: "80G Registration", time: "25 days", slug: "80g-registration" },
      { name: "Valuation Report", time: "15 days", slug: "valuation-report" },
      { name: "Projection Report", time: "10 days", slug: "projection-report" },
    ],
  },
];

const MOBILE_LINKS = [
  { href: "/services", label: "Start a Business" },
  { href: "/services", label: "Protect Your Brand" },
  { href: "/services", label: "Tax & Compliance" },
  { href: "/services", label: "Licenses & Registrations" },
  { href: "/services", label: "Grow & Funding" },
  { href: "/services", label: "All Services & Pricing" },
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header id="hdr">
        <div className="wrap hdr-in">
          <Link href="/" className="hdr-logo" aria-label="StartupAndAll home">
            <Image src="/img/f4fe665155.png" alt="StartupAndAll — start, protect and run your business" width={180} height={42} priority />
          </Link>
          <nav className="hdr-nav">
            {MEGA.map((group) => (
              <div className="nav-mega" key={group.label}>
                <button className="navlink nav-mega-btn">
                  {group.label}
                  {caret}
                </button>
                <div className="mm-panel">
                  <div className="mm-head">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                  <div className="mm-grid">
                    {group.items.map((it) => (
                      <Link href={`/service/${it.slug}`} className="mm-item" key={group.label + it.slug}>
                        <span className="mm-item-dot" />
                        <span className="mm-item-name">{it.name}</span>
                        <span className="mm-item-time">{it.time}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/services" className="mm-all">
                    View all services {arrow}
                  </Link>
                </div>
              </div>
            ))}
            <Link href="/cost-calculator" className={`navlink${isActive("/cost-calculator") ? " active" : ""}`}>
              Cost Calculator
            </Link>
            <Link href="/contact" className={`navlink${isActive("/contact") ? " active" : ""}`}>
              Contact
            </Link>
          </nav>
          <Link href="/contact" className="btn-primary hdr-cta">
            Get a Free Consultation {arrow}
          </Link>
          <button
            id="burger"
            className={`burger${open ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`}>
        {MOBILE_LINKS.map((l, i) => (
          <Link href={l.href} className="m-link" key={i} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="btn-primary m-cta" onClick={() => setOpen(false)}>
          Get a Free Consultation {arrow}
        </Link>
      </div>
    </>
  );
}
