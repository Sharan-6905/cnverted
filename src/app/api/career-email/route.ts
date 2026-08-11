import { Resend } from "resend";
import { NextResponse } from "next/server";
import { emailShell } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const firstName = (name || "").trim().split(" ")[0] || "there";

  const html = emailShell({
    heading: "We've got your application.",
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3A3A;">
        Hi ${firstName},
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
