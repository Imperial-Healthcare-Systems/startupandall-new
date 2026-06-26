import Link from "next/link";
import type { Service } from "@/lib/types";
import { DocsInfographic } from "@/lib/docs";
import { PKG_QUOTES } from "@/lib/quote-data";

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const clock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, display: "inline", verticalAlign: -2, marginRight: 5 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const STEP_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <polyline points="14 3 14 8 19 8" />
    <polyline points="9 14 11 16 15 12" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="6" />
    <polyline points="6 12 12 6 18 12" />
    <line x1="5" y1="3" x2="19" y2="3" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" />
    <polyline points="9 9 11 11 15 7" />
    <path d="M9 14.5 7.5 22 12 19.5 16.5 22 15 14.5" />
  </svg>,
];

const layers = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const star = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
  </svg>
);

const info = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const tag = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

// Incorporation packages shown on eligible sub-service pages. Tier copy, prices,
// deliverables and savings all come from PKG_QUOTES — the single source of truth.
type IncorpPkg = {
  name: string;
  price: string;
  note: string;
  deliverables: readonly string[];
  alaCarte: string;
  save: string;
};
const PKG = PKG_QUOTES as unknown as Record<string, IncorpPkg>;

const INCORP_TIERS = [
  { slug: "pkg-essential", variant: "essential", recommended: false },
  { slug: "pkg-professional", variant: "professional", recommended: true },
  { slug: "pkg-elite", variant: "elite", recommended: false },
] as const;

