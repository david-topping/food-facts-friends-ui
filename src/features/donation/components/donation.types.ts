import type { z } from "zod";
import { donationDetailsFormSchema } from "./DonationDetialsForm.schema";

export type DonationDetails = z.infer<typeof donationDetailsFormSchema>;
