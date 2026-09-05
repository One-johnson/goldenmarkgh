import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { resolveInfoEmail } from "@/lib/contact-routing";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

async function getInfoEmail(): Promise<string> {
  try {
    const payload = await getPayload({ config });
    const contact = await payload.findGlobal({
      slug: "contact",
      overrideAccess: true,
    });

    return resolveInfoEmail(contact.emailInfo as string | undefined);
  } catch {
    return resolveInfoEmail();
  }
}

function buildEmailContent(
  body: Required<Pick<ContactPayload, "name" | "email" | "message">> &
    ContactPayload,
) {
  return {
    subject: `[Goldenmark website] Inquiry — ${body.name}`,
    text: [
      "Inquiry type: General inquiry",
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.company ? `Company: ${body.company}` : null,
      body.phone ? `Phone: ${body.phone}` : null,
      "",
      body.message,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const recipient = await getInfoEmail();
  const mail = buildEmailContent({ name, email, phone, company, message });

  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  if (smtpConfigured) {
    console.info("[contact form] SMTP configured but nodemailer not installed yet", {
      to: recipient,
      subject: mail.subject,
    });

    return NextResponse.json({
      ok: true,
      demo: true,
      routedTo: recipient,
      message: "SMTP is configured. Install nodemailer to enable delivery.",
    });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (accessKey) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: mail.subject,
        from_name: name,
        name,
        email,
        phone,
        company,
        message: mail.text,
      }),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: result.message || "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, routedTo: recipient });
  }

  console.info("[contact form]", {
    to: recipient,
    subject: mail.subject,
    name,
    email,
    phone,
    company,
    message,
  });

  return NextResponse.json({
    ok: true,
    demo: true,
    routedTo: recipient,
    message:
      "Form received in demo mode. Configure SMTP (Namecheap) or WEB3FORMS_ACCESS_KEY for delivery.",
  });
}
