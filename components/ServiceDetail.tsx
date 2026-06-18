import Link from "next/link";
import type { Service } from "@/lib/types";
import { DocsInfographic } from "@/lib/docs";

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

export default function ServiceDetail({ service: d }: { service: Service }) {
  const nSteps = d.steps.length;
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
