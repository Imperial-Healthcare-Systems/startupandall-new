import type { Metadata } from "next";
import Link from "next/link";
import CostCalculator from "@/components/CostCalculator";

export const metadata: Metadata = {
  title: "Company Registration Cost Calculator — Startup And All",
  description:
    "Get your exact, all-inclusive incorporation cost in 10 seconds — professional fee, government fee, stamp duty and taxes, itemised line by line. No hidden charges, ever.",
};

export default function CostCalculatorPage() {
  return (
    <>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">
            <i />
            Transparent pricing
          </span>
          <h1 className="ph-title">
            Company Registration
            <br />
            Cost Calculator
          </h1>
          <p className="ph-sub">
            Get your exact, all-inclusive incorporation cost in 10 seconds — professional fee, government fee, stamp duty and taxes, itemised line by line. No hidden charges, ever.
          </p>
        </div>
      </section>
      <section className="wrap sec" style={{ paddingTop: 36 }}>
        <CostCalculator />
        <div className="calc-promo reveal">
          <div className="cp-l">
            <span className="cp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
              </svg>
            </span>
            <div>
              <h3>Not sure which structure fits you?</h3>
              <p>Talk to a dedicated advisor — free, no obligation. We’ll recommend the right entity and lock your exact quote in writing.</p>
            </div>
          </div>
          <Link href="/contact" className="btn-primary">
            Get free consultation
          </Link>
        </div>
      </section>
    </>
  );
}
