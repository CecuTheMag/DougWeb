import { founding } from "@/content/pricing";
import { HONEYPOT, validate } from "@/lib/early-access";
import { kvConfigured, pipeline } from "@/lib/server/kv";
import { emailConfigured, notifyFounder } from "@/lib/server/notify";
import { limit } from "@/lib/server/rate-limit";

const json = (body: unknown, status = 200) => Response.json(body, { status });

function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Stores the request (so nothing is lost if email fails) and emails the
 * founder. Succeeds if at least one of those worked — and never claims
 * success when neither did.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Send the form as JSON." }, 400);
  }

  // Bots fill every field. Say "thanks" so they don't learn to adapt.
  if (typeof body[HONEYPOT] === "string" && body[HONEYPOT] !== "") {
    return json({ ok: true });
  }

  if (!(await limit(`ea:${clientIp(req)}`, 5, 600))) {
    return json({ error: "Too many requests from this network. Try again in a few minutes." }, 429);
  }

  const { data, errors } = validate(body);
  if (!data) return json({ errors }, 422);

  const at = new Date().toISOString();
  let stored = false;
  let isFounding: boolean | null = null;

  if (kvConfigured) {
    try {
      const key = `doug:ea:${data.email}`;
      const [created] = (await pipeline([["SET", key, JSON.stringify({ ...data, at }), "NX"]])) as [
        string | null,
      ];
      if (created === "OK") {
        const cmds: (string | number)[][] = [["LPUSH", "doug:ea:list", data.email]];
        if (founding.seats !== null) cmds.push(["INCR", "doug:ea:founding"]);
        const out = await pipeline(cmds);
        if (founding.seats !== null) {
          isFounding = (out[1] as number) <= founding.seats;
          await pipeline([["SET", key, JSON.stringify({ ...data, at, founding: isFounding })]]);
        }
      } else {
        // A repeat request from the same email: keep the latest details.
        await pipeline([["SET", key, JSON.stringify({ ...data, at, repeat: true }), "KEEPTTL"]]);
      }
      stored = true;
    } catch (err) {
      console.error("early-access: store failed", err);
    }
  }

  let emailed = false;
  if (emailConfigured) {
    try {
      await notifyFounder(data, { founding: isFounding });
      emailed = true;
    } catch (err) {
      console.error("early-access: email failed", err);
    }
  }

  if (!stored && !emailed) {
    if (!kvConfigured && !emailConfigured && process.env.NODE_ENV !== "production") {
      // Local development with no services configured.
      console.info("early-access (dev, not stored):", data);
      return json({ ok: true, dev: true });
    }
    return json({ error: "We couldn't save your request just now. Please try again in a minute." }, 503);
  }

  return json({ ok: true, founding: isFounding });
}
