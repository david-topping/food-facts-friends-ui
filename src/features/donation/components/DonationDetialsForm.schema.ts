import { z } from "zod";
import { giftAidDetailsSchema } from "./GiftAidDetialsFields.scheama";

export const PRESET_AMOUNTS = [5, 10, 20] as const;
export type PresetAmount = (typeof PRESET_AMOUNTS)[number];

const amountSchema = z
  .union([z.string(), z.number()])
  .transform((v) => (typeof v === "string" ? Number(v) : v))
  .refine((v) => Number.isFinite(v), "Enter a valid amount")
  .refine((v) => v > 5, "Donation amount must be greater than 5")
  .refine((v) => v <= 1000, "Donation amount must be £1000 or less");

export const donationDetailsFormSchema = z.discriminatedUnion("giftAid", [
  z.object({
    amount: amountSchema,
    email: z.string().trim().email("Enter a valid email"),
    giftAid: z.literal(false),
  }),

  z.object({
    amount: amountSchema,
    email: z.string().trim().email("Enter a valid email"),
    giftAid: z.literal(true),
    giftAidDetails: giftAidDetailsSchema,
  }),
]);
