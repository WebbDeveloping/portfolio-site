export type IntakeOption<T extends string = string> = {
  value: T;
  label: string;
};

export const PROJECT_TYPES = [
  { value: "web-design", label: "Web design & development" },
  { value: "marketing", label: "Marketing & lead generation" },
  { value: "gohighlevel", label: "GoHighLevel / CRM setup" },
  { value: "branding", label: "Branding" },
  { value: "multiple", label: "Multiple services" },
  { value: "not-sure", label: "Not sure yet" },
] as const satisfies readonly IntakeOption[];

export const WEB_REQUIREMENTS = [
  { value: "new-site", label: "New website from scratch" },
  { value: "redesign", label: "Redesign or major rebuild" },
  { value: "updates", label: "Updates to an existing site" },
  { value: "support", label: "Ongoing support / maintenance" },
  { value: "not-sure", label: "Not sure yet" },
] as const satisfies readonly IntakeOption[];

export const PLATFORMS = [
  { value: "wordpress", label: "WordPress" },
  { value: "shopify", label: "Shopify" },
  { value: "wix", label: "Wix" },
  { value: "squarespace", label: "Squarespace" },
  { value: "webflow", label: "Webflow" },
  { value: "gohighlevel", label: "GoHighLevel" },
  { value: "nextjs", label: "Next.js / React" },
  { value: "custom", label: "Custom built" },
  { value: "not-sure", label: "Not sure" },
] as const satisfies readonly IntakeOption[];

export const BUSINESS_TYPES = [
  { value: "personal", label: "Personal / side project" },
  { value: "solopreneur", label: "Solopreneur / freelancer" },
  { value: "small", label: "Small business (1–19 employees)" },
  { value: "medium", label: "Medium business (20–99 employees)" },
  { value: "large", label: "Large organization (100+ employees)" },
] as const satisfies readonly IntakeOption[];

export const INDUSTRIES = [
  { value: "business-services", label: "Business Services" },
  { value: "creative-services", label: "Creative Services" },
  { value: "entertainment-events", label: "Entertainment & Events" },
  { value: "financial-services", label: "Financial Services" },
  { value: "health-fitness", label: "Health & Fitness" },
  { value: "home-services", label: "Home Services" },
  { value: "restaurant-food", label: "Restaurant / Food" },
  { value: "retail-consumer", label: "Retail / Consumer Goods" },
  { value: "technology-software", label: "Technology / Software" },
  { value: "real-estate", label: "Real estate" },
  { value: "education-coaching", label: "Education / coaching" },
  { value: "non-profit", label: "Non-profit" },
  { value: "other", label: "Other" },
] as const satisfies readonly IntakeOption[];

export const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "2-4-weeks", label: "Within 2–4 weeks" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "flexible", label: "Flexible / no fixed deadline" },
  { value: "discuss", label: "Prefer to discuss timing" },
] as const satisfies readonly IntakeOption[];

export const BUDGETS = [
  { value: "under-2500", label: "Under $2,500" },
  { value: "2500-5000", label: "$2,500 – $5,000" },
  { value: "5000-10000", label: "$5,000 – $10,000" },
  { value: "10000-25000", label: "$10,000 – $25,000" },
  { value: "25000-plus", label: "$25,000+" },
  { value: "discuss", label: "Prefer to discuss" },
] as const satisfies readonly IntakeOption[];

export const HIRING_INTENTS = [
  { value: "ready-now", label: "Ready to hire now" },
  { value: "comparing", label: "Comparing options (deciding within a few weeks)" },
  { value: "researching", label: "Researching / early planning" },
  { value: "gathering-info", label: "Just gathering information" },
] as const satisfies readonly IntakeOption[];

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];
export type WebRequirement = (typeof WEB_REQUIREMENTS)[number]["value"];
export type Platform = (typeof PLATFORMS)[number]["value"];
export type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];
export type Industry = (typeof INDUSTRIES)[number]["value"];
export type Timeline = (typeof TIMELINES)[number]["value"];
export type Budget = (typeof BUDGETS)[number]["value"];
export type HiringIntent = (typeof HIRING_INTENTS)[number]["value"];

export type IntakeStepId =
  | "projectType"
  | "webRequirement"
  | "platform"
  | "businessType"
  | "industry"
  | "industryOther"
  | "timeline"
  | "budget"
  | "hiringIntent"
  | "contact";

export const CONTACT_STEP_FIELDS = ["name", "email", "phone", "notes"] as const;

export function getIntakeStepIds(context: {
  projectType: string;
  industry: string;
}): IntakeStepId[] {
  const steps: IntakeStepId[] = ["projectType"];

  if (needsWebRequirement(context.projectType)) {
    steps.push("webRequirement");
  }

  if (needsPlatform(context.projectType)) {
    steps.push("platform");
  }

  steps.push("businessType", "industry");

  if (needsIndustryOther(context.industry)) {
    steps.push("industryOther");
  }

  steps.push(
    "timeline",
    "budget",
    "hiringIntent",
    "contact",
  );

  return steps;
}

export function stepIndexForField(
  field: string,
  context: { projectType: string; industry: string },
): number {
  const lookupField = (CONTACT_STEP_FIELDS as readonly string[]).includes(field)
    ? "contact"
    : field;
  const steps = getIntakeStepIds(context);
  const index = steps.indexOf(lookupField as IntakeStepId);
  return index >= 0 ? index + 1 : 1;
}

export function needsWebRequirement(projectType: string): boolean {
  return projectType === "web-design" || projectType === "multiple";
}

export function needsPlatform(projectType: string): boolean {
  return (
    projectType === "web-design" ||
    projectType === "gohighlevel" ||
    projectType === "multiple"
  );
}

export function needsIndustryOther(industry: string): boolean {
  return industry === "other";
}

function valuesOf<T extends string>(options: readonly IntakeOption<T>[]) {
  return options.map((option) => option.value);
}

export function labelFor<T extends string>(
  options: readonly IntakeOption<T>[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

export const projectTypeValues = valuesOf(PROJECT_TYPES);
export const webRequirementValues = valuesOf(WEB_REQUIREMENTS);
export const platformValues = valuesOf(PLATFORMS);
export const businessTypeValues = valuesOf(BUSINESS_TYPES);
export const industryValues = valuesOf(INDUSTRIES);
export const timelineValues = valuesOf(TIMELINES);
export const budgetValues = valuesOf(BUDGETS);
export const hiringIntentValues = valuesOf(HIRING_INTENTS);
