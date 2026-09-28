import { createHash } from "node:crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml, rateLimit, sanitizeText } from "@/lib/api-safety";
import { COMMUNITY_STEPS, communityFieldError, normalizeWebsite, type CommunityAnswers } from "@/lib/community";

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  // Next's internal URL can use localhost behind a proxy. Check the browser-facing host.
  const requestUrl = new URL(req.url);
  const requestHost = req.headers.get("host") ?? requestUrl.host;
  const protocol = req.headers.get("x-forwarded-proto")?.split(",")[0].trim() || requestUrl.protocol.slice(0, -1);
  if (origin && origin !== `${protocol}://${requestHost}`) {
    return NextResponse.json({ error: "Please submit this form from the Cnvrted website." }, { status: 403 });
  }
  if (!rateLimit(req)) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    // Bound the stream before buffering, including requests without Content-Length.
    const reader = req.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return NextResponse.json({ error: "Submission is too large." }, { status: 413 }); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Please check your answers and try again." }, { status: 400 });
  }

  if (body.companyFax) return NextResponse.json({ error: "Unable to submit this form." }, { status: 400 });
  const answers = {} as CommunityAnswers;
  for (const step of COMMUNITY_STEPS) {
    const value = body[step.key];
    if (typeof value !== "string" || value.length > step.maxLength) {
      return NextResponse.json({ error: `Please check your ${step.label.toLowerCase()}.`, field: step.key }, { status: 400 });
    }
    answers[step.key] = sanitizeText(value, step.maxLength);
    const error = communityFieldError(step.key, answers[step.key]);
    if (error) return NextResponse.json({ error, field: step.key }, { status: 400 });
  }
  answers.website = normalizeWebsite(answers.website) ?? "";
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "We couldn’t send your answers right now. Please try again or email work@cnvrted.com." }, { status: 503 });

  const rows = COMMUNITY_STEPS.map((step) => [step.label, answers[step.key] || "Not provided"]);
  // Provider idempotency prevents double delivery when a response is lost and retried.
  const key = createHash("sha256").update(JSON.stringify(answers)).digest("hex");
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: "Cnvrted <work@cnvrted.com>",
      to: "work@cnvrted.com",
      replyTo: answers.email,
      subject: "New Cnvrted Slack community sign-up",
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
      html: `<h2>New Slack community sign-up</h2><dl>${rows.map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`).join("")}</dl>`,
    }, { idempotencyKey: `community/${key}` });
    if (error) throw new Error("Delivery failed");
  } catch {
    return NextResponse.json({ error: "Your answers weren’t sent. Please try again or email work@cnvrted.com." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
