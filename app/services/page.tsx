import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";
import ServiceCatalogue from "@/components/ServiceCatalogue";

export const metadata: Metadata = {
  title: "Services & Pricing — 150+ services | Startup And All",
  description:
    "Our complete catalogue, grouped by need — company registration, GST, trademarks, ROC/MCA compliance, licences and more. Each service delivered by a dedicated advisor.",
};

// Split the marketing body around the self-contained catalogue <section>, and
// render that section as JSX with the interactive React catalogue inside.
const SECTION_OPEN = '<section class="wrap sec" id="catalogue">';

export default function ServicesPage() {
  const html = PAGES.services;
  const start = html.indexOf(SECTION_OPEN);
  const end = html.indexOf("</section>", start) + "</section>".length;
  const before = start >= 0 ? html.slice(0, start) : html;
  const after = start >= 0 ? html.slice(end) : "";

  return (
    <>
      <StaticHtml html={before} />
      <section className="wrap sec" id="catalogue">
        <span className="eyebrow">
          <i />
          Section C · Everything we do
        </span>
        <h2 className="h2">The full catalogue · 150+ services</h2>
        <p className="sub">Our complete catalogue, grouped by need. Each service is delivered by a dedicated point of contact and priced on request.</p>
        <div className="mt32">
          <ServiceCatalogue />
        </div>
      </section>
      <StaticHtml html={after} />
    </>
  );
}
