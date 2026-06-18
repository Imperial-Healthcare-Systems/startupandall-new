"use client";

import ProposalGenerator from "./ProposalGenerator";
import { svcSnapshot } from "@/lib/proposal";

/** OTP-gated proposal generator for a service/package quote. */
export default function QuoteProposal({ slug }: { slug: string }) {
  return <ProposalGenerator mode="otp" makeSnapshot={(lead) => svcSnapshot(slug, lead)} />;
}
