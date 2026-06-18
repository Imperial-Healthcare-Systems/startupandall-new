import type { Metadata } from "next";
import { PAGES } from "@/lib/pages";
import StaticHtml from "@/components/StaticHtml";

export const metadata: Metadata = {
  title: "Refund Policy — Startup And All",
};

export default function RefundPolicyPage() {
  return <StaticHtml html={PAGES["refund-policy"]} />;
}
