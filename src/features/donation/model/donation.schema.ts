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
      .min(5, "Minimum donation is £5")
      .max(1000, "Maximum donation is £1000"),
  );

const baseSchema = z.object({
  amount: donationAmountSchema,
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .pipe(z.email("Please enter a valid email")),
});

const giftAidDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "Required for Gift Aid"),
  lastName: z.string().trim().min(1, "Required for Gift Aid"),
  addressLine1: z.string().trim().min(1, "Required for Gift Aid"),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(1, "Required for Gift Aid"),
  postcode: z.string().trim().min(1, "Required for Gift Aid"),
  country: z.string().trim().min(1, "Required for Gift Aid"),
});

export const donationDetailsFormSchema = z.discriminatedUnion("giftAid", [
  baseSchema.extend({
    giftAid: z.literal(false),
  }),

  baseSchema
    .extend({
      giftAid: z.literal(true),
    })
    .merge(giftAidDetailsSchema),
]);
