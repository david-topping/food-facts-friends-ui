import { Box, Stack, TextField, Typography } from "@mui/material";

export type GiftAidDetailsValues = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  country: string;
};

export type GiftAidDetailsErrors = Partial<Record<keyof GiftAidDetailsValues, string>>;

type GiftAidDetailsFieldsProps = {
  values: GiftAidDetailsValues;
  onChange: (next: GiftAidDetailsValues) => void;
  errors?: GiftAidDetailsErrors;
  touched?: boolean;
};

export function GiftAidDetailsFields({
  values,
  onChange,
  errors = {},
  touched = false,
}: GiftAidDetailsFieldsProps) {
  const showError = (key: keyof GiftAidDetailsValues) => (touched ? errors[key] : undefined);

  return (
    <Stack spacing={1}>
      <Typography fontWeight={700}>Gift Aid details</Typography>

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
          onChange={(e) => onChange({ ...values, firstName: e.target.value })}
          error={!!showError("firstName")}
          helperText={showError("firstName") || " "}
          fullWidth
        />

        <TextField
          label="Last name"
          value={values.lastName}
          onChange={(e) => onChange({ ...values, lastName: e.target.value })}
          error={!!showError("lastName")}
          helperText={showError("lastName") || " "}
          fullWidth
        />
      </Box>

      <TextField
        label="Address line 1"
        value={values.addressLine1}
        onChange={(e) => onChange({ ...values, addressLine1: e.target.value })}
        error={!!showError("addressLine1")}
        helperText={showError("addressLine1") || " "}
        fullWidth
      />

      <TextField
        label="Address line 2 (optional)"
        value={values.addressLine2}
        onChange={(e) => onChange({ ...values, addressLine2: e.target.value })}
        fullWidth
      />

      <Box
        sx={{
          display: "grid",
          gap: 1.25,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          label="City"
          value={values.city}
          onChange={(e) => onChange({ ...values, city: e.target.value })}
          error={!!showError("city")}
          helperText={showError("city") || " "}
          fullWidth
        />

        <TextField
          label="Postcode"
          value={values.postcode}
          onChange={(e) => onChange({ ...values, postcode: e.target.value })}
          error={!!showError("postcode")}
          helperText={showError("postcode") || " "}
          fullWidth
        />
      </Box>

      <TextField
        label="Country"
        value={values.country}
        onChange={(e) => onChange({ ...values, country: e.target.value })}
        error={!!showError("country")}
        helperText={showError("country") || " "}
        fullWidth
      />

      {/* Gift Aid Declaration */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        <strong>Gift Aid declaration:</strong> I am a UK taxpayer and understand that if I pay less
        Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid
        claimed on all my donations, it is my responsibility to pay any difference. Please treat
        this donation as Gift Aid.
      </Typography>
    </Stack>
  );
}
