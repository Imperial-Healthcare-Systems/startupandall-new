import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";

export const metadata: Metadata = {
  title: "Terms of Use — Startup And All",
};

export default function TermsOfUsePage() {
  return <StaticHtml html={PAGES["terms-of-use"]} />;
}
