import { useState } from "react";
import { createDonation, type CreateDonationRequest } from "../api/donations.api";

export function useCreateDonation() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startDonation = async (payload: CreateDonationRequest) => {
    setLoading(true);

    const { clientSecret } = await createDonation(payload);

    setClientSecret(clientSecret);
    setLoading(false);
  };

  return { clientSecret, startDonation, loading };
}
