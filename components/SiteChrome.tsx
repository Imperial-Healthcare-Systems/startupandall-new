"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global client-side behaviors ported from the original single-file build:
 *  - reveal-on-scroll for .reveal / .reveal-scale / .stat
 *  - sticky header "scrolled" state + scroll-progress bar (#scrollbar)
 *  - floating "Get a consultation" button show/hide
 *  - parallax for .hero-floaty elements
 *  - animated counters for .stat-num inside #statband
 *  - marks .hero as "in" on load
 *
 * Reveal/counters are re-initialised on every route change; the scroll
 * listener is attached once.
 */
export default function SiteChrome() {
  const pathname = usePathname();

  // One-time scroll listener for header state, progress bar, parallax, FAB.
  useEffect(() => {
    const hdr = document.getElementById("hdr");
    const sbar = document.getElementById("scrollbar");
    const onScroll = () => {
      const y = window.scrollY;
      hdr?.classList.toggle("scrolled", y > 12);
      document.getElementById("fab-consult")?.classList.toggle("show", y > 520);
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (sbar) sbar.style.width = p * 100 + "%";
      document.querySelectorAll<HTMLElement>(".hero-floaty").forEach((el, i) => {
        el.style.transform = "translateY(" + y * (i ? 0.18 : -0.12) + "px)";
      });
      // second-guard reveal on scroll
      const vh = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.in),.reveal-scale:not(.in),.stat:not(.in)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < vh * 0.96) el.classList.add("in");
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-run reveal + counters + hero-in on each route change.
  useEffect(() => {
    document.documentElement.classList.add("js-anim");

    // mark hero in
    const hero = document.querySelector(".hero");
    if (hero) requestAnimationFrame(() => hero.classList.add("in"));

    // reveal
    const reveal = (el: Element) => el.classList.add("in");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    const vh = window.innerHeight || 800;
    document.querySelectorAll(".reveal,.reveal-scale,.stat").forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < vh * 0.96) reveal(el);
      else io.observe(el);
    });
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(".reveal,.reveal-scale,.stat").forEach(reveal);
    }, 1200);

    // counters
    const band = document.getElementById("statband");
    let countObs: IntersectionObserver | null = null;
    if (band) {
      const runCount = (el: Element) => {
        const node = el as HTMLElement;
        const to = +(node.getAttribute("data-to") || "0");
        const pre = node.getAttribute("data-pre") || "";
        const suf = node.getAttribute("data-suf") || "";
        const dur = 1100;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          node.innerHTML = pre + Math.round(to * e) + '<span class="suf">' + suf + "</span>";
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      countObs = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.querySelectorAll(".stat-num").forEach(runCount);
              countObs!.unobserve(e.target);
            }
          }),
        { rootMargin: "-40px" }
      );
      countObs.observe(band);
    }

    return () => {
      io.disconnect();
      countObs?.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
