import type { z } from "zod";
import { donationDetailsFormSchema } from "./donation.schema";

export type DonationDetails = z.infer<typeof donationDetailsFormSchema>;
