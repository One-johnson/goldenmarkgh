import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  resolveRecipientEmail,
  type DepartmentEmails,
} from "@/lib/contact-routing";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  inquiryType?: string;
  message?: string;
}

async function getDepartmentEmails(): Promise<Partial<DepartmentEmails>> {
  try {
    const payload = await getPayload({ config });
    const contact = await payload.findGlobal({
      slug: "contact",
      overrideAccess: true,
    });

    return {
      info: contact.emailInfo as string | undefined,
      trade: contact.emailTrade as string | undefined,
      finance: contact.emailFinance as string | undefined,
      operations: contact.emailOperations as string | undefined,
      ceo: contact.emailCeo as string | undefined,
    };
  } catch {
    return {};
  }
}

function buildEmailContent(body: Required<Pick<ContactPayload, "name" | "email" | "message">> & ContactPayload, label: string) {
  return {
    subject: `[Goldenmark website] ${label} — ${body.name}`,
    text: [
      `Inquiry type: ${label}`,
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
  const inquiryType = body.inquiryType?.trim() ?? "general";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const departmentEmails = await getDepartmentEmails();
  const recipient = resolveRecipientEmail(inquiryType, departmentEmails);
  const mail = buildEmailContent(
    { name, email, phone, company, inquiryType, message },
    recipient.label,
  );

  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  if (smtpConfigured) {
    // Nodemailer integration point — install `nodemailer` when Namecheap SMTP is ready.
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT || 465),
    //   secure: process.env.SMTP_SECURE !== "false",
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM || process.env.SMTP_USER,
    //   to: recipient.to,
    //   cc: process.env.CONTACT_CC_INFO === "true" ? departmentEmails.info : undefined,
    //   replyTo: email,
    //   subject: mail.subject,
    //   text: mail.text,
    // });

    console.info("[contact form] SMTP configured but nodemailer not installed yet", {
      to: recipient.to,
      subject: mail.subject,
    });

    return NextResponse.json({
      ok: true,
      demo: true,
      routedTo: recipient.to,
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
        inquiry_type: recipient.label,
        routed_to: recipient.to,
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

    return NextResponse.json({ ok: true, routedTo: recipient.to });
  }

  console.info("[contact form]", {
    to: recipient.to,
    department: recipient.department,
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
    routedTo: recipient.to,
    message:
      "Form received in demo mode. Configure SMTP (Namecheap) or WEB3FORMS_ACCESS_KEY for delivery.",
  });
}
