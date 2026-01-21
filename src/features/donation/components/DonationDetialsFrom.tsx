import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { z } from "zod";

import {
  donationDetailsFormSchema,
  PRESET_AMOUNTS,
  type PresetAmount,
} from "../model/donation.schema";
import type { DonationDetails } from "../model/donation.types";
import { GiftAidAddressFields } from "./GiftAidAddressFields";

type DonationDetailsFormProps = {
  onSubmit: (data: DonationDetails) => void;
  loading?: boolean;
  initialValues?: Partial<DonationDetails>;
};

type FormErrors = Partial<Record<keyof DonationDetails, string>>;

const MONEY_INPUT_REGEX = /^[0-9]*\.?[0-9]*$/;

function isPresetAmount(v: number): v is PresetAmount {
  return (PRESET_AMOUNTS as readonly number[]).includes(v);
}

function zodToFieldErrors(error: z.ZodError): FormErrors {
  const fieldErrors: FormErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (!key) continue;
    fieldErrors[key as keyof DonationDetails] = issue.message;
  }

  return fieldErrors;
}

export function DonationDetailsForm({
  onSubmit,
  loading = false,
  initialValues = {},
}: DonationDetailsFormProps) {
  const initialPreset =
    typeof initialValues.amount === "number" && isPresetAmount(initialValues.amount)
      ? initialValues.amount
      : null;

  const initialCustom =
    typeof initialValues.amount === "number" && !isPresetAmount(initialValues.amount)
      ? String(initialValues.amount)
      : "";

  const [presetAmount, setPresetAmount] = useState<PresetAmount | null>(initialPreset);
  const [customAmount, setCustomAmount] = useState(initialCustom);

  const [email, setEmail] = useState(initialValues.email ?? "");
  const [giftAid, setGiftAid] = useState(initialValues.giftAid ?? false);

  const [address, setAddress] = useState({
    addressLine1: initialValues.addressLine1 ?? "",
    addressLine2: initialValues.addressLine2 ?? "",
    city: initialValues.city ?? "",
    postcode: initialValues.postcode ?? "",
    country: initialValues.country ?? "United Kingdom",
  });

  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const amountFieldValue = presetAmount ?? customAmount;

  const showError = <K extends keyof DonationDetails>(key: K) =>
    touched ? errors[key] : undefined;

  const handleContinue = () => {
    setTouched(true);

    const result = donationDetailsFormSchema.safeParse({
      amount: amountFieldValue,
      email,
      giftAid,
      ...address,
    });

    if (!result.success) {
      setErrors(zodToFieldErrors(result.error));
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <Stack spacing={2} width="100%" maxWidth={520} mx="auto">
      <Stack spacing={1}>
        <Typography fontWeight={700}>Donation amount</Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1.25,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          {PRESET_AMOUNTS.map((v) => (
            <Button
              key={v}
              variant={presetAmount === v ? "contained" : "outlined"}
              onClick={() => {
                setPresetAmount(v);
                setCustomAmount("");
              }}
              sx={{ height: 52, borderRadius: 2, fontWeight: 700 }}
            >
              £{v}
            </Button>
          ))}

          <TextField
            value={customAmount}
            onChange={(e) => {
              const next = e.target.value;
              if (!MONEY_INPUT_REGEX.test(next)) return;

              setCustomAmount(next);
              setPresetAmount(null);
            }}
            placeholder="Other amount"
            inputMode="decimal"
            error={!!showError("amount")}
            helperText={showError("amount") || " "}
            slotProps={{
              input: {
                startAdornment: <Box sx={{ mr: 1, fontWeight: 700 }}>£</Box>,
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: 52,
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Stack>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        autoComplete="email"
        error={!!showError("email")}
        helperText={showError("email") || " "}
        fullWidth
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <Box>
          <Typography fontWeight={700}>Gift Aid</Typography>
          <Typography variant="body2" color="text.secondary">
            Add 25% at no extra cost (UK taxpayers only)
          </Typography>
        </Box>

        <ToggleButtonGroup
          exclusive
          value={giftAid ? "yes" : "no"}
          onChange={(_, value) => {
            if (!value) return;
            setGiftAid(value === "yes");
          }}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          <ToggleButton value="no">No</ToggleButton>
          <ToggleButton value="yes">Yes</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {giftAid && (
        <GiftAidAddressFields
          values={address}
          onChange={setAddress}
          touched={touched}
          errors={{
            addressLine1: showError("addressLine1"),
            city: showError("city"),
            postcode: showError("postcode"),
            country: showError("country"),
          }}
        />
      )}

      <Button
        variant="contained"
        size="large"
        onClick={handleContinue}
        disabled={loading}
        sx={{ borderRadius: 2, py: 1.25, fontWeight: 800 }}
      >
        {loading ? "Starting donation..." : "Continue to payment"}
      </Button>
    </Stack>
  );
}
