import { z } from "zod";

export const PRESET_AMOUNTS = [5, 10, 20] as const;
export type PresetAmount = (typeof PRESET_AMOUNTS)[number];

const donationAmountSchema = z
  .union([z.number(), z.string()])
  .transform((val) => (typeof val === "string" ? Number(val) : val))
  .pipe(
    z
      .number()
      .refine((v) => Number.isFinite(v), { message: "Please enter a valid amount" })
      .min(1, "Minimum donation is £1")
      .max(1000, "Maximum donation is £1000"),
  );

export const donationDetailsFormSchema = z
  .object({
    amount: donationAmountSchema,

    email: z
      .string()
      .trim()
      .min(1, "Please enter your email")
      .pipe(z.email("Please enter a valid email")),

    giftAid: z.boolean(),

    addressLine1: z.string().trim().optional(),
    addressLine2: z.string().trim().optional(),
    city: z.string().trim().optional(),
    postcode: z.string().trim().optional(),
    country: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.giftAid) return;

    const required: Array<keyof typeof data> = ["addressLine1", "city", "postcode", "country"];

    for (const field of required) {
      const val = data[field];
      if (typeof val !== "string" || val.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: "Required for Gift Aid",
        });
      }
    }
  });
