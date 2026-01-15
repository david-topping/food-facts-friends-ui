import { useMemo, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { DonationAmountPicker } from "./DonationAmountPicker";
import { GiftAidToggle } from "./GiftAidToggle";
import { isNumericInput, isValidEmail, MAX_AMOUNT, MIN_AMOUNT } from "./donationDetials.validation";

export type GiftAidAddress = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  townCity: string;
  county?: string;
  postcode: string;
};

export type DonationFormData = {
  amount: number;
  email: string;
  giftAid: boolean;
  giftAidAddress?: GiftAidAddress;
};

type DonationDetailsFormProps = {
  onSubmit: (data: DonationFormData) => void;
  loading?: boolean;
  initialValues?: Partial<DonationFormData>;
};

const EMPTY_GIFT_AID_ADDRESS: GiftAidAddress = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  townCity: "",
  county: "",
  postcode: "",
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
    giftAidAddress: initialValues.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS,
  });

  const [customAmount, setCustomAmount] = useState("");

  const [touched, setTouched] = useState({
    amount: false,
    email: false,
    giftAidAddress: false,
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

  const giftAidAddressErrors = useMemo(() => {
    if (!data.giftAid) return {};
    if (!touched.giftAidAddress) return {};

    const a = data.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS;

    const errors: Partial<Record<keyof GiftAidAddress, string>> = {};

    if (!a.fullName.trim()) errors.fullName = "Full name is required";
    if (!a.addressLine1.trim()) errors.addressLine1 = "Address line 1 is required";
    if (!a.townCity.trim()) errors.townCity = "Town / City is required";
    if (!a.postcode.trim()) errors.postcode = "Postcode is required";

    return errors;
  }, [data.giftAid, data.giftAidAddress, touched.giftAidAddress]);

  const giftAidAddressValid = useMemo(() => {
    if (!data.giftAid) return true;

    const a = data.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS;

    return (
      !!a.fullName.trim() && !!a.addressLine1.trim() && !!a.townCity.trim() && !!a.postcode.trim()
    );
  }, [data.giftAid, data.giftAidAddress]);

  const isValid = useMemo(() => {
    return (
      data.amount >= MIN_AMOUNT &&
      data.amount <= MAX_AMOUNT &&
      isValidEmail(data.email) &&
      giftAidAddressValid
    );
  }, [data.amount, data.email, giftAidAddressValid]);

  function submit() {
    setTouched({ amount: true, email: true, giftAidAddress: true });
    if (!isValid) return;

    onSubmit({
      amount: data.amount,
      email: data.email,
      giftAid: data.giftAid,
      giftAidAddress: data.giftAid ? data.giftAidAddress : undefined,
    });
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
        onChange={(checked) => {
          setData((prev) => ({
            ...prev,
            giftAid: checked,
            giftAidAddress: prev.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS,
          }));

          // Optional: if turning OFF gift aid, stop showing errors
          if (!checked) {
            setTouched((prev) => ({ ...prev, giftAidAddress: false }));
          }
        }}
        address={data.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS}
        onChangeAddress={(patch) => {
          setData((prev) => ({
            ...prev,
            giftAidAddress: {
              ...(prev.giftAidAddress ?? EMPTY_GIFT_AID_ADDRESS),
              ...patch,
            },
          }));
        }}
        errors={giftAidAddressErrors}
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
