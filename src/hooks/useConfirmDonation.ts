import { useState, useCallback } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeError } from "@stripe/stripe-js";

export function useConfirmDonation() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StripeError | null>(null);

  const confirm = useCallback(async () => {
    if (!stripe || !elements) {
      throw new Error("Stripe not ready");
    }

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donate/success`,
        },
        redirect: "always",
      });

      if (result.error) {
        setError(result.error);
      }

      return result;
    } finally {
      setLoading(false);
    }
  }, [stripe, elements, loading]);

  return {
    confirm,
    loading,
    error,
  };
}
