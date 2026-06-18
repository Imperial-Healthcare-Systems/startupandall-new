"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CALC_CFG,
  CALC_STATES,
  CAP_OPTS_CO,
  CAP_OPTS_LLP,
  calcCompute,
  initialCalcState,
  inr,
  type CalcState,
  type Entity,
} from "@/lib/calc";
import LeadGate, { LEAD_KEY } from "./LeadGate";
import ProposalGenerator from "./ProposalGenerator";
import { calcSnapshot, type Lead } from "@/lib/proposal";

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CostCalculator({ initialEntity }: { initialEntity?: Entity } = {}) {
  const [s, setS] = useState<CalcState>(() => {
    const base = initialCalcState();
    return initialEntity ? { ...base, ent: initialEntity, people: CALC_CFG[initialEntity].minPeople } : base;
  });
  const cfg = CALC_CFG[s.ent];
  const r = calcCompute(s);
  const capOpts = s.ent === "llp" ? CAP_OPTS_LLP : CAP_OPTS_CO;
  // keep capital valid for the chosen entity
  const cap = capOpts.some((o) => o[0] === s.cap) ? s.cap : 100000;
  const maxP = s.ent === "opc" ? 1 : 8;

  const set = (patch: Partial<CalcState>) => setS((prev) => ({ ...prev, ...patch }));
  const setEntity = (ent: Entity) => set({ ent, people: CALC_CFG[ent].minPeople, haveDsc: 0 });

  // Lead gate: calculator is locked until the visitor submits their details
  // (persisted once per session). Once captured, the proposal generator unlocks.
  const [lead, setLead] = useState<Lead | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_KEY);
      if (raw) setLead(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    document.body.style.overflow = lead ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lead]);

  const waMsg = encodeURIComponent(
    "Hi Startup And All,\n\nI used your cost calculator. My estimate:\n• Entity: " +
      cfg.label +
      "\n• State: " +
      s.st +
      "\n• " +
      (s.ent === "llp" ? "Contribution" : "Authorised capital") +
      ": " +
      inr(cap) +
      "\n• " +
      cfg.peopleLabel +
      ": " +
      r.people +
      "\n• Estimated all-inclusive total: " +
      inr(r.total) +
      "\n\nPlease confirm my exact quotation. Thanks!"
  );

  return (
    <>
    <div className={"calc-grid" + (lead ? "" : " calc-locked")}>
      <div className="calc-card reveal in">
        <div className="calc-f">
          <label>1 · What do you want to register?</label>
          <div className="calc-seg">
            {(Object.keys(CALC_CFG) as Entity[]).map((k) => (
              <button key={k} className={k === s.ent ? "on" : ""} onClick={() => setEntity(k)}>
                {CALC_CFG[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="calc-f">
          <label>2 · State of registered office</label>
          <select className="calc-sel" value={s.st} onChange={(e) => set({ st: e.target.value })}>
            {CALC_STATES.map((x) => (
              <option key={x[0]}>{x[0]}</option>
            ))}
          </select>
          <p className="calc-hint">Stamp duty is a state levy — it changes with this choice.</p>
        </div>

        <div className="calc-f">
          <label>3 · {s.ent === "llp" ? "Capital contribution" : "Authorised capital"}</label>
          <select className="calc-sel" value={cap} onChange={(e) => set({ cap: +e.target.value })}>
            {capOpts.map((o) => (
              <option key={o[0]} value={o[0]}>
                {o[1]}
              </option>
            ))}
          </select>
          {s.ent !== "llp" && (
            <p className="calc-hint">
              MCA registration fee is NIL up to ₹15 lakh; above that, statutory Table-B slab fees apply automatically. Tip: most founders start at ₹15 lakh or below and increase capital later.
            </p>
          )}
        </div>

        <div className="calc-f">
          <label>4 · {cfg.peopleLabel}</label>
          <div className="calc-step">
            <button onClick={() => set({ people: Math.max(cfg.minPeople, r.people - 1) })}>−</button>
            <b>{r.people}</b>
            <button onClick={() => set({ people: Math.min(maxP, r.people + 1) })}>+</button>
            {s.ent === "opc" && <span className="calc-hint" style={{ margin: 0 }}>1 director + 1 nominee (no DSC needed for nominee)</span>}
          </div>
        </div>

        <div className="calc-f">
          <label>5 · Already hold a valid DSC?</label>
          <div className="calc-step">
            <button onClick={() => set({ haveDsc: Math.max(0, Math.min(s.haveDsc, r.people) - 1) })}>−</button>
            <b>{Math.min(s.haveDsc, r.people)}</b>
            <button onClick={() => set({ haveDsc: Math.min(r.people, Math.min(s.haveDsc, r.people) + 1) })}>+</button>
            <span className="calc-hint" style={{ margin: 0 }}>people who already have one — we’ll skip their DSC cost</span>
          </div>
        </div>

        <div className="calc-f">
          <label>6 · Reserve name in advance?</label>
          <div className="calc-seg">
            <button className={s.preName ? "on" : ""} onClick={() => set({ preName: true })}>
              Yes — lock the name first
            </button>
            <button className={!s.preName ? "on" : ""} onClick={() => set({ preName: false })}>
              No — file directly
            </button>
          </div>
          <p className="calc-hint">
            Reserving first (₹{s.ent === "llp" ? "200" : "1,000"}) protects your name before filing — recommended. Filing directly skips this fee.
          </p>
        </div>

        <div className="calc-f">
          <label>7 · Popular add-ons (optional)</label>
          <div className={"calc-add" + (s.addGst ? " on" : "")} onClick={() => set({ addGst: !s.addGst })}>
            <span className="ca-tick">{check}</span>
            <span className="ca-l">
              <b>GST Registration</b>
              <span>Recommended if you’ll invoice from day one</span>
            </span>
            <span className="ca-p">+ ₹1,499</span>
          </div>
          <div className={"calc-add" + (s.addMsme ? " on" : "")} onClick={() => set({ addMsme: !s.addMsme })}>
            <span className="ca-tick">{check}</span>
            <span className="ca-l">
              <b>MSME / Udyam Registration</b>
              <span>Unlocks MSME benefits & schemes</span>
            </span>
            <span className="ca-p">+ ₹999</span>
          </div>
        </div>

        <div className="calc-trust">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>
            <b>Zero hidden charges.</b> Government fees are paid at actuals and every receipt is shared with you. What you see here is what you pay.
          </span>
        </div>
      </div>

      <div className="calc-res">
        <div className="calc-card reveal in">
          <div className="cr-head">
            <div className="eyebrow2">Your all-inclusive estimate</div>
            <div className="cr-total">
              {inr(r.total)} <small>incl. GST & govt. fees</small>
            </div>
          </div>
          <div className="cr-body">
            {r.rows.map((x, i) => (
              <div className={"cr-row" + (x.free ? " free" : "")} key={i}>
                <span>
                  {x.l}
                  {x.e && <em>{x.e}</em>}
                </span>
                <b>{x.free ? "₹0" : inr(x.v)}</b>
              </div>
            ))}
            <div className="cr-sub">
              <span>Professional & DSC fees + GST</span>
              <span>{inr(r.proFees + r.gst)}</span>
            </div>
            <div className="cr-sub">
              <span>Government fees (at actuals)</span>
              <span>{inr(r.govt)}</span>
            </div>
            <div className="cr-grand">
              <span>Total payable</span>
              <span>{inr(r.total)}</span>
            </div>
            <div className="cr-cta">
              <a className="cr-wa" target="_blank" rel="noopener" href={"https://wa.me/919028697373?text=" + waMsg}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4l-2.1-1c-.3-.1-.6-.1-.8.1l-1 1.2c-1.6-.8-2.9-2.1-3.7-3.7l1.2-1c.2-.2.3-.5.1-.8l-1-2.1c-.1-.3-.5-.5-.8-.4-1.2.3-2.1 1.4-2.1 2.6 0 4.1 3.4 7.5 7.5 7.5 1.2 0 2.3-.9 2.6-2.1.1-.3-.1-.7-.4-.8zM12 2a10 10 0 0 0-8.6 15L2 22l5-1.4A10 10 0 1 0 12 2zm0 18.3c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3z" />
                </svg>
                Lock this quote on WhatsApp
              </a>
              <Link href="/contact" className="btn-primary full" style={{ justifyContent: "center" }}>
                Request formal quotation →
              </Link>
            </div>
            {lead && (
              <div id="prop-root">
                <ProposalGenerator mode="gated" lead={lead} makeSnapshot={(l) => calcSnapshot(s, l)} />
              </div>
            )}
            <p className="cr-note">
              Estimate as per current MCA fee schedule & state stamp rules. Stamp duty
              {s.ent === "llp" ? " on the LLP agreement is indicative and" : ""} is confirmed to the rupee in your formal quotation before any payment.
            </p>
          </div>
        </div>
      </div>
    </div>
    {!lead && <LeadGate entityLabel={cfg.label} onUnlock={setLead} />}
    </>
  );
}
