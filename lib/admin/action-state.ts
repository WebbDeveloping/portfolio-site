import type { z } from "zod";

export type AdminFormState = {
  ok: boolean;
  fieldErrors?: Record<string, string>;
  formError?: string;
  values?: Record<string, string | boolean>;
  formKey?: number;
};

export const initialAdminFormState: AdminFormState = { ok: true };

export type AdminFormAction = (
  prevState: AdminFormState,
  formData: FormData,
) => Promise<AdminFormState>;

export function formString(state: AdminFormState, name: string, fallback = ""): string {
  const value = state.values?.[name];
  return typeof value === "string" ? value : fallback;
}

export function formBoolean(state: AdminFormState, name: string, fallback = false): boolean {
  const value = state.values?.[name];
  return typeof value === "boolean" ? value : fallback;
}

export function validationFailed(
  raw: Record<string, string>,
  extras: Record<string, string | boolean>,
  error: z.ZodError,
): AdminFormState {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }

  return {
    ok: false,
    fieldErrors,
    values: { ...raw, ...extras },
    formKey: Date.now(),
  };
}

export function saveFailed(
  raw: Record<string, string>,
  extras: Record<string, string | boolean>,
  message = "Something went wrong. Please try again.",
  fieldErrors?: Record<string, string>,
): AdminFormState {
  return {
    ok: false,
    formError: message,
    fieldErrors,
    values: { ...raw, ...extras },
    formKey: Date.now(),
  };
}

export function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}
