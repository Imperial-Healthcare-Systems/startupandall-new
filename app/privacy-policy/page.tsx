import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";

export const metadata: Metadata = {
  title: "Privacy Policy — Startup And All",
};

export default function PrivacyPolicyPage() {
  return <StaticHtml html={PAGES["privacy-policy"]} />;
}
