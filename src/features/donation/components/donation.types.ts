import type { z } from "zod";
import { donationDetailsFormSchema } from "./DonationDetailsForm.schema";
import type { GiftAidDetails } from "./GiftAidDetailsFields.schema";

export type { GiftAidDetails };

export type DonationDetails = z.infer<typeof donationDetailsFormSchema>;

/**
 * Gift Aid form state: every field is a controlled string, so `addressLine2`
 * is always present (possibly `""`) unlike the validated {@link GiftAidDetails}.
 */
export type GiftAidDetailsValues = Required<GiftAidDetails>;
