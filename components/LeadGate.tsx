"use client";

import { useState } from "react";
import { sendEmail, LEAD_TO } from "@/lib/email";
import type { Lead } from "@/lib/proposal";

export const LEAD_KEY = "saa_lead";

function validate(name: string, email: string, phone: string): string {
  if (name.trim().length < 3) return "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return "Please enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) return "Please enter a valid 10-digit mobile number.";
  return "";
}

/**
 * Lead-capture overlay shown over the cost calculator until the visitor
 * submits name/email/mobile. Persists to sessionStorage (once per visit) and
 * hands the captured lead back so the proposal flow can be pre-filled.
 */
export default function LeadGate({ entityLabel, onUnlock }: { entityLabel: string; onUnlock: (lead: Lead) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setErr("");
    const v = validate(name, email, phone);
    if (v) {
      setErr(v);
      return;
    }
    setBusy(true);
    const lead: Lead = { name: name.trim(), email: email.trim(), phone: phone.replace(/\D/g, "").slice(-10) };
    try {
      await sendEmail("tplLead", {
        to_email: LEAD_TO,
        lead_name: lead.name,
        lead_email: lead.email,
        lead_phone: lead.phone,
        service: entityLabel + " — entered calculator",
        total: "(estimate in progress)",
        datetime: new Date().toLocaleString("en-IN"),
        ref: "LEAD-" + String(Date.now()).slice(-6),
        proposal_text: "Lead captured at cost calculator gate.",
      });
    } catch {
      /* best-effort; never block the user */
    }
    try {
      sessionStorage.setItem(LEAD_KEY, JSON.stringify({ ...lead, at: new Date().toISOString() }));
    } catch {
      /* ignore storage errors */
    }
    setBusy(false);
    onUnlock(lead);
  }

  return (
    <div className="lead-gate" id="lead-gate">
      <div className="lead-card" role="dialog" aria-modal="true" aria-labelledby="lg-title">
        <div className="lead-ey">One quick step</div>
        <h3 id="lg-title">Tell us where to send your quotation</h3>
        <p>Enter your details to unlock the cost calculator. We’ll use these to prepare your PDF quotation — no charge, no obligation.</p>
        <div id="lead-fields">
          <input className="lead-in" placeholder="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          <input className="lead-in" type="email" placeholder="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          <input className="lead-in" type="tel" inputMode="numeric" placeholder="Mobile number (10 digits)" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          {err && (
            <p className="lead-err">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {err}
            </p>
          )}
          <button className="btn-primary full lead-go" disabled={busy} onClick={submit}>
            {busy ? "Just a moment…" : "Unlock the calculator →"}
          </button>
        </div>
        <div className="lead-trust">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>Your details are used only to prepare and send your quotation. We never share them.</span>
        </div>
      </div>
    </div>
  );
}
