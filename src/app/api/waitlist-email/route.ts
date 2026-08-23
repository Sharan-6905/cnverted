import { Resend } from "resend";
import { NextResponse } from "next/server";
import { emailShell } from "@/lib/email-template";
import { escapeHtml, isValidEmail, rateLimit, readJsonBody } from "@/lib/api-safety";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  if (!rateLimit(req)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await readJsonBody(req);
  const email = body?.email;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const html = emailShell({
    heading: "You're on the list.",
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;">
        Thanks for your interest in Cnvrted — we've added <strong>${escapeHtml(email)}</strong> to our early-access list.
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;">
        We're onboarding teams in small batches so every account gets a proper walkthrough. Our team will reach out directly to set up your demo and get you started.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#3A3A3A;">
        In the meantime, feel free to reply to this email with any questions.
      </p>
    `,
  });

  const { error } = await resend.emails.send({
    from: "Cnvrted <work@cnvrted.com>",
    to: email,
    subject: "You're on the Cnvrted early-access list",
    html,
  });

  if (error) {
    // the provider's message can carry account detail — keep it server-side
    console.error("waitlist-email send failed:", error);
    return NextResponse.json({ error: "Could not send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
