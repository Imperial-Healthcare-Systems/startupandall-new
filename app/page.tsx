import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <>
      <StaticHtml html={PAGES.home} />
      <HomeClient />
    </>
  );
}
