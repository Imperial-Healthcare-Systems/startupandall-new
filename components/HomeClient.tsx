"use client";

import { useEffect } from "react";
import { startHeroCanvas } from "@/lib/hero-canvas";
import { REVIEWS, RV_PLATFORMS } from "@/lib/reviews-data";

function rvStars(n: number) {
  n = Math.max(0, Math.min(5, Math.round(n)));
  let h = '<span class="rv-stars" aria-label="' + n + ' out of 5 stars">';
  for (let i = 1; i <= 5; i++) {
    h += '<svg class="' + (i <= n ? "on" : "off") + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/></svg>';
  }
  return h + "</span>";
}
function rvGoogleLogo() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 12 0 12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z"/></svg>';
}
function rvJustdialLogo() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="6" fill="#00923F"/><text x="12" y="16.4" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#fff">JD</text></svg>';
}
const rvLogo = (p: string) => (p === "google" ? rvGoogleLogo() : rvJustdialLogo());
function rvInitials(name: string) {
  const parts = (name || "").replace(/[[\]]/g, "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "—";
  return ((parts[0][0] || "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

type Platform = { name: string; url: string; rating: string; count: string };
const PLATS = RV_PLATFORMS as unknown as Record<string, Platform>;

/** Full label shown on the hero trust badges (falls back to the platform name). */
const HERO_BADGE_LABEL: Record<string, string> = {
  google: "Google Business Profile",
  justdial: "Justdial",
};

/** Renders the GMB / Justdial trust badges in the hero from resolved platform data. */
function renderHeroBadges(plats: Record<string, Platform>) {
  const el = document.getElementById("hero-badges");
  if (!el) return;
  el.innerHTML = Object.keys(plats)
    .map((k) => {
      const p = plats[k];
      const label = HERO_BADGE_LABEL[k] || p.name;
      return (
        '<a class="hero-badge" href="' + p.url + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        p.rating + ' star rating on ' + label + (p.count ? ", " + p.count + " reviews" : "") + '">' +
        '<span class="hb-ic">' + rvLogo(k) + "</span>" +
        '<span class="hb-meta">' +
        '<span class="hb-title">' + label + "</span>" +
        '<span class="hb-score"><b>' + p.rating + "</b>" + rvStars(parseFloat(p.rating)) +
        (p.count ? '<span class="hb-count">' + p.count + " reviews</span>" : "") +
        "</span></span></a>"
      );
    })
    .join("");
}

function renderReviews(plats: Record<string, Platform>) {
  const platsEl = document.getElementById("rv-plats");
  const gridEl = document.getElementById("rv-grid");
  const ctaEl = document.getElementById("rv-cta");
  if (!gridEl) return;

  if (platsEl) {
    platsEl.innerHTML = Object.keys(plats)
      .map((k) => {
        const p = plats[k];
        return (
          '<a class="rv-plat" href="' + p.url + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="rv-plat-ic">' + rvLogo(k) + "</span>" +
          '<span class="rv-plat-meta">' +
          '<span class="rv-plat-score"><b>' + p.rating + "</b>" + rvStars(parseFloat(p.rating)) + "</span>" +
          '<span class="rv-plat-sub">Rated on <b>' + p.name + "</b>" + (p.count ? " · " + p.count + " reviews" : "") + "</span>" +
          "</span></a>"
        );
      })
      .join("");
  }

  gridEl.innerHTML = REVIEWS.map((r) => {
    const pname = (plats[r.platform] || ({} as Platform)).name || "";
    return (
      '<article class="rv-card reveal">' +
      '<div class="rv-card-top"><span class="rv-badge" title="' + pname + '">' + rvLogo(r.platform) + "</span>" +
      '<span class="rv-quote"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2-1.3 3.2-3 3.8.4.7.8 1.2.8 1.2 2.8-.9 5.2-3.2 5.2-7V10.5C10.5 8 9.9 6 7.5 6zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c0 2-1.3 3.2-3 3.8.4.7.8 1.2.8 1.2 2.8-.9 5.2-3.2 5.2-7V10.5C19.5 8 18.9 6 16.5 6z"/></svg></span></div>' +
      rvStars(r.rating) +
      '<p class="rv-text">' + r.text + "</p>" +
      '<div class="rv-foot"><span class="rv-av">' + rvInitials(r.name) + "</span>" +
      '<span class="rv-who"><span class="rv-name">' + r.name + "</span>" +
      '<span class="rv-date">' + (r.date ? r.date + " · " : "") + "via " + pname + "</span></span></div>" +
      "</article>"
    );
  }).join("");

  if (ctaEl) {
    const arrow =
      '<span class="rv-btn-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>';
    ctaEl.innerHTML = Object.keys(plats)
      .map((k) => {
        const p = plats[k];
        return (
          '<a class="rv-btn" href="' + p.url + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="rv-btn-logo">' + rvLogo(k) + "</span>View all " + p.name + " reviews" + arrow + "</a>"
        );
      })
      .join("");
  }
}

/** Drives the home page's static markup: hero canvas + injected reviews/badges. */
export default function HomeClient({ platforms }: { platforms?: Record<string, Platform> }) {
  useEffect(() => {
    // Server-resolved live ratings when provided; otherwise the static config.
    const plats = platforms && Object.keys(platforms).length ? platforms : PLATS;
    renderHeroBadges(plats);
    renderReviews(plats);
    const cv = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
    if (cv) return startHeroCanvas(cv);
  }, [platforms]);
  return null;
}
