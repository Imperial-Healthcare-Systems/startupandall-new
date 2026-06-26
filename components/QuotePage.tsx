import Link from "next/link";
import { inr } from "@/lib/calc";
import type { QuoteModel } from "@/lib/quote";
import QuoteProposal from "./QuoteProposal";

const promoIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
  </svg>
);

function DocsCard({ docs }: { docs: string[] }) {
  if (!docs.length) return null;
  return (
    <div className="calc-card reveal" style={{ maxWidth: 620, margin: "18px auto 0" }}>
      <h3 style={{ fontSize: "15.5px", color: "var(--ink)", marginBottom: 4 }}>Documents you’ll need</h3>
      <p style={{ fontSize: "12.5px", color: "var(--muted)", marginBottom: 12 }}>
        Keep these ready — your dedicated advisor will guide you through each one.
      </p>
      <ul className="sp-benefits">
        {docs.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

function Promo() {
  return (
    <div className="calc-promo reveal" style={{ maxWidth: 620, margin: "26px auto 0" }}>
      <div className="cp-l">
        <span className="cp-ic">{promoIcon}</span>
        <div>
          <h3>Want this confirmed in writing?</h3>
          <p>Talk to a dedicated advisor — free, no obligation. We’ll lock your exact quote and next steps.</p>
        </div>
      </div>
      <Link href="/contact" className="btn-primary">
        Get free consultation
      </Link>
    </div>
  );
}

export default function QuotePage({ slug, q }: { slug: string; q: QuoteModel }) {
  const waBase = "https://wa.me/919028697373?text=";

  // Scoped (price-on-request) quote
  if (q.fee === null) {
    const wa = waBase + encodeURIComponent("Hi Startup And All,\n\nPlease send me an exact quotation for: " + q.name + "\n\nThanks!");
    return (
      <>
        <section className="pagehead">
          <div className="wrap">
            <span className="eyebrow">
              <i />
              Quotation
            </span>
            <h1 className="ph-title">{q.name}</h1>
            <p className="ph-sub">
              This service is scoped to your exact case, so the fee is confirmed by a dedicated advisor — free, in minutes, no obligation.
            </p>
          </div>
        </section>
        <section className="wrap sec" style={{ paddingTop: 30 }}>
          <div className="calc-card" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: 17, color: "var(--ink)" }}>Get your exact quote now</h3>
            <p style={{ fontSize: 14, color: "var(--body)", margin: "10px 0 18px" }}>
              Tell us one or two details on WhatsApp and we’ll send your itemised quotation right away.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a className="cr-wa" target="_blank" rel="noopener" href={wa}>
                Get quote on WhatsApp
              </a>
              <Link href="/contact" className="btn-primary full" style={{ justifyContent: "center" }}>
                Request a formal quotation →
              </Link>
            </div>
          </div>
          <DocsCard docs={q.docs} />
          <Promo />
        </section>
      </>
    );
  }

  // Instant, all-inclusive quotation
  const gst = Math.round(0.18 * q.fee);
  const total = q.fee + gst;
  // Split the package fee into its components when they reconcile to the fee.
  const components =
    q.components && q.components.length && q.components.reduce((sum, c) => sum + c.amount, 0) === q.fee
      ? q.components
      : null;
  const wa = waBase + encodeURIComponent("Hi Startup And All,\n\nI'd like to proceed with: " + q.name + " (approx " + inr(total) + q.per + " incl. GST).\n\nThanks!");

  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">
            <i />
            Instant quotation
          </span>
          <h1 className="ph-title">{q.name}</h1>
          <p className="ph-sub">{q.note || "Transparent, all-inclusive pricing — generate your proposal in under a minute."}</p>
        </div>
      </section>
      <section className="wrap sec" style={{ paddingTop: 30 }}>
        <div className="calc-grid" style={{ gridTemplateColumns: "1fr", maxWidth: 620, margin: "0 auto" }}>
          <div className="calc-res" style={{ position: "static" }}>
            <div className="calc-card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="cr-head">
                <div className="eyebrow2">Your all-inclusive quote</div>
                <div className="cr-total">
                  {inr(total)}
                  {q.per} <small>incl. GST</small>
                </div>
              </div>
              <div className="cr-body">
                {components ? (
                  components.map((c, i) => (
                    <div className="cr-row" key={i}>
                      <span>{c.label}</span>
                      <b>{inr(c.amount)}</b>
                    </div>
                  ))
                ) : (
                  <div className="cr-row">
                    <span>
                      {q.name} — professional fee
                      {q.scope ? <em>{q.scope + (q.timeline ? " · " + q.timeline : "")}</em> : q.timeline ? <em>Typical timeline: {q.timeline}</em> : null}
                    </span>
                    <b>
                      {inr(q.fee)}
                      {q.per}
                    </b>
                  </div>
                )}
                <div className="cr-row">
                  <span>GST @ 18%</span>
                  <b>{inr(gst)}</b>
                </div>
                <div className="cr-row free">
                  <span>{q.govt}</span>
                  <b>—</b>
                </div>
                <div className="cr-grand">
                  <span>Total payable</span>
                  <span>
                    {inr(total)}
                    {q.per}
                  </span>
                </div>
                <div id="prop-root">
                  <QuoteProposal slug={slug} />
                </div>
                <div className="cr-cta" style={{ marginTop: 14 }}>
                  <a className="cr-wa" target="_blank" rel="noopener" href={wa}>
                    Proceed on WhatsApp
                  </a>
                </div>
                <p className="cr-note" style={{ marginTop: 14 }}>
                  No hidden charges. Where statutory fees apply, they are paid at actuals and every receipt is shared with you.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DocsCard docs={q.docs} />
        <Promo />
      </section>
    </>
  );
}
