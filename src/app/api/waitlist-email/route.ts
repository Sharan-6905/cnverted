import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Cnvrted <work@cnvrted.com>",
    to: email,
    subject: "You're on the Cnvrted early-access list",
    html: `<p>Thank you for registering — our team will get in touch with you.</p>`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
