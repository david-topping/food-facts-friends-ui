import { z } from "zod";

export const giftAidDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),

  addressLine1: z.string().trim().min(1, "Address line 1 is required"),
  addressLine2: z.string().trim().optional(),

  city: z.string().trim().min(1, "City is required"),

  postcode: z
    .string()
    .trim()
    .min(1, "Postcode is required")
    .regex(/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i, "Enter a valid UK postcode"),

  country: z.string().trim().min(1, "Country is required"),
});

export type GiftAidDetailsSchema = z.infer<typeof giftAidDetailsSchema>;
