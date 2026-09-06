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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { zodToFieldErrors } from "@/helpers/zodToFieldErrors";
import { tokens } from "@/theme/tokens";
import { donationDetailsFormSchema, PRESET_AMOUNTS } from "./DonationDetailsForm.schema";
import type { DonationDetails, GiftAidDetailsValues } from "./donation.types";
import { GiftAidDetailsFields } from "./GiftAidDetailsFields";
import { DonationSummary } from "./DonationSummary";

type FieldErrors = Partial<Record<"amount" | "email", string>>;
type GiftAidErrors = Partial<Record<keyof GiftAidDetailsValues, string>>;

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

  const [errors, setErrors] = useState<FieldErrors>({});
  const [giftAidErrors, setGiftAidErrors] = useState<GiftAidErrors>({});

  const selectedPreset = PRESET_AMOUNTS.find((v) => String(v) === amountInput);
  const parsedAmount = amountInput === "" ? null : Number(amountInput);
  const summaryAmount =
    parsedAmount != null && Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : null;

  const handleContinue = () => {
    const payload = giftAid
      ? { amount: amountInput, email, giftAid: true, giftAidDetails }
      : { amount: amountInput, email, giftAid: false };

    const result = donationDetailsFormSchema.safeParse(payload);

    if (!result.success) {
      setErrors(zodToFieldErrors<"amount" | "email">(result.error));
      setGiftAidErrors(
        giftAid
          ? zodToFieldErrors<keyof GiftAidDetailsValues>(result.error, ["giftAidDetails"])
          : {},
      );
      return;
    }

    setErrors({});
    setGiftAidErrors({});
    onSubmit(result.data);
  };

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 240px" },
        gap: { xs: 3, md: 5 },
        alignItems: "start",
      }}
    >
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Donation amount</Typography>

          <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(3, 1fr)" }}>
            {PRESET_AMOUNTS.map((v) => (
              <Button
                key={v}
                variant={selectedPreset === v ? "contained" : "outlined"}
                color={selectedPreset === v ? "accent" : "primary"}
                onClick={() => {
                  setAmountInput(String(v));
                  clearError("amount");
                }}
                sx={{ height: 50, fontWeight: 700 }}
              >
                £{v}
              </Button>
            ))}
          </Box>

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
            fullWidth
            slotProps={{
              input: {
                startAdornment: <Box sx={{ mr: 1, fontWeight: 700 }}>£</Box>,
              },
            }}
            sx={{ "& .MuiInputBase-root": { height: 50 } }}
          />
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
          spacing={2}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: `${tokens.radius.md}px`,
            bgcolor: tokens.color.warmPaper,
            px: 2,
            py: 1.5,
          }}
        >
          <Box>
            <Typography variant="subtitle2">Gift Aid</Typography>
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
            sx={{
              flexShrink: 0,
              gap: 1,
              "& .MuiToggleButtonGroup-grouped": {
                ml: 0,
                px: 2,
                minWidth: 56,
                border: `1px solid ${tokens.color.hairline}`,
                "&.Mui-selected": { borderColor: tokens.color.forest },
              },
            }}
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
              setGiftAidErrors({});
            }}
            errors={giftAidErrors}
            touched={Object.keys(giftAidErrors).length > 0}
          />
        )}

        <Button
          variant="contained"
          color="accent"
          size="large"
          onClick={handleContinue}
          disabled={loading}
          fullWidth
          sx={{ py: 1.4, fontWeight: 700 }}
        >
          {loading ? "Starting donation..." : "Continue to payment"}
        </Button>

        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          justifyContent="center"
          sx={{ color: "text.disabled" }}
        >
          <LockOutlinedIcon sx={{ fontSize: "0.9rem" }} />
          <Typography variant="caption">Payments handled securely by Stripe</Typography>
        </Stack>
      </Stack>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <DonationSummary amount={summaryAmount} giftAid={giftAid} />
      </Box>
    </Box>
  );
}
