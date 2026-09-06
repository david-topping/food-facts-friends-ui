import { useEffect, useRef, useState } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/stripe/stripe";
import { elementsOptions } from "@/stripe/elementsOptions";
import { useCreateDonation } from "@/hooks/useCreateDonation";
import { trackEvent } from "@/app/analytics/ga";

import { DonationDetailsForm } from "./DonationDetailsForm";
import { StripePaymentForm } from "./StripePaymentForm";
import { setPendingDonation } from "../pendingDonation";
import type { DonationDetails } from "./donation.types";

type FinancialDonationSectionProps = {
  content: { title: string };
};

const CONTENT_MAX_WIDTH = 520;
const CURRENCY = "GBP";

export function FinancialDonationSection({ content }: FinancialDonationSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { clientSecret, startDonation, loading, error } = useCreateDonation();
  const [donationData, setDonationData] = useState<DonationDetails | null>(null);

  const isDetailsStep = !clientSecret;
  const isPaymentStep = !!clientSecret && !!donationData;

  useEffect(() => {
    if (error) trackEvent("donation_start_error");
  }, [error]);

  useEffect(() => {
    if (isPaymentStep && donationData) {
      setPendingDonation({ amount: donationData.amount, giftAid: donationData.giftAid });
      trackEvent("add_payment_info", {
        currency: CURRENCY,
        value: donationData.amount,
        gift_aid: donationData.giftAid,
      });
    }
  }, [isPaymentStep, donationData]);

  const scrollToTopOfSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDetailsSubmit = async (data: DonationDetails) => {
    scrollToTopOfSection();
    setDonationData(data);

    trackEvent("begin_checkout", {
      currency: CURRENCY,
      value: data.amount,
      gift_aid: data.giftAid,
    });

    await startDonation(
      data.giftAid
        ? {
            amountPence: Math.round(data.amount * 100),
            email: data.email,
            giftAid: true,
            giftAidDetails: data.giftAidDetails,
          }
        : {
            amountPence: Math.round(data.amount * 100),
            email: data.email,
            giftAid: false,
          },
    );

    requestAnimationFrame(() => scrollToTopOfSection());
  };

  return (
    <Stack ref={sectionRef} alignItems="center" width="100%" spacing={4}>
      <Typography variant="h4" align="center">
        {content.title}
      </Typography>

      <Box sx={{ width: "100%", maxWidth: CONTENT_MAX_WIDTH }}>
        {isDetailsStep && (
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <DonationDetailsForm
              loading={loading}
              initialValues={donationData ?? undefined}
              onSubmit={handleDetailsSubmit}
            />
          </Stack>
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
