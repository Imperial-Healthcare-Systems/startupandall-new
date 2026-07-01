import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";
import HomeClient from "@/components/HomeClient";
import HomeLeadEnhancer from "@/components/HomeLeadEnhancer";
import { getPlatformRatings } from "@/lib/ratings";

export default async function HomePage() {
  // Resolved server-side: live Google rating (when configured) + verified
  // fallback values. Passed to the client so no API key reaches the browser.
  const platforms = await getPlatformRatings();
  return (
    <>
      <StaticHtml html={PAGES.home} />
      <HomeClient platforms={platforms} />
      <HomeLeadEnhancer />
    </>
  );
}
