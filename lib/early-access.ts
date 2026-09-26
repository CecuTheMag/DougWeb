/**
 * The early-access request: one schema, validated identically in the browser
 * (for fast feedback) and on the server (the only check that counts).
 */

export const USES = ["personal", "business"] as const;
export const VOLUMES = ["under-20", "20-50", "50-150", "150-plus"] as const;

export const VOLUME_LABELS: Record<(typeof VOLUMES)[number], string> = {
  "under-20": "Fewer than 20",
  "20-50": "20 to 50",
  "50-150": "50 to 150",
  "150-plus": "More than 150",
};

export interface EarlyAccess {
  name: string;
  email: string;
  phone: string;
  use: (typeof USES)[number];
  volume: (typeof VOLUMES)[number];
  priority: string;
}

export type Errors = Partial<Record<keyof EarlyAccess, string>>;

/** The field a bot fills and a person never sees. */
export const HONEYPOT = "website";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function validate(input: Record<string, unknown>): { data?: EarlyAccess; errors: Errors } {
  const data = {
    name: str(input.name, 120),
    email: str(input.email, 254).toLowerCase(),
    phone: str(input.phone, 32),
    use: str(input.use, 16),
    volume: str(input.volume, 16),
    priority: str(input.priority, 1000),
  };

  const errors: Errors = {};
  if (!data.name) errors.name = "Tell us what to call you.";
  if (!EMAIL.test(data.email)) errors.email = "Enter an email address like you@company.com.";
  if (data.phone && data.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "That number looks too short. Leave it blank if you prefer email.";
  }
  if (!(USES as readonly string[]).includes(data.use)) errors.use = "Choose Personal or Business.";
  if (!(VOLUMES as readonly string[]).includes(data.volume)) errors.volume = "Pick the closest range.";

  if (Object.keys(errors).length) return { errors };
  return { data: data as EarlyAccess, errors };
}
