export type GiftAidDetails = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
};

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

const API_BASE_URL = import.meta.env.VITE_FFF_API_BASE_URL;

export async function createDonation(payload: CreateDonationRequest) {
  const res = await fetch(`${API_BASE_URL}/donations`, {
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
