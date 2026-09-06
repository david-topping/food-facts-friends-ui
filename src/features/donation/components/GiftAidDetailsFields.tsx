import { Box, Stack, TextField, Typography } from "@mui/material";
import type { GiftAidDetailsValues } from "./donation.types";

export type GiftAidDetailsErrors = Partial<Record<keyof GiftAidDetailsValues, string>>;

type GiftAidDetailsFieldsProps = {
  values: GiftAidDetailsValues;
  onChange: (next: GiftAidDetailsValues) => void;
  errors?: GiftAidDetailsErrors;
  touched?: boolean;
};

const span = { gridColumn: "1 / -1" };

export function GiftAidDetailsFields({
  values,
  onChange,
  errors = {},
  touched = false,
}: GiftAidDetailsFieldsProps) {
  const showError = (key: keyof GiftAidDetailsValues) => (touched ? errors[key] : undefined);

  const set = (key: keyof GiftAidDetailsValues, value: string) =>
    onChange({ ...values, [key]: value });

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">Gift Aid details</Typography>

      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          label="First name"
          value={values.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          error={!!showError("firstName")}
          helperText={showError("firstName")}
          autoComplete="given-name"
          fullWidth
        />

        <TextField
          label="Last name"
          value={values.lastName}
          onChange={(e) => set("lastName", e.target.value)}
          error={!!showError("lastName")}
          helperText={showError("lastName")}
          autoComplete="family-name"
          fullWidth
        />

        <TextField
          label="Address line 1"
          value={values.addressLine1}
          onChange={(e) => set("addressLine1", e.target.value)}
          error={!!showError("addressLine1")}
          helperText={showError("addressLine1")}
          autoComplete="address-line1"
          fullWidth
          sx={span}
        />

        <TextField
          label="Address line 2 (optional)"
          value={values.addressLine2}
          onChange={(e) => set("addressLine2", e.target.value)}
          autoComplete="address-line2"
          fullWidth
          sx={span}
        />

        <TextField
          label="City"
          value={values.city}
          onChange={(e) => set("city", e.target.value)}
          error={!!showError("city")}
          helperText={showError("city")}
          autoComplete="address-level2"
          fullWidth
        />

        <TextField
          label="Postcode"
          value={values.postcode}
          onChange={(e) => set("postcode", e.target.value)}
          error={!!showError("postcode")}
          helperText={showError("postcode")}
          autoComplete="postal-code"
          fullWidth
        />

        <TextField
          label="Country"
          value={values.country}
          onChange={(e) => set("country", e.target.value)}
          error={!!showError("country")}
          helperText={showError("country")}
          autoComplete="country-name"
          fullWidth
          sx={span}
        />
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
        <strong>Gift Aid declaration:</strong> I am a UK taxpayer and understand that if I pay less
        Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid
        claimed on all my donations, it is my responsibility to pay any difference. Please treat
        this donation as Gift Aid.
      </Typography>
    </Stack>
  );
}
