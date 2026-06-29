// Cost-calculator domain logic — ported verbatim from the original build.
// (The stamp-duty closures can't be JSON-serialised, so this module is the
// authoritative source for calculator data + computation.)

export type Entity = "pvt" | "opc" | "llp" | "sec8";

export interface CalcState {
  ent: Entity;
  st: string;
  cap: number;
  people: number;
  haveDsc: number;
  preName: boolean;
  addGst: boolean;
  addMsme: boolean;
}

export interface CalcRow {
  l: string;
  e?: string;
  v: number;
  g?: number;
  free?: number;
}

export interface CalcResult {
  rows: CalcRow[];
  proFees: number;
  gst: number;
  govt: number;
  total: number;
  dscN: number;
  people: number;
}

type Stamp = { f: number; m: number; a: number };

/* Stamp duty per official MCA eStamp schedule (companies having share capital, non-Sec-8). */
export const CALC_STATES: [string, (c: number) => Stamp][] = [
  ["Andaman & Nicobar", () => ({ f: 20, m: 200, a: 300 })],
  ["Andhra Pradesh", (c) => ({ f: 20, m: 500, a: Math.min(Math.max(0.0015 * c, 1000), 500000) })],
  ["Arunachal Pradesh", () => ({ f: 10, m: 200, a: 500 })],
  ["Assam", () => ({ f: 15, m: 200, a: 310 })],
  ["Bihar", (c) => ({ f: 20, m: 500, a: Math.min(Math.max(0.0015 * c, 1000), 500000) })],
  ["Chandigarh", () => ({ f: 3, m: 500, a: 1000 })],
  ["Chhattisgarh", (c) => ({ f: 10, m: 500, a: Math.min(Math.max(0.0015 * c, 1000), 500000) })],
  ["Dadra & Nagar Haveli and Daman & Diu", (c) => ({ f: 20, m: 150, a: 1000 * Math.ceil(c / 500000) })],
  ["Delhi", (c) => ({ f: 10, m: 200, a: Math.min(0.0015 * c, 2500000) })],
  ["Goa", (c) => ({ f: 50, m: 150, a: 1000 * Math.ceil(c / 500000) })],
  ["Gujarat", (c) => ({ f: 20, m: 100, a: Math.min(0.005 * c, 500000) })],
  ["Haryana", (c) => ({ f: 15, m: 60, a: c <= 100000 ? 60 : 120 })],
  ["Himachal Pradesh", (c) => ({ f: 3, m: 60, a: c <= 100000 ? 60 : 120 })],
  ["Jammu & Kashmir", (c) => ({ f: 10, m: 150, a: c <= 100000 ? 150 : 300 })],
  ["Jharkhand", () => ({ f: 5, m: 63, a: 105 })],
  ["Karnataka", (c) => ({ f: 20, m: 5000, a: 5000 * Math.ceil(c / 1000000) })],
  ["Kerala", (c) => ({ f: 25, m: 1000, a: c <= 1000000 ? 2000 : c <= 2500000 ? 5000 : 0.005 * c })],
  ["Ladakh", (c) => ({ f: 10, m: 150, a: c <= 100000 ? 150 : 300 })],
  ["Lakshadweep", () => ({ f: 25, m: 500, a: 1000 })],
  ["Madhya Pradesh", (c) => ({ f: 50, m: 2500, a: Math.min(Math.max(0.0015 * c, 5000), 2500000) })],
  ["Maharashtra", (c) => ({ f: 100, m: 200, a: Math.min(1000 * Math.ceil(c / 500000), 5000000) })],
  ["Manipur", () => ({ f: 10, m: 100, a: 150 })],
  ["Meghalaya", () => ({ f: 10, m: 100, a: 300 })],
  ["Mizoram", () => ({ f: 10, m: 100, a: 150 })],
  ["Nagaland", () => ({ f: 10, m: 100, a: 150 })],
  ["Odisha", () => ({ f: 10, m: 300, a: 300 })],
  ["Puducherry", () => ({ f: 10, m: 200, a: 300 })],
  ["Punjab", (c) => ({ f: 25, m: 5000, a: c <= 100000 ? 5000 : 10000 })],
  ["Rajasthan", (c) => ({ f: 10, m: 500, a: 0.005 * c })],
  ["Sikkim", () => ({ f: 0, m: 0, a: 0 })],
  ["Tamil Nadu", (c) => ({ f: 20, m: 200, a: Math.min(0.0005 * c, 500000) })],
  ["Telangana", (c) => ({ f: 20, m: 500, a: Math.min(Math.max(0.0015 * c, 1000), 500000) })],
  ["Tripura", () => ({ f: 10, m: 100, a: 150 })],
  ["Uttar Pradesh", () => ({ f: 10, m: 500, a: 500 })],
  ["Uttarakhand", () => ({ f: 10, m: 500, a: 500 })],
  ["West Bengal", () => ({ f: 10, m: 60, a: 300 })],
];

