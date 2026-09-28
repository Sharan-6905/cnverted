import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  escapeHtml,
  isValidEmail,
  rateLimit,
  readJsonBody,
  sanitizeText,
} from "@/lib/api-safety";

export async function POST(req: Request) {
  if (!rateLimit(req)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await readJsonBody(req);
  const email = body?.email;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const fullName = sanitizeText(body?.fullName, 60) || "there";

  // Email credentials are only needed when handling a request, not at build time.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is temporarily unavailable" },
      { status: 503 },
    );
  }
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Cnvrted <work@cnvrted.com>",
    to: email,
    subject: "We've got your early-access request",
    html: `<p>Hi ${escapeHtml(fullName)},</p><p>A founder reads this within 24 hours and emails you directly to lock a demo slot.</p>`,
  });

  if (error) {
    // the provider's message can carry account detail — keep it server-side
    console.error("early-access-email send failed:", error);
    return NextResponse.json(
      { error: "Could not send email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
