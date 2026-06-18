"use client";

import { useEffect } from "react";

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

/** Wires the contact form (objective picker + validation + demo submit). */
export default function ContactFormEnhancer() {
  useEffect(() => {
    let objective = "";
    const cleanups: Array<() => void> = [];

    const grid = document.getElementById("obj-grid");
    if (grid) {
      grid.querySelectorAll<HTMLElement>(".obj").forEach((b) => {
        const onClick = () => {
          objective = b.getAttribute("data-v") || "";
          grid.querySelectorAll(".obj").forEach((x) => x.classList.toggle("sel", x === b));
          const eo = document.getElementById("e-obj");
          if (eo) eo.textContent = "";
        };
        b.addEventListener("click", onClick);
        cleanups.push(() => b.removeEventListener("click", onClick));
      });
    }

    const btn = document.getElementById("submit-btn") as HTMLButtonElement | null;
    if (btn) {
      const onSubmit = () => {
        const name = document.getElementById("f-name") as HTMLInputElement;
        const phone = document.getElementById("f-phone") as HTMLInputElement;
        const email = document.getElementById("f-email") as HTMLInputElement;
        let ok = true;
        const setErr = (el: HTMLElement, id: string, msg: string) => {
          const e = document.getElementById(id);
          if (e) e.textContent = msg || "";
          el.classList.toggle("bad", !!msg);
          if (msg) ok = false;
        };
        setErr(name, "e-name", name.value.trim() ? "" : "Please enter your name.");
        setErr(phone, "e-phone", /^[0-9+\s-]{7,15}$/.test(phone.value.trim()) ? "" : "Enter a valid phone number.");
        setErr(email, "e-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Enter a valid email.");
        const eo = document.getElementById("e-obj");
        if (eo) eo.textContent = objective ? "" : "Pick what you're trying to do.";
        if (!objective) ok = false;
        if (!ok) return;
        const mount = document.getElementById("form-mount");
        const first = name.value.trim().split(" ")[0];
        btn.textContent = "Sending…";
        btn.disabled = true;
        setTimeout(() => {
          if (mount)
            mount.innerHTML =
              '<div class="form-done">' +
              CHECK_ICON +
              "<h3>Request received.</h3><p>Thanks, " +
              first +
              ". Your dedicated advisor will reach out within one business day with a clear, itemised quote. The first conversation is on us.</p></div>";
        }, 900);
      };
      btn.addEventListener("click", onSubmit);
      cleanups.push(() => btn.removeEventListener("click", onSubmit));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
