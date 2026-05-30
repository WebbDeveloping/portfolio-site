import { Resend } from "resend";
import {
  BUDGETS,
  BUSINESS_TYPES,
  HIRING_INTENTS,
  INDUSTRIES,
  PLATFORMS,
  PROJECT_TYPES,
  TIMELINES,
  WEB_REQUIREMENTS,
  labelFor,
} from "@/lib/project-intake/form-config";
import type { ProjectIntakeData } from "@/lib/project-intake/schema";

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

function row(label: string, value: string) {
  const safeLabel = escapeHtml(label);
  const safeValue = escapeHtml(value).replaceAll("\n", "<br />");
  return `<tr><td style="padding:8px 16px 8px 0;font-weight:600;vertical-align:top;white-space:nowrap;">${safeLabel}</td><td style="padding:8px 0;vertical-align:top;">${safeValue}</td></tr>`;
}

function optionalRow(label: string, value: string | undefined) {
  if (!value?.trim()) return "";
  return row(label, value.trim());
}

export async function sendProjectIntakeEmail(data: ProjectIntakeData) {
  const { apiKey, from, to } = getContactConfig();
  const resend = new Resend(apiKey);

  const safeName = escapeHtml(data.name);
  const industryLabel = labelFor(INDUSTRIES, data.industry);
  const industryDisplay =
    data.industry === "other" && data.industryOther?.trim()
      ? `${industryLabel}: ${data.industryOther.trim()}`
      : industryLabel;

  const rows = [
    row("Project type", labelFor(PROJECT_TYPES, data.projectType)),
    needsWebRequirementRow(data),
    needsPlatformRow(data),
    row("Business type", labelFor(BUSINESS_TYPES, data.businessType)),
    row("Industry", industryDisplay),
    row("Timeline", labelFor(TIMELINES, data.timeline)),
    row("Budget", labelFor(BUDGETS, data.budget)),
    row("Hiring intent", labelFor(HIRING_INTENTS, data.hiringIntent)),
    row("Name", data.name),
    row("Email", data.email),
    optionalRow("Phone", data.phone),
    optionalRow("Additional notes", data.notes),
  ]
    .filter(Boolean)
    .join("");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New project inquiry from ${data.name}`,
    html: `
      <p><strong>New project intake submission</strong></p>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.5;">
        ${rows}
      </table>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function needsWebRequirementRow(data: ProjectIntakeData) {
  if (!data.webRequirement) return "";
  return row("Project requirement", labelFor(WEB_REQUIREMENTS, data.webRequirement));
}

function needsPlatformRow(data: ProjectIntakeData) {
  if (!data.platform) return "";
  return row("Platform", labelFor(PLATFORMS, data.platform));
}
