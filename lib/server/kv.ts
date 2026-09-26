import "server-only";

/**
 * Minimal Upstash Redis REST client (works for Vercel KV too — it is Upstash).
 * Uses fetch directly so the site carries no Redis dependency.
 *
 * Env: KV_REST_API_URL + KV_REST_API_TOKEN (Vercel's names), or
 *      UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 */

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);

type Result = { result?: unknown; error?: string };

/** Run commands in one round trip. Throws if KV is unconfigured or errors. */
export async function pipeline(commands: (string | number)[][]): Promise<unknown[]> {
  if (!kvConfigured) throw new Error("KV not configured");
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`KV HTTP ${res.status}`);
  const out = (await res.json()) as Result[];
  const failed = out.find((r) => r.error);
  if (failed) throw new Error(`KV error: ${failed.error}`);
  return out.map((r) => r.result);
}
