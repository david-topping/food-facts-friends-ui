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

import { donationDetailsFormSchema, PRESET_AMOUNTS } from "./DonationDetialsForm.schema";
import type { DonationDetails } from "./donation.types";
import type { GiftAidDetailsValues } from "./GiftAidDetialsFields";
import { GiftAidDetailsFields } from "./GiftAidDetialsFields";

type DonationDetailsFormProps = {
  onSubmit: (data: DonationDetails) => void;
  loading?: boolean;
  initialValues?: Partial<DonationDetails>;
};

const MONEY_INPUT_REGEX = /^\d*\.?\d{0,2}$/;

const EMPTY_GIFT_AID: GiftAidDetailsValues = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  country: "United Kingdom",
};

export function DonationDetailsForm({
  onSubmit,
  loading = false,
  initialValues = {},
}: DonationDetailsFormProps) {
  const [amountInput, setAmountInput] = useState(() =>
    initialValues.amount ? String(initialValues.amount) : "",
  );

  const [email, setEmail] = useState(initialValues.email ?? "");
  const [giftAid, setGiftAid] = useState(initialValues.giftAid ?? false);

  const [giftAidDetails, setGiftAidDetails] = useState<GiftAidDetailsValues>(() => ({
    ...EMPTY_GIFT_AID,
    ...(initialValues.giftAid === true ? initialValues.giftAidDetails : {}),
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedPreset = PRESET_AMOUNTS.find((v) => String(v) === amountInput);

  const handleContinue = () => {
    const payload = giftAid
      ? { amount: amountInput, email, giftAid: true, giftAidDetails }
      : { amount: amountInput, email, giftAid: false };

    const result = donationDetailsFormSchema.safeParse(payload);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        newErrors[path] = issue.message;
      }

      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  const giftAidErrors: Record<string, string> = {};
  Object.keys(errors).forEach((key) => {
    if (key.startsWith("giftAidDetails.")) {
      const fieldName = key.replace("giftAidDetails.", "");
      giftAidErrors[fieldName] = errors[key];
    }
  });

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
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
              variant={selectedPreset === v ? "contained" : "outlined"}
              onClick={() => {
                setAmountInput(String(v));
                clearError("amount");
              }}
              sx={{ height: 52, borderRadius: 2, fontWeight: 700 }}
            >
              £{v}
            </Button>
          ))}

          <TextField
            value={amountInput}
            onChange={(e) => {
              const value = e.target.value;
              if (value && !MONEY_INPUT_REGEX.test(value)) return;
              setAmountInput(value);
              clearError("amount");
            }}
            placeholder="Other amount"
            inputMode="decimal"
            error={!!errors.amount}
            helperText={errors.amount || " "}
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
        onChange={(e) => {
          setEmail(e.target.value);
          clearError("email");
        }}
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email || " "}
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
            if (value !== null) {
              setGiftAid(value === "yes");
            }
          }}
          size="small"
          sx={{ borderRadius: 2 }}
        >
          <ToggleButton value="no">No</ToggleButton>
          <ToggleButton value="yes">Yes</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {giftAid && (
        <GiftAidDetailsFields
          values={giftAidDetails}
          onChange={(updated) => {
            setGiftAidDetails(updated);
            Object.keys(updated).forEach((key) => {
              clearError(`giftAidDetails.${key}`);
            });
          }}
          errors={giftAidErrors}
          touched={Object.keys(errors).length > 0}
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
