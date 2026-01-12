import type { StripeElementsOptions } from "@stripe/stripe-js";

export const elementsOptions = (clientSecret: string): StripeElementsOptions => ({
  clientSecret,
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#2e7d32",
    },
  },
});
