"use client";

import { useRef, useState } from "react";
import { buildProposalPDF } from "@/lib/pdf";
import { sendEmail, LEAD_TO, EMAIL_LIVE } from "@/lib/email";
import type { Lead, ProposalSnapshot } from "@/lib/proposal";

type Step = "idle" | "form" | "sending" | "otp" | "finishing" | "ready" | "generating" | "done";

function validate(name: string, email: string, phone: string): string {
  if (name.trim().length < 3) return "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return "Please enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) return "Please enter a valid 10-digit mobile number.";
  return "";
}

function download(snap: ProposalSnapshot) {
  const blob = buildProposalPDF(snap);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = snap.ref + "-StartupAndAll-Proposal.pdf";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 400);
}

async function emailProposal(snap: ProposalSnapshot) {
  const summary = snap.lines.map((l) => l[0] + ": " + l[1]).join("\n") + "\nTOTAL: " + snap.total;
  try {
    await sendEmail("tplProposal", {
      to_email: snap.email,
      to_name: snap.name,
      ref: snap.ref,
      service: snap.service,
      state: snap.state,
      total: snap.total,
      proposal_text: summary,
    });
    await sendEmail("tplLead", {
      to_email: LEAD_TO,
      lead_name: snap.name,
      lead_email: snap.email,
      lead_phone: snap.phone,
      service: snap.service + " · " + snap.state,
      total: snap.total,
      datetime: snap.datetime,
      ref: snap.ref,
      proposal_text: summary,
    });
  } catch {
    /* emails best-effort; download still available */
  }
}

