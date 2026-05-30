import { Resend } from "resend";
import type { ContactFormData } from "@/lib/contact/schema";

function getContactConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Contact email is not configured");
  }

  return { apiKey, from, to };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(data: ContactFormData) {
  const { apiKey, from, to } = getContactConfig();
  const resend = new Resend(apiKey);

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Portfolio inquiry from ${data.name}`,
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
