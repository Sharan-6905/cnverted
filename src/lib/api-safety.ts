/**
 * Shared guards for the public email endpoints. They take an unauthenticated
 * body and hand it to Resend, so everything that reaches the provider — the
 * recipient and any name echoed back into the template — is treated as hostile
 * until proven otherwise.
 */

/** Entity-encodes a value before it is interpolated into email HTML. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Single-address check: no display names, no comments, no commas, so a body can
 * never widen one send into a bulk send. Length caps keep a long local part from
 * being used as a payload carrier.
 */
const EMAIL_PATTERN =
  /^[^\s@,;<>"']{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" && value.length <= 254 && EMAIL_PATTERN.test(value)
  );
}

/** Trims a free-text field to a safe length and drops control characters. */
export function sanitizeText(value: unknown, maxLength = 80) {
  if (typeof value !== "string") return "";

  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    // strip C0 controls and DEL, which have no place in a name field
    if (code >= 32 && code !== 127) out += char;
  }

  return out.trim().slice(0, maxLength);
}

/** Reads a JSON body without letting a malformed one throw past the handler. */
export async function readJsonBody(
  req: Request
): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * Best-effort per-IP throttle. Serverless instances each keep their own map, so
 * this bounds a single instance rather than the fleet — enough to stop a naive
 * flood from turning the endpoint into a mail cannon, but a shared store
 * (Upstash, Redis) is what makes the limit real under scale.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimit(req: Request, max = MAX_PER_WINDOW) {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0].trim() || req.headers.get("x-real-ip");

  // Behind Vercel the forwarded header is always set. If it ever isn't, every
  // caller would land in one shared bucket, so five requests from anyone would
  // lock the forms for everyone — that bucket gets a far looser ceiling.
  const key = ip || "unidentified";
  const ceiling = ip ? max : max * 12;

  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= ceiling) {
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // keep the map from growing without bound on a long-lived instance
  if (hits.size > 5000) {
    for (const [entryKey, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return true;
}
