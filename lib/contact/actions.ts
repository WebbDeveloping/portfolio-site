"use server";

import {
  type ContactFormState,
  sendFailed,
  validationFailed,
} from "@/lib/contact/action-state";
import { sendContactEmail } from "@/lib/contact/send";
import { contactSchema, formDataToContactObject } from "@/lib/contact/schema";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = formDataToContactObject(formData);

  if (raw.company.trim()) {
    return { status: "success" };
  }

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return validationFailed(raw, result.error);
  }

  try {
    await sendContactEmail(result.data);
  } catch {
    return sendFailed(raw);
  }

  return { status: "success" };
}
