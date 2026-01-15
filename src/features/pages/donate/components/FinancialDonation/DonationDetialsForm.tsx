import { useMemo, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { DonationAmountPicker } from "./DonationAmountPicker";
import { GiftAidToggle } from "./GiftAidToggle";
import { isNumericInput, isValidEmail, MAX_AMOUNT, MIN_AMOUNT } from "./donationDetials.validation";

export type DonationFormData = {
  amount: number;
  email: string;
  giftAid: boolean;
};

type DonationDetailsFormProps = {
  onSubmit: (data: DonationFormData) => void;
  loading?: boolean;
  initialValues?: Partial<DonationFormData>;
};

export function DonationDetailsForm({
  onSubmit,
  loading = false,
  initialValues = {},
}: DonationDetailsFormProps) {
  const [data, setData] = useState<DonationFormData>({
    amount: initialValues.amount ?? 0,
    email: initialValues.email ?? "",
    giftAid: initialValues.giftAid ?? false,
  });

  const [customAmount, setCustomAmount] = useState("");

  const [touched, setTouched] = useState({
    amount: false,
    email: false,
  });

  const amountError = useMemo(() => {
    if (!touched.amount) return undefined;
    if (data.amount < MIN_AMOUNT) return `Minimum donation is £${MIN_AMOUNT}`;
    if (data.amount > MAX_AMOUNT) return `Maximum donation is £${MAX_AMOUNT.toLocaleString()}`;
    return undefined;
  }, [data.amount, touched.amount]);

  const emailError = useMemo(() => {
    if (!touched.email) return undefined;
    if (!data.email.trim()) return "Email address is required";
    if (!isValidEmail(data.email)) return "Please enter a valid email address";
    return undefined;
  }, [data.email, touched.email]);

  const isValid = useMemo(() => {
    return data.amount >= MIN_AMOUNT && data.amount <= MAX_AMOUNT && isValidEmail(data.email);
  }, [data.amount, data.email]);

  function submit() {
    setTouched({ amount: true, email: true });
    if (!isValid) return;
    onSubmit(data);
  }

  return (
    <Stack
      spacing={3}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <DonationAmountPicker
        amount={data.amount}
        customAmount={customAmount}
        amountError={amountError}
        onSelectPreset={(amount) => {
          setData((prev) => ({ ...prev, amount }));
          setCustomAmount("");
          setTouched((prev) => ({ ...prev, amount: true }));
        }}
        onChangeCustomAmount={(value) => {
          if (!isNumericInput(value)) return;

          setCustomAmount(value);

          const numeric = value === "" ? 0 : Number(value);
          if (!Number.isNaN(numeric)) {
            setData((prev) => ({ ...prev, amount: numeric }));
          }
        }}
        onBlurAmount={() => setTouched((prev) => ({ ...prev, amount: true }))}
      />

      <TextField
        label="Email address"
        type="email"
        value={data.email}
        onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        error={!!emailError}
        helperText={emailError || "We'll send your donation receipt here"}
        required
        fullWidth
        autoComplete="email"
      />

      <GiftAidToggle
        checked={data.giftAid}
        onChange={(checked) => setData((prev) => ({ ...prev, giftAid: checked }))}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={!isValid || loading}
        sx={{ py: 1.75, fontWeight: 700, fontSize: "1rem" }}
      >
        {loading ? "Processing…" : `Donate £${data.amount.toFixed(2)}`}
      </Button>
    </Stack>
  );
}
