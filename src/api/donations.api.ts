import { appConfig } from "@/config/appConfig";
import type { GiftAidDetails } from "@/features/donation/components/donation.types";

export type CreateDonationRequest =
  | {
      amountPence: number;
      email: string;
      giftAid: false;
    }
  | {
      amountPence: number;
      email: string;
      giftAid: true;
      giftAidDetails: GiftAidDetails;
    };

export type CreateDonationResponse = {
  clientSecret: string;
};

export async function createDonation(payload: CreateDonationRequest) {
  const res = await fetch(`${appConfig.apiBaseUrl}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create donation");
  }

  return res.json() as Promise<CreateDonationResponse>;
}