/* LLP agreement stamp duty (state slab; indicative) */
export const CALC_LLP_STAMP: Record<string, (c: number) => number> = {
  Delhi: (c) => Math.min(Math.max(0.01 * c, 200), 5000),
  Maharashtra: (c) => Math.min(Math.max(0.01 * c, 500), 15000),
  Karnataka: (c) => (c <= 1000000 ? 1000 : 1000 + 500 * Math.ceil((c - 1000000) / 500000)),
  Gujarat: (c) => Math.min(Math.max(0.01 * c, 300), 10000),
  "Tamil Nadu": () => 300,
  "Uttar Pradesh": () => 750,
  _default: (c) => Math.min(Math.max(0.01 * c, 500), 10000),
};

export const CALC_CFG: Record<Entity, { label: string; pro: number; proName: string; minPeople: number; peopleLabel: string; slug: string }> = {
  pvt: { label: "Private Limited", pro: 6999, proName: "Private Limited Company", minPeople: 2, peopleLabel: "Directors", slug: "private-limited-company" },
  opc: { label: "OPC", pro: 5999, proName: "One Person Company (OPC)", minPeople: 1, peopleLabel: "Director", slug: "one-person-company-opc" },
  llp: { label: "LLP", pro: 5999, proName: "Limited Liability Partnership", minPeople: 2, peopleLabel: "Designated partners", slug: "limited-liability-partnership-llp" },
  sec8: { label: "Section 8", pro: 6999, proName: "Section 8 Company", minPeople: 2, peopleLabel: "Directors", slug: "section-8-company-registration" },
};

/* MCA registration fee — Table B; waived up to ₹15 lakh authorised capital. */
export function calcMcaFee(c: number): number {
  if (c <= 1500000) return 0;
  return 2000 + 200 * Math.ceil((c - 1000000) / 10000);
}

export const CALC_DSC = 1299;
export const CALC_PANTAN = 143;
export const CALC_GSTADD = 1499;
export const CALC_MSMEADD = 999;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const initialCalcState = (): CalcState => ({
  ent: "pvt",
  st: "Maharashtra",
  cap: 100000,
  people: 2,
  haveDsc: 0,
  preName: true,
  addGst: false,
  addMsme: false,
});

