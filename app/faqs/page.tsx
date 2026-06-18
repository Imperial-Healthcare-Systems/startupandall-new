import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";
import FaqEnhancer from "@/components/FaqEnhancer";

export const metadata: Metadata = {
  title: "FAQs — Startup And All",
  description: "Answers to common questions about registration, GST, trademarks, compliance and pricing.",
};

export default function FaqsPage() {
  return (
    <>
      <StaticHtml html={PAGES["faqs"]} />
      <FaqEnhancer />
    </>
  );
}
