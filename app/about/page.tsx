import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";

export const metadata: Metadata = {
  title: "About — Startup And All",
  description: "One dedicated advisor, clear upfront pricing, and 150+ services under one roof.",
};

export default function AboutPage() {
  return <StaticHtml html={PAGES["about"]} />;
}