export function calcCompute(s: CalcState): CalcResult {
  const cfg = CALC_CFG[s.ent];
  const rows: CalcRow[] = [];
  const people = Math.min(Math.max(cfg.minPeople, s.people), s.ent === "opc" ? 1 : 8);
  const dscN = Math.max(0, people - Math.min(s.haveDsc, people));
  const proFees = cfg.pro + dscN * CALC_DSC + (s.addGst ? CALC_GSTADD : 0) + (s.addMsme ? CALC_MSMEADD : 0);
  const gst = Math.round(0.18 * proFees);
  rows.push({ l: cfg.proName + " — professional fee", e: "Drafting, filing, advisor support, end-to-end", v: cfg.pro });
  if (dscN > 0) rows.push({ l: "Digital Signatures × " + dscN, e: "Class 3 DSC, 2-year validity (" + inr(CALC_DSC) + " each)", v: dscN * CALC_DSC });
  if (s.addGst) rows.push({ l: "GST Registration (add-on)", e: "GSTIN with filing support", v: CALC_GSTADD });
  if (s.addMsme) rows.push({ l: "MSME / Udyam Registration (add-on)", e: "Udyam certificate", v: CALC_MSMEADD });
  rows.push({ l: "GST @ 18%", e: "On professional & DSC fees (govt. fees attract no GST)", v: gst });

  let govt = 0;
  if (s.ent === "llp") {
    const fillip = s.cap <= 100000 ? 500 : s.cap <= 500000 ? 2000 : s.cap <= 1000000 ? 4000 : 5000;
    const f3 = s.cap <= 100000 ? 50 : s.cap <= 500000 ? 100 : s.cap <= 1000000 ? 150 : 200;
    const stamp = Math.round((CALC_LLP_STAMP[s.st] || CALC_LLP_STAMP._default)(s.cap));
    rows.push(
      s.preName
        ? { l: "Name reservation (RUN-LLP)", e: "MCA fee — reserved in advance", v: 200, g: 1 }
        : { l: "Name approval within FiLLiP (integrated)", e: "No separate name fee", v: 0, g: 1, free: 1 }
    );
    rows.push({ l: "FiLLiP incorporation fee", e: "MCA fee for your contribution slab", v: fillip, g: 1 });
    rows.push({ l: "LLP Agreement filing (Form 3)", e: "MCA fee", v: f3, g: 1 });
    rows.push({ l: "Stamp duty on LLP Agreement", e: s.st + " state slab — indicative", v: stamp, g: 1 });
    rows.push({ l: "PAN & TAN", e: "NSDL processing", v: CALC_PANTAN, g: 1 });
    govt = (s.preName ? 200 : 0) + fillip + f3 + stamp + CALC_PANTAN;
  } else {
    const sd = (CALC_STATES.find((x) => x[0] === s.st) || CALC_STATES[0])[1](s.cap);
    // Section 8 (non-profit) companies are exempt from stamp duty on MoA/AoA.
    const stamp = s.ent === "sec8" ? 0 : Math.round(sd.f + sd.m + sd.a);
    rows.push(
      s.preName
        ? { l: "Name reservation (SPICe+ Part A)", e: "MCA fee — 2 name choices, reserved in advance", v: 1000, g: 1 }
        : { l: "Name approval within SPICe+ (integrated)", e: "No separate name fee", v: 0, g: 1, free: 1 }
    );
    const mca = calcMcaFee(s.cap);
    rows.push(
      mca > 0
        ? { l: "ROC / MCA registration fee", e: "MCA Table B — applies above ₹15 lakh authorised capital", v: mca, g: 1 }
        : { l: "ROC / MCA filing fee (SPICe+, MoA, AoA)", e: "Nil for authorised capital up to ₹15 lakh", v: 0, g: 1, free: 1 }
    );
    rows.push(
      s.ent === "sec8"
        ? { l: "Stamp duty (form + MoA + AoA)", e: "Exempt for Section 8 (non-profit) companies", v: 0, g: 1, free: 1 }
        : { l: "Stamp duty (form + MoA + AoA)", e: s.st + " · capital " + inr(s.cap), v: stamp, g: 1 }
    );
    rows.push({ l: "PAN & TAN", e: "NSDL processing", v: CALC_PANTAN, g: 1 });
    rows.push({ l: "DIN for " + Math.min(people, 3) + " " + cfg.peopleLabel.toLowerCase(), e: "Allotted within SPICe+ — no extra fee (up to 3)", v: 0, g: 1, free: 1 });
    govt = (s.preName ? 1000 : 0) + calcMcaFee(s.cap) + stamp + CALC_PANTAN;
  }
  return { rows, proFees, gst, govt, total: proFees + gst + govt, dscN, people };
}

export const CAP_OPTS_CO: [number, string][] = [
  [100000, "₹1 lakh (most common)"],
  [200000, "₹2 lakh"],
  [500000, "₹5 lakh"],
  [1000000, "₹10 lakh"],
  [1500000, "₹15 lakh"],
  [2000000, "₹20 lakh"],
  [2500000, "₹25 lakh"],
  [5000000, "₹50 lakh"],
];

export const CAP_OPTS_LLP: [number, string][] = [
  [25000, "₹25,000"],
  [100000, "₹1 lakh (most common)"],
  [200000, "₹2 lakh"],
  [500000, "₹5 lakh"],
  [1000000, "₹10 lakh"],
  [2500000, "₹25 lakh"],
  [5000000, "₹50 lakh"],
];
