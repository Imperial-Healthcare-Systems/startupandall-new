import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";

export const metadata: Metadata = {
  title: "Why Us — Startup And All",
  description: "Why founders choose Startup And All for registration, compliance and IP.",
};

export default function WhyUsPage() {
  return <StaticHtml html={PAGES["why-us"]} />;
}
