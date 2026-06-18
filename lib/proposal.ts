import { CALC_CFG, calcCompute, inr, type CalcState, type Entity } from "./calc";
import { SERVICE_DATA } from "./service-data";
import { quoteModel } from "./quote";

export interface Lead {
  name: string;
  email: string;
  phone: string;
}

export interface DocGroup {
  title: string;
  docs: string[];
}

export interface ProposalSnapshot {
  ref: string;
  date: string;
  datetime: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  state: string;
  cap: string;
  capLabel: string;
  people: number | string;
  peopleLabel: string;
  lines: [string, string, string][];
  subPro: string;
  subGovt: string;
  total: string;
  totalNum: number;
  docGroups: DocGroup[];
}

const CALC_ENT_SLUG: Record<Entity, string> = {
  pvt: "private-limited-company",
  opc: "one-person-company-opc",
  llp: "limited-liability-partnership-llp",
};

function docsForSlug(slug: string): string[] {
  const d = SERVICE_DATA[slug];
  return d && Array.isArray(d.docs) ? d.docs.slice() : [];
}

function refBase(): Pick<ProposalSnapshot, "ref" | "date" | "datetime"> {
  const dt = new Date();
  return {
    ref:
      "SA-" +
      dt.getFullYear() +
      String(dt.getMonth() + 1).padStart(2, "0") +
      String(dt.getDate()).padStart(2, "0") +
      "-" +
      String(Date.now()).slice(-5),
    date: dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    datetime: dt.toLocaleString("en-IN"),
  };
}

const toRs = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-IN");
const inrRs = (n: number) => inr(n).replace("₹", "Rs. ");

/** Snapshot for the cost-calculator flow (entity + add-ons). */
export function calcSnapshot(s: CalcState, lead: Lead): ProposalSnapshot {
  const cfg = CALC_CFG[s.ent];
  const r = calcCompute(s);
  const groups: DocGroup[] = [];
  const baseDocs = docsForSlug(CALC_ENT_SLUG[s.ent]);
  if (baseDocs.length) groups.push({ title: cfg.proName, docs: baseDocs });
  if (s.addGst) {
    const g = docsForSlug("gst-registration");
    if (g.length) groups.push({ title: "GST Registration", docs: g });
  }
  if (s.addMsme) {
    const m = docsForSlug("msme-udyam-registration");
    if (m.length) groups.push({ title: "MSME / Udyam Registration", docs: m });
  }
  return {
    ...refBase(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    service: (s.ent === "llp" ? "Incorporation — " : "Company Registration — ") + cfg.proName,
    state: s.st,
    cap: inr(s.cap),
    capLabel: s.ent === "llp" ? "Contribution" : "Authorised capital",
    people: r.people,
    peopleLabel: cfg.peopleLabel,
    lines: r.rows.map((x) => [x.l, x.free ? "Rs. 0" : inrRs(x.v), x.e || ""] as [string, string, string]),
    subPro: inrRs(r.proFees + r.gst),
    subGovt: inrRs(r.govt),
    total: inrRs(r.total),
    totalNum: r.total,
    docGroups: groups,
  };
}

/** Snapshot for a service/package quote flow. */
export function svcSnapshot(slug: string, lead: Lead): ProposalSnapshot | null {
  const q = quoteModel(slug);
  if (!q || q.fee === null) return null;
  const gst = Math.round(0.18 * q.fee);
  const total = q.fee + gst;
  const groups: DocGroup[] = q.docs && q.docs.length ? [{ title: q.name, docs: q.docs.slice() }] : [];
  return {
    ...refBase(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    service: q.name + (q.per ? " (annual package)" : ""),
    state: "",
    cap: "",
    capLabel: "",
    people: "",
    peopleLabel: "",
    lines: [
      [q.name + " - professional fee" + q.per, toRs(q.fee), q.scope || q.note || ""],
      ["GST @ 18%", toRs(gst), ""],
      [q.govt, "-", ""],
    ],
    subPro: toRs(total),
    subGovt: "At actuals",
    total: toRs(total) + q.per,
    totalNum: total,
    docGroups: groups,
  };
}
