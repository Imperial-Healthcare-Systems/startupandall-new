import React from "react";

// Document-infographic builder — ported from docClassify/docCard/buildDocsInfographic.

export const DOC_ICONS: Record<string, string> = {
  identity:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2.2"/><path d="M5.5 17c.4-1.8 1.9-3 3.5-3s3.1 1.2 3.5 3"/><line x1="15" y1="9" x2="19" y2="9"/><line x1="15" y1="12.5" x2="19" y2="12.5"/></svg>',
  address:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>',
  photo:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.2"/><path d="M8 6l1.5-2h5L16 6"/></svg>',
  business:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><rect x="9" y="12" width="2.5" height="2.5"/><rect x="13" y="12" width="2.5" height="2.5"/></svg>',
  bank:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M19 10v8M9 10v8M15 10v8"/><path d="M3 21h18"/></svg>',
  doc:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="16.5" x2="15" y2="16.5"/></svg>',
  contact:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4z"/><path d="M4 8l8 5 8-5"/></svg>',
  sign:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17c3-1 4-7 6-7s2 4 4 4 2-3 4-3"/><path d="M3 21h18"/></svg>',
};

export const DOC_CATS = [
  { key: "identity", label: "Identity Proof" },
  { key: "address", label: "Address Proof" },
  { key: "business", label: "Business Documents" },
  { key: "additional", label: "Additional Documents" },
];

const CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

export function docClassify(t: string): { icon: string; cat: string } {
  const s = (t || "").toLowerCase();
  let icon = "doc",
    cat = "additional";
  if (/photo|photograph/.test(s)) {
    icon = "photo";
    cat = "identity";
  } else if (/\bdsc\b|digital signature/.test(s)) {
    icon = "sign";
    cat = "business";
  } else if (/\bpan\b|aadhaar|aadhar|\bdin\b|passport|identity|director identification/.test(s)) {
    icon = "identity";
    cat = "identity";
  } else if (/address|office proof|premises|utility bill|rent agreement|\bnoc\b|registered office|ownership/.test(s)) {
    icon = "address";
    cat = "address";
  } else if (/bank|cheque|statement/.test(s)) {
    icon = "bank";
    cat = "business";
  } else if (/incorporation|certificate|deed|constitution|gstin|\bmoa\b|\baoa\b|agreement|licen[cs]e|registration|udyam|investment|turnover|business activity/.test(s)) {
    icon = "business";
    cat = "business";
  } else if (/email|mobile|phone|contact/.test(s)) {
    icon = "contact";
    cat = "additional";
  } else if (/consent|nominee|form/.test(s)) {
    icon = "doc";
    cat = "additional";
  }
  return { icon, cat };
}

function DocCard({ text }: { text: string }) {
  const c = docClassify(text);
  return (
    <div className="doc-card reveal-scale">
      <span className="doc-ic" dangerouslySetInnerHTML={{ __html: DOC_ICONS[c.icon] || DOC_ICONS.doc }} />
      <span className="doc-tx">{text}</span>
      <span className="doc-chk" dangerouslySetInnerHTML={{ __html: CHECK }} />
    </div>
  );
}

/** Groups into categories only when the list is long enough (>=5 items AND
 *  >=2 distinct categories); otherwise renders a clean grid. */
export function DocsInfographic({ docs }: { docs: string[] }) {
  const items = (docs || []).filter(Boolean);
  if (!items.length) return null;
  const tagged = items.map((t) => ({ t, c: docClassify(t).cat }));
  const present = DOC_CATS.filter((cat) => tagged.some((x) => x.c === cat.key));
  const grouped = items.length >= 5 && present.length >= 2;

  if (!grouped) {
    return (
      <div className="doc-grid">
        {items.map((t, i) => (
          <DocCard key={i} text={t} />
        ))}
      </div>
    );
  }

  return (
    <div className="doc-cats">
      {present.map((cat) => {
        const inCat = tagged.filter((x) => x.c === cat.key);
        if (!inCat.length) return null;
        const iconKey = cat.key === "additional" ? "doc" : cat.key === "business" ? "business" : cat.key;
        return (
          <div className="doc-cat reveal" key={cat.key}>
            <div className="doc-cat-h">
              <span className="doc-cat-ic" dangerouslySetInnerHTML={{ __html: DOC_ICONS[iconKey] || DOC_ICONS.doc }} />
              <span className="doc-cat-t">{cat.label}</span>
              <span className="doc-cat-n">{inCat.length}</span>
            </div>
            <div className="doc-grid">
              {inCat.map((x, i) => (
                <DocCard key={i} text={x.t} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
