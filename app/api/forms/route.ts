import { NextResponse } from "next/server";
import { site } from "@/lib/content";
import {
  volunteerPreferenceOptions,
  volunteerSkillOptions,
  volunteerStatusOptions,
} from "@/lib/volunteer-form";

export const runtime = "nodejs";

const BREVO_API = "https://api.brevo.com/v3";

type FormPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  newsletterOptIn?: unknown;
  whatsapp?: unknown;
  lga?: unknown;
  status?: unknown;
  statusOther?: unknown;
  preference?: unknown;
  skills?: unknown;
  skillOther?: unknown;
  website?: unknown;
  formType?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function buildNotificationEmail({
  formLabel,
  name,
  email,
  subject,
  message,
  newsletterOptIn,
  volunteerDetails,
}: {
  formLabel: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  newsletterOptIn: boolean;
  volunteerDetails?: {
    whatsapp: string;
    lga: string;
    status: string;
    preference: string;
    skills: string[];
  };
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "No subject provided");
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const subscriptionStatus = newsletterOptIn
    ? "Subscribed to newsletter and public event emails"
    : "Not subscribed to newsletter emails";

  const informationRows = volunteerDetails
    ? ([
        ["WhatsApp Phone Number", volunteerDetails.whatsapp],
        ["Local Government Area", volunteerDetails.lga],
        ["Current Status", volunteerDetails.status],
        ["Volunteer Preference", volunteerDetails.preference],
        ["Skills and Experience", volunteerDetails.skills.join(", ")],
      ] as Array<[string, string]>)
        .map(([label, value]) => `<tr><td style="padding:12px 16px;border-bottom:1px solid #e3e8e4;font-size:12px;line-height:18px;font-weight:700;color:#5b6b62;vertical-align:top;width:36%;">${escapeHtml(label)}</td><td style="padding:12px 16px;border-bottom:1px solid #e3e8e4;font-size:14px;line-height:21px;color:#12211a;word-break:break-word;">${escapeHtml(value)}</td></tr>`)
        .join("")
    : `<tr><td style="padding:16px 18px 8px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5b6b62;">Subject</td></tr><tr><td style="padding:0 18px 16px;font-size:15px;line-height:22px;font-weight:600;color:#12211a;">${safeSubject}</td></tr><tr><td style="padding:0 18px 8px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5b6b62;">Email preference</td></tr><tr><td style="padding:0 18px 16px;font-size:14px;line-height:21px;color:#12211a;">${subscriptionStatus}</td></tr>`;

  const responseContent = volunteerDetails
    ? ""
    : `<p style="margin:0 0 10px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5b6b62;">Message</p><div style="padding:18px;background-color:#ffffff;border:1px solid #e3e8e4;border-radius:12px;font-size:15px;line-height:24px;color:#12211a;word-break:break-word;">${safeMessage}</div>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(formLabel)} received</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f7f5ef;font-family:Arial,Helvetica,sans-serif;color:#12211a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">A new ${escapeHtml(formLabel.toLowerCase())} was sent through the HLI website.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f5ef;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e3e8e4;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background-color:#0b4422;color:#ffffff;">
                <p style="margin:0;font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#cfe2d5;">The Health enLight Initiative</p>
                <h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:32px;font-weight:600;color:#ffffff;">${escapeHtml(formLabel)}</h1>
                <p style="margin:8px 0 0;font-size:14px;line-height:21px;color:#e5efe8;">A new ${volunteerDetails ? "application" : "message"} has arrived from your website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 12px;">
                <p style="margin:0 0 6px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5b6b62;">From</p>
                <p style="margin:0;font-size:20px;line-height:28px;font-weight:700;color:#12211a;">${safeName}</p>
                <p style="margin:4px 0 0;font-size:14px;line-height:21px;color:#0b4422;"><a href="mailto:${safeEmail}" style="color:#0b4422;text-decoration:underline;">${safeEmail}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 24px;">
                ${volunteerDetails ? `<p style="margin:0 0 10px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5b6b62;">Application details</p>` : ""}
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f7f5ef;border-radius:12px;">
                  ${informationRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 30px;">
                ${responseContent}
                <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:22px;padding:12px 20px;background-color:#0b4422;border-radius:999px;color:#ffffff;font-size:14px;line-height:20px;font-weight:700;text-decoration:none;">Reply to ${safeName}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#eef4f0;border-top:1px solid #e3e8e4;">
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:22px;font-weight:600;color:#0b4422;">Enlightening Communities, Transforming Health</p>
                <p style="margin:5px 0 0;font-size:12px;line-height:18px;color:#5b6b62;">Website form notification · <a href="${site.url}" style="color:#0b4422;text-decoration:underline;">thehealthenlightinitiative.org</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function brevoRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${BREVO_API}${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY ?? "",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(`Brevo request failed (${response.status}).`);
    throw new Error("Brevo request failed");
  }
}

export async function POST(request: Request) {
  let payload: FormPayload;
  try {
    payload = (await request.json()) as FormPayload;
  } catch {
    return errorResponse("Invalid form submission.", 400);
  }

  // Quietly accept honeypot submissions without sending or storing them.
  if (cleanText(payload.website, 200)) return NextResponse.json({ ok: true });

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 254).toLowerCase();
  const subject = cleanText(payload.subject, 160).replace(/[\r\n\t]+/g, " ");
  const message = cleanText(payload.message, 5000);
  const formType = payload.formType === "volunteer" ? "volunteer" : payload.formType === "contact" ? "contact" : "";
  const newsletterOptIn = formType === "volunteer" || payload.newsletterOptIn === true;

  const whatsapp = cleanText(payload.whatsapp, 60);
  const lga = cleanText(payload.lga, 120);
  const status = cleanText(payload.status, 80);
  const statusOther = cleanText(payload.statusOther, 120);
  const preference = cleanText(payload.preference, 260);
  const skillOther = cleanText(payload.skillOther, 160);
  const skills = Array.isArray(payload.skills)
    ? payload.skills.filter((skill): skill is string => typeof skill === "string").map((skill) => cleanText(skill, 80))
    : [];

  const validVolunteer =
    formType !== "volunteer" ||
    (whatsapp.length > 0 &&
      lga.length > 0 &&
      volunteerStatusOptions.includes(status as (typeof volunteerStatusOptions)[number]) &&
      (status !== "Other" || statusOther.length > 0) &&
      volunteerPreferenceOptions.includes(preference as (typeof volunteerPreferenceOptions)[number]) &&
      skills.length > 0 &&
      skills.length <= volunteerSkillOptions.length &&
      skills.every((skill) => volunteerSkillOptions.includes(skill as (typeof volunteerSkillOptions)[number])) &&
      new Set(skills).size === skills.length &&
      (!skills.includes("Other") || skillOther.length > 0));

  if (!formType || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (formType === "contact" && !message) || !validVolunteer) {
    return errorResponse("Please check the form fields and try again.", 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || site.name;
  const recipientEmail = process.env.BREVO_TO_EMAIL || site.email;
  const volunteerListId = process.env.BREVO_VOLUNTEER_LIST_ID;
  const newsletterListId = process.env.BREVO_NEWSLETTER_LIST_ID;

  if (!apiKey || !senderEmail) {
    console.error("Brevo is not configured: BREVO_API_KEY and BREVO_SENDER_EMAIL are required.");
    return errorResponse("The form service is not configured yet.", 503);
  }

  const listIds: number[] = [];
  if (formType === "volunteer") {
    if (!volunteerListId || !/^\d+$/.test(volunteerListId)) {
      console.error("Brevo volunteer list is not configured.");
      return errorResponse("The form service is not configured yet.", 503);
    }
    listIds.push(Number(volunteerListId));
  }
  if (newsletterOptIn) {
    if (!newsletterListId || !/^\d+$/.test(newsletterListId)) {
      console.error("Brevo newsletter list is not configured.");
      return errorResponse("The form service is not configured yet.", 503);
    }
    listIds.push(Number(newsletterListId));
  }

  const formLabel = formType === "volunteer" ? "Volunteer application" : "Contact message";
  const subjectLine = subject ? `${formLabel}: ${subject}` : formLabel;
  const applicationSkills = skills.map((skill) => skill === "Other" ? `Other: ${skillOther}` : skill);
  const htmlContent = buildNotificationEmail({
    formLabel,
    name,
    email,
    subject,
    message,
    newsletterOptIn,
    volunteerDetails: formType === "volunteer" ? {
      whatsapp,
      lga,
      status: status === "Other" ? `Other: ${statusOther}` : status,
      preference,
      skills: applicationSkills,
    } : undefined,
  });

  try {
    // Only volunteer submissions and affirmative newsletter opt-ins enter a list.
    // updateEnabled lets repeat submissions update the existing Brevo contact;
    // we never clear Brevo's emailBlacklisted status here.
    if (listIds.length > 0) {
      await brevoRequest("/contacts", {
        email,
        attributes: {
          FIRSTNAME: name.split(/\s+/)[0],
          ...(name.split(/\s+/).length > 1
            ? { LASTNAME: name.split(/\s+/).slice(1).join(" ") }
            : {}),
        },
        listIds,
        updateEnabled: true,
      });
    }

    // Send the form notification to HLI's inbox. The submitter is set as reply-to.
    await brevoRequest("/smtp/email", {
      sender: { email: senderEmail, name: senderName },
      to: [{ email: recipientEmail, name: site.name }],
      replyTo: { email, name },
      subject: subjectLine,
      htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return errorResponse("We could not send your message right now. Please try again.", 502);
  }
}
