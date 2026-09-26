import "server-only";
import { kvConfigured, pipeline } from "./kv";

/**
 * Fixed-window rate limit per key. Uses KV when configured so the limit holds
 * across serverless instances; otherwise falls back to process memory, which
 * is only per-instance but still stops a single hammering client.
 */

const memory = new Map<string, { count: number; resetAt: number }>();

export async function limit(key: string, max: number, windowS: number): Promise<boolean> {
  if (kvConfigured) {
    try {
      const k = `doug:rl:${key}`;
      const [count] = (await pipeline([
        ["INCR", k],
        ["EXPIRE", k, windowS, "NX"],
      ])) as [number];
      return count <= max;
    } catch {
      // Fall through to memory: a KV outage must not block real signups.
    }
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + windowS * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}
