import type { z } from "zod";

export function zodToFieldErrors<T extends Record<string, unknown>>(
  error: z.ZodError<T>,
): Partial<Record<keyof T, string>> {
  const fieldErrors: Partial<Record<keyof T, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0] as keyof T | undefined;
    if (!key) continue;

    fieldErrors[key] = issue.message;
  }

  return fieldErrors;
}