export default function ProposalGenerator({
  mode,
  makeSnapshot,
  lead,
}: {
  mode: "otp" | "gated";
  makeSnapshot: (lead: Lead) => ProposalSnapshot | null;
  lead?: Lead;
}) {
  const [step, setStep] = useState<Step>(mode === "gated" ? "ready" : "idle");
  const [name, setName] = useState(lead?.name || "");
  const [email, setEmail] = useState(lead?.email || "");
  const [phone, setPhone] = useState(lead?.phone || "");
  const [err, setErr] = useState("");
  const [snap, setSnap] = useState<ProposalSnapshot | null>(null);

  const otpRef = useRef("");
  const expiresRef = useRef(0);
  const attemptsRef = useRef(0);
  const lastSendRef = useRef(0);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const demoNote =
    !EMAIL_LIVE && step !== "ready" && step !== "generating" ? (
      <div className="prop-demo">
        Demo mode — email service not yet connected. Test OTP: <b>{otpRef.current || ""}</b>
      </div>
    ) : null;

  async function sendOtp() {
    if (step === "sending") return;
    setErr("");
    const v = validate(name, email, phone);
    if (v) {
      setErr(v);
      return;
    }
    if (Date.now() - lastSendRef.current < 30000) {
      setErr("Please wait a few seconds before resending.");
      return;
    }
    otpRef.current = String(Math.floor(100000 + Math.random() * 900000));
    expiresRef.current = Date.now() + 10 * 60 * 1000;
    attemptsRef.current = 0;
    lastSendRef.current = Date.now();
    setStep("sending");
    try {
      await sendEmail("tplOtp", { to_email: email, to_name: name, otp: otpRef.current });
      setStep("otp");
    } catch {
      setStep("form");
      setErr("We could not send the code. Please try again.");
    }
  }

  async function verify(code: string) {
    setErr("");
    if (Date.now() > expiresRef.current) {
      setErr("This code has expired — please resend.");
      return;
    }
    if (attemptsRef.current >= 5) {
      setErr("Too many attempts — please resend a fresh code.");
      return;
    }
    attemptsRef.current++;
    if (code !== otpRef.current) {
      setErr("That code is not correct. Please check and try again.");
      return;
    }
    const s = makeSnapshot({ name, email, phone });
    if (!s) {
      setErr("Could not prepare your proposal. Please try again.");
      return;
    }
    setSnap(s);
    setStep("finishing");
    await emailProposal(s);
    setStep("done");
  }

  async function generateDirect() {
    if (step === "generating" || !lead) return;
    const s = makeSnapshot(lead);
    if (!s) return;
    setSnap(s);
    setStep("generating");
    await emailProposal(s);
    setStep("done");
    download(s);
  }

  // Gate passed: one-click generation
  if (step === "ready" || step === "generating") {
    return (
      <>
        <button
          className="btn-primary full"
          style={{ justifyContent: "center", marginTop: 10 }}
          disabled={step === "generating"}
          onClick={generateDirect}
        >
          {step === "generating" ? "Generating your PDF…" : "Generate PDF quotation →"}
        </button>
        <p className="prop-mini">
          Quotation will be prepared for <b>{name || "you"}</b> and emailed to <b>{email || "your inbox"}</b>.
        </p>
      </>
    );
  }

  if (step === "idle") {
    return (
      <button className="btn-primary full prop-open" style={{ justifyContent: "center", marginTop: 10 }} onClick={() => setStep("form")}>
        Generate my proposal (PDF + email) →
      </button>
    );
  }

  if (step === "form" || step === "sending") {
    return (
      <div className="prop-box">
        <h4>Your proposal, verified to your inbox</h4>
        <input className="prop-in" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="prop-in" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="prop-in" type="tel" placeholder="Mobile number (10 digits)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {err && <p className="prop-err">{err}</p>}
        <button className="btn-primary full" style={{ justifyContent: "center" }} disabled={step === "sending"} onClick={sendOtp}>
          {step === "sending" ? "Sending code…" : "Verify email & continue →"}
        </button>
        <p className="prop-mini">We’ll send a 6-digit code to confirm your email before generating the proposal.</p>
      </div>
    );
  }

  if (step === "otp" || step === "finishing") {
    return (
      <div className="prop-box">
        <h4>Enter the 6-digit code</h4>
        <p className="prop-mini" style={{ marginTop: -4 }}>
          Sent to <b>{email}</b> · valid 10 minutes
        </p>
        {demoNote}
        <input
          className="prop-in prop-otp"
          ref={otpInputRef}
          inputMode="numeric"
          maxLength={6}
          placeholder="••••••"
          onKeyDown={(e) => {
            if (e.key === "Enter") verify((e.target as HTMLInputElement).value.trim());
          }}
        />
        {err && <p className="prop-err">{err}</p>}
        <button
          className="btn-primary full"
          style={{ justifyContent: "center" }}
          disabled={step === "finishing"}
          onClick={() => verify(otpInputRef.current?.value.trim() || "")}
        >
          {step === "finishing" ? "Generating & emailing…" : "Verify & generate proposal"}
        </button>
        <p className="prop-mini">
          <a role="button" tabIndex={0} onClick={sendOtp} style={{ cursor: "pointer" }}>
            Resend code
          </a>{" "}
          ·{" "}
          <a role="button" tabIndex={0} onClick={() => { setStep("form"); setErr(""); }} style={{ cursor: "pointer" }}>
            Change details
          </a>
        </p>
      </div>
    );
  }

  if (step === "done" && snap) {
    return (
      <div className="prop-box prop-done">
        <div className="prop-tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h4>Proposal {snap.ref} is ready</h4>
        <p className="prop-mini">
          {EMAIL_LIVE
            ? "It has been emailed to " + snap.email + ", and our advisory team has received a copy — expect a call within one business day."
            : "Email delivery activates once the email service is connected; your PDF is ready below. Our team will follow up within one business day."}
        </p>
        <button className="btn-primary full" style={{ justifyContent: "center" }} onClick={() => download(snap)}>
          Download proposal (PDF)
        </button>
        <p className="prop-mini">
          Questions right now?{" "}
          <a href="https://wa.me/919028697373" target="_blank" rel="noopener">
            WhatsApp us
          </a>
          .
        </p>
      </div>
    );
  }

  return null;
}
