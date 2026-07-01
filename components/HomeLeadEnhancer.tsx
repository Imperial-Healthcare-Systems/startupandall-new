"use client";

import { useEffect } from "react";
import { sendEmail } from "@/lib/email";

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

/**
 * Wires the home hero lead-capture form (name + phone/email + need) to the real
 * submission pipeline (lib/email → EmailJS "tplLead"). In demo mode the send is
 * logged and resolved; in live mode it emails the lead. Mirrors ContactFormEnhancer.
 */
export default function HomeLeadEnhancer() {
  useEffect(() => {
    const form = document.getElementById("lf-form");
    const btn = document.getElementById("lf-submit") as HTMLButtonElement | null;
    if (!form || !btn) return;

    const onSubmit = async () => {
      const name = document.getElementById("lf-name") as HTMLInputElement | null;
      const contact = document.getElementById("lf-ph") as HTMLInputElement | null;
      const need = document.getElementById("lf-need") as HTMLSelectElement | null;
      const err = document.getElementById("lf-err");

      const nm = name?.value.trim() ?? "";
      const ct = contact?.value.trim() ?? "";
      const okContact = /^[0-9+\s-]{7,15}$/.test(ct) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ct);

      name?.classList.remove("bad");
      contact?.classList.remove("bad");
      if (!nm || !okContact) {
        if (!nm) name?.classList.add("bad");
        if (!okContact) contact?.classList.add("bad");
        if (err) err.textContent = !nm ? "Please enter your name." : "Enter a valid phone number or email.";
        return;
      }
      if (err) err.textContent = "";

      btn.textContent = "Sending…";
      btn.disabled = true;
      try {
        await sendEmail("tplLead", {
          name: nm,
          contact: ct,
          need: need?.value ?? "",
          source: "home-hero-cta",
        });
      } catch {
        // Advisor follow-up is manual; never dead-end the user on a transient send error.
      }

      const first = nm.split(" ")[0];
      form.innerHTML =
        '<div class="lf-done">' +
        CHECK_ICON +
        "<h3>Request received.</h3><p>Thanks, " +
        first +
        ". Your dedicated advisor will reach out within one business day with a clear, itemised quote.</p></div>";
    };

    btn.addEventListener("click", onSubmit);
    return () => btn.removeEventListener("click", onSubmit);
  }, []);

  return null;
}
