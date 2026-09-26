import { track as vercelTrack } from "@vercel/analytics";

/**
 * Conversion events. Kept to a closed set so dashboards stay clean.
 * Custom events need a Vercel plan that includes them; on other plans
 * `track` is a harmless no-op.
 */
export type Event =
  | { name: "cta_click"; props: { cta: "early_access" | "hear_doug"; location: string } }
  | { name: "calculator_used"; props: { monthly: number } }
  | { name: "demo_play"; props: { source: string } }
  | { name: "form_submit"; props: { use: string; status: "ok" | "error" } };

export function track(event: Event) {
  try {
    vercelTrack(event.name, event.props);
  } catch {
    // Analytics must never break the page.
  }
}
