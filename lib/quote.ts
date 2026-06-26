import { PKG_QUOTES, QUOTE_ENTITY } from "./quote-data";
import { SERVICE_DATA } from "./service-data";
import type { Entity } from "./calc";

export interface QuoteComponent {
  label: string;
  amount: number;
}

export interface QuoteModel {
  name: string;
  fee: number | null;
  per: string;
  note: string;
  scope: string;
  docs: string[];
  govt: string;
  timeline: string;
  components?: QuoteComponent[];
}

export function parsePrice(p: string): number | null {
  const m = String(p).replace(/,/g, "").match(/(\d+)/);
  return m ? +m[1] : null;
}

type Pkg = { name: string; price: string; per?: string; note?: string; scope?: string; docs?: readonly string[]; govtLine?: string; components?: readonly QuoteComponent[] };

export function quoteModel(slug: string): QuoteModel | null {
  const pkgs = PKG_QUOTES as unknown as Record<string, Pkg>;
  if (pkgs[slug]) {
    const p = pkgs[slug];
    const n = parsePrice(p.price);
    return {
      name: p.name,
      fee: n,
      per: p.per ? " " + p.per : "",
      note: p.note || "",
      scope: p.scope || "",
      docs: [...(p.docs || [])],
      govt: p.govtLine || "No separate government fee — statutory fees, if any, at actuals",
      timeline: "",
      components: p.components ? p.components.map((c) => ({ ...c })) : undefined,
    };
  }
  const d = SERVICE_DATA[slug];
  if (!d) return null;
  const n = parsePrice(d.price);
  return {
    name: d.name,
    fee: n,
    per: "",
    docs: d.docs || [],
    note: d.tagline || "",
    scope: "",
    govt: d.govt && /govt/i.test(d.govt) ? "Government / statutory fees at actuals — itemised in your proposal" : "No government fee applicable",
    timeline: d.timeline || "",
  };
}

/** Entity slugs that route to the cost calculator preset to that entity. */
export function quoteEntity(slug: string): Entity | null {
  return (QUOTE_ENTITY as unknown as Record<string, Entity>)[slug] || null;
}