export default function ServiceDetail({ service: d }: { service: Service }) {
  const nSteps = d.steps.length;
  // Show the incorporation packages only on the Private Limited Company page.
  const showPackages = d.slug === "private-limited-company";
  return (
    <>
      <section className="sp-hero">
        <div className="hero-mesh" />
        <div className="wrap">
          <nav className="sp-crumb">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{d.name}</span>
          </nav>
          <div className="sp-hero-grid">
            <div>
              <span className="sp-cat">{d.category}</span>
              <h1 className="sp-title">{d.name}</h1>
              <p className="sp-tag">{d.tagline}</p>
              <div className="sp-meta">
                <span className="sp-price">{d.price}</span>
                <span className="sp-govt">{d.govt}</span>
                <span className="sp-time">
                  {clock}
                  {d.timeline}
                </span>
              </div>
              <div className="sp-cta">
                <Link href={`/quote/${d.slug}`} className="btn-primary">
                  Get started {arrow}
                </Link>
                <Link href="/services" className="btn-ghost">
                  Browse all services
                </Link>
              </div>
            </div>
            <div className="sp-card">
              <div className="sp-card-h">Quick quote</div>
              <div className="sp-card-row">
                <span>Professional fee</span>
                <b>{d.price}</b>
              </div>
              <div className="sp-card-row">
                <span>Government fees</span>
                <i>shown separately</i>
              </div>
              <div className="sp-card-row">
                <span>Typical timeline</span>
                <i>{d.timeline}</i>
              </div>
              <div className="sp-card-row">
                <span>Hidden charges</span>
                <b className="orange">₹0</b>
              </div>
              <Link href={`/quote/${d.slug}`} className="btn-primary full" style={{ marginTop: 14 }}>
                Request a quotation {arrow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec sp-body">
        <div className="reveal sp-full">
          <span className="eyebrow">
            <i />
            How it works
          </span>
          <h2 className="h2">Our process</h2>
          <div className="proc-timeline" data-steps={nSteps}>
            {d.steps.map((st, i) => (
              <div className={"proc-step reveal" + (i === nSteps - 1 ? " is-last" : "")} style={{ "--i": i } as React.CSSProperties} key={i}>
                <div className="proc-rail">
                  <span className="proc-node">{i + 1}</span>
                </div>
                <div className="proc-card">
                  <span className="proc-ic">{STEP_ICONS[i] || STEP_ICONS[STEP_ICONS.length - 1]}</span>
                  <div className="proc-txt">
                    <span className="proc-kicker">Step {i + 1}</span>
                    <b>{st[0]}</b>
                    <span className="proc-desc">{st[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sp-docs sp-docs--full doc-info reveal">
          <div className="doc-info-h">
            <span className="eyebrow">
              <i />
              Get ready
            </span>
            <h3>Documents required</h3>
            <p className="doc-info-sub">Keep these handy to start your filing without back-and-forth.</p>
          </div>
          <DocsInfographic docs={d.docs} />
        </div>
      </section>

      <section className="wrap sec sp-body" style={{ paddingTop: 0 }}>
        <div className="sp-grid">
          <div className="sp-main">
            <div className="reveal">
              <span className="eyebrow">
                <i />
                Overview
              </span>
              <h2 className="h2">What is {d.name}?</h2>
              <p className="sp-what">{d.what}</p>
            </div>
            <div className="reveal">
              <span className="eyebrow">
                <i />
                Why it matters
              </span>
              <h2 className="h2">Key benefits</h2>
              <ul className="sp-benefits">
                {d.benefits.map((b, i) => (
                  <li key={i}>
                    <span className="sp-bchk">{check}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="sp-aside">
            <div className="sp-help reveal">
              <h3>Not sure if this is right for you?</h3>
              <p>Talk to a dedicated advisor — free, no obligation.</p>
              <Link href="/contact" className="btn-primary full">
                Get a free consultation {arrow}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {showPackages && (
        <section className="wrap ipkg-sec reveal">
          <div className="ipkg-panel">
            <div className="ipkg-head">
              <div className="ipkg-head-l">
                <span className="eyebrow">
                  <i />
                  Need to incorporate first?
                </span>
                <h2 className="h2">Start with the right incorporation package</h2>
                <p className="ipkg-sub">Complete Pvt Ltd incorporation, end-to-end — pick the tier that fits where you&apos;re starting from.</p>
              </div>
              <p className="ipkg-note">
                <span className="ipkg-note-ic">{info}</span>
                <span>
                  DSC &amp; government fees at actuals — compute yours in the <Link href="/cost-calculator">cost calculator</Link>.
                </span>
              </p>
            </div>

            <div className="ipkg-grid">
              {INCORP_TIERS.map((t, i) => {
                const p = PKG[t.slug];
                const prev = i > 0 ? PKG[INCORP_TIERS[i - 1].slug] : null;
                const items = p.deliverables.slice(prev ? prev.deliverables.length : 0);
                return (
                  <div className={"ipkg-card ipkg-card--" + t.variant + (t.recommended ? " ipkg-card--rec" : "")} key={t.slug}>
                    {t.recommended && (
                      <span className="ipkg-rec">
                        {star}
                        Recommended
                      </span>
                    )}
                    <div className="ipkg-card-top">
                      <span className="ipkg-ic">{layers}</span>
                      <div className="ipkg-id">
                        <h3 className="ipkg-name">{p.name}</h3>
                        <p className="ipkg-cnote">{p.note}</p>
                      </div>
                      <div className="ipkg-price">
                        <b>{p.price}</b>
                        <span>+ DSC &amp; govt. fees at actuals</span>
                      </div>
                    </div>
                    <div className="ipkg-incl">Includes {p.deliverables.length} deliverables</div>
                    <ul className="ipkg-list">
                      {prev && <li className="ipkg-lead">Everything in {prev.name}, plus:</li>}
                      {items.map((it, k) => (
                        <li key={k}>
                          <span className="ipkg-chk">{check}</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/quote/${t.slug}`} className={"ipkg-btn ipkg-btn--" + t.variant}>
                      Choose {p.name} {arrow}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="ipkg-save">
              <div className="ipkg-save-l">
                <span className="ipkg-save-ic">{tag}</span>
                <span>
                  <b>Save more with complete packages</b> <i>(vs. à-la-carte)</i>
                </span>
              </div>
              {INCORP_TIERS.map((t) => {
                const p = PKG[t.slug];
                return (
                  <div className="ipkg-save-col" key={t.slug}>
                    <span className="ipkg-save-total">{p.alaCarte}</span>
                    <span className="ipkg-save-pill">Save {p.save}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="wrap pb-big">
        <div className="cta-box reveal">
          <div className="cta-mesh" />
          <div className="cta-inner">
            <span className="eyebrow">
              <i />
              Ready to begin?
            </span>
            <h2 className="h2">Let&apos;s get your {d.name} sorted.</h2>
            <p className="sub">Clear pricing, one dedicated advisor, government fees always shown separately.</p>
            <Link href={`/quote/${d.slug}`} className="btn-accent lg">
              Get started {arrow}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
