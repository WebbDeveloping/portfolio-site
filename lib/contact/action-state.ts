import type { z } from "zod";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string>;
  formError?: string;
  values?: Record<string, string>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };

export type ContactFormAction = (
  prevState: ContactFormState,
  formData: FormData,
) => Promise<ContactFormState>;

export function contactFormString(
  state: ContactFormState,
  name: string,
  fallback = "",
): string {
  const value = state.values?.[name];
  return typeof value === "string" ? value : fallback;
}

export function validationFailed(
  raw: Record<string, string>,
  error: z.ZodError,
): ContactFormState {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key !== "company" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return {
    status: "error",
    fieldErrors,
    values: raw,
  };
}

export function sendFailed(
  raw: Record<string, string>,
  message = "Something went wrong. Please try again.",
): ContactFormState {
  return {
    status: "error",
    formError: message,
    values: raw,
  };
}
