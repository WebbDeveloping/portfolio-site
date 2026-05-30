import { z } from "zod";
import {
  budgetValues,
  businessTypeValues,
  hiringIntentValues,
  industryValues,
  needsPlatform,
  needsWebRequirement,
  platformValues,
  projectTypeValues,
  timelineValues,
  webRequirementValues,
} from "@/lib/project-intake/form-config";

const optionalString = z.string().trim().max(500);

export const projectIntakeSchema = z
  .object({
    projectType: z.enum(projectTypeValues as [string, ...string[]], {
      message: "Select a project type",
    }),
    webRequirement: z
      .enum(webRequirementValues as [string, ...string[]])
      .or(z.literal(""))
      .optional(),
    platform: z
      .enum(platformValues as [string, ...string[]])
      .or(z.literal(""))
      .optional(),
    businessType: z.enum(businessTypeValues as [string, ...string[]], {
      message: "Select a business type",
    }),
    industry: z.enum(industryValues as [string, ...string[]], {
      message: "Select an industry",
    }),
    industryOther: optionalString.optional(),
    timeline: z.enum(timelineValues as [string, ...string[]], {
      message: "Select a timeline",
    }),
    budget: z.enum(budgetValues as [string, ...string[]], {
      message: "Select a budget range",
    }),
    hiringIntent: z.enum(hiringIntentValues as [string, ...string[]], {
      message: "Select how ready you are to hire",
    }),
    name: z.string().trim().min(1, "Name is required").max(256),
    email: z.string().trim().email("Enter a valid email address").max(256),
    phone: optionalString.optional(),
    notes: z.string().trim().max(5000).optional(),
    company: z.literal(""),
  })
  .superRefine((data, ctx) => {
    if (needsWebRequirement(data.projectType) && !data.webRequirement) {
      ctx.addIssue({
        code: "custom",
        path: ["webRequirement"],
        message: "Select a project requirement",
      });
    }

    if (needsPlatform(data.projectType) && !data.platform) {
      ctx.addIssue({
        code: "custom",
        path: ["platform"],
        message: "Select a platform",
      });
    }

    if (data.industry === "other" && !data.industryOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["industryOther"],
        message: "Please describe your industry",
      });
    }
  });

export type ProjectIntakeData = z.infer<typeof projectIntakeSchema>;

export function formDataToIntakeObject(formData: FormData) {
  return {
    projectType: String(formData.get("projectType") ?? ""),
    webRequirement: String(formData.get("webRequirement") ?? ""),
    platform: String(formData.get("platform") ?? ""),
    businessType: String(formData.get("businessType") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    industryOther: String(formData.get("industryOther") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    hiringIntent: String(formData.get("hiringIntent") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
}
