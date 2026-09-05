import type { z } from "zod";
import { donationDetailsFormSchema } from "./DonationDetailsForm.schema";

export type DonationDetails = z.infer<typeof donationDetailsFormSchema>;
