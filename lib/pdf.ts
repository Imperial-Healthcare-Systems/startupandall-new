import { PROP_LOGO } from "./prop-logo";
import { DOC_CATS, docClassify } from "./docs";
import type { ProposalSnapshot } from "./proposal";

// Dependency-free PDF generator (real .pdf, works offline) — ported from
// buildProposalPDF(). Runs client-side only (uses atob/Blob).

export function pdfEsc(s: unknown): string {
  return String(s)
    .replace(/₹/g, "Rs.")
    .replace(/×/g, "x")
    .replace(/[—–]/g, "-")
    .replace(/•/g, "-")
    .replace(/·/g, "|")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7e]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

export function buildProposalPDF(d: ProposalSnapshot): Blob {
  const W = 595,
    H = 842,
    L = 56,
    R = W - 56;
  const BLUE = "0.114 0.373 0.878",
    BLUEDK = "0.082 0.278 0.682",
    ORANGE = "0.949 0.420 0.114",
    INK = "0.082 0.137 0.231",
    MUTED = "0.478 0.529 0.612",
    SOFT = "0.918 0.945 0.992",
    LINEC = "0.906 0.925 0.953";
  const BOTTOM = 64;
  const pages: string[][] = [];
  let ops: string[] = [];
  let y = 0;
  const T = (x: number, yy: number, size: number, str: string, bold?: number, col?: string) =>
    ops.push("BT /" + (bold ? "F2" : "F1") + " " + size + " Tf " + (col || INK) + " rg " + x + " " + yy + " Td (" + pdfEsc(str) + ") Tj ET");
  const RECT = (x: number, yy: number, w: number, h: number, col: string) => ops.push(col + " rg " + x + " " + yy + " " + w + " " + h + " re f");
  const LN = (x1: number, y1: number, x2: number, y2: number, wd?: number, col?: string) =>
    ops.push((wd || 0.7) + " w " + (col || LINEC) + " RG " + x1 + " " + y1 + " m " + x2 + " " + y2 + " l S");
  const tw = (str: string, size: number) => String(str).length * size * 0.5;
  function wrapText(str: string, size: number, maxW: number): string[] {
    const words = String(str).split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    words.forEach((w) => {
      const t = cur ? cur + " " + w : w;
      if (tw(t, size) > maxW && cur) {
        lines.push(cur);
        cur = w;
      } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function newPage() {
    pages.push(ops);
    ops = [];
    y = H - 56;
  }
  function ensure(space: number) {
    if (y - space < BOTTOM) newPage();
  }

  // PAGE 1 header
  y = H - 56;
  const lw = 132,
    lh = Math.round((132 * 274) / 520);
  y = H - 44 - lh;
  ops.push("q " + lw + " 0 0 " + lh + " " + L + " " + y + " cm /Im1 Do Q");
  T(R - 150, H - 58, 10, "Ref: " + d.ref, 1, INK);
  T(R - 150, H - 72, 9, "Date: " + d.date, 0, MUTED);
  T(R - 150, H - 86, 8.5, "A brand of Sachin Gadekar", 0, MUTED);
  T(R - 150, H - 97, 8.5, "Advisory LLP", 0, MUTED);
  y -= 12;
  RECT(0, y - 32, W, 32, BLUE);
  T(L, y - 21, 12.5, "SERVICE QUOTATION / PROPOSAL", 1, "1 1 1");
  RECT(0, y - 35, W, 3, ORANGE);
  y -= 56;
  T(L, y, 9.5, "PREPARED FOR", 1, BLUE);
  y -= 15;
  T(L, y, 11, d.name, 1, INK);
  y -= 14;
  T(L, y, 10, d.email + "   |   " + d.phone, 0, MUTED);
  y -= 22;
  T(L, y, 9.5, "ENGAGEMENT", 1, BLUE);
  y -= 15;
  T(L, y, 11, d.service, 1, INK);
  y -= 14;
  if (d.state) {
    T(L, y, 10, "State: " + d.state + "    |    " + d.capLabel + ": " + d.cap + "    |    " + d.peopleLabel + ": " + d.people, 0, MUTED);
    y -= 24;
  } else {
    y -= 10;
  }
  // table header
  RECT(L, y - 6, R - L, 20, BLUE);
  T(L + 8, y, 10, "Description", 1, "1 1 1");
  T(R - 90, y, 10, "Amount", 1, "1 1 1");
  y -= 22;
  d.lines.forEach((ln) => {
    T(L + 8, y, 10, ln[0], 0, INK);
    T(R - 90, y, 10, ln[1], 0, INK);
    y -= 12;
    if (ln[2]) {
      T(L + 16, y, 8, ln[2], 0, MUTED);
      y -= 11;
    }
    y -= 4;
  });
  y -= 2;
  LN(L, y, R, y);
  y -= 16;
  T(L + 8, y, 10, "Professional & DSC fees + GST", 0, INK);
  T(R - 90, y, 10, d.subPro, 0, INK);
  y -= 15;
  T(L + 8, y, 10, "Government fees (at actuals, receipts shared)", 0, INK);
  T(R - 90, y, 10, d.subGovt, 0, INK);
  y -= 26;
  // total block
  RECT(L, y - 12, R - L, 26, SOFT);
  LN(L, y + 14, R, y + 14, 1.4, ORANGE);
  T(L + 8, y - 4, 13, "Total payable", 1, INK);
  T(R - 110, y - 4, 13, d.total, 1, BLUEDK);
  y -= 40;

  // Documents Required
  const groups = (d.docGroups || []).filter((g) => g && g.docs && g.docs.length);
  if (groups.length) {
    ensure(54);
    T(L, y, 9.5, "DOCUMENTS REQUIRED", 1, BLUE);
    y -= 6;
    LN(L, y, R, y, 1, ORANGE);
    y -= 16;
    const multi = groups.length > 1;
    const cats = DOC_CATS;
    groups.forEach((g, gi) => {
      ensure(30);
      if (multi) {
        T(L, y, 10.5, gi + 1 + ". " + g.title, 1, INK);
        y -= 16;
      }
      const indent = multi ? L + 12 : L;
      const byCat: Record<string, string[]> = {};
      g.docs.forEach((doc) => {
        const c = docClassify(doc).cat;
        (byCat[c] = byCat[c] || []).push(doc);
      });
      const present = cats.filter((c) => byCat[c.key] && byCat[c.key].length);
      const useCats = g.docs.length >= 5 && present.length >= 2;
      const drawBullet = (doc: string, bx: number) => {
        const textX = bx + 12;
        const wrapped = wrapText(doc, 9.5, R - textX - 4);
        ensure(wrapped.length * 12 + 2);
        T(bx, y, 9.5, "•", 1, ORANGE);
        wrapped.forEach((line) => {
          T(textX, y, 9.5, line, 0, INK);
          y -= 12;
        });
        y -= 2;
      };
      if (useCats) {
        present.forEach((c) => {
          ensure(26);
          T(indent, y, 8, c.label.toUpperCase(), 1, MUTED);
          y -= 13;
          byCat[c.key].forEach((doc) => drawBullet(doc, indent + 8));
          y -= 6;
        });
      } else {
        g.docs.forEach((doc) => drawBullet(doc, indent));
      }
      y -= 8;
    });
    y -= 2;
  }

  // Terms + footer
  const terms = [
    "This proposal is valid for 15 days from the date above.",
    "Government fees are statutory and payable at actuals; any change in government fee is passed through transparently.",
    "Stamp duty figures follow the prevailing MCA / state schedules on the date of filing.",
    "No hidden charges. Professional fees include end-to-end filing and a dedicated advisor.",
  ];
  ensure(terms.length * 14 + 56);
  terms.forEach((t) => {
    const wrapped = wrapText(t, 9, R - L - 10);
    T(L, y, 9, "•", 1, ORANGE);
    wrapped.forEach((line) => {
      T(L + 10, y, 9, line, 0, MUTED);
      y -= 14;
    });
  });
  y -= 8;
  LN(L, y, R, y, 1.2, ORANGE);
  y -= 16;
  T(L, y, 9, "Startup And All  |  +91 90286 97373  |  contact@startupandall.com", 0, MUTED);
  y -= 13;
  T(L, y, 9, "Allianze House, Office No. 205, Shahunagar, Chinchwad, Pune 411019, Maharashtra, India", 0, MUTED);

  // finalize pages
  pages.push(ops);
  const jpg = atob(PROP_LOGO);
  const nP = pages.length;
  const pageObjNums: number[] = [],
    contentObjNums: number[] = [];
  let next = 3;
  for (let i = 0; i < nP; i++) {
    pageObjNums.push(next++);
    contentObjNums.push(next++);
  }
  const fontF1 = next++,
    fontF2 = next++,
    imgNum = next++;
  const objs: string[] = [];
  objs[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[1] = "<< /Type /Pages /Kids [" + pageObjNums.map((n) => n + " 0 R").join(" ") + "] /Count " + nP + " >>";
  for (let i = 0; i < nP; i++) {
    const res = "<< /Font << /F1 " + fontF1 + " 0 R /F2 " + fontF2 + " 0 R >> /XObject << /Im1 " + imgNum + " 0 R >> >>";
    objs[pageObjNums[i] - 1] = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + W + " " + H + "] /Resources " + res + " /Contents " + contentObjNums[i] + " 0 R >>";
    const stream = pages[i].join("\n");
    objs[contentObjNums[i] - 1] = "<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream";
  }
  objs[fontF1 - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objs[fontF2 - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
  objs[imgNum - 1] =
    "<< /Type /XObject /Subtype /Image /Width 520 /Height 274 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " +
    jpg.length +
    " >>\nstream\n" +
    jpg +
    "\nendstream";
  let pdf = "%PDF-1.4\n";
  const offs: number[] = [];
  objs.forEach((o, i) => {
    offs.push(pdf.length);
    pdf += i + 1 + " 0 obj\n" + o + "\nendobj\n";
  });
  const xref = pdf.length;
  pdf += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n" + offs.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("");
  pdf += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF";
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: "application/pdf" });
}
