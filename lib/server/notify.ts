import "server-only";
import { type EarlyAccess, VOLUME_LABELS } from "@/lib/early-access";

/**
 * Emails the founder about a new request via Resend's REST API.
 * Env: RESEND_API_KEY, EARLY_ACCESS_NOTIFY_TO, EARLY_ACCESS_FROM
 * (FROM must be on a domain verified in Resend).
 */

export const emailConfigured = Boolean(
  process.env.RESEND_API_KEY && process.env.EARLY_ACCESS_NOTIFY_TO && process.env.EARLY_ACCESS_FROM,
);

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function notifyFounder(req: EarlyAccess, meta: { founding: boolean | null }) {
  if (!emailConfigured) throw new Error("Email not configured");

  const rows: [string, string][] = [
    ["Name", req.name],
    ["Email", req.email],
    ["Phone", req.phone || "—"],
    ["Use", req.use === "business" ? "Business" : "Personal"],
    ["Calls a week", VOLUME_LABELS[req.volume]],
    ["What matters most", req.priority || "—"],
  ];
  if (meta.founding !== null) rows.push(["Founding seat", meta.founding ? "Yes" : "No — cap reached"]);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font:15px/1.5 -apple-system,Segoe UI,sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#5c574f">${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p style="font:14px sans-serif;color:#5c574f">Promise made on the site: reply within 24 hours.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EARLY_ACCESS_FROM,
      to: process.env.EARLY_ACCESS_NOTIFY_TO!.split(",").map((s) => s.trim()),
      reply_to: req.email,
      subject: `Early access: ${req.name} (${req.use}, ${VOLUME_LABELS[req.volume]} calls/wk)`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
}
