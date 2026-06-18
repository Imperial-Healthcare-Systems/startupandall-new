"use client";

import Link from "next/link";
import { useState } from "react";
import { CATALOGUE, ICONS, SERVICE_COUNT } from "@/lib/catalogue";
import { svcSlugify } from "@/lib/utils";
import RawSvg from "./RawSvg";

type Cat = (typeof CATALOGUE)[number];

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function ServiceCatalogue() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  // categories the user has manually toggled open/closed (overrides defaults)
  const [manual, setManual] = useState<Record<string, boolean>>({});

  const tabs = ["All", ...CATALOGUE.map((c) => c.category)];
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const filtered: Cat[] = CATALOGUE.map((c) => ({
    category: c.category,
    icon: c.icon,
    services: c.services.filter((s) => (searching ? s[0].toLowerCase().includes(q) : true)),
  })).filter((c) => (active === "All" || c.category === active) && c.services.length > 0) as unknown as Cat[];

  const total = filtered.reduce((n, c) => n + c.services.length, 0);

  const isOpen = (category: string, idx: number) => {
    if (category in manual) return manual[category];
    return searching || active !== "All" || idx === 0;
  };

  const onTab = (t: string) => {
    setActive(t);
    setManual({});
  };

  return (
    <div id="catalogue-app" data-init="1">
      <div className="cat-bar">
        <div className="cat-bar-in">
          <div className="search-wrap">
            <RawSvg html={ICONS.searchIcon} />
            <input
              id="cat-search"
              placeholder={`Search ${SERVICE_COUNT}+ services — e.g. "GST", "trademark", "ROC"…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-clear" style={{ display: query ? "block" : "none" }} onClick={() => setQuery("")}>
              <RawSvg html={ICONS.xIcon} />
            </button>
          </div>
          <div className="tabs">
            {tabs.map((t) => (
              <button key={t} className={"tab" + (t === active ? " active" : "")} onClick={() => onTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cat-count">
        <span className="mono" id="cat-num">
          {total} service{total !== 1 ? "s" : ""} shown
        </span>
        <button className="cat-reset" style={{ display: searching ? "block" : "none" }} onClick={() => setQuery("")}>
          Reset
        </button>
      </div>

      <div className="cat-list" id="cat-list">
        {filtered.length === 0 ? (
          <div className="cat-empty">
            <h3>No service matched &quot;{query}&quot;.</h3>
            <p>Tell us what you need and we will recommend the right service.</p>
            <Link href="/contact" className="btn-primary" style={{ marginTop: 20 }}>
              Ask an advisor
            </Link>
          </div>
        ) : (
          filtered.map((c, idx) => {
            const open = isOpen(c.category, idx);
            return (
              <div className={"cat-block" + (open ? " open" : "")} key={c.category}>
                <button
                  className="cat-h"
                  onClick={() => {
                    if (searching) return;
                    setManual((m) => ({ ...m, [c.category]: !open }));
                  }}
                >
                  <span className="cat-h-l">
                    <span className="cat-h-ic" dangerouslySetInnerHTML={{ __html: c.icon }} />
                    <span>
                      <span className="cat-h-name">{c.category}</span>
                      <span className="cat-h-sub">{c.services.length} services</span>
                    </span>
                  </span>
                  <span className="cat-chev">
                    <RawSvg html={ICONS.chevIcon} />
                  </span>
                </button>
                <div className="cat-body">
                  <div className="cat-body-in">
                    <div className="cat-items">
                      {c.services.map((s) => (
                        <div className="cat-item" key={s[0]}>
                          <div>
                            <span className="ci-name">
                              <Highlight text={s[0]} q={query} />
                            </span>
                            <span className="ci-days">{s[1]}</span>
                          </div>
                          <Link href={`/quote/${svcSlugify(s[0])}`} className="ci-btn">
                            Quote <RawSvg html={ICONS.arrowUp} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
