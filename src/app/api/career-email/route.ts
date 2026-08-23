import { Resend } from "resend";
import { NextResponse } from "next/server";
import { emailShell } from "@/lib/email-template";
import {
  escapeHtml,
  isValidEmail,
  rateLimit,
  readJsonBody,
  sanitizeText,
} from "@/lib/api-safety";

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

  const firstName = sanitizeText(body?.name, 40).split(" ")[0] || "there";

  const html = emailShell({
    heading: "We've got your application.",
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;">
        Hi ${escapeHtml(firstName)},
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;">
        Thanks for applying to Cnvrted — we've received your application and our team is reviewing it now.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#3A3A3A;">
        If your background looks like a fit, someone from our team will reach out directly to set up a conversation.
      </p>
    `,
  });

  const { error } = await resend.emails.send({
    from: "Cnvrted <work@cnvrted.com>",
    to: email,
    subject: "We've received your application",
    html,
  });

  if (error) {
    // the provider's message can carry account detail — keep it server-side
    console.error("career-email send failed:", error);
    return NextResponse.json({ error: "Could not send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
