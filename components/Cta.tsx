"use client";

import type { PlanId } from "@/content/pricing";
import { track } from "@/lib/analytics";

export const PLAN_EVENT = "doug:plan";

/**
 * An anchor to a section on the page that also records the click. When `plan`
 * is set it preselects that use case in the early-access form.
 */
export function Cta({
  href,
  cta,
  location,
  plan,
  className = "btn",
  children,
}: {
  href: string;
  cta: "early_access" | "hear_doug";
  location: string;
  plan?: PlanId;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        track({ name: "cta_click", props: { cta, location } });
        if (plan) window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: plan }));
      }}
    >
      {children}
    </a>
  );
}
