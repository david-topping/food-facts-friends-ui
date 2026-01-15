import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

import { useCreateDonation } from "../../../../../hooks/useCreateDonation";
import { stripePromise } from "../../../../../stripe/stripe";
import { elementsOptions } from "../../../../../stripe/elementsOptions";
import { DonationDetailsForm, type DonationFormData } from "./DonationDetialsForm";
import { StripePaymentForm } from "./StripePaymentForm";

type FinancialDonationProps = {
  content: {
    title: string;
  };
};

export function FinancialDonation({ content }: FinancialDonationProps) {
  const { clientSecret, startDonation, loading } = useCreateDonation();
  const [donationData, setDonationData] = useState<DonationFormData | null>(null);

  const handleFormSubmit = async (data: DonationFormData) => {
    setDonationData(data);

    await startDonation({
      amountPence: Math.round(data.amount * 100),
      email: data.email,
      giftAid: data.giftAid,
    });
  };

  return (
    <Stack alignItems="center" width="100%">
      <Typography variant="h4" align="center" mb={4}>
        {content.title}
      </Typography>

      <Stack spacing={4} width="100%" justifyContent="center">
        {!clientSecret && (
          <DonationDetailsForm
            onSubmit={handleFormSubmit}
            loading={loading}
            initialValues={{
              amount: 10,
              email: "",
              giftAid: false,
            }}
          />
        )}

        {clientSecret && donationData && (
          <Box sx={{ minHeight: "400px" }}>
            <Elements stripe={stripePromise} options={elementsOptions(clientSecret)}>
              <StripePaymentForm amount={donationData.amount} />
            </Elements>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}
