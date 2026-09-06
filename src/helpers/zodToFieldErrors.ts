import type { z } from "zod";

/**
 * Flattens a `ZodError` into a `{ field: message }` map for the issues located
 * directly under `parentPath` (the root by default). The first message per
 * field wins.
 *
 * Pass `parentPath` to pull out errors for a nested object, e.g.
 * `zodToFieldErrors(error, ["giftAidDetails"])`.
 */
export function zodToFieldErrors<Field extends string = string>(
  error: z.ZodError,
  parentPath: PropertyKey[] = [],
): Partial<Record<Field, string>> {
  const fieldErrors: Partial<Record<Field, string>> = {};

  for (const issue of error.issues) {
    if (issue.path.length !== parentPath.length + 1) continue;
    if (parentPath.some((segment, index) => issue.path[index] !== segment)) continue;

    const field = issue.path[parentPath.length] as Field;
    if (fieldErrors[field] === undefined) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}
