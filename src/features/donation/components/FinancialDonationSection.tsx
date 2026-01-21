import { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "../../../stripe/stripe";
import { elementsOptions } from "../../../stripe/elementsOptions";
import { useCreateDonation } from "../../../hooks/useCreateDonation";

import { DonationDetailsForm } from "./DonationDetialsFrom";
import { StripePaymentForm } from "./StripePaymentForm";
import type { DonationDetails } from "../model/donation.types";

type FinancialDonationSectionProps = {
  content: { title: string };
};

const CONTENT_MAX_WIDTH = 520;

export function FinancialDonationSection({ content }: FinancialDonationSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { clientSecret, startDonation, loading } = useCreateDonation();
  const [donationData, setDonationData] = useState<DonationDetails | null>(null);

  const scrollToTopOfSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDetailsSubmit = async (data: DonationDetails) => {
    scrollToTopOfSection();

    setDonationData(data);

    await startDonation({
      amountPence: Math.round(data.amount * 100),
      email: data.email,
      giftAid: data.giftAid,
    });

    requestAnimationFrame(() => scrollToTopOfSection());
  };

  const isDetailsStep = !clientSecret;
  const isPaymentStep = !!clientSecret && !!donationData;

  return (
    <Stack ref={sectionRef} alignItems="center" width="100%" spacing={4}>
      <Typography variant="h4" align="center">
        {content.title}
      </Typography>

      <Box sx={{ width: "100%", maxWidth: CONTENT_MAX_WIDTH }}>
        {isDetailsStep && (
          <DonationDetailsForm
            loading={loading}
            initialValues={donationData ?? undefined}
            onSubmit={handleDetailsSubmit}
          />
        )}

        {isPaymentStep && (
          <Box
            sx={{
              width: "100%",
              minHeight: 420,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Elements stripe={stripePromise} options={elementsOptions(clientSecret)}>
              <StripePaymentForm amount={donationData.amount} />
            </Elements>
          </Box>
        )}
      </Box>
    </Stack>
  );
}
