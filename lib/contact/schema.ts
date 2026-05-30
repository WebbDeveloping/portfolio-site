import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(256),
  email: z.string().trim().email("Enter a valid email address").max(256),
  message: z.string().trim().min(1, "Message is required").max(5000),
  company: z.literal(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function formDataToContactObject(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
}
