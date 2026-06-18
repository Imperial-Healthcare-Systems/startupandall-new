/** Slugify a service name into a quote/route slug — ported from svcSlugify(). */
export function svcSlugify(n: string): string {
  return n
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/—/g, " ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
