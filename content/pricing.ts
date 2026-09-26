/**
 * Every price on the site comes from this file. Change a number here and it
 * changes everywhere — the pricing section, the FAQ and the structured data.
 */

export type PlanId = "personal" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  /** Monthly price in whole US dollars. */
  price: number;
  audience: string;
  summary: string;
  includes: string[];
}

export const currency = "USD";

export const plans: Plan[] = [
  {
    id: "personal",
    name: "Personal",
    price: 49,
    audience: "Founders, agents, consultants",
    summary: "A gatekeeper for one person’s phone.",
    includes: [
      "Screens the calls you don’t pick up",
      "VIPs ring straight through during your hours",
      "Blocked numbers never reach you",
      "Quiet hours: callers leave a voicemail instead",
      "A summary by email and text after every call",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 199,
    audience: "Clinics, contractors, studios",
    summary: "A receptionist for a business line.",
    includes: [
      "Answers every call, including after hours",
      "Answers questions from the details you give it",
      "Takes a callback number on every message",
      "Puts urgent callers through while you’re open",
      "A summary by email and text after every call",
    ],
  },
];

export const founding = {
  /** Shown next to the price. */
  label: "Founding-member price, locked for as long as you stay.",
  /**
   * Cap on founding seats. `null` hides every mention of a cap.
   * If you set a number, the pricing section states the cap and
   * /api/early-access enforces it: requests past the cap are still stored,
   * marked `founding: false`, and the confirmation tells that person plainly
   * that the founding seats are taken. Never show a cap that isn’t enforced.
   */
  seats: null as number | null,
};

/**
 * Included call minutes per plan. `null` means not decided yet, and the FAQ
 * says so plainly instead of inventing an allowance.
 */
export const includedMinutes: Record<PlanId, number | null> = {
  personal: null,
  business: null,
};

export const pilot = {
  days: 14,
  lines: [
    "Free 14-day pilot",
    "No contract",
    "Turn forwarding off in about ten seconds",
  ],
};
