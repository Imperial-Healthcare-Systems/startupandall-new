import { EMAIL_CFG } from "./email-config";

/**
 * Email integration — ported from sendEmail(). In `demo` mode (the default,
 * with placeholder keys) the whole journey works without an email backend:
 * sends are logged and resolved after a short delay. To go LIVE, fill the
 * EmailJS keys in lib/email-config.ts and set mode: 'live'.
 */
export async function sendEmail(
  tpl: "tplOtp" | "tplProposal" | "tplLead",
  params: Record<string, unknown>
): Promise<{ demo?: boolean; sent?: boolean }> {
  const cfg = EMAIL_CFG as {
    mode: string;
    leadTo: string;
    emailjs: { publicKey: string; serviceId: string; tplOtp: string; tplProposal: string; tplLead: string };
  };
  if (cfg.mode !== "live") {
    // eslint-disable-next-line no-console
    console.log("[demo email]", tpl, params);
    await new Promise((r) => setTimeout(r, 500));
    return { demo: true };
  }
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: cfg.emailjs.serviceId,
      user_id: cfg.emailjs.publicKey,
      template_id: cfg.emailjs[tpl],
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error("email failed");
  return { sent: true };
}

export const LEAD_TO = (EMAIL_CFG as { leadTo: string }).leadTo;
export const EMAIL_LIVE = (EMAIL_CFG as { mode: string }).mode === "live";
