import { z } from "zod";

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens");

const stringArrayFromForm = z
  .string()
  .transform((value) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  );

export const projectSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  client: z.string().default(""),
  clientLogo: z.string().default(""),
  servicesRendered: z.string().default(""),
  featured: z.coerce.boolean(),
  mainImage: z.string().default(""),
  largeDesktopImg: z.string().default(""),
  standardDesktopImg: z.string().default(""),
  tabletImg: z.string().default(""),
  mobileImg: z.string().default(""),
  additionalPhotos: stringArrayFromForm,
  projectOverview: z.string().default(""),
  projectContribution: z.string().default(""),
  clientFeedback: z.string().default(""),
  finalThought: z.string().default(""),
  services: stringArrayFromForm,
  liveLink: z.string().default(""),
  platformLogo: z.string().default(""),
});

export const postSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  postBody: z.string().default(""),
  postSummary: z.string().default(""),
  mainImage: z.string().default(""),
  thumbnailImage: z.string().default(""),
  featured: z.coerce.boolean(),
});

export const videoSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  featuredImage: z.string().default(""),
  youtubeUrl: z.string().default(""),
  featuredVideo: z.coerce.boolean(),
  mainFeature: z.coerce.boolean(),
  publishedOn: z.string().default(""),
});

export const devProjectSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  tagline: z.string().default(""),
  description: z.string().default(""),
  stack: stringArrayFromForm,
  githubUrl: z.string().optional().transform((v) => v || undefined),
  liveUrl: z.string().optional().transform((v) => v || undefined),
  featured: z.coerce.boolean(),
  heroImage: z.string().optional().transform((v) => v || undefined),
  accentColor: z.string().optional().transform((v) => v || undefined),
  year: z.string().optional().transform((v) => v || undefined),
  problem: z.string().optional().transform((v) => v || undefined),
  solution: z.string().optional().transform((v) => v || undefined),
  features: stringArrayFromForm.optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().default(""),
  icon: z.string().default(""),
  color: z.string().default(""),
  projects: stringArrayFromForm,
});

export type ProjectFormData = z.infer<typeof projectSchema>;
export type PostFormData = z.infer<typeof postSchema>;
export type VideoFormData = z.infer<typeof videoSchema>;
export type DevProjectFormData = z.infer<typeof devProjectSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;

export function parseCheckbox(formData: FormData, name: string): boolean {
  return formData.get(name) === "on" || formData.get(name) === "true";
}

export function formDataToObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      obj[key] = value;
    }
  }
  return obj;
}
