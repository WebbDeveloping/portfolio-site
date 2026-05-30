export type ProjectIntakeFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string>;
  formError?: string;
  values?: Record<string, string>;
};

export const initialProjectIntakeFormState: ProjectIntakeFormState = {
  status: "idle",
};

export function intakeFormString(
  state: ProjectIntakeFormState,
  name: string,
  fallback = "",
): string {
  const value = state.values?.[name];
  return typeof value === "string" ? value : fallback;
}
