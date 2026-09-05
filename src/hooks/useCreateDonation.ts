import { useCallback, useState } from "react";
import { createDonation, type CreateDonationRequest } from "@/api/donations.api";

export function useCreateDonation() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startDonation = useCallback(async (payload: CreateDonationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const { clientSecret } = await createDonation(payload);
      setClientSecret(clientSecret);
    } catch {
      setError("We couldn't start your donation. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { clientSecret, startDonation, loading, error };
}
