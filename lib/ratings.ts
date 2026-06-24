// Server-only module: imported solely by the home server component. It reads a
// non-NEXT_PUBLIC env var (GOOGLE_PLACES_API_KEY), so the key is never bundled
// into client JS. Do not import this from a "use client" component.
import { RV_PLATFORMS } from "@/lib/reviews-data";

export type PlatformRating = {
  name: string;
  url: string;
  rating: string;
  count: string;
};

/**
 * How long (in seconds) a fetched live rating is cached before Next.js
 * re-fetches it. One day keeps the badge in sync without hammering the API
 * (the rating barely moves between individual reviews anyway).
 */
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Fetch the live Google rating + review count via the Google Places API
 * (Place Details). Returns `null` when not configured or on any error, so the
 * caller can fall back to the verified values in RV_PLATFORMS.
 *
 * Requires two server-side env vars:
 *   - GOOGLE_PLACES_API_KEY  – a key with the "Places API (New)" enabled
 *   - GOOGLE_PLACE_ID        – the Place ID for the business listing
 *
 * The key is only ever read on the server (this module is imported only by the
 * home server component), so it is never shipped to the browser. Next.js caches
 * the response for
 * REVALIDATE_SECONDS, after which the next request transparently refreshes it —
 * this is what keeps the rating "automatically in sync" as new reviews land.
 */
async function fetchGoogleLive(): Promise<{ rating: string; count: string } | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const url =
      "https://places.googleapis.com/v1/places/" +
      encodeURIComponent(placeId) +
      "?fields=rating,userRatingCount&key=" +
      encodeURIComponent(key);
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;

    const data: { rating?: number; userRatingCount?: number } = await res.json();
    if (typeof data.rating !== "number") return null;

    return {
      rating: data.rating.toFixed(1),
      count: typeof data.userRatingCount === "number" ? String(data.userRatingCount) : "",
    };
  } catch {
    return null;
  }
}

/**
 * Resolve the rating data shown on the home page.
 *
 * - Google: live from the Places API when configured, otherwise the verified
 *   fallback in RV_PLATFORMS.
 * - Justdial: always the verified value from RV_PLATFORMS — Justdial exposes no
 *   public ratings API and its pages are JS-rendered + anti-scraping, so live
 *   fetching is not technically feasible. Update the value in reviews-data.ts
 *   when it changes. (See docs/ratings.md.)
 */
export async function getPlatformRatings(): Promise<Record<string, PlatformRating>> {
  // Plain, serialisable clone of the readonly config so we can override fields.
  const platforms: Record<string, PlatformRating> = JSON.parse(JSON.stringify(RV_PLATFORMS));

  const googleLive = await fetchGoogleLive();
  if (googleLive && platforms.google) {
    platforms.google = { ...platforms.google, ...googleLive };
  }

  return platforms;
}
