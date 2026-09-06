import { useEffect, useRef, useState } from "react";
import { Alert, Box, Card, Stack, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/stripe/stripe";
import { elementsOptions } from "@/stripe/elementsOptions";
import { useCreateDonation } from "@/hooks/useCreateDonation";
import { trackEvent } from "@/app/analytics/ga";
import { tokens } from "@/theme/tokens";

import { DonationDetailsForm } from "./DonationDetailsForm";
import { DonationSummary } from "./DonationSummary";
import { StripePaymentForm } from "./StripePaymentForm";
import { setPendingDonation } from "../pendingDonation";
import type { DonationDetails } from "./donation.types";

type FinancialDonationSectionProps = {
  content: { title: string };
};

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
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <Stack ref={sectionRef} spacing={3} sx={{ width: "100%", maxWidth: { xs: 560, md: 900 } }}>
      {isDetailsStep && (
        <Card sx={{ p: { xs: 3, md: 4 }, boxShadow: tokens.shadow.lg }}>
          <Stack spacing={0.5} sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
              Give money
            </Typography>
            <Typography variant="h4" component="h2">
              {content.title}
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <DonationDetailsForm
            loading={loading}
            initialValues={donationData ?? undefined}
            onSubmit={handleDetailsSubmit}
          />
        </Card>
      )}

      {isPaymentStep && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 240px" },
            gap: { xs: 3, md: 5 },
            alignItems: "start",
          }}
        >
          <Card sx={{ p: { xs: 3, md: 4 }, boxShadow: tokens.shadow.lg }}>
            <Elements stripe={stripePromise} options={elementsOptions(clientSecret)}>
              <StripePaymentForm amount={donationData.amount} />
            </Elements>
          </Card>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <DonationSummary amount={donationData.amount} giftAid={donationData.giftAid} />
          </Box>
        </Box>
      )}
    </Stack>
  );
}
