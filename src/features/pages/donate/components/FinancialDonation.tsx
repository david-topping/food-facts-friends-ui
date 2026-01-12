import { useState } from "react";
import {
  Stack,
  Typography,
  Paper,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

import { stripePromise } from "../../../../stripe/stripe";
import { elementsOptions } from "../../../../stripe/elementsOptions";
import { useCreateDonation } from "../../../../hooks/useCreateDonation";
import { useConfirmDonation } from "../../../../hooks/useConfirmDonation";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type FinancialDonationProps = {
  content: {
    title: string;
  };
};

/* ------------------------------------------------------------------ */
/* Shared layout */
/* ------------------------------------------------------------------ */

function ContentColumn({ children }: { children: React.ReactNode }) {
  return <Stack spacing={3}>{children}</Stack>;
}

/* ------------------------------------------------------------------ */
/* Stripe payment step */
/* ------------------------------------------------------------------ */

function StripePaymentForm({ amount }: { amount: number }) {
  const { confirm, loading } = useConfirmDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) await confirm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContentColumn>
        <PaymentElement />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
          {loading ? "Processing…" : `Donate £${amount}`}
        </Button>
      </ContentColumn>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Donation details step */
/* ------------------------------------------------------------------ */

function DonationDetailsForm(props: {
  amount: number;
  setAmount: (v: number) => void;
  email: string;
  setEmail: (v: string) => void;
  giftAid: boolean;
  setGiftAid: (v: boolean) => void;
  loading: boolean;
  onContinue: () => void;
}) {
  const { amount, setAmount, email, setEmail, giftAid, setGiftAid, loading, onContinue } = props;

  const [touched, setTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isAmountValid = amount >= 1;

  return (
    <ContentColumn>
      {/* Preset amounts */}
      <Stack direction="row" spacing={2} justifyContent="center">
        {[5, 10, 20, 50].map((preset) => (
          <Button
            key={preset}
            variant={amount === preset ? "contained" : "outlined"}
            onClick={() => setAmount(preset)}
          >
            £{preset}
          </Button>
        ))}
      </Stack>

      <TextField
        label="Donation amount (£)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
        error={touched && !isAmountValid}
        helperText={
          touched && !isAmountValid ? "Minimum donation is £1" : "Every contribution helps"
        }
        fullWidth
      />

      <TextField
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={touched && !isEmailValid}
        helperText={
          touched && !isEmailValid
            ? "Please enter a valid email"
            : "We’ll send your donation receipt here"
        }
        required
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={giftAid} onChange={(e) => setGiftAid(e.target.checked)} />}
        label="I am a UK taxpayer and would like to Gift Aid my donation"
      />

      <Typography variant="caption" color="text.secondary">
        Gift Aid allows us to claim an extra 25p for every £1 you donate.
      </Typography>

      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={!isEmailValid || !isAmountValid || loading}
        onClick={() => {
          setTouched(true);
          onContinue();
        }}
      >
        {loading ? "Preparing payment…" : "Continue to payment"}
      </Button>
    </ContentColumn>
  );
}

/* ------------------------------------------------------------------ */
/* Main container */
/* ------------------------------------------------------------------ */

export function FinancialDonation({ content }: FinancialDonationProps) {
  const { clientSecret, startDonation, loading } = useCreateDonation();

  const [amount, setAmount] = useState(10);
  const [email, setEmail] = useState("");
  const [giftAid, setGiftAid] = useState(false);

  const start = () =>
    startDonation({
      amountPence: amount * 100,
      email,
      giftAid,
    });

  return (
    <Stack spacing={4} alignItems="center" width="100%">
      <Typography variant="h2" align="center">
        {content.title}
      </Typography>

      <Paper
        sx={{
          width: "100%",
          p: { xs: 3, md: 6 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={4} width="100%" justifyContent="center" minHeight={480}>
          <Typography variant="overline" align="center" color="text.secondary">
            {clientSecret ? "Payment" : "Donation details"}
          </Typography>

          <Divider />

          {!clientSecret && (
            <DonationDetailsForm
              amount={amount}
              setAmount={setAmount}
              email={email}
              setEmail={setEmail}
              giftAid={giftAid}
              setGiftAid={setGiftAid}
              loading={loading}
              onContinue={start}
            />
          )}

          {clientSecret && (
            <Elements stripe={stripePromise} options={elementsOptions(clientSecret)}>
              <StripePaymentForm amount={amount} />
            </Elements>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
