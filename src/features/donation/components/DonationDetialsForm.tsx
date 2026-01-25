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
} from "./DonationDetialsForm.schema";
import type { DonationDetails } from "./donation.types";
import type { GiftAidDetailsErrors, GiftAidDetailsValues } from "./GiftAidDetialsFields";
import { GiftAidDetailsFields } from "./GiftAidDetialsFields";

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

function zodToFieldErrors(error: z.ZodError): {
  formErrors: FormErrors;
  giftAidErrors: GiftAidDetailsErrors;
} {
  const formErrors: FormErrors = {};
  const giftAidErrors: GiftAidDetailsErrors = {};

  for (const issue of error.issues) {
    const [first, second] = issue.path;

    if (typeof first === "string" && second === undefined) {
      formErrors[first as keyof DonationDetails] = issue.message;
      continue;
    }

    if (first === "giftAidDetails" && typeof second === "string") {
      giftAidErrors[second as keyof GiftAidDetailsValues] = issue.message;
      continue;
    }
  }

  return { formErrors, giftAidErrors };
}

export function DonationDetailsForm({
  onSubmit,
  loading = false,
  initialValues = {},
}: DonationDetailsFormProps) {
  const initialPreset =
    typeof (initialValues as any).amount === "number" &&
    isPresetAmount((initialValues as any).amount)
      ? ((initialValues as any).amount as PresetAmount)
      : null;

  const initialCustom =
    typeof (initialValues as any).amount === "number" &&
    !isPresetAmount((initialValues as any).amount)
      ? String((initialValues as any).amount)
      : "";

  const [presetAmount, setPresetAmount] = useState<PresetAmount | null>(initialPreset);
  const [customAmount, setCustomAmount] = useState(initialCustom);

  const [email, setEmail] = useState((initialValues as any).email ?? "");
  const [giftAid, setGiftAid] = useState((initialValues as any).giftAid ?? false);

  const [giftAidDetails, setGiftAidDetails] = useState<GiftAidDetailsValues>({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  });

  const [touched, setTouched] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [giftAidErrors, setGiftAidErrors] = useState<GiftAidDetailsErrors>({});

  const amountFieldValue = presetAmount ?? customAmount;

  const showError = <K extends keyof DonationDetails>(key: K) =>
    touched ? errors[key] : undefined;

  const handleContinue = () => {
    setTouched(true);

    const result = donationDetailsFormSchema.safeParse(
      giftAid
        ? {
            amount: amountFieldValue,
            email,
            giftAid: true,
            giftAidDetails,
          }
        : {
            amount: amountFieldValue,
            email,
            giftAid: false,
          },
    );

    if (!result.success) {
      const next = zodToFieldErrors(result.error);
      setErrors(next.formErrors);
      setGiftAidErrors(next.giftAidErrors);
      return;
    }

    setErrors({});
    setGiftAidErrors({});
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
        <GiftAidDetailsFields
          values={giftAidDetails}
          onChange={setGiftAidDetails}
          touched={touched}
          errors={giftAidErrors}
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
