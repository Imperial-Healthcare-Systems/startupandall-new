import pagesJson from "./pages.json";

/**
 * Marketing/content page bodies ported from the original build. Hash-router
 * links (`#/...`) have been rewritten to real Next.js routes (`/...`).
 * Used for static content sections; interactive widgets are mounted separately.
 */
export const PAGES = pagesJson as Record<string, string>;

/** Split a page body at an element marker, returning the HTML before/after it. */
export function splitAt(html: string, marker: string): [string, string] {
  const i = html.indexOf(marker);
  if (i < 0) return [html, ""];
  const before = html.slice(0, i);
  const after = html.slice(i + marker.length);
  return [before, after];
}
