export type CreateDonationRequest = {
  amountPence: number;
  email: string;
  giftAid: boolean;
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

  return res.json();
}
