import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, fullName } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Cnvrted <work@cnvrted.com>",
    to: email,
    subject: "We've got your early-access request",
    html: `<p>Hi ${fullName || "there"},</p><p>A founder reads this within 24 hours and emails you directly to lock a demo slot.</p>`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
