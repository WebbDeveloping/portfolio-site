"use server";

import type { ProjectIntakeFormState } from "@/lib/project-intake/action-state";
import { sendProjectIntakeEmail } from "@/lib/project-intake/send";
import {
  formDataToIntakeObject,
  projectIntakeSchema,
} from "@/lib/project-intake/schema";
import { sendFailed, validationFailed } from "@/lib/contact/action-state";

export async function submitProjectIntake(
  _prevState: ProjectIntakeFormState,
  formData: FormData,
): Promise<ProjectIntakeFormState> {
  const raw = formDataToIntakeObject(formData);

  if (raw.company.trim()) {
    return { status: "success" };
  }

  const result = projectIntakeSchema.safeParse(raw);

  if (!result.success) {
    return validationFailed(raw, result.error);
  }

  try {
    await sendProjectIntakeEmail(result.data);
  } catch {
    return sendFailed(raw);
  }

  return { status: "success" };
}
