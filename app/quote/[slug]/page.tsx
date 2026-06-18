import type { Metadata } from "next";
import { SERVICE_SLUGS } from "@/lib/service-data";
import { PKG_QUOTES, QUOTE_ENTITY } from "@/lib/quote-data";
import { quoteModel, quoteEntity, type QuoteModel } from "@/lib/quote";
import { CALC_CFG } from "@/lib/calc";
import QuotePage from "@/components/QuotePage";
import CostCalculator from "@/components/CostCalculator";

export function generateStaticParams() {
  const slugs = new Set<string>([...SERVICE_SLUGS, ...Object.keys(PKG_QUOTES), ...Object.keys(QUOTE_ENTITY)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = quoteModel(slug);
  const name = q?.name || humanize(slug);
  return { title: `Quote — ${name} | Startup And All` };
}

export default async function QuoteRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Entity slugs preset the cost calculator.
  const ent = quoteEntity(slug);
  if (ent) {
    return (
      <>
        <section className="pagehead">
          <div className="wrap">
            <span className="eyebrow">
              <i />
              Instant estimate
            </span>
            <h1 className="ph-title">{CALC_CFG[ent].proName} — cost estimate</h1>
            <p className="ph-sub">
              Your exact, all-inclusive cost — professional fee, government fee, stamp duty and taxes, itemised line by line. No hidden charges, ever.
            </p>
          </div>
        </section>
        <section className="wrap sec" style={{ paddingTop: 36 }}>
          <CostCalculator initialEntity={ent} />
        </section>
      </>
    );
  }

  const q: QuoteModel = quoteModel(slug) || {
    name: humanize(slug),
    fee: null,
    per: "",
    note: "",
    scope: "",
    docs: [],
    govt: "Government / statutory fees at actuals",
    timeline: "",
  };

  return <QuotePage slug={slug} q={q} />;
}
