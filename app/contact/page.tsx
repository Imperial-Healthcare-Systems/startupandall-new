import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";
import ContactFormEnhancer from "@/components/ContactFormEnhancer";

export const metadata: Metadata = {
  title: "Contact — Startup And All",
  description: "Talk to a dedicated advisor — free, no obligation. Clear, itemised quotes within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <StaticHtml html={PAGES["contact"]} />
      <ContactFormEnhancer />
    </>
  );
}
