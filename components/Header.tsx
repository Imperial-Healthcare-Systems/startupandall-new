"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RawSvg from "./RawSvg";
import { NAV_MENU } from "@/lib/nav-menu";
import { svcSlugify } from "@/lib/utils";

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

// Move keyboard focus between the left-panel category buttons with the arrow keys.
function handleCatsKey(e: React.KeyboardEvent<HTMLDivElement>) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  const btns = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button.mm-cat"));
  const idx = btns.indexOf(document.activeElement as HTMLButtonElement);
  if (idx === -1) return;
  e.preventDefault();
  const next = e.key === "ArrowDown" ? (idx + 1) % btns.length : (idx - 1 + btns.length) % btns.length;
  btns[next]?.focus();
}

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
  // Which sub-category is highlighted in each mega menu's right panel (keyed by
  // top-level label; defaults to the first sub-category).
  const [activeSub, setActiveSub] = useState<Record<string, number>>({});
  // Which top-level group is currently open — tracked only to drive aria-expanded;
  // the panel's actual visibility is handled by CSS (hover / :focus-within).
  // All panels share one fixed zone anchored to the nav (see .mm-panel in CSS),
  // so switching categories swaps content in place with no repositioning.
  const [openGroup, setOpenGroup] = useState<string | null>(null);

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
            <Image src="/img/f4fe665155.png" alt="StartupAndAll — start, protect and run your business" width={428} height={220} priority />
          </Link>
          <nav className="hdr-nav">
            {NAV_MENU.map((group) => {
              const activeIdx = activeSub[group.label] ?? 0;
              const active = group.subs[activeIdx] ?? group.subs[0];
              return (
                <div
                  className="nav-mega"
                  key={group.label}
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup((g) => (g === group.label ? null : g))}
                  onFocus={() => setOpenGroup(group.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  <button
                    className="navlink nav-mega-btn"
                    aria-haspopup="true"
                    aria-expanded={openGroup === group.label}
                  >
                    {group.label}
                    {caret}
                  </button>
                  <div className="mm-panel mm-two">
                    <div className="mm-cats" role="tablist" aria-label={group.label} onKeyDown={handleCatsKey}>
                      {group.subs.map((sub, i) => {
                        const isOn = i === activeIdx;
                        return (
                          <button
                            type="button"
                            key={sub.key}
                            className={`mm-cat${isOn ? " active" : ""}`}
                            role="tab"
                            aria-selected={isOn}
                            tabIndex={isOn ? 0 : -1}
                            onMouseEnter={() => setActiveSub((s) => ({ ...s, [group.label]: i }))}
                            onFocus={() => setActiveSub((s) => ({ ...s, [group.label]: i }))}
                          >
                            <RawSvg className="mm-cat-ic" html={sub.icon} />
                            <span className="mm-cat-label">{sub.label}</span>
                            <span className="mm-cat-count">{sub.services.length}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mm-sub" role="tabpanel" aria-label={active.label}>
                      <div className="mm-head">
                        <RawSvg html={active.icon} />
                        <span>{active.label}</span>
                      </div>
                      <p className="mm-blurb">{active.blurb}</p>
                      <div className="mm-grid">
                        {active.services.map(([name, time]) => (
                          <Link href={`/service/${svcSlugify(name)}`} className="mm-item" key={name}>
                            <span className="mm-item-dot" />
                            <span className="mm-item-name">{name}</span>
                            <span className="mm-item-time">{time}</span>
                          </Link>
                        ))}
                      </div>
                      <Link href="/services" className="mm-all">
                        View all {group.label} services {arrow}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
